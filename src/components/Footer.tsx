import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <footer className="w-full py-10 px-4 md:px-8 border-t border-gray-200 bg-gray-50 text-sm text-gray-600 mt-auto">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-8">

      {/* Brand / Description */}
      <div className="text-center md:text-left flex-1">
        <div className="font-bold text-lg text-[#4963c1] mb-1">
          Encodrive
        </div>
        <p className="mb-3 max-w-md">
          Making end-to-end encrypted file storage easy for developers. Secure,
          scalable, and developer-first.
        </p>
        <div className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Encodrive. All rights reserved.
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Product */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <span className="text-gray-700 font-semibold">Product</span>
          <Link to="/" className="hover:text-[#4963c1] transition-colors">
            Home
          </Link>
          <Link to="/docs" className="hover:text-[#4963c1] transition-colors">
            Docs
          </Link>
          <Link to="/pricing" className="hover:text-[#4963c1] transition-colors">
            Pricing
          </Link>
          <Link to="/contact" className="hover:text-[#4963c1] transition-colors">
            Contact
          </Link>
        </div>

        {/* Legal */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <span className="text-gray-700 font-semibold">Legal</span>
          <Link to="/terms" className="hover:text-[#4963c1] transition-colors">
            Terms & Conditions
          </Link>
          <Link to="/privacy" className="hover:text-[#4963c1] transition-colors">
            Privacy Policy
          </Link>
          <Link to="/refunds" className="hover:text-[#4963c1] transition-colors">
            Cancellations & Refunds
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
