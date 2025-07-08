import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User, Briefcase, Star } from "lucide-react";

interface Story {
  id: string;
  name: string;
  position: string;
  company: string;
  story: string;
  photo_url?: string;
  rating?: number;
}

const SuccessStories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await supabase
        .from("success_stories")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Error fetching stories:", error.message);
      } else {
        setStories(data || []);
      }
      setLoading(false);
    };

    fetchStories();
  }, []);

  return (
    <section className="py-16 bg-gray-50 min-h-[60vh]">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2 text-slate-800">Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read how SRS Talent Connect helped professionals achieve their career goals.
          </p>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading stories...</div>
        ) : stories.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No stories available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col"
              >
                <div className="flex items-center mb-4">
                  {story.photo_url ? (
                    <img
                      src={story.photo_url}
                      alt={story.name}
                      className="h-14 w-14 rounded-full object-cover border mr-4"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-slate-800">{story.name}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {story.position} @ {story.company}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 flex-1">"{story.story}"</p>
                {story.rating && (
                  <div className="flex items-center mt-2">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};