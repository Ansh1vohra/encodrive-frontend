import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast'; // Make sure to install react-hot-toast
const API_URL = import.meta.env.VITE_API_URL;
import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode"; 

export default function Signin() {
  const [step, setStep] = useState<'options' | 'email' | 'otp'>('options');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Check if user is already signed in
  useEffect(() => {
    const token = sessionStorage.getItem('encodriveusertoken');
    if (token) {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleGoogleSignIn = async (credentialResponse: any) => {
    try {
      setGoogleLoading(true);
      const idToken = credentialResponse.credential; // Google token
      if (!idToken) {
        toast.error("Google Sign-In failed");
        return;
      }

      // Send token to backend
      const res = await fetch(`${API_URL}/api/user/google-signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) throw new Error("Google Sign-In failed");

      const data = await res.json();
      const token = data.token;

      // Save your backend JWT
      sessionStorage.setItem("encodriveusertoken", token);

      toast.success("Signed in with Google!");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      toast.error("Google Sign-In failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/user/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed to send OTP');

      toast.success('OTP sent successfully!');
      setStep('otp');
    } catch (error) {
      console.error(error);
      toast.error('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/user/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (!res.ok) throw new Error('Invalid OTP');

      const data = await res.json();
      const token = data.token;

      sessionStorage.setItem('encodriveusertoken', token);
      toast.success('Signed in!');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);
      toast.error('OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4 animate-gradient">
      <Toaster position="top-center" />
      <div className="bg-white/80 backdrop-blur-md border border-gray-200 p-10 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-500 hover:shadow-3xl hover:scale-105 animate-fade-in">
        <div className="text-center mb-8 animate-slide-down">
          <h2 className="text-3xl font-bold text-gray-800 animate-text-glow">Sign In</h2>
          <p className="text-sm text-gray-500 mt-1 animate-fade-in-delay">Access your account</p>
        </div>

        {step === 'options' && (
          <div className="animate-slide-up">
            <div className="relative">
              <GoogleLogin
                onSuccess={handleGoogleSignIn}
                onError={() => toast.error("Google Sign-In Failed")}
                theme="outline"  
                size="large"     
                text="continue_with"
              />
              {googleLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center animate-fade-in">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    {/* <p className="text-sm text-gray-600 font-medium">Signing you in...</p> */}
                  </div>
                </div>
              )}
            </div>
            {/* <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-100 bg-white transition-colors mb-4"
            >
              <img src="/icons8-google.svg" className="w-5 h-5 mr-2" alt="Google" />
              Continue with Google
            </button> */}
            <div className="flex items-center my-6 animate-fade-in-delay">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>
            <button
              onClick={() => setStep('email')}
              disabled={googleLoading}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg animate-bounce-subtle ${googleLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Sign in with Email
            </button>
          </div>
        )}

        {step === 'email' && (
          <form onSubmit={handleSendOtp} className="space-y-5 animate-slide-left">
            <div className="animate-fade-in-up">
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-400 focus:scale-105"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'animate-pulse-subtle'}`}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            <button
              type="button"
              onClick={() => setStep('options')}
              className="w-full mt-2 text-gray-500 hover:text-gray-700 text-sm text-center transition-colors duration-300 hover:scale-105"
            >
              Back
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-5 animate-slide-right">
            <div className="animate-fade-in-up">
              <label className="block text-gray-700 font-medium mb-1">
                Enter OTP sent to <span className="font-semibold">{email}</span>
              </label>
              <input
                type="text"
                required
                value={otp}
                autoComplete="one-time-code"
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-400 focus:scale-105"
                placeholder="Enter OTP"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'animate-pulse-subtle'}`}
            >
              {loading ? 'Verifying...' : 'Verify & Sign In'}
            </button>
            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full mt-2 text-gray-500 hover:text-gray-700 text-sm text-center transition-colors duration-300 hover:scale-105"
            >
              Back
            </button>
          </form>
        )}

        <p className="text-xs text-center text-gray-400 mt-8 animate-fade-in-delay">
          By continuing, you agree to our{' '}
          <a href="#" className="underline transition-colors duration-300 hover:text-indigo-600">Terms</a> &{' '}
          <a href="#" className="underline transition-colors duration-300 hover:text-indigo-600">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
