import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import {
  useGetUserProfileDetailsQuery,
  useUpdateUserProfileMutation,
} from "@/features/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  // getting data and isLoading from this hook coming from authApi to render user profile details
  const { data, isLoading, refetch } = useGetUserProfileDetailsQuery();

  // accessing my user from data
  const user = data?.user || {};

  // now for updating profile
  const [
    updateUserProfile,
    {
      data: updatedUserData,
      isLoading: updatedUserIsLoadingState,
      error,
      isSuccess,
      isError,
    },
  ] = useUpdateUserProfileMutation();

  // state variables for updateUserProfile api
  const [name, setName] = useState("");

  const [profilePicture, setProfilePicture] = useState("");

  // to save image file in state variable
  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePicture(file);
  };

  // function to create formData object and send it to authApi
  const updateUserProfileHandler = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("profilePicture", profilePicture);

    // passing from data as parameter to api function to update user
    await updateUserProfile(formData);
  };

  // state variable to close dialog
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setOpen(false);
      toast.success(data.message || "Profile updated Successfully.");
    }

    if (isError) {
      toast.error(error.message || "Failed to update profile");
    }
  }, [error, updatedUserData, isError, isSuccess]);

  //   when loading is true render this skeleton
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 my-24 space-y-8">
        <Skeleton className="h-8 w-48" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
          <div className="flex flex-col items-center">
            <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full" />
          </div>

          <div className="space-y-4 w-full max-w-sm">
            <Skeleton className="h-4 w-64 mb-4" />
            <Skeleton className="h-4 w-56 mb-4" />
            <Skeleton className="h-4 w-48 mb-4" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-64" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2].map((item) => (
              <div key={item} className="space-y-2">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  //   when loading is false render this component
  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user?.profilePicUrl || "https://github.com/shadcn.png"}
              alt="@shadcn"
              className="cursor-pointer"
            />
            <AvatarFallback>
              {" "}
              {user?.name?.charAt(0) || "No name provided"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.name || "N/A"}{" "}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.email || "No Email Provided"}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.role?.toUpperCase() || "USER"}{" "}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Member Since:
              <span className="font-medium ml-2 px-2 py-1 rounded-md text-white dark:text-gray-900 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 shadow-md">
                {user?.createdAt
                  ? new Date(data.user.createdAt).toLocaleDateString()
                  : "No date Provided"}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Last Profile Updated:
              <span className="font-medium ml-2 px-2 py-1 rounded-md text-white dark:text-gray-900 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 shadow-md">
                {user?.createdAt
                  ? new Date(data.user.updatedAt).toLocaleDateString()
                  : "No date Provided"}
              </span>
            </h1>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="transition hover:scale-105 duration-300">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    placeholder="Name"
                    className="col-span-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3 cursor-pointer"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updatedUserIsLoadingState}
                  onClick={updateUserProfileHandler}
                >
                  {updatedUserIsLoadingState ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="">
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user?.enrolledCourses?.length === 0 ? (
            <p className="text-red-500 text-base font-semibold">
              You haven't enrolled yet
            </p>
          ) : (
            user?.enrolledCourses?.map((course, index) => (
              <Course key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
