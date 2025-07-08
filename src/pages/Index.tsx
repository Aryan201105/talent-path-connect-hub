import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Trophy, TrendingUp, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import JobCard from '@/components/JobCard';
import SkillCard from '@/components/SkillCard';
import { supabase } from '@/lib/supabaseClient';

// Sample data for featured skills
const featuredSkills = [
  {
    id: "1",
    title: "Full Stack Web Development",
    description: "Master frontend and backend technologies including React, Node.js, and MongoDB to build complete web applications.",
    instructor: "Rajiv Kumar",
    duration: "12 weeks",
    level: "Intermediate" as const,
    students: 1245,
    rating: 4.8,
    price: "₹9,999",
    image: "/placeholder.svg",
    tags: ["JavaScript", "React", "Node.js", "MongoDB"]
  },
  {
    id: "2",
    title: "Data Science Fundamentals",
    description: "Learn essential data analysis techniques, Python programming, and statistical methods to kickstart your data science career.",
    instructor: "Priya Sharma",
    duration: "8 weeks",
    level: "Beginner" as const,
    students: 987,
    rating: 4.6,
    isFree: true,
    image: "/placeholder.svg",
    tags: ["Python", "Statistics", "Data Analysis"]
  },
  {
    id: "3",
    title: "Digital Marketing Masterclass",
    description: "Comprehensive guide to modern digital marketing strategies including SEO, SEM, social media, and content marketing.",
    instructor: "Vikram Joshi",
    duration: "6 weeks",
    level: "Advanced" as const,
    students: 756,
    rating: 4.7,
    price: "₹7,499",
    image: "/placeholder.svg",
    tags: ["SEO", "Content Marketing", "Social Media"]
  }
];

const Index = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('isFeatured', true);

      if (error) {
        console.error('Error fetching jobs:', error.message);
      } else {
        setJobs(data || []);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated floating shapes */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "120px",
          height: "120px",
          background: "rgba(227, 11, 18, 0.89)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "180px",
          height: "180px",
          background: "rgba(99,102,241,0.12)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite alternate",
          zIndex: 0,
        }}
      />
      <div className="relative z-10 w-full">
        <Navbar />

        {/* Professional Hero Section */}
        <section className="flex flex-col items-center justify-center py-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-4 animate-fade-in">
            Accelerate Your Career
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Find top jobs, upskill with industry programs, and connect with leading employers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </section>

        <main className="flex-grow">
          {/* Features Section */}
          <FeatureSection />

          {/* Featured Jobs Section */}
          <section className="bg-white section-padding">
            <div className="container-custom">
              <div className="flex justify-between items-center mb-10 fade-in">
                <div>
                  <h2 className="text-3xl font-bold mb-2 text-slate-800">Featured Jobs</h2>
                  <p className="text-gray-600">Discover opportunities that match your skills and career goals</p>
                </div>
                <Link to="/jobs" className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  View all jobs <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <p className="text-center col-span-full">Loading jobs...</p>
                ) : (
                  jobs.map((job, index) => (
                    <div key={job.id} className="slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                      <JobCard {...job} />
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 text-center md:hidden">
                <Link to="/jobs">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                    Browse All Jobs <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="bg-blue-600 text-white py-16">
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center fade-in">
                  <Trophy className="h-12 w-12 mb-4 text-emerald-400" />
                  <h3 className="text-4xl font-bold mb-2">10,000+</h3>
                  <p className="text-gray-100">Successful Placements</p>
                </div>
                <div className="flex flex-col items-center fade-in animate-delay-200">
                  <TrendingUp className="h-12 w-12 mb-4 text-emerald-400" />
                  <h3 className="text-4xl font-bold mb-2">500+</h3>
                  <p className="text-gray-100">Hiring Partners</p>
                </div>
                <div className="flex flex-col items-center fade-in animate-delay-400">
                  <UserCheck className="h-12 w-12 mb-4 text-emerald-400" />
                  <h3 className="text-4xl font-bold mb-2">25+</h3>
                  <p className="text-gray-100">Skill Development Programs</p>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Skills Section */}
          <section className="bg-gray-50 section-padding">
            <div className="container-custom">
              <div className="flex justify-between items-center mb-10 fade-in">
                <div>
                  <h2 className="text-3xl font-bold mb-2 text-slate-800">Skill Development Programs</h2>
                  <p className="text-gray-600">Enhance your employability with industry-relevant courses</p>
                </div>
                <Link to="/skills" className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  View all programs <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredSkills.map((skill, index) => (
                  <div key={skill.id} className="slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <SkillCard {...skill} />
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center md:hidden">
                <Link to="/skills">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                    Explore All Programs <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <TestimonialSection />

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-16">
            <div className="container-custom text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in">Ready to Accelerate Your Career?</h2>
              <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto fade-in animate-delay-200">
                Join thousands of professionals who have transformed their careers with SRS Talent Connect.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in animate-delay-300">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                    Register Now
                  </Button>
                </Link>
                <Link to="/skills">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
