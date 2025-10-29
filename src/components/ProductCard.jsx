import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product, onAddToCart }) => {
  const { isAuthenticated } = useAuth();
  const productId = product._id || product.id;
  const isAvailable = product.available !== false;
  const isHold = !isAvailable;
  
  const handleAddToCart = () => {
    if (isHold || !isAuthenticated) {
      return;
    }
    onAddToCart({ ...product, id: productId });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={isHold ? {} : { scale: 1.03, y: -5 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-shadow ${
        isHold ? 'opacity-60 grayscale' : 'hover:shadow-md'
      }`}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover ${isHold ? 'opacity-50' : ''}`}
        />
        <div className="absolute top-2 right-2 bg-restaurant-red text-white px-3 py-1 rounded-full text-sm font-bold">
          ₹{product.price.toFixed(2)}
        </div>
        {isHold && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-yellow-500 text-white px-6 py-2 rounded-full font-bold text-lg">
              HOLD
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className={`text-xl font-bold mb-2 ${isHold ? 'text-gray-500' : 'text-gray-800'}`}>
          {product.name}
        </h3>
        <p className={`text-sm mb-4 line-clamp-2 ${isHold ? 'text-gray-400' : 'text-gray-600'}`}>
          {product.description}
        </p>
        <motion.button
          whileHover={isHold ? {} : { scale: 1.05 }}
          whileTap={isHold ? {} : { scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={isHold || !isAuthenticated}
          className={`w-full py-2 rounded-lg font-semibold transition-colors ${
            isHold
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : !isAuthenticated
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-restaurant-red text-white hover:bg-red-700'
          }`}
        >
          {isHold ? 'Not Available' : !isAuthenticated ? 'Sign In to Order' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

