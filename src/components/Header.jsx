import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "@/mode-toggle";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logoutUser } from "@/redux/features/userSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdHome, MdOutlineExplore } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { CiLogout, CiSettings } from "react-icons/ci";
import LangToggler from "./LangToggler";

export default function Header() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await axios.post("/api/v1/logout");
    dispatch(logoutUser(null));
    toast.success("successfully logged out!");
    navigate("/login");
  };
  return (
    <Menubar className="justify-between h-16">
      <MenubarMenu>
        <MenubarTrigger>
          <ModeToggle />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <Link to={"/"}>
          <MdHome />
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <LangToggler />
      </MenubarMenu>
      <MenubarMenu>
        <Link to={"/explore"}>
          <MdOutlineExplore />
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
                <p>view profile</p>
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
    </Menubar>
  );
}
