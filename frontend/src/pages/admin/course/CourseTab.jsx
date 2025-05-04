import RichTextEditor from "@/components/RichTextEditor";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetCourseByIdQuery,
  usePublishCourseMutation,
  useUpdateCourseMutation,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const navigate = useNavigate();

  // to grab courseId with useParams hook & send it to api to update a course
  const params = useParams();
  const courseId = params.courseId;

  // state variables to hold input values from all fields to be sent to the server
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "",
    price: "",
    thumbnail: "",
  });

  // to get single course data using its id
  const {
    data: courseDataById,
    isLoading: courseIsLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  // to render default course details in fields to update them
  useEffect(() => {
    if (courseDataById?.course) {
      // extracting course from courseDataById
      const course = courseDataById?.course;
      setInput({
        title: course.title || "",
        subtitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        level: course.level || "",
        price: course.price || "",
        thumbnail: course.thumbnail || "",
      });
    }
  }, [courseDataById?.course]);

  // to grab input values
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // to grab select values
  const selectCategory = (category) => {
    setInput({ ...input, category });
  };

  const selectLevel = (level) => {
    setInput({ ...input, level });
  };

  // state variable to hold image preview
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  // to grab image file and save in input state variable with image preview mode
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, thumbnail: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // importing mutation hook from courseApi file
  const [updateCourse, { data, isLoading, isSuccess, error }] =
    useUpdateCourseMutation();

  // function to call api in rtk query to update course information
  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("subtitle", input.subtitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("level", input.level);
    formData.append("price", input.price);
    formData.append("thumbnail", input.thumbnail);

    // passing from data & courseId as parameter to api function to update user
    await updateCourse({ formData, courseId });
  };

  // useEffect to handle toast error message if any error occurs during update
  useEffect(() => {
    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [error]);

  // accessing mutation function from courseApi file to publish/unpublish course
  const [publishCourse, { isLoading: togglingStatus }] =
    usePublishCourseMutation();

  // function to call api in rtk query to publish/unpublish course takes courseId from params and action as parameter from where it is invoked
  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({
        courseId,
        query: action,
      });
      if (response?.data) {
        toast.success(response?.data?.message);
        refetch(); // refetch the course data after updating publish status
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update publish status");
    }
  };

  if (courseIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 size={40} className="animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md ring-2 ring-blue-400">
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Basic Course Information
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 mt-2 text-base">
            Make changes and then press save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-3">
          <Button
            variant="outline"
            className="transition hover:scale-105 duration-300 hover:text-blue-500 ring-2 ring-blue-500"
            onClick={() =>
              publishStatusHandler(
                courseDataById?.course?.isPublished ? "false" : "true"
              )
            }
            disabled={togglingStatus}
          >
            {togglingStatus ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : courseDataById?.course?.isPublished ? (
              "Unpublish"
            ) : (
              "Publish"
            )}
          </Button>
          <Button className="transition hover:scale-105 duration-300">
            Remove Course
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div className="space-y-3">
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Course Title"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              className="ring-2 ring-blue-400"
            />
          </div>
          <div className="space-y-3">
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subtitle"
              placeholder="Subtitle"
              value={input.subtitle}
              onChange={changeEventHandler}
              className="ring-2 ring-blue-400"
            />
          </div>
          <div className="space-y-3">
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="flex items-center gap-5">
            <div className="space-y-3">
              <Label>Category</Label>
              <Select onValueChange={selectCategory} value={input.category}>
                <SelectTrigger className="w-[200px] ring-2 ring-blue-400">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="font-semibold text-base text-gray-600 dark:text-emerald-500">
                      Available Categories
                    </SelectLabel>
                    <SelectItem
                      value="Frontend Next.Js"
                      className="dark:text-emerald-500 font-medium text-base"
                    >
                      Frontend Next.Js
                    </SelectItem>
                    <SelectItem
                      value="Data Science"
                      className="dark:text-emerald-500 font-medium text-base"
                    >
                      Data Science
                    </SelectItem>
                    <SelectItem
                      value="Fullstack Development with MERN"
                      className="dark:text-emerald-500 font-medium text-base"
                    >
                      Fullstack Development with MERN
                    </SelectItem>
                    <SelectItem
                      value="Backend with Node and Nest.Js"
                      className="dark:text-emerald-500 font-medium text-base"
                    >
                      Backend with Node and Nest.Js
                    </SelectItem>
                    <SelectItem
                      value="Graphic Design"
                      className="dark:text-emerald-500 font-medium text-base"
                    >
                      Graphic Design
                    </SelectItem>
                    <SelectItem
                      value="Ai and Machine Learning"
                      className="dark:text-emerald-500 font-medium text-base"
                    >
                      Ai and Machine Learning
                    </SelectItem>
                    <SelectItem
                      value="Python"
                      className="dark:text-emerald-500 font-medium text-base"
                    >
                      Python
                    </SelectItem>
                    <SelectItem
                      value="Docker"
                      className="dark:text-emerald-500 font-medium text-base"
                    >
                      Docker
                    </SelectItem>
                    <SelectItem
                      value="JavaScript"
                      className="dark:text-emerald-500 font-medium text-base"
                    >
                      JavaScript
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label>Course Level</Label>
              <Select onValueChange={selectLevel} value={input.level}>
                <SelectTrigger className="w-[200px] ring-2 ring-blue-400">
                  <SelectValue placeholder="Specify course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="font-semibold text-base text-gray-600 dark:text-emerald-500">
                      Available Levels
                    </SelectLabel>
                    <SelectItem
                      value="Beginner"
                      className="dark:text-emerald-500 font-medium text-base"
                    >
                      Beginner
                    </SelectItem>
                    <SelectItem
                      value="Intermediate"
                      className="dark:text-emerald-500 font-medium text-base"
                    >
                      Intermediate
                    </SelectItem>
                    <SelectItem
                      value="Advanced"
                      className="dark:text-emerald-500 font-medium text-base"
                    >
                      Advanced
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label>Price in (PKR)</Label>
              <Input
                type="number"
                name="price"
                value={input.price}
                onChange={changeEventHandler}
                placeholder="3500 PKR"
                className="w-[200px] ring-2 ring-blue-400"
              />
            </div>
          </div>
          <div className="">
            <Label>Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={selectThumbnail}
              placeholder="Upload thumbnail"
              className="w-fit ring-2 ring-blue-400"
            />
            {previewThumbnail && (
              <div className="mt-4">
                <img
                  src={previewThumbnail}
                  alt="thumbnail"
                  className="object-cover w-max h-32 rounded-md"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              className="transition hover:scale-105 duration-300 ring-2 ring-blue-500"
              onClick={() => navigate("/admin/course")}
            >
              Cancel
            </Button>
            <Button
              className="transition hover:scale-105 duration-300"
              disabled={isLoading}
              onClick={updateCourseHandler}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Now"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
