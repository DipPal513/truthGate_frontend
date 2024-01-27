import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FaRegCommentAlt, FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { TbMoodPlus } from "react-icons/tb";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  likeFailure,
  likeRequest,
  likeSuccess,
} from "@/redux/features/postSlice";
import { Textarea } from "./ui/textarea";
import { MdFileDownloadDone } from "react-icons/md";
import UserWeidge from "./UserWeidge";

export default function Post({ post }) {
  const { image, _id, caption, owner, likes, comments } = post;
  const [likeCount, setLikeCount] = useState(likes.length);
  const [like, setLike] = useState(false);
  const [follow, setFollow] = useState(false);
  const [comment, setComment] = useState();
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const likeHandler = async () => {
    dispatch(likeRequest());

    try {
      const { data } = await axios.get(`/api/v1/post/${_id}`);
      if (data.liked) {
        setLike(true);
        dispatch(likeSuccess(data.liked));
        toast.success("Post liked");
        setLikeCount(likes.length);
      }
      if (!data.liked) {
        setLikeCount(likes.length);

        setLike(false);
        toast.success("Post unliked!");
      }
      if (!data.success) {
        dispatch(likeFailure(data.message));
      }
      dispatch(getFollowingPosts());

      // Update like count based on the current state
      // setLikeCount(prevCount => (data.liked ? prevCount + 1 : prevCount - 1));
    } catch (error) {
      // Handle error
    }
  };

  // post comment

  const commentHandler = async () => {
    comment
      ? (async () => {
          try {
            const { data } = await axios.put(
              `/api/v1/post/comment/${_id}`,
              { comment },
              { withCredentials: true }
            );
            if (data.success) {
              toast.success("comment added.");
              setComment("");
            }
          } catch (error) {
            toast.error("comment failed!");
            setComment("");
          }
        })()
      : toast.error("comment cannot be empty!");
  };

  //
  useEffect(() => {
    setLikeCount(likes.length);
   
  }, [likeCount]);

  const handleFollow = async (id) => {
   
    const isMe = id == user._id;

    if (!isMe) {
      const { data } = await axios.get(`/api/v1/follow/${id}`);
      if (data.follow) {
        setFollow(true);
        toast.success("user followed");
      } else {
        setFollow(false);
        toast.success("user unfollowed");
      }
    }
  };
  useEffect(() => {
    likes.forEach((like) => {
      if (like._id === user._id) {
        setLike(true);
      }
    });
  }, [dispatch]);
  // useEffect(() => {
  //   likes.forEach((like) => {
    
  //     if (like?._id == user._id) {
  //       setFollow(true);
  //     }
  //   });
  // }, []);
  return (
    <Card className="mt-2 rounded">
      <CardHeader>
        <div className="flex items-center gap-x-2">
          <div className="img w-10 h-10 bg-blue-500 rounded-full"></div>
          <div className="owner_name font-semibold">{owner.username}</div>
        </div>
      </CardHeader>
      <CardContent>
        <img
          src="https://media.istockphoto.com/id/1297159365/photo/portrait-of-young-smiling-woman-face-partially-covered-with-flying-hair-in-windy-day-standing.jpg?s=612x612&w=0&k=20&c=I16c_ZzQHEeGoPUVrVP9pPusSzsmymvVKdQVgPuVdDo="
          alt=""
          className="rounded mb-3"
        />
        <p>{caption}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          {likes.length ? (
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
                      isMe={likedUser._id == user._id}
                      userId={likedUser._id}
                      handleFollow={handleFollow}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            ""
          )}
          <div
            className="bg-none duration-300 transition-all cursor-pointer"
            onClick={likeHandler}
          >
            {like ? (
              <FcLike className="text-2xl" />
            ) : (
              <FaRegHeart className="text-2xl" />
            )}
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Popover>
            <PopoverTrigger>{comments.length}</PopoverTrigger>
            <PopoverContent>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-x-2">
                  <div className="img w-10 h-10 bg-blue-500 rounded-full"></div>
                  <div className="owner_name font-semibold">John Doe</div>
                </div>
                <Button className="bg-blue-400 rounded text-white">
                  <TbMoodPlus />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <div className="cursor-pointer">
            <Popover>
              <PopoverTrigger>
                <FaRegCommentAlt className="text-xl" />
              </PopoverTrigger>
              <PopoverContent>
                <div className="post_comment mb-4">
                  <Textarea
                    placeholder="comment"
                    required
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                  <Button
                    variant={"outline"}
                    className="mt-3"
                    onClick={commentHandler}
                  >
                    comment
                  </Button>
                </div>

                {comments.length == 0 ? (
                  <p className="py-5">No comments yet</p>
                ) : (
                  comments.map((comment) => (
                    <div className="comments flex flex-col gap-y-2 mb-3 ">
                      <div className="single_comment bg-gray-100 p-1">
                        <div className="user flex items-center gap-x-3 mt-5  px-3 flex-wrap">
                          {/* avatar */}
                          <div className="avatar w-8 h-8 rounded-full bg-red-500"></div>
                          <p className="font-bold">{comment?.user?.username}</p>
                        </div>

                        <div className="comment p-1">
                          <p className="text-gray-900 text-md mt-2 px-2">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
