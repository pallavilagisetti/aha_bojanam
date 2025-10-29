import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const cartCount = getCartCount();
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfileDropdown(false);
    setShowMobileMenu(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    if (showProfileDropdown || showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown, showMobileMenu]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Link to="/" className="text-2xl font-bold text-restaurant-red flex items-center gap-2">
              <span className="text-3xl">🍽️</span>
              Aha..Bojanam
            </Link>
          </motion.div>

          {/* Mobile Menu Button (3 dots) - Only visible on mobile */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-gray-700 hover:text-restaurant-red transition-colors p-2"
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </motion.button>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/menu"
              className="text-gray-700 hover:text-restaurant-red transition-colors font-medium"
            >
              Menu
            </Link>
            <Link
              to="/delivery-zones"
              className="text-gray-700 hover:text-restaurant-red transition-colors font-medium"
            >
              Delivery Zones
            </Link>
            <Link
              to="/service-hours"
              className="text-gray-700 hover:text-restaurant-red transition-colors font-medium"
            >
              Service Hours
            </Link>
            <Link
              to="/reservation"
              className="text-gray-700 hover:text-restaurant-red transition-colors font-medium"
            >
              Reservation
            </Link>
            <Link
              to="/feedback"
              className="text-gray-700 hover:text-restaurant-red transition-colors font-medium"
            >
              Feedback
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-restaurant-red transition-colors font-medium"
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-restaurant-red transition-colors font-medium flex items-center"
            >
              Cart Items
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 bg-restaurant-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
            {isAdmin && (
              <Link
                to="/admin/menu"
                className="text-gray-700 hover:text-restaurant-red transition-colors font-medium"
              >
                Manage Menu
              </Link>
            )}
          </div>

          {/* User Info / Sign In */}
          <div className="flex items-center space-x-4">
            {/* Mobile Cart Button */}
            <Link
              to="/cart"
              className="md:hidden relative text-gray-700 hover:text-restaurant-red"
            >
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-restaurant-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="relative w-10 h-10 rounded-full bg-restaurant-red text-white flex items-center justify-center hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-restaurant-red focus:ring-offset-2"
                  aria-label="User profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </motion.button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-500">Signed in as</p>
                        <p className="text-sm font-semibold text-gray-800 mt-1 truncate">
                          {user?.email}
                        </p>
                        {user?.name && (
                          <p className="text-xs text-gray-600 mt-1">{user.name}</p>
                        )}
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setShowProfileDropdown(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          View Profile
                        </Link>
                      </div>
                      <div className="border-t border-gray-200 py-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-restaurant-red text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Sign In
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Only visible on mobile */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            ref={mobileMenuRef}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-3 space-y-2">
              <Link
                to="/menu"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-gray-700 hover:text-restaurant-red transition-colors font-medium"
              >
                Menu
              </Link>
              <Link
                to="/delivery-zones"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-gray-700 hover:text-restaurant-red transition-colors font-medium"
              >
                Delivery Zones
              </Link>
              <Link
                to="/service-hours"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-gray-700 hover:text-restaurant-red transition-colors font-medium"
              >
                Service Hours
              </Link>
              <Link
                to="/reservation"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-gray-700 hover:text-restaurant-red transition-colors font-medium"
              >
                Reservation
              </Link>
              <Link
                to="/feedback"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-gray-700 hover:text-restaurant-red transition-colors font-medium"
              >
                Feedback
              </Link>
              <Link
                to="/contact"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-gray-700 hover:text-restaurant-red transition-colors font-medium"
              >
                Contact
              </Link>
              <Link
                to="/cart"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-gray-700 hover:text-restaurant-red transition-colors font-medium flex items-center"
              >
                Cart Items
                {cartCount > 0 && (
                  <span className="ml-2 bg-restaurant-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {isAdmin && (
                <Link
                  to="/admin/menu"
                  onClick={() => setShowMobileMenu(false)}
                  className="block py-2 text-gray-700 hover:text-restaurant-red transition-colors font-medium"
                >
                  Manage Menu
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
