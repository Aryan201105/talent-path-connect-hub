
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Upload, Mail, Phone, CheckCircle2, LoaderCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VerificationModal from '@/components/VerificationModal';

const Register = () => {
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    collegeName: '',
    qualification: '',
    stream: '',
    city: '',
    gender: '',
    dob: '',
    resume: null as File | null,
    agreeTerms: false
  });
  
  // Verification states
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [isEmailVerificationModalOpen, setIsEmailVerificationModalOpen] = useState(false);
  const [isPhoneVerificationModalOpen, setIsPhoneVerificationModalOpen] = useState(false);
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file type
      if (!file.name.match(/\.(pdf|doc|docx)$/i)) {
        toast({
          title: "Invalid file format",
          description: "Please upload a PDF, DOC, or DOCX file",
          variant: "destructive"
        });
        return;
      }
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };
  
  // Send email verification
  const sendEmailVerification = () => {
    if (!formData.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsEmailVerificationModalOpen(true);
  };
  
  // Send phone verification
  const sendPhoneVerification = () => {
    if (!formData.contactNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your contact number",
        variant: "destructive"
      });
      return;
    }
    
    // Phone validation (simple 10 digit)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.contactNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }
    
    setIsPhoneVerificationModalOpen(true);
  };
  
  // Handle email verification completion
  const handleEmailVerified = () => {
    setEmailVerified(true);
    setIsEmailVerificationModalOpen(false);
    toast({
      title: "Email Verified",
      description: "Your email has been successfully verified",
      variant: "default"
    });
  };
  
  // Handle phone verification completion
  const handlePhoneVerified = () => {
    setPhoneVerified(true);
    setIsPhoneVerificationModalOpen(false);
    toast({
      title: "Phone Verified",
      description: "Your phone number has been successfully verified",
      variant: "default"
    });
  };
  
  // Go to next step
  const goToNextStep = () => {
    if (currentStep === 1) {
      // Validate first step
      if (!formData.fullName || !formData.email || !formData.contactNumber || !emailVerified || !phoneVerified) {
        toast({
          title: "Required Fields Missing",
          description: "Please fill in all required fields and verify your email and phone",
          variant: "destructive"
        });
        return;
      }
    }
    
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };
  
  // Go to previous step
  const goToPrevStep = () => {
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };
  
  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (
      !formData.fullName || 
      !formData.email || 
      !formData.contactNumber || 
      !formData.collegeName || 
      !formData.qualification || 
      !formData.stream || 
      !formData.city || 
      !formData.gender || 
      !formData.dob || 
      !formData.resume ||
      !formData.agreeTerms ||
      !emailVerified ||
      !phoneVerified
    ) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields and agree to the terms",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully",
        variant: "default"
      });
      
      // Redirect to login (in a real app)
      // history.push('/login');
      
      // For demo purposes, just clear the form
      setFormData({
        fullName: '',
        email: '',
        contactNumber: '',
        collegeName: '',
        qualification: '',
        stream: '',
        city: '',
        gender: '',
        dob: '',
        resume: null,
        agreeTerms: false
      });
      setEmailVerified(false);
      setPhoneVerified(false);
      setCurrentStep(1);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
              <p className="text-gray-600">
                Join SRS Talent Connect to access jobs and skill development programs
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-srs-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
                    1
                  </div>
                  <span className="text-sm mt-1">Personal Info</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-srs-blue' : 'bg-gray-200'}`}></div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-srs-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
                    2
                  </div>
                  <span className="text-sm mt-1">Education & Details</span>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === 1 ? 'Personal Information' : 'Education & Additional Details'}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 
                    ? 'Please provide your basic contact information'
                    : 'Please provide your educational background and other details'
                  }
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {currentStep === 1 ? (
                    <>
                      {/* Step 1: Personal Information */}
                      <div className="space-y-3">
                        <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email">Email ID <span className="text-red-500">*</span></Label>
                          {emailVerified && (
                            <span className="text-xs text-green-600 flex items-center">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <div className="flex-1">
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Enter your email address"
                              disabled={emailVerified}
                              required
                            />
                          </div>
                          <Button
                            type="button"
                            variant={emailVerified ? "outline" : "default"}
                            onClick={sendEmailVerification}
                            disabled={emailVerified || !formData.email}
                            className={emailVerified ? "border-green-500 text-green-500" : ""}
                          >
                            {emailVerified ? 'Verified' : 'Verify'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="contactNumber">Contact Number <span className="text-red-500">*</span></Label>
                          {phoneVerified && (
                            <span className="text-xs text-green-600 flex items-center">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <div className="flex-1">
                            <Input
                              id="contactNumber"
                              name="contactNumber"
                              value={formData.contactNumber}
                              onChange={handleChange}
                              placeholder="Enter 10-digit mobile number"
                              disabled={phoneVerified}
                              required
                            />
                          </div>
                          <Button
                            type="button"
                            variant={phoneVerified ? "outline" : "default"}
                            onClick={sendPhoneVerification}
                            disabled={phoneVerified || !formData.contactNumber}
                            className={phoneVerified ? "border-green-500 text-green-500" : ""}
                          >
                            {phoneVerified ? 'Verified' : 'Verify'}
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Step 2: Education & Additional Details */}
                      <div className="space-y-3">
                        <Label htmlFor="collegeName">College/University Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="collegeName"
                          name="collegeName"
                          value={formData.collegeName}
                          onChange={handleChange}
                          placeholder="Enter your college or university name"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label htmlFor="qualification">Highest Qualification <span className="text-red-500">*</span></Label>
                          <Select 
                            value={formData.qualification} 
                            onValueChange={(value) => handleSelectChange('qualification', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select qualification" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="BE">BE/B.Tech</SelectItem>
                              <SelectItem value="BCA">BCA</SelectItem>
                              <SelectItem value="BCOM">B.Com</SelectItem>
                              <SelectItem value="BSC">B.Sc</SelectItem>
                              <SelectItem value="MBA">MBA</SelectItem>
                              <SelectItem value="MCA">MCA</SelectItem>
                              <SelectItem value="MTECH">M.Tech</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor="stream">Stream/Specialization <span className="text-red-500">*</span></Label>
                          <Input
                            id="stream"
                            name="stream"
                            value={formData.stream}
                            onChange={handleChange}
                            placeholder="E.g., Computer Science"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter your city"
                            required
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor="dob">Date of Birth <span className="text-red-500">*</span></Label>
                          <Input
                            id="dob"
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label>Gender <span className="text-red-500">*</span></Label>
                        <RadioGroup
                          value={formData.gender}
                          onValueChange={(value) => handleSelectChange('gender', value)}
                          className="flex space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male" className="cursor-pointer">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female" className="cursor-pointer">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other" className="cursor-pointer">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="resume">Resume Upload <span className="text-red-500">*</span></Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                          <div className="space-y-2">
                            <div className="flex justify-center">
                              <Upload className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="text-sm text-gray-600">
                              <label htmlFor="file-upload" className="relative cursor-pointer text-srs-blue hover:text-srs-blue-dark">
                                <span>Click to upload</span>
                                <input
                                  id="file-upload"
                                  name="resume"
                                  type="file"
                                  className="sr-only"
                                  accept=".pdf,.doc,.docx"
                                  onChange={handleFileChange}
                                />
                              </label>
                              {" or drag and drop"}
                            </div>
                            <p className="text-xs text-gray-500">
                              PDF, DOC, or DOCX up to 5MB
                            </p>
                          </div>
                          {formData.resume && (
                            <div className="mt-4 flex items-center justify-center text-sm text-srs-blue">
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              {formData.resume.name}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 pt-2">
                        <Checkbox 
                          id="terms" 
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))
                          }
                          className="mt-1"
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms"
                            className="text-sm text-gray-600 cursor-pointer"
                          >
                            I agree to the{" "}
                            <a href="#" className="text-srs-blue hover:underline">
                              terms and conditions
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-srs-blue hover:underline">
                              privacy policy
                            </a>
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                
                <CardFooter className="flex justify-between border-t pt-6">
                  {currentStep === 1 ? (
                    <>
                      <div className="flex items-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-srs-blue hover:underline ml-1">
                          Login here
                        </Link>
                      </div>
                      <Button type="button" onClick={goToNextStep}>
                        Next Step
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button type="button" variant="outline" onClick={goToPrevStep}>
                        Previous
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Registering...
                          </>
                        ) : 'Register'}
                      </Button>
                    </>
                  )}
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Email Verification Modal */}
      <VerificationModal
        isOpen={isEmailVerificationModalOpen}
        onClose={() => setIsEmailVerificationModalOpen(false)}
        email={formData.email}
        onVerified={handleEmailVerified}
      />
      
      {/* Phone Verification Modal */}
      <VerificationModal
        isOpen={isPhoneVerificationModalOpen}
        onClose={() => setIsPhoneVerificationModalOpen(false)}
        email={formData.contactNumber} // Using email prop for phone number
        onVerified={handlePhoneVerified}
      />
    </div>
  );
};

export default Register;
