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
  Truck,
  Store,
  Sparkles,
  Award,
  Check,
  Navigation,
  Shirt,
  Wind,
  Footprints,
  Droplet } from
'lucide-react';
interface LaundryService {
  id: string;
  name: string;
  price: number;
  unit: string;
  turnaround: string;
  description: string;
  icon: any;
  category: 'Wash' | 'Dry Clean' | 'Special';
}
const mockServices: LaundryService[] = [
{
  id: 'l1',
  name: 'Wash & Fold',
  price: 800,
  unit: 'per kg',
  turnaround: '24 hrs',
  description: 'Regular laundry, washed and neatly folded.',
  icon: Shirt,
  category: 'Wash'
},
{
  id: 'l2',
  name: 'Wash & Iron',
  price: 1200,
  unit: 'per kg',
  turnaround: '24 hrs',
  description: 'Washed, ironed, and hanger-ready.',
  icon: Wind,
  category: 'Wash'
},
{
  id: 'l3',
  name: 'Express Wash',
  price: 1500,
  unit: 'per kg',
  turnaround: '6 hrs',
  description: 'Same-day turnaround for urgent loads.',
  icon: Droplet,
  category: 'Wash'
},
{
  id: 'l4',
  name: 'Suit Cleaning',
  price: 4500,
  unit: 'per piece',
  turnaround: '48 hrs',
  description: 'Professional dry cleaning for suits.',
  icon: Shirt,
  category: 'Dry Clean'
},
{
  id: 'l5',
  name: 'Dress Cleaning',
  price: 3500,
  unit: 'per piece',
  turnaround: '48 hrs',
  description: 'Delicate dress dry cleaning.',
  icon: Shirt,
  category: 'Dry Clean'
},
{
  id: 'l6',
  name: 'Native Wear',
  price: 2500,
  unit: 'per piece',
  turnaround: '48 hrs',
  description: 'Agbada, kaftan, traditional outfits.',
  icon: Shirt,
  category: 'Dry Clean'
},
{
  id: 'l7',
  name: 'Shoe Cleaning',
  price: 2000,
  unit: 'per pair',
  turnaround: '48 hrs',
  description: 'Sneakers, leather, suede restoration.',
  icon: Footprints,
  category: 'Special'
},
{
  id: 'l8',
  name: 'Duvet & Bedding',
  price: 3000,
  unit: 'per piece',
  turnaround: '48 hrs',
  description: 'Duvets, blankets, comforters.',
  icon: Wind,
  category: 'Special'
}];

const mockPortfolio = [
'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&h=400&fit=crop',
'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=400&h=400&fit=crop',
'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop',
'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?w=400&h=400&fit=crop',
'https://images.unsplash.com/photo-1469504512102-900f29606341?w=400&h=400&fit=crop'];

const mockReviews = [
{
  id: 1,
  name: 'Tunde A.',
  rating: 5,
  date: '3 days ago',
  text: 'Super fresh and folded properly. Pickup driver was on time.',
  image:
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
},
{
  id: 2,
  name: 'Bisi O.',
  rating: 5,
  date: '1 week ago',
  text: 'My agbada came back looking brand new!',
  image:
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
},
{
  id: 3,
  name: 'Kelvin M.',
  rating: 4,
  date: '2 weeks ago',
  text: 'Good service, slight delay but they communicated.',
  image:
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
},
{
  id: 4,
  name: 'Joy E.',
  rating: 5,
  date: '3 weeks ago',
  text: 'Shoe cleaning was magic. My white sneakers are white again.',
  image:
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
}];

const availableSlots = [
{
  label: 'Today 11:00 AM',
  value: 'today-11'
},
{
  label: 'Today 3:00 PM',
  value: 'today-15'
},
{
  label: 'Tomorrow 9:00 AM',
  value: 'tmr-9'
},
{
  label: 'Tomorrow 2:00 PM',
  value: 'tmr-14'
},
{
  label: 'Tomorrow 5:00 PM',
  value: 'tmr-17'
},
{
  label: 'Sat 10:00 AM',
  value: 'sat-10'
}];

interface LaundryStorefrontPageProps {
  onBack: () => void;
}
export function LaundryStorefrontPage({ onBack }: LaundryStorefrontPageProps) {
  const [selectedServices, setSelectedServices] = useState<LaundryService[]>([]);
  const [bookingStep, setBookingStep] = useState(0);
  const [serviceMode, setServiceMode] = useState<'pickup' | 'dropoff' | null>(
    null
  );
  const [address, setAddress] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const toggleService = (s: LaundryService) => {
    setSelectedServices((prev) =>
    prev.find((x) => x.id === s.id) ?
    prev.filter((x) => x.id !== s.id) :
    [...prev, s]
    );
  };
  const estimatedMin = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const categories = ['Wash', 'Dry Clean', 'Special'] as const;
  const handleShareLink = () => {
    navigator.clipboard?.writeText('https://oyadrop.com/laundry/sparklewash');
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
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-gray-400">
            Powered by OyaDrop
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative">
        <div className="h-48 w-full bg-gray-800">
          <img
            src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&h=400&fit=crop"
            alt="Laundry"
            className="w-full h-full object-cover opacity-80" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] to-transparent" />
        </div>
        <div className="px-4 -mt-16 relative z-10">
          <div className="flex justify-between items-end mb-3">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-[#0A0E1A] bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Droplet className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#0A0E1A]" />
            </div>
            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Accepting Orders
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">Sparkle Wash Laundry</h1>
            <Award className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-gray-400 text-sm mb-3">
            Crisp, clean, and on time — every time
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold">4.8</span>
              <span className="text-gray-500">(412)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>Lekki Phase 1, Lagos</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>24hr turnaround</span>
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

      {/* Portfolio */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold mb-3">Our Work</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {mockPortfolio.map((p, i) =>
          <motion.div
            key={i}
            className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden"
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
              alt={`Work ${i + 1}`}
              className="w-full h-full object-cover" />
            
            </motion.div>
          )}
        </div>
      </div>

      {/* Services */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold mb-4">Services & Pricing</h2>
        {categories.map((category) => {
          const services = mockServices.filter((s) => s.category === category);
          return (
            <div key={category} className="mb-5">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wider">
                {category}
              </h3>
              <div className="space-y-2">
                {services.map((service, index) => {
                  const isSelected = selectedServices.find(
                    (s) => s.id === service.id
                  );
                  const Icon = service.icon;
                  return (
                    <motion.button
                      key={service.id}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${isSelected ? 'bg-cyan-500/15 border-cyan-500' : 'bg-[#131B2E] border-white/10'}`}
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
                      
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-cyan-500/30' : 'bg-white/5'}`}>
                          
                          <Icon
                            className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-gray-400'}`} />
                          
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-bold text-white">
                              {service.name}
                            </h4>
                            {isSelected &&
                            <CheckCircle className="w-4 h-4 text-cyan-400" />
                            }
                          </div>
                          <p className="text-xs text-gray-400 mb-1">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {service.turnaround}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-sm font-bold ${isSelected ? 'text-cyan-400' : 'text-gray-300'}`}>
                            
                            ₦{service.price.toLocaleString()}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {service.unit}
                          </p>
                        </div>
                      </div>
                    </motion.button>);

                })}
              </div>
            </div>);

        })}
      </div>

      {/* Availability */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold mb-3">Pickup Slots</h2>
        <div className="flex flex-wrap gap-2">
          {availableSlots.map((slot, i) =>
          <motion.button
            key={slot.value}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${selectedSlot === slot.value ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-[#131B2E] border-white/10 text-gray-400'}`}
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
              delay: i * 0.05
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
            <span className="text-sm font-bold">4.8</span>
            <span className="text-xs text-gray-500">(412)</span>
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

      {/* Location */}
      <div className="px-4 mb-32">
        <h2 className="text-lg font-bold mb-3">Location</h2>
        <div className="bg-[#131B2E] rounded-xl p-4 border border-white/10">
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="w-5 h-5 text-cyan-400 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white">
                14 Admiralty Way, Lekki Phase 1
              </p>
              <p className="text-xs text-gray-400">
                Open Mon-Sat, 7:00 AM - 8:00 PM
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

      {/* Sticky CTA */}
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
              <span className="text-xs text-gray-500">
                From ₦{estimatedMin.toLocaleString()}
              </span>
            </div>
            <motion.button
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold text-base shadow-lg shadow-cyan-500/20"
            onClick={() => setBookingStep(1)}
            whileTap={{
              scale: 0.98
            }}>
            
              Request Pickup
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
                    {bookingStep === 1 && 'Pickup or Drop-off?'}
                    {bookingStep === 2 && 'Pick a time'}
                    {bookingStep === 3 && 'Your details'}
                    {bookingStep === 4 && 'Order Summary'}
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
                    <motion.button
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${serviceMode === 'pickup' ? 'bg-cyan-500/15 border-cyan-500' : 'bg-[#0A0E1A] border-white/10'}`}
                  onClick={() => setServiceMode('pickup')}
                  whileTap={{
                    scale: 0.98
                  }}>
                  
                      <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                        <Truck className="w-7 h-7 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          Pickup from Me
                        </h3>
                        <p className="text-xs text-gray-400">
                          We collect from your address
                        </p>
                        <p className="text-xs text-cyan-400 mt-1">
                          +₦500 pickup fee
                        </p>
                      </div>
                    </motion.button>
                    <motion.button
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${serviceMode === 'dropoff' ? 'bg-cyan-500/15 border-cyan-500' : 'bg-[#0A0E1A] border-white/10'}`}
                  onClick={() => setServiceMode('dropoff')}
                  whileTap={{
                    scale: 0.98
                  }}>
                  
                      <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <Store className="w-7 h-7 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          Drop-off at Shop
                        </h3>
                        <p className="text-xs text-gray-400">
                          Bring laundry to our location
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          14 Admiralty Way, Lekki
                        </p>
                      </div>
                    </motion.button>
                    <AnimatePresence>
                      {serviceMode === 'pickup' &&
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
                            Pickup Address
                          </label>
                          <input
                      type="text"
                      placeholder="Enter your address..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
                    
                        </motion.div>
                  }
                    </AnimatePresence>
                  </div>
              }

                {bookingStep === 2 &&
              <div>
                    <label className="text-sm font-semibold text-gray-400 mb-3 block">
                      Available Slots
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableSlots.map((slot) =>
                  <motion.button
                    key={slot.value}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${selectedSlot === slot.value ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-[#0A0E1A] border-white/10 text-gray-400'}`}
                    onClick={() => setSelectedSlot(slot.value)}
                    whileTap={{
                      scale: 0.95
                    }}>
                    
                          {slot.label}
                        </motion.button>
                  )}
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
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
                  
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
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
                  
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Special Instructions (optional)
                      </label>
                      <textarea
                    placeholder="Stains, fabric care notes, etc."
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500 resize-none" />
                  
                    </div>
                  </div>
              }

                {bookingStep === 4 &&
              <div className="space-y-4">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                      <p className="text-sm font-bold text-cyan-400 mb-3">
                        Services
                      </p>
                      <div className="space-y-2">
                        {selectedServices.map((s) =>
                    <div
                      key={s.id}
                      className="flex justify-between text-sm">
                      
                            <span className="text-gray-300">{s.name}</span>
                            <span className="text-white font-semibold">
                              ₦{s.price.toLocaleString()} {s.unit}
                            </span>
                          </div>
                    )}
                        <div className="pt-2 border-t border-cyan-500/30 flex justify-between">
                          <span className="font-bold text-white">
                            Estimated Total
                          </span>
                          <span className="font-bold text-cyan-400">
                            From ₦{estimatedMin.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">
                          Final price calculated after item count/weight
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#0A0E1A] rounded-xl p-4 border border-white/10 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Mode</span>
                        <span className="text-white font-semibold">
                          {serviceMode === 'pickup' ? 'Pickup' : 'Drop-off'}
                        </span>
                      </div>
                      {serviceMode === 'pickup' && address &&
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
                      label || '—'}
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
                  className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center mb-6"
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
                  
                      <CheckCircle className="w-12 h-12 text-cyan-400" />
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
                  
                      Order Confirmed!
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
                  
                      Sparkle Wash will confirm your pickup shortly.
                    </motion.p>
                    <motion.p
                  className="text-cyan-400 font-mono text-sm font-bold mb-8"
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
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold shadow-lg"
                    onClick={() => {
                      setBookingStep(0);
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
                className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg ${bookingStep === 4 ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-cyan-500'}`}
                onClick={() =>
                bookingStep === 4 ?
                setBookingStep(5) :
                setBookingStep(bookingStep + 1)
                }
                whileTap={{
                  scale: 0.98
                }}>
                
                    {bookingStep === 4 ? 'Confirm Order' : 'Continue'}
                  </motion.button>
                </div>
            }
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}