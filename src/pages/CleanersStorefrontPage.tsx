import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  BadgeCheckIcon,
  BedDoubleIcon,
  Building2Icon,
  CheckIcon,
  CheckCircle2Icon,
  ChevronLeftIcon,
  Clock3Icon,
  HomeIcon,
  MapPinIcon,
  MessageCircleIcon,
  PackageIcon,
  PhoneIcon,
  PlusIcon,
  Share2Icon,
  ShieldCheckIcon,
  SparklesIcon,
  StarIcon,
  UsersIcon,
  XIcon } from
'lucide-react';
type ServiceId = 'standard' | 'deep' | 'move' | 'construction';
type PropertyType = 'Apartment' | 'Duplex' | 'Office';
type CleaningService = {
  id: ServiceId;
  name: string;
  price: number | null;
  duration: string;
  description: string;
  details: string;
};
const services: CleaningService[] = [
{
  id: 'standard',
  name: 'Standard clean',
  price: 12000,
  duration: '2 hrs',
  description: 'A dependable reset for your everyday spaces.',
  details: 'Dusting, kitchen reset, bathrooms, vacuum and mop.'
},
{
  id: 'deep',
  name: 'Deep clean',
  price: 24000,
  duration: '3 hrs',
  description: 'The thorough refresh for busy homes.',
  details:
  'Detailed kitchen, bathroom sanitisation, skirting and upholstery touch-up.'
},
{
  id: 'move',
  name: 'Move-in / Move-out',
  price: 32000,
  duration: '4 hrs',
  description: 'Leave a great first or final impression.',
  details: 'Cabinet interiors, floors, windowsills and empty-home detailing.'
},
{
  id: 'construction',
  name: 'Post-construction',
  price: null,
  duration: 'Custom',
  description: 'Fine dust and finish-cleaning for new spaces.',
  details: 'A tailored scope after a quick property review.'
}];

const availability = [
'Today · 3:30 PM',
'Today · 5:00 PM',
'Tomorrow · 9:00 AM',
'Tomorrow · 12:30 PM',
'Saturday · 10:00 AM'];

const reviews = [
{
  name: 'Sade Williams',
  initial: 'SW',
  date: '3 days ago',
  rating: 5,
  text: 'The team arrived exactly on time and my apartment looked brand new. They even organised the kitchen beautifully.'
},
{
  name: 'Tosin Adeyemi',
  initial: 'TA',
  date: '1 week ago',
  rating: 5,
  text: 'Professional, kind, and incredibly thorough. Clean & Co. is now my regular cleaning team.'
},
{
  name: 'Victor Obi',
  initial: 'VO',
  date: '2 weeks ago',
  rating: 4,
  text: 'Great move-in clean. The building concierge and team coordinated without any stress.'
}];

interface CleanersStorefrontPageProps {
  onBack: () => void;
}
export function CleanersStorefrontPage({
  onBack
}: CleanersStorefrontPageProps) {
  const [selectedService, setSelectedService] =
  useState<CleaningService | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookingStep, setBookingStep] = useState(0);
  const [propertyType, setPropertyType] = useState<PropertyType>('Apartment');
  const [bedrooms, setBedrooms] = useState(2);
  const [address, setAddress] = useState('');
  const [accessNotes, setAccessNotes] = useState('');
  const [datePreference, setDatePreference] = useState('today');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const reference = `CLN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const canContinue =
  bookingStep === 1 ?
  Boolean(address) :
  bookingStep === 2 ?
  Boolean(selectedSlot) :
  bookingStep === 3 ?
  Boolean(guestName && guestPhone) :
  true;
  const closeBooking = () => setBookingStep(0);
  const resetBooking = () => {
    setBookingStep(0);
    setSelectedService(null);
    setSelectedSlot('');
    setAddress('');
    setAccessNotes('');
    setGuestName('');
    setGuestPhone('');
    setGuestNotes('');
  };
  const handleShare = () => {
    navigator.clipboard?.writeText('https://oyadrop.com/clean/cleanandco');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="min-h-screen bg-[#0A0E1A] pb-32 text-white">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#0A0E1A]/95 px-4 py-3 backdrop-blur-xl">
        <motion.button
          aria-label="Back to OyaDrop"
          onClick={onBack}
          whileTap={{
            scale: 0.94
          }}
          className="rounded-full bg-white/5 p-2 text-gray-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-300">
          
          <ArrowLeftIcon className="h-5 w-5" />
        </motion.button>
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-4 w-4 text-emerald-300" />
          <span className="text-xs font-semibold text-gray-400">
            Powered by OyaDrop
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl">
        <section className="relative">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1000&h=520&fit=crop"
            alt="A bright, professionally cleaned living room"
            className="h-52 w-full object-cover opacity-80" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/20 to-transparent" />
          <div className="relative -mt-16 px-4">
            <div className="flex items-end justify-between">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-[#0A0E1A] bg-emerald-400 text-[#05231e] shadow-xl">
                <SparklesIcon className="h-11 w-11" />
              </div>
              <span className="mb-2 flex items-center gap-1.5 rounded-full border border-emerald-300/25 bg-emerald-400/15 px-3 py-1.5 text-xs font-bold text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                Accepting bookings
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <h1 className="text-2xl font-bold">Clean &amp; Co.</h1>
              <BadgeCheckIcon
                className="h-5 w-5 text-emerald-300"
                aria-label="Verified provider" />
              
            </div>
            <p className="mt-1 text-sm text-gray-400">
              A calmer, cleaner home — on your schedule.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5">
                <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" />
                <b>4.9</b>
                <span className="text-gray-500">(268 reviews)</span>
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <MapPinIcon className="h-4 w-4 text-emerald-300" />
                Lekki · VI · Ikoyi
              </span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-4 gap-3 px-4 py-6">
          <ActionButton
            label="WhatsApp"
            className="text-[#25D366] bg-[#25D366]/15"
            icon={MessageCircleIcon} />
          
          <ActionButton
            label="Chat"
            className="text-emerald-300 bg-emerald-400/15"
            icon={MessageCircleIcon} />
          
          <ActionButton
            label="Call"
            className="text-white bg-white/10"
            icon={PhoneIcon} />
          
          <ActionButton
            label={copied ? 'Copied' : 'Share'}
            className="text-white bg-white/10"
            icon={copied ? CheckIcon : Share2Icon}
            onClick={handleShare} />
          
        </section>

        <section className="px-4 pb-7">
          <h2 className="text-lg font-bold">What we clean</h2>
          <p className="mt-1 text-sm text-gray-500">
            Select a service to see the next available times.
          </p>
          <div className="mt-4 space-y-3">
            {services.map((service, index) => {
              const selected = selectedService?.id === service.id;
              return (
                <motion.button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: index * 0.04
                  }}
                  whileTap={{
                    scale: 0.985
                  }}
                  className={`w-full rounded-2xl border-2 p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300 ${selected ? 'border-emerald-400 bg-emerald-400/10' : 'border-white/10 bg-[#131B2E]'}`}>
                  
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${selected ? 'bg-emerald-400 text-[#05231e]' : 'bg-white/5 text-gray-300'}`}>
                      
                      <SparklesIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold">{service.name}</h3>
                          <p className="mt-1 text-xs text-gray-400">
                            {service.description}
                          </p>
                        </div>
                        {selected &&
                        <CheckCircle2Icon className="h-5 w-5 flex-shrink-0 text-emerald-300" />
                        }
                      </div>
                      <p className="mt-3 text-xs text-gray-500">
                        {service.details}
                      </p>
                      <div className="mt-3 flex justify-between text-sm">
                        <span className="text-gray-400">
                          {service.duration}
                        </span>
                        <b className="text-emerald-300">
                          {service.price ?
                          `From ₦${service.price.toLocaleString()}` :
                          'Custom quote'}
                        </b>
                      </div>
                    </div>
                  </div>
                </motion.button>);

            })}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0D1720] px-4 py-6">
          <h2 className="text-lg font-bold">How it works</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
            [
            '1',
            'Select service',
            'Choose the level of care your space needs.'],

            ['2', 'Choose a time', 'Pick a slot that works for your day.'],
            [
            '3',
            'We arrive ready',
            'A vetted team arrives with supplied tools.']].

            map(([number, title, detail]) =>
            <div
              key={number}
              className="rounded-2xl border border-white/10 bg-[#131B2E] p-3">
              
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-xs font-bold text-[#05231e]">
                  {number}
                </span>
                <h3 className="mt-3 text-xs font-bold">{title}</h3>
                <p className="mt-1 text-[10px] leading-4 text-gray-500">
                  {detail}
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="px-4 py-7">
          <h2 className="text-lg font-bold">Our standard</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
            [ShieldCheckIcon, 'Background-checked team'],
            [PackageIcon, 'Supplied tools & products'],
            [CheckCircle2Icon, 'Quality check after every clean'],
            [UsersIcon, 'OyaDrop support coverage']].
            map(([Icon, label]) => {
              const I = Icon as typeof ShieldCheckIcon;
              return (
                <div
                  key={label as string}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#131B2E] p-3">
                  
                  <I className="h-5 w-5 text-emerald-300" />
                  <span className="text-sm text-gray-200">
                    {label as string}
                  </span>
                </div>);

            })}
          </div>
        </section>

        <section className="px-4 pb-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Next available</h2>
              <p className="mt-1 text-sm text-gray-500">
                Choose a time to carry into your request.
              </p>
            </div>
            <Clock3Icon className="h-5 w-5 text-emerald-300" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {availability.map((slot) =>
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`rounded-full border px-3 py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300 ${selectedSlot === slot ? 'border-emerald-400 bg-emerald-400/15 text-emerald-200' : 'border-white/10 bg-[#131B2E] text-gray-400'}`}>
              
                {slot}
              </button>
            )}
          </div>
        </section>

        <section className="px-4 pb-7">
          <h2 className="text-lg font-bold">Service areas</h2>
          <div className="mt-3 rounded-2xl border border-white/10 bg-[#131B2E] p-4">
            <div className="flex gap-3">
              <MapPinIcon className="mt-0.5 h-5 w-5 text-emerald-300" />
              <div>
                <p className="font-semibold">
                  Lekki, Victoria Island &amp; Ikoyi
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Daily service hours: 7:00 AM – 7:00 PM. Outside zones
                  available by request.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-32">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Client reviews</h2>
            <span className="flex items-center gap-1 text-sm font-bold">
              <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" />
              4.9
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {reviews.map((review, index) =>
            <motion.article
              key={review.name}
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.05
              }}
              className="rounded-2xl border border-white/10 bg-[#131B2E] p-4">
              
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-xs font-bold text-emerald-300">
                    {review.initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold">{review.name}</p>
                      <span className="text-xs text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <div className="mt-1 flex">
                      {Array.from({
                      length: review.rating
                    }).map((_, i) =>
                    <StarIcon
                      key={i}
                      className="h-3 w-3 fill-amber-400 text-amber-400" />

                    )}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-300">
                  {review.text}
                </p>
              </motion.article>
            )}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedService && bookingStep === 0 &&
        <motion.div
          initial={{
            y: 120
          }}
          animate={{
            y: 0
          }}
          exit={{
            y: 120
          }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#0A0E1A]/95 p-4 backdrop-blur-xl">
          
            <div className="mx-auto max-w-2xl">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    {selectedService.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedSlot || 'Choose a time in the booking flow'}
                  </p>
                </div>
                <p className="text-lg font-bold text-emerald-300">
                  {selectedService.price ?
                `From ₦${selectedService.price.toLocaleString()}` :
                'Quote'}
                </p>
              </div>
              <motion.button
              onClick={() => setBookingStep(1)}
              whileTap={{
                scale: 0.98
              }}
              className="w-full rounded-xl bg-emerald-400 py-4 text-base font-bold text-[#05231e]">
              
                Request a clean
              </motion.button>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <AnimatePresence>
        {bookingStep > 0 && selectedService &&
        <>
            <motion.button
            aria-label="Close booking"
            onClick={closeBooking}
            className="fixed inset-0 z-40 cursor-default bg-black/65"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }} />
          
            <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88vh] max-w-2xl flex-col rounded-t-3xl border-t border-white/10 bg-[#131B2E]"
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
              stiffness: 320
            }}>
            
              <div className="flex justify-center py-3">
                <div className="h-1.5 w-12 rounded-full bg-white/20" />
              </div>
              {bookingStep < 5 &&
            <header className="flex items-center justify-between border-b border-white/10 px-5 pb-3">
                  <div className="flex items-center gap-2">
                    {bookingStep > 1 &&
                <button
                  aria-label="Previous booking step"
                  onClick={() => setBookingStep((step) => step - 1)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-white/5">
                  
                        <ChevronLeftIcon className="h-5 w-5" />
                      </button>
                }
                    <h2 id="booking-title" className="text-lg font-bold">
                      {bookingStep === 1 ?
                  'Tell us about your space' :
                  bookingStep === 2 ?
                  'Choose a time' :
                  bookingStep === 3 ?
                  'Your details' :
                  'Review request'}
                    </h2>
                  </div>
                  <button
                aria-label="Close booking"
                onClick={closeBooking}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/5">
                
                    <XIcon className="h-5 w-5" />
                  </button>
                </header>
            }
              <div className="flex-1 overflow-y-auto px-5 py-5">
                {bookingStep === 1 &&
              <div className="space-y-5">
                    <div>
                      <p className="mb-3 text-sm font-semibold text-gray-400">
                        Property type
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {(
                    [
                    {
                      label: 'Apartment',
                      icon: HomeIcon
                    },
                    {
                      label: 'Duplex',
                      icon: Building2Icon
                    },
                    {
                      label: 'Office',
                      icon: Building2Icon
                    }] as
                    const).
                    map(({ label, icon: Icon }) =>
                    <button
                      key={label}
                      onClick={() => setPropertyType(label)}
                      className={`rounded-xl border p-3 text-center ${propertyType === label ? 'border-emerald-400 bg-emerald-400/10 text-emerald-200' : 'border-white/10 bg-[#0A0E1A] text-gray-400'}`}>
                      
                            <Icon className="mx-auto h-5 w-5" />
                            <span className="mt-2 block text-xs font-semibold">
                              {label}
                            </span>
                          </button>
                    )}
                      </div>
                    </div>
                    {propertyType !== 'Office' &&
                <div>
                        <p className="mb-2 text-sm font-semibold text-gray-400">
                          Bedrooms
                        </p>
                        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0A0E1A] p-3">
                          <BedDoubleIcon className="h-5 w-5 text-emerald-300" />
                          <span className="flex-1 text-sm">
                            {bedrooms} bedroom{bedrooms > 1 ? 's' : ''}
                          </span>
                          <button
                      aria-label="Remove bedroom"
                      onClick={() =>
                      setBedrooms((value) => Math.max(1, value - 1))
                      }
                      className="h-8 w-8 rounded-lg bg-white/5">
                      
                            −
                          </button>
                          <button
                      aria-label="Add bedroom"
                      onClick={() =>
                      setBedrooms((value) => Math.min(6, value + 1))
                      }
                      className="h-8 w-8 rounded-lg bg-emerald-400 text-[#05231e]">
                      
                            <PlusIcon className="mx-auto h-4 w-4" />
                          </button>
                        </div>
                      </div>
                }
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-400">
                        Service address
                      </label>
                      <input
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Enter your building and street address"
                    className="w-full rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-emerald-400" />
                  
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-400">
                        Access notes (optional)
                      </label>
                      <textarea
                    value={accessNotes}
                    onChange={(event) => setAccessNotes(event.target.value)}
                    placeholder="Gate instructions, parking, pets, etc."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-emerald-400" />
                  
                    </div>
                  </div>
              }
                {bookingStep === 2 &&
              <div>
                    <div className="grid grid-cols-3 gap-3">
                      {['today', 'tomorrow', 'later'].map((day) =>
                  <button
                    key={day}
                    onClick={() => setDatePreference(day)}
                    className={`rounded-xl border p-3 capitalize text-sm font-semibold ${datePreference === day ? 'border-emerald-400 bg-emerald-400/10 text-emerald-200' : 'border-white/10 bg-[#0A0E1A] text-gray-400'}`}>
                    
                          {day}
                        </button>
                  )}
                    </div>
                    <p className="mt-6 mb-3 text-sm font-semibold text-gray-400">
                      Available slots
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {availability.map((slot) =>
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${selectedSlot === slot ? 'border-emerald-400 bg-emerald-400/10 text-emerald-200' : 'border-white/10 bg-[#0A0E1A] text-gray-400'}`}>
                    
                          {slot}
                        </button>
                  )}
                    </div>
                  </div>
              }
                {bookingStep === 3 &&
              <div className="space-y-4">
                    <p className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-100">
                      No account required. We only use these details to confirm
                      your clean.
                    </p>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-400">
                        Full name
                      </label>
                      <input
                    value={guestName}
                    onChange={(event) => setGuestName(event.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-emerald-400" />
                  
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-400">
                        Phone / WhatsApp
                      </label>
                      <input
                    type="tel"
                    value={guestPhone}
                    onChange={(event) => setGuestPhone(event.target.value)}
                    placeholder="+234 801 234 5678"
                    className="w-full rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-emerald-400" />
                  
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-400">
                        Cleaning notes (optional)
                      </label>
                      <textarea
                    value={guestNotes}
                    onChange={(event) => setGuestNotes(event.target.value)}
                    placeholder="Areas to focus on, allergies, preferred products..."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-emerald-400" />
                  
                    </div>
                  </div>
              }
                {bookingStep === 4 &&
              <div className="space-y-4">
                    <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4">
                      <p className="text-sm font-bold text-emerald-200">
                        Request summary
                      </p>
                      <div className="mt-3 space-y-2 text-sm">
                        {[
                    ['Service', selectedService.name],
                    [
                    'Property',
                    `${propertyType}${propertyType !== 'Office' ? ` · ${bedrooms} bedroom${bedrooms > 1 ? 's' : ''}` : ''}`],

                    ['Time', selectedSlot],
                    ['Address', address],
                    ['Guest', guestName],
                    ['Phone', guestPhone]].
                    map(([label, value]) =>
                    <div
                      key={label}
                      className="flex justify-between gap-5">
                      
                            <span className="text-gray-400">{label}</span>
                            <span className="max-w-[65%] text-right font-semibold text-white">
                              {value}
                            </span>
                          </div>
                    )}
                        <div className="mt-3 flex justify-between border-t border-emerald-400/20 pt-3">
                          <span className="font-bold">Expected amount</span>
                          <span className="font-bold text-emerald-200">
                            {selectedService.price ?
                        `From ₦${selectedService.price.toLocaleString()}` :
                        'Custom quote'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-xs leading-5 text-gray-500">
                      Clean &amp; Co. will confirm the final scope, arrival
                      window, and applicable deposit policy before service
                      begins.
                    </p>
                  </div>
              }
                {bookingStep === 5 &&
              <div className="flex flex-col items-center py-8 text-center">
                    <motion.div
                  initial={{
                    scale: 0
                  }}
                  animate={{
                    scale: 1
                  }}
                  transition={{
                    type: 'spring',
                    damping: 14
                  }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/15">
                  
                      <CheckCircle2Icon className="h-12 w-12 text-emerald-300" />
                    </motion.div>
                    <h2 className="mt-6 text-2xl font-bold">
                      Request received
                    </h2>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">
                      Dami and the Clean &amp; Co. team will confirm your
                      cleaning time and final details shortly.
                    </p>
                    <p className="mt-5 font-mono text-sm font-bold text-emerald-300">
                      Ref: {reference}
                    </p>
                    <div className="mt-8 grid w-full grid-cols-2 gap-3">
                      <button className="rounded-xl border border-[#25D366]/30 bg-[#25D366]/15 py-3 text-sm font-semibold text-[#25D366]">
                        WhatsApp
                      </button>
                      <button className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 py-3 text-sm font-semibold text-emerald-200">
                        OyaDrop Chat
                      </button>
                    </div>
                    <button
                  onClick={resetBooking}
                  className="mt-3 w-full rounded-xl bg-emerald-400 py-3.5 font-bold text-[#05231e]">
                  
                      Done
                    </button>
                  </div>
              }
              </div>
              {bookingStep >= 1 && bookingStep <= 4 &&
            <footer className="border-t border-white/10 bg-[#0A0E1A] p-4">
                  <motion.button
                disabled={!canContinue}
                onClick={() =>
                setBookingStep((step) => step === 4 ? 5 : step + 1)
                }
                whileTap={
                canContinue ?
                {
                  scale: 0.98
                } :
                {}
                }
                className={`w-full rounded-xl py-3.5 font-bold ${canContinue ? 'bg-emerald-400 text-[#05231e]' : 'cursor-not-allowed bg-gray-700 text-gray-400'}`}>
                
                    {bookingStep === 4 ? 'Confirm request' : 'Continue'}
                  </motion.button>
                </footer>
            }
            </motion.section>
          </>
        }
      </AnimatePresence>
    </div>);

}
function ActionButton({
  label,
  icon: Icon,
  className,
  onClick





}: {label: string;icon: typeof PhoneIcon;className: string;onClick?: () => void;}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{
        scale: 0.95
      }}
      className="flex flex-col items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-300">
      
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full ${className}`}>
        
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-xs text-gray-400">{label}</span>
    </motion.button>);

}