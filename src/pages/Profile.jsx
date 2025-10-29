import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { getProfile, getReservations } from '../services/api';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReservations, setIsLoadingReservations] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch profile first
        const profileData = await getProfile();
        setProfile(profileData);
        
        // Then fetch reservations (only for customers, not admin)
        if (profileData?.role !== 'admin') {
          try {
            const reservationsData = await getReservations();
            setReservations(reservationsData || []);
          } catch (error) {
            console.error('Error fetching reservations:', error);
            setReservations([]);
          }
        } else {
          setIsLoadingReservations(false);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
        setIsLoadingReservations(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-6"
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

        {/* Reservations Section (only for customers, not admin) */}
        {profile?.role !== 'admin' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Reservations</h2>

            {isLoadingReservations ? (
              <div className="text-center py-8">Loading reservations...</div>
            ) : reservations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-gray-600 text-lg">No reservations yet</p>
                <p className="text-gray-500 text-sm mt-2">
                  Make a reservation to see it here
                </p>
                <button
                  onClick={() => navigate('/reservation')}
                  className="mt-4 bg-restaurant-red text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Make a Reservation
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reservations.map((reservation) => (
                  <motion.div
                    key={reservation._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border-2 border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          Reservation #{reservation._id.slice(-6).toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatDate(reservation.date)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(reservation.status)}`}>
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-gray-700">
                        <span className="font-medium w-20">Time:</span>
                        <span>{reservation.time}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="font-medium w-20">Guests:</span>
                        <span>{reservation.guests} {reservation.guests === 1 ? 'guest' : 'guests'}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="font-medium w-20">Name:</span>
                        <span>{reservation.name}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="font-medium w-20">Email:</span>
                        <span className="text-sm">{reservation.email}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="font-medium w-20">Phone:</span>
                        <span>{reservation.phone}</span>
                      </div>
                      {reservation.specialRequests && (
                        <div className="pt-2 border-t border-gray-200">
                          <span className="font-medium text-gray-700 block mb-1">Special Requests:</span>
                          <p className="text-sm text-gray-600 italic">{reservation.specialRequests}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;

