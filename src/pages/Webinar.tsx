import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Calendar, Clock, Video } from "lucide-react";

interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  speaker: string;
  link: string;
  cover_image?: string;
}

const Webinar: React.FC = () => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebinars = async () => {
      const { data, error } = await supabase
        .from("webinars")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Error fetching webinars:", error.message);
      } else {
        setWebinars(data || []);
      }
      setLoading(false);
    };

    fetchWebinars();
  }, []);

  return (
    <section className="py-16 bg-gray-50 min-h-[60vh]">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2 text-slate-800">Upcoming Webinars</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our expert-led webinars to stay ahead in your career and learn from industry leaders.
          </p>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading webinars...</div>
        ) : webinars.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No webinars scheduled at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webinars.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col"
              >
                {webinar.cover_image && (
                  <img
                    src={webinar.cover_image}
                    alt={webinar.title}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2 text-slate-800">{webinar.title}</h3>
                <p className="text-gray-600 mb-3 flex-1">{webinar.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2 space-x-4">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(webinar.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {webinar.time}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  <Video className="h-4 w-4 mr-1 inline" />
                  Speaker: {webinar.speaker}
                </div>
                <a
                  href={webinar.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center transition"
                >
                  Join Webinar
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};