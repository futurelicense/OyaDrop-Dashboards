import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  Star,
  MapPin,
  Clock,
  Award,
  Heart,
  Filter,
  Calendar,
  CheckCircle,
  X,
  Phone,
  MessageCircle } from
'lucide-react';
interface BeautyProvider {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  distance: string;
  specialties: string[];
  verified: boolean;
  available: boolean;
  priceRange: '₦' | '₦₦' | '₦₦₦';
  nextAvailable: string;
}
interface Service {
  id: string;
  name: string;
  icon: string;
  duration: string;
  price: number;
  description: string;
}
const mockProviders: BeautyProvider[] = [
{
  id: '1',
  name: 'Glam Studio',
  image:
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop',
  rating: 4.9,
  reviews: 234,
  distance: '1.2 km',
  specialties: ['Braids', 'Weaving', 'Makeup'],
  verified: true,
  available: true,
  priceRange: '₦₦',
  nextAvailable: 'Today at 2:00 PM'
},
{
  id: '2',
  name: 'Royal Touch Salon',
  image:
  'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop',
  rating: 4.8,
  reviews: 189,
  distance: '2.5 km',
  specialties: ['Dreadlocks', 'Hair Coloring', 'Styling'],
  verified: true,
  available: true,
  priceRange: '₦₦₦',
  nextAvailable: 'Tomorrow at 10:00 AM'
},
{
  id: '3',
  name: 'Beauty Haven',
  image:
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=400&fit=crop',
  rating: 4.7,
  reviews: 156,
  distance: '3.1 km',
  specialties: ['Nails', 'Facial', 'Massage'],
  verified: true,
  available: false,
  priceRange: '₦₦',
  nextAvailable: 'Today at 5:00 PM'
},
{
  id: '4',
  name: 'Elite Cuts & Styles',
  image:
  'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400&h=400&fit=crop',
  rating: 4.9,
  reviews: 312,
  distance: '0.8 km',
  specialties: ['Haircut', 'Braids', 'Weaving'],
  verified: true,
  available: true,
  priceRange: '₦₦',
  nextAvailable: 'Today at 1:00 PM'
}];

const beautyServices: Service[] = [
{
  id: 'haircut',
  name: 'Haircut',
  icon: '✂️',
  duration: '45 min',
  price: 3000,
  description: 'Professional haircut and styling'
},
{
  id: 'braids',
  name: 'Braids',
  icon: '🎀',
  duration: '3-4 hrs',
  price: 8000,
  description: 'Various braiding styles'
},
{
  id: 'dreadlocks',
  name: 'Dreadlocks',
  icon: '🌀',
  duration: '4-5 hrs',
  price: 15000,
  description: 'Dreadlock installation or maintenance'
},
{
  id: 'weaving',
  name: 'Weaving',
  icon: '💫',
  duration: '2-3 hrs',
  price: 12000,
  description: 'Hair weaving and extensions'
},
{
  id: 'coloring',
  name: 'Hair Coloring',
  icon: '🎨',
  duration: '2 hrs',
  price: 10000,
  description: 'Professional hair coloring'
},
{
  id: 'styling',
  name: 'Hair Styling',
  icon: '💇',
  duration: '1 hr',
  price: 5000,
  description: 'Special occasion styling'
},
{
  id: 'manicure',
  name: 'Manicure',
  icon: '💅',
  duration: '45 min',
  price: 3500,
  description: 'Nail care and polish'
},
{
  id: 'pedicure',
  name: 'Pedicure',
  icon: '🦶',
  duration: '1 hr',
  price: 4000,
  description: 'Foot care and polish'
},
{
  id: 'facial',
  name: 'Facial',
  icon: '✨',
  duration: '1 hr',
  price: 6000,
  description: 'Deep cleansing facial treatment'
},
{
  id: 'makeup',
  name: 'Makeup',
  icon: '💄',
  duration: '1 hr',
  price: 8000,
  description: 'Professional makeup application'
},
{
  id: 'massage',
  name: 'Massage',
  icon: '💆',
  duration: '1 hr',
  price: 7000,
  description: 'Relaxing body massage'
},
{
  id: 'waxing',
  name: 'Waxing',
  icon: '🌟',
  duration: '30 min',
  price: 4500,
  description: 'Hair removal service'
}];

interface BeautyCustomerPageProps {
  onBack: () => void;
  initialRequest?: any;
}
export function BeautyCustomerPage({
  onBack,
  initialRequest
}: BeautyCustomerPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] =
  useState<BeautyProvider | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('today');
  const [selectedTime, setSelectedTime] = useState<string>('morning');
  const [showBooking, setShowBooking] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const filteredProviders = mockProviders.filter(
    (provider) =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.specialties.some((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const toggleService = (service: Service) => {
    setSelectedServices((prev) =>
    prev.find((s) => s.id === service.id) ?
    prev.filter((s) => s.id !== service.id) :
    [...prev, service]
    );
  };
  const totalPrice = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0
  );
  const totalDuration = selectedServices.reduce((sum, service) => {
    const hours = parseInt(service.duration);
    return sum + (isNaN(hours) ? 1 : hours);
  }, 0);
  const handleBookAppointment = () => {
    setShowBooking(false);
    setShowConfirmation(true);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0A0E1A]/95 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <motion.button
              className="p-2 rounded-xl hover:bg-white/5 transition-colors"
              onClick={onBack}
              whileTap={{
                scale: 0.95
              }}>

              <ArrowLeft className="w-6 h-6 text-white" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold text-white">Beauty Services</h1>
              <p className="text-xs text-gray-400">Find the perfect provider</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search salons, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#131B2E] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-orange-500/50 focus:outline-none placeholder:text-gray-500" />

          </div>
        </div>
      </div>

      {/* Providers List */}
      <div className="p-4 space-y-3 pb-24">
        {filteredProviders.map((provider, index) =>
        <motion.div
          key={provider.id}
          className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl overflow-hidden border border-white/10"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: index * 0.05
          }}
          onClick={() => setSelectedProvider(provider)}>

            <div className="flex gap-4 p-4">
              {/* Image */}
              <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img
                src={provider.image}
                alt={provider.name}
                className="w-full h-full object-cover" />

                {provider.verified &&
              <div className="absolute top-2 right-2 bg-orange-500 rounded-full p-1">
                    <Award className="w-3 h-3 text-white" />
                  </div>
              }
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">
                      {provider.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-white">
                          {provider.rating}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({provider.reviews})
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">
                        {provider.priceRange}
                      </span>
                    </div>
                  </div>
                  <motion.button
                  className="p-2 rounded-xl hover:bg-white/5"
                  whileTap={{
                    scale: 0.9
                  }}>

                    <Heart className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {provider.specialties.slice(0, 3).map((specialty) =>
                <span
                  key={specialty}
                  className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-lg">

                      {specialty}
                    </span>
                )}
                </div>

                {/* Location & Availability */}
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{provider.distance}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span
                    className={
                    provider.available ?
                    'text-green-400' :
                    'text-orange-400'
                    }>

                      {provider.nextAvailable}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Provider Details Sheet */}
      <AnimatePresence>
        {selectedProvider &&
        <>
            <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            onClick={() => setSelectedProvider(null)} />

            <motion.div
            className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl max-h-[85vh] flex flex-col"
            initial={{
              y: '100%'
            }}
            animate={{
              y: 0
            }}
            exit={{
              y: '100%'
            }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300
            }}>

              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-600 rounded-full" />
              </div>

              {/* Provider Header */}
              <div className="px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <img
                  src={selectedProvider.image}
                  alt={selectedProvider.name}
                  className="w-16 h-16 rounded-xl object-cover" />

                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-1">
                      {selectedProvider.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-white">
                        {selectedProvider.rating}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({selectedProvider.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <motion.button
                  className="p-2 rounded-xl hover:bg-white/5"
                  onClick={() => setSelectedProvider(null)}
                  whileTap={{
                    scale: 0.95
                  }}>

                    <X className="w-6 h-6 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Services Selection */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Select Services
                </h3>
                <div className="space-y-3">
                  {beautyServices.map((service) => {
                  const isSelected = selectedServices.find(
                    (s) => s.id === service.id
                  );
                  return (
                    <motion.button
                      key={service.id}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${isSelected ? 'bg-orange-500/20 border-orange-500' : 'bg-[#0A0E1A]/50 border-white/10'}`}
                      onClick={() => toggleService(service)}
                      whileTap={{
                        scale: 0.98
                      }}>

                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{service.icon}</div>
                          <div className="flex-1">
                            <h4
                            className={`text-sm font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-300'}`}>

                              {service.name}
                            </h4>
                            <p className="text-xs text-gray-400 mb-2">
                              {service.description}
                            </p>
                            <div className="flex items-center gap-3 text-xs">
                              <span
                              className={
                              isSelected ?
                              'text-orange-400' :
                              'text-gray-400'
                              }>

                                {service.duration}
                              </span>
                              <span className="text-gray-500">•</span>
                              <span
                              className={`font-bold ${isSelected ? 'text-orange-400' : 'text-gray-400'}`}>

                                ₦{service.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          {isSelected &&
                        <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                        }
                        </div>
                      </motion.button>);

                })}
                </div>
              </div>

              {/* Footer */}
              {selectedServices.length > 0 &&
            <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A] space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {selectedServices.length} service
                      {selectedServices.length > 1 ? 's' : ''} • ~
                      {totalDuration} hrs
                    </span>
                    <span className="text-xl font-bold text-orange-400">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <motion.button
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl text-white font-bold shadow-lg"
                onClick={() => {
                  setSelectedProvider(null);
                  setShowBooking(true);
                }}
                whileTap={{
                  scale: 0.98
                }}>

                    Continue to Booking
                  </motion.button>
                </div>
            }
            </motion.div>
          </>
        }
      </AnimatePresence>

      {/* Booking Sheet */}
      <AnimatePresence>
        {showBooking &&
        <>
            <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            onClick={() => setShowBooking(false)} />

            <motion.div
            className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl max-h-[85vh] flex flex-col"
            initial={{
              y: '100%'
            }}
            animate={{
              y: 0
            }}
            exit={{
              y: '100%'
            }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300
            }}>

              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-600 rounded-full" />
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">
                  Book Appointment
                </h2>
                <motion.button
                className="p-2 rounded-xl hover:bg-white/5"
                onClick={() => setShowBooking(false)}
                whileTap={{
                  scale: 0.95
                }}>

                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-3 block">
                    Select Date
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['today', 'tomorrow', 'later'].map((date) =>
                  <motion.button
                    key={date}
                    className={`p-3 rounded-xl border-2 transition-all ${selectedDate === date ? 'bg-orange-500/20 border-orange-500' : 'bg-[#0A0E1A] border-white/10'}`}
                    onClick={() => setSelectedDate(date)}
                    whileTap={{
                      scale: 0.98
                    }}>

                        <Calendar
                      className={`w-5 h-5 mx-auto mb-1 ${selectedDate === date ? 'text-orange-400' : 'text-gray-400'}`} />

                        <p
                      className={`text-xs font-semibold capitalize ${selectedDate === date ? 'text-white' : 'text-gray-400'}`}>

                          {date}
                        </p>
                      </motion.button>
                  )}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-3 block">
                    Preferred Time
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                  {
                    value: 'morning',
                    label: 'Morning',
                    time: '8-12'
                  },
                  {
                    value: 'afternoon',
                    label: 'Afternoon',
                    time: '12-5'
                  },
                  {
                    value: 'evening',
                    label: 'Evening',
                    time: '5-8'
                  }].
                  map((time) =>
                  <motion.button
                    key={time.value}
                    className={`p-3 rounded-xl border-2 transition-all ${selectedTime === time.value ? 'bg-orange-500/20 border-orange-500' : 'bg-[#0A0E1A] border-white/10'}`}
                    onClick={() => setSelectedTime(time.value)}
                    whileTap={{
                      scale: 0.98
                    }}>

                        <Clock
                      className={`w-5 h-5 mx-auto mb-1 ${selectedTime === time.value ? 'text-orange-400' : 'text-gray-400'}`} />

                        <p
                      className={`text-xs font-semibold ${selectedTime === time.value ? 'text-white' : 'text-gray-400'}`}>

                          {time.label}
                        </p>
                        <p className="text-[10px] text-gray-500">{time.time}</p>
                      </motion.button>
                  )}
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                  <p className="text-sm font-bold text-orange-400 mb-3">
                    Booking Summary
                  </p>
                  <div className="space-y-2">
                    {selectedServices.map((service) =>
                  <div
                    key={service.id}
                    className="flex justify-between text-sm">

                        <span className="text-gray-300">
                          {service.icon} {service.name}
                        </span>
                        <span className="text-white">
                          ₦{service.price.toLocaleString()}
                        </span>
                      </div>
                  )}
                    <div className="pt-2 border-t border-orange-500/30 flex justify-between">
                      <span className="font-bold text-white">Total</span>
                      <span className="font-bold text-orange-400">
                        ₦{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A]">
                <motion.button
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl text-white font-bold shadow-lg"
                onClick={handleBookAppointment}
                whileTap={{
                  scale: 0.98
                }}>

                  Confirm Booking
                </motion.button>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>

      {/* Confirmation Sheet */}
      <AnimatePresence>
        {showConfirmation &&
        <>
            <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }} />

            <motion.div
            className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl max-h-[70vh] flex flex-col"
            initial={{
              y: '100%'
            }}
            animate={{
              y: 0
            }}
            exit={{
              y: '100%'
            }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300
            }}>

              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-600 rounded-full" />
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center justify-center text-center">
                <motion.div
                className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center mb-6"
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: 1
                }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  delay: 0.1
                }}>

                  <CheckCircle className="w-12 h-12 text-orange-400" />
                </motion.div>

                <motion.h3
                className="text-2xl font-bold text-white mb-3"
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.2
                }}>

                  Booking Confirmed!
                </motion.h3>

                <motion.p
                className="text-gray-400 mb-8 max-w-sm"
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.3
                }}>

                  Your appointment has been confirmed. The provider will contact
                  you shortly to confirm the exact time.
                </motion.p>

                <motion.div
                className="w-full space-y-3"
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.4
                }}>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                    className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold"
                    whileTap={{
                      scale: 0.98
                    }}>

                      <Phone className="w-4 h-4" />
                      Call
                    </motion.button>
                    <motion.button
                    className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold"
                    whileTap={{
                      scale: 0.98
                    }}>

                      <MessageCircle className="w-4 h-4" />
                      Message
                    </motion.button>
                  </div>
                  <motion.button
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl text-white font-bold shadow-lg"
                  onClick={onBack}
                  whileTap={{
                    scale: 0.98
                  }}>

                    Back to Home
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}