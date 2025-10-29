import React from 'react';
import { motion } from 'framer-motion';

const Sidebar = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <aside className="w-full md:w-64 bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
      <nav className="space-y-2">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCategory(category)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium ${
              selectedCategory === category
                ? 'bg-restaurant-red text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </nav>

      {/* Offer Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-gradient-to-r from-restaurant-red to-red-600 text-white p-4 rounded-lg shadow-lg"
      >
        <h3 className="font-bold text-lg mb-2">🎁 Special Offer!</h3>
        <p className="text-sm">Earn 10% Reward Points on every order</p>
      </motion.div>
    </aside>
  );
};

export default Sidebar;


