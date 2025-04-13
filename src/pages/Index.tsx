
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Trophy, TrendingUp, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import JobCard from '@/components/JobCard';
import SkillCard from '@/components/SkillCard';

// Sample data for featured jobs
const featuredJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechSolutions Inc.",
    location: "Bangalore, India",
    salary: "₹6,00,000 - ₹9,00,000 / year",
    jobType: "Full-time",
    postedDate: "3 days ago",
    isRemote: true,
    isFeatured: true
  },
  {
    id: "2",
    title: "Data Analyst",
    company: "Analytics Pro",
    location: "Mumbai, India",
    salary: "₹5,00,000 - ₹7,00,000 / year",
    jobType: "Full-time",
    postedDate: "1 week ago",
    isFeatured: true
  },
  {
    id: "3",
    title: "Digital Marketing Specialist",
    company: "Growth Marketing",
    location: "Delhi, India",
    salary: "₹4,50,000 - ₹6,50,000 / year",
    jobType: "Full-time",
    postedDate: "2 days ago",
    isFeatured: false
  }
];

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
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <FeatureSection />
        
        {/* Featured Jobs Section */}
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-10 fade-in">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Jobs</h2>
                <p className="text-gray-600">Discover opportunities that match your skills and career goals</p>
              </div>
              <Link to="/jobs" className="hidden md:flex items-center text-srs-blue hover:text-srs-blue-dark font-medium">
                View all jobs <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job, index) => (
                <div key={job.id} className="slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <JobCard {...job} />
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Link to="/jobs">
                <Button variant="outline" className="border-srs-blue text-srs-blue hover:bg-srs-blue hover:text-white">
                  Browse All Jobs <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Statistics Section */}
        <section className="bg-srs-blue text-white py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center fade-in">
                <Trophy className="h-12 w-12 mb-4 text-srs-green" />
                <h3 className="text-4xl font-bold mb-2">10,000+</h3>
                <p className="text-gray-100">Successful Placements</p>
              </div>
              <div className="flex flex-col items-center fade-in animate-delay-200">
                <TrendingUp className="h-12 w-12 mb-4 text-srs-green" />
                <h3 className="text-4xl font-bold mb-2">500+</h3>
                <p className="text-gray-100">Hiring Partners</p>
              </div>
              <div className="flex flex-col items-center fade-in animate-delay-400">
                <UserCheck className="h-12 w-12 mb-4 text-srs-green" />
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
                <h2 className="text-3xl font-bold mb-2">Skill Development Programs</h2>
                <p className="text-gray-600">Enhance your employability with industry-relevant courses</p>
              </div>
              <Link to="/skills" className="hidden md:flex items-center text-srs-blue hover:text-srs-blue-dark font-medium">
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
                <Button variant="outline" className="border-srs-blue text-srs-blue hover:bg-srs-blue hover:text-white">
                  Explore All Programs <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <TestimonialSection />
        
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-srs-blue-dark to-srs-blue text-white py-16">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in">Ready to Accelerate Your Career?</h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto fade-in animate-delay-200">
              Join thousands of professionals who have transformed their careers with SRS Talent Connect.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in animate-delay-300">
              <Link to="/register">
                <Button size="lg" className="bg-white text-srs-blue-dark hover:bg-gray-100">
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
  );
};

export default Index;
