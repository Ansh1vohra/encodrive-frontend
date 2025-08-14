import { useState } from "react";
const codeSnippets = {
  install: 'npm install encodrive-client',
  init: `import { Encodrive } from 'encodrive-client';\n\nconst drive = new Encodrive({\n  apiKey: 'YOUR_API_KEY',\n  encryptionKey: 'USER_PROVIDED_KEY'\n});`,
  upload: 'await drive.uploadFile(file);',
  options: `options: {\n  apiKey: string; // Your API key from dashboard\n  encryptionKey: string; // Your own encryption key\n}`
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
        <p className="text-gray-600 mb-8 text-center">Get started with Encodrive and integrate secure, end-to-end encrypted file storage into your app in minutes.</p>

        {/* Quick Start */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2 text-[#4963c1]">Quick Start</h2>
          <ol className="list-decimal ml-6 text-gray-700 space-y-2">
            <li>Sign up and get your API key from the dashboard.</li>
            <li>Install the npm package:</li>
            <CodeBlock code={codeSnippets.install} />
            <li>Initialize the client in your app:</li>
            <CodeBlock code={codeSnippets.init} />
            <li>Encrypt and upload a file:</li>
            <CodeBlock code={codeSnippets.upload} />
          </ol>
        </section>

        {/* API Reference */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2 text-[#4963c1]">API Reference</h2>
          <div className="mb-4">
            <div className="font-mono font-semibold">Encodrive(options)</div>
            <div className="text-gray-700 text-sm mb-2">Create a new Encodrive client instance.</div>
            <CodeBlock code={codeSnippets.options} />
          </div>
          <div className="mb-4">
            <div className="font-mono font-semibold">uploadFile(file: File): Promise&lt;UploadResult&gt;</div>
            <div className="text-gray-700 text-sm mb-2">Encrypts and uploads a file to Encodrive.</div>
          </div>
          <div className="mb-4">
            <div className="font-mono font-semibold">listFiles(): Promise&lt;FileInfo[]&gt;</div>
            <div className="text-gray-700 text-sm mb-2">Lists all files uploaded by the user.</div>
          </div>
        </section>

        {/* Support */}
        <section>
          <h2 className="text-xl font-bold mb-2 text-[#4963c1]">Need Help?</h2>
          <p className="text-gray-700">Contact our support team at <a href="mailto:encodriveweb@gmail.com" className="text-[#4963c1] underline">encodriveweb@gmail.com</a> or visit the <a href="/contact" className="text-[#4963c1] underline">Contact page</a>.</p>
        </section>
      </div>
    </div>
  );
}