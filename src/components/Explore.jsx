import React, { Suspense, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUserFailure,
  getAllUserRequest,
  getAllUserSuccess,
} from "@/redux/features/userSlice";
import axios from "axios";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const UserWeidge = React.lazy(() => import("@/components/UserWeidge"));

const userLoader = (
  <div className="flex items-center mb-3 px-2 py-3">
    <Skeleton className="w-8 h-8 rounded-full" />
    <div className="rightside">
      <Skeleton className="w-24 h-5" />
      <Skeleton className="w-2/3 h-4 " />
    </div>
  </div>
);

export default function Explore() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const loadAllUsers = async () => {
    dispatch(getAllUserRequest());
    try {
      const { data } = await axios.get("/api/v1/users");
      console.log(data);
      if (data.success) {
        dispatch(getAllUserSuccess(data.users));
        setUsers(data.users);
        console.log(data.users);
      } else {
        dispatch(getAllUserFailure(data.message));
      }
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  useEffect(() => {
    loadAllUsers();
  }, [dispatch]);

  const { user } = useSelector((state) => state.user);

  const filteredUsers = users.filter((user) =>
    name === "" ? user : user?.username?.toLowerCase().includes(name)
  );
 
  return (
    <div className="w-screen mx-auto">
      <div className="box flex items-center mx-3">
        <Input
          placeholder="Name..."
          required
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <Button className="my-3" variant={"outline"}>
          Search
        </Button>
      </div>
      <div className="all_users">
        {filteredUsers.length === 0 ? (
          <p className="px-5 font-bold text-gray-500">No users found for {`"${name}"`}</p>
        ) : (
          filteredUsers.map((single_user) => (
            <Suspense key={single_user._id} fallBack={userLoader}>
              <UserWeidge
                username={single_user.username}
                isMe={single_user._id === user?._id}
                user={single_user}
                userId={single_user?._id}
               
              />
            </Suspense>
          ))
        )}
      </div>
    </div>
  );
}
