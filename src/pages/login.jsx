import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
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
  const { loading } = useSelector((state) => state.user);

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
            <form onSubmit={handleFormSubmit}>
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
              <div className="grid gap-2 mt-4">
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
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button
                type="submit"
                className={`" mt-4 block w-full" ${
                  loading ? " cursor-wait" : ""
                }`}
                style={{ width: "100% !important" }}
              >
                {loading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    wait...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-xs text-center text-gray-700">
              {" "}
              Don't have an account?{" "}
              <Link
                to="/register"
                className=" text-white hover:underline bg-green-500 px-5 py-2 "
              >
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
