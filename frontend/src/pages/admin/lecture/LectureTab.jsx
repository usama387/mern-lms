import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useDeleteLectureMutation,
  useEditLectureMutation,
  useGetLectureByIdQuery,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

// backend url to post video
const MediaApi = "http://localhost:3000/api/media";

const LectureTab = () => {
  // grabbing courseId and lectureId from url parameters to send it to backend
  const params = useParams();

  const { courseId, lectureId } = params;

  // state variables to manage video upload and progress
  const [lectureTitle, setLectureTitle] = useState("");

  const [videoInfo, setVideoInfo] = useState(null);

  const [isPreviewFree, setIsPreviewFree] = useState(false);

  const [mediaProgress, setMediaProgress] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [buttonDisable, setButtonDisable] = useState(true);

  // function that takes video as input updates state variables and sends video to api to be uploaded on cloudinary
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const response = await axios.post(
          `${MediaApi}/upload-video`,
          formData,
          {
            onUploadProgress: ({ loaded, total }) => {
              setUploadProgress(Math.round((loaded * 100) / total));
            },
          }
        );

        if (response.data.success) {
          console.log(response);
          // the api returns the video url and public id of the video in response now save it in state variable
          setVideoInfo({
            videoUrl: response.data.data.url,
            publicId: response.data.data.public_id,
          });
          setButtonDisable(false);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log("Error uploading file:", error);
        toast.error("Error uploading file");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  // destructuring editLecture function from courseApi slice to send data to backend
  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();

  // function to trigger and send data to backend to edit lecture
  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle,
      videoInfo,
      isPreviewFree,
      courseId,
      lectureId,
    });
  };

  // useEffect to check if data is returned from backend and show success or error message
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      // setButtonDisable(true);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error, data]);

  // Remove lecture api function
  const [
    deleteLecture,
    {
      data: deleteLectureData,
      isLoading: deleteLectureLoading,
      isSuccess: deleteLectureSuccess,
    },
  ] = useDeleteLectureMutation();

  // function to trigger remove lecture api in courseApi
  const removeLectureHandler = async () => {
    await deleteLecture(lectureId);
  };

  useEffect(() => {
    if (deleteLectureSuccess) {
      toast.success("Lecture deleted successfully");
    }
    if (deleteLectureData) {
      toast.error(deleteLectureData.message);
    }
  }, [deleteLectureSuccess]);

  // api function to return lecture data when passed lecture id
  const { data: lectureData } = useGetLectureByIdQuery(lectureId);

  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsPreviewFree(lecture.isPreviewFree);
      setVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  return (
    <Card className="ring-2 ring-blue-500 w-full mt-10">
      <CardHeader className="flex justify-between">
        <div className="">
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            className="transition hover:scale-105 duration-300"
            onClick={removeLectureHandler}
            disabled={deleteLectureLoading}
          >
            {deleteLectureLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Removing
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="">
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Eg. Introduction to kubernetes "
            className="ring-1 ring-blue-500"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            required
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            placeholder="Eg. Introduction to kubernetes "
            className="ring-1 ring-blue-500 w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            id="airplane-mode"
            checked={isPreviewFree}
            onCheckedChange={setIsPreviewFree}
          />
          <Label htmlFor="airplane-mode">Allow free access?</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress} % uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button
            className="transition hover:scale-105 duration-300"
            onClick={editLectureHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
