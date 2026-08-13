import {
  CarIcon,
  PillIcon,
  ShirtIcon,
  ShoppingCartIcon,
  SparklesIcon,
  UtensilsCrossedIcon,
  WrenchIcon } from
'lucide-react';

export interface OyaOffering {
  name: string;
  price: string;
  duration: string;
  description: string;
}

export interface OyaProvider {
  business: string;
  operator: string;
  handle: string;
  tagline: string;
  rating: number;
  reviews: number;
  zone: string;
  responseTime: string;
  completed: string;
  repeatRate: string;
}

export interface OyaService {
  id: string;
  brand: string;
  label: string;
  accent: string;
  accentSoft: string;
  accentText: string;
  icon: typeof CarIcon;
  provider: OyaProvider;
  offerings: OyaOffering[];
  requestPrompt: string;
  matchingCopy: string;
  trackingSteps: string[];
  chatOpener: string;
  estimate: string;
}

export const oyaServices: OyaService[] = [
{
  id: 'clean',
  brand: 'OyaClean',
  label: 'Home cleaning',
  accent: '#34D399',
  accentSoft: 'rgba(52, 211, 153, 0.14)',
  accentText: '#062a25',
  icon: SparklesIcon,
  provider: {
    business: 'Clean & Co.',
    operator: 'Dami Adebayo',
    handle: 'oyadrop.com/clean/cleanandco',
    tagline: 'A calmer, cleaner home — on your schedule.',
    rating: 4.9,
    reviews: 268,
    zone: 'Lekki · Victoria Island · Ikoyi',
    responseTime: 'Replies in ~3 min',
    completed: '1,240 cleans',
    repeatRate: '72% repeat clients'
  },
  offerings: [
  { name: 'Standard clean', price: '₦12,000', duration: '2 hrs', description: 'A dependable reset for everyday spaces.' },
  { name: 'Deep clean', price: '₦24,000', duration: '3 hrs', description: 'Detailed kitchen, bathrooms and surfaces.' },
  { name: 'Move-in / move-out', price: '₦32,000', duration: '4 hrs', description: 'Empty-home detailing before keys change hands.' }],

  requestPrompt: 'Deep clean · 2-bedroom apartment · Today 3:30 PM',
  matchingCopy: 'Matching your home with verified cleaning teams nearby',
  trackingSteps: ['Team assigned', 'On the way', 'Cleaning in progress', 'Quality check', 'Completed'],
  chatOpener: 'Hi! We’ll arrive with all supplies. Any areas you want us to prioritise?',
  estimate: '₦24,000'
},
{
  id: 'fix',
  brand: 'OyaFix',
  label: 'Auto repair',
  accent: '#F59E0B',
  accentSoft: 'rgba(245, 158, 11, 0.14)',
  accentText: '#2b1a00',
  icon: WrenchIcon,
  provider: {
    business: 'TorqueLine Auto Works',
    operator: 'Emeka Nwosu',
    handle: 'oyadrop.com/fix/torqueline',
    tagline: 'Honest diagnosis, fair pricing, fixed right the first time.',
    rating: 4.8,
    reviews: 192,
    zone: 'Lekki · Ajah · Victoria Island',
    responseTime: 'Replies in ~5 min',
    completed: '860 repairs',
    repeatRate: '64% repeat drivers'
  },
  offerings: [
  { name: 'Full diagnostics', price: '₦8,000', duration: '45 min', description: 'Fault scan with a written findings report.' },
  { name: 'Brake service', price: '₦35,000', duration: '1 hr 30 min', description: 'Pad and rotor work plus road test.' },
  { name: 'AC repair', price: '₦45,000', duration: '2 hrs', description: 'Leak test, compressor check and recharge.' }],

  requestPrompt: 'AC repair · Kia Sportage 2020 · Mobile visit',
  matchingCopy: 'Matching your vehicle with certified OyaFix mechanics',
  trackingSteps: ['Mechanic assigned', 'En route to you', 'Diagnosis', 'Repair in progress', 'Completed'],
  chatOpener: 'Good day. I’ll run a pressure test first and send you a quote before any work starts.',
  estimate: '₦45,000'
},
{
  id: 'wash',
  brand: 'OyaWash',
  label: 'Laundry',
  accent: '#2DD4BF',
  accentSoft: 'rgba(45, 212, 191, 0.14)',
  accentText: '#052e2b',
  icon: ShirtIcon,
  provider: {
    business: 'FreshFold Laundry',
    operator: 'Bisi Ogundipe',
    handle: 'oyadrop.com/wash/freshfold',
    tagline: 'Picked up, pressed and back before you need it.',
    rating: 4.7,
    reviews: 431,
    zone: 'Lekki · Ikate · Ajah',
    responseTime: 'Replies in ~2 min',
    completed: '3,100 orders',
    repeatRate: '81% repeat clients'
  },
  offerings: [
  { name: 'Wash & iron', price: '₦800 / kg', duration: '48 hrs', description: 'Everyday wear washed, pressed and folded.' },
  { name: 'Dry cleaning', price: '₦1,500 / item', duration: '72 hrs', description: 'Suits, gowns and delicate fabrics.' },
  { name: 'Express service', price: '+50%', duration: '24 hrs', description: 'Same-day priority handling.' }],

  requestPrompt: 'Wash & iron · 6 kg · Pickup today 5 PM',
  matchingCopy: 'Finding laundries with capacity for your pickup window',
  trackingSteps: ['Order accepted', 'Rider picking up', 'Washing', 'Out for delivery', 'Delivered'],
  chatOpener: 'Hello! Our rider will call you 30 minutes before pickup. Any special care instructions?',
  estimate: '₦4,800'
},
{
  id: 'ride',
  brand: 'OyaRide',
  label: 'Transport',
  accent: '#22D3EE',
  accentSoft: 'rgba(34, 211, 238, 0.14)',
  accentText: '#062e33',
  icon: CarIcon,
  provider: {
    business: 'Kola O.',
    operator: 'Kola Oyelaran',
    handle: 'oyadrop.com/ride/kolao',
    tagline: 'Calm, safe driving across the island.',
    rating: 4.9,
    reviews: 1204,
    zone: 'Island-wide · Mainland by request',
    responseTime: 'Accepts in ~30 sec',
    completed: '5,400 trips',
    repeatRate: '38% repeat riders'
  },
  offerings: [
  { name: 'Bike', price: '₦1,200', duration: '12 min', description: 'Fastest option through traffic.' },
  { name: 'Comfort car', price: '₦3,400', duration: '22 min', description: 'Air-conditioned sedan, up to 4 riders.' },
  { name: 'Van', price: '₦6,800', duration: '25 min', description: 'Extra space for luggage or groups.' }],

  requestPrompt: 'Comfort car · Lekki Phase 1 → Ikoyi',
  matchingCopy: 'Finding drivers close to your pickup point',
  trackingSteps: ['Driver assigned', 'Arriving at pickup', 'Trip started', 'Approaching drop-off', 'Arrived'],
  chatOpener: 'I’m 4 minutes away in a grey Corolla. I’ll wait at the estate gate.',
  estimate: '₦3,400'
},
{
  id: 'meds',
  brand: 'OyaMeds',
  label: 'Pharmacy',
  accent: '#A855F7',
  accentSoft: 'rgba(168, 85, 247, 0.14)',
  accentText: '#26063f',
  icon: PillIcon,
  provider: {
    business: 'CarePoint Pharmacy',
    operator: 'Pharm. Ngozi Alade',
    handle: 'oyadrop.com/meds/carepoint',
    tagline: 'Licensed pharmacists, genuine medication, fast delivery.',
    rating: 4.9,
    reviews: 517,
    zone: 'Lekki · VI · Ikoyi',
    responseTime: 'Replies in ~4 min',
    completed: '2,700 orders',
    repeatRate: '69% repeat customers'
  },
  offerings: [
  { name: 'Prescription fill', price: 'Per script', duration: '90 min', description: 'Pharmacist review then dispatch.' },
  { name: 'Over-the-counter', price: 'Item pricing', duration: '60 min', description: 'Everyday medication and essentials.' },
  { name: 'Wellness bundle', price: '₦9,500', duration: '2 hrs', description: 'Vitamins and immunity support pack.' }],

  requestPrompt: 'Prescription fill · 2 items · Deliver today',
  matchingCopy: 'Checking licensed pharmacies with your items in stock',
  trackingSteps: ['Pharmacist review', 'Order packed', 'Rider dispatched', 'Nearby', 'Delivered'],
  chatOpener: 'Your prescription has been reviewed. Would you like the generic or branded option?',
  estimate: '₦12,300'
},
{
  id: 'glow',
  brand: 'OyaGlow',
  label: 'Beauty',
  accent: '#FB7185',
  accentSoft: 'rgba(251, 113, 133, 0.14)',
  accentText: '#3f0714',
  icon: SparklesIcon,
  provider: {
    business: 'Glow Atelier',
    operator: 'Tola Ajayi',
    handle: 'oyadrop.com/glow/glowatelier',
    tagline: 'Studio-quality hair and nails, at home or in-studio.',
    rating: 4.8,
    reviews: 356,
    zone: 'Lekki · VI · Ikoyi',
    responseTime: 'Replies in ~6 min',
    completed: '1,900 appointments',
    repeatRate: '77% repeat clients'
  },
  offerings: [
  { name: 'Braids & styling', price: '₦18,000', duration: '3 hrs', description: 'Protective styling with consultation.' },
  { name: 'Gel manicure', price: '₦9,000', duration: '1 hr', description: 'Shaping, cuticle care and gel finish.' },
  { name: 'Home spa session', price: '₦28,000', duration: '2 hrs', description: 'Facial and massage in your space.' }],

  requestPrompt: 'Braids & styling · Home visit · Saturday 10 AM',
  matchingCopy: 'Matching your style request with available beauty pros',
  trackingSteps: ['Stylist assigned', 'On the way', 'Session started', 'Finishing touches', 'Completed'],
  chatOpener: 'Hi love! Could you share a reference photo so I can prep the right extensions?',
  estimate: '₦18,000'
},
{
  id: 'eat',
  brand: 'OyaEat',
  label: 'Food',
  accent: '#F87171',
  accentSoft: 'rgba(248, 113, 113, 0.14)',
  accentText: '#3f0a0a',
  icon: UtensilsCrossedIcon,
  provider: {
    business: 'Smoky Grill Kitchen',
    operator: 'Chef Ayo Dada',
    handle: 'oyadrop.com/eat/smokygrill',
    tagline: 'Charcoal-grilled classics, packed hot.',
    rating: 4.7,
    reviews: 892,
    zone: 'Lekki · Ikate',
    responseTime: 'Accepts in ~1 min',
    completed: '6,800 orders',
    repeatRate: '58% repeat customers'
  },
  offerings: [
  { name: 'Grilled chicken plate', price: '₦6,500', duration: '25 min', description: 'Quarter chicken, jollof and plantain.' },
  { name: 'Suya platter', price: '₦9,000', duration: '30 min', description: 'Sharing platter with sides and sauces.' },
  { name: 'Family combo', price: '₦18,500', duration: '35 min', description: 'Feeds four with drinks included.' }],

  requestPrompt: 'Suya platter · Delivery to Ikate',
  matchingCopy: 'Sending your order to nearby kitchens that are open now',
  trackingSteps: ['Order accepted', 'Cooking', 'Packed', 'Rider on the way', 'Delivered'],
  chatOpener: 'Order received! Do you want the pepper mild, medium or hot?',
  estimate: '₦9,000'
},
{
  id: 'buy',
  brand: 'OyaBuy',
  label: 'Groceries',
  accent: '#4ADE80',
  accentSoft: 'rgba(74, 222, 128, 0.14)',
  accentText: '#052e16',
  icon: ShoppingCartIcon,
  provider: {
    business: 'MarketRun Grocers',
    operator: 'Halima Yusuf',
    handle: 'oyadrop.com/buy/marketrun',
    tagline: 'Fresh market picks, shopped by hand.',
    rating: 4.6,
    reviews: 604,
    zone: 'Lekki · Ajah · Sangotedo',
    responseTime: 'Replies in ~3 min',
    completed: '4,200 baskets',
    repeatRate: '74% repeat shoppers'
  },
  offerings: [
  { name: 'Essentials basket', price: '₦21,000', duration: '2 hrs', description: 'Staples, produce and household basics.' },
  { name: 'Fresh produce run', price: '₦12,500', duration: '90 min', description: 'Hand-picked fruit and vegetables.' },
  { name: 'Bulk restock', price: '₦48,000', duration: '3 hrs', description: 'Monthly pantry restock with substitutions.' }],

  requestPrompt: 'Essentials basket · 14 items · Deliver today',
  matchingCopy: 'Assigning a personal shopper for your basket',
  trackingSteps: ['Shopper assigned', 'Shopping', 'Substitutions confirmed', 'Out for delivery', 'Delivered'],
  chatOpener: 'Hello! Tomatoes look better at the second stall — happy for me to swap?',
  estimate: '₦21,000'
}];