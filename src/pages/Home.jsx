import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import CartPanel from '../components/CartPanel';
import Chatbot from '../components/Chatbot';
import { useCart } from '../context/CartContext';
import { getMenuItems } from '../services/api';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuItems, setMenuItems] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cart, addToCart, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        const items = await getMenuItems();
        setMenuItems(items);
        
        // Extract unique categories
        const categories = [...new Set(items.map(item => item.category))];
        setMenuCategories(categories);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="w-full py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 px-4 sm:px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to Our Restaurant
          </h1>
          <p className="text-lg text-gray-600">
            Discover delicious food and place your order
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0 px-4 sm:px-6 lg:pl-6 lg:pr-6">
            <Sidebar
              categories={['All', ...menuCategories]}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:px-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-gray-600">Loading menu items...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 sm:px-6 lg:px-0">
                {filteredItems.map((item) => (
                  <ProductCard
                    key={item._id || item.id}
                    product={item}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cart Panel - Fixed to right edge */}
          <div className="lg:w-80 flex-shrink-0">
            <CartPanel
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          </div>
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

export default Home;
