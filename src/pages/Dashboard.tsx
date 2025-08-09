import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);


const API_URL = import.meta.env.VITE_API_URL;

const mockFiles = [
  { name: 'invoice.pdf', date: '2024-06-01', size: '120 KB', status: 'Uploaded' },
  { name: 'photo.png', date: '2024-06-02', size: '2.1 MB', status: 'Uploaded' },
  { name: 'backup.zip', date: '2024-06-03', size: '10 MB', status: 'Processing' },
];

const mockUsage = {
  storage: 12.2,
  bandwidth: 45.7,
  files: 3,
  storageLimit: 1024,
  bandwidthLimit: 10240,
};

export default function Dashboard() {
  const [userApiKey, setUserApiKey] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(userApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  useEffect(() => {
    const userToken = sessionStorage.getItem('encodriveusertoken');
    fetchUserDetails(userToken);
  }, []);

  async function fetchUserDetails(token: string | null): Promise<void> {
    if (!token) {
      navigate('/signin');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/user/user-details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Invalid user or token');
      }

      const data = await res.json();
      console.log('User details:', data);
      setUserApiKey(data.user.apiKey);
    } catch (e) {
      console.error(e);
      sessionStorage.removeItem('encodriveusertoken');
      navigate('/signin');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="relative flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-[#4963c1]">Encodrive Dashboard</h1>

        {/* === API Key Section === */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-2">Your API Key</h2>
          <div className="flex items-center bg-gray-100 rounded px-4 py-2 mb-2">
            <span className="font-mono text-sm select-all flex-1">{userApiKey}</span>
            <button
              onClick={handleCopy}
              className="ml-2 px-2 py-1 text-[#4963c1] hover:text-[#3a52a8] focus:outline-none"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 text-blue-800 text-sm rounded">
            <b>How to use:</b> Install our npm package and use this key to encrypt and upload files.<br />
            <span className="font-mono">npm install encodrive-client</span><br />
            <button
              className="bg-white px-2 py-1 cursor-pointer rounded hover:bg-gray-100 mt-2"
              onClick={() => navigate('/docs')}
            >
              Click for more details
            </button>
          </div>
        </section>

        {/* === Files Section === */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Your Files</h2>
          <button
            className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
            onClick={() => alert('Refresh (not implemented)')}
          >
            Refresh
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">File Name</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Size</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockFiles.map((file, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{file.name}</td>
                    <td className="px-4 py-2">{file.date}</td>
                    <td className="px-4 py-2">{file.size}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${file.status === 'Uploaded' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {file.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* === Monitoring Section === */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Usage & Monitoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Storage Usage */}
            <div className="bg-white p-4 rounded shadow flex flex-col items-center">
              <h3 className="mb-2 font-medium">Storage Usage</h3>
              <Doughnut
                data={{
                  labels: ['Used', 'Remaining'],
                  datasets: [{
                    data: [mockUsage.storage, mockUsage.storageLimit - mockUsage.storage],
                    backgroundColor: ['#4963c1', '#e0e7ff'],
                  }],
                }}
              />
              <p className="mt-3 text-sm text-gray-600">
                {mockUsage.storage} MB / {mockUsage.storageLimit} MB
              </p>
            </div>

            {/* Bandwidth Usage */}
            <div className="bg-white p-4 rounded shadow flex flex-col items-center">
              <h3 className="mb-2 font-medium">Bandwidth Usage</h3>
              <Doughnut
                data={{
                  labels: ['Used', 'Remaining'],
                  datasets: [{
                    data: [mockUsage.bandwidth, mockUsage.bandwidthLimit - mockUsage.bandwidth],
                    backgroundColor: ['#f59e0b', '#fef3c7'],
                  }],
                }}
              />
              <p className="mt-3 text-sm text-gray-600">
                {mockUsage.bandwidth} MB / {mockUsage.bandwidthLimit} MB
              </p>
            </div>
          </div>

          {/* Upgrade button */}
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('/pricing')}
              className="px-6 py-3 bg-[#4963c1] text-white rounded hover:bg-[#3a52a8] transition"
            >
              Upgrade Plan
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
