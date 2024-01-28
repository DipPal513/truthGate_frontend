import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FaRegCommentAlt, FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { TbMoodPlus } from "react-icons/tb";
import {formatDistanceToNow} from 'date-fns'
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


export default function Post({ post,loadPost }) {
  // all states
  const [comment, setComment] = useState();
  const [like, setLike] = useState();
  const [follow, setFollow] = useState(false);
  // props data destructuring
  const { image, _id, caption, owner, likes, comments,createdAt } = post;
  const [likeCount, setLikeCount] = useState(likes.length);
  // 

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  

  
  const likeHandler = async () => {
    dispatch(likeRequest());
    
    try {
      const { data } = await axios.get(`/api/v1/post/${_id}`);
      if (data.liked) {
        dispatch(likeSuccess(data.liked));
        
        setLike(true);
        setLikeCount(likes.length);
        toast.success("Post liked");
      }
      if (!data.liked) {
        dispatch(likeSuccess(data.liked));
        setLike(false);
        toast.success("Post unliked!");
      }
      if (!data.success) {
        dispatch(likeFailure(data.message));
      }
    } catch (error) {
      
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
  
  const handleFollow = async (id) => {
   
    const isMe = id == user?._id;

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
  
  useEffect(()=>{
    likes.forEach(like => like._id == user._id ?setLike(true) :setLike(false)) 
  },[]);
  // useEffect(()=>{
    
  // },[like])

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
          src={image.url}
          alt="post image"
          className="rounded mb-3 max-h-[300px] mx-auto"
          loading="lazy"
        />
        {createdAt &&<p className="text-gray-500 text-sm mb-4 font-semibold">{formatDistanceToNow(new Date(createdAt),{addSuffix:true})}</p>}
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
                      isMe={likedUser?._id == user?._id}
                      userId={likedUser._id}
                      handleFollow={handleFollow}
                      key={index}
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
                  comments.map((comment,index) => (
                    <div className="comments flex flex-col gap-y-2 mb-3 " key={index}>
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
