import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-700 mb-1">Phone</p>
                  <a 
                    href="tel:8688948354" 
                    className="text-restaurant-red hover:underline font-medium text-lg"
                  >
                    +91 8688948354
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-1">Email</p>
                  <a 
                    href="mailto:lagisettipallavi607@gmail.com" 
                    className="text-restaurant-red hover:underline font-medium"
                  >
                    lagisettipallavi607@gmail.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-1">Address</p>
                  <p className="text-gray-600">
                    Kadapa,<br />
                    Andhra Pradesh,<br />
                    India
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="space-y-2">
                <a href="#" className="block text-restaurant-red hover:underline">Facebook</a>
                <a href="#" className="block text-restaurant-red hover:underline">Instagram</a>
                <a href="#" className="block text-restaurant-red hover:underline">Twitter</a>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Business Hours</h4>
                <p className="text-sm text-gray-600">
                  Monday - Sunday: 11:00 AM - 11:00 PM
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

