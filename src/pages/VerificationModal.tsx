
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle2, Mail, RotateCw } from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerified: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  email,
  onVerified
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

  // Simulate countdown timer
  useEffect(() => {
    if (isOpen && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen, timer]);

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtp = [...otp];
    // Replace the value at index
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);
    
    // Move to next input if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle key down for backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Simulate OTP verification
  const verifyOtp = () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a complete 6-digit OTP",
        variant: "destructive"
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // For demo purposes, any 6-digit OTP is valid
      setIsVerified(true);
      setIsVerifying(false);
      
      toast({
        title: "Email Verified",
        description: "Your email has been successfully verified!",
        variant: "default"
      });
      
      // Notify parent component after a slight delay
      setTimeout(() => {
        onVerified();
      }, 1500);
    }, 2000);
  };

  // Simulate resending OTP
  const resendOtp = () => {
    setIsResending(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      setIsResending(false);
      setTimer(60);
      
      toast({
        title: "OTP Resent",
        description: `A new verification code has been sent to ${email}`,
        variant: "default"
      });
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email Verification</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {!isVerified ? (
            <>
              <div className="flex items-center justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-srs-blue" />
                </div>
              </div>
              
              <p className="text-center text-gray-600 mb-6">
                We've sent a verification code to<br />
                <span className="font-semibold text-gray-800">{email}</span>
              </p>
              
              <div className="flex justify-center gap-2 mb-6">
                {Array(6).fill(0).map((_, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-srs-blue focus:border-transparent"
                  />
                ))}
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <Button 
                  onClick={verifyOtp} 
                  disabled={isVerifying || otp.join('').length !== 6}
                  className="w-full bg-srs-blue hover:bg-srs-blue-dark text-white"
                >
                  {isVerifying ? (
                    <>
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : 'Verify Email'}
                </Button>
                
                <div className="text-sm text-gray-500">
                  {timer > 0 ? (
                    <p>Resend code in {timer} seconds</p>
                  ) : (
                    <button
                      onClick={resendOtp}
                      disabled={isResending}
                      className="text-srs-blue hover:underline focus:outline-none"
                    >
                      {isResending ? 'Sending...' : 'Resend verification code'}
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center py-4">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Verified Successfully!</h3>
              <p className="text-gray-600 text-center mb-6">
                Your email has been verified. You can now continue with your registration.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationModal;
