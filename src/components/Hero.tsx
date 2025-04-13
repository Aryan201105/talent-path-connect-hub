
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-srs-blue to-srs-blue-dark text-white py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px] pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Your <span className="text-srs-green">Dream Career</span> Path
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-xl">
              Find exciting job opportunities and enhance your skills with our specialized training programs designed for career growth.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <Link to="/jobs">
                <Button size="lg" className="w-full sm:w-auto bg-white text-srs-blue-dark hover:bg-gray-100">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Explore Jobs
                </Button>
              </Link>
              <Link to="/skills">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Skill Courses
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg slide-up">
            <h3 className="text-xl font-semibold mb-4">Quick Job Search</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="keywords" className="block text-sm font-medium mb-1">
                  Keywords
                </label>
                <input 
                  type="text" 
                  id="keywords" 
                  placeholder="Job title, skills, or company" 
                  className="w-full bg-white/20 rounded-md border border-white/30 px-3 py-2 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input 
                  type="text" 
                  id="location" 
                  placeholder="City, state, or remote" 
                  className="w-full bg-white/20 rounded-md border border-white/30 px-3 py-2 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select 
                  id="category" 
                  className="w-full bg-white/20 rounded-md border border-white/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="">All Categories</option>
                  <option value="it">Information Technology</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                </select>
              </div>
              
              <Button className="w-full bg-srs-green hover:bg-srs-green-dark text-white">
                <Search className="mr-2 h-5 w-5" />
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 py-5 px-6 bg-white/10 backdrop-blur-sm rounded-lg text-center slide-up animate-delay-200">
          <p className="text-lg">
            Trusted by <span className="font-bold">500+</span> companies and <span className="font-bold">10,000+</span> job seekers
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
