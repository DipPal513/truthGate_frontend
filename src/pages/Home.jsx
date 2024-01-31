import React, { Suspense, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  postFailure,
  postRequest,
  postSuccess,
} from "@/redux/features/postSlice";
import { useTranslation } from "react-i18next";
import AxiosInstance from "@/lib/AxiosInstance";

//
const Post = React.lazy(() => import("@/components/Post"));

export default function Home() {

  // for language

  const {t} = useTranslation();
  const dispatch = useDispatch();

  // load all posts of following
  const loadPost = async () => {
    dispatch(postRequest());
    const { data } = await AxiosInstance.get("/api/v1/posts",{withCredentials:true});
    if (data.success) {
      dispatch(postSuccess(data.posts));
    } else {
      dispatch(postFailure(data.message));
    }
  };
  // post on render
  useEffect(() => {
    loadPost();
  }, [dispatch]);

  
 
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
 

  return (
    <div className="px-3 py-2 md:max-w-screen-sm mx-auto">
      <div className="feed mt-5">
        {posts?.map((post, index) => (
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
            <Post post={post} key={index} loadPost={loadPost}/>
          </Suspense>
        ))}
      </div>
    </div>
  );
}
