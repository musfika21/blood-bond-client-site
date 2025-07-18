import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../CustomHooks/useAuth";
import useAxios from "../../CustomHooks/useAxios";
import { Button } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router";

const AddBlog = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const [posting, setPosting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/content-management/add-blog") {
      window.document.title = "Add Blog | Blood Bond";
    }
  }, [location.pathname]);

  const handleBlogSubmit = async (data) => {
    setPosting(true); // Start loading

    const imageFile = data.thumbnail[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const imageBBKey = import.meta.env.VITE_image_upload_key;
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${imageBBKey}`;

    try {
      const imgRes = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });
      const imgData = await imgRes.json();

      if (imgData.success) {
        const blogPost = {
          title: data.title,
          thumbnail: imgData.data.url,
          content: data.content,
          authorName: currentUser.name,
          authorEmail: currentUser.email,
          authorPhoto: currentUser.avatar,
          createdAt: new Date(),
          status: "draft",
        };

        const res = await axiosSecure.post("/blogs", blogPost);

        if (res.data.insertedId) {
          toast.success("Blog posted successfully!");
          reset();
          navigate("/dashboard/content-management");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setPosting(false); // End loading
    }
  };


  return (
    <div className="max-w-4xl mx-auto mt-5 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Add Blog</h2>
      <form onSubmit={handleSubmit(handleBlogSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Blog Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Enter blog title"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block mb-1 font-semibold">Thumbnail Image</label>
          <input
            {...register("thumbnail", { required: true })}
            type="file"
            accept="image/*"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer"
          />
          {errors.thumbnail && (
            <p className="text-red-500">Thumbnail is required</p>
          )}
        </div>

        {/* Content (Textarea instead of Editor) */}
        <div>
          <label className="block mb-1 font-semibold">Blog Content</label>
          <textarea
            {...register("content", { required: true })}
            placeholder="Write your blog content here..."
            rows={8}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          ></textarea>
          {errors.content && (
            <p className="text-red-500">Content is required</p>
          )}
        </div>

        {/* Submit */}
        <div>
          <Button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-800 cursor-pointer disabled:opacity-60"
            disabled={posting}
          >
            {posting ? "Posting..." : "Post Blog"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
