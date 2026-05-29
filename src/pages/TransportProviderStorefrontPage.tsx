import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Star,
  MessageCircle,
  Phone,
  Share2,
  CheckCircle,
  Clock,
  X,
  Sparkles,
  Check,
  Navigation,
  Car,
  Package,
  Plane,
  Briefcase,
  ShieldCheck,
  Calendar,
  Users } from
'lucide-react';
interface RideOption {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  icon: any;
}
const mockRides: RideOption[] = [
{
  id: 'r1',
  name: 'City Ride',
  price: 'From ₦2,500',
  duration: '15-45 min',
  description: 'Within Lagos. Pay per trip, no surge.',
  icon: Car
},
{
  id: 'r2',
  name: 'Airport Run',
  price: '₦12,000 fixed',
  duration: '60-90 min',
  description: 'To/from Murtala Muhammed Int\u2019l Airport.',
  icon: Plane
},
{
  id: 'r3',
  name: 'Full-Day Hire',
  price: '₦35,000/day',
  duration: '8 hours',
  description: 'Dedicated driver for events, business, errands.',
  icon: Briefcase
},
{
  id: 'r4',
  name: 'Package Delivery',
  price: 'From ₦1,500',
  duration: '30-60 min',
  description: 'Same-day parcel delivery across Lagos.',
  icon: Package
},
{
  id: 'r5',
  name: 'Inter-State Trip',
  price: 'From ₦45,000',
  duration: 'Half/full day',
  description: 'Ibadan, Abeokuta, Benin and more.',
  icon: Navigation
}];

const mockReviews = [
{
  id: 1,
  name: 'Folake S.',
  rating: 5,
  date: '2 days ago',
  text: 'Tunde is punctual, polite, and drives safely. My go-to driver now.',
  image:
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
},
{
  id: 2,
  name: 'Emeka O.',
  rating: 5,
  date: '5 days ago',
  text: 'Airport pickup was seamless. He was waiting before I even landed.',
  image:
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
},
{
  id: 3,
  name: 'Ngozi A.',
  rating: 5,
  date: '1 week ago',
  text: 'Hired him for a full day for client meetings. Very professional.',
  image:
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop'
},
{
  id: 4,
  name: 'Kunle T.',
  rating: 4,
  date: '2 weeks ago',
  text: 'Smooth ride and clean car. Will book again.',
  image:
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
}];

const vehiclePhotos = [
'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=400&fit=crop',
'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=400&fit=crop',
'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop',
'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=400&fit=crop'];

interface TransportProviderStorefrontPageProps {
  onBack: () => void;
}
export function TransportProviderStorefrontPage({
  onBack
}: TransportProviderStorefrontPageProps) {
  const [selectedRide, setSelectedRide] = useState<RideOption | null>(null);
  const [bookingStep, setBookingStep] = useState(0);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [tripDate, setTripDate] = useState('today');
  const [tripTime, setTripTime] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const handleShare = () => {
    navigator.clipboard?.writeText('https://oyadrop.com/driver/tunderides');
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };
  const bookingRef = `OYA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white font-sans">
      {/* Branded Header */}
      <div className="sticky top-0 z-40 bg-[#0A0E1A]/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <motion.button
          onClick={onBack}
          className="p-2 bg-white/5 rounded-full hover:bg-white/10"
          whileTap={{
            scale: 0.95
          }}>
          
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-xs font-semibold text-gray-400">
            Powered by OyaDrop
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative">
        <div className="h-48 w-full bg-gray-800">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=400&fit=crop"
            alt="Vehicle"
            className="w-full h-full object-cover opacity-80" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] to-transparent" />
        </div>
        <div className="px-4 -mt-16 relative z-10">
          <div className="flex justify-between items-end mb-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                alt="Tunde"
                className="w-24 h-24 rounded-full border-4 border-[#0A0E1A] object-cover" />
              
              <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#0A0E1A]" />
            </div>
            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available Now
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">Tunde's Rides</h1>
            <ShieldCheck className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-gray-400 text-sm mb-3">
            Reliable driver • 5+ years experience • All of Lagos
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold">4.9</span>
              <span className="text-gray-500">(326 trips)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>Lagos Mainland & Island</span>
            </div>
          </div>

          {/* Vehicle Info Card */}
          <div className="bg-[#131B2E] rounded-xl p-4 border border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Car className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">
                  Toyota Camry 2019
                </p>
                <p className="text-xs text-gray-400">
                  Silver • Plate: LAG-234-XY • 4 seats • AC
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            <motion.button
              whileTap={{
                scale: 0.95
              }}
              className="flex flex-col items-center gap-2">
              
              <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <span className="text-xs text-gray-400">WhatsApp</span>
            </motion.button>
            <motion.button
              whileTap={{
                scale: 0.95
              }}
              className="flex flex-col items-center gap-2">
              
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-xs text-gray-400">Chat</span>
            </motion.button>
            <motion.button
              whileTap={{
                scale: 0.95
              }}
              className="flex flex-col items-center gap-2">
              
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-400">Call</span>
            </motion.button>
            <motion.button
              whileTap={{
                scale: 0.95
              }}
              onClick={handleShare}
              className="flex flex-col items-center gap-2">
              
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                {linkCopied ?
                <Check className="w-5 h-5 text-green-400" /> :

                <Share2 className="w-5 h-5 text-white" />
                }
              </div>
              <span className="text-xs text-gray-400">
                {linkCopied ? 'Copied!' : 'Share'}
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Vehicle Gallery */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold mb-3">My Vehicle</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {vehiclePhotos.map((p, i) =>
          <motion.div
            key={i}
            className="flex-shrink-0 w-40 h-32 rounded-xl overflow-hidden"
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: i * 0.05
            }}>
            
              <img
              src={p}
              alt={`Vehicle ${i + 1}`}
              className="w-full h-full object-cover" />
            
            </motion.div>
          )}
        </div>
      </div>

      {/* Services */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold mb-4">Services & Rates</h2>
        <div className="space-y-2">
          {mockRides.map((ride, index) => {
            const Icon = ride.icon;
            const isSelected = selectedRide?.id === ride.id;
            return (
              <motion.button
                key={ride.id}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${isSelected ? 'bg-yellow-500/15 border-yellow-500' : 'bg-[#131B2E] border-white/10'}`}
                onClick={() => setSelectedRide(ride)}
                whileTap={{
                  scale: 0.98
                }}
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.03
                }}>
                
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-yellow-500/30' : 'bg-white/5'}`}>
                    
                    <Icon
                      className={`w-6 h-6 ${isSelected ? 'text-yellow-400' : 'text-gray-400'}`} />
                    
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white">
                        {ride.name}
                      </h4>
                      {isSelected &&
                      <CheckCircle className="w-4 h-4 text-yellow-400" />
                      }
                    </div>
                    <p className="text-xs text-gray-400 mb-1">
                      {ride.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ride.duration}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${isSelected ? 'text-yellow-400' : 'text-gray-300'}`}>
                      
                      {ride.price}
                    </p>
                  </div>
                </div>
              </motion.button>);

          })}
        </div>
      </div>

      {/* Reviews */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Rider Reviews</h2>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold">4.9</span>
            <span className="text-xs text-gray-500">(326)</span>
          </div>
        </div>
        <div className="space-y-3">
          {mockReviews.map((r, i) =>
          <motion.div
            key={r.id}
            className="bg-[#131B2E] rounded-xl p-4 border border-white/10"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: i * 0.05
            }}>
            
              <div className="flex items-center gap-3 mb-2">
                <img
                src={r.image}
                alt={r.name}
                className="w-8 h-8 rounded-full object-cover" />
              
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.date}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({
                  length: r.rating
                }).map((_, idx) =>
                <Star
                  key={idx}
                  className="w-3 h-3 text-yellow-500 fill-yellow-500" />

                )}
                </div>
              </div>
              <p className="text-sm text-gray-300">{r.text}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Coverage */}
      <div className="px-4 mb-32">
        <h2 className="text-lg font-bold mb-3">Coverage Area</h2>
        <div className="bg-[#131B2E] rounded-xl p-4 border border-white/10">
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white">
                All of Lagos State
              </p>
              <p className="text-xs text-gray-400">
                Available daily, 6:00 AM - 11:00 PM
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Inter-state on request
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <AnimatePresence>
        {selectedRide && bookingStep === 0 &&
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-30 bg-[#0A0E1A]/95 backdrop-blur-lg border-t border-white/10 p-4"
          initial={{
            y: 100
          }}
          animate={{
            y: 0
          }}
          exit={{
            y: 100
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300
          }}>
          
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm text-gray-400 block">
                  {selectedRide.name}
                </span>
                <span className="text-xs text-gray-500">
                  {selectedRide.duration}
                </span>
              </div>
              <span className="text-lg font-bold text-yellow-400">
                {selectedRide.price}
              </span>
            </div>
            <motion.button
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl text-white font-bold text-base shadow-lg shadow-yellow-500/20"
            onClick={() => setBookingStep(1)}
            whileTap={{
              scale: 0.98
            }}>
            
              Request Trip
            </motion.button>
          </motion.div>
        }
      </AnimatePresence>

      {/* Booking Flow */}
      <AnimatePresence>
        {bookingStep > 0 &&
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
            onClick={() => setBookingStep(0)} />
          
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
              {bookingStep < 5 &&
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
                  <h2 className="text-lg font-bold text-white">
                    {bookingStep === 1 && 'Trip Details'}
                    {bookingStep === 2 && 'When?'}
                    {bookingStep === 3 && 'Your details'}
                    {bookingStep === 4 && 'Trip Summary'}
                  </h2>
                  <motion.button
                className="p-2 rounded-xl hover:bg-white/5"
                onClick={() => setBookingStep(0)}
                whileTap={{
                  scale: 0.95
                }}>
                
                    <X className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>
            }

              <div className="flex-1 overflow-y-auto px-6 py-6">
                {bookingStep === 1 &&
              <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Pickup Location
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-400" />
                        <input
                      type="text"
                      placeholder="Enter pickup address"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full bg-[#0A0E1A] text-white pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:border-yellow-500/50 focus:outline-none placeholder:text-gray-500" />
                    
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Drop-off Location
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-400" />
                        <input
                      type="text"
                      placeholder="Enter destination"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="w-full bg-[#0A0E1A] text-white pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:border-yellow-500/50 focus:outline-none placeholder:text-gray-500" />
                    
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Passengers
                      </label>
                      <div className="flex items-center gap-3 bg-[#0A0E1A] border border-white/10 rounded-xl px-4 py-3">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="flex-1 text-white">
                          {passengers} passenger{passengers > 1 ? 's' : ''}
                        </span>
                        <div className="flex gap-2">
                          <motion.button
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"
                        onClick={() =>
                        setPassengers(Math.max(1, passengers - 1))
                        }
                        whileTap={{
                          scale: 0.9
                        }}>
                        
                            −
                          </motion.button>
                          <motion.button
                        className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center"
                        onClick={() =>
                        setPassengers(Math.min(4, passengers + 1))
                        }
                        whileTap={{
                          scale: 0.9
                        }}>
                        
                            +
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
              }

                {bookingStep === 2 &&
              <div className="space-y-6">
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-3 block">
                        Date
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['today', 'tomorrow', 'later'].map((d) =>
                    <motion.button
                      key={d}
                      className={`p-3 rounded-xl border-2 transition-all ${tripDate === d ? 'bg-yellow-500/20 border-yellow-500' : 'bg-[#0A0E1A] border-white/10'}`}
                      onClick={() => setTripDate(d)}
                      whileTap={{
                        scale: 0.98
                      }}>
                      
                            <Calendar
                        className={`w-5 h-5 mx-auto mb-1 ${tripDate === d ? 'text-yellow-400' : 'text-gray-500'}`} />
                      
                            <p className="text-xs font-semibold capitalize text-white">
                              {d}
                            </p>
                          </motion.button>
                    )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Time
                      </label>
                      <input
                    type="time"
                    value={tripTime}
                    onChange={(e) => setTripTime(e.target.value)}
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-yellow-500/50 focus:outline-none" />
                  
                    </div>
                  </div>
              }

                {bookingStep === 3 &&
              <div className="space-y-4">
                    <p className="text-sm text-gray-400 mb-2">
                      No account needed — just your name and number.
                    </p>
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Your Name
                      </label>
                      <input
                    type="text"
                    placeholder="Enter your name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-yellow-500/50 focus:outline-none placeholder:text-gray-500" />
                  
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Phone Number
                      </label>
                      <input
                    type="tel"
                    placeholder="+234 801 234 5678"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-yellow-500/50 focus:outline-none placeholder:text-gray-500" />
                  
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Notes for driver (optional)
                      </label>
                      <textarea
                    placeholder="Luggage, child seat, route preference..."
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-yellow-500/50 focus:outline-none placeholder:text-gray-500 resize-none" />
                  
                    </div>
                  </div>
              }

                {bookingStep === 4 && selectedRide &&
              <div className="space-y-4">
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                      <p className="text-sm font-bold text-yellow-400 mb-3">
                        Service
                      </p>
                      <div className="flex justify-between">
                        <span className="text-gray-300">
                          {selectedRide.name}
                        </span>
                        <span className="text-yellow-400 font-bold">
                          {selectedRide.price}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#0A0E1A] rounded-xl p-4 border border-white/10 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Pickup</span>
                        <span className="text-white font-semibold text-right max-w-[60%]">
                          {pickup || '—'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Drop-off</span>
                        <span className="text-white font-semibold text-right max-w-[60%]">
                          {dropoff || '—'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Date</span>
                        <span className="text-white font-semibold capitalize">
                          {tripDate} {tripTime && `at ${tripTime}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Passengers</span>
                        <span className="text-white font-semibold">
                          {passengers}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Name</span>
                        <span className="text-white font-semibold">
                          {guestName || '—'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Phone</span>
                        <span className="text-white font-semibold">
                          {guestPhone || '—'}
                        </span>
                      </div>
                    </div>
                  </div>
              }

                {bookingStep === 5 &&
              <div className="flex flex-col items-center justify-center text-center py-8">
                    <motion.div
                  className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center mb-6"
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
                  
                      <CheckCircle className="w-12 h-12 text-yellow-400" />
                    </motion.div>
                    <motion.h3
                  className="text-2xl font-bold text-white mb-2"
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
                  
                      Trip Requested!
                    </motion.h3>
                    <motion.p
                  className="text-gray-400 mb-2 text-sm"
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
                  
                      Tunde will confirm and contact you shortly.
                    </motion.p>
                    <motion.p
                  className="text-yellow-400 font-mono text-sm font-bold mb-8"
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: 0.35
                  }}>
                  
                      Ref: {bookingRef}
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
                      className="flex items-center justify-center gap-2 py-3 bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl text-[#25D366] font-semibold text-sm"
                      whileTap={{
                        scale: 0.98
                      }}>
                      
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </motion.button>
                        <motion.button
                      className="flex items-center justify-center gap-2 py-3 bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-yellow-400 font-semibold text-sm"
                      whileTap={{
                        scale: 0.98
                      }}>
                      
                          <MessageCircle className="w-4 h-4" />
                          OyaDrop Chat
                        </motion.button>
                      </div>
                      <motion.button
                    className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl text-white font-bold shadow-lg"
                    onClick={() => {
                      setBookingStep(0);
                      setSelectedRide(null);
                    }}
                    whileTap={{
                      scale: 0.98
                    }}>
                    
                        Done
                      </motion.button>
                    </motion.div>
                  </div>
              }
              </div>

              {bookingStep >= 1 && bookingStep <= 4 &&
            <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A] flex gap-3">
                  {bookingStep > 1 &&
              <motion.button
                className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold"
                onClick={() => setBookingStep(bookingStep - 1)}
                whileTap={{
                  scale: 0.98
                }}>
                
                      Back
                    </motion.button>
              }
                  <motion.button
                className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg ${bookingStep === 4 ? 'bg-gradient-to-r from-yellow-500 to-amber-600' : 'bg-yellow-500'}`}
                onClick={() =>
                bookingStep === 4 ?
                setBookingStep(5) :
                setBookingStep(bookingStep + 1)
                }
                whileTap={{
                  scale: 0.98
                }}>
                
                    {bookingStep === 4 ? 'Confirm Trip' : 'Continue'}
                  </motion.button>
                </div>
            }
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}