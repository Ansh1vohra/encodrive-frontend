import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast'; // Make sure to install react-hot-toast
const API_URL = import.meta.env.VITE_API_URL;

export default function Signin() {
  const [step, setStep] = useState<'options' | 'email' | 'otp'>('options');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = () => {
    toast('Google Sign-In not implemented yet', { icon: '⚠️' });
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <Toaster position="top-center" />
      <div className="bg-white/80 backdrop-blur-md border border-gray-200 p-10 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
          <p className="text-sm text-gray-500 mt-1">Access your account</p>
        </div>

        {step === 'options' && (
          <>
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-100 bg-white transition-colors mb-4"
            >
              <img src="/icons8-google.svg" className="w-5 h-5 mr-2" alt="Google" />
              Continue with Google
            </button>
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>
            <button
              onClick={() => setStep('email')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Sign in with Email
            </button>
          </>
        )}

        {step === 'email' && (
          <form onSubmit={handleSendOtp} className="space-y-5 animate-fade-in">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors hover:bg-indigo-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            <button
              type="button"
              onClick={() => setStep('options')}
              className="w-full mt-2 text-gray-500 hover:text-gray-700 text-sm text-center"
            >
              Back
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-5 animate-fade-in">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Enter OTP sent to <span className="font-semibold">{email}</span>
              </label>
              <input
                type="text"
                required
                value={otp}
                autoComplete="one-time-code"
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter OTP"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors hover:bg-indigo-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Verifying...' : 'Verify & Sign In'}
            </button>
            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full mt-2 text-gray-500 hover:text-gray-700 text-sm text-center"
            >
              Back
            </button>
          </form>
        )}

        <p className="text-xs text-center text-gray-400 mt-8">
          By continuing, you agree to our{' '}
          <a href="#" className="underline">Terms</a> &{' '}
          <a href="#" className="underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
