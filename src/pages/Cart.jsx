import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { createOrder, getProfile } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, updateQuantity, removeItem, clearCart, getCartTotal } = useCart();
  const { isAuthenticated, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { subtotal, tax, total } = getCartTotal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (isAuthenticated && !isAdmin) {
      const fetchProfile = async () => {
        try {
          const data = await getProfile();
          setProfile(data);
          if (data.address) setDeliveryAddress(data.address);
          if (data.phone) setPhone(data.phone);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };
      fetchProfile();
    }
  }, [isAuthenticated, isAdmin]);

  const handleConfirmOrder = async () => {
    if (cart.length === 0) return;

    if (!isAuthenticated) {
      alert('Please sign in to place an order');
      return;
    }

    // Validate address for customers (not admin)
    if (!isAdmin && !deliveryAddress.trim()) {
      alert('Please enter your delivery address');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          menuItemId: item._id || item.id,
          quantity: item.quantity
        })),
        deliveryAddress: isAdmin ? '' : deliveryAddress.trim(),
        phone: isAdmin ? '' : phone.trim()
      };

      const result = await createOrder(orderData);
      alert(`Order confirmed! Order ID: ${result.order._id}\nTotal: ₹${total.toFixed(2)}\nThank you for your order!`);
      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Order error:', error);
      alert(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Cart</h1>
          <p className="text-lg text-gray-600">
            {cart.length === 0
              ? 'Your cart is empty'
              : `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`}
          </p>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-lg p-12 text-center"
          >
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Start adding items to your cart to place an order
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/menu')}
              className="bg-restaurant-red text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
            >
              Browse Menu
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <p className="text-restaurant-red font-bold text-lg">
                      ₹{item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 font-bold flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-800">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 font-bold text-xl px-2"
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearCart}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                Clear Cart
              </motion.button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-restaurant-red">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {!isAuthenticated && (
                  <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                    Please sign in to place an order
                  </div>
                )}

                {/* Delivery Address Form (only for customers, not admin) */}
                {isAuthenticated && !isAdmin && (
                  <div className="mb-4 space-y-3">
                    <div>
                      <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="deliveryAddress"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        required
                        rows="3"
                        placeholder="Enter your complete delivery address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-red"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-red"
                      />
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting || !isAuthenticated || (!isAdmin && !deliveryAddress.trim())}
                  className="w-full bg-restaurant-red text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-md mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Order'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/menu')}
                  className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                >
                  Continue Shopping
                </motion.button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
