
import React from 'react';
import { Briefcase, BookOpen, Award, Users, Clock, Zap } from 'lucide-react';

const features = [
  {
    icon: <Briefcase className="h-10 w-10 text-srs-blue" />,
    title: 'Curated Job Listings',
    description: 'Access thousands of verified job opportunities tailored for fresh graduates and experienced professionals.'
  },
  {
    icon: <BookOpen className="h-10 w-10 text-srs-blue" />,
    title: 'Skill Development',
    description: 'Enhance your career with industry-relevant courses designed by experts to boost your employability.'
  },
  {
    icon: <Award className="h-10 w-10 text-srs-blue" />,
    title: 'Certification Programs',
    description: 'Get certified in in-demand skills that employers value and increase your chances of landing your dream job.'
  },
  {
    icon: <Users className="h-10 w-10 text-srs-blue" />,
    title: 'Networking Opportunities',
    description: 'Connect with industry professionals, mentors, and peers to expand your professional network.'
  },
  {
    icon: <Clock className="h-10 w-10 text-srs-blue" />,
    title: 'Career Guidance',
    description: 'Receive personalized career advice from industry experts to navigate your professional journey effectively.'
  },
  {
    icon: <Zap className="h-10 w-10 text-srs-blue" />,
    title: 'Placement Support',
    description: 'Get comprehensive placement assistance including interview preparation and resume building.'
  }
];

const FeatureSection = () => {
  return (
    <section className="bg-white section-padding">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Empowering Your Career Journey</h2>
          <p className="text-lg text-gray-600">
            We offer a comprehensive ecosystem of tools and resources to help you advance in your career path.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-srs-gray-light p-3 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
