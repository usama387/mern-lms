import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // state variable to grab the values of input fields of sign up and submit the form.
  const [signInInput, setSignInInput] = useState({
    email: "",
    password: "",
  });

  // state variable to grab the values of input fields of sign up and submit the form.
  const [signUpInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  // state variable to show/hide the password.
  const [showPassword, setShowPassword] = useState(false);

  // to toggle password state
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // hook for navigation
  const navigate = useNavigate();

  // function to change the input fields values.
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "sign up") {
      setSignUpInput({ ...signUpInput, [name]: value });
    } else {
      setSignInInput({ ...signInInput, [name]: value });
    }
  };

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: isRegistering,
      isSuccess: successInRegistration,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: IsLoggingIn,
      isSuccess: successInLogin,
    },
  ] = useLoginUserMutation();

  // function to submit the form based on type received as a parameter.
  const handleRegisteration = async (type) => {
    const inputData = type === "sign up" ? signUpInput : signInInput;
    const submitAction = type === "sign up" ? registerUser : loginUser;

    // Check if any field is empty
    if (Object.values(inputData).some((field) => field.trim() === "")) {
      toast.error("All fields are required.🙁");
      return;
    }
    // now send the data to the server
    await submitAction(inputData);
  };

  // useEffect to execute when form is submitted
  useEffect(() => {
    if (successInRegistration && registerData) {
      toast.success(
        registerData.message ||
          "Account created successfully. Please login to continue."
      );
      setSignUpInput({ name: "", email: "", password: "" });
    }
    if (registerError) {
      toast.error(registerError.data.message || "Something went wrong.");
    }

    if (successInLogin && loginData) {
      toast.success(loginData.message || "Logged in successfully.");
      setSignInInput({ email: "", password: "" });
      navigate("/");
    }

    if (loginError) {
      toast.error(loginError.data.message || "Something went wrong.");
    }
  }, [
    successInRegistration,
    successInLogin,
    registerData,
    loginData,
    loginError,
    registerError,
  ]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs defaultValue="sign in" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign up">Sign up</TabsTrigger>
          <TabsTrigger value="sign in">Sign in</TabsTrigger>
        </TabsList>
        {/* Sign Up Logic */}
        <TabsContent value="sign up">
          <Card>
            <CardHeader>
              <CardTitle>Sign up</CardTitle>
              <CardDescription>
                Enter your details to create new account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signUpInput.name}
                  placeholder="Eg. Usama Razaaq"
                  required="true"
                  onChange={(e) => changeInputHandler(e, "sign up")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signUpInput.email}
                  placeholder="Eg. usama@gmail.com"
                  required="true"
                  onChange={(e) => changeInputHandler(e, "sign up")}
                />
              </div>
              <div className="space-y-1 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={signUpInput.password}
                    placeholder="Enter your password"
                    onChange={(e) => changeInputHandler(e, "sign up")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="hover:bg-blue-800 transition duration-300 hover:scale-105"
                disabled={isRegistering}
                onClick={() => handleRegisteration("sign up")}
              >
                {isRegistering ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    Wait
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Sign In Logic */}
        <TabsContent value="sign in">
          <Card>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>Enter your details to log in.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signInInput.email}
                  placeholder="Eg. usama@gmail.com"
                  required="true"
                  onChange={(e) => changeInputHandler(e, "sign in")}
                />
              </div>
              <div className="space-y-1 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={signInInput.password}
                    placeholder="Enter your password"
                    onChange={(e) => changeInputHandler(e, "sign in")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="hover:bg-blue-800 transition duration-300 hover:scale-105"
                disabled={IsLoggingIn}
                onClick={() => handleRegisteration("sign in")}
              >
                {IsLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    Wait
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
