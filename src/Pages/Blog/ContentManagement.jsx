import React, { useEffect, useState } from 'react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";
import { Link, useLocation } from "react-router";
import useAxios from "../../CustomHooks/useAxios";
import useAuth from "../../CustomHooks/useAuth";
import BlogCard from './BlogCard';

const ManageContent = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/content-management") {
      window.document.title = "Content Management";
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axiosSecure.get("/blogs");
      setBlogs(res.data);
    };
    fetchBlogs();
  }, [axiosSecure]);

  const filteredBlogs = blogs.filter(blog => {
    if (filter === "all") return true;
    return blog.status === filter;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        {/* Left: Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {filter === "all" ? "All" : filter === "draft" ? "Draft" : "Published"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filter Blogs</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilter("all")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("draft")}>Draft</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("published")}>Published</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Right: Add Blog */}
        <Link to='/dashboard/content-management/add-blog'>
          <Button className="bg-red-600 text-white hover:bg-red-800">Add Blog</Button>
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="grid gap-6">
        {currentBlogs.map(blog => (
          <BlogCard
            key={blog._id}
            blog={blog}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink href="#" isActive={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ManageContent;
