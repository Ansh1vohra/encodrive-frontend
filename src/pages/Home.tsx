import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaLock,
  FaShieldAlt,
  FaCode,
  FaPlug,
  FaServer,
  FaChartLine,
  FaRegCopy,
} from "react-icons/fa";

import PricingComp from "../components/PricingComp";
/**
 * Encodrive HomePage (TypeScript + React)
 * - Fixed IntersectionObserver usage (safe on SSR)
 * - Clipboard fallback if navigator.clipboard unavailable
 * - Proper typing for refs & state
 * - Keeps original visual structure but with small improvements
 */

const HomePage: React.FC = () => {
  // Code sample string
  const codeString = `import { Encodrive } from 'encodrive-client';

const drive = new Encodrive({
  apiKey: 'YOUR_API_KEY',
  encryptionKey: 'USER_PROVIDED_KEY'
});

// Encrypt and upload
await drive.uploadFile(file);`;

  // Copy-to-clipboard
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(codeString);
      } else {
        // fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = codeString;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore copy errors silently
      setCopied(false);
    }
  };

  // Refs and intersection observer for steps
  const stepsRef = useRef<Array<HTMLDivElement | null>>(Array(4).fill(null));
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(
    Array(4).fill(false)
  );

  useEffect(() => {
    // Guard for environments without IntersectionObserver (SSR or old browsers)
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      // If IO is not available, show all steps
      setVisibleSteps(Array(4).fill(true));
      return;
    }

    const observers: IntersectionObserver[] = [];

    stepsRef.current.forEach((el, idx) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Scroll to How It Works
  const howItWorksRef = useRef<HTMLDivElement | null>(null);
  const handleScrollToHowItWorks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Animation variants (framer-motion)
  const pageVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
    exit: { opacity: 0 },
  };
  const sectionVariants: any = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  // New variants for improved page animations
  const staggerContainer: any = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const fadeInUpItem: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      className="font-sans antialiased text-gray-800 bg-white"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
    >
      {/* HERO */}
      <motion.section
        className="bg-gradient-to-br from-[#4963c1] via-[#5f6ee6] to-[#7f53ac] text-white py-12 md:py-24 relative overflow-hidden"
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-0">
            {/* Left: Text */}
            <motion.div className="w-full md:w-1/2 mt-8 md:mt-0" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <motion.h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight" variants={fadeInUpItem}>
                End-to-End File Encryption Made Simple
              </motion.h1>
              <motion.p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 opacity-90" variants={fadeInUpItem}>
                Secure your files with our developer-friendly solution. Install our npm package, encrypt client-side, and upload securely to AWS S3.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:space-x-4 w-full" variants={fadeInUpItem}>
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
              </motion.div>
            </motion.div>

            {/* Right: Code Block */}
            <div className="w-full md:w-1/2 flex justify-center">
              <motion.div
                className="bg-white/20 p-4 sm:p-6 rounded-xl backdrop-blur-sm w-full max-w-md"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="bg-white text-gray-800 p-4 sm:p-6 rounded-lg shadow-lg relative">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <span className="bg-[#4963c1] text-white p-2 rounded-md mr-3">
                      <FaCode />
                    </span>
                    <h3 className="font-mono font-bold text-sm sm:text-base">npm install encodrive</h3>
                  </div>

                  <div className="relative">
                    <pre
                      className="bg-gray-100 p-3 sm:p-4 rounded-md overflow-x-auto text-xs sm:text-sm pr-10 select-all whitespace-pre-wrap break-words max-w-full"
                      aria-label="Code example"
                    >
                      {codeString}
                    </pre>

                    <button
                      onClick={handleCopy}
                      className="absolute top-2 right-2 text-gray-500 hover:text-[#4963c1] focus:outline-none"
                      aria-label="Copy code"
                      title="Copy code"
                    >
                      <FaRegCopy size={20} />
                    </button>

                    {copied && (
                      <span className="absolute top-2 right-10 bg-white text-[#4963c1] px-2 py-1 rounded shadow text-xs font-semibold">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FEATURES */}
      <motion.section id="features" className="py-16 bg-gray-50" variants={sectionVariants}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Developer-First Encryption</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built by developers, for developers — focus on your app, we'll handle the security.
            </p>
          </div>

          <motion.div className="grid md:grid-cols-3 gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {[
              {
                icon: <FaLock className="text-3xl mb-4 text-[#4963c1]" />,
                title: "End-to-End Encryption",
                description: "Files are encrypted before leaving the client. Only you hold the keys.",
              },
              {
                icon: <FaShieldAlt className="text-3xl mb-4 text-[#4963c1]" />,
                title: "Secure Storage",
                description: "Encrypted files stored on AWS S3 with strict access controls.",
              },
              {
                icon: <FaPlug className="text-3xl mb-4 text-[#4963c1]" />,
                title: "Simple Integration",
                description: "Install our npm package and add a few lines of code.",
              },
              {
                icon: <FaServer className="text-3xl mb-4 text-[#4963c1]" />,
                title: "Scalable Infrastructure",
                description: "Built on AWS to handle your growth without changing code.",
              },
              {
                icon: <FaChartLine className="text-3xl mb-4 text-[#4963c1]" />,
                title: "Performance Optimized",
                description: "Fast encryption algorithms with minimal overhead.",
              },
              {
                icon: <FaCode className="text-3xl mb-4 text-[#4963c1]" />,
                title: "Developer Tools",
                description: "Comprehensive docs, SDKs, and client libraries.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 feature-card hover:shadow-xl transform hover:-translate-y-1"
                variants={fadeInUpItem}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
              >
                {feature.icon}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* HOW IT WORKS */}
      <motion.section id="how-it-works" className="py-16" ref={howItWorksRef} variants={sectionVariants}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Encodrive Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Implement secure file storage in just a few steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Sign Up", description: "Create your Encodrive account and get your API keys" },
              { step: "2", title: "Install Package", description: "Add our npm package to your project" },
              { step: "3", title: "Initialize Client", description: "Configure with your API key and user encryption key" },
              { step: "4", title: "Upload Files", description: "Files are encrypted client-side before upload" },
            ].map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  stepsRef.current[index] = el;
                }}
                className={`text-center transition-all duration-700 transform ${
                  visibleSteps[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                  <div className="w-16 h-16 bg-[#4963c1] text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <PricingComp />

      {/* CTA */}
      <motion.section className="py-16 bg-[#4963c1] text-white" variants={sectionVariants}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Files?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">Join thousands of developers who trust Encodrive for their file encryption needs.</p>
          <a href="/signin" className="inline-block bg-white text-[#4963c1] hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-medium">Start Free Trial</a>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HomePage;
