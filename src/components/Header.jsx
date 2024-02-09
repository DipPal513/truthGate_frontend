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

export default function Header() {
  console.count("header component rendered");

  // 
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await AxiosInstance.post("/api/v1/logout", {
      withCredentials: true,
    });
    dispatch(logoutUser(null));
    toast.success(res.data.message);
    navigate("/login");
  };

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
       <PopoverContent className="bg-white border-gray-800 shadow-lg px-4 py-5 rounded w-[90vw] mr-12">
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
           <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
           <AvatarFallback>CN</AvatarFallback>
         </Avatar>
       </MenubarTrigger>
       <MenubarContent>
         <MenubarItem inset className="hover:bg-gray-900">
           <Link to={"/profile"} className="flex items-center gap-x-3">
             <CgProfile className="text-2xl" />
             <Link to="">view profile</Link>
           </Link>
         </MenubarItem>
         <MenubarItem inset className="hover:bg-gray-900">
           <Link to={"/settings"} className="flex items-center gap-x-3">
             <CiSettings className="text-2xl" />
             <p>Settings</p>
           </Link>
         </MenubarItem>
         <MenubarItem
           inset
           onClick={handleLogout}
           className="flex gap-x-3 hover:bg-gray-900"
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
