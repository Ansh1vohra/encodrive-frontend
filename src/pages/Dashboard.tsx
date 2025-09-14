import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const API_URL = import.meta.env.VITE_API_URL;

// Define interfaces
interface FileData {
  name: string;
  date: string;
  size: string;
  type: string;
  url: string;
  status: string;
  sizeInBytes: number;
}

interface StorageUsage {
  used: number; // in MB
  total: number; // in MB
  percentage: number;
}

export default function Dashboard() {
  const [userApiKey, setUserApiKey] = useState<string>('');
  const [userPlan, setUserPlan] = useState<string>('free');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<FileData[]>([]);
  const [filesLoading, setFilesLoading] = useState(true);
  const [filesError, setFilesError] = useState<string>('');
  const [storageUsage, setStorageUsage] = useState<StorageUsage>({
    used: 0,
    total: 1024,
    percentage: 0
  });
  const [copiedLinks, setCopiedLinks] = useState<{[key: number]: boolean}>({});
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(userApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleCopyLink = (index: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLinks(prev => ({...prev, [index]: true}));
    setTimeout(() => setCopiedLinks(prev => ({...prev, [index]: false})), 1200);
  };

  useEffect(() => {
    const userToken = sessionStorage.getItem('encodriveusertoken');
    fetchUserDetails(userToken);
  }, []);

  useEffect(() => {
    if (userApiKey) {
      fetchUserFiles();
    }
  }, [userApiKey]);

  useEffect(() => {
    const totalStorageMB = userPlan === 'pro' ? 51200 : 1024;
    const percentage = storageUsage.used > 0 ? (storageUsage.used / totalStorageMB) * 100 : 0;
    
    setStorageUsage(prev => ({
      ...prev,
      total: totalStorageMB,
      percentage: parseFloat(percentage.toFixed(2))
    }));
  }, [userPlan]);

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
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Invalid user or token');
      }

      const data = await res.json();
      setUserApiKey(data.user.apiKey);
      setUserPlan(data.user.plan || 'free');
    } catch (e) {
      console.error(e);
      sessionStorage.removeItem('encodriveusertoken');
      navigate('/signin');
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserFiles(): Promise<void> {
    const token = sessionStorage.getItem('encodriveusertoken');
    
    if (!token) {
      setFilesError('No authentication token found');
      setFilesLoading(false);
      return;
    }

    try {
      setFilesLoading(true);
      setFilesError('');
      
      const res = await fetch(`${API_URL}/api/user/user-files`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch files: ${res.status}`);
      }

      const data = await res.json();
      
      let totalBytesUsed = 0;
      
      const formattedFiles = data.files.map((file: any) => {
        const fileSizeBytes = file.fileSize || 0;
        totalBytesUsed += fileSizeBytes;
        
        return {
          name: file.fileName || 'Unknown',
          date: file.uploadedAt ? new Date(file.uploadedAt).toISOString().split('T')[0] : 'Unknown date',
          size: fileSizeBytes ? formatFileSize(fileSizeBytes) : 'Unknown size',
          sizeInBytes: fileSizeBytes,
          type: file.fileType || 'Unknown',
          url: file.s3Url || '',
          status: 'Uploaded'
        };
      });
      
      const usedStorageMB = totalBytesUsed / 1048576;
      const totalStorageMB = userPlan === 'pro' ? 51200 : 1024;
      const percentage = (usedStorageMB / totalStorageMB) * 100;
      
      setStorageUsage({
        used: parseFloat(usedStorageMB.toFixed(2)),
        total: totalStorageMB,
        percentage: parseFloat(percentage.toFixed(2))
      });
      
      setFiles(formattedFiles);
    } catch (error) {
      console.error('Error fetching files:', error);
      setFilesError(error instanceof Error ? error.message : 'Failed to load files');
    } finally {
      setFilesLoading(false);
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  const handleRefreshFiles = () => {
    fetchUserFiles();
  };

  if (loading) {
    return (
      <div className="relative flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-white p-8 text-white">
          <h1 className="text-3xl font-bold mb-2 text-[#4963c1]">Encodrive Dashboard</h1>
        </div>

        <div className="px-6 py-2 md:px-8">
          {/* === API Key Section === */}
          <section className="mb-10 bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h2 className="text-xl font-semibold mb-4 text-[#4963c1]">Your API Key</h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white rounded-lg p-3 border border-blue-200">
              <span className="font-mono text-sm select-all flex-1 text-gray-800 break-all p-2 bg-gray-50 rounded">
                {userApiKey}
              </span>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-[#4963c1] text-white rounded-lg hover:bg-[#3a52a8] transition-colors whitespace-nowrap"
              >
                {copied ? '✓ Copied' : 'Copy Key'}
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200 mt-4">
              <h3 className="font-medium text-[#4963c1] mb-2">How to use:</h3>
              <p className="text-gray-700 mb-3">
                Install our npm package and use this key to encrypt and upload files.
              </p>
              <code className="block bg-gray-100 p-2 rounded text-sm mb-3 font-mono break-all">
                npm install encodrive-client
              </code>
              <button
                className="px-4 py-2 bg-[#4963c1] text-white rounded-lg hover:bg-[#3a52a8] transition-colors"
                onClick={() => navigate('/docs')}
              >
                View Documentation
              </button>
            </div>
          </section>

          {/* === Storage Usage Section === */}
          <section className="mb-10 bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Storage Overview</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Large Chart */}
              <div className="flex flex-col items-center">
                <div className="w-64 h-64 relative">
                  <Doughnut
                    data={{
                      labels: ['Used', 'Remaining'],
                      datasets: [{
                        data: [storageUsage.used, Math.max(0, storageUsage.total - storageUsage.used)],
                        backgroundColor: ['#4963c1', '#e0e7ff'],
                        borderWidth: 0,
                        borderRadius: 6,
                      }],
                    }}
                    options={{
                      cutout: '65%',
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              return `${context.label}: ${context.raw} MB`;
                            }
                          }
                        }
                      }
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#4963c1]">
                        {storageUsage.percentage}%
                      </div>
                      <div className="text-sm text-gray-500 mt-1">used</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Details */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-2">Storage Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Used:</span>
                      <span className="font-medium">{storageUsage.used} MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium">{storageUsage.total} MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-medium text-green-600">
                        {Math.max(0, storageUsage.total - storageUsage.used)} MB
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-medium text-[#4963c1] mb-2">Current Plan</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#4963c1]">
                      {userPlan.toUpperCase()} Plan
                    </span>
                    <span className="px-3 py-1 bg-[#4963c1] text-white rounded-full text-sm">
                      {userPlan === 'pro' ? '50GB' : '1GB'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/pricing')}
                  className="w-full px-6 py-3 bg-[#4963c1] text-white rounded-lg hover:bg-[#3a52a8] transition-all transform hover:scale-105"
                >
                  Upgrade Plan
                </button>
              </div>
            </div>
          </section>

          {/* === Files Section === */}
          <section className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Your Files</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefreshFiles}
                  disabled={filesLoading}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {filesLoading ? '🔄 Refreshing...' : '🔄 Refresh'}
                </button>
              </div>
            </div>
            
            {filesError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-red-600">⚠️ {filesError}</span>
                  <button
                    onClick={handleRefreshFiles}
                    className="ml-4 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
            
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              {filesLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="w-8 h-8 border-4 border-[#4963c1] border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-600">Loading files...</span>
                </div>
              ) : files.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📁</div>
                  <p className="text-gray-500 mb-4">No files found</p>
                  <p className="text-gray-400 text-sm">Upload your first file to get started</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {files.map((file, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 max-w-60 overflow-x-auto">{file.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            {file.type.split('/')[1] || file.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{file.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{file.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {file.url && (
                            <button
                              onClick={() => handleCopyLink(i, file.url)}
                              className="px-3 py-1 bg-[#4963c1] text-white rounded-lg text-sm hover:bg-[#3a52a8] transition-colors"
                              title="Copy encrypted file link"
                            >
                              {copiedLinks[i] ? '✓ Copied' : 'Copy Link'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}