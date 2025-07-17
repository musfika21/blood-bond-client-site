import React from 'react';
import moment from 'moment';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router';

const BlogCard = ({ blog }) => {
    return (
        <Card className="p-4 mb-4 bg-transparent shadow-none">
            <CardContent className="flex justify-between items-center gap-4 px-10">
                {/* Left Info */}
                <div className="flex flex-col gap-1 max-w-[70%] space-y-2 flex-1">
                    <CardTitle className="text-lg font-bold">{blog.title}</CardTitle>
                    <p className="text-sm">By: {blog.authorName}</p>
                    <p className="text-sm text-gray-500">
                        {moment(blog.createdAt).format("LLL")}
                    </p>
                    <p
                        className={`${blog.status === 'draft' ? 'bg-red-100 border-red-700 text-red-700' : 'bg-blue-50 border-blue-400 text-blue-600'} px-4 py-2 w-fit rounded-md border text-sm font-medium text-gray-800 transition-colors duration-200`}
                    >
                        {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                    </p>
                    <Link to={`/blog-details/${blog._id}`}>
                        <Button className="mt-2 bg-red-600 text-white px-4 py-2 text-xs lg:px-6 lg:py-3 rounded-md hover:bg-red-800 cursor-pointer">
                            View More
                        </Button>
                    </Link>
                </div>

                {/* Right: Thumbnail */}
                <div className="w-1/3 rounded-md overflow-hidden border border-gray-200 shrink-0 flex-1">
                    <img
                        src={blog.thumbnail}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default BlogCard;
