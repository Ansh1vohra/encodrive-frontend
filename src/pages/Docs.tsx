import { useState } from "react";

const codeSnippets = {
  install: 'npm install encodrive',
  init: `import { Encodrive } from 'encodrive';\n\nconst drive = new Encodrive({\n  apiKey: 'YOUR_API_KEY',\n  encryptionKey: 'USER_PROVIDED_KEY'\n});`,
  upload: 'const result = await drive.uploadFile(selectedFile);',
  download: `const { blob, metadata } = await drive.downloadFile(downloadUrl);\n\n// Create download link\nconst url = window.URL.createObjectURL(blob);\nconst a = document.createElement('a');\na.href = url;\na.download = metadata.fileName || "downloaded-file";\ndocument.body.appendChild(a);\na.click();\na.remove();\nwindow.URL.revokeObjectURL(url);`,
  options: `options: {\n  apiKey: string; // Your API key from dashboard\n  encryptionKey: string; // Your own encryption key\n}`,
  fullExample: `import { Encodrive } from 'encodrive';\n\n// Initialize\const drive = new Encodrive({\n  apiKey: 'your-api-key-here',\n  encryptionKey: 'your-encryption-key-here'\n});\n\n// Upload file\nconst uploadResult = await drive.uploadFile(file);\nconsole.log('Uploaded:', uploadResult.downloadUrl);\n\n// Download file\nconst { blob, metadata } = await drive.downloadFile(uploadResult.downloadUrl);\n// Save file to user's device...`
};

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="relative my-2">
      <pre className="bg-gray-100 rounded p-3 text-sm font-mono select-all overflow-x-auto whitespace-pre-wrap break-words border border-gray-200">
        {code}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-xs px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-200 text-[#4963c1] font-medium focus:outline-none"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

export default function Docs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4 text-[#4963c1] text-center">Encodrive Documentation</h1>
        <p className="text-gray-600 mb-8 text-center">End-to-end encrypted file storage for your applications. Secure, simple, and reliable.</p>

        {/* Quick Start */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#4963c1]">Quick Start</h2>
          <ol className="list-decimal ml-6 text-gray-700 space-y-4">
            <li>Sign up and get your API key from the dashboard</li>
            <li>Install the npm package:
              <CodeBlock code={codeSnippets.install} />
            </li>
            <li>Initialize the client in your app:
              <CodeBlock code={codeSnippets.init} />
            </li>
            <li>Upload a file:
              <CodeBlock code={codeSnippets.upload} />
            </li>
            <li>Download a file:
              <CodeBlock code={codeSnippets.download} />
            </li>
          </ol>
        </section>

        {/* API Reference */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#4963c1]">API Reference</h2>
          
          <div className="mb-6">
            <h3 className="font-mono font-semibold text-lg mb-2">Encodrive(options)</h3>
            <div className="text-gray-700 text-sm mb-3">Create a new Encodrive client instance.</div>
            <CodeBlock code={codeSnippets.options} />
          </div>

          <div className="mb-6">
            <h3 className="font-mono font-semibold text-lg mb-2">uploadFile(file: File): Promise&lt;UploadResult&gt;</h3>
            <div className="text-gray-700 text-sm mb-2">Encrypts and uploads a file to Encodrive. Returns an object containing the download URL.</div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200 text-sm">
              <strong>Returns:</strong> <code className="text-[#4963c1]">&#123; downloadUrl: string &#125;</code>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-mono font-semibold text-lg mb-2">downloadFile(downloadUrl: string): Promise&lt;&#123; blob: Blob, metadata: object &#125;&gt;</h3>
            <div className="text-gray-700 text-sm mb-2">Downloads and decrypts a file from Encodrive. Returns the file as a Blob along with metadata.</div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200 text-sm">
              <strong>Returns:</strong> <code className="text-[#4963c1]">&#123; blob: Blob, metadata: &#123; fileName: string, fileSize: number, fileType: string &#125; &#125;</code>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-mono font-semibold text-lg mb-2">listFiles(): Promise&lt;FileInfo[]&gt;</h3>
            <div className="text-gray-700 text-sm mb-2">Lists all files uploaded by the user (coming soon).</div>
          </div>
        </section>

        {/* Complete Example */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#4963c1]">Complete Example</h2>
          <div className="text-gray-700 mb-3">
            Here's a complete example showing both upload and download functionality:
          </div>
          <CodeBlock code={codeSnippets.fullExample} />
        </section>

        {/* Best Practices */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#4963c1]">Best Practices</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Always store your encryption key securely - never hardcode it in client-side applications</li>
            <li>Use environment variables for your API key and encryption key</li>
            <li>Handle upload and download errors gracefully with try-catch blocks</li>
            <li>Provide user feedback during file operations (uploading/downloading states)</li>
            <li>Clean up object URLs after download to prevent memory leaks</li>
          </ul>
        </section>

        {/* Support */}
        <section>
          <h2 className="text-xl font-bold mb-2 text-[#4963c1]">Need Help?</h2>
          <p className="text-gray-700">
            Contact our support team at <a href="mailto:encodriveweb@gmail.com" className="text-[#4963c1] underline">encodriveweb@gmail.com</a> or visit the <a href="/contact" className="text-[#4963c1] underline">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}