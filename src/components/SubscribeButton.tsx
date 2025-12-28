import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

type Props = {
  planKey: string;
  planId?: string;
  amount?: number; // in smallest currency unit
  currency?: string;
  total_count?: number;
  children?: React.ReactNode;
};

export default function SubscribeButton({ planKey, planId, amount, currency='INR', total_count=9999, children }: Props) {
  const [loading, setLoading] = useState(false);

  const getToken = () => sessionStorage.getItem('encodriveusertoken');

  const handleSubscribe = async () => {
    const token = getToken();
    if (!token) {
      window.location.href = '/signin';
      return;
    }

    setLoading(true);
    try {
      const body: any = { plan_key: planKey };
      if (planId) body.plan_id = planId;
      if (amount) { body.amount = amount; body.currency = currency; body.total_count = total_count; }

      const res = await fetch(`${API_URL}/api/payment/create-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (res.status === 401) {
        toast.error('Unauthorized. Please sign in again.');
        sessionStorage.removeItem('encodriveusertoken');
        window.location.href = '/signin';
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Failed to create subscription');
      }

      const data = await res.json();
      toast.success('Subscription created');

      // If backend returns subscription with checkout or customer info, optionally redirect
      // For now, navigate to dashboard
      window.location.href = '/dashboard';
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'Failed to create subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className={`w-full text-center py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Processing...' : children || 'Subscribe'}
    </button>
  );
}
