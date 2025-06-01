import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGoogleLoginUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [googleLoginUser] = useGoogleLoginUserMutation();

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }
    if (registerError) {
      toast.error(registerError.data.message || "Signup Failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data.message || "Login Failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);

  const handleGGLogInServer = async (decoded) => {
    try {
      const payload = {
        name: decoded?.name,
        email: decoded?.email,
        password: String(decoded?.sub),
      };

      const result = await googleLoginUser(payload).unwrap();
      toast.success(result.message || "Logged in with Google");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Google login failed");
    }
  };

  return (
    <div className="flex  items-center w-full justify-center mt-20 ">
      <Tabs defaultValue="login" className="w-[400px] ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        <TabsContent value="signup">
          <Card className="bg-white text-black border-[#000000]">
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center w-full">
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
                className="w-[216px] h-[40px] bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md"
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="login">
          <Card className="bg-white text-black  border-[#000000]">
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-4">
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
                className="w-[216px] h-[40px] bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all"
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              {/* Divider */}
              <div className="relative flex items-center w-full">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
                <span className="mx-2 text-sm text-gray-500 dark:text-gray-400">
                  Or
                </span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
              </div>

              {/* Google Login Button */}
              <center>
                <div className="w-full">
                  <GoogleLogin
                    onSuccess={({ credential }) => {
                      const decoded = jwtDecode(credential);
                      handleGGLogInServer(decoded);
                    }}
                    onError={() => toast.error("Google Login Failed")}
                  />
                  {/* <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Sign in with Google
                  </p> */}
                </div>
              </center>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
