import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

interface Blog {
  id: string;
  title: string;
  summary: string;
  author: string;
  published_at: string;
  cover_image?: string;
  slug: string;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error.message);
      } else {
        setBlogs(data || []);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-16 bg-gray-50 min-h-[60vh]">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2 text-slate-800">Latest Blogs & Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with career tips, industry news, and inspiring stories from professionals and experts.
          </p>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No blogs available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col">
                {blog.cover_image && (
                  <img
                    src={blog.cover_image}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2 text-slate-800">{blog.title}</h3>
                <p className="text-gray-600 mb-4 flex-1">{blog.summary}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {blog.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(blog.published_at).toLocaleDateString()}
                  </span>
                </div>
                <Link to={`/blogs/${blog.slug}`}>
                  <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 w-full">
                    Read More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;