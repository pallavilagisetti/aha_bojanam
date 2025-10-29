import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { getProfile } from '../services/api';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h1>

          {isLoading ? (
            <div className="text-center py-8">Loading profile...</div>
          ) : (
            <div className="space-y-4">
              <div className="border-b pb-4">
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-lg text-gray-800 mt-1">{profile?.name || user?.name || 'N/A'}</p>
              </div>

              <div className="border-b pb-4">
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-lg text-gray-800 mt-1">{profile?.email || user?.email || 'N/A'}</p>
              </div>

              <div className="border-b pb-4">
                <label className="text-sm font-medium text-gray-500">Role</label>
                <p className="text-lg text-gray-800 mt-1 capitalize">
                  {profile?.role || user?.role || 'customer'}
                  {profile?.role === 'admin' && (
                    <span className="ml-2 text-xs bg-restaurant-red text-white px-2 py-1 rounded">
                      Admin
                    </span>
                  )}
                </p>
              </div>

              <div className="border-b pb-4">
                <label className="text-sm font-medium text-gray-500">Member Since</label>
                <p className="text-lg text-gray-800 mt-1">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>

              {/* Address Section (only for customers, not admin) */}
              {profile?.role !== 'admin' && (
                <>
                  <div className="border-b pb-4">
                    <label className="text-sm font-medium text-gray-500">Delivery Address</label>
                    <p className="text-lg text-gray-800 mt-1">
                      {profile?.address || 'No address added yet'}
                    </p>
                    {!profile?.address && (
                      <p className="text-xs text-gray-500 mt-1">
                        Add your address when placing an order
                      </p>
                    )}
                  </div>

                  {profile?.phone && (
                    <div className="border-b pb-4">
                      <label className="text-sm font-medium text-gray-500">Phone Number</label>
                      <p className="text-lg text-gray-800 mt-1">{profile.phone}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

