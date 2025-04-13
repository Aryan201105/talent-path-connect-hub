
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl text-white">SRS</span>
              <span className="font-medium text-lg text-srs-blue">Talent Connect</span>
            </Link>
            <p className="text-sm">
              Connecting talented professionals with opportunities and providing skills to enhance your career journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-srs-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-srs-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-srs-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-srs-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-srs-blue transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-srs-blue transition-colors">Jobs</Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-srs-blue transition-colors">Skills</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-srs-blue transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-srs-blue transition-colors">Register</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="hover:text-srs-blue transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/webinars" className="hover:text-srs-blue transition-colors">Webinars</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-srs-blue transition-colors">Success Stories</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-srs-blue transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-srs-blue transition-colors">Support</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-srs-blue shrink-0 mt-1" />
                <span>123 Career Street, Talent City, TC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-srs-blue shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-srs-blue shrink-0" />
                <span>contact@srstalentconnect.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} SRS Talent Connect. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="hover:text-srs-blue transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-srs-blue transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-srs-blue transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
