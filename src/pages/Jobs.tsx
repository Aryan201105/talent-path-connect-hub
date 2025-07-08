import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Briefcase, Clock, ArrowUpDown, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import { supabase } from '@/lib/supabaseClient';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [salaryRange, setSalaryRange] = useState([3, 18]); // in lakhs
  const [sortBy, setSortBy] = useState('recent');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);

  // Fetch jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase.from("jobs").select("*");
      if (error) {
        console.error(error);
      } else {
        setJobs(data || []);
        setFilteredJobs(data || []);
      }
    };
    fetchJobs();
  }, []);

  // Filter jobs
  const applyFilters = () => {
    let filtered = [...jobs];

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        job =>
          (job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Location filter
    if (location) {
      filtered = filtered.filter(
        job => job.location && job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Job type filter
    if (jobType.length > 0) {
      filtered = filtered.filter(
        job =>
          job.jobType &&
          jobType.some(type => job.jobType.toLowerCase().includes(type.toLowerCase()))
      );
    }

    // Remote only filter
    if (remoteOnly) {
      filtered = filtered.filter(job => job.isRemote);
    }

    // Sort results
    if (sortBy === 'salary-high') {
      filtered = [...filtered].sort((a, b) => {
        const aMax = parseInt((a.salary || '').split(' - ')[1]?.replace(/[^\d]/g, '') || '0');
        const bMax = parseInt((b.salary || '').split(' - ')[1]?.replace(/[^\d]/g, '') || '0');
        return bMax - aMax;
      });
    } else if (sortBy === 'salary-low') {
      filtered = [...filtered].sort((a, b) => {
        const aMin = parseInt((a.salary || '').split(' - ')[0]?.replace(/[^\d]/g, '') || '0');
        const bMin = parseInt((b.salary || '').split(' - ')[0]?.replace(/[^\d]/g, '') || '0');
        return aMin - bMin;
      });
    }
    // Default is recent, assuming jobs are already sorted by created_at DESC

    setFilteredJobs(filtered);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setLocation('');
    setJobType([]);
    setExperienceLevel([]);
    setRemoteOnly(false);
    setSalaryRange([3, 18]);
    setSortBy('recent');
    setFilteredJobs(jobs);
  };

  // Toggle job type
  const toggleJobType = (type: string) => {
    if (jobType.includes(type)) {
      setJobType(jobType.filter(t => t !== type));
    } else {
      setJobType([...jobType, type]);
    }
  };

  // Toggle experience level
  const toggleExperienceLevel = (level: string) => {
    if (experienceLevel.includes(level)) {
      setExperienceLevel(experienceLevel.filter(l => l !== level));
    } else {
      setExperienceLevel([...experienceLevel, level]);
    }
  };

  // Handle job application
  const handleApply = async (jobId: string) => {
    const user = supabase.auth.user?.();
    if (!user) {
      alert("Please log in to apply.");
      return;
    }
    const { error } = await supabase
      .from("job_applications")
      .insert([{ user_id: user.id, job_id: jobId, status: "applied" }]);
    if (error) {
      alert("Application failed: " + error.message);
    } else {
      alert("Application submitted!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50">
        {/* Job Search Hero Section */}
        <section className="bg-srs-blue py-12 md:py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center text-white mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Find Your Dream Job</h1>
              <p className="text-lg text-gray-100">
                Explore thousands of job opportunities from top companies
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    placeholder="Job title, skills, or company"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    placeholder="Location or 'Remote'"
                    className="pl-10"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <Button
                  className="bg-srs-blue hover:bg-srs-blue-dark text-white"
                  onClick={applyFilters}
                >
                  Search Jobs
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters - Desktop */}
              <div className="hidden lg:block w-72 shrink-0">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="h-8 text-sm text-srs-blue hover:text-srs-blue-dark hover:bg-blue-50"
                    >
                      Reset All
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Job Type */}
                    <div>
                      <h4 className="font-medium mb-3">Job Type</h4>
                      <div className="space-y-2">
                        {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={`job-type-${type}`}
                              checked={jobType.includes(type)}
                              onCheckedChange={() => toggleJobType(type)}
                            />
                            <label
                              htmlFor={`job-type-${type}`}
                              className="text-sm cursor-pointer"
                            >
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Experience Level */}
                    <div>
                      <h4 className="font-medium mb-3">Experience Level</h4>
                      <div className="space-y-2">
                        {['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'Executive'].map((level) => (
                          <div key={level} className="flex items-center space-x-2">
                            <Checkbox
                              id={`exp-level-${level}`}
                              checked={experienceLevel.includes(level)}
                              onCheckedChange={() => toggleExperienceLevel(level)}
                            />
                            <label
                              htmlFor={`exp-level-${level}`}
                              className="text-sm cursor-pointer"
                            >
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Remote Only */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remote-only"
                          checked={remoteOnly}
                          onCheckedChange={(checked) => setRemoteOnly(!!checked)}
                        />
                        <label
                          htmlFor="remote-only"
                          className="font-medium cursor-pointer"
                        >
                          Remote Only
                        </label>
                      </div>
                    </div>

                    {/* Salary Range */}
                    <div>
                      <h4 className="font-medium mb-3">Salary Range (Lakhs ₹/year)</h4>
                      <Slider
                        defaultValue={salaryRange}
                        max={20}
                        min={0}
                        step={1}
                        onValueChange={(value) => setSalaryRange(value as [number, number])}
                        className="my-6"
                      />
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>₹{salaryRange[0]} Lakhs</span>
                        <span>₹{salaryRange[1]} Lakhs</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-srs-blue hover:bg-srs-blue-dark text-white"
                      onClick={applyFilters}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>

              {/* Job Listings */}
              <div className="flex-1">
                {/* Mobile Filters & Sort */}
                <div className="lg:hidden mb-6 flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-200"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="flex-1 border-gray-200">
                      <div className="flex items-center">
                        <ArrowUpDown className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Sort By:</span>
                        <SelectValue placeholder="Most Recent" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="salary-high">Highest Salary</SelectItem>
                      <SelectItem value="salary-low">Lowest Salary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mobile Filters Panel */}
                {isFilterOpen && (
                  <div className="lg:hidden bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Filters</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsFilterOpen(false)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Accordion type="single" collapsible defaultValue="job-type">
                      <AccordionItem value="job-type">
                        <AccordionTrigger>Job Type</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                              <div key={type} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-job-type-${type}`}
                                  checked={jobType.includes(type)}
                                  onCheckedChange={() => toggleJobType(type)}
                                />
                                <label
                                  htmlFor={`mobile-job-type-${type}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {type}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="exp-level">
                        <AccordionTrigger>Experience Level</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'Executive'].map((level) => (
                              <div key={level} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-exp-level-${level}`}
                                  checked={experienceLevel.includes(level)}
                                  onCheckedChange={() => toggleExperienceLevel(level)}
                                />
                                <label
                                  htmlFor={`mobile-exp-level-${level}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {level}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="remote">
                        <AccordionTrigger>Remote Work</AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="mobile-remote-only"
                                checked={remoteOnly}
                                onCheckedChange={(checked) => setRemoteOnly(!!checked)}
                              />
                              <label
                                htmlFor="mobile-remote-only"
                                className="text-sm cursor-pointer"
                              >
                                Remote Only
                              </label>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="salary">
                        <AccordionTrigger>Salary Range</AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-2">
                            <Slider
                              defaultValue={salaryRange}
                              max={20}
                              min={0}
                              step={1}
                              onValueChange={(value) => setSalaryRange(value as [number, number])}
                              className="my-6"
                            />
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>₹{salaryRange[0]} Lakhs</span>
                              <span>₹{salaryRange[1]} Lakhs</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <div className="flex space-x-3 mt-6">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={resetFilters}
                      >
                        Reset
                      </Button>
                      <Button
                        className="flex-1 bg-srs-blue hover:bg-srs-blue-dark text-white"
                        onClick={() => {
                          applyFilters();
                          setIsFilterOpen(false);
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Sort and Results Count - Desktop */}
                <div className="hidden lg:flex items-center justify-between mb-6">
                  <p className="text-gray-600">
                    Showing <span className="font-semibold">{filteredJobs.length}</span> jobs
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px] border-gray-200">
                        <SelectValue placeholder="Most Recent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="salary-high">Highest Salary</SelectItem>
                        <SelectItem value="salary-low">Lowest Salary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Active Filters */}
                {(searchTerm || location || jobType.length > 0 || experienceLevel.length > 0 || remoteOnly) && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {searchTerm && (
                      <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                        {searchTerm}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => setSearchTerm('')}
                        />
                      </Badge>
                    )}
                    
                    {location && (
                      <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {location}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => setLocation('')}
                        />
                      </Badge>
                    )}
                    
                    {jobType.map(type => (
                      <Badge key={type} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {type}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => toggleJobType(type)}
                        />
                      </Badge>
                    ))}
                    
                    {experienceLevel.map(level => (
                      <Badge key={level} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                        {level}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => toggleExperienceLevel(level)}
                        />
                      </Badge>
                    ))}
                    
                    {remoteOnly && (
                      <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                        Remote Only
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => setRemoteOnly(false)}
                        />
                      </Badge>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={resetFilters}
                      className="h-7 text-xs text-srs-blue hover:text-srs-blue-dark hover:bg-blue-50"
                    >
                      Clear All
                    </Button>
                  </div>
                )}
                
                {/* Job Cards */}
                <div className="space-y-6">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                      <JobCard key={job.id} {...job} onApply={() => handleApply(job.id)} />
                    ))
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your search filters or try a different search term.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={resetFilters}
                        className="border-srs-blue text-srs-blue hover:bg-srs-blue hover:text-white"
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Pagination */}
                {filteredJobs.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="inline-flex space-x-1">
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0 border-gray-200">
                        &lt;
                      </Button>
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0 bg-srs-blue text-white border-srs-blue">
                        1
                      </Button>
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0 border-gray-200">
                        2
                      </Button>
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0 border-gray-200">
                        3
                      </Button>
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0 border-gray-200">
                        &gt;
                      </Button>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
