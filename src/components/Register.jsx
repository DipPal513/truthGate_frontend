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
import AxiosInstance from "@/lib/AxiosInstance";
import { registerFailure, registerRequest, registerSuccess } from "@/redux/features/userSlice";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ username: "", email: "", password: "" ,matchPassword:""});
  // for form submit
  const fileRef = useRef();
  const dispatch = useDispatch();
  const naviagate = useNavigate()
  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(registerRequest());
      // Use axios.post directly inside the function, not inside useEffect
      const res = await AxiosInstance.post("/api/v1/register", data, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Welcome to TruthGate");
        dispatch(registerSuccess(res.data.user));
        naviagate("/");
        setData("");
      }else{
        dispatch(registerFailure(res.data.message));
        toast.error(res.data.message)
      }
    
    } catch (error) {
      // Handle errors (for example, console.error it)
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign up
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
            <div className="mb-4">
        <label className="block py-4">
          <span className="font-semibold block mb-3">Choose profile photo</span>
          <Input
            type="file"
            className="cursor pointer block w-full text-sm text-gray-500
            file:me-4 file:py-1 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white
            hover:file:bg-blue-700
            file:disabled:opacity-50 file:disabled:pointer-events-none
            dark:file:bg-blue-500
            dark:hover:file:bg-blue-400
"
            ref={fileRef}
            required
            onChange={(e) => imageHandler(e)}
          />
        </label>
      </div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="username"
                placeholder="Fullname"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                required
                placeholder="example@gamil.com"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                required
                placeholder="***********"
                type="password"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Match Password</Label>
              <Input
                id="password"
                name="matchPassword"
                required
                placeholder="***********"
                type="password"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>
          
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={handleFormSubmit}>
              Sign Up
            </Button>
          </CardFooter>
          <div className="relative mb-2">
            <div className="absolute flex items-center">
              <span className="w-full border-t" />
            </div>
         
          </div>
          {/* <div className="grid grid-cols-2 gap-6 m-2">
            <Button variant="outline">
              {/* <Icons.gitHub className="mr-2 h-4 w-4" /> */}
              {/* Github
            </Button>
            <Button variant="outline">
             
              Twitter
            </Button>
          </div> */}
          <p className="mt-2 text-xs text-center text-gray-700 mb-2">
            {" "}
            Already have an account?{" "}
            <Link to="/login" className=" text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
