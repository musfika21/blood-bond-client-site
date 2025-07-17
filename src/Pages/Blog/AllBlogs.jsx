import { useEffect, useState } from "react";
import useAxios from "@/CustomHooks/useAxios";
import { Button } from "@/components/ui/button";
import useAuth from "@/CustomHooks/useAuth";

const AllBlogs = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchBlogs = async () => {
    const res = await axiosSecure.get("/blogs");
    setBlogs(res.data);
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handlePublish = async (id) => {
    await axiosSecure.patch(`/blogs/publish/${id}`);
    fetchBlogs();
  };

  const handleUnpublish = async (id) => {
    await axiosSecure.patch(`/blogs/unpublish/${id}`);
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    await axiosSecure.delete(`/blogs/${id}`);
    fetchBlogs();
  };

  const filteredBlogs = blogs.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  return (
    <div>
      <select onChange={(e) => setFilter(e.target.value)} className="border rounded px-2 py-1 mb-4">
        <option value="all">All</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      <div className="grid gap-4">
        {filteredBlogs.map((blog) => (
          <div key={blog._id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-bold">{blog.title}</h3>
            <p className="text-sm text-gray-500 capitalize">Status: {blog.status}</p>
            <div className="mt-2 flex gap-2">
              {user?.role === "admin" && (
                <>
                  {blog.status === "draft" ? (
                    <Button onClick={() => handlePublish(blog._id)}>Publish</Button>
                  ) : (
                    <Button onClick={() => handleUnpublish(blog._id)} variant="outline">Unpublish</Button>
                  )}
                  <Button onClick={() => handleDelete(blog._id)} variant="destructive">Delete</Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
