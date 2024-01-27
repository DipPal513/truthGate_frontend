import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function UserProfile() {
  const [user, setUser] = useState();
  const { id } = useParams();
  console.log(id);
  const loadUser = async () => {
    const { data } = await axios.get(`/api/v1/user/${id}`);
    setUser(data.user);
  };
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="">
      <div className="mt-4 px-4">
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
      </div>
    </div>
  );
}
