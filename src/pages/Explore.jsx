import AxiosInstance from "@/lib/AxiosInstance";
import {
    getAllUserFailure,
    getAllUserRequest,
    getAllUserSuccess,
} from "@/redux/features/userSlice";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";

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
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const dispatch = useDispatch();

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    dispatch(getAllUserRequest());
    try {
      const { data } = await AxiosInstance.get("/api/v1/users",{withCredentials:true});
   
      if (data.success) {
        dispatch(getAllUserSuccess(data.users));
        setFilteredUsers(data.users); // Initially set filteredUsers to all users
      } else {
        dispatch(getAllUserFailure(data.message));
      }
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error loading users:", error);
      setLoading(false); // Set loading to false if error occurs
    }
  };

  const handleSearch = async () => {
    setLoading(true); // Set loading to true when searching
    try {
      const { data } = await AxiosInstance.get(`/api/v1/users/search?username=${name}`,{withCredentials:true});
   
      if (data.success) {
        setFilteredUsers(data.users);
      } else {
        console.error("Error searching users:", data.message);
      }
      setLoading(false); // Set loading to false after searching
    } catch (error) {
      console.error("Error searching users:", error);
      setLoading(false); // Set loading to false if error occurs
    }
  };

  const {user} = useSelector(state => state.user);
  return (
    <div className="w-screen mx-auto">
      <div className="box flex items-center mx-3">
        <Input
          placeholder="Name..."
          required
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button className="my-3" variant={"outline"} onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div className="all_users">
        {loading ? ( // Render loading indicator if loading is true
          <div role="status" className="w-full text-center flex items-center h-[60vh] justify-center">
            <svg aria-hidden="true" class="w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <p className="px-5 font-bold text-gray-500">No users found for {`"${name}"`}</p>
        ) : (
          filteredUsers.map((single_user) => (
            <Suspense key={single_user._id} fallBack={userLoader}>
              <UserWeidge
                username={single_user.username}
                isMe={single_user._id == user?._id}
                user={user}
                userId={single_user?._id}
                avatar={single_user?.avatar}
              />
            </Suspense>
          ))
        )}
      </div>
    </div>
  );
}
