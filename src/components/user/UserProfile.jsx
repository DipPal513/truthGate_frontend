import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { GoDownload } from "react-icons/go";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AxiosInstance from "@/lib/AxiosInstance";
import { Skeleton } from "../ui/skeleton";
import { Helmet } from "react-helmet";
const Post = React.lazy(() => import("@/components/Post"));

export default function UserProfile() {
  const [currUser, setUser] = useState(null);
  const [data, setData] = useState("");
  const [userBio, setBio] = useState(currUser?.bio);
  const dispatch = useDispatch("");
  const { id } = useParams("");
  const { bioLoading, user } = useSelector((state) => state.user);

  const loadUser = async () => {
    try {
      const { data } = await AxiosInstance.get(`/api/v1/user/${id}`, {
        withCredentials: true,
      });
      setUser(data.user);
      setBio(data.user.bio);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const isMe = user?._id === id;
  const isFollowed = currUser?.followers.includes(user?._id);

  const bioHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await AxiosInstance.put(
        "/api/v1/user/bio",
        {
          bio: data,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Bio added successfully.");
        setBio(res.data?.userBio);
        setData("");
      }
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, [dispatch]);

  const handleDownloadAvatar = () => {
    if (currUser && currUser.avatar && currUser.avatar.url) {
      const anchor = document.createElement("a");
      anchor.href = currUser.avatar.url;
      anchor.download = currUser.avatar.url;
      anchor.click();
    }
  };

  return (
    <div className="">
      <Helmet>
        <title>{`user profile page of ${currUser?.name}`}</title>
        <meta
          name="description"
          content="user profile of truthgate social media"
        />
        <meta name="keywords" content="explore, allusers, truthgate" />
      </Helmet>
      <div className="mt-4 px-4  max-w-screen-sm mx-auto">
        <Avatar className=" mb-4 w-[130px] h-[130px] p-1 border-blue-100 border-4">
          <Popover>
            <PopoverTrigger>
              <AvatarImage
                src={
                  currUser?.avatar?.url
                    ? currUser.avatar.url
                    : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"
                }
                alt="profile picture"
                className="object-cover"
              />
            </PopoverTrigger>

            <PopoverContent className="w-[90vw]">
              <div className="flex flex-col gap-y-3">
                <img
                  src={
                    currUser?.avatar?.url
                      ? currUser.avatar.url
                      : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"
                  }
                  className="w-full h-full"
                  alt="profile picture"
                />
                <Button variant="outline" onClick={handleDownloadAvatar}>
                  <GoDownload />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <AvatarFallback>PROFILE IMAGE</AvatarFallback>
        </Avatar>

        <h1
          className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl"
          style={{ wordWrap: "break-word" }}
        >
          {currUser?.username}
        </h1>

        {!isMe && (
          <button
            className={` bg-blue-600 text-white px-3 py-1 mt-4 rounded ${
              isFollowed && " bg-blue-300 px-3"
            } `}
            onClick={() => handleFollow}
          >
            {isFollowed ? "following" : "follow"}
          </button>
        )}

        <div className="bio_section">
          <p className="mt-3 text-[15px] text-gray-500 font-semibold dark:text-gray-300">
            {userBio}
          </p>
          {isMe && (
            <Popover>
              <PopoverTrigger className="underline text-gray-800 capitalize mt-3 dark:text-white">
                add bio
              </PopoverTrigger>
              <PopoverContent>
                <form onSubmit={bioHandler} className="flex flex-col gap-y-3">
                  <Textarea
                    required
                    placeholder="bio must be within 80 words.."
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
                  <Button type="submit">
                    {bioLoading ? (
                      <>
                        <svg
                          aria-hidden="true"
                          role="status"
                          class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
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
                            fill="#1C64F2"
                          />
                        </svg>
                        wait...
                      </>
                    ) : (
                      "Add bio"
                    )}
                  </Button>
                </form>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="flex items-center gap-x-3 my-10">
          <div className="flex flex-col gap-y-2">
            <p className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">
              {currUser?.following?.length}
            </p>
            <span className="font-bold">following</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">
              {currUser?.followers?.length}
            </p>
            <span className="font-bold">followers</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">
              {currUser?.posts?.length}
            </p>
            <span className="font-bold">posts</span>
          </div>
        </div>

        <h2 className="font-bold mt-4 text-2xl capitalize">Timeline</h2>
        <hr className="mt-3" />
        <div className="all_users_post flex flex-col-reverse">
          {currUser?.posts?.length <= 0 ? (
            <h1 className="mt-5 text-gray-500 font-bold text-lg">
              No Post Yet
            </h1>
          ) : (
            currUser?.posts.map((post, index) => (
              <Suspense
                key={index}
                fallback={
                  <div className="flex flex-col space-x-4 border-slate-400 mb-5">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <div className="space-y-3 mt-4">
                      <Skeleton className="w-full h-2" />
                      <Skeleton className="w-full h-2" />
                      <Skeleton className="w-full h-2" />
                      <div className="flex items-center justify-between">
                        <Skeleton className="w-12 h-8" />
                        <Skeleton className="w-12 h-8" />
                      </div>
                    </div>
                  </div>
                }
              >
                <Post post={post} username={currUser?.username} key={index} />
              </Suspense>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
