import React, { useEffect, useState } from "react";
import moment from "moment";
import useAxios from "../../CustomHooks/useAxios";
import { Link, useLocation } from "react-router";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";

const Blog = () => {
    const axiosSecure = useAxios();
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const location = useLocation()

    useEffect(() => {
            if (location.pathname === "/blogs") {
                window.document.title = "Blogs | Blood Bond";
            }
        }, [location.pathname]);

    useEffect(() => {
        const fetchPublishedBlogs = async () => {
            try {
                const res = await axiosSecure.get("/blogs?status=published");
                setBlogs(res.data);
            } catch (err) {
                console.error("Failed to fetch blogs", err);
            }
        };

        fetchPublishedBlogs();
    }, [axiosSecure]);

    // Pagination logic
    const totalPages = Math.ceil(blogs.length / itemsPerPage);
    const paginatedBlogs = blogs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="px-6 py-12 overflow-x-auto">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Published Blogs</h1>

            {paginatedBlogs.length === 0 ? (
                <p className="text-center my-20">No published blogs available.</p>
            ) : (
                <>
                    <div className="overflow-x-auto rounded border shadow">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-left font-bold text-gray-600">
                                        Thumbnail
                                    </th>
                                    <th className="px-4 py-3 text-left font-bold text-gray-600">
                                        Title
                                    </th>
                                    <th className="px-4 py-3 text-left font-bold text-gray-600">
                                        Author
                                    </th>
                                    <th className="px-4 py-3 text-left font-bold text-gray-600">
                                        Published At
                                    </th>
                                    <th className="px-4 py-3 text-left font-bold text-gray-600">
                                        Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {paginatedBlogs.map((blog) => (
                                    <tr
                                        key={blog._id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="px-4 py-3">
                                            <img
                                                src={blog.thumbnail}
                                                alt="thumb"
                                                className="w-20 h-14 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-4 py-3">{blog.title}</td>
                                        <td className="px-4 py-3">{blog.authorName}</td>
                                        <td className="px-4 py-3">
                                            {moment(blog.createdAt).format("LLL")}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Link
                                                to={`/blog-details/${blog._id}`}
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination className="mt-6">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={handlePrevious}
                                        className={`${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <span className="text-sm text-gray-700 mt-1">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={handleNext}
                                        className={`${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}`}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </>
            )}
        </div>
    );
};

export default Blog;
