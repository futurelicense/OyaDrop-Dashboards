import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Shirt, Calendar, Clock, MapPin, CheckCircle, X, Plus, Minus, Package, Sparkles, Zap, Star, Phone } from 'lucide-react';
interface LaundryService {
  id: string;
  name: string;
  icon: string;
  description: string;
  price: number;
  unit: string;
  duration: string;
  badge?: 'Popular' | 'Express' | 'Premium';
}
interface LaundryProvider {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  distance: string;
  pickupTime: string;
  verified: boolean;
}
interface ServiceItem extends LaundryService {
  quantity: number;
}
const laundryServices: LaundryService[] = [{
  id: '1',
  name: 'Wash Only',
  icon: '💧',
  description: 'Basic washing service',
  price: 500,
  unit: 'per kg',
  duration: '24 hours'
}, {
  id: '2',
  name: 'Wash & Iron',
  icon: '👔',
  description: 'Wash and iron service',
  price: 800,
  unit: 'per kg',
  duration: '24 hours',
  badge: 'Popular'
}, {
  id: '3',
  name: 'Dry Clean',
  icon: '✨',
  description: 'Professional dry cleaning',
  price: 1500,
  unit: 'per item',
  duration: '48 hours',
  badge: 'Premium'
}, {
  id: '4',
  name: 'Express Service',
  icon: '⚡',
  description: 'Same day service',
  price: 1200,
  unit: 'per kg',
  duration: '6 hours',
  badge: 'Express'
}, {
  id: '5',
  name: 'Ironing Only',
  icon: '🔥',
  description: 'Professional ironing',
  price: 400,
  unit: 'per kg',
  duration: '12 hours'
}, {
  id: '6',
  name: 'Stain Removal',
  icon: '🧼',
  description: 'Specialized stain treatment',
  price: 1000,
  unit: 'per item',
  duration: '24 hours'
}];
const mockProviders: LaundryProvider[] = [{
  id: '1',
  name: 'CleanPro Laundry',
  logo: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=200&h=200&fit=crop',
  rating: 4.9,
  reviews: 456,
  distance: '1.2 km',
  pickupTime: 'Today at 3:00 PM',
  verified: true
}, {
  id: '2',
  name: 'Fresh & Clean',
  logo: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200&h=200&fit=crop',
  rating: 4.8,
  reviews: 312,
  distance: '0.8 km',
  pickupTime: 'Today at 2:00 PM',
  verified: true
}, {
  id: '3',
  name: 'Express Wash',
  logo: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=200&h=200&fit=crop',
  rating: 4.7,
  reviews: 234,
  distance: '2.1 km',
  pickupTime: 'Tomorrow at 10:00 AM',
  verified: true
}];
const badgeConfig = {
  Popular: {
    color: '#FFB800',
    bg: '#FFB80020',
    label: '🔥 Popular'
  },
  Express: {
    color: '#00D9C0',
    bg: '#00D9C020',
    label: '⚡ Express'
  },
  Premium: {
    color: '#B026FF',
    bg: '#B026FF20',
    label: '✨ Premium'
  }
};
interface LaundryCustomerPageProps {
  onBack: () => void;
  initialRequest?: any;
}
export function LaundryCustomerPage({
  onBack,
  initialRequest
}: LaundryCustomerPageProps) {
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<LaundryProvider | null>(null);
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupDate, setPickupDate] = useState('today');
  const [pickupTime, setPickupTime] = useState('morning');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showProviders, setShowProviders] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const addService = (service: LaundryService) => {
    const existing = selectedServices.find(item => item.id === service.id);
    if (existing) {
      setSelectedServices(selectedServices.map(item => item.id === service.id ? {
        ...item,
        quantity: item.quantity + 1
      } : item));
    } else {
      setSelectedServices([...selectedServices, {
        ...service,
        quantity: 1
      }]);
    }
  };
  const updateQuantity = (id: string, delta: number) => {
    setSelectedServices(selectedServices.map(item => {
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
  const totalPrice = selectedServices.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const pickupFee = 300;
  const handleContinue = () => {
    setShowProviders(true);
  };
  const handleSelectProvider = (provider: LaundryProvider) => {
    setSelectedProvider(provider);
    setShowProviders(false);
    setShowCheckout(true);
  };
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
              <h1 className="text-xl font-bold text-white">Laundry Service</h1>
              <p className="text-xs text-gray-400">
                We pick up, clean & deliver
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Selection */}
      <div className="p-4 pb-32">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-2">Select Services</h2>
          <p className="text-sm text-gray-400">Choose the services you need</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {laundryServices.map((service, index) => {
          const badge = service.badge ? badgeConfig[service.badge] : null;
          const isSelected = selectedServices.find(s => s.id === service.id);
          return <motion.button key={service.id} className={`bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border-2 transition-all text-left ${isSelected ? 'border-teal-500 bg-teal-500/10' : 'border-white/10'}`} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.05
          }} onClick={() => addService(service)} whileTap={{
            scale: 0.98
          }}>
                {badge && <div className="text-xs font-bold px-2 py-1 rounded-lg mb-2 inline-block" style={{
              backgroundColor: badge.bg,
              color: badge.color
            }}>
                    {badge.label}
                  </div>}

                <div className="text-3xl mb-2">{service.icon}</div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {service.name}
                </h3>
                <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-teal-400">
                      ₦{service.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{service.unit}</p>
                  </div>
                  {isSelected && <motion.div className="flex items-center gap-2" initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: 'spring',
                damping: 15
              }}>
                      <motion.button className="p-1 bg-white/10 rounded-lg" onClick={e => {
                  e.stopPropagation();
                  updateQuantity(service.id, -1);
                }} whileTap={{
                  scale: 0.9
                }}>
                        <Minus className="w-3 h-3 text-white" />
                      </motion.button>
                      <span className="text-white font-bold w-6 text-center">
                        {isSelected.quantity}
                      </span>
                      <motion.button className="p-1 bg-white/10 rounded-lg" onClick={e => {
                  e.stopPropagation();
                  updateQuantity(service.id, 1);
                }} whileTap={{
                  scale: 0.9
                }}>
                        <Plus className="w-3 h-3 text-white" />
                      </motion.button>
                    </motion.div>}
                </div>
              </motion.button>;
        })}
        </div>

        {/* Selected Services Summary */}
        {selectedServices.length > 0 && <motion.div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 mb-6" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }}>
            <p className="text-sm font-bold text-teal-400 mb-3">
              Selected Services ({selectedServices.length})
            </p>
            <div className="space-y-2 mb-4">
              {selectedServices.map(service => <div key={service.id} className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    {service.icon} {service.name} x{service.quantity}
                  </span>
                  <span className="text-white font-semibold">
                    ₦{(service.price * service.quantity).toLocaleString()}
                  </span>
                </div>)}
            </div>
            <div className="pt-3 border-t border-teal-500/30 flex justify-between">
              <span className="font-bold text-white">Subtotal</span>
              <span className="font-bold text-teal-400">
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>
          </motion.div>}
      </div>

      {/* Fixed Bottom CTA */}
      {selectedServices.length > 0 && <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0A0E1A] border-t border-white/10">
          <motion.button className="w-full py-4 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl text-white font-bold shadow-lg" onClick={handleContinue} whileTap={{
        scale: 0.98
      }}>
            Continue to Provider Selection
          </motion.button>
        </div>}

      {/* Providers Sheet */}
      <AnimatePresence>
        {showProviders && <>
            <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setShowProviders(false)} />
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
                  Choose Provider
                </h2>
                <motion.button className="p-2 rounded-xl hover:bg-white/5" onClick={() => setShowProviders(false)} whileTap={{
              scale: 0.95
            }}>
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
                {mockProviders.map((provider, index) => <motion.button key={provider.id} className="w-full bg-gradient-to-br from-[#0F1520] to-[#0A0E1A] rounded-2xl p-4 border border-white/10 text-left" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: index * 0.05
            }} onClick={() => handleSelectProvider(provider)} whileTap={{
              scale: 0.98
            }}>
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={provider.logo} alt={provider.name} className="w-full h-full object-cover" />
                        {provider.verified && <div className="absolute top-1 right-1 bg-teal-500 rounded-full p-1">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-base font-bold text-white mb-1">
                          {provider.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-bold text-white">
                              {provider.rating}
                            </span>
                            <span className="text-xs text-gray-400">
                              ({provider.reviews})
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">
                            {provider.distance}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-teal-400">
                          <Clock className="w-3 h-3" />
                          <span>{provider.pickupTime}</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>)}
              </div>
            </motion.div>
          </>}
      </AnimatePresence>

      {/* Checkout Sheet */}
      <AnimatePresence>
        {showCheckout && selectedProvider && <>
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
                <h2 className="text-xl font-bold text-white">
                  Schedule Pickup
                </h2>
                <motion.button className="p-2 rounded-xl hover:bg-white/5" onClick={() => setShowCheckout(false)} whileTap={{
              scale: 0.95
            }}>
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {/* Provider Info */}
                <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4">
                  <p className="text-sm font-bold text-teal-400 mb-2">
                    Selected Provider
                  </p>
                  <div className="flex items-center gap-3">
                    <img src={selectedProvider.logo} alt={selectedProvider.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-bold text-white">
                        {selectedProvider.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {selectedProvider.pickupTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pickup Address */}
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-2 block">
                    Pickup Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
                    <input type="text" placeholder="Enter pickup address" value={pickupAddress} onChange={e => setPickupAddress(e.target.value)} className="w-full bg-[#0A0E1A] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-teal-500/50 focus:outline-none placeholder:text-gray-500" />
                  </div>
                  <button className="text-sm text-teal-400 font-semibold mt-2">
                    📍 Use current location
                  </button>
                </div>

                {/* Pickup Date */}
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-3 block">
                    Pickup Date
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[{
                  value: 'today',
                  label: 'Today'
                }, {
                  value: 'tomorrow',
                  label: 'Tomorrow'
                }, {
                  value: 'later',
                  label: 'Later'
                }].map(option => <motion.button key={option.value} className={`p-3 rounded-xl border-2 transition-all ${pickupDate === option.value ? 'bg-teal-500/20 border-teal-500' : 'bg-[#0A0E1A] border-white/10'}`} onClick={() => setPickupDate(option.value)} whileTap={{
                  scale: 0.98
                }}>
                        <Calendar className={`w-5 h-5 mx-auto mb-1 ${pickupDate === option.value ? 'text-teal-400' : 'text-gray-400'}`} />
                        <p className={`text-xs font-semibold ${pickupDate === option.value ? 'text-white' : 'text-gray-400'}`}>
                          {option.label}
                        </p>
                      </motion.button>)}
                  </div>
                </div>

                {/* Pickup Time */}
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-3 block">
                    Pickup Time
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[{
                  value: 'morning',
                  label: 'Morning',
                  time: '8-12'
                }, {
                  value: 'afternoon',
                  label: 'Afternoon',
                  time: '12-5'
                }, {
                  value: 'evening',
                  label: 'Evening',
                  time: '5-8'
                }].map(option => <motion.button key={option.value} className={`p-3 rounded-xl border-2 transition-all ${pickupTime === option.value ? 'bg-teal-500/20 border-teal-500' : 'bg-[#0A0E1A] border-white/10'}`} onClick={() => setPickupTime(option.value)} whileTap={{
                  scale: 0.98
                }}>
                        <Clock className={`w-5 h-5 mx-auto mb-1 ${pickupTime === option.value ? 'text-teal-400' : 'text-gray-400'}`} />
                        <p className={`text-sm font-semibold ${pickupTime === option.value ? 'text-white' : 'text-gray-400'}`}>
                          {option.label}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {option.time}
                        </p>
                      </motion.button>)}
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-2 block">
                    Special Instructions (Optional)
                  </label>
                  <textarea placeholder="e.g., Handle with care, separate whites..." value={specialInstructions} onChange={e => setSpecialInstructions(e.target.value)} rows={3} className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-teal-500/50 focus:outline-none placeholder:text-gray-500 resize-none" />
                </div>

                {/* Order Summary */}
                <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4">
                  <p className="text-sm font-bold text-teal-400 mb-3">
                    Order Summary
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Services</span>
                      <span className="text-white">
                        ₦{totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pickup & Delivery</span>
                      <span className="text-white">₦{pickupFee}</span>
                    </div>
                    <div className="pt-2 border-t border-teal-500/30 flex justify-between">
                      <span className="font-bold text-white">Total</span>
                      <span className="font-bold text-teal-400">
                        ₦{(totalPrice + pickupFee).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A]">
                <motion.button className="w-full py-4 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2" whileTap={{
              scale: 0.98
            }} onClick={handlePlaceOrder}>
                  <CheckCircle className="w-5 h-5" />
                  Confirm Pickup
                </motion.button>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>

      {/* Confirmation Sheet */}
      <AnimatePresence>
        {showConfirmation && selectedProvider && <>
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
                <motion.div className="w-20 h-20 rounded-full bg-teal-500/20 flex items-center justify-center mb-6" initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              type: 'spring',
              damping: 15,
              delay: 0.1
            }}>
                  <CheckCircle className="w-12 h-12 text-teal-400" />
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
                  Pickup Scheduled!
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
                  {selectedProvider.name} will pick up your laundry {pickupDate}{' '}
                  during {pickupTime}
                </motion.p>

                <motion.div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 mb-6 w-full max-w-sm" initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }}>
                  <p className="text-sm text-teal-400 mb-2">
                    Order #OYA-{Math.floor(Math.random() * 10000)}
                  </p>
                  <p className="text-xs text-gray-400 mb-3">
                    You'll receive a call 30 minutes before pickup
                  </p>
                  <div className="flex gap-2">
                    <motion.button className="flex-1 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-semibold flex items-center justify-center gap-2" whileTap={{
                  scale: 0.95
                }}>
                      <Phone className="w-4 h-4" />
                      Call Provider
                    </motion.button>
                  </div>
                </motion.div>

                <motion.button className="w-full py-4 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl text-white font-bold shadow-lg" onClick={onBack} whileTap={{
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