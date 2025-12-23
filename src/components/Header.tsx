import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signin, setSignin] = useState<boolean>(false);

  useEffect(() => {
    let token = sessionStorage.getItem('encodriveusertoken');
    if (token) {
      setSignin(true);
    }
  }, [])

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-[#4963c1] sticky top-0 z-50">

      <div className="cursor-pointer p-2" onClick={() => navigate(signin ? '/dashboard' : '/')}>
        <img src='/logo.jpg' alt="EncoDrive Logo" className="h-7" />
      </div>
      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-5">
        <Link to={signin ? '/dashboard' : '/'} className="text-gray-200 no-underline font-medium hover:text-white transition-colors">Home</Link>
        {/* <Link to="/" className="text-gray-200 no-underline font-medium hover:text-white transition-colors">Home</Link> */}
        <Link to="/docs" className="text-gray-200 no-underline font-medium hover:text-white transition-colors">Docs</Link>
        <Link to="/pricing" className="text-gray-200 no-underline font-medium hover:text-white transition-colors">Pricing</Link>
        {signin ? (
          <button
            className="text-gray-200 no-underline font-medium hover:text-white transition-colors"
            onClick={() => {
              sessionStorage.removeItem('encodriveusertoken');
              setSignin(false);
              navigate('/');
            }}
          >
            Sign Out
          </button>
        ) : (
          <Link to='/signin' className='text-gray-200 no-underline font-medium hover:text-white transition-colors'>Signin</Link>
        )}
      </nav>
      {/* Hamburger for Mobile */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <span className="block w-6 h-0.5 bg-white mb-1 rounded"></span>
        <span className="block w-6 h-0.5 bg-white mb-1 rounded"></span>
        <span className="block w-6 h-0.5 bg-white rounded"></span>
      </button>
      {/* Side Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="relative bg-[#4963c1] w-64 max-w-full h-full shadow-lg p-6 flex flex-col animate-slide-in-right ml-auto">
            <button
              className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              &times;
            </button>
            <nav className="flex flex-col gap-6 mt-10">
              <Link to={signin ? '/dashboard' : '/'} className="text-gray-200 no-underline font-medium hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
              {/* <Link to="/" className="text-gray-200 no-underline font-medium hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>Home</Link> */}
              <Link to="/docs" className="text-gray-200 no-underline font-medium hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>Docs</Link>
              <Link to="/pricing" className="text-gray-200 no-underline font-medium hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>Pricing</Link>
              {signin ? (
                <button
                  className="text-gray-200 no-underline font-medium hover:text-white transition-colors"
                  onClick={() => {
                    sessionStorage.removeItem('encodriveusertoken');
                    setSignin(false);
                    setMenuOpen(false);
                    navigate('/');
                  }}
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/signin"
                  className="text-gray-200 no-underline font-medium hover:text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Signin
                </Link>
              )}

            </nav>
          </div>
        </div>
      )}
      {/* Slide-in animation */}
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </header>
  );
};

export default Header;
