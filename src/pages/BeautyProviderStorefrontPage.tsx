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
  Calendar,
  X,
  Store,
  Home,
  Sparkles,
  Award,
  Check,
  Navigation } from
'lucide-react';
interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  category: 'Hair' | 'Nails' | 'Face';
}
const mockServices: Service[] = [
{
  id: 's1',
  name: 'Braids',
  price: 8000,
  duration: '3 hrs',
  description: 'Knotless or box braids, any length.',
  category: 'Hair'
},
{
  id: 's2',
  name: 'Weaving',
  price: 12000,
  duration: '2-3 hrs',
  description: 'Sew-in weaves with leave-out or closure.',
  category: 'Hair'
},
{
  id: 's3',
  name: 'Hair Styling',
  price: 5000,
  duration: '1 hr',
  description: 'Silk press, curls, or updo styling.',
  category: 'Hair'
},
{
  id: 's4',
  name: 'Dreadlocks',
  price: 15000,
  duration: '4-5 hrs',
  description: 'Starter locs or retwist and style.',
  category: 'Hair'
},
{
  id: 's5',
  name: 'Manicure',
  price: 3500,
  duration: '45 min',
  description: 'Basic nail care, cuticle trim, and polish.',
  category: 'Nails'
},
{
  id: 's6',
  name: 'Pedicure',
  price: 4000,
  duration: '1 hr',
  description: 'Foot soak, scrub, and polish.',
  category: 'Nails'
},
{
  id: 's7',
  name: 'Gel Nails',
  price: 6000,
  duration: '1.5 hrs',
  description: 'Long-lasting gel polish application.',
  category: 'Nails'
},
{
  id: 's8',
  name: 'Makeup',
  price: 8000,
  duration: '1 hr',
  description: 'Full face glam for events or photoshoots.',
  category: 'Face'
},
{
  id: 's9',
  name: 'Facial',
  price: 6000,
  duration: '1 hr',
  description: 'Deep cleansing and exfoliating treatment.',
  category: 'Face'
}];

const mockPortfolio = [
'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop',
'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=400&fit=crop',
'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=400&fit=crop',
'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop',
'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop',
'https://images.unsplash.com/photo-1516975080661-422fc991011b?w=400&h=400&fit=crop'];

const mockReviews = [
{
  id: 1,
  name: 'Chioma E.',
  rating: 5,
  date: '2 days ago',
  text: 'Amara is the best! My braids are so neat and painless.',
  image:
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop'
},
{
  id: 2,
  name: 'Sarah J.',
  rating: 5,
  date: '1 week ago',
  text: 'Loved my makeup for the wedding. Lasted all day without creasing.',
  image:
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
},
{
  id: 3,
  name: 'Blessing A.',
  rating: 4,
  date: '2 weeks ago',
  text: 'Great service and very professional setup.',
  image:
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
},
{
  id: 4,
  name: 'Ngozi O.',
  rating: 5,
  date: '3 weeks ago',
  text: 'My gel nails lasted 3 weeks! Will definitely come back.',
  image:
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop'
},
{
  id: 5,
  name: 'Fatima M.',
  rating: 5,
  date: '1 month ago',
  text: 'The facial was so relaxing. My skin has never looked better.',
  image:
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
}];

const availableSlots = [
{
  label: 'Today 2:00 PM',
  value: 'today-14'
},
{
  label: 'Today 4:30 PM',
  value: 'today-1630'
},
{
  label: 'Tomorrow 10:00 AM',
  value: 'tmr-10'
},
{
  label: 'Tomorrow 1:00 PM',
  value: 'tmr-13'
},
{
  label: 'Tomorrow 3:30 PM',
  value: 'tmr-1530'
},
{
  label: 'Fri 11:00 AM',
  value: 'fri-11'
}];

interface BeautyProviderStorefrontPageProps {
  onBack: () => void;
}
export function BeautyProviderStorefrontPage({
  onBack
}: BeautyProviderStorefrontPageProps) {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [bookingStep, setBookingStep] = useState(0);
  const [serviceLocation, setServiceLocation] = useState<
    'salon' | 'home' | null>(
    null);
  const [address, setAddress] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [showGallery, setShowGallery] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const toggleService = (service: Service) => {
    setSelectedServices((prev) =>
    prev.find((s) => s.id === service.id) ?
    prev.filter((s) => s.id !== service.id) :
    [...prev, service]
    );
  };
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const categories = ['Hair', 'Nails', 'Face'] as const;
  const handleBookNow = () => setBookingStep(1);
  const closeBooking = () => setBookingStep(0);
  const handleConfirmBooking = () => setBookingStep(5);
  const handleShareLink = () => {
    navigator.clipboard?.writeText('https://oyadrop.com/beauty/glambyamara');
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
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-semibold text-gray-400">
            Powered by OyaDrop
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-48 w-full bg-gray-800">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=400&fit=crop"
            alt="Salon Interior"
            className="w-full h-full object-cover opacity-80" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] to-transparent" />
        </div>
        <div className="px-4 -mt-16 relative z-10">
          <div className="flex justify-between items-end mb-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop"
                alt="Amara Okafor"
                className="w-24 h-24 rounded-full border-4 border-[#0A0E1A] object-cover" />
              
              <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#0A0E1A]" />
            </div>
            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Open Now
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">Glam by Amara</h1>
            <Award className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-gray-400 text-sm mb-3">
            Where beauty meets artistry
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold">4.9</span>
              <span className="text-gray-500">(234)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>Victoria Island, Lagos</span>
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
              
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-cyan-400" />
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
              onClick={handleShareLink}
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

      {/* Portfolio Gallery */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold mb-3">Portfolio</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {mockPortfolio.map((photo, index) =>
          <motion.button
            key={index}
            className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden"
            whileTap={{
              scale: 0.95
            }}
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: index * 0.05
            }}
            onClick={() => setShowGallery(photo)}>
            
              <img
              src={photo}
              alt={`Work ${index + 1}`}
              className="w-full h-full object-cover" />
            
            </motion.button>
          )}
        </div>
      </div>

      {/* Services & Pricing */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold mb-4">Services & Pricing</h2>
        {categories.map((category) => {
          const services = mockServices.filter((s) => s.category === category);
          return (
            <div key={category} className="mb-5">
              <h3 className="text-sm font-semibold text-orange-400 mb-3 uppercase tracking-wider">
                {category}
              </h3>
              <div className="space-y-2">
                {services.map((service, index) => {
                  const isSelected = selectedServices.find(
                    (s) => s.id === service.id
                  );
                  return (
                    <motion.button
                      key={service.id}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${isSelected ? 'bg-orange-500/15 border-orange-500' : 'bg-[#131B2E] border-white/10'}`}
                      onClick={() => toggleService(service)}
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
                      
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-bold text-white">
                              {service.name}
                            </h4>
                            {isSelected &&
                            <CheckCircle className="w-4 h-4 text-orange-400" />
                            }
                          </div>
                          <p className="text-xs text-gray-400 mb-1">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {service.duration}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`text-sm font-bold ${isSelected ? 'text-orange-400' : 'text-gray-300'}`}>
                          
                          ₦{service.price.toLocaleString()}
                        </span>
                      </div>
                    </motion.button>);

                })}
              </div>
            </div>);

        })}
      </div>

      {/* Availability */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold mb-3">Next Available</h2>
        <div className="flex flex-wrap gap-2">
          {availableSlots.map((slot, index) =>
          <motion.button
            key={slot.value}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${selectedSlot === slot.value ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-[#131B2E] border-white/10 text-gray-400'}`}
            onClick={() => setSelectedSlot(slot.value)}
            whileTap={{
              scale: 0.95
            }}
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: index * 0.05
            }}>
            
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {slot.label}
              </span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Reviews</h2>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold">4.9</span>
            <span className="text-xs text-gray-500">(234)</span>
          </div>
        </div>
        <div className="space-y-3">
          {mockReviews.map((review, index) =>
          <motion.div
            key={review.id}
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
              delay: index * 0.05
            }}>
            
              <div className="flex items-center gap-3 mb-2">
                <img
                src={review.image}
                alt={review.name}
                className="w-8 h-8 rounded-full object-cover" />
              
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">
                    {review.name}
                  </p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({
                  length: review.rating
                }).map((_, i) =>
                <Star
                  key={i}
                  className="w-3 h-3 text-yellow-500 fill-yellow-500" />

                )}
                </div>
              </div>
              <p className="text-sm text-gray-300">{review.text}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="px-4 mb-32">
        <h2 className="text-lg font-bold mb-3">Location</h2>
        <div className="bg-[#131B2E] rounded-xl p-4 border border-white/10">
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white">
                123 Victoria Island, Lagos
              </p>
              <p className="text-xs text-gray-400">
                Open Mon-Sat, 9:00 AM - 7:00 PM
              </p>
            </div>
          </div>
          <motion.button
            className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
            whileTap={{
              scale: 0.98
            }}>
            
            <Navigation className="w-4 h-4" />
            Get Directions
          </motion.button>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <AnimatePresence>
        {selectedServices.length > 0 && bookingStep === 0 &&
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
              <span className="text-sm text-gray-400">
                {selectedServices.length} service
                {selectedServices.length > 1 ? 's' : ''} selected
              </span>
              <span className="text-xl font-bold text-orange-400">
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>
            <motion.button
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl text-white font-bold text-base shadow-lg shadow-orange-500/20"
            onClick={handleBookNow}
            whileTap={{
              scale: 0.98
            }}>
            
              Book Now
            </motion.button>
          </motion.div>
        }
      </AnimatePresence>

      {/* Booking Flow Bottom Sheet */}
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
            onClick={closeBooking} />
          
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

              {/* Step Header */}
              {bookingStep < 5 &&
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
                  <h2 className="text-lg font-bold text-white">
                    {bookingStep === 1 && 'Where would you like the service?'}
                    {bookingStep === 2 && 'Pick a time'}
                    {bookingStep === 3 && 'Your details'}
                    {bookingStep === 4 && 'Booking Summary'}
                  </h2>
                  <motion.button
                className="p-2 rounded-xl hover:bg-white/5"
                onClick={closeBooking}
                whileTap={{
                  scale: 0.95
                }}>
                
                    <X className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>
            }

              <div className="flex-1 overflow-y-auto px-6 py-6">
                {/* Step 1: Location */}
                {bookingStep === 1 &&
              <div className="space-y-4">
                    <motion.button
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${serviceLocation === 'salon' ? 'bg-orange-500/15 border-orange-500' : 'bg-[#0A0E1A] border-white/10'}`}
                  onClick={() => setServiceLocation('salon')}
                  whileTap={{
                    scale: 0.98
                  }}>
                  
                      <div className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center">
                        <Store className="w-7 h-7 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          Visit Salon
                        </h3>
                        <p className="text-xs text-gray-400">
                          Go to Glam by Amara's studio
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          123 Victoria Island, Lagos
                        </p>
                      </div>
                    </motion.button>

                    <motion.button
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${serviceLocation === 'home' ? 'bg-orange-500/15 border-orange-500' : 'bg-[#0A0E1A] border-white/10'}`}
                  onClick={() => setServiceLocation('home')}
                  whileTap={{
                    scale: 0.98
                  }}>
                  
                      <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <Home className="w-7 h-7 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          Provider Comes to You
                        </h3>
                        <p className="text-xs text-gray-400">
                          Get serviced at your location
                        </p>
                      </div>
                    </motion.button>

                    <AnimatePresence>
                      {serviceLocation === 'home' &&
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0
                    }}
                    animate={{
                      opacity: 1,
                      height: 'auto'
                    }}
                    exit={{
                      opacity: 0,
                      height: 0
                    }}>
                    
                          <label className="text-sm font-semibold text-gray-400 mb-2 block">
                            Your Address
                          </label>
                          <input
                      type="text"
                      placeholder="Enter your address..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-orange-500/50 focus:outline-none placeholder:text-gray-500" />
                    
                        </motion.div>
                  }
                    </AnimatePresence>
                  </div>
              }

                {/* Step 2: Date & Time */}
                {bookingStep === 2 &&
              <div className="space-y-6">
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-3 block">
                        Select Date
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['today', 'tomorrow', 'later'].map((date) =>
                    <motion.button
                      key={date}
                      className={`p-3 rounded-xl border-2 transition-all ${selectedSlot.startsWith(date === 'today' ? 'today' : date === 'tomorrow' ? 'tmr' : 'fri') ? 'bg-orange-500/20 border-orange-500' : 'bg-[#0A0E1A] border-white/10'}`}
                      whileTap={{
                        scale: 0.98
                      }}>
                      
                            <Calendar className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                            <p className="text-xs font-semibold capitalize text-white">
                              {date}
                            </p>
                          </motion.button>
                    )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-3 block">
                        Available Slots
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {availableSlots.map((slot) =>
                    <motion.button
                      key={slot.value}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${selectedSlot === slot.value ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-[#0A0E1A] border-white/10 text-gray-400'}`}
                      onClick={() => setSelectedSlot(slot.value)}
                      whileTap={{
                        scale: 0.95
                      }}>
                      
                            {slot.label}
                          </motion.button>
                    )}
                      </div>
                    </div>
                  </div>
              }

                {/* Step 3: Guest Info */}
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
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-orange-500/50 focus:outline-none placeholder:text-gray-500" />
                  
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
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-orange-500/50 focus:outline-none placeholder:text-gray-500" />
                  
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Notes (optional)
                      </label>
                      <textarea
                    placeholder="Any special requests or preferences..."
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-orange-500/50 focus:outline-none placeholder:text-gray-500 resize-none" />
                  
                    </div>
                  </div>
              }

                {/* Step 4: Summary */}
                {bookingStep === 4 &&
              <div className="space-y-4">
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                      <p className="text-sm font-bold text-orange-400 mb-3">
                        Services
                      </p>
                      <div className="space-y-2">
                        {selectedServices.map((service) =>
                    <div
                      key={service.id}
                      className="flex justify-between text-sm">
                      
                            <span className="text-gray-300">
                              {service.name}
                            </span>
                            <span className="text-white font-semibold">
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
                    <div className="bg-[#0A0E1A] rounded-xl p-4 border border-white/10 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Location</span>
                        <span className="text-white font-semibold">
                          {serviceLocation === 'salon' ?
                      'Visit Salon' :
                      'Home Service'}
                        </span>
                      </div>
                      {serviceLocation === 'home' && address &&
                  <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Address</span>
                          <span className="text-white font-semibold text-right max-w-[60%]">
                            {address}
                          </span>
                        </div>
                  }
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Time</span>
                        <span className="text-white font-semibold">
                          {availableSlots.find((s) => s.value === selectedSlot)?.
                      label || 'Not selected'}
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
                      {guestNotes &&
                  <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Notes</span>
                          <span className="text-white font-semibold text-right max-w-[60%]">
                            {guestNotes}
                          </span>
                        </div>
                  }
                    </div>
                  </div>
              }

                {/* Step 5: Confirmation */}
                {bookingStep === 5 &&
              <div className="flex flex-col items-center justify-center text-center py-8">
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
                  
                      Booking Confirmed!
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
                  
                      Your appointment with Glam by Amara has been booked.
                    </motion.p>
                    <motion.p
                  className="text-orange-400 font-mono text-sm font-bold mb-8"
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
                      className="flex items-center justify-center gap-2 py-3 bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-cyan-400 font-semibold text-sm"
                      whileTap={{
                        scale: 0.98
                      }}>
                      
                          <MessageCircle className="w-4 h-4" />
                          OyaDrop Chat
                        </motion.button>
                      </div>
                      <motion.button
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl text-white font-bold shadow-lg"
                    onClick={() => {
                      closeBooking();
                      setSelectedServices([]);
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

              {/* Step Navigation Footer */}
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
                className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg ${bookingStep === 4 ? 'bg-gradient-to-r from-orange-500 to-pink-500' : 'bg-orange-500'}`}
                onClick={() => {
                  if (bookingStep === 4) {
                    handleConfirmBooking();
                  } else {
                    setBookingStep(bookingStep + 1);
                  }
                }}
                whileTap={{
                  scale: 0.98
                }}>
                
                    {bookingStep === 4 ? 'Confirm Booking' : 'Continue'}
                  </motion.button>
                </div>
            }
            </motion.div>
          </>
        }
      </AnimatePresence>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {showGallery &&
        <>
            <motion.div
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            onClick={() => setShowGallery(null)}>
            
              <motion.img
              src={showGallery}
              alt="Portfolio"
              className="max-w-[90vw] max-h-[80vh] rounded-2xl object-contain"
              initial={{
                scale: 0.8,
                opacity: 0
              }}
              animate={{
                scale: 1,
                opacity: 1
              }}
              exit={{
                scale: 0.8,
                opacity: 0
              }} />
            
              <motion.button
              className="absolute top-6 right-6 p-3 bg-white/10 rounded-full"
              onClick={() => setShowGallery(null)}
              whileTap={{
                scale: 0.95
              }}>
              
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}