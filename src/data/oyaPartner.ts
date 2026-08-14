import {
  BedDoubleIcon,
  Building2Icon,
  CarIcon,
  DropletsIcon,
  HomeIcon,
  SparklesIcon,
  StoreIcon,
  TruckIcon,
  UtensilsCrossedIcon,
  WrenchIcon } from
'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface PartnerServeMode {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface PartnerOffering {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
}

export interface PartnerStaff {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  completed: string;
  responseTime: string;
  available: boolean;
  modes: string[];
  specialties: string[];
}

export interface PartnerServiceLine {
  id: string;
  parentId?: string;
  brand: string;
  label: string;
  description: string;
  accent: string;
  accentSoft: string;
  accentText: string;
  icon: LucideIcon;
  enabled: boolean;
  requiresServeMode: boolean;
  serveModes: PartnerServeMode[];
  offerings: PartnerOffering[];
  providers: PartnerStaff[];
  trackingSteps: string[];
  chatOpener: string;
  estimate: string;
  requestPrompt: string;
}

export interface OyaPartnerBusiness {
  id: string;
  name: string;
  handle: string;
  tagline: string;
  zone: string;
  rating: number;
  reviews: number;
  hours: string;
  operator: string;
  completed: string;
  services: PartnerServiceLine[];
}

export const lekkiServiceHub: OyaPartnerBusiness = {
  id: 'lekki-service-hub',
  name: 'Lekki Service Hub',
  handle: 'oyadrop.com/p/lekkiservicehub',
  tagline: 'One partner for your car, your home, a meal, and a place to stay.',
  zone: 'Lekki · Victoria Island · Ikoyi',
  rating: 4.8,
  reviews: 612,
  hours: 'Open · 8AM–7PM',
  operator: 'Amaka Okoye',
  completed: '4,820 jobs',
  services: [
  {
    id: 'mechanic',
    brand: 'OyaFix',
    label: 'OyaFix',
    description: 'Mechanic service — repairs, servicing, and car wash.',
    accent: '#F59E0B',
    accentSoft: 'rgba(245, 158, 11, 0.14)',
    accentText: '#2b1a00',
    icon: WrenchIcon,
    enabled: true,
    requiresServeMode: true,
    serveModes: [
    { id: 'workshop', label: 'Workshop', description: 'Drop your car at Lekki Phase 1.', icon: Building2Icon },
    { id: 'mobile', label: 'Mobile visit', description: 'A technician comes to you.', icon: CarIcon }],

    offerings: [
    { id: 'diagnostics', name: 'Full diagnostics', price: '₦8,000', duration: '45 min', description: 'OBD scan with a written findings report.' },
    { id: 'oil', name: 'Oil & filter service', price: '₦18,000', duration: '1 hr', description: 'Engine oil, filter change and fluid check.' },
    { id: 'brakes', name: 'Brake service', price: '₦35,000', duration: '1 hr 30 min', description: 'Pad and rotor work plus a road test.' },
    { id: 'ac', name: 'AC repair', price: '₦45,000', duration: '2 hrs', description: 'Leak test, compressor check and recharge.' }],

    providers: [
    { id: 'emeka', name: 'Emeka Nwosu', role: 'Lead technician', rating: 4.9, reviews: 192, completed: '860 jobs', responseTime: '~5 min', available: true, modes: ['workshop', 'mobile'], specialties: ['Diagnostics', 'AC'] },
    { id: 'ibrahim', name: 'Ibrahim Sule', role: 'Brake & suspension', rating: 4.8, reviews: 141, completed: '610 jobs', responseTime: '~8 min', available: true, modes: ['workshop'], specialties: ['Brakes', 'Oil service'] },
    { id: 'tunde', name: 'Tunde Alabi', role: 'Mobile mechanic', rating: 4.7, reviews: 98, completed: '420 jobs', responseTime: '~4 min', available: true, modes: ['mobile', 'workshop'], specialties: ['Mobile visit', 'Battery'] }],

    trackingSteps: ['Mechanic assigned', 'En route / bay ready', 'Diagnosis', 'Repair in progress', 'Completed'],
    chatOpener: 'Good day. I’ll confirm the issue first and send a quote before any work starts.',
    estimate: '₦35,000',
    requestPrompt: 'Repair request · Lekki Service Hub'
  },
  {
    id: 'car-wash',
    parentId: 'mechanic',
    brand: 'OyaFix',
    label: 'Car wash',
    description: 'Exterior, interior and full detail — at the bay or at your location.',
    accent: '#38BDF8',
    accentSoft: 'rgba(56, 189, 248, 0.14)',
    accentText: '#042f3a',
    icon: DropletsIcon,
    enabled: true,
    requiresServeMode: true,
    serveModes: [
    { id: 'bay', label: 'At the workshop', description: 'Drive in. We wash while you wait or drop off.', icon: Building2Icon },
    { id: 'mobile-wash', label: 'Mobile wash', description: 'The wash team comes to your home or office.', icon: CarIcon }],

    offerings: [
    { id: 'exterior', name: 'Exterior wash', price: '₦4,500', duration: '25 min', description: 'Body wash, wheels, tyre shine and dry.' },
    { id: 'interior', name: 'Interior refresh', price: '₦7,500', duration: '40 min', description: 'Vacuum, dash wipe and cabin scent.' },
    { id: 'detail', name: 'Full detail', price: '₦18,000', duration: '90 min', description: 'Exterior, interior and engine-bay wipe-down.' }],

    providers: [
    { id: 'chinedu', name: 'Chinedu Okeke', role: 'Wash lead', rating: 4.8, reviews: 210, completed: '1,140 washes', responseTime: '~3 min', available: true, modes: ['bay', 'mobile-wash'], specialties: ['Full detail', 'Exterior'] },
    { id: 'blessing', name: 'Blessing Ade', role: 'Mobile wash specialist', rating: 4.9, reviews: 176, completed: '890 washes', responseTime: '~2 min', available: true, modes: ['mobile-wash'], specialties: ['Mobile wash', 'Interior'] },
    { id: 'kayode', name: 'Kayode Bello', role: 'Bay attendant', rating: 4.6, reviews: 88, completed: '540 washes', responseTime: '~6 min', available: true, modes: ['bay'], specialties: ['Exterior', 'Drive-in'] }],

    trackingSteps: ['Washer assigned', 'Bay ready / en route', 'Wash in progress', 'Quality check', 'Completed'],
    chatOpener: 'Hi! We’ll treat the paint gently. Any spots you want us to spend extra time on?',
    estimate: '₦7,500',
    requestPrompt: 'Car wash · Lekki Service Hub'
  },
  {
    id: 'clean',
    brand: 'OyaClean',
    label: 'Home cleaning',
    description: 'Verified cleaners for homes and offices, on your schedule.',
    accent: '#34D399',
    accentSoft: 'rgba(52, 211, 153, 0.14)',
    accentText: '#062a25',
    icon: SparklesIcon,
    enabled: true,
    requiresServeMode: true,
    serveModes: [
    { id: 'home', label: 'At your home', description: 'A team arrives with supplies and works around you.', icon: HomeIcon },
    { id: 'office', label: 'Office / commercial', description: 'After-hours or weekend clean for workspaces.', icon: Building2Icon }],

    offerings: [
    { id: 'standard', name: 'Standard clean', price: '₦12,000', duration: '2 hrs', description: 'A dependable reset for everyday spaces.' },
    { id: 'deep', name: 'Deep clean', price: '₦24,000', duration: '3 hrs', description: 'Detailed kitchen, bathrooms and surfaces.' },
    { id: 'move', name: 'Move-in / move-out', price: '₦32,000', duration: '4 hrs', description: 'Empty-home detailing before keys change hands.' }],

    providers: [
    { id: 'dami', name: 'Dami Adebayo', role: 'Team lead', rating: 4.9, reviews: 268, completed: '1,240 cleans', responseTime: '~3 min', available: true, modes: ['home', 'office'], specialties: ['Deep clean', 'Move-out'] },
    { id: 'kemi', name: 'Kemi Lawal', role: 'Home specialist', rating: 4.8, reviews: 154, completed: '720 cleans', responseTime: '~4 min', available: true, modes: ['home'], specialties: ['Standard clean', 'Home visit'] },
    { id: 'maya', name: 'Maya Johnson', role: 'Commercial lead', rating: 4.7, reviews: 119, completed: '510 cleans', responseTime: '~5 min', available: true, modes: ['office', 'home'], specialties: ['Office', 'Post-event'] }],

    trackingSteps: ['Team assigned', 'On the way', 'Cleaning in progress', 'Quality check', 'Completed'],
    chatOpener: 'Hi! We’ll arrive with all supplies. Any rooms you want us to prioritise?',
    estimate: '₦24,000',
    requestPrompt: 'Home clean · Lekki Service Hub'
  },
  {
    id: 'eat',
    brand: 'OyaEat',
    label: 'Food',
    description: 'Kitchen favourites packed hot — delivered or ready for pickup.',
    accent: '#F87171',
    accentSoft: 'rgba(248, 113, 113, 0.14)',
    accentText: '#3f0a0a',
    icon: UtensilsCrossedIcon,
    enabled: true,
    requiresServeMode: true,
    serveModes: [
    { id: 'delivery', label: 'Delivery', description: 'A rider brings your order to your door.', icon: TruckIcon },
    { id: 'pickup', label: 'Pickup', description: 'Collect from the kitchen when it’s ready.', icon: StoreIcon }],

    offerings: [
    { id: 'chicken', name: 'Grilled chicken plate', price: '₦6,500', duration: '25 min', description: 'Quarter chicken, jollof and plantain.' },
    { id: 'suya', name: 'Suya platter', price: '₦9,000', duration: '30 min', description: 'Sharing platter with sides and sauces.' },
    { id: 'family', name: 'Family combo', price: '₦18,500', duration: '35 min', description: 'Feeds four with drinks included.' }],

    providers: [
    { id: 'ayo', name: 'Chef Ayo Dada', role: 'Head chef', rating: 4.8, reviews: 412, completed: '2,140 orders', responseTime: '~1 min', available: true, modes: ['delivery', 'pickup'], specialties: ['Suya', 'Grill'] },
    { id: 'funke', name: 'Funke Bello', role: 'Kitchen lead', rating: 4.7, reviews: 286, completed: '1,560 orders', responseTime: '~2 min', available: true, modes: ['pickup', 'delivery'], specialties: ['Family combo', 'Jollof'] },
    { id: 'ibukun', name: 'Ibukun Ade', role: 'Night kitchen', rating: 4.6, reviews: 154, completed: '890 orders', responseTime: '~3 min', available: true, modes: ['delivery'], specialties: ['Late night', 'Delivery'] }],

    trackingSteps: ['Order accepted', 'Cooking', 'Packed', 'Rider on the way / ready', 'Delivered'],
    chatOpener: 'Order received! Do you want the pepper mild, medium or hot?',
    estimate: '₦9,000',
    requestPrompt: 'Food order · Lekki Service Hub'
  },
  {
    id: 'stay',
    brand: 'OyaStay',
    label: 'Stays',
    description: 'Short stays and nightly rooms managed by this partner.',
    accent: '#A855F7',
    accentSoft: 'rgba(168, 85, 247, 0.14)',
    accentText: '#26063f',
    icon: BedDoubleIcon,
    enabled: true,
    requiresServeMode: true,
    serveModes: [
    { id: 'nightly', label: 'Nightly stay', description: 'Check in for one or more nights.', icon: BedDoubleIcon },
    { id: 'hourly', label: 'Day / hourly rest', description: 'A few hours to refresh, work or wait.', icon: HomeIcon }],

    offerings: [
    { id: 'studio', name: 'Studio suite', price: '₦45,000 / night', duration: '1 night', description: 'Self-contained studio with kitchenette.' },
    { id: 'deluxe', name: 'Deluxe room', price: '₦62,000 / night', duration: '1 night', description: 'King bed, workspace and ensuite.' },
    { id: 'apartment', name: '2-bed apartment', price: '₦95,000 / night', duration: '1 night', description: 'Full apartment for families or groups.' }],

    providers: [
    { id: 'halima', name: 'Halima Yusuf', role: 'Stay host', rating: 4.9, reviews: 188, completed: '640 stays', responseTime: '~6 min', available: true, modes: ['nightly', 'hourly'], specialties: ['Studio', 'Self check-in'] },
    { id: 'chidi', name: 'Chidi Nnamdi', role: 'Property manager', rating: 4.8, reviews: 142, completed: '410 stays', responseTime: '~8 min', available: true, modes: ['nightly'], specialties: ['Apartment', 'Families'] },
    { id: 'zainab', name: 'Zainab Lawal', role: 'Front desk', rating: 4.7, reviews: 96, completed: '280 stays', responseTime: '~4 min', available: true, modes: ['hourly', 'nightly'], specialties: ['Day rest', 'Deluxe'] }],

    trackingSteps: ['Booking confirmed', 'Check-in details sent', 'Ready for arrival', 'In stay', 'Checked out'],
    chatOpener: 'Welcome. I’ll send the gate code and house guide as soon as your dates are locked.',
    estimate: '₦62,000',
    requestPrompt: 'Stay booking · Lekki Service Hub'
  }]

};

export function topLevelServices(partner: OyaPartnerBusiness) {
  return partner.services.filter((service) => !service.parentId);
}

export function childServices(partner: OyaPartnerBusiness, parentId: string) {
  return partner.services.filter((service) => service.parentId === parentId);
}

export function findService(partner: OyaPartnerBusiness, serviceId: string) {
  return partner.services.find((service) => service.id === serviceId);
}
