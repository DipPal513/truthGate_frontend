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
import {
  registerFailure,
  registerRequest,
  registerSuccess,
} from "@/redux/features/userSlice";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    matchPassword: "",
  });
  // for form submit
  const fileRef = useRef();
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("handlesubmit triggered")
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
      } else {
        dispatch(registerFailure(res.data.message));
        toast.error(res.data.message);
      }
    } catch (error) {
      // Handle errors (for example, console.error it)
      console.error("Error submitting form:", error);
    }
  };
  const { loading } = useSelector((state) => state.user);
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
            <form onSubmit={handleFormSubmit}>
              <div className="grid gap-2">
                {/* <div className="mb-4">
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
      </div> */}
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
              <Button
               
                type="submit"
                className={`" mt-4 " ${loading ? " cursor-wait" : ""}`}
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
                    Registering...
                  </>
                ) : (
                  "sign In"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col"></CardFooter>

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
