import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient';
import { Checkbox } from '@/components/ui/checkbox';

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    contactNumber: '',
    agreeTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEmailStep = async () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.contactNumber) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          fullName: formData.fullName,
          contactNumber: formData.contactNumber,
        }
      }
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    setEmailVerificationSent(true);

    toast({
      title: "Verification Email Sent",
      description: "Check your email for a verification link to continue.",
      variant: "default"
    });
  };

  const checkEmailVerified = async () => {
    const { data } = await supabase.auth.getUser();
    if (data?.user?.email_confirmed_at) {
      setEmailVerified(true);
      toast({
        title: "Email Verified",
        description: "You can now login.",
        variant: "default"
      });
      setTimeout(() => navigate('/login'), 1500);
    } else {
      toast({
        title: "Email Not Verified",
        description: "Please verify your email before continuing.",
        variant: "destructive"
      });
    }
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
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Please provide your basic contact information
                </CardDescription>
              </CardHeader>
              <form>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      disabled={emailVerificationSent}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email">Email ID <span className="text-red-500">*</span></Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                      disabled={emailVerificationSent}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      disabled={emailVerificationSent}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="contactNumber">Contact Number <span className="text-red-500">*</span></Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="Enter 10-digit mobile number"
                      required
                      disabled={emailVerificationSent}
                    />
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
                  {!emailVerificationSent ? (
                    <Button type="button" onClick={handleEmailStep} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : 'Send Verification Email'}
                    </Button>
                  ) : !emailVerified ? (
                    <div className="space-y-2">
                      <p className="text-green-600">A verification email has been sent to {formData.email}. Please verify your email to continue.</p>
                      <Button type="button" onClick={checkEmailVerified}>
                        I've Verified My Email
                      </Button>
                    </div>
                  ) : null}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <div className="flex items-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-srs-blue hover:underline ml-1">
                      Login here
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;