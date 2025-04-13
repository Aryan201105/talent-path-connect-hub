
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SkillCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  students: number;
  rating?: number;
  price?: string;
  isFree?: boolean;
  image?: string;
  tags: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({
  id,
  title,
  description,
  instructor,
  duration,
  level,
  students,
  rating,
  price,
  isFree,
  image,
  tags
}) => {
  // Level badge color
  const getLevelColor = () => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden card-hover">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image || '/placeholder.svg'} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        {isFree ? (
          <Badge className="absolute top-4 right-4 bg-srs-green text-white">Free</Badge>
        ) : price ? (
          <Badge className="absolute top-4 right-4 bg-srs-blue text-white">{price}</Badge>
        ) : null}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="outline" className={`${getLevelColor()}`}>
            {level}
          </Badge>
          {rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <Link to={`/skills/${id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-srs-blue transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-y-2 text-xs text-gray-500 mb-4">
          <div className="flex items-center mr-4">
            <Users className="h-3 w-3 mr-1" />
            <span>{students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center mr-4">
            <Clock className="h-3 w-3 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            <span>By {instructor}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-srs-gray-light text-gray-700 border-gray-200">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button className="w-full bg-srs-blue hover:bg-srs-blue-dark text-white">
          {isFree ? 'Enroll Now' : 'View Course'}
        </Button>
      </div>
    </div>
  );
};

export default SkillCard;
