import axios from "axios";
import React, { useRef, useState } from "react";
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

export default function CreatePost() {
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

  const handlePost = async () => {
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
      console.log(data);
    }
    console.log(loading);
  };
  return (
    <div className="content py-4">
      <Textarea
        placeholder="add post"
        required
        onChange={(e) => setPost(e.target.value)}
        className="mb-4 rounded px-4 text-gray-600 font-semibold"
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
            file:disabled:opacity-50 file:disabled:pointer-events-none
            dark:file:bg-blue-500
            dark:hover:file:bg-blue-400
"
            ref={fileRef}
            required
            onChange={(e) => imageHandler(e)}
          />
        </label>
      </div>

      <button type="button" class="bg-indigo-500 ...">
        <svg class="animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24"></svg>
        Processing...
      </button>
      <Button
        onClick={handlePost}
        className={`"mt-4" ${
          loading
            ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed select-none"
            : ""
        }`}
        disable={!loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}
