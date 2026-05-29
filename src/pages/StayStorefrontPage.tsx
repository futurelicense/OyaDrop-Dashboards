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
  X,
  Sparkles,
  Check,
  Navigation,
  ShieldCheck,
  Calendar,
  Users,
  Wifi,
  Tv,
  Wind,
  Bath,
  Car,
  Coffee,
  Waves,
  Bed,
  Home,
  Utensils } from
'lucide-react';
const propertyPhotos = [
'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop'];

const amenities = [
{
  icon: Wifi,
  label: 'Fast Wi-Fi'
},
{
  icon: Wind,
  label: 'Air Conditioning'
},
{
  icon: Tv,
  label: 'Smart TV'
},
{
  icon: Bath,
  label: 'Hot Water'
},
{
  icon: Car,
  label: 'Free Parking'
},
{
  icon: Coffee,
  label: 'Coffee Machine'
},
{
  icon: Waves,
  label: 'Swimming Pool'
},
{
  icon: Utensils,
  label: 'Full Kitchen'
}];

const rooms = [
{
  id: 'r1',
  name: 'Master Bedroom',
  beds: 'King bed',
  icon: Bed
},
{
  id: 'r2',
  name: 'Guest Bedroom',
  beds: 'Queen bed',
  icon: Bed
},
{
  id: 'r3',
  name: 'Living Room',
  beds: 'Sofa bed',
  icon: Home
}];

const mockReviews = [
{
  id: 1,
  name: 'Linda K.',
  rating: 5,
  date: '5 days ago',
  text: 'Beautiful apartment, exactly as pictured. Host was very responsive.',
  image:
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
},
{
  id: 2,
  name: 'Michael R.',
  rating: 5,
  date: '2 weeks ago',
  text: 'Stunning view and immaculate cleaning. Will definitely return.',
  image:
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
},
{
  id: 3,
  name: 'Adaobi C.',
  rating: 4,
  date: '3 weeks ago',
  text: 'Great location, walking distance to restaurants. Minor noise at night.',
  image:
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop'
},
{
  id: 4,
  name: 'James O.',
  rating: 5,
  date: '1 month ago',
  text: 'Hosted my family of 4 comfortably. The pool was a hit with the kids.',
  image:
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
}];

const pricePerNight = 45000;
interface StayStorefrontPageProps {
  onBack: () => void;
}
export function StayStorefrontPage({ onBack }: StayStorefrontPageProps) {
  const [bookingStep, setBookingStep] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [activePhoto, setActivePhoto] = useState(0);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showGallery, setShowGallery] = useState<number | null>(null);
  const nights =
  checkIn && checkOut ?
  Math.max(
    1,
    Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (
      1000 * 60 * 60 * 24)
    )
  ) :
  0;
  const subtotal = nights * pricePerNight;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;
  const handleShare = () => {
    navigator.clipboard?.writeText('https://oyadrop.com/stay/palmgroveLekki');
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
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="text-xs font-semibold text-gray-400">
            Powered by OyaDrop
          </span>
        </div>
      </div>

      {/* Hero Gallery */}
      <div className="relative">
        <motion.div
          key={activePhoto}
          className="h-72 w-full bg-gray-800 cursor-pointer"
          onClick={() => setShowGallery(activePhoto)}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}>
          
          <img
            src={propertyPhotos[activePhoto]}
            alt="Property"
            className="w-full h-full object-cover" />
          
        </motion.div>
        <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide bg-[#0A0E1A]">
          {propertyPhotos.map((photo, i) =>
          <button
            key={i}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${activePhoto === i ? 'border-pink-500' : 'border-transparent opacity-50'}`}
            onClick={() => setActivePhoto(i)}>
            
              <img
              src={photo}
              alt={`Thumb ${i}`}
              className="w-full h-full object-cover" />
            
            </button>
          )}
        </div>
      </div>

      {/* Title & Info */}
      <div className="px-4 mb-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">Palm Grove Apartments</h1>
            <p className="text-gray-400 text-sm">
              Luxury 2-bedroom apartment with pool views
            </p>
          </div>
          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ml-2">
            <ShieldCheck className="w-3 h-3" />
            Verified
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm mt-3 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-bold">4.92</span>
            <span className="text-gray-500">(187)</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>Lekki Phase 1, Lagos</span>
          </div>
        </div>

        {/* Property Specs */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="bg-[#131B2E] rounded-xl p-3 border border-white/10 text-center">
            <Bed className="w-5 h-5 text-pink-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-white">2</p>
            <p className="text-[10px] text-gray-400">Bedrooms</p>
          </div>
          <div className="bg-[#131B2E] rounded-xl p-3 border border-white/10 text-center">
            <Bath className="w-5 h-5 text-pink-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-white">2</p>
            <p className="text-[10px] text-gray-400">Bathrooms</p>
          </div>
          <div className="bg-[#131B2E] rounded-xl p-3 border border-white/10 text-center">
            <Users className="w-5 h-5 text-pink-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-white">4</p>
            <p className="text-[10px] text-gray-400">Guests</p>
          </div>
          <div className="bg-[#131B2E] rounded-xl p-3 border border-white/10 text-center">
            <Home className="w-5 h-5 text-pink-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-white">95m²</p>
            <p className="text-[10px] text-gray-400">Area</p>
          </div>
        </div>

        {/* Host Card */}
        <div className="bg-[#131B2E] rounded-xl p-4 border border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
              alt="Host"
              className="w-12 h-12 rounded-full object-cover" />
            
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Hosted by Adunni</p>
              <p className="text-xs text-gray-400">
                Superhost • Responds within 1 hour
              </p>
            </div>
            <ShieldCheck className="w-5 h-5 text-pink-400" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 mb-2">
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
            
            <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-pink-400" />
            </div>
            <span className="text-xs text-gray-400">Chat Host</span>
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

      {/* About */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold mb-3">About this place</h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          A beautifully furnished 2-bedroom apartment in the heart of Lekki
          Phase 1. Floor-to-ceiling windows offer stunning views of the pool and
          surrounding gardens. Perfect for families, couples, or business
          travelers seeking comfort and convenience.
        </p>
      </div>

      {/* Rooms */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold mb-4">Sleeping Arrangements</h2>
        <div className="grid grid-cols-3 gap-3">
          {rooms.map((room) => {
            const Icon = room.icon;
            return (
              <div
                key={room.id}
                className="bg-[#131B2E] rounded-xl p-4 border border-white/10">
                
                <Icon className="w-6 h-6 text-pink-400 mb-2" />
                <p className="text-xs font-bold text-white mb-1">{room.name}</p>
                <p className="text-[10px] text-gray-400">{room.beds}</p>
              </div>);

          })}
        </div>
      </div>

      {/* Amenities */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold mb-4">What this place offers</h2>
        <div className="grid grid-cols-2 gap-3">
          {amenities.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.label}
                className="flex items-center gap-3 bg-[#131B2E] rounded-xl p-3 border border-white/10"
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
                
                <Icon className="w-5 h-5 text-pink-400 flex-shrink-0" />
                <span className="text-sm text-white">{a.label}</span>
              </motion.div>);

          })}
        </div>
      </div>

      {/* Reviews */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Reviews</h2>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold">4.92</span>
            <span className="text-xs text-gray-500">(187)</span>
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
            <MapPin className="w-5 h-5 text-pink-400 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white">
                Lekki Phase 1, Lagos
              </p>
              <p className="text-xs text-gray-400">
                Exact address shared after booking
              </p>
              <p className="text-xs text-gray-400 mt-1">
                10 min to The Palms Mall • 15 min to beach
              </p>
            </div>
          </div>
          <motion.button
            className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
            whileTap={{
              scale: 0.98
            }}>
            
            <Navigation className="w-4 h-4" />
            View Area
          </motion.button>
        </div>
      </div>

      {/* Sticky CTA */}
      <AnimatePresence>
        {bookingStep === 0 &&
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-30 bg-[#0A0E1A]/95 backdrop-blur-lg border-t border-white/10 p-4"
          initial={{
            y: 100
          }}
          animate={{
            y: 0
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300
          }}>
          
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xl font-bold text-white">
                  ₦{pricePerNight.toLocaleString()}
                </span>
                <span className="text-sm text-gray-400"> / night</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-white font-semibold">4.92</span>
                <span className="text-gray-500">(187)</span>
              </div>
            </div>
            <motion.button
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl text-white font-bold text-base shadow-lg shadow-pink-500/20"
            onClick={() => setBookingStep(1)}
            whileTap={{
              scale: 0.98
            }}>
            
              Reserve
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
              {bookingStep < 4 &&
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
                  <h2 className="text-lg font-bold text-white">
                    {bookingStep === 1 && 'Pick your dates'}
                    {bookingStep === 2 && 'Your details'}
                    {bookingStep === 3 && 'Reservation Summary'}
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
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-semibold text-gray-400 mb-2 block">
                          Check-in
                        </label>
                        <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-pink-500/50 focus:outline-none" />
                    
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-400 mb-2 block">
                          Check-out
                        </label>
                        <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-pink-500/50 focus:outline-none" />
                    
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Guests
                      </label>
                      <div className="flex items-center gap-3 bg-[#0A0E1A] border border-white/10 rounded-xl px-4 py-3">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="flex-1 text-white">
                          {guests} guest{guests > 1 ? 's' : ''}
                        </span>
                        <div className="flex gap-2">
                          <motion.button
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        whileTap={{
                          scale: 0.9
                        }}>
                        
                            −
                          </motion.button>
                          <motion.button
                        className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center"
                        onClick={() => setGuests(Math.min(4, guests + 1))}
                        whileTap={{
                          scale: 0.9
                        }}>
                        
                            +
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    {nights > 0 &&
                <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">
                            ₦{pricePerNight.toLocaleString()} × {nights} night
                            {nights > 1 ? 's' : ''}
                          </span>
                          <span className="text-white font-semibold">
                            ₦{subtotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Service fee</span>
                          <span className="text-white font-semibold">
                            ₦{serviceFee.toLocaleString()}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-pink-500/30 flex justify-between">
                          <span className="font-bold text-white">Total</span>
                          <span className="font-bold text-pink-400">
                            ₦{total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                }
                  </div>
              }

                {bookingStep === 2 &&
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
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-pink-500/50 focus:outline-none placeholder:text-gray-500" />
                  
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
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-pink-500/50 focus:outline-none placeholder:text-gray-500" />
                  
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Message to host (optional)
                      </label>
                      <textarea
                    placeholder="Tell Adunni about your trip..."
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-pink-500/50 focus:outline-none placeholder:text-gray-500 resize-none" />
                  
                    </div>
                  </div>
              }

                {bookingStep === 3 &&
              <div className="space-y-4">
                    <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">
                          ₦{pricePerNight.toLocaleString()} × {nights} night
                          {nights > 1 ? 's' : ''}
                        </span>
                        <span className="text-white font-semibold">
                          ₦{subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Service fee</span>
                        <span className="text-white font-semibold">
                          ₦{serviceFee.toLocaleString()}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-pink-500/30 flex justify-between">
                        <span className="font-bold text-white">Total</span>
                        <span className="font-bold text-pink-400">
                          ₦{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#0A0E1A] rounded-xl p-4 border border-white/10 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Property</span>
                        <span className="text-white font-semibold">
                          Palm Grove Apartments
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Check-in</span>
                        <span className="text-white font-semibold">
                          {checkIn || '—'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Check-out</span>
                        <span className="text-white font-semibold">
                          {checkOut || '—'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Guests</span>
                        <span className="text-white font-semibold">
                          {guests}
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
                    <p className="text-xs text-gray-500 text-center">
                      Host will confirm and share exact address after booking.
                    </p>
                  </div>
              }

                {bookingStep === 4 &&
              <div className="flex flex-col items-center justify-center text-center py-8">
                    <motion.div
                  className="w-20 h-20 rounded-full bg-pink-500/20 flex items-center justify-center mb-6"
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
                  
                      <CheckCircle className="w-12 h-12 text-pink-400" />
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
                  
                      Reservation Sent!
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
                  
                      Adunni will confirm your booking and share the address
                      shortly.
                    </motion.p>
                    <motion.p
                  className="text-pink-400 font-mono text-sm font-bold mb-8"
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
                      className="flex items-center justify-center gap-2 py-3 bg-pink-500/20 border border-pink-500/30 rounded-xl text-pink-400 font-semibold text-sm"
                      whileTap={{
                        scale: 0.98
                      }}>
                      
                          <MessageCircle className="w-4 h-4" />
                          Chat Host
                        </motion.button>
                      </div>
                      <motion.button
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl text-white font-bold shadow-lg"
                    onClick={() => setBookingStep(0)}
                    whileTap={{
                      scale: 0.98
                    }}>
                    
                        Done
                      </motion.button>
                    </motion.div>
                  </div>
              }
              </div>

              {bookingStep >= 1 && bookingStep <= 3 &&
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
                className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg ${bookingStep === 3 ? 'bg-gradient-to-r from-pink-500 to-rose-600' : 'bg-pink-500'}`}
                onClick={() =>
                bookingStep === 3 ?
                setBookingStep(4) :
                setBookingStep(bookingStep + 1)
                }
                whileTap={{
                  scale: 0.98
                }}>
                
                    {bookingStep === 3 ? 'Confirm Reservation' : 'Continue'}
                  </motion.button>
                </div>
            }
            </motion.div>
          </>
        }
      </AnimatePresence>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {showGallery !== null &&
        <motion.div
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center"
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
            src={propertyPhotos[showGallery]}
            alt="Property"
            className="max-w-[95vw] max-h-[85vh] rounded-2xl object-contain"
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
        }
      </AnimatePresence>
    </div>);

}