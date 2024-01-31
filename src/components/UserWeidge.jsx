import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AxiosInstance from "@/lib/AxiosInstance";

export default function UserWeidge({ username, isMe, userId, user }) {
  const Navigate = useNavigate();
  const navigate = useNavigate();
  const [follow, setFollow] = useState(false); // Initialize follow state

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
    // Check if the current user is already following this user
    const isFollowing = user.following.includes(userId);
    setFollow(isFollowing);
  }, []);

  const { loading } = useSelector((state) => state.user);

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
                {/* Animation SVG content */}
              </svg>
              wait...
            </>
          ) : (
            follow ? "followed" : <FaPlus />
          )}
        </Button>
      )}
    </div>
  );
}
