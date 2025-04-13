
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building, Clock, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  jobType: string;
  postedDate: string;
  isRemote?: boolean;
  logo?: string;
  isFeatured?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  location,
  salary,
  jobType,
  postedDate,
  isRemote,
  logo,
  isFeatured
}) => {
  return (
    <div className={`bg-white rounded-lg border ${isFeatured ? 'border-srs-blue' : 'border-gray-200'} shadow-sm hover:shadow-md transition-shadow card-hover`}>
      {isFeatured && (
        <div className="bg-srs-blue text-white text-xs font-medium px-3 py-1 rounded-t-lg">
          Featured Opportunity
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4 overflow-hidden flex-shrink-0">
            {logo ? (
              <img src={logo} alt={company} className="w-full h-full object-cover" />
            ) : (
              <Building className="h-6 w-6 text-gray-500" />
            )}
          </div>
          
          <div className="flex-1">
            <Link to={`/jobs/${id}`} className="block">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-srs-blue transition-colors">
                {title}
              </h3>
            </Link>
            <p className="text-gray-600 mb-3">{company}</p>
            
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{location}</span>
                {isRemote && (
                  <Badge variant="outline" className="ml-2 bg-srs-green-light/20 text-srs-green-dark border-srs-green-light">
                    Remote
                  </Badge>
                )}
              </div>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                <span>{jobType}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{postedDate}</span>
              </div>
            </div>
            
            {salary && (
              <div className="text-sm font-medium text-srs-blue mb-4">
                {salary}
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mb-4">
              {['React', 'Node.js', 'TypeScript'].map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-srs-gray text-gray-700">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm" className="text-srs-blue border-srs-blue hover:bg-srs-blue hover:text-white">
                View Details
              </Button>
              <Button size="sm" className="bg-srs-blue hover:bg-srs-blue-dark text-white">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
