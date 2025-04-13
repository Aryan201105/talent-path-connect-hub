
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, GraduationCap, BookOpen, Zap, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkillCard from '@/components/SkillCard';

// Sample skills data
const skillsData = [
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
    tags: ["JavaScript", "React", "Node.js", "MongoDB"],
    category: "programming"
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
    tags: ["Python", "Statistics", "Data Analysis"],
    category: "data-science"
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
    tags: ["SEO", "Content Marketing", "Social Media"],
    category: "marketing"
  },
  {
    id: "4",
    title: "Cloud Computing with AWS",
    description: "Dive into AWS cloud services and learn to design, deploy, and manage scalable cloud infrastructure.",
    instructor: "Amit Patel",
    duration: "10 weeks",
    level: "Intermediate" as const,
    students: 678,
    rating: 4.5,
    price: "₹12,999",
    image: "/placeholder.svg",
    tags: ["AWS", "DevOps", "Cloud Architecture"],
    category: "cloud"
  },
  {
    id: "5",
    title: "UI/UX Design Principles",
    description: "Learn user-centered design methodologies, wireframing, prototyping, and usability testing for digital products.",
    instructor: "Maya Desai",
    duration: "8 weeks",
    level: "Beginner" as const,
    students: 892,
    rating: 4.9,
    price: "₹8,499",
    image: "/placeholder.svg",
    tags: ["Figma", "UX Research", "Prototyping"],
    category: "design"
  },
  {
    id: "6",
    title: "Mobile App Development with Flutter",
    description: "Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase using Flutter.",
    instructor: "Sanjay Kumar",
    duration: "10 weeks",
    level: "Intermediate" as const,
    students: 765,
    rating: 4.7,
    price: "₹10,999",
    image: "/placeholder.svg",
    tags: ["Flutter", "Dart", "Mobile Development"],
    category: "programming"
  },
  {
    id: "7",
    title: "Machine Learning Fundamentals",
    description: "Master the essential algorithms and techniques of machine learning including regression, classification, clustering, and neural networks.",
    instructor: "Dr. Aryan Sharma",
    duration: "12 weeks",
    level: "Advanced" as const,
    students: 543,
    rating: 4.8,
    price: "₹14,999",
    image: "/placeholder.svg",
    tags: ["Python", "TensorFlow", "AI"],
    category: "data-science"
  },
  {
    id: "8",
    title: "Business Communication Skills",
    description: "Enhance your professional communication skills for effective emails, presentations, meetings, and networking.",
    instructor: "Neha Kapoor",
    duration: "4 weeks",
    level: "Beginner" as const,
    students: 1267,
    rating: 4.6,
    isFree: true,
    image: "/placeholder.svg",
    tags: ["Communication", "Presentation", "Writing"],
    category: "soft-skills"
  }
];

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState(skillsData);
  
  // Apply filters
  const applyFilters = () => {
    let filtered = skillsData;
    
    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        skill => skill.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                 skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 skill.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(skill => skill.category === selectedCategory);
    }
    
    // Level filter
    if (selectedLevel) {
      filtered = filtered.filter(skill => skill.level === selectedLevel);
    }
    
    // Free only filter
    if (showFreeOnly) {
      filtered = filtered.filter(skill => skill.isFree);
    }
    
    setFilteredSkills(filtered);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLevel('');
    setShowFreeOnly(false);
    setFilteredSkills(skillsData);
  };
  
  // Category counts
  const categoryCounts = {
    all: skillsData.length,
    programming: skillsData.filter(skill => skill.category === 'programming').length,
    "data-science": skillsData.filter(skill => skill.category === 'data-science').length,
    marketing: skillsData.filter(skill => skill.category === 'marketing').length,
    design: skillsData.filter(skill => skill.category === 'design').length,
    cloud: skillsData.filter(skill => skill.category === 'cloud').length,
    "soft-skills": skillsData.filter(skill => skill.category === 'soft-skills').length,
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        {/* Skills Hero Section */}
        <section className="bg-gradient-to-r from-srs-blue to-srs-blue-dark py-16 md:py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Boost Your Career With In-Demand Skills
                </h1>
                <p className="text-lg text-gray-100 mb-8">
                  Invest in yourself with our industry-leading courses designed by experts to help you succeed in today's competitive job market.
                </p>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        placeholder="Search courses, skills, or topics"
                        className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="bg-srs-green hover:bg-srs-green-dark text-white"
                      onClick={applyFilters}
                    >
                      Find Courses
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:flex justify-end">
                <div className="relative">
                  <div className="absolute -top-8 -left-8 bg-srs-green rounded-full p-4 text-white shadow-lg">
                    <Award className="h-8 w-8" />
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
                    <h3 className="text-xl font-semibold mb-2">Why Choose Our Courses?</h3>
                    <ul className="space-y-3 mt-4">
                      <li className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                          <GraduationCap className="h-4 w-4 text-srs-blue" />
                        </div>
                        <div>
                          <span className="font-medium">Industry Expert Instructors</span>
                          <p className="text-sm text-gray-600">Learn from professionals with real-world experience</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                          <BookOpen className="h-4 w-4 text-srs-blue" />
                        </div>
                        <div>
                          <span className="font-medium">Practical Projects</span>
                          <p className="text-sm text-gray-600">Apply your knowledge through hands-on exercises</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                          <Zap className="h-4 w-4 text-srs-blue" />
                        </div>
                        <div>
                          <span className="font-medium">Job-Ready Skills</span>
                          <p className="text-sm text-gray-600">Focus on skills employers are actively seeking</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Skills Listing Section */}
        <section className="py-12">
          <div className="container-custom">
            {/* Category Tabs */}
            <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Explore Our Courses</h2>
                <div className="hidden md:block">
                  <TabsList>
                    <TabsTrigger value="all">
                      All Courses <Badge className="ml-1 bg-gray-200 text-gray-800">{categoryCounts.all}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="programming">
                      Programming <Badge className="ml-1 bg-gray-200 text-gray-800">{categoryCounts.programming}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="data-science">
                      Data Science <Badge className="ml-1 bg-gray-200 text-gray-800">{categoryCounts["data-science"]}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="marketing">
                      Marketing <Badge className="ml-1 bg-gray-200 text-gray-800">{categoryCounts.marketing}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="design">
                      Design <Badge className="ml-1 bg-gray-200 text-gray-800">{categoryCounts.design}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="cloud">
                      Cloud <Badge className="ml-1 bg-gray-200 text-gray-800">{categoryCounts.cloud}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="soft-skills">
                      Soft Skills <Badge className="ml-1 bg-gray-200 text-gray-800">{categoryCounts["soft-skills"]}</Badge>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              {/* Mobile Category Dropdown */}
              <div className="block md:hidden mb-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses ({categoryCounts.all})</SelectItem>
                    <SelectItem value="programming">Programming ({categoryCounts.programming})</SelectItem>
                    <SelectItem value="data-science">Data Science ({categoryCounts["data-science"]})</SelectItem>
                    <SelectItem value="marketing">Marketing ({categoryCounts.marketing})</SelectItem>
                    <SelectItem value="design">Design ({categoryCounts.design})</SelectItem>
                    <SelectItem value="cloud">Cloud ({categoryCounts.cloud})</SelectItem>
                    <SelectItem value="soft-skills">Soft Skills ({categoryCounts["soft-skills"]})</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1">
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Levels</SelectItem>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant={showFreeOnly ? "default" : "outline"} 
                  className={showFreeOnly ? "bg-srs-green hover:bg-srs-green-dark text-white" : "border-gray-200"}
                  onClick={() => setShowFreeOnly(!showFreeOnly)}
                >
                  {showFreeOnly ? "Free Courses Only" : "Show Free Courses"}
                </Button>
                
                <Button onClick={applyFilters}>
                  Apply Filters
                </Button>
                
                <Button variant="ghost" onClick={resetFilters} className="text-gray-600">
                  Reset
                </Button>
              </div>
              
              {/* Courses Grid */}
              <div>
                {filteredSkills.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkills.map((skill) => (
                      <SkillCard key={skill.id} {...skill} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your filters or try a different search term.
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
            </Tabs>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="bg-srs-blue-dark text-white py-16">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students who have advanced their careers through our specialized skill development programs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-srs-green hover:bg-srs-green-dark text-white">
                Browse All Courses
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Request Course Information
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Skills;
