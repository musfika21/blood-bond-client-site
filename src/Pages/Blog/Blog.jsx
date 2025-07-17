import React, { useEffect, useState } from "react";
import moment from "moment";
import useAxios from "../../CustomHooks/useAxios";

const Blog = () => {
    const axiosSecure = useAxios();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchPublishedBlogs = async () => {
            try {
                const res = await axiosSecure.get("/blogs/published");
                setBlogs(res.data);
            } catch (err) {
                console.error("Failed to fetch blogs", err);
            }
        };

        fetchPublishedBlogs();
    }, [axiosSecure]);

    return (
        <div className="p-5 overflow-x-auto">
            <h1 className="text-2xl font-bold mb-4">Published Blogs</h1>
            {blogs.length === 0 ? (
                <p className="text-center my-20">No published blogs available.</p>
            ) : (
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Title</th>
                            <th className="border px-4 py-2">Author</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Created At</th>
                            <th className="border px-4 py-2">Thumbnail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{blog.title}</td>
                                <td className="border px-4 py-2">{blog.authorName}</td>
                                <td className="border px-4 py-2">{blog.authorEmail}</td>
                                <td className="border px-4 py-2">{moment(blog.createdAt).format("LLL")}</td>
                                <td className="border px-4 py-2">
                                    <img src={blog.thumbnail} alt="thumb" className="w-16 h-12 object-cover rounded" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Blog;
