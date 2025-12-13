import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, ShoppingCart, Plus, Minus, X, MapPin, Clock, CheckCircle, Leaf, Zap, Award, Star, Store, TrendingUp } from 'lucide-react';
interface Vendor {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  distance: string;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  badge?: 'Fast' | 'Popular' | 'New';
}
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  inStock: boolean;
  discount?: number;
  badge?: 'Fresh' | 'Organic' | 'Sale';
  vendorId: string;
}
interface CartItem extends Product {
  quantity: number;
}
const mockVendors: Vendor[] = [{
  id: '1',
  name: 'FreshMart',
  logo: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=200&fit=crop',
  rating: 4.8,
  reviews: 1234,
  distance: '1.2 km',
  deliveryTime: '20-30 min',
  deliveryFee: 500,
  minOrder: 2000,
  badge: 'Popular'
}, {
  id: '2',
  name: 'QuickShop',
  logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200&h=200&fit=crop',
  rating: 4.9,
  reviews: 892,
  distance: '0.8 km',
  deliveryTime: '15-25 min',
  deliveryFee: 300,
  minOrder: 1500,
  badge: 'Fast'
}, {
  id: '3',
  name: 'GreenGrocer',
  logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop',
  rating: 4.7,
  reviews: 567,
  distance: '2.5 km',
  deliveryTime: '30-40 min',
  deliveryFee: 600,
  minOrder: 2500,
  badge: 'New'
}, {
  id: '4',
  name: 'MegaMart',
  logo: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=200&h=200&fit=crop',
  rating: 4.6,
  reviews: 2103,
  distance: '1.8 km',
  deliveryTime: '25-35 min',
  deliveryFee: 500,
  minOrder: 3000
}];
const mockProducts: Product[] = [{
  id: '1',
  name: 'Fresh Tomatoes',
  description: 'Locally sourced, ripe tomatoes',
  price: 500,
  unit: 'per kg',
  image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400&h=400&fit=crop',
  category: 'Vegetables',
  inStock: true,
  badge: 'Fresh',
  vendorId: '1'
}, {
  id: '2',
  name: 'White Rice',
  description: 'Premium long grain rice',
  price: 2500,
  unit: '5kg bag',
  image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
  category: 'Grains',
  inStock: true,
  vendorId: '1'
}, {
  id: '3',
  name: 'Fresh Eggs',
  description: 'Farm fresh eggs',
  price: 1200,
  unit: 'per crate',
  image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop',
  category: 'Dairy',
  inStock: true,
  badge: 'Fresh',
  vendorId: '2'
}, {
  id: '4',
  name: 'Organic Spinach',
  description: 'Fresh organic spinach',
  price: 800,
  unit: 'per bunch',
  image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop',
  category: 'Vegetables',
  inStock: true,
  badge: 'Organic',
  vendorId: '2'
}, {
  id: '5',
  name: 'Whole Wheat Bread',
  description: 'Freshly baked daily',
  price: 600,
  unit: 'per loaf',
  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
  category: 'Bakery',
  inStock: true,
  badge: 'Fresh',
  vendorId: '3'
}, {
  id: '6',
  name: 'Fresh Milk',
  description: 'Full cream milk',
  price: 900,
  unit: '1 liter',
  image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
  category: 'Dairy',
  inStock: true,
  vendorId: '3'
}, {
  id: '7',
  name: 'Chicken Breast',
  description: 'Fresh boneless chicken',
  price: 1800,
  unit: 'per kg',
  image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop',
  category: 'Meat',
  inStock: true,
  badge: 'Fresh',
  vendorId: '4'
}, {
  id: '8',
  name: 'Bananas',
  description: 'Sweet ripe bananas',
  price: 400,
  unit: 'per bunch',
  image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
  category: 'Fruits',
  inStock: true,
  discount: 10,
  vendorId: '4'
}];
const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Meat', 'Bakery'];
const badgeConfig = {
  Fresh: {
    icon: Leaf,
    color: '#10B981',
    bg: '#10B98120'
  },
  Organic: {
    icon: Award,
    color: '#8B5CF6',
    bg: '#8B5CF620'
  },
  Sale: {
    icon: Zap,
    color: '#EF4444',
    bg: '#EF444420'
  }
};
const vendorBadgeConfig = {
  Fast: {
    color: '#00D9C0',
    bg: '#00D9C020',
    label: '⚡ Fast'
  },
  Popular: {
    color: '#FFB800',
    bg: '#FFB80020',
    label: '🔥 Popular'
  },
  New: {
    color: '#B026FF',
    bg: '#B026FF20',
    label: '✨ New'
  }
};
interface SupermarketCustomerPageProps {
  onBack: () => void;
  initialRequest?: any;
}
export function SupermarketCustomerPage({
  onBack,
  initialRequest
}: SupermarketCustomerPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('asap');
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesVendor = !selectedVendor || product.vendorId === selectedVendor;
    return matchesSearch && matchesCategory && matchesVendor;
  });
  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? {
        ...item,
        quantity: item.quantity + 1
      } : item));
    } else {
      setCart([...cart, {
        ...product,
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
  const currentVendor = selectedVendor ? mockVendors.find(v => v.id === selectedVendor) : mockVendors[0];
  const deliveryFee = currentVendor?.deliveryFee || 500;
  const handlePlaceOrder = () => {
    setShowCheckout(false);
    setShowConfirmation(true);
  };
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
              <h1 className="text-xl font-bold text-white">Supermarket</h1>
              <p className="text-xs text-gray-400">Fresh groceries delivered</p>
            </div>
          </div>
          <motion.button className="relative p-3 rounded-xl bg-green-500/20 border border-green-500/30" onClick={() => setShowCart(true)} whileTap={{
          scale: 0.95
        }}>
            <ShoppingCart className="w-5 h-5 text-green-400" />
            {cartItemCount > 0 && <motion.span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full text-white text-xs font-bold flex items-center justify-center" initial={{
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
            <input type="text" placeholder="Search groceries..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-[#131B2E] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-green-500/50 focus:outline-none placeholder:text-gray-500" />
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {categories.map(category => <motion.button key={category} className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${selectedCategory === category ? 'bg-green-500 text-white' : 'bg-[#131B2E] text-gray-400 border border-white/10'}`} onClick={() => setSelectedCategory(category)} whileTap={{
            scale: 0.95
          }}>
                {category}
              </motion.button>)}
          </div>
        </div>
      </div>

      {/* Vendors Section */}
      <div className="px-4 py-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Choose Vendor</h2>
            <p className="text-xs text-gray-400">
              Select your preferred supermarket
            </p>
          </div>
          {selectedVendor && <motion.button className="text-sm text-green-400 font-semibold" onClick={() => setSelectedVendor(null)} whileTap={{
          scale: 0.95
        }}>
              View All
            </motion.button>}
        </div>

        <div className="space-y-3">
          {mockVendors.map((vendor, index) => {
          const isSelected = selectedVendor === vendor.id;
          const badge = vendor.badge ? vendorBadgeConfig[vendor.badge] : null;
          return <motion.button key={vendor.id} className={`w-full bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border-2 transition-all text-left ${isSelected ? 'border-green-500 bg-green-500/10' : 'border-white/10'}`} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: index * 0.05
          }} onClick={() => setSelectedVendor(vendor.id)} whileTap={{
            scale: 0.98
          }}>
                <div className="flex items-center gap-4">
                  {/* Logo */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover" />
                    {isSelected && <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      </div>}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-white">
                        {vendor.name}
                      </h3>
                      {badge && <span className="text-xs font-bold px-2 py-0.5 rounded-lg" style={{
                    backgroundColor: badge.bg,
                    color: badge.color
                  }}>
                          {badge.label}
                        </span>}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold text-white">
                          {vendor.rating}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({vendor.reviews})
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-400">
                        {vendor.distance}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{vendor.deliveryTime}</span>
                      </div>
                      <span className="text-gray-500">•</span>
                      <span className="text-green-400 font-semibold">
                        ₦{vendor.deliveryFee} delivery
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  {isSelected && <motion.div initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: 'spring',
                damping: 15
              }}>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </motion.div>}
                </div>
              </motion.button>;
        })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">
            {selectedVendor ? `${mockVendors.find(v => v.id === selectedVendor)?.name} Products` : 'All Products'}
          </h2>
          <span className="text-sm text-gray-400">
            {filteredProducts.length} items
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pb-24">
          {filteredProducts.map((product, index) => {
          const badge = product.badge ? badgeConfig[product.badge] : null;
          const BadgeIcon = badge?.icon;
          return <motion.div key={product.id} className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl overflow-hidden border border-white/10" initial={{
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
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {badge && BadgeIcon && <div className="absolute top-2 left-2 flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg" style={{
                backgroundColor: badge.bg,
                color: badge.color
              }}>
                      <BadgeIcon className="w-3 h-3" />
                      {product.badge}
                    </div>}
                  {product.discount && <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                      -{product.discount}%
                    </div>}
                  {!product.inStock && <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        Out of Stock
                      </span>
                    </div>}
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-lg font-bold text-green-400">
                        ₦{product.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">{product.unit}</p>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <motion.button className="w-full py-2 bg-green-500 rounded-xl text-white font-semibold text-sm disabled:opacity-50 flex items-center justify-center gap-2" onClick={() => addToCart(product)} disabled={!product.inStock} whileTap={{
                scale: 0.95
              }}>
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>;
        })}
        </div>
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
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-600 rounded-full" />
              </div>

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
                          <p className="text-xs text-gray-400 mb-1">
                            {item.unit}
                          </p>
                          <p className="text-lg font-bold text-green-400">
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

              {cart.length > 0 && <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white font-semibold">
                      ₦{cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Delivery</span>
                    <span className="text-white font-semibold">
                      ₦{deliveryFee}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-green-400">
                      ₦{(cartTotal + deliveryFee).toLocaleString()}
                    </span>
                  </div>
                  <motion.button className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl text-white font-bold shadow-lg" onClick={() => {
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
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                    <input type="text" placeholder="Enter delivery address" value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} className="w-full bg-[#0A0E1A] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-green-500/50 focus:outline-none placeholder:text-gray-500" />
                  </div>
                  <button className="text-sm text-green-400 font-semibold mt-2">
                    📍 Use current location
                  </button>
                </div>

                {/* Delivery Time */}
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-3 block">
                    Delivery Time
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[{
                  value: 'asap',
                  label: 'ASAP',
                  time: currentVendor?.deliveryTime || '30-45 min'
                }, {
                  value: 'scheduled',
                  label: 'Schedule',
                  time: 'Pick time'
                }].map(option => <motion.button key={option.value} className={`p-3 rounded-xl border-2 transition-all ${deliveryTime === option.value ? 'bg-green-500/20 border-green-500' : 'bg-[#0A0E1A] border-white/10'}`} onClick={() => setDeliveryTime(option.value)} whileTap={{
                  scale: 0.98
                }}>
                        <Clock className={`w-5 h-5 mx-auto mb-1 ${deliveryTime === option.value ? 'text-green-400' : 'text-gray-400'}`} />
                        <p className={`text-sm font-semibold ${deliveryTime === option.value ? 'text-white' : 'text-gray-400'}`}>
                          {option.label}
                        </p>
                        <p className="text-xs text-gray-500">{option.time}</p>
                      </motion.button>)}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <p className="text-sm font-bold text-green-400 mb-3">
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
                      <span className="text-white">₦{deliveryFee}</span>
                    </div>
                    <div className="pt-2 border-t border-green-500/30 flex justify-between">
                      <span className="font-bold text-white">Total</span>
                      <span className="font-bold text-green-400">
                        ₦{(cartTotal + deliveryFee).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A]">
                <motion.button className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2" whileTap={{
              scale: 0.98
            }} onClick={handlePlaceOrder}>
                  <CheckCircle className="w-5 h-5" />
                  Place Order
                </motion.button>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>

      {/* Confirmation Sheet */}
      <AnimatePresence>
        {showConfirmation && <>
            <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} />
            <motion.div className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl max-h-[70vh] flex flex-col" initial={{
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

              <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center justify-center text-center">
                <motion.div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6" initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              type: 'spring',
              damping: 15,
              delay: 0.1
            }}>
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </motion.div>

                <motion.h3 className="text-2xl font-bold text-white mb-3" initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }}>
                  Order Placed Successfully!
                </motion.h3>

                <motion.p className="text-gray-400 mb-2 max-w-sm" initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }}>
                  Your groceries from {currentVendor?.name} will be delivered in{' '}
                  {currentVendor?.deliveryTime}
                </motion.p>

                <motion.div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-8 w-full max-w-sm" initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }}>
                  <p className="text-sm text-green-400 mb-2">
                    Order #OYA-{Math.floor(Math.random() * 10000)}
                  </p>
                  <p className="text-xs text-gray-400">
                    Track your order in real-time
                  </p>
                </motion.div>

                <motion.button className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl text-white font-bold shadow-lg" onClick={onBack} whileTap={{
              scale: 0.98
            }} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5
            }}>
                  Back to Home
                </motion.button>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </div>;
}