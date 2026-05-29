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
  Truck,
  Store,
  Sparkles,
  Award,
  Check,
  Navigation,
  Pill,
  Upload,
  Plus,
  Minus,
  ShieldCheck,
  FileText } from
'lucide-react';
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category:
  'Pain Relief' |
  'Cold & Flu' |
  'Wellness' |
  'Baby Care' |
  'Prescription';
  image: string;
  rx: boolean;
}
const mockProducts: Product[] = [
{
  id: 'p1',
  name: 'Paracetamol 500mg',
  price: 850,
  description: '20 tablets, fast-acting pain & fever relief.',
  category: 'Pain Relief',
  image:
  'https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&h=300&fit=crop',
  rx: false
},
{
  id: 'p2',
  name: 'Ibuprofen 400mg',
  price: 1200,
  description: '20 tablets, anti-inflammatory pain relief.',
  category: 'Pain Relief',
  image:
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop',
  rx: false
},
{
  id: 'p3',
  name: 'Cough Syrup 100ml',
  price: 1800,
  description: 'Dry cough soothing syrup.',
  category: 'Cold & Flu',
  image:
  'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=300&fit=crop',
  rx: false
},
{
  id: 'p4',
  name: 'Vitamin C 1000mg',
  price: 2500,
  description: '30 effervescent tablets, immune support.',
  category: 'Cold & Flu',
  image:
  'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&h=300&fit=crop',
  rx: false
},
{
  id: 'p5',
  name: 'Multivitamins',
  price: 4500,
  description: '60 capsules, complete daily nutrition.',
  category: 'Wellness',
  image:
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop',
  rx: false
},
{
  id: 'p6',
  name: 'Omega-3 Fish Oil',
  price: 5500,
  description: '90 softgels, heart & brain health.',
  category: 'Wellness',
  image:
  'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=300&h=300&fit=crop',
  rx: false
},
{
  id: 'p7',
  name: 'Baby Diapers (Pack)',
  price: 6200,
  description: 'Size M, 50 count, ultra-soft.',
  category: 'Baby Care',
  image:
  'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=300&h=300&fit=crop',
  rx: false
},
{
  id: 'p8',
  name: 'Baby Formula 400g',
  price: 8500,
  description: 'Stage 1, infant nutrition.',
  category: 'Baby Care',
  image:
  'https://images.unsplash.com/photo-1576073719676-aa95576db207?w=300&h=300&fit=crop',
  rx: false
},
{
  id: 'p9',
  name: 'Amoxicillin 500mg',
  price: 3500,
  description: 'Antibiotic, prescription required.',
  category: 'Prescription',
  image:
  'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=300&fit=crop',
  rx: true
}];

const mockReviews = [
{
  id: 1,
  name: 'Adaeze N.',
  rating: 5,
  date: '2 days ago',
  text: 'Got my prescription within 45 minutes. Lifesaver.',
  image:
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop'
},
{
  id: 2,
  name: 'Femi T.',
  rating: 5,
  date: '1 week ago',
  text: 'Pharmacist was super helpful with advice over chat.',
  image:
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
},
{
  id: 3,
  name: 'Zainab H.',
  rating: 4,
  date: '2 weeks ago',
  text: 'Wide selection. Some items were out of stock but suggested alternatives.',
  image:
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
},
{
  id: 4,
  name: 'Daniel I.',
  rating: 5,
  date: '3 weeks ago',
  text: 'Fast delivery and genuine medications. Trustworthy.',
  image:
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
}];

interface PharmacyStorefrontPageProps {
  onBack: () => void;
}
export function PharmacyStorefrontPage({
  onBack
}: PharmacyStorefrontPageProps) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [bookingStep, setBookingStep] = useState(0);
  const [deliveryMode, setDeliveryMode] = useState<
    'delivery' | 'pickup' | null>(
    null);
  const [address, setAddress] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const updateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const next = {
        ...prev
      };
      const current = next[id] || 0;
      const updated = Math.max(0, current + delta);
      if (updated === 0) delete next[id];else
      next[id] = updated;
      return next;
    });
  };
  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = mockProducts.find((p) => p.id === id)!;
    return {
      product,
      qty
    };
  });
  const subtotal = cartItems.reduce(
    (sum, { product, qty }) => sum + product.price * qty,
    0
  );
  const itemCount = cartItems.reduce((sum, { qty }) => sum + qty, 0);
  const hasRx = cartItems.some(({ product }) => product.rx);
  const categories = [
  'Pain Relief',
  'Cold & Flu',
  'Wellness',
  'Baby Care',
  'Prescription'] as
  const;
  const handleShare = () => {
    navigator.clipboard?.writeText('https://oyadrop.com/pharmacy/carepoint');
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
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-gray-400">
            Powered by OyaDrop
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative">
        <div className="h-48 w-full bg-gray-800">
          <img
            src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=400&fit=crop"
            alt="Pharmacy"
            className="w-full h-full object-cover opacity-80" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] to-transparent" />
        </div>
        <div className="px-4 -mt-16 relative z-10">
          <div className="flex justify-between items-end mb-3">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-[#0A0E1A] bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
                <Pill className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#0A0E1A]" />
            </div>
            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Open 24/7
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">CarePoint Pharmacy</h1>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-gray-400 text-sm mb-3">
            Licensed pharmacy • Genuine medications • Fast delivery
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold">4.9</span>
              <span className="text-gray-500">(587)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>Yaba, Lagos</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Truck className="w-4 h-4" />
              <span>30-min delivery</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3 mb-6">
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
              
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xs text-gray-400">Ask Pharmacist</span>
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

          {/* Upload Prescription CTA */}
          <motion.button
            className="w-full p-4 mb-8 bg-gradient-to-r from-emerald-500/20 to-green-600/20 border-2 border-dashed border-emerald-500/40 rounded-2xl flex items-center gap-4"
            whileTap={{
              scale: 0.98
            }}
            onClick={() => setPrescriptionUploaded(true)}>
            
            <div className="w-12 h-12 rounded-xl bg-emerald-500/30 flex items-center justify-center">
              {prescriptionUploaded ?
              <CheckCircle className="w-6 h-6 text-emerald-400" /> :

              <Upload className="w-6 h-6 text-emerald-400" />
              }
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-sm font-bold text-white">
                {prescriptionUploaded ?
                'Prescription uploaded' :
                'Upload Prescription'}
              </h3>
              <p className="text-xs text-gray-400">
                {prescriptionUploaded ?
                'Pharmacist will review and prepare your meds' :
                'Snap a photo and we\u2019ll handle the rest'}
              </p>
            </div>
            <FileText className="w-5 h-5 text-emerald-400" />
          </motion.button>
        </div>
      </div>

      {/* Products by Category */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold mb-4">Browse Products</h2>
        {categories.map((category) => {
          const products = mockProducts.filter((p) => p.category === category);
          if (products.length === 0) return null;
          return (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-semibold text-emerald-400 mb-3 uppercase tracking-wider">
                {category}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {products.map((product, index) => {
                  const qty = cart[product.id] || 0;
                  return (
                    <motion.div
                      key={product.id}
                      className={`bg-[#131B2E] rounded-xl border-2 overflow-hidden transition-all ${qty > 0 ? 'border-emerald-500' : 'border-white/10'}`}
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
                      
                      <div className="relative h-24 bg-gray-800">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover" />
                        
                        {product.rx &&
                        <div className="absolute top-1 right-1 bg-emerald-500/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            RX
                          </div>
                        }
                      </div>
                      <div className="p-3">
                        <h4 className="text-xs font-bold text-white mb-1 line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 mb-2 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-emerald-400">
                            ₦{product.price.toLocaleString()}
                          </span>
                          {qty === 0 ?
                          <motion.button
                            className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center"
                            whileTap={{
                              scale: 0.9
                            }}
                            onClick={() => updateQty(product.id, 1)}>
                            
                              <Plus className="w-4 h-4" />
                            </motion.button> :

                          <div className="flex items-center gap-1.5 bg-emerald-500/20 rounded-lg px-1.5 py-0.5">
                              <motion.button
                              className="w-5 h-5 flex items-center justify-center text-emerald-400"
                              whileTap={{
                                scale: 0.9
                              }}
                              onClick={() => updateQty(product.id, -1)}>
                              
                                <Minus className="w-3 h-3" />
                              </motion.button>
                              <span className="text-xs font-bold text-white w-4 text-center">
                                {qty}
                              </span>
                              <motion.button
                              className="w-5 h-5 flex items-center justify-center text-emerald-400"
                              whileTap={{
                                scale: 0.9
                              }}
                              onClick={() => updateQty(product.id, 1)}>
                              
                                <Plus className="w-3 h-3" />
                              </motion.button>
                            </div>
                          }
                        </div>
                      </div>
                    </motion.div>);

                })}
              </div>
            </div>);

        })}
      </div>

      {/* Reviews */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Reviews</h2>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold">4.9</span>
            <span className="text-xs text-gray-500">(587)</span>
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
            <MapPin className="w-5 h-5 text-emerald-400 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white">
                42 Herbert Macaulay Way, Yaba
              </p>
              <p className="text-xs text-gray-400">
                Open 24 hours • Licensed by PCN
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
        {itemCount > 0 && bookingStep === 0 &&
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
                {itemCount} item{itemCount > 1 ? 's' : ''} in cart
              </span>
              <span className="text-xl font-bold text-emerald-400">
                ₦{subtotal.toLocaleString()}
              </span>
            </div>
            <motion.button
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl text-white font-bold text-base shadow-lg shadow-emerald-500/20"
            onClick={() => setBookingStep(1)}
            whileTap={{
              scale: 0.98
            }}>
            
              Checkout
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
                    {bookingStep === 1 && 'Delivery or Pickup?'}
                    {bookingStep === 2 && 'Your details'}
                    {bookingStep === 3 && 'Order Summary'}
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
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${deliveryMode === 'delivery' ? 'bg-emerald-500/15 border-emerald-500' : 'bg-[#0A0E1A] border-white/10'}`}
                  onClick={() => setDeliveryMode('delivery')}
                  whileTap={{
                    scale: 0.98
                  }}>
                  
                      <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <Truck className="w-7 h-7 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          Home Delivery
                        </h3>
                        <p className="text-xs text-gray-400">
                          30-min delivery within Lagos
                        </p>
                        <p className="text-xs text-emerald-400 mt-1">
                          +₦800 delivery fee
                        </p>
                      </div>
                    </motion.button>
                    <motion.button
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${deliveryMode === 'pickup' ? 'bg-emerald-500/15 border-emerald-500' : 'bg-[#0A0E1A] border-white/10'}`}
                  onClick={() => setDeliveryMode('pickup')}
                  whileTap={{
                    scale: 0.98
                  }}>
                  
                      <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <Store className="w-7 h-7 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          Pickup at Store
                        </h3>
                        <p className="text-xs text-gray-400">
                          Ready in 15 minutes
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          42 Herbert Macaulay Way, Yaba
                        </p>
                      </div>
                    </motion.button>
                    <AnimatePresence>
                      {deliveryMode === 'delivery' &&
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
                            Delivery Address
                          </label>
                          <input
                      type="text"
                      placeholder="Enter your address..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-emerald-500/50 focus:outline-none placeholder:text-gray-500" />
                    
                        </motion.div>
                  }
                    </AnimatePresence>
                    {hasRx && !prescriptionUploaded &&
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                        <p className="text-sm font-semibold text-amber-400 mb-1">
                          Prescription required
                        </p>
                        <p className="text-xs text-gray-400">
                          Your cart contains RX items. Please upload a valid
                          prescription to proceed.
                        </p>
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
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-emerald-500/50 focus:outline-none placeholder:text-gray-500" />
                  
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
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-emerald-500/50 focus:outline-none placeholder:text-gray-500" />
                  
                    </div>
                  </div>
              }

                {bookingStep === 3 &&
              <div className="space-y-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                      <p className="text-sm font-bold text-emerald-400 mb-3">
                        Items
                      </p>
                      <div className="space-y-2">
                        {cartItems.map(({ product, qty }) =>
                    <div
                      key={product.id}
                      className="flex justify-between text-sm">
                      
                            <span className="text-gray-300">
                              {product.name} × {qty}
                            </span>
                            <span className="text-white font-semibold">
                              ₦{(product.price * qty).toLocaleString()}
                            </span>
                          </div>
                    )}
                        {deliveryMode === 'delivery' &&
                    <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Delivery Fee</span>
                            <span className="text-white font-semibold">
                              ₦800
                            </span>
                          </div>
                    }
                        <div className="pt-2 border-t border-emerald-500/30 flex justify-between">
                          <span className="font-bold text-white">Total</span>
                          <span className="font-bold text-emerald-400">
                            ₦
                            {(
                        subtotal + (deliveryMode === 'delivery' ? 800 : 0)).
                        toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#0A0E1A] rounded-xl p-4 border border-white/10 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Mode</span>
                        <span className="text-white font-semibold">
                          {deliveryMode === 'delivery' ?
                      'Home Delivery' :
                      'Store Pickup'}
                        </span>
                      </div>
                      {deliveryMode === 'delivery' && address &&
                  <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Address</span>
                          <span className="text-white font-semibold text-right max-w-[60%]">
                            {address}
                          </span>
                        </div>
                  }
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

                {bookingStep === 4 &&
              <div className="flex flex-col items-center justify-center text-center py-8">
                    <motion.div
                  className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6"
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
                  
                      <CheckCircle className="w-12 h-12 text-emerald-400" />
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
                  
                      Order Placed!
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
                  
                      CarePoint Pharmacy is preparing your order.
                    </motion.p>
                    <motion.p
                  className="text-emerald-400 font-mono text-sm font-bold mb-8"
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
                      className="flex items-center justify-center gap-2 py-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 font-semibold text-sm"
                      whileTap={{
                        scale: 0.98
                      }}>
                      
                          <MessageCircle className="w-4 h-4" />
                          Pharmacist Chat
                        </motion.button>
                      </div>
                      <motion.button
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl text-white font-bold shadow-lg"
                    onClick={() => {
                      setBookingStep(0);
                      setCart({});
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
                className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg ${bookingStep === 3 ? 'bg-gradient-to-r from-emerald-500 to-green-600' : 'bg-emerald-500'}`}
                onClick={() =>
                bookingStep === 3 ?
                setBookingStep(4) :
                setBookingStep(bookingStep + 1)
                }
                whileTap={{
                  scale: 0.98
                }}>
                
                    {bookingStep === 3 ? 'Place Order' : 'Continue'}
                  </motion.button>
                </div>
            }
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}