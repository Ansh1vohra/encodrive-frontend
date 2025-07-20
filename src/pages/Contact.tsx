import React, { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4 text-[#4963c1] text-center">Contact Us</h1>
        <p className="text-gray-600 mb-8 text-center">Have questions or need support? Fill out the form below and our team will get back to you soon.</p>
        {submitted ? (
          <div className="text-center py-12">
            <div className="text-2xl mb-2 text-green-600 font-bold">Thank you!</div>
            <div className="text-gray-700">Your message has been received. We'll be in touch soon.</div>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4963c1]"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4963c1]"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4963c1]"
                rows={5}
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#4963c1] hover:bg-[#3a52a8] text-white py-3 rounded-md font-medium transition-colors"
            >
              Send Message
            </button>
          </form>
        )}
        <div className="mt-10 border-t pt-6 text-center text-gray-500 text-sm">
          <div>Email: <a href="mailto:support@encodrive.com" className="text-[#4963c1] hover:underline">support@encodrive.com</a></div>
          <div className="mt-1">Encodrive, India</div>
        </div>
      </div>
    </div>
  );
}