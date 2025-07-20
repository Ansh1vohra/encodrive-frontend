import { useState } from 'react';
import { useNavigate } from 'react-router';
const mockApiKey = 'encodrive_live_1234567890abcdef';
const mockFiles = [
  { name: 'invoice.pdf', date: '2024-06-01', size: '120 KB', status: 'Uploaded' },
  { name: 'photo.png', date: '2024-06-02', size: '2.1 MB', status: 'Uploaded' },
  { name: 'backup.zip', date: '2024-06-03', size: '10 MB', status: 'Processing' },
];
const mockUsage = {
  storage: 12.2, // in MB
  bandwidth: 45.7, // in MB
  files: 3,
  storageLimit: 1024, // 1GB
  bandwidthLimit: 10240, // 10GB
};

export default function Dashboard() {
  const [tab, setTab] = useState<'keys' | 'files' | 'monitoring'>('keys');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(mockApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-[#4963c1]">Encodrive Dashboard</h1>
        <div className="flex space-x-4 mb-8 border-b pb-2">
          <button
            className={`px-4 py-2 font-medium rounded-t ${tab === 'keys' ? 'bg-[#4963c1] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setTab('keys')}
          >
            API Keys
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-t ${tab === 'files' ? 'bg-[#4963c1] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setTab('files')}
          >
            Files
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-t ${tab === 'monitoring' ? 'bg-[#4963c1] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setTab('monitoring')}
          >
            Monitoring
          </button>
        </div>
        {/* API Keys Tab */}
        {tab === 'keys' && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Your API Key</h2>
            <div className="flex items-center bg-gray-100 rounded px-4 py-2 mb-2">
              <span className="font-mono text-sm select-all flex-1">{mockApiKey}</span>
              <button
                onClick={handleCopy}
                className="ml-2 px-2 py-1 text-[#4963c1] hover:text-[#3a52a8] focus:outline-none"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <button
              className="mt-2 text-xs text-gray-500 hover:text-[#4963c1] underline"
              onClick={() => alert('Regenerate key (not implemented)')}
            >
              Regenerate Key
            </button>
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 text-blue-800 text-sm rounded">
              <b>How to use:</b> Install our npm package and use this key to encrypt and upload files.<br/>
              <span className="font-mono">npm install encodrive-client</span><br />
              <button className="bg-white px-2 py-1 cursor-pointer rounded hover:bg-gray-100 mt-2" onClick={()=>{
                navigate('/docs');
              }}>Click for more details</button>
            </div>
          </div>
        )}
        {/* Files Tab */}
        {tab === 'files' && (
          <div>
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
                        <span className={`px-2 py-1 rounded text-xs ${file.status === 'Uploaded' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{file.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
        )}
        {/* Monitoring Tab */}
        {tab === 'monitoring' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Usage & Monitoring</h2>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Storage Used</span>
                <span>{mockUsage.storage} MB / {mockUsage.storageLimit} MB</span>
              </div>
              <div className="w-full bg-gray-200 rounded h-3 mb-2">
                <div
                  className="bg-[#4963c1] h-3 rounded"
                  style={{ width: `${(mockUsage.storage / mockUsage.storageLimit) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mb-1">
                <span>Bandwidth Used</span>
                <span>{mockUsage.bandwidth} MB / {mockUsage.bandwidthLimit} MB</span>
              </div>
              <div className="w-full bg-gray-200 rounded h-3 mb-2">
                <div
                  className="bg-[#4963c1] h-3 rounded"
                  style={{ width: `${(mockUsage.bandwidth / mockUsage.bandwidthLimit) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mb-1">
                <span>Files Uploaded</span>
                <span>{mockUsage.files}</span>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-blue-800 text-sm rounded">
              <b>Recent Activity:</b>
              <ul className="list-disc ml-6 mt-2">
                <li>Uploaded <b>backup.zip</b> (Processing)</li>
                <li>Uploaded <b>photo.png</b> (Uploaded)</li>
                <li>Uploaded <b>invoice.pdf</b> (Uploaded)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}