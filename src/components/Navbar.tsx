
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-srs-blue">SRS</span>
            <span className="font-medium text-lg">Talent Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-srs-blue transition-colors">
              Home
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-srs-blue transition-colors">
              Jobs
            </Link>
            <Link to="/skills" className="text-gray-700 hover:text-srs-blue transition-colors">
              Skills
            </Link>
            <div className="relative">
              <button
                className="text-gray-700 hover:text-srs-blue transition-colors flex items-center"
                onClick={toggleDropdown}
              >
                Resources <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-10">
                  <Link to="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-srs-gray-light">
                    Blog
                  </Link>
                  <Link to="/webinars" className="block px-4 py-2 text-sm text-gray-700 hover:bg-srs-gray-light">
                    Webinars
                  </Link>
                  <Link to="/testimonials" className="block px-4 py-2 text-sm text-gray-700 hover:bg-srs-gray-light">
                    Success Stories
                  </Link>
                </div>
              )}
            </div>
            <Link to="/contact" className="text-gray-700 hover:text-srs-blue transition-colors">
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-srs-blue text-srs-blue hover:bg-srs-blue hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-srs-blue hover:bg-srs-blue-dark text-white">
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-srs-blue transition-colors py-2">
                Home
              </Link>
              <Link to="/jobs" className="text-gray-700 hover:text-srs-blue transition-colors py-2">
                Jobs
              </Link>
              <Link to="/skills" className="text-gray-700 hover:text-srs-blue transition-colors py-2">
                Skills
              </Link>
              <button
                className="text-gray-700 hover:text-srs-blue transition-colors py-2 flex items-center justify-between"
                onClick={toggleDropdown}
              >
                Resources <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="pl-4 space-y-2 border-l-2 border-srs-gray-dark">
                  <Link to="/blog" className="block py-2 text-gray-700 hover:text-srs-blue">
                    Blog
                  </Link>
                  <Link to="/webinars" className="block py-2 text-gray-700 hover:text-srs-blue">
                    Webinars
                  </Link>
                  <Link to="/testimonials" className="block py-2 text-gray-700 hover:text-srs-blue">
                    Success Stories
                  </Link>
                </div>
              )}
              <Link to="/contact" className="text-gray-700 hover:text-srs-blue transition-colors py-2">
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Link to="/login" className="btn-outline text-center">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-center">
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
