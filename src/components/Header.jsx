import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "@/mode-toggle";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "@/redux/features/userSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdHome, MdOutlineExplore } from "react-icons/md";

import { CiLogout, CiSettings } from "react-icons/ci";

import { FaPlus } from "react-icons/fa";
import { Popover, PopoverTrigger } from "./ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";

import CreatePost from "./post/CreatePost";
import AxiosInstance from "@/lib/AxiosInstance";
import { memo } from "react";

function Header() {
  console.count("header component rendered");

  // 
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await AxiosInstance.post("/api/v1/logout", {
      withCredentials: true,
    });
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }

    dispatch(logoutUser(null));
    toast.success(res.data.message);
    navigate("/login");
  };
console.log(user)
  return (
   <div className="max-w-screen-sm mx-auto"> <Menubar className="justify-between h-16">
    
   <MenubarMenu>
     <Link to={"/"} className=" px-3 py-3 rounded">
       <MdHome className="text-2xl"/>
     </Link>
   </MenubarMenu>
   <MenubarMenu>
     {/* <LangToggler /> */}
     <Popover>
       <PopoverTrigger>
         <FaPlus className="text-2xl"/>
       </PopoverTrigger>
       <PopoverContent className="bg-white border-gray-800 shadow-lg px-4 py-5 rounded w-full mr-12 dark:bg-gray-900 z-[111111] ">
         <CreatePost />
       </PopoverContent>
     </Popover>
   </MenubarMenu>
   <MenubarMenu>
     <Link to={"/explore"}>
       <MdOutlineExplore className="text-2xl"/>
     </Link>
   </MenubarMenu>

   {isAuthenticated ? (
     <MenubarMenu>
       <MenubarTrigger>
         {" "}
         <Avatar>
           <AvatarImage src={user?.avatar?.url} className="object-contain"/>
           <AvatarFallback><img src="https://cdn-icons-png.flaticon.com/128/4566/4566915.png" alt="" /></AvatarFallback>
         </Avatar>
       </MenubarTrigger>
       <MenubarContent>
         <MenubarItem inset className="hover:bg-gray-200 dark:hover:text-gray-900">
           <Link to={`/user/${user?._id}`} className="flex items-center gap-x-3">
             <CgProfile className="text-2xl" />
             <p>view profile</p>
           </Link>
         </MenubarItem>
         <MenubarItem inset className="hover:bg-gray-200 dark:hover:text-gray-900">
           <Link to={"/settings"} className="flex items-center gap-x-3">
             <CiSettings className="text-2xl" />
             <p>Settings</p>
           </Link>
         </MenubarItem>
         <MenubarItem
           inset
           onClick={handleLogout}
           className="flex gap-x-3 hover:bg-gray-200 dark:hover:text-gray-900"
         >
           <CiLogout className="text-2xl" />
           <p>Logout</p>
         </MenubarItem>
       </MenubarContent>
     </MenubarMenu>
   ) : (
     <MenubarMenu>
       <Link to="/login">Login</Link>
     </MenubarMenu>
   )}
 </Menubar></div>
  );
}
export default memo(Header)