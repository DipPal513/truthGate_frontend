import React, { useEffect, useState } from "react";
import UserWeidge from "../UserWeidge";
import { useDispatch, useSelector } from "react-redux";
import AxiosInstance from "@/lib/AxiosInstance";
import toast from "react-hot-toast";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import {
  likeFailure,
  likeRequest,
  likeSuccess,
} from "@/redux/features/postSlice";
export default function Like({
  likes,
  follow,
  setFollow,
  handleFollow,
  likeLoading,
  _id
}) {
  const { user } = useSelector((state) => state.user);
  const [like, setLike] = useState();
  const [likeCount, setLikeCount] = useState(likes.length);
  // const [loading, setLoading] = useState(likeLoading);
  const dispatch = useDispatch();

  const likeHandler = async () => {
    dispatch(likeRequest());
    console.log("likehandler triggered")
    try {
      const { data } = await AxiosInstance.get(`/api/v1/post/${_id}`, {
        withCredentials: true,
      });
      
      if (data.liked) {
        dispatch(likeSuccess(data.liked));
        setLike(true);
        setLikeCount(likes.length);
        toast.success("Post liked");
      }
      if (!data.liked) {
        dispatch(likeSuccess(data.liked));
        setLike(false);
        setLikeCount(likes.length);
        toast.success("Post unliked!");
      }
      if (!data.success) {
        dispatch(likeFailure(data.message));
      }
    } catch (error) {}
  };

  useEffect(()=>{
    setLike(likes.map(item => item._id == user._id));
    setLikeCount(likes.length)
  },[])
  console.log(likes)
  return (
    <div className="flex items-center gap-x-3">
      <Popover>
        <PopoverTrigger>{likeCount}</PopoverTrigger>
        <PopoverContent>
          <div className="">
            <h2 className="font-bold text-xl px-4 flex items-center gap-x-2">
              <p>{likeCount}</p>
              <FcLike />
            </h2>
            <hr className="my-2" />
            {likes?.map((likedUser, index) => (
              <UserWeidge
                username={likedUser.username}
                follow={follow}
                isMe={likedUser?._id == user?._id}
                userId={likedUser._id}
                handleFollow={handleFollow}
                key={index}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <div
        className="bg-none duration-300 transition-all cursor-pointer"
        onClick={likeHandler}
      >
        {
         like ? (
          <FcLike className="text-2xl" />
        ) : (
          <FaRegHeart className="text-2xl" />
        )}
      </div>
    </div>
  );
}
