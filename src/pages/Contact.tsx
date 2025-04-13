
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, LoaderCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon!",
        variant: "default"
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="bg-srs-blue text-white py-16">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-gray-100 max-w-2xl mx-auto">
              Have questions about our services, courses, or job opportunities? We're here to help you navigate your career journey.
            </p>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-srs-blue-light/10 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-srs-blue" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Phone</h3>
                  <p className="text-gray-600">+91 123 456 7890</p>
                  <p className="text-gray-600">+91 987 654 3210</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-srs-blue-light/10 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-srs-blue" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <p className="text-gray-600">info@srstalentconnect.com</p>
                  <p className="text-gray-600">support@srstalentconnect.com</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-srs-blue-light/10 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-srs-blue" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Location</h3>
                  <p className="text-gray-600">123 Career Street, Tech Park</p>
                  <p className="text-gray-600">Bangalore, Karnataka 560001</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-srs-blue-light/10 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-srs-blue" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Working Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form and our team will get back to you within 24 hours. We're committed to supporting your career development journey.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                  <h3 className="font-semibold mb-4">Common Inquiries</h3>
                  <ul className="space-y-3">
                    <li className="text-gray-600">
                      <span className="font-medium text-gray-900">Course Details:</span> Information about curriculum, duration, and fees
                    </li>
                    <li className="text-gray-600">
                      <span className="font-medium text-gray-900">Job Opportunities:</span> Questions about listing or finding jobs
                    </li>
                    <li className="text-gray-600">
                      <span className="font-medium text-gray-900">Corporate Training:</span> Custom training solutions for your team
                    </li>
                    <li className="text-gray-600">
                      <span className="font-medium text-gray-900">Technical Support:</span> Help with account or website issues
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Form</CardTitle>
                    <CardDescription>
                      Have a question or inquiry? Fill out the form below and we'll respond promptly.
                    </CardDescription>
                  </CardHeader>
                  
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="Your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                          <Select 
                            value={formData.subject} 
                            onValueChange={(value) => handleSelectChange('subject', value)}
                            required
                          >
                            <SelectTrigger id="subject">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="courses">Course Information</SelectItem>
                              <SelectItem value="jobs">Job Opportunities</SelectItem>
                              <SelectItem value="corporate">Corporate Training</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please describe your inquiry in detail..."
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full bg-srs-blue hover:bg-srs-blue-dark text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <div className="aspect-video w-full">
                {/* Integrate with Google Maps or any other map service */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive Map will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
