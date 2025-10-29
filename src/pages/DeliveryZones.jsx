import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const DeliveryZones = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const deliveryZones = {
    'Andhra Pradesh': {
      cities: {
        'Kadapa': {
          areas: ['Downtown Kadapa', 'Gandhi Nagar', 'Rajiv Nagar', 'Sri Ram Nagar', 'Vinayaka Nagar', 'All streets within city limits'],
          fee: 'Free delivery',
          time: '30-45 minutes'
        },
        'Hyderabad': {
          areas: ['Hitech City', 'Banjara Hills', 'Jubilee Hills', 'Secunderabad', 'Gachibowli', 'Kondapur', 'Madhapur', 'All major areas'],
          fee: '₹50 delivery fee',
          time: '45-60 minutes'
        },
        'Vijayawada': {
          areas: ['City Center', 'Benz Circle', 'Purna Rao Pet', 'All localities'],
          fee: '₹30 delivery fee',
          time: '35-50 minutes'
        },
        'Visakhapatnam': {
          areas: ['Beach Road', 'Dwaraka Nagar', 'MVP Colony', 'All areas'],
          fee: '₹40 delivery fee',
          time: '40-55 minutes'
        },
        'Guntur': {
          areas: ['Main City', 'Arundelpet', 'All streets'],
          fee: '₹25 delivery fee',
          time: '30-45 minutes'
        }
      }
    },
    'Telangana': {
      cities: {
        'Hyderabad': {
          areas: ['Hitech City', 'Banjara Hills', 'Jubilee Hills', 'Secunderabad', 'Gachibowli', 'Kondapur', 'Madhapur', 'All major areas'],
          fee: '₹50 delivery fee',
          time: '45-60 minutes'
        },
        'Warangal': {
          areas: ['City Center', 'Kazipet', 'All localities'],
          fee: '₹35 delivery fee',
          time: '35-50 minutes'
        },
        'Karimnagar': {
          areas: ['Main City', 'All streets'],
          fee: '₹30 delivery fee',
          time: '30-45 minutes'
        }
      }
    },
    'Tamil Nadu': {
      cities: {
        'Chennai': {
          areas: ['T Nagar', 'Anna Nagar', 'Adyar', 'Velachery', 'OMR', 'ECR', 'All major areas'],
          fee: '₹60 delivery fee',
          time: '50-70 minutes'
        },
        'Coimbatore': {
          areas: ['City Center', 'Race Course', 'RS Puram', 'All localities'],
          fee: '₹40 delivery fee',
          time: '35-50 minutes'
        },
        'Madurai': {
          areas: ['City Center', 'Anna Nagar', 'All streets'],
          fee: '₹35 delivery fee',
          time: '30-45 minutes'
        }
      }
    },
    'Karnataka': {
      cities: {
        'Bangalore': {
          areas: ['Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City', 'Marathahalli', 'All major areas'],
          fee: '₹55 delivery fee',
          time: '45-65 minutes'
        },
        'Mysore': {
          areas: ['City Center', 'Vijayanagar', 'All localities'],
          fee: '₹35 delivery fee',
          time: '35-50 minutes'
        },
        'Mangalore': {
          areas: ['City Center', 'All streets'],
          fee: '₹40 delivery fee',
          time: '35-50 minutes'
        }
      }
    },
    'Maharashtra': {
      cities: {
        'Mumbai': {
          areas: ['South Mumbai', 'Andheri', 'Bandra', 'Powai', 'Thane', 'Navi Mumbai', 'All major areas'],
          fee: '₹70 delivery fee',
          time: '60-80 minutes'
        },
        'Pune': {
          areas: ['Hinjewadi', 'Koregaon Park', 'Viman Nagar', 'All localities'],
          fee: '₹50 delivery fee',
          time: '40-60 minutes'
        },
        'Nagpur': {
          areas: ['City Center', 'All streets'],
          fee: '₹45 delivery fee',
          time: '35-50 minutes'
        }
      }
    },
    'Delhi': {
      cities: {
        'New Delhi': {
          areas: ['Connaught Place', 'South Delhi', 'Gurgaon', 'Noida', 'All major areas'],
          fee: '₹65 delivery fee',
          time: '50-70 minutes'
        },
        'Old Delhi': {
          areas: ['Chandni Chowk', 'All streets'],
          fee: '₹55 delivery fee',
          time: '45-60 minutes'
        }
      }
    },
    'West Bengal': {
      cities: {
        'Kolkata': {
          areas: ['Salt Lake', 'Park Street', 'Howrah', 'All major areas'],
          fee: '₹50 delivery fee',
          time: '45-65 minutes'
        },
        'Durgapur': {
          areas: ['City Center', 'All streets'],
          fee: '₹35 delivery fee',
          time: '30-45 minutes'
        }
      }
    },
    'Gujarat': {
      cities: {
        'Ahmedabad': {
          areas: ['Navrangpura', 'SG Highway', 'Vastrapur', 'All major areas'],
          fee: '₹45 delivery fee',
          time: '40-60 minutes'
        },
        'Surat': {
          areas: ['City Center', 'All streets'],
          fee: '₹40 delivery fee',
          time: '35-50 minutes'
        }
      }
    },
    'Rajasthan': {
      cities: {
        'Jaipur': {
          areas: ['City Center', 'Malviya Nagar', 'Vaishali Nagar', 'All localities'],
          fee: '₹45 delivery fee',
          time: '40-60 minutes'
        },
        'Jodhpur': {
          areas: ['City Center', 'All streets'],
          fee: '₹35 delivery fee',
          time: '30-45 minutes'
        }
      }
    },
    'Punjab': {
      cities: {
        'Chandigarh': {
          areas: ['Sector 17', 'Sector 35', 'All sectors'],
          fee: '₹40 delivery fee',
          time: '35-50 minutes'
        },
        'Amritsar': {
          areas: ['City Center', 'All streets'],
          fee: '₹35 delivery fee',
          time: '30-45 minutes'
        }
      }
    },
    'Other States': {
      cities: {
        'Pan India': {
          areas: ['We deliver to all major cities and towns across India', 'Contact us for availability in your area'],
          fee: 'Varies by location',
          time: 'Contact for details'
        }
      }
    }
  };

  const states = Object.keys(deliveryZones);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Delivery Zones Across India</h1>
          <p className="text-gray-600 mb-6">We deliver to cities, towns, and streets all over India</p>

          {/* State Selection */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Your State</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {states.map((state) => (
                <motion.button
                  key={state}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedState(state);
                    setSelectedCity(null);
                  }}
                  className={`p-3 rounded-lg font-medium transition-colors ${
                    selectedState === state
                      ? 'bg-restaurant-red text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {state}
                </motion.button>
              ))}
            </div>
          </div>

          {/* City Selection */}
          {selectedState && deliveryZones[selectedState] && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Cities in {selectedState}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Object.keys(deliveryZones[selectedState].cities).map((city) => (
                  <motion.button
                    key={city}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCity(city)}
                    className={`p-3 rounded-lg font-medium text-left transition-colors ${
                      selectedCity === city
                        ? 'bg-restaurant-red text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {city}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Delivery Details */}
          {selectedState && selectedCity && deliveryZones[selectedState]?.cities[selectedCity] && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-lg p-6 border-l-4 border-restaurant-red"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Delivery Information for {selectedCity}, {selectedState}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg text-gray-700 mb-2">Coverage Areas:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {deliveryZones[selectedState].cities[selectedCity].areas.map((area, index) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-700">Delivery Fee</p>
                    <p className="text-restaurant-red font-bold text-xl">
                      {deliveryZones[selectedState].cities[selectedCity].fee}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-700">Estimated Time</p>
                    <p className="text-restaurant-red font-bold text-xl">
                      {deliveryZones[selectedState].cities[selectedCity].time}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* General Information */}
          <div className="mt-8 bg-gradient-to-r from-restaurant-red to-red-600 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">📦 Pan India Delivery Available</h3>
            <p className="text-sm">
              We deliver to all major cities, towns, and streets across India. 
              For areas not listed above, please contact us to check delivery availability in your location.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DeliveryZones;


