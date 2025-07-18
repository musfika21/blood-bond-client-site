import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import useAxios from '../../CustomHooks/useAxios';
import useAuth from '../../CustomHooks/useAuth';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const axiosSecure = useAxios();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(blog)

    useEffect(() => {
        if (blog?.title) {
            document.title = blog.title;
        } else {
            document.title = "Loading Blog...";
        }
    }, [blog]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axiosSecure.get(`/blogs/${id}`);
                setBlog(res.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load blog");
            }
        };

        if (id) fetchBlog();
    }, [id, axiosSecure]);

    const handlePublish = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to publish this blog?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, publish it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.patch(`/blogs/publish/${id}`);
                if (res.data.modifiedCount > 0) {
                    setBlog((prev) => ({ ...prev, status: 'published' }));

                    await Swal.fire({
                        title: 'Published!',
                        text: 'The blog has been published successfully.',
                        icon: 'success',
                        confirmButtonColor: '#16a34a'
                    });
                    navigate('/dashboard/content-management')
                } else {
                    await Swal.fire({
                        title: 'Failed!',
                        text: 'Blog publish failed. Try again.',
                        icon: 'error'
                    });
                }
            } catch (err) {
                console.error(err);
                await Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong while publishing.',
                    icon: 'error'
                });
            }
        }
    };

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this blog!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#d33',
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/blogs/${id}`);
                if (res.data.deletedCount > 0) {
                    toast.success("Blog deleted!");
                    navigate("/dashboard/content-management");
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to delete");
            }
        }
    };

    if (!blog) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 mt-5">
            <h1 className="text-3xl font-bold">{blog.title}</h1>

            <img src={blog.thumbnail} alt="Blog Thumbnail" className="w-full rounded border object-cover" />
            <div className="prose max-w-none">
                <p>{blog.content}</p>
            </div>

            <h2 className='font-bold text-lg'>About the Author</h2>
            <div>
                <div className="flex items-center gap-5">
                    <img
                        src={blog.authorPhoto}
                        alt={blog.authorName}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="font-medium">{blog.authorName}</p>
                        <p className="text-sm text-gray-500">{blog.authorEmail}</p>
                    </div>
                </div>
                <div className='border-b-2 border-gray-300 my-4'></div>
                <div className="mt-4 flex gap-5">
                    <p className="text-sm font-medium">Published on</p>
                    <p className="text-gray-600 text-sm">
                        {moment(blog.createdAt).format('LLL')}
                    </p>
                </div>
                <div className='border-b-2 border-gray-300 my-4'></div>
            </div>

            {/* Admin-only actions */}
            <div className='flex justify-end gap-4'>
                {
                    currentUser?.role === "admin" && blog.status === "draft" && (
                        <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700 text-white cursor-pointer">
                            Publish
                        </Button>
                    )
                }
                {
                    currentUser?.role === "admin" && (
                        <Button onClick={handleDelete} variant="destructive" className="cursor-pointer">
                            Delete
                        </Button>
                    )
                }
            </div>
        </div>
    );
};

export default BlogDetails;
