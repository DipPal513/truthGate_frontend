import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "@/redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosInstance from "@/lib/AxiosInstance";

export default function LoginAccount() {
  //
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  // for form submit

  const dispatch = useDispatch();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginRequest());
    const res = await AxiosInstance.post("/api/v1/login", data, {
      withCredentials: true,
    });
    if (res.data.success) {
      dispatch(loginSuccess(res.data.user));
      navigate("/");
      toast.success("Successfully logged in!");
    } else {
      dispatch(loginFailure(res.data.message));
      toast.error(res.data.message);
    }

    console.log(res.data);
  };
  // const { error } = useSelector((state) => state);
  const error = "something went wrong";
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 ">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                name="email"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="*******"
                required
                name="password"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={handleFormSubmit}>
              Login
            </Button>
            {error && (
              <p className="w-full h-10 text-md px-3 py-2 rounded  my-2 bg-red-400">
                {error}
              </p>
            )}
            <p className="mt-2 text-xs text-center text-gray-700">
              {" "}
              Don't have an account?{" "}
              <Link to="/register" className=" text-blue-600 hover:underline">Sign up</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
