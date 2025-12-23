import React from "react";
import { motion } from "framer-motion";

interface LegalLayoutProps {
  title: string;
  updatedAt?: string;
  children: React.ReactNode;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({
  title,
  updatedAt,
  children,
}) => {
  return (
    <motion.div
      className="min-h-screen bg-white text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#4963c1] via-[#5f6ee6] to-[#7f53ac] py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          {updatedAt && (
            <p className="text-sm opacity-90">Last updated: {updatedAt}</p>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 prose prose-lg prose-slate">
          {children}
        </div>
      </section>
    </motion.div>
  );
};

export default LegalLayout;
