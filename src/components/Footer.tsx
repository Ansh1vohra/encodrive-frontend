import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer className="w-full py-8 px-4 md:px-8 border-t border-gray-200 bg-gray-50 text-sm text-gray-600 mt-auto">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      {/* Description */}
      <div className="text-center md:text-left flex-1">
        <div className="font-bold text-lg text-[#4963c1] mb-1">Encodrive</div>
        <div className="mb-2">Making end-to-end encrypted file storage easy for developers. Secure, scalable, and developer-first.</div>
        <div className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Encodrive. All rights reserved.</div>
      </div>
      {/* Links */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
        <Link to="/" className="hover:text-[#4963c1] transition-colors">Home</Link>
        <Link to="/docs" className="hover:text-[#4963c1] transition-colors">Docs</Link>
        <Link to="/pricing" className="hover:text-[#4963c1] transition-colors">Pricing</Link>
        <Link to="/contact" className="hover:text-[#4963c1] transition-colors">Contact</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
