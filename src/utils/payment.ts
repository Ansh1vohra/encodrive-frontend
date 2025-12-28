const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => sessionStorage.getItem('encodriveusertoken');

export async function createSubscription(payload: Record<string, any>) {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/payment/create-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  return res;
}

export async function getSubscriptionStatus() {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/payment/status`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res;
}

export async function cancelSubscription(subscriptionId?: string) {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/payment/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(subscriptionId ? { subscriptionId } : {})
  });
  return res;
}

export default {
  createSubscription,
  getSubscriptionStatus,
  cancelSubscription
};
