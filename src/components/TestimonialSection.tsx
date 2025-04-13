
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { QuoteIcon } from 'lucide-react';

const testimonials = [
  {
    quote: "SRS Talent Connect completely changed my job search experience. Their skill programs helped me learn in-demand technologies, and within a month of completing the course, I secured a job at a top tech company.",
    name: "Rahul Sharma",
    position: "Software Developer",
    company: "TechInnovate",
    avatar: "/placeholder.svg"
  },
  {
    quote: "The courses offered by SRS Talent Connect are practical and industry-focused. The placement assistance they provided was exceptional - from resume building to interview preparation.",
    name: "Priya Patel",
    position: "Digital Marketing Specialist",
    company: "MediaGrowth",
    avatar: "/placeholder.svg"
  },
  {
    quote: "As a fresher, I struggled to find relevant opportunities. SRS Talent Connect not only helped me develop crucial skills but also connected me with companies that value fresh talent. Highly recommended!",
    name: "Aditya Verma",
    position: "Data Analyst",
    company: "DataInsights",
    avatar: "/placeholder.svg"
  }
];

const TestimonialSection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white section-padding">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600">
            Hear from professionals who transformed their careers with SRS Talent Connect.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-md border border-gray-100 relative slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <QuoteIcon className="h-8 w-8 text-srs-blue-light opacity-20 absolute top-6 right-6" />
              <p className="text-gray-700 mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 border-2 border-srs-blue-light mr-4">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                </Avatar>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#" className="text-srs-blue hover:text-srs-blue-dark font-medium">
            Read more success stories →
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
