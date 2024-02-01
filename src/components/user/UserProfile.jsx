import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import AxiosInstance from "@/lib/AxiosInstance";
import Post from "../Post";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { bioRequest, bioSuccess } from "@/redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
export default function UserProfile() {
  const [user, setUser] = useState();
  const [bio, setBio] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  const loadUser = async () => {
    const { data } = await AxiosInstance.get(`/api/v1/user/${id}`,{withCredentials:true});
    setUser(data.user);
  };
  
  // const isMe = id == user._id;
  
  const bioHandler = async (e) =>{
    e.preventDefault()
    dispatch(bioRequest())
    try {
      const res = AxiosInstance.put("/api/v1/user/bio",{bio:bio});
      dispatch(bioSuccess(bio))
    } catch (error) {
      dispatch(error.message)
    }
    
  }
  useEffect(() => {
    loadUser();
  }, [dispatch]);
  const {bioLoading} = useSelector(state => state.user);
  
  return (
    <div className="">
      <div className="mt-4 px-4  max-w-screen-sm mx-auto">
        <Avatar className=" mb-4 w-[130px] h-[130px]">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className=""
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {user?.username}
        </h1>
        <div className="bio_section">
          <p className="mt-3 text-[15px] text-gray-700">Lorem ipsum dolor sit, ametluta perspiciatis nesciunt accusantium hic vero tempore accusamus </p>
          {isMe && <Popover>
            <PopoverTrigger className="underline text-gray-800 capitalize mt-3">add bio</PopoverTrigger>
            <PopoverContent>
              <form onSubmit={bioHandler}>
              <Textarea required placeholder="add bio" onChange={e => setBio(e.target.value)}/>
    <Button type="submit">{bioLoading ? "loading":"Add bio"}</Button>
              </form>
            </PopoverContent>
          </Popover>}
        </div>
      <div className="flex items-center gap-x-3 my-10">
        <div className="flex flex-col gap-y-2">
          <p className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">{user?.following?.length}</p>
          <span className="font-bold">following</span>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">{user?.followers?.length}</p>
          <span className="font-bold">followers</span>
        </div>
        <div className="flex flex-col gap-y-2">
           <p className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">{user?.following?.length}</p>
          <span className="font-bold">posts</span>
        </div>
      </div>
        <button className="px-2 py-1 bg-blue-500 rounded text-white mt-3">
          Follow
        </button>
        <h2 className="font-bold mt-4 text-2xl capitalize">Timeline</h2>
        <hr className="mt-3"/>
        <div className="all_users_post">
          {user?.posts.length <= 0 ? <h1 className="mt-5 text-gray-500 font-bold text-lg">No Post Yet</h1>:user?.posts.map(post => <Post post={post}/>)}
        </div>
      </div>
    </div>
  );
}
