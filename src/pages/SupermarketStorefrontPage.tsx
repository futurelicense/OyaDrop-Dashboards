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
  Truck,
  Store,
  Sparkles,
  Check,
  Navigation,
  Plus,
  Minus,
  ShieldCheck,
  Search,
  ShoppingBasket,
  Clock } from
'lucide-react';
interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: 'Fresh Produce' | 'Pantry' | 'Drinks' | 'Snacks' | 'Household';
  image: string;
}
const mockProducts: Product[] = [
{
  id: 'g1',
  name: 'Tomatoes',
  price: 1200,
  unit: 'per basket',
  category: 'Fresh Produce',
  image:
  'https://images.unsplash.com/photo-1546470427-227df1e3c0c2?w=300&h=300&fit=crop'
},
{
  id: 'g2',
  name: 'Bell Peppers',
  price: 1500,
  unit: 'per pack',
  category: 'Fresh Produce',
  image:
  'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=300&fit=crop'
},
{
  id: 'g3',
  name: 'Bananas',
  price: 800,
  unit: 'per bunch',
  category: 'Fresh Produce',
  image:
  'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop'
},
{
  id: 'g4',
  name: 'Onions',
  price: 1000,
  unit: 'per kg',
  category: 'Fresh Produce',
  image:
  'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop'
},
{
  id: 'g5',
  name: 'Rice (5kg)',
  price: 8500,
  unit: 'per bag',
  category: 'Pantry',
  image:
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop'
},
{
  id: 'g6',
  name: 'Vegetable Oil',
  price: 6500,
  unit: '5L bottle',
  category: 'Pantry',
  image:
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop'
},
{
  id: 'g7',
  name: 'Spaghetti',
  price: 1200,
  unit: '500g',
  category: 'Pantry',
  image:
  'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=300&h=300&fit=crop'
},
{
  id: 'g8',
  name: 'Sugar (1kg)',
  price: 1500,
  unit: 'per pack',
  category: 'Pantry',
  image:
  'https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=300&h=300&fit=crop'
},
{
  id: 'g9',
  name: 'Coca-Cola (PET)',
  price: 600,
  unit: '50cl bottle',
  category: 'Drinks',
  image:
  'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=300&fit=crop'
},
{
  id: 'g10',
  name: 'Bottled Water',
  price: 200,
  unit: '75cl bottle',
  category: 'Drinks',
  image:
  'https://images.unsplash.com/photo-1560847468-5eef330a8f0c?w=300&h=300&fit=crop'
},
{
  id: 'g11',
  name: 'Hollandia Yogurt',
  price: 1800,
  unit: '1L',
  category: 'Drinks',
  image:
  'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop'
},
{
  id: 'g12',
  name: 'Plantain Chips',
  price: 500,
  unit: 'per pack',
  category: 'Snacks',
  image:
  'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&h=300&fit=crop'
},
{
  id: 'g13',
  name: 'Biscuits',
  price: 350,
  unit: 'per pack',
  category: 'Snacks',
  image:
  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop'
},
{
  id: 'g14',
  name: 'Detergent',
  price: 2200,
  unit: '1kg',
  category: 'Household',
  image:
  'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&h=300&fit=crop'
},
{
  id: 'g15',
  name: 'Toilet Roll (10pk)',
  price: 3500,
  unit: 'pack of 10',
  category: 'Household',
  image:
  'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&h=300&fit=crop'
}];

const mockReviews = [
{
  id: 1,
  name: 'Mrs. Adeola',
  rating: 5,
  date: '2 days ago',
  text: 'Fresh produce and delivered within 1 hour. My weekly go-to.',
  image:
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
},
{
  id: 2,
  name: 'Ifeanyi K.',
  rating: 5,
  date: '6 days ago',
  text: 'Great prices and the substitution suggestions when items were out worked perfectly.',
  image:
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
},
{
  id: 3,
  name: 'Hauwa B.',
  rating: 4,
  date: '2 weeks ago',
  text: 'Good variety. Delivery was slightly delayed but they communicated.',
  image:
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop'
},
{
  id: 4,
  name: 'Mr. Olu',
  rating: 5,
  date: '3 weeks ago',
  text: 'Better than going to the market myself. Same prices, less stress.',
  image:
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
}];

interface SupermarketStorefrontPageProps {
  onBack: () => void;
}
export function SupermarketStorefrontPage({
  onBack
}: SupermarketStorefrontPageProps) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [bookingStep, setBookingStep] = useState(0);
  const [deliveryMode, setDeliveryMode] = useState<
    'delivery' | 'pickup' | null>(
    null);
  const [address, setAddress] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
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
  const categories = [
  'All',
  'Fresh Produce',
  'Pantry',
  'Drinks',
  'Snacks',
  'Household'];

  const filteredProducts = mockProducts.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.
    toLowerCase().
    includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });
  const handleShare = () => {
    navigator.clipboard?.writeText('https://oyadrop.com/supermarket/freshmart');
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };
  const bookingRef = `OYA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const deliveryFee = 1200;
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
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-semibold text-gray-400">
            Powered by OyaDrop
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative">
        <div className="h-48 w-full bg-gray-800">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop"
            alt="Supermarket"
            className="w-full h-full object-cover opacity-80" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] to-transparent" />
        </div>
        <div className="px-4 -mt-16 relative z-10">
          <div className="flex justify-between items-end mb-3">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-[#0A0E1A] bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <ShoppingBasket className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#0A0E1A]" />
            </div>
            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Open Now
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">FreshMart Supermarket</h1>
            <ShieldCheck className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-gray-400 text-sm mb-3">
            Groceries, fresh produce, and household essentials — delivered fast
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold">4.8</span>
              <span className="text-gray-500">(826)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>Ikeja, Lagos</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Truck className="w-4 h-4" />
              <span>60-min delivery</span>
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
              
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-orange-400" />
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

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search for groceries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#131B2E] border border-white/10 text-white pl-11 pr-4 py-3 rounded-xl focus:border-orange-500/50 focus:outline-none placeholder:text-gray-500" />
          
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) =>
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${activeCategory === cat ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-[#131B2E] border-white/10 text-gray-400'}`}
            whileTap={{
              scale: 0.95
            }}>
            
              {cat}
            </motion.button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 mb-8">
        {filteredProducts.length === 0 ?
        <div className="text-center py-12 text-gray-500 text-sm">
            No products found
          </div> :

        <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product, index) => {
            const qty = cart[product.id] || 0;
            return (
              <motion.div
                key={product.id}
                className={`bg-[#131B2E] rounded-xl border-2 overflow-hidden transition-all ${qty > 0 ? 'border-orange-500' : 'border-white/10'}`}
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.02
                }}>
                
                  <div className="relative h-28 bg-gray-800">
                    <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover" />
                  
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-white mb-1 line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 mb-2">
                      {product.unit}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-orange-400">
                        ₦{product.price.toLocaleString()}
                      </span>
                      {qty === 0 ?
                    <motion.button
                      className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center"
                      whileTap={{
                        scale: 0.9
                      }}
                      onClick={() => updateQty(product.id, 1)}>
                      
                          <Plus className="w-4 h-4" />
                        </motion.button> :

                    <div className="flex items-center gap-1.5 bg-orange-500/20 rounded-lg px-1.5 py-0.5">
                          <motion.button
                        className="w-5 h-5 flex items-center justify-center text-orange-400"
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
                        className="w-5 h-5 flex items-center justify-center text-orange-400"
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
        }
      </div>

      {/* Reviews */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Reviews</h2>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold">4.8</span>
            <span className="text-xs text-gray-500">(826)</span>
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
            <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white">
                28 Allen Avenue, Ikeja
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" /> Open daily 7:00 AM - 10:00 PM
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
                {itemCount} item{itemCount > 1 ? 's' : ''} in basket
              </span>
              <span className="text-xl font-bold text-orange-400">
                ₦{subtotal.toLocaleString()}
              </span>
            </div>
            <motion.button
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-bold text-base shadow-lg shadow-orange-500/20"
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
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${deliveryMode === 'delivery' ? 'bg-orange-500/15 border-orange-500' : 'bg-[#0A0E1A] border-white/10'}`}
                  onClick={() => setDeliveryMode('delivery')}
                  whileTap={{
                    scale: 0.98
                  }}>
                  
                      <div className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center">
                        <Truck className="w-7 h-7 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          Home Delivery
                        </h3>
                        <p className="text-xs text-gray-400">
                          60-min delivery within Lagos
                        </p>
                        <p className="text-xs text-orange-400 mt-1">
                          +₦{deliveryFee.toLocaleString()} delivery fee
                        </p>
                      </div>
                    </motion.button>
                    <motion.button
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${deliveryMode === 'pickup' ? 'bg-orange-500/15 border-orange-500' : 'bg-[#0A0E1A] border-white/10'}`}
                  onClick={() => setDeliveryMode('pickup')}
                  whileTap={{
                    scale: 0.98
                  }}>
                  
                      <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center">
                        <Store className="w-7 h-7 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          Pickup at Store
                        </h3>
                        <p className="text-xs text-gray-400">
                          Ready in 30 minutes
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          28 Allen Avenue, Ikeja
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
                      className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-orange-500/50 focus:outline-none placeholder:text-gray-500" />
                    
                        </motion.div>
                  }
                    </AnimatePresence>
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
                        Substitution preferences (optional)
                      </label>
                      <textarea
                    placeholder="If an item is out of stock, what should we substitute?"
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-orange-500/50 focus:outline-none placeholder:text-gray-500 resize-none" />
                  
                    </div>
                  </div>
              }

                {bookingStep === 3 &&
              <div className="space-y-4">
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                      <p className="text-sm font-bold text-orange-400 mb-3">
                        Basket ({itemCount} items)
                      </p>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {cartItems.map(({ product, qty }) =>
                    <div
                      key={product.id}
                      className="flex justify-between text-sm">
                      
                            <span className="text-gray-300 flex-1">
                              {product.name} × {qty}
                            </span>
                            <span className="text-white font-semibold">
                              ₦{(product.price * qty).toLocaleString()}
                            </span>
                          </div>
                    )}
                      </div>
                      <div className="pt-3 mt-2 border-t border-orange-500/30 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Subtotal</span>
                          <span className="text-white">
                            ₦{subtotal.toLocaleString()}
                          </span>
                        </div>
                        {deliveryMode === 'delivery' &&
                    <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Delivery</span>
                            <span className="text-white">
                              ₦{deliveryFee.toLocaleString()}
                            </span>
                          </div>
                    }
                        <div className="flex justify-between text-sm pt-1 border-t border-orange-500/20">
                          <span className="font-bold text-white">Total</span>
                          <span className="font-bold text-orange-400">
                            ₦
                            {(
                        subtotal + (
                        deliveryMode === 'delivery' ? deliveryFee : 0)).
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
                  
                      FreshMart is preparing your basket.
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
                      className="flex items-center justify-center gap-2 py-3 bg-orange-500/20 border border-orange-500/30 rounded-xl text-orange-400 font-semibold text-sm"
                      whileTap={{
                        scale: 0.98
                      }}>
                      
                          <MessageCircle className="w-4 h-4" />
                          OyaDrop Chat
                        </motion.button>
                      </div>
                      <motion.button
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-bold shadow-lg"
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
                className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg ${bookingStep === 3 ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-orange-500'}`}
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