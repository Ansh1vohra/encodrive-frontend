import React, { useState } from 'react';

export default function Sigin() {
  const [step, setStep] = useState<'options' | 'email' | 'otp'>('options');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleGoogleSignIn = () => {
    // Placeholder for Google sign-in logic
    alert('Google Sign-In (not implemented)');
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(emailSent);
    setEmailSent(true);
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for OTP verification logic
    alert('Logged in (not implemented)');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {step === 'options' && (
          <>
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 py-3 rounded-md font-medium mb-4 hover:bg-[#357ae8] transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.18 0 24 0 14.82 0 6.73 5.82 2.69 14.09l7.98 6.2C12.36 13.36 17.73 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.36 46.1 31.45 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.29c-1.13-3.36-1.13-6.97 0-10.33l-7.98-6.2C.64 16.36 0 20.09 0 24s.64 7.64 2.69 12.24l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.18 0 11.64-2.04 15.52-5.56l-7.19-5.6c-2.01 1.35-4.59 2.16-8.33 2.16-6.27 0-11.64-3.86-13.33-9.29l-7.98 6.2C6.73 42.18 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
              Sign in with Google
            </button>
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>
            <button
              onClick={() => setStep('email')}
              className="w-full bg-[#4963c1] hover:bg-[#357ae8] text-white py-3 rounded-md font-medium transition-colors"
            >
              Sign in with Email
            </button>
          </>
        )}
        {step === 'email' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4963c1]"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="w-full bg-[#4963c1] text-white py-3 rounded-md font-medium hover:bg-[#3a52a8] transition-colors"
            >
              Send OTP
            </button>
            <button
              type="button"
              onClick={() => setStep('options')}
              className="w-full mt-2 text-gray-500 hover:text-gray-700 text-sm"
            >
              Back
            </button>
          </form>
        )}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <label className="block text-gray-700 font-medium">Enter OTP sent to <span className="font-semibold">{email}</span></label>
            <input
              type="text"
              required
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4963c1]"
              placeholder="Enter OTP"
            />
            <button
              type="submit"
              className="w-full bg-[#4963c1] text-white py-3 rounded-md font-medium hover:bg-[#3a52a8] transition-colors"
            >
              Verify & Sign In
            </button>
            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full mt-2 text-gray-500 hover:text-gray-700 text-sm"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}