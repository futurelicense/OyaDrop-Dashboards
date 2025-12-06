import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, ShoppingCart, Pill, Upload, Filter, Star, Plus, Minus, X, MapPin, Clock, CheckCircle } from 'lucide-react';
interface Medication {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  inStock: boolean;
  requiresPrescription: boolean;
  category: string;
}
interface CartItem extends Medication {
  quantity: number;
}
const mockMedications: Medication[] = [{
  id: '1',
  name: 'Paracetamol 500mg',
  description: 'Pain relief & fever reducer',
  price: 500,
  image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
  rating: 4.8,
  inStock: true,
  requiresPrescription: false,
  category: 'Pain Relief'
}, {
  id: '2',
  name: 'Amoxicillin 250mg',
  description: 'Antibiotic for infections',
  price: 1200,
  image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  rating: 4.9,
  inStock: true,
  requiresPrescription: true,
  category: 'Antibiotics'
}, {
  id: '3',
  name: 'Vitamin C 1000mg',
  description: 'Immune system support',
  price: 800,
  image: 'https://images.unsplash.com/photo-1550572017-4a6e8d8a1b88?w=400&h=400&fit=crop',
  rating: 4.7,
  inStock: true,
  requiresPrescription: false,
  category: 'Vitamins'
}, {
  id: '4',
  name: 'Ibuprofen 400mg',
  description: 'Anti-inflammatory pain relief',
  price: 600,
  image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
  rating: 4.6,
  inStock: true,
  requiresPrescription: false,
  category: 'Pain Relief'
}, {
  id: '5',
  name: 'Omeprazole 20mg',
  description: 'Acid reflux treatment',
  price: 900,
  image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop',
  rating: 4.8,
  inStock: true,
  requiresPrescription: true,
  category: 'Digestive'
}, {
  id: '6',
  name: 'Multivitamin Complex',
  description: 'Daily nutritional supplement',
  price: 1500,
  image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
  rating: 4.9,
  inStock: true,
  requiresPrescription: false,
  category: 'Vitamins'
}];
const categories = ['All', 'Pain Relief', 'Antibiotics', 'Vitamins', 'Digestive', 'First Aid'];
interface PharmacyCustomerPageProps {
  onBack: () => void;
  initialRequest?: any;
}
export function PharmacyCustomerPage({
  onBack,
  initialRequest
}: PharmacyCustomerPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const filteredMedications = mockMedications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) || med.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const addToCart = (medication: Medication) => {
    const existing = cart.find(item => item.id === medication.id);
    if (existing) {
      setCart(cart.map(item => item.id === medication.id ? {
        ...item,
        quantity: item.quantity + 1
      } : item));
    } else {
      setCart([...cart, {
        ...medication,
        quantity: 1
      }]);
    }
  };
  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? {
          ...item,
          quantity: newQuantity
        } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };
  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const hasPrescriptionItems = cart.some(item => item.requiresPrescription);
  return <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0A0E1A]/95 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={onBack} whileTap={{
            scale: 0.95
          }}>
              <ArrowLeft className="w-6 h-6 text-white" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold text-white">Pharmacy</h1>
              <p className="text-xs text-gray-400">Order medications</p>
            </div>
          </div>
          <motion.button className="relative p-3 rounded-xl bg-purple-500/20 border border-purple-500/30" onClick={() => setShowCart(true)} whileTap={{
          scale: 0.95
        }}>
            <ShoppingCart className="w-5 h-5 text-purple-400" />
            {cartItemCount > 0 && <motion.span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full text-white text-xs font-bold flex items-center justify-center" initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            type: 'spring',
            damping: 15
          }}>
                {cartItemCount}
              </motion.span>}
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search medications..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-[#131B2E] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none placeholder:text-gray-500" />
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {categories.map(category => <motion.button key={category} className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${selectedCategory === category ? 'bg-purple-500 text-white' : 'bg-[#131B2E] text-gray-400 border border-white/10'}`} onClick={() => setSelectedCategory(category)} whileTap={{
            scale: 0.95
          }}>
                {category}
              </motion.button>)}
          </div>
        </div>
      </div>

      {/* Prescription Upload Banner */}
      {hasPrescriptionItems && !showPrescriptionUpload && <motion.div className="mx-4 mt-4 bg-purple-500/10 border border-purple-500/30 rounded-xl p-4" initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
          <div className="flex items-start gap-3">
            <Upload className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-purple-400 mb-1">
                Prescription Required
              </p>
              <p className="text-xs text-gray-400 mb-3">
                Some items in your cart require a prescription
              </p>
              <motion.button className="text-sm font-bold text-purple-400" onClick={() => setShowPrescriptionUpload(true)} whileTap={{
            scale: 0.95
          }}>
                Upload Prescription →
              </motion.button>
            </div>
          </div>
        </motion.div>}

      {/* Medications Grid */}
      <div className="p-4 grid grid-cols-2 gap-3 pb-24">
        {filteredMedications.map((medication, index) => <motion.div key={medication.id} className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl overflow-hidden border border-white/10" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.05
      }}>
            {/* Image */}
            <div className="relative aspect-square bg-[#0A0E1A]">
              <img src={medication.image} alt={medication.name} className="w-full h-full object-cover" />
              {medication.requiresPrescription && <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  Rx
                </div>}
              {!medication.inStock && <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold">Out of Stock</span>
                </div>}
            </div>

            {/* Content */}
            <div className="p-3">
              <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">
                {medication.name}
              </h3>
              <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                {medication.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-white font-semibold">
                  {medication.rating}
                </span>
              </div>

              {/* Price & Add */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-purple-400">
                  ₦{medication.price.toLocaleString()}
                </span>
                <motion.button className="p-2 bg-purple-500 rounded-xl disabled:opacity-50" onClick={() => addToCart(medication)} disabled={!medication.inStock} whileTap={{
              scale: 0.9
            }}>
                  <Plus className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>)}
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {showCart && <>
            <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setShowCart(false)} />
            <motion.div className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl max-h-[80vh] flex flex-col" initial={{
          y: '100%'
        }} animate={{
          y: 0
        }} exit={{
          y: '100%'
        }} transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300
        }}>
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-600 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">
                  Your Cart ({cartItemCount})
                </h2>
                <motion.button className="p-2 rounded-xl hover:bg-white/5" onClick={() => setShowCart(false)} whileTap={{
              scale: 0.95
            }}>
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cart.length === 0 ? <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Your cart is empty</p>
                  </div> : <div className="space-y-3">
                    {cart.map(item => <motion.div key={item.id} className="bg-[#0A0E1A]/50 rounded-xl p-3 flex items-center gap-3" layout>
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-white mb-1">
                            {item.name}
                          </h3>
                          <p className="text-lg font-bold text-purple-400">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button className="p-1 bg-white/10 rounded-lg" onClick={() => updateQuantity(item.id, -1)} whileTap={{
                    scale: 0.9
                  }}>
                            <Minus className="w-4 h-4 text-white" />
                          </motion.button>
                          <span className="text-white font-bold w-8 text-center">
                            {item.quantity}
                          </span>
                          <motion.button className="p-1 bg-white/10 rounded-lg" onClick={() => updateQuantity(item.id, 1)} whileTap={{
                    scale: 0.9
                  }}>
                            <Plus className="w-4 h-4 text-white" />
                          </motion.button>
                        </div>
                      </motion.div>)}
                  </div>}
              </div>

              {/* Footer */}
              {cart.length > 0 && <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white font-semibold">
                      ₦{cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Delivery</span>
                    <span className="text-white font-semibold">₦500</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-purple-400">
                      ₦{(cartTotal + 500).toLocaleString()}
                    </span>
                  </div>
                  <motion.button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold shadow-lg" onClick={() => {
              setShowCart(false);
              setShowCheckout(true);
            }} whileTap={{
              scale: 0.98
            }}>
                    Proceed to Checkout
                  </motion.button>
                </div>}
            </motion.div>
          </>}
      </AnimatePresence>

      {/* Checkout Sheet */}
      <AnimatePresence>
        {showCheckout && <>
            <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setShowCheckout(false)} />
            <motion.div className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl max-h-[85vh] flex flex-col" initial={{
          y: '100%'
        }} animate={{
          y: 0
        }} exit={{
          y: '100%'
        }} transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300
        }}>
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-600 rounded-full" />
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">Checkout</h2>
                <motion.button className="p-2 rounded-xl hover:bg-white/5" onClick={() => setShowCheckout(false)} whileTap={{
              scale: 0.95
            }}>
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {/* Delivery Address */}
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-2 block">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                    <input type="text" placeholder="Enter delivery address" value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} className="w-full bg-[#0A0E1A] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none placeholder:text-gray-500" />
                  </div>
                </div>

                {/* Delivery Time */}
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-3 block">
                    Delivery Time
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['ASAP (30 min)', 'Schedule Later'].map(option => <motion.button key={option} className="p-3 rounded-xl border-2 border-purple-500/30 bg-purple-500/10 text-white font-semibold" whileTap={{
                  scale: 0.98
                }}>
                        <Clock className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                        <p className="text-xs">{option}</p>
                      </motion.button>)}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                  <p className="text-sm font-bold text-purple-400 mb-3">
                    Order Summary
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        Items ({cartItemCount})
                      </span>
                      <span className="text-white">
                        ₦{cartTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Delivery</span>
                      <span className="text-white">₦500</span>
                    </div>
                    <div className="pt-2 border-t border-purple-500/30 flex justify-between">
                      <span className="font-bold text-white">Total</span>
                      <span className="font-bold text-purple-400">
                        ₦{(cartTotal + 500).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A]">
                <motion.button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2" whileTap={{
              scale: 0.98
            }} onClick={() => {
              setShowCheckout(false);
              // Show success and navigate
              onBack();
            }}>
                  <CheckCircle className="w-5 h-5" />
                  Place Order
                </motion.button>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </div>;
}