import React from "react";
import { Button } from "./ui/button";
import { MdFileDownloadDone } from "react-icons/md";
import { TbMoodPlus } from "react-icons/tb";
import {useNavigate} from "react-router-dom"

export default function UserWeidge({ username, isMe, userId, follow,handleFollow,user={} }) {
    const navigate = useNavigate();

  return (
    <div className="flex items-center gap-x-2 justify-between px-4 mb-3 transition-all duration-200 hover:bg-gray-200 rounded py-2 cursor-pointer" onClick={()=> navigate(`/user/${userId}`)}>
      <div className="flex items-center gap-x-2">
        <div className="img w-10 h-10 bg-blue-500 rounded-full"></div>
        <p className="owner_name font-semibold">{username}</p>
      </div>
      {!isMe && (
        <Button
          onClick={() =>handleFollow(userId)}
          className="bg-blue-400 rounded text-white "
        >
          {follow ? <MdFileDownloadDone /> : <TbMoodPlus />}
        </Button>
      )}
    </div>
  );
}
