import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MdFileDownloadDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AxiosInstance from "@/lib/AxiosInstance";

export default function UserWeidge({ username, isMe, userId, user }) {
  const Navigate = useNavigate();

  const navigate = useNavigate();
  const [follow, setFollow] = useState();
const dispatch = useDispatch();
  const handleFollow = async (e) => {
    e.stopPropagation();
    try {
      
      const { data } = await AxiosInstance.get(`/api/v1/follow/${userId}`, {
        withCredentials: true,
      });
      setFollow(data.follow);
      data.follow && toast.success("user followed");
      !data.follow && toast.success("user unfollowed");
    } catch (error) {
      toast.error("failed to follow this user");
    }
  };
  

  useEffect(() => {
    setFollow(user._id == userId)
  }, []);
const {loading} = useSelector(state => state.user)
  return (
    <div
      className="flex items-center gap-x-2 justify-between px-4 mb-3 transition-all duration-200 hover:bg-gray-200 rounded py-2 cursor-pointer"
      onClick={() => Navigate(`/user/${userId}`)}
    >
      <div className="flex items-center gap-x-2">
        <div className="img w-10 h-10 bg-blue-500 rounded-full"></div>
        <p className="owner_name font-semibold">{username}</p>
      </div>
      {!isMe && (
        <Button
          onClick={(e) => handleFollow(e)}
          className={`"bg-blue-400 rounded text-white " ${
            follow ? "bg-blue-300 hover:bg-blue-400" : ""
          }`}
        >
          {loading ?   <>
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
                  </>:follow ? "followed" : <FaPlus />}
        </Button>
      )}
    </div>
  );
}
