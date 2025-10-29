import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const ServiceHours = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Service Hours</h1>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold">Monday - Thursday</span>
              <span>11:00 AM - 10:00 PM</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold">Friday - Saturday</span>
              <span>11:00 AM - 11:00 PM</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold">Sunday</span>
              <span>12:00 PM - 9:00 PM</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceHours;


