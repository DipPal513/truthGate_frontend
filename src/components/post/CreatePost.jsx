import axios from "axios";
import React, { memo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  postUploadFailure,
  postUploadRequest,
  postUploadSuccess,
} from "@/redux/features/postSlice";
import AxiosInstance from "@/lib/AxiosInstance";

function CreatePost() {
  console.count("create post rendering")
  const [post, setPost] = useState();
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const { loading } = useSelector((state) => state.post);
  const fileRef = useRef();
  const imageHandler = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();

    Reader.onload = () => {
      setImage(Reader.result);
    };

    Reader.readAsDataURL(file);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    dispatch(postUploadRequest());
    const { data } = await AxiosInstance.post(
      "/api/v1/post/upload",
      { caption: post, image: image },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    if (data.success) {
      dispatch(postUploadSuccess(data.post));
      setPost("");
      toast.success("Successfully Posted!");
      console.log("post success", data);
      fileRef.current.value = "";
    } else {
      postUploadFailure(data.message);
 
    }
console.log(data)
  };
  return (
    <form onSubmit={handlePost} className="content py-4 max-w-screen-sm mx-auto dark:bg-gray-900 dark:text-white">
      <Textarea
        placeholder="add post"
        required
        value={post}
        onChange={(e) => setPost(e.target.value)}
        className="mb-4 rounded px-4 text-gray-600 font-semibold dark:text-white"
      />
      <div className="mb-4">
        <label className="block py-4">
          <span className="sr-only">Choose profile photo</span>
          <Input
            type="file"
            className="cursor pointer block w-full text-sm text-gray-500
            file:me-4 file:py-1 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white
            hover:file:bg-blue-700
            file:disabled:opacity-50 file:disabled:pointer-events-none dark:border-white
            dark:file:bg-blue-500
            dark:hover:file:bg-blue-400
"
            ref={fileRef}
            required
            onChange={(e) => imageHandler(e)}
          />
        </label>
      </div>

      <Button
        type="submit"
        className={`"mt-4 dark:bg-gray-700 text-white " ${
          loading ? "bg-gray-400 hover:bg-gray-400 cursor-wait select-none " : ""
        }`}
        disable={!loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
}
export default memo(CreatePost)