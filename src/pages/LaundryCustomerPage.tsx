import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Shirt,
  Clock,
  MapPin,
  Calendar,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Sparkles,
  Droplets,
  Wind,
  Package,
  Star,
  Phone,
  MessageCircle,
  X } from
'lucide-react';
interface LaundryCustomerPageProps {
  onBack: () => void;
}
type FlowStep = 'services' | 'items' | 'schedule' | 'review' | 'tracking';
interface LaundryService {
  id: string;
  name: string;
  icon: any;
  description: string;
  pricePerKg: number;
  color: string;
}
interface LaundryItem {
  id: string;
  name: string;
  icon: string;
  quantity: number;
  estimatedKg: number;
}
interface ScheduleSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}
const services: LaundryService[] = [
{
  id: 'wash-iron',
  name: 'Wash & Iron',
  icon: Sparkles,
  description: 'Complete wash and iron service',
  pricePerKg: 800,
  color: '#00D9C0'
},
{
  id: 'wash-only',
  name: 'Wash Only',
  icon: Droplets,
  description: 'Professional washing service',
  pricePerKg: 500,
  color: '#3B82F6'
},
{
  id: 'iron-only',
  name: 'Iron Only',
  icon: Sparkles,
  description: 'Expert ironing service',
  pricePerKg: 400,
  color: '#F59E0B'
},
{
  id: 'dry-clean',
  name: 'Dry Cleaning',
  icon: Wind,
  description: 'Premium dry cleaning',
  pricePerKg: 1500,
  color: '#A855F7'
}];

const itemTemplates = [
{
  id: 'shirts',
  name: 'Shirts',
  icon: '👔',
  estimatedKg: 0.2
},
{
  id: 'trousers',
  name: 'Trousers',
  icon: '👖',
  estimatedKg: 0.3
},
{
  id: 'dresses',
  name: 'Dresses',
  icon: '👗',
  estimatedKg: 0.4
},
{
  id: 'bedsheets',
  name: 'Bed Sheets',
  icon: '🛏️',
  estimatedKg: 1.0
},
{
  id: 'towels',
  name: 'Towels',
  icon: '🧺',
  estimatedKg: 0.5
},
{
  id: 'jeans',
  name: 'Jeans',
  icon: '👕',
  estimatedKg: 0.6
}];

const scheduleSlots: ScheduleSlot[] = [
{
  id: '1',
  date: 'Today',
  time: '2:00 PM - 4:00 PM',
  available: true
},
{
  id: '2',
  date: 'Today',
  time: '4:00 PM - 6:00 PM',
  available: true
},
{
  id: '3',
  date: 'Tomorrow',
  time: '10:00 AM - 12:00 PM',
  available: true
},
{
  id: '4',
  date: 'Tomorrow',
  time: '2:00 PM - 4:00 PM',
  available: true
},
{
  id: '5',
  date: 'Tomorrow',
  time: '4:00 PM - 6:00 PM',
  available: false
}];

export function LaundryCustomerPage({ onBack }: LaundryCustomerPageProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>('services');
  const [selectedService, setSelectedService] = useState<LaundryService | null>(
    null
  );
  const [items, setItems] = useState<LaundryItem[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);
  const [pickupAddress, setPickupAddress] = useState(
    '123 Victoria Island, Lagos'
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    '123 Victoria Island, Lagos'
  );
  const [orderPlaced, setOrderPlaced] = useState(false);
  const totalKg = items.reduce(
    (sum, item) => sum + item.estimatedKg * item.quantity,
    0
  );
  const totalPrice = selectedService ? totalKg * selectedService.pricePerKg : 0;
  const handleServiceSelect = (service: LaundryService) => {
    setSelectedService(service);
    setCurrentStep('items');
  };
  const handleAddItem = (template: (typeof itemTemplates)[0]) => {
    const existing = items.find((i) => i.id === template.id);
    if (existing) {
      setItems(
        items.map((i) =>
        i.id === template.id ?
        {
          ...i,
          quantity: i.quantity + 1
        } :
        i
        )
      );
    } else {
      setItems([
      ...items,
      {
        ...template,
        quantity: 1
      }]
      );
    }
  };
  const handleRemoveItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item && item.quantity > 1) {
      setItems(
        items.map((i) =>
        i.id === id ?
        {
          ...i,
          quantity: i.quantity - 1
        } :
        i
        )
      );
    } else {
      setItems(items.filter((i) => i.id !== id));
    }
  };
  const handleContinueToSchedule = () => {
    if (items.length > 0) {
      setCurrentStep('schedule');
    }
  };
  const handleScheduleSelect = (slot: ScheduleSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      setCurrentStep('review');
    }
  };
  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setCurrentStep('tracking');
  };
  const handleBack = () => {
    if (currentStep === 'services') {
      onBack();
    } else if (currentStep === 'items') {
      setCurrentStep('services');
    } else if (currentStep === 'schedule') {
      setCurrentStep('items');
    } else if (currentStep === 'review') {
      setCurrentStep('schedule');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-teal-500/20">
        <div className="flex items-center justify-between px-4 py-4">
          <motion.button
            className="p-2 rounded-xl hover:bg-white/5 transition-colors"
            onClick={handleBack}
            whileTap={{
              scale: 0.95
            }}>

            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>

          <div className="text-center">
            <h1 className="text-lg font-bold text-white">Laundry Service</h1>
            <p className="text-xs text-gray-400">
              {currentStep === 'services' && 'Choose your service'}
              {currentStep === 'items' && 'Add your items'}
              {currentStep === 'schedule' && 'Schedule pickup'}
              {currentStep === 'review' && 'Review order'}
              {currentStep === 'tracking' && 'Track your order'}
            </p>
          </div>

          <div className="w-10" />
        </div>

        {/* Progress Bar */}
        {currentStep !== 'tracking' &&
        <div className="px-4 pb-3">
            <div className="flex items-center gap-2">
              {['services', 'items', 'schedule', 'review'].map(
              (step, index) =>
              <div
                key={step}
                className={`flex-1 h-1 rounded-full transition-all ${['services', 'items', 'schedule', 'review'].indexOf(currentStep) >= index ? 'bg-teal-500' : 'bg-white/10'}`} />


            )}
            </div>
          </div>
        }
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {currentStep === 'services' &&
        <motion.div
          key="services"
          className="p-4 pb-24"
          initial={{
            opacity: 0,
            x: -20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: 20
          }}>

            <h2 className="text-xl font-bold text-white mb-2">
              Select Service Type
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Choose the service that fits your needs
            </p>

            <div className="space-y-3">
              {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.button
                  key={service.id}
                  className="w-full bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-5 border border-white/10 text-left"
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: index * 0.1
                  }}
                  onClick={() => handleServiceSelect(service)}
                  whileHover={{
                    y: -4,
                    borderColor: service.color + '40'
                  }}
                  whileTap={{
                    scale: 0.98
                  }}>

                    <div className="flex items-center gap-4">
                      <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: service.color + '20'
                      }}>

                        <Icon
                        className="w-7 h-7"
                        style={{
                          color: service.color
                        }} />

                      </div>

                      <div className="flex-1">
                        <h3 className="text-base font-bold text-white mb-1">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">
                          {service.description}
                        </p>
                        <p
                        className="text-lg font-bold"
                        style={{
                          color: service.color
                        }}>

                          ₦{service.pricePerKg}/kg
                        </p>
                      </div>

                      <ChevronRight className="w-6 h-6 text-gray-400" />
                    </div>
                  </motion.button>);

            })}
            </div>
          </motion.div>
        }

        {currentStep === 'items' && selectedService &&
        <motion.div
          key="items"
          className="p-4 pb-32"
          initial={{
            opacity: 0,
            x: -20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: 20
          }}>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: selectedService.color + '20'
                }}>

                  <selectedService.icon
                  className="w-6 h-6"
                  style={{
                    color: selectedService.color
                  }} />

                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {selectedService.name}
                  </h2>
                  <p className="text-sm text-gray-400">
                    ₦{selectedService.pricePerKg}/kg
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-4">
              Add Your Items
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {itemTemplates.map((template, index) => {
              const item = items.find((i) => i.id === template.id);
              return (
                <motion.div
                  key={template.id}
                  className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10"
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

                    <div className="text-center mb-3">
                      <div className="text-3xl mb-2">{template.icon}</div>
                      <p className="text-sm font-semibold text-white mb-1">
                        {template.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        ~{template.estimatedKg}kg each
                      </p>
                    </div>

                    {item ?
                  <div className="flex items-center justify-between bg-teal-500/20 rounded-xl p-2">
                        <motion.button
                      className="w-8 h-8 bg-teal-500/30 rounded-lg flex items-center justify-center"
                      onClick={() => handleRemoveItem(template.id)}
                      whileTap={{
                        scale: 0.9
                      }}>

                          <Minus className="w-4 h-4 text-teal-400" />
                        </motion.button>
                        <span className="text-lg font-bold text-white">
                          {item.quantity}
                        </span>
                        <motion.button
                      className="w-8 h-8 bg-teal-500/30 rounded-lg flex items-center justify-center"
                      onClick={() => handleAddItem(template)}
                      whileTap={{
                        scale: 0.9
                      }}>

                          <Plus className="w-4 h-4 text-teal-400" />
                        </motion.button>
                      </div> :

                  <motion.button
                    className="w-full py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                    onClick={() => handleAddItem(template)}
                    whileTap={{
                      scale: 0.95
                    }}>

                        Add
                      </motion.button>
                  }
                  </motion.div>);

            })}
            </div>

            {items.length > 0 &&
          <motion.div
            className="bg-gradient-to-br from-teal-500/20 to-green-500/10 border border-teal-500/30 rounded-2xl p-4 mb-6"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}>

                <h4 className="text-sm font-bold text-white mb-3">
                  Your Items
                </h4>
                <div className="space-y-2 mb-4">
                  {items.map((item) =>
              <div
                key={item.id}
                className="flex items-center justify-between text-sm">

                      <span className="text-gray-300">
                        {item.icon} {item.name} x{item.quantity}
                      </span>
                      <span className="text-teal-400 font-semibold">
                        ~{(item.estimatedKg * item.quantity).toFixed(1)}kg
                      </span>
                    </div>
              )}
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">
                    Estimated Total
                  </span>
                  <div className="text-right">
                    <p className="text-lg font-bold text-teal-400">
                      ₦{totalPrice.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      ~{totalKg.toFixed(1)}kg
                    </p>
                  </div>
                </div>
              </motion.div>
          }

            <motion.button
            className={`w-full py-4 rounded-xl font-bold text-white ${items.length > 0 ? 'bg-gradient-to-r from-teal-500 to-green-500' : 'bg-white/10 cursor-not-allowed'}`}
            onClick={handleContinueToSchedule}
            disabled={items.length === 0}
            whileTap={
            items.length > 0 ?
            {
              scale: 0.98
            } :
            {}
            }>

              Continue to Schedule
            </motion.button>
          </motion.div>
        }

        {currentStep === 'schedule' &&
        <motion.div
          key="schedule"
          className="p-4 pb-24"
          initial={{
            opacity: 0,
            x: -20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: 20
          }}>

            <h2 className="text-xl font-bold text-white mb-6">
              Schedule Pickup
            </h2>

            {/* Pickup Address */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-400 mb-2 block">
                Pickup Address
              </label>
              <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-400 mt-0.5" />
                  <div className="flex-1">
                    <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full bg-transparent text-white text-sm focus:outline-none" />

                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-400 mb-2 block">
                Delivery Address
              </label>
              <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-0.5" />
                  <div className="flex-1">
                    <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-transparent text-white text-sm focus:outline-none" />

                  </div>
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <h3 className="text-base font-bold text-white mb-4">
              Select Pickup Time
            </h3>
            <div className="space-y-3">
              {scheduleSlots.map((slot, index) =>
            <motion.button
              key={slot.id}
              className={`w-full bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border transition-all ${slot.available ? selectedSlot?.id === slot.id ? 'border-teal-500 bg-teal-500/10' : 'border-white/10 hover:border-teal-500/50' : 'border-white/10 opacity-50 cursor-not-allowed'}`}
              onClick={() => handleScheduleSelect(slot)}
              disabled={!slot.available}
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
              whileTap={
              slot.available ?
              {
                scale: 0.98
              } :
              {}
              }>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${slot.available ? 'bg-teal-500/20' : 'bg-white/5'}`}>

                        <Clock
                      className={`w-5 h-5 ${slot.available ? 'text-teal-400' : 'text-gray-500'}`} />

                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-white">
                          {slot.date}
                        </p>
                        <p className="text-xs text-gray-400">{slot.time}</p>
                      </div>
                    </div>
                    {slot.available ?
                selectedSlot?.id === slot.id ?
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div> :

                <div className="w-6 h-6 border-2 border-white/20 rounded-full" /> :


                <span className="text-xs text-gray-500">Unavailable</span>
                }
                  </div>
                </motion.button>
            )}
            </div>
          </motion.div>
        }

        {currentStep === 'review' && selectedService && selectedSlot &&
        <motion.div
          key="review"
          className="p-4 pb-24"
          initial={{
            opacity: 0,
            x: -20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: 20
          }}>

            <h2 className="text-xl font-bold text-white mb-6">
              Review Your Order
            </h2>

            {/* Service Summary */}
            <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: selectedService.color + '20'
                }}>

                  <selectedService.icon
                  className="w-6 h-6"
                  style={{
                    color: selectedService.color
                  }} />

                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {selectedService.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    ₦{selectedService.pricePerKg}/kg
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {items.map((item) =>
              <div
                key={item.id}
                className="flex items-center justify-between text-sm">

                    <span className="text-gray-300">
                      {item.icon} {item.name} x{item.quantity}
                    </span>
                    <span className="text-teal-400">
                      ~{(item.estimatedKg * item.quantity).toFixed(1)}kg
                    </span>
                  </div>
              )}
              </div>
            </div>

            {/* Schedule Summary */}
            <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10 mb-4">
              <h3 className="text-sm font-bold text-white mb-3">
                Pickup Schedule
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-teal-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-semibold">
                      {selectedSlot.date}
                    </p>
                    <p className="text-xs text-gray-400">{selectedSlot.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Pickup</p>
                    <p className="text-sm text-white">{pickupAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Delivery</p>
                    <p className="text-sm text-white">{deliveryAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-gradient-to-br from-teal-500/20 to-green-500/10 border border-teal-500/30 rounded-2xl p-4 mb-6">
              <h3 className="text-sm font-bold text-white mb-3">
                Price Breakdown
              </h3>
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">
                    Laundry Service (~{totalKg.toFixed(1)}kg)
                  </span>
                  <span className="text-white">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Pickup & Delivery</span>
                  <span className="text-green-400">Free</span>
                </div>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-base font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-teal-400">
                  ₦{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <motion.button
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl font-bold text-white"
            onClick={handlePlaceOrder}
            whileTap={{
              scale: 0.98
            }}>

              Place Order
            </motion.button>
          </motion.div>
        }

        {currentStep === 'tracking' &&
        orderPlaced &&
        selectedService &&
        selectedSlot &&
        <motion.div
          key="tracking"
          className="p-4 pb-24"
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}>

              {/* Success Message */}
              <motion.div
            className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border-2 border-green-500/50 rounded-2xl p-6 mb-6"
            initial={{
              scale: 0.9
            }}
            animate={{
              scale: 1
            }}
            transition={{
              type: 'spring',
              damping: 20
            }}>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Order Confirmed!
                    </h3>
                    <p className="text-sm text-gray-400">
                      Order #LAU-{Math.floor(Math.random() * 10000)}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  Your laundry pickup has been scheduled. We'll send a rider to
                  collect your items.
                </p>
              </motion.div>

              {/* Order Status */}
              <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-5 border border-white/10 mb-4">
                <h3 className="text-base font-bold text-white mb-4">
                  Order Status
                </h3>

                <div className="space-y-4">
                  {[
              {
                label: 'Order Confirmed',
                status: 'completed',
                time: 'Just now'
              },
              {
                label: 'Rider Assigned',
                status: 'completed',
                time: '2 mins ago'
              },
              {
                label: 'Pickup Scheduled',
                status: 'active',
                time: selectedSlot.time
              },
              {
                label: 'Items Collected',
                status: 'pending',
                time: 'Pending'
              },
              {
                label: 'In Progress',
                status: 'pending',
                time: 'Pending'
              },
              {
                label: 'Ready for Delivery',
                status: 'pending',
                time: 'Pending'
              }].
              map((step, index) =>
              <div key={index} className="flex items-start gap-3">
                      <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${step.status === 'completed' ? 'bg-green-500' : step.status === 'active' ? 'bg-teal-500 animate-pulse' : 'bg-white/10'}`}>

                        {step.status === 'completed' ?
                  <Check className="w-4 h-4 text-white" /> :
                  step.status === 'active' ?
                  <div className="w-3 h-3 bg-white rounded-full" /> :

                  <div className="w-3 h-3 border-2 border-white/30 rounded-full" />
                  }
                      </div>
                      <div className="flex-1">
                        <p
                    className={`text-sm font-semibold ${step.status === 'pending' ? 'text-gray-400' : 'text-white'}`}>

                          {step.label}
                        </p>
                        <p className="text-xs text-gray-500">{step.time}</p>
                      </div>
                    </div>
              )}
                </div>
              </div>

              {/* Rider Info */}
              <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10 mb-4">
                <h3 className="text-sm font-bold text-white mb-3">
                  Your Rider
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                alt="Rider"
                className="w-12 h-12 rounded-full object-cover" />

                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">David Okafor</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-400">
                        4.9 (234 pickups)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                className="flex-1 py-3 bg-teal-500/20 border border-teal-500/30 rounded-xl text-teal-400 font-semibold text-sm flex items-center justify-center gap-2"
                whileTap={{
                  scale: 0.98
                }}>

                    <Phone className="w-4 h-4" />
                    Call
                  </motion.button>
                  <motion.button
                className="flex-1 py-3 bg-teal-500/20 border border-teal-500/30 rounded-xl text-teal-400 font-semibold text-sm flex items-center justify-center gap-2"
                whileTap={{
                  scale: 0.98
                }}>

                    <MessageCircle className="w-4 h-4" />
                    Message
                  </motion.button>
                </div>
              </div>

              {/* Pickup Details */}
              <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10">
                <h3 className="text-sm font-bold text-white mb-3">
                  Pickup Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-teal-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-white font-semibold">
                        {selectedSlot.date}
                      </p>
                      <p className="text-xs text-gray-400">
                        {selectedSlot.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-teal-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Pickup Address
                      </p>
                      <p className="text-sm text-white">{pickupAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-teal-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Items</p>
                      <p className="text-sm text-white">
                        {items.length} items (~{totalKg.toFixed(1)}kg)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
        }
      </AnimatePresence>
    </div>);

}