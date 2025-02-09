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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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

  // function to change the input fields values.
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "sign up") {
      setSignUpInput({ ...signUpInput, [name]: value });
    } else {
      setSignInInput({ ...signInInput, [name]: value });
    }
  };

  // function to submit the form.
  const handleRegisteration = (type) => {
    const inputData = type === "sign up" ? signUpInput : signInInput;
    console.log(inputData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs defaultValue="account" className="w-[400px]">
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
              <Button onClick={() => handleRegisteration("sign up")}>
                Sign up
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
              <Button onClick={() => handleRegisteration("sign in")}>
                Sign in
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
