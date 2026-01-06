import React, { useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, Users, DollarSign, Target, Zap, Globe, ShoppingBag, Package, Utensils, Car, Home as HomeIcon, Sparkles, Award, BarChart3, PieChart, ArrowUpRight, Smartphone, Monitor, Star, MapPin, Clock, Wallet } from 'lucide-react';
import { AppMockup } from '../components/pitch/AppMockup';
interface PitchDeckPageProps {
  onBack?: () => void;
}
const slides = [{
  id: 1,
  type: 'cover',
  title: 'OyaDrop v2.0',
  subtitle: "Africa's First True Super App Ecosystem",
  tagline: 'Connecting Every Service, Empowering Every Community'
}, {
  id: 2,
  type: 'problem',
  title: 'The Problem',
  subtitle: 'Fragmented Service Economy',
  points: [{
    text: '15+ apps needed for daily services',
    impact: 'User friction & app fatigue'
  }, {
    text: 'Disconnected service providers',
    impact: 'Inefficient operations'
  }, {
    text: 'No unified payment system',
    impact: 'Transaction barriers'
  }, {
    text: 'Limited rural access to services',
    impact: 'Economic exclusion'
  }]
}, {
  id: 3,
  type: 'solution',
  title: 'Our Solution',
  subtitle: 'One Platform. Every Service. Complete Ecosystem.',
  features: [{
    icon: ShoppingBag,
    name: 'Marketplace',
    desc: 'E-commerce & local kiosks'
  }, {
    icon: Utensils,
    name: 'Food Delivery',
    desc: 'Restaurants & fast-food'
  }, {
    icon: Car,
    name: 'Transport',
    desc: 'Rides & logistics'
  }, {
    icon: HomeIcon,
    name: 'Accommodation',
    desc: 'Hotels & stays'
  }, {
    icon: Package,
    name: 'Services',
    desc: 'Laundry, pharmacy, beauty'
  }, {
    icon: Sparkles,
    name: 'Gamification',
    desc: 'Rewards & referrals'
  }]
}, {
  id: 4,
  type: 'product-showcase',
  title: 'Product Showcase',
  subtitle: 'Fully Built & Production Ready'
}, {
  id: 5,
  type: 'market',
  title: 'Market Opportunity',
  subtitle: 'Massive Addressable Market',
  stats: [{
    value: '$180B',
    label: 'African Digital Economy 2025',
    growth: '+15% YoY'
  }, {
    value: '450M',
    label: 'Smartphone Users',
    growth: '+8% YoY'
  }, {
    value: '$45B',
    label: 'On-Demand Services TAM',
    growth: '+22% YoY'
  }, {
    value: '70%',
    label: 'Unbanked Population',
    growth: 'Opportunity'
  }]
}, {
  id: 6,
  type: 'traction',
  title: 'Current Traction',
  subtitle: 'Proven Product-Market Fit',
  metrics: [{
    label: 'Active Users',
    value: '125K+',
    change: '+340%',
    period: 'Last 6 months'
  }, {
    label: 'Monthly GMV',
    value: '₦450M',
    change: '+280%',
    period: 'MoM growth'
  }, {
    label: 'Service Providers',
    value: '3,200+',
    change: '+190%',
    period: 'Last quarter'
  }, {
    label: 'Avg. Order Value',
    value: '₦8,500',
    change: '+45%',
    period: 'YoY'
  }]
}, {
  id: 7,
  type: 'business-model',
  title: 'Business Model',
  subtitle: 'Multiple Revenue Streams',
  streams: [{
    name: 'Commission',
    percentage: '45%',
    desc: '15-20% on transactions'
  }, {
    name: 'Subscription',
    percentage: '25%',
    desc: 'Premium merchant plans'
  }, {
    name: 'Advertising',
    percentage: '15%',
    desc: 'In-app promotions'
  }, {
    name: 'Logistics',
    percentage: '10%',
    desc: 'Delivery fees'
  }, {
    name: 'Financial Services',
    percentage: '5%',
    desc: 'Payment processing'
  }]
}, {
  id: 8,
  type: 'financials',
  title: 'Financial Projections',
  subtitle: '3-Year Growth Trajectory',
  years: [{
    year: '2024',
    revenue: '₦2.4B',
    users: '500K',
    gmv: '₦18B'
  }, {
    year: '2025',
    revenue: '₦8.5B',
    users: '2.1M',
    gmv: '₦65B'
  }, {
    year: '2026',
    revenue: '₦24B',
    users: '6.5M',
    gmv: '₦180B'
  }]
}, {
  id: 9,
  type: 'go-to-market',
  title: 'Go-to-Market Strategy',
  subtitle: 'Phased Expansion Approach',
  phases: [{
    phase: 'Phase 1',
    timeline: 'Q1 2024',
    focus: 'Lagos & Abuja',
    target: '500K users'
  }, {
    phase: 'Phase 2',
    timeline: 'Q3 2024',
    focus: '10 Major Cities',
    target: '2M users'
  }, {
    phase: 'Phase 3',
    timeline: 'Q1 2025',
    focus: 'National Coverage',
    target: '5M users'
  }, {
    phase: 'Phase 4',
    timeline: 'Q3 2025',
    focus: 'West Africa',
    target: '15M users'
  }]
}, {
  id: 10,
  type: 'competitive',
  title: 'Competitive Advantage',
  subtitle: 'What Sets Us Apart',
  advantages: [{
    title: 'True Super App',
    desc: 'Not just aggregation - full ecosystem integration'
  }, {
    title: 'Gamification Engine',
    desc: 'Industry-first rewards & referral system'
  }, {
    title: 'Rural Penetration',
    desc: 'Kiosk network reaching underserved areas'
  }, {
    title: 'Unified Wallet',
    desc: 'OyaCoin rewards across all services'
  }, {
    title: 'Provider Tools',
    desc: 'Complete merchant & provider dashboards'
  }]
}, {
  id: 11,
  type: 'funding',
  title: 'Funding Ask',
  subtitle: 'Accelerating Growth',
  ask: '$5M Series A',
  allocation: [{
    category: 'Technology & Product',
    percentage: 35,
    amount: '$1.75M'
  }, {
    category: 'Marketing & User Acquisition',
    percentage: 30,
    amount: '$1.5M'
  }, {
    category: 'Operations & Logistics',
    percentage: 20,
    amount: '$1M'
  }, {
    category: 'Team Expansion',
    percentage: 10,
    amount: '$500K'
  }, {
    category: 'Working Capital',
    percentage: 5,
    amount: '$250K'
  }]
}, {
  id: 12,
  type: 'team',
  title: 'The Team',
  subtitle: 'Experienced Founders & Advisors',
  description: 'Combined 40+ years in tech, e-commerce, and African markets'
}, {
  id: 13,
  type: 'closing',
  title: 'Join Us',
  subtitle: "Building Africa's Digital Future",
  cta: "Let's Transform How Africa Accesses Services"
}];
export function PitchDeckPage({
  onBack
}: PitchDeckPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };
  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };
  const slide = slides[currentSlide];
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A] flex flex-col overflow-hidden">
      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div key={currentSlide} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{
          x: {
            type: 'spring',
            stiffness: 300,
            damping: 30
          },
          opacity: {
            duration: 0.2
          }
        }} className="w-full max-w-6xl">
            {/* Product Showcase Slide with Real UI Mockups */}
            {slide.type === 'product-showcase' && <div>
                <h2 className="text-5xl font-bold text-white mb-3 text-center">
                  {slide.title}
                </h2>
                <p className="text-2xl text-cyan-400 mb-8 text-center">
                  {slide.subtitle}
                </p>

                <div className="grid grid-cols-3 gap-6">
                  {/* Customer App - Phone Mockup */}
                  <AppMockup type="phone" delay={0.2}>
                    {/* Home Dashboard Mini */}
                    <div className="bg-gradient-to-b from-[#0a1a1f] to-[#0f2027] min-h-full p-4">
                      {/* Top Nav */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              O
                            </span>
                          </div>
                          <div>
                            <p className="text-[10px] text-white font-bold">
                              OyaDrop
                            </p>
                            <p className="text-[8px] text-gray-400">
                              Lagos, Nigeria
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Wallet className="w-3 h-3 text-purple-400" />
                          </div>
                        </div>
                      </div>

                      {/* Wallet Card */}
                      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-3 mb-4">
                        <p className="text-[8px] text-gray-400 mb-1">
                          Total Balance
                        </p>
                        <p className="text-lg font-bold text-white mb-2">
                          ₦12,450
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-[10px] text-white font-bold">
                              2,340 OyaCoins
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Services Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[{
                      icon: Utensils,
                      label: 'Food',
                      color: '#FF6B00'
                    }, {
                      icon: ShoppingBag,
                      label: 'Shop',
                      color: '#00D9C0'
                    }, {
                      icon: Car,
                      label: 'Ride',
                      color: '#00F0FF'
                    }, {
                      icon: Package,
                      label: 'Delivery',
                      color: '#FFB800'
                    }, {
                      icon: HomeIcon,
                      label: 'Stays',
                      color: '#A855F7'
                    }, {
                      icon: Sparkles,
                      label: 'More',
                      color: '#10B981'
                    }].map((service, i) => {
                      const Icon = service.icon;
                      return <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                              <div className="w-8 h-8 mx-auto mb-1 rounded-lg flex items-center justify-center" style={{
                          backgroundColor: `${service.color}20`
                        }}>
                                <Icon className="w-4 h-4" style={{
                            color: service.color
                          }} />
                              </div>
                              <p className="text-[8px] text-white">
                                {service.label}
                              </p>
                            </div>;
                    })}
                      </div>

                      {/* Recent Activity */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                        <p className="text-[10px] font-bold text-white mb-2">
                          Recent Orders
                        </p>
                        {[1, 2].map(i => <div key={i} className="flex items-center gap-2 mb-2 last:mb-0">
                            <div className="w-6 h-6 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                              <Utensils className="w-3 h-3 text-cyan-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-[8px] text-white font-semibold">
                                Food Order #{1234 + i}
                              </p>
                              <p className="text-[7px] text-gray-400">
                                Delivered
                              </p>
                            </div>
                            <p className="text-[8px] text-green-400">₦2,500</p>
                          </div>)}
                      </div>
                    </div>
                  </AppMockup>

                  {/* Merchant Dashboard - Desktop Mockup */}
                  <AppMockup type="desktop" delay={0.3}>
                    <div className="bg-gradient-to-br from-[#0a1a1f] to-[#0f2027] min-h-full p-4">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg" />
                          <div>
                            <p className="text-[10px] font-bold text-white">
                              Merchant Dashboard
                            </p>
                            <p className="text-[7px] text-gray-400">
                              Real-time Analytics
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* KPI Cards */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[{
                      label: 'Revenue',
                      value: '₦450K',
                      change: '+12%',
                      color: '#10B981'
                    }, {
                      label: 'Orders',
                      value: '1,234',
                      change: '+8%',
                      color: '#00D9C0'
                    }, {
                      label: 'Rating',
                      value: '4.8★',
                      change: '+0.2',
                      color: '#FFB800'
                    }].map((kpi, i) => <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-2">
                            <p className="text-[7px] text-gray-400 mb-1">
                              {kpi.label}
                            </p>
                            <p className="text-sm font-bold text-white mb-1">
                              {kpi.value}
                            </p>
                            <span className="text-[7px] font-bold" style={{
                        color: kpi.color
                      }}>
                              {kpi.change}
                            </span>
                          </div>)}
                      </div>

                      {/* Chart Placeholder */}
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-3">
                        <p className="text-[8px] font-bold text-white mb-2">
                          Revenue Trend
                        </p>
                        <div className="flex items-end gap-1 h-16">
                          {[40, 65, 45, 80, 60, 90, 75].map((height, i) => <div key={i} className="flex-1 bg-gradient-to-t from-cyan-500 to-teal-500 rounded-t" style={{
                        height: `${height}%`
                      }} />)}
                        </div>
                      </div>

                      {/* Orders List */}
                      <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                        <p className="text-[8px] font-bold text-white mb-2">
                          Live Orders
                        </p>
                        {[1, 2].map(i => <div key={i} className="flex items-center gap-2 mb-2 last:mb-0 text-[7px]">
                            <div className="w-4 h-4 bg-orange-500/20 rounded flex items-center justify-center">
                              <span className="text-orange-400 text-[8px]">
                                #{i}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-white">Order #OYA{1000 + i}</p>
                            </div>
                            <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-[6px]">
                              Ready
                            </span>
                          </div>)}
                      </div>
                    </div>
                  </AppMockup>

                  {/* Provider App - Phone Mockup */}
                  <AppMockup type="phone" delay={0.4}>
                    <div className="bg-gradient-to-b from-[#1a3a3a] to-[#1f4545] min-h-full p-4">
                      {/* Provider Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              S
                            </span>
                          </div>
                          <div>
                            <p className="text-[10px] text-white font-bold">
                              Sonia Alfred
                            </p>
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                              <span className="text-[8px] text-green-400">
                                Online
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Earnings Card */}
                      <div className="bg-gradient-to-br from-teal-500/20 to-green-500/10 border border-teal-500/30 rounded-xl p-3 mb-4">
                        <p className="text-[8px] text-gray-400 mb-1">
                          Today's Earnings
                        </p>
                        <p className="text-xl font-bold text-white">₦12,450</p>
                      </div>

                      {/* Active Orders */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] font-bold text-white">
                            Active Deliveries
                          </p>
                          <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded text-[8px] font-bold">
                            2
                          </span>
                        </div>
                        {[1, 2].map(i => <div key={i} className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-2 mb-2 last:mb-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-teal-500/20 rounded-lg flex items-center justify-center">
                                  <Utensils className="w-3 h-3 text-teal-400" />
                                </div>
                                <div>
                                  <p className="text-[8px] text-white font-semibold">
                                    Food Order
                                  </p>
                                  <p className="text-[7px] text-gray-400">
                                    2.3 km away
                                  </p>
                                </div>
                              </div>
                              <p className="text-[10px] font-bold text-teal-400">
                                ₦1,200
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <p className="text-[7px] text-gray-400">
                                Lekki Phase 1
                              </p>
                            </div>
                          </div>)}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                          <p className="text-[8px] text-gray-400 mb-1">
                            Completed
                          </p>
                          <p className="text-sm font-bold text-white">24</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                          <p className="text-[8px] text-gray-400 mb-1">
                            Rating
                          </p>
                          <p className="text-sm font-bold text-white">4.9★</p>
                        </div>
                      </div>
                    </div>
                  </AppMockup>
                </div>

                {/* Feature Highlights */}
                <motion.div className="mt-6 grid grid-cols-4 gap-4" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5
            }}>
                  {[{
                label: 'Real-time Tracking',
                icon: MapPin,
                color: '#00D9C0'
              }, {
                label: 'Instant Payments',
                icon: DollarSign,
                color: '#10B981'
              }, {
                label: 'Smart Routing',
                icon: Zap,
                color: '#FFB800'
              }, {
                label: 'Live Analytics',
                icon: BarChart3,
                color: '#B026FF'
              }].map((feature, i) => {
                const Icon = feature.icon;
                return <div key={i} className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl p-4 text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{
                    backgroundColor: `${feature.color}20`
                  }}>
                          <Icon className="w-5 h-5" style={{
                      color: feature.color
                    }} />
                        </div>
                        <p className="text-xs font-bold text-white">
                          {feature.label}
                        </p>
                      </div>;
              })}
                </motion.div>
              </div>}

            {/* Cover Slide */}
            {slide.type === 'cover' && <div className="text-center">
                <motion.div className="mb-8" initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              delay: 0.2,
              type: 'spring'
            }}>
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                    <span className="text-white font-bold text-6xl">O</span>
                  </div>
                </motion.div>
                <motion.h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 bg-clip-text text-transparent" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }}>
                  {slide.title}
                </motion.h1>
                <motion.p className="text-3xl text-white mb-4" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }}>
                  {slide.subtitle}
                </motion.p>
                <motion.p className="text-xl text-gray-400" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5
            }}>
                  {slide.tagline}
                </motion.p>
              </div>}

            {/* Problem Slide */}
            {slide.type === 'problem' && <div>
                <h2 className="text-5xl font-bold text-white mb-3">
                  {slide.title}
                </h2>
                <p className="text-2xl text-cyan-400 mb-12">{slide.subtitle}</p>
                <div className="grid grid-cols-2 gap-6">
                  {slide.points?.map((point, index) => <motion.div key={index} className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6" initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.1
              }}>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {point.text}
                      </h3>
                      <p className="text-gray-400">{point.impact}</p>
                    </motion.div>)}
                </div>
              </div>}

            {/* Solution Slide */}
            {slide.type === 'solution' && <div>
                <h2 className="text-5xl font-bold text-white mb-3">
                  {slide.title}
                </h2>
                <p className="text-2xl text-cyan-400 mb-12">{slide.subtitle}</p>
                <div className="grid grid-cols-3 gap-6">
                  {slide.features?.map((feature, index) => {
                const Icon = feature.icon;
                return <motion.div key={index} className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-2xl p-6 text-center" initial={{
                  opacity: 0,
                  scale: 0.8
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  delay: index * 0.1
                }}>
                        <div className="w-16 h-16 mx-auto mb-4 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                          <Icon className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          {feature.name}
                        </h3>
                        <p className="text-sm text-gray-400">{feature.desc}</p>
                      </motion.div>;
              })}
                </div>
              </div>}

            {/* Market Slide */}
            {slide.type === 'market' && <div>
                <h2 className="text-5xl font-bold text-white mb-3">
                  {slide.title}
                </h2>
                <p className="text-2xl text-cyan-400 mb-12">{slide.subtitle}</p>
                <div className="grid grid-cols-2 gap-8">
                  {slide.stats?.map((stat, index) => <motion.div key={index} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8" initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.1
              }}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-5xl font-bold text-white">
                          {stat.value}
                        </h3>
                        <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm font-bold">
                          {stat.growth}
                        </span>
                      </div>
                      <p className="text-xl text-gray-300">{stat.label}</p>
                    </motion.div>)}
                </div>
              </div>}

            {/* Traction Slide */}
            {slide.type === 'traction' && <div>
                <h2 className="text-5xl font-bold text-white mb-3">
                  {slide.title}
                </h2>
                <p className="text-2xl text-cyan-400 mb-12">{slide.subtitle}</p>
                <div className="grid grid-cols-2 gap-6">
                  {slide.metrics?.map((metric, index) => <motion.div key={index} className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-2xl p-6" initial={{
                opacity: 0,
                scale: 0.9
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: index * 0.1
              }}>
                      <p className="text-sm text-gray-400 mb-2">
                        {metric.label}
                      </p>
                      <div className="flex items-end gap-3 mb-2">
                        <h3 className="text-4xl font-bold text-white">
                          {metric.value}
                        </h3>
                        <span className="text-green-400 font-bold text-lg mb-1">
                          {metric.change}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{metric.period}</p>
                    </motion.div>)}
                </div>
              </div>}

            {/* Business Model Slide */}
            {slide.type === 'business-model' && <div>
                <h2 className="text-5xl font-bold text-white mb-3">
                  {slide.title}
                </h2>
                <p className="text-2xl text-cyan-400 mb-12">{slide.subtitle}</p>
                <div className="space-y-4">
                  {slide.streams?.map((stream, index) => <motion.div key={index} className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-6 flex items-center gap-6" initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.1
              }}>
                      <div className="text-4xl font-bold text-cyan-400 w-20">
                        {stream.percentage}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {stream.name}
                        </h3>
                        <p className="text-gray-400">{stream.desc}</p>
                      </div>
                      <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500" initial={{
                    width: 0
                  }} animate={{
                    width: stream.percentage
                  }} transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 0.8
                  }} />
                      </div>
                    </motion.div>)}
                </div>
              </div>}

            {/* Financials Slide */}
            {slide.type === 'financials' && <div>
                <h2 className="text-5xl font-bold text-white mb-3">
                  {slide.title}
                </h2>
                <p className="text-2xl text-cyan-400 mb-12">{slide.subtitle}</p>
                <div className="grid grid-cols-3 gap-6">
                  {slide.years?.map((year, index) => <motion.div key={index} className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-2xl p-6" initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.15
              }}>
                      <h3 className="text-3xl font-bold text-white mb-6">
                        {year.year}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Revenue</p>
                          <p className="text-2xl font-bold text-green-400">
                            {year.revenue}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">
                            Active Users
                          </p>
                          <p className="text-2xl font-bold text-cyan-400">
                            {year.users}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">GMV</p>
                          <p className="text-2xl font-bold text-purple-400">
                            {year.gmv}
                          </p>
                        </div>
                      </div>
                    </motion.div>)}
                </div>
              </div>}

            {/* Go-to-Market Slide */}
            {slide.type === 'go-to-market' && <div>
                <h2 className="text-5xl font-bold text-white mb-3">
                  {slide.title}
                </h2>
                <p className="text-2xl text-cyan-400 mb-12">{slide.subtitle}</p>
                <div className="space-y-4">
                  {slide.phases?.map((phase, index) => <motion.div key={index} className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-xl p-6 flex items-center gap-6" initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.1
              }}>
                      <div className="w-24">
                        <div className="text-sm text-gray-400 mb-1">
                          {phase.phase}
                        </div>
                        <div className="text-lg font-bold text-cyan-400">
                          {phase.timeline}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {phase.focus}
                        </h3>
                        <p className="text-gray-400">Target: {phase.target}</p>
                      </div>
                      <ArrowUpRight className="w-8 h-8 text-green-400" />
                    </motion.div>)}
                </div>
              </div>}

            {/* Competitive Advantage Slide */}
            {slide.type === 'competitive' && <div>
                <h2 className="text-5xl font-bold text-white mb-3">
                  {slide.title}
                </h2>
                <p className="text-2xl text-cyan-400 mb-12">{slide.subtitle}</p>
                <div className="space-y-4">
                  {slide.advantages?.map((advantage, index) => <motion.div key={index} className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6" initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.1
              }}>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {advantage.title}
                      </h3>
                      <p className="text-gray-400">{advantage.desc}</p>
                    </motion.div>)}
                </div>
              </div>}

            {/* Funding Slide */}
            {slide.type === 'funding' && <div>
                <h2 className="text-5xl font-bold text-white mb-3">
                  {slide.title}
                </h2>
                <p className="text-2xl text-cyan-400 mb-8">{slide.subtitle}</p>
                <div className="text-center mb-12">
                  <motion.div className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl" initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: 'spring',
                delay: 0.2
              }}>
                    <p className="text-6xl font-bold text-white">{slide.ask}</p>
                  </motion.div>
                </div>
                <div className="space-y-3">
                  {slide.allocation?.map((item, index) => <motion.div key={index} className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-4 flex items-center gap-4" initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.1
              }}>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white">
                          {item.category}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-cyan-400">
                          {item.percentage}%
                        </p>
                        <p className="text-sm text-gray-400">{item.amount}</p>
                      </div>
                    </motion.div>)}
                </div>
              </div>}

            {/* Team Slide */}
            {slide.type === 'team' && <div className="text-center">
                <h2 className="text-5xl font-bold text-white mb-3">
                  {slide.title}
                </h2>
                <p className="text-2xl text-cyan-400 mb-8">{slide.subtitle}</p>
                <motion.div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-12" initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: 0.2
            }}>
                  <Award className="w-20 h-20 text-purple-400 mx-auto mb-6" />
                  <p className="text-2xl text-white">{slide.description}</p>
                </motion.div>
              </div>}

            {/* Closing Slide */}
            {slide.type === 'closing' && <div className="text-center">
                <motion.div className="mb-8" initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              delay: 0.2,
              type: 'spring'
            }}>
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                    <span className="text-white font-bold text-6xl">O</span>
                  </div>
                </motion.div>
                <motion.h1 className="text-6xl font-bold mb-6 text-white" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }}>
                  {slide.title}
                </motion.h1>
                <motion.p className="text-3xl text-cyan-400 mb-8" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }}>
                  {slide.subtitle}
                </motion.p>
                <motion.p className="text-2xl text-gray-300 mb-12" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5
            }}>
                  {slide.cta}
                </motion.p>
                <motion.div className="text-xl text-gray-400" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.6
            }}>
                  <p>contact@oyadrop.com</p>
                  <p className="mt-2">www.oyadrop.com</p>
                </motion.div>
              </div>}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="p-6 border-t border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={prevSlide} disabled={currentSlide === 0} className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 hover:bg-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-cyan-500' : 'w-2 bg-white/20 hover:bg-white/40'}`} />)}
          </div>

          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 hover:bg-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="text-center mt-4 text-sm text-gray-400">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>;
}