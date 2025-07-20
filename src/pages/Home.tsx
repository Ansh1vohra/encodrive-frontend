import { FaLock, FaShieldAlt, FaCode, FaPlug, FaServer, FaChartLine, FaRegCopy } from 'react-icons/fa';
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
  // Copy-to-clipboard logic for code block
  const codeRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const codeString = `import { Encodrive } from 'encodrive-client';\n\nconst drive = new Encodrive({\n  apiKey: 'YOUR_API_KEY',\n  encryptionKey: 'USER_PROVIDED_KEY'\n});\n\n// Encrypt and upload\nawait drive.uploadFile(file);`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Animation for How It Works steps
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSteps, setVisibleSteps] = useState([false, false, false, false]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepsRef.current.forEach((el, idx) => {
      if (!el) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Scroll to How It Works
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const handleScrollToHowItWorks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
    exit: { opacity: 0 }
  };
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7} }
  };

  return (
    <motion.div
      className="font-sans antialiased text-gray-800"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
    >
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-br from-[#4963c1] via-[#5f6ee6] to-[#7f53ac] text-white py-12 md:py-24 relative overflow-hidden"
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-0">
            {/* Left: Text */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">End-to-End File Encryption Made Simple</h1>
              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 opacity-90">
                Secure your files with our developer-friendly solution. Just install our npm package and let Encodrive handle the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:space-x-4 w-full">
                <a
                  href="/signin"
                  className="bg-white text-[#4963c1] hover:bg-gray-100 px-6 py-3 rounded-md text-base sm:text-lg font-medium text-center"
                >
                  Get Started for Free
                </a>
                <a
                  href="#how-it-works"
                  onClick={handleScrollToHowItWorks}
                  className="border-2 border-white text-white hover:bg-white hover:text-[#4963c1] px-6 py-3 rounded-md text-base sm:text-lg font-medium text-center transition-colors cursor-pointer"
                >
                  How It Works
                </a>
              </div>
            </div>
            {/* Right: Code Block */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="bg-white/20 p-4 sm:p-6 rounded-xl backdrop-blur-sm w-full max-w-md">
                <div className="bg-white text-gray-800 p-4 sm:p-6 rounded-lg shadow-lg relative">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <span className="bg-[#4963c1] text-white p-2 rounded-md mr-3">
                      <FaCode />
                    </span>
                    <h3 className="font-mono font-bold text-sm sm:text-base">npm install encodrive-client</h3>
                  </div>
                  <div className="relative">
                    <pre ref={codeRef} className="bg-gray-100 p-3 sm:p-4 rounded-md overflow-x-auto text-xs sm:text-sm pr-10 select-all whitespace-pre-wrap break-words max-w-full">
                      {codeString}
                    </pre>
                    <button
                      onClick={handleCopy}
                      className="absolute top-2 right-2 text-gray-500 hover:text-[#4963c1] focus:outline-none"
                      aria-label="Copy code"
                    >
                      <FaRegCopy size={20} />
                    </button>
                    {copied && (
                      <span className="absolute top-2 right-10 bg-white text-[#4963c1] px-2 py-1 rounded shadow text-xs font-semibold">Copied!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section id="features" className="py-16 bg-gray-50" variants={sectionVariants}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Developer-First Encryption</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our solution is built by developers, for developers. Focus on your app, we'll handle the security.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaLock className="text-3xl mb-4 text-[#4963c1]" />,
                title: "End-to-End Encryption",
                description: "Files are encrypted before leaving the client. Only you hold the keys."
              },
              {
                icon: <FaShieldAlt className="text-3xl mb-4 text-[#4963c1]" />,
                title: "Secure Storage",
                description: "Encrypted files stored on AWS S3 with strict access controls."
              },
              {
                icon: <FaPlug className="text-3xl mb-4 text-[#4963c1]" />,
                title: "Simple Integration",
                description: "Just install our npm package and add a few lines of code."
              },
              {
                icon: <FaServer className="text-3xl mb-4 text-[#4963c1]" />,
                title: "Scalable Infrastructure",
                description: "Built on AWS to handle your growth without changing code."
              },
              {
                icon: <FaChartLine className="text-3xl mb-4 text-[#4963c1]" />,
                title: "Performance Optimized",
                description: "Fast encryption algorithms with minimal overhead."
              },
              {
                icon: <FaCode className="text-3xl mb-4 text-[#4963c1]" />,
                title: "Developer Tools",
                description: "Comprehensive docs, SDKs, and client libraries."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 feature-card"
              >
                {feature.icon}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        id="how-it-works"
        className="py-16"
        ref={howItWorksRef}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Encodrive Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Implement secure file storage in just a few steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                description: "Create your Encodrive account and get your API keys"
              },
              {
                step: "2",
                title: "Install Package",
                description: "Add our npm package to your project"
              },
              {
                step: "3",
                title: "Initialize Client",
                description: "Configure with your API key and user encryption key"
              },
              {
                step: "4",
                title: "Upload Files",
                description: "Files are encrypted client-side before upload"
              }
            ].map((step, index) => (
              <div
                key={index}
                ref={el => { stepsRef.current[index] = el; }}
                className={`text-center transition-all duration-700 transform ${visibleSteps[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="w-16 h-16 bg-[#4963c1] text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section id="pricing" className="py-16 bg-gray-50" variants={sectionVariants}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pay only for what you use with our scalable pricing model
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Rs 0",
                description: "Perfect for testing and small projects",
                features: [
                  "1GB storage",
                  "10GB monthly bandwidth",
                  "Basic support",
                  "Up to 100 files/month"
                ],
                cta: "Get Started"
              },
              {
                name: "Pro",
                price: "Rs 399/Month",
                description: "For growing applications",
                features: [
                  "50GB storage",
                  "500GB monthly bandwidth",
                  "Priority support",
                  "Up to 10,000 files/month",
                  "Custom encryption keys"
                ],
                cta: "Start Free Trial",
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large-scale applications",
                features: [
                  "Unlimited storage",
                  "Unlimited bandwidth",
                  "24/7 dedicated support",
                  "SLA guarantees",
                  "On-premise options",
                  "Custom integrations"
                ],
                
                cta: "Contact Sales"
              }
            ].map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 pricing-card ${plan.popular ? "border-2 border-[#4963c1]" : ""}`}
              >
                {plan.popular && (
                  <div className="bg-[#4963c1] text-white text-center py-1 font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-4 text-[#4963c1]">{plan.price}</p>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={plan.name === "Enterprise" ? "/contact" : "/signin"}
                    className={`block text-center py-3 px-6 rounded-md font-medium ${plan.popular ? "bg-[#4963c1] hover:bg-[#3a52a8] text-white" : "bg-gray-100 hover:bg-gray-200 text-[#4963c1]"}`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="py-16 bg-[#4963c1] text-white" variants={sectionVariants}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Files?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of developers who trust Encodrive for their file encryption needs.
          </p>
          <a
            href="/signin"
            className="inline-block bg-white text-[#4963c1] hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-medium"
          >
            Start Free Trial
          </a>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HomePage;