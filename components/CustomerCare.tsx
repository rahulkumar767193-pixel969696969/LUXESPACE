
import React, { useState } from 'react';

const CustomerCare: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Customer Care</h1>
        <p className="text-lg text-gray-600">How can we help you create the perfect space?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <a href="mailto:support@aiinteriordesign.com" className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-indigo-300 transition-all group">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all text-indigo-600">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Email Us</p>
                  <p className="text-gray-800 font-medium">support@aiinteriordesign.com</p>
                </div>
              </a>

              <a href="tel:+18001234567" className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-indigo-300 transition-all group">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all text-green-600">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Call Us</p>
                  <p className="text-gray-800 font-medium">+1 (800) 123-4567</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Working Hours</p>
                  <p className="text-gray-800 font-medium">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Follow Our Journey</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-500 transition-all"><i className="fab fa-instagram"></i></a>
              <a href="#" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all"><i className="fab fa-x-twitter"></i></a>
              <a href="#" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-700 hover:border-blue-700 transition-all"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        {/* Support Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Report an Issue</h2>
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <i className="fas fa-check text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold">Message Sent!</h3>
              <p className="text-gray-500">Thank you for your feedback. Our team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input required type="email" placeholder="john@example.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Issue Category</label>
                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>Generation Issue</option>
                  <option>Image Upload Problem</option>
                  <option>Billing Question</option>
                  <option>Style Request</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea required rows={4} placeholder="Tell us more about what's happening..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg transition-all transform hover:-translate-y-1">
                Submit Report
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerCare;
