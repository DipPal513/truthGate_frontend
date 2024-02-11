import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FaRegCommentAlt, FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { TbMoodPlus } from "react-icons/tb";
import { formatDistanceToNow } from "date-fns";
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
  commentRequest,
  commentSuccess,
  commentFailure,
} from "@/redux/features/postSlice";
import { MdDeleteForever } from "react-icons/md";
import { Textarea } from "./ui/textarea";
import AxiosInstance from "@/lib/AxiosInstance";
import Like from "./post/Like";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Navigate, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Post = ({ username = "", post, loadPost = () => {} }) => {
  console.count("post component rendered ");

  const { image, _id, caption, owner, likes, comments, createdAt } = post;

  // all states
  const [comment, setComment] = useState();

  const [follow, setFollow] = useState(false);
  // props data destructuring

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { likeLoading, commentLoading } = useSelector((state) => state.post);

  // post comment
  const commentHandler = async (e) => {
    e.preventDefault();
    comment
      ? (async () => {
          try {
            dispatch(commentRequest());
            const { data } = await AxiosInstance.put(
              `/api/v1/post/comment/${_id}`,
              { comment },
              { withCredentials: true }
            );
            if (data.success) {
              toast.success("comment added.");
              dispatch(commentSuccess(data.comment));
              setComment("");
            }
          } catch (error) {
            toast.error("comment failed!");
            setComment("");
            dispatch(commentFailure(error));
          }
        })()
      : toast.error("comment cannot be empty!");
  };

  const handleFollow = async (id) => {
    const isMe = id == user?._id;

    if (!isMe) {
      const { data } = await AxiosInstance.get(`/api/v1/follow/${id}`, {
        withCredentials: true,
      });
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
    loadPost();
  }, [dispatch]);
  
 const postDeleteHandler = async () =>{
  console.log("post delete triggered")
   try {
    const {data} = await AxiosInstance.delete(`/api/v1/deletepost/${_id}`);
    if(data.success){
      toast.success("Post deleted");
    }
    else if(!data.success){
      toast.error("post deletion failed!")
    }
   } catch (error) {
    console.log(error.message);
    toast.error("failed to delete post!")
   }
 }
const navigate = useNavigate();
const shouldDelete = owner == user?._id;

  return (
    <Card className="mt-2 rounded">
      <CardHeader>
       <div className="flex items-center justify-between">
       <div className="flex items-center gap-x-2">
        <Avatar>
           <AvatarImage src={owner?.avatar?.url} className="object-contain"/>
           <AvatarFallback><img src="https://cdn-icons-png.flaticon.com/128/4566/4566915.png" alt="" /></AvatarFallback>
         </Avatar>
          <div className="owner_name font-semibold"  onClick={() => navigate(`/user/${owner?._id}`)}>
           <p>{!owner?.username ? username : owner?.username}
            </p> 
            {createdAt && (
          <p className="text-gray-500 text-xs font-semibold ">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        )}
          </div>
        </div>
        {shouldDelete && 
<AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline"><MdDeleteForever/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={postDeleteHandler}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        
        }
        
       </div>
        
      </CardHeader>
      <CardContent>

        {!(image == null) && <img
          src={image?.url}
          alt="post image"
          className="rounded mb-3 max-h-[300px] mx-auto"
          loading="lazy"
        />}
       
        <p>{caption}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Like
          likes={likes}
          follow={follow}
          setFollow={setFollow}
          handleFollow={handleFollow}
          likeLoading={likeLoading}
          _id={_id}
        />
        <div className="flex items-center gap-x-2">
          <Popover>
            <PopoverTrigger>{comments?.length}</PopoverTrigger>
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
                <form onSubmit={commentHandler} className="post_comment mb-4">
                  <Textarea
                    placeholder="comment"
                    required
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                  <Button variant={"outline"} className="mt-3" type="submit">
                    {commentLoading ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "comment"
                    )}
                  </Button>
                </form>

                {comments?.length == 0 ? (
                  <p className="py-5">No comments yet</p>
                ) : (
                  comments?.map((comment, index) => (
                    <div
                      className="comments flex flex-col gap-y-2 mb-3 "
                      key={index}
                    >
                      <div className="single_comment bg-gray-100 p-1 dark:bg-gray-900">
                        <div className="user flex items-center gap-x-3 mt-5  px-3 flex-wrap">
                          {/* avatar */}
                          <div className="avatar w-8 h-8 rounded-full bg-red-500"></div>
                          <p className="font-bold ">{comment?.user?.username}</p>
                        </div>

                        <div className="comment p-1">
                          <p className="text-gray-900 text-md mt-2 px-2 dark:text-gray-100">
                            {comment?.comment}
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
};
export default React.memo(Post);
