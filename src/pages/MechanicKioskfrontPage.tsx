import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  BadgeCheckIcon,
  CarIcon,
  CheckCircle2Icon,
  CheckIcon,
  Clock3Icon,
  MapPinIcon,
  MessageCircleIcon,
  PackageIcon,
  PhoneIcon,
  Share2Icon,
  ShieldCheckIcon,
  StarIcon,
  UsersIcon,
  WrenchIcon,
  XIcon } from
'lucide-react';

type ServiceMode = 'Workshop' | 'Mobile visit';

interface RepairService {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
}

const repairServices: RepairService[] = [
{ id: 'diagnostics', name: 'Full diagnostics', price: 'From ₦8,000', duration: '45 min', description: 'OBD scan, fault reading, and a written findings report.' },
{ id: 'oil', name: 'Oil & filter service', price: 'From ₦18,000', duration: '1 hr', description: 'Engine oil, filter change, and fluid level check.' },
{ id: 'brakes', name: 'Brake service', price: 'From ₦35,000', duration: '1 hr 30 min', description: 'Pad and rotor inspection, replacement, and road test.' },
{ id: 'ac', name: 'AC repair', price: 'From ₦45,000', duration: '2 hrs', description: 'Pressure test, leak detection, compressor check, and recharge.' },
{ id: 'battery', name: 'Battery & electricals', price: 'From ₦60,000', duration: '1 hr', description: 'Load test, alternator output check, and battery fitting.' },
{ id: 'recovery', name: 'Roadside recovery', price: 'Custom quote', duration: 'On request', description: 'Jump start, tyre change, or tow to the workshop.' }];


const availability = ['Today · 2:00 PM', 'Today · 4:30 PM', 'Tomorrow · 8:30 AM', 'Tomorrow · 11:00 AM', 'Saturday · 9:00 AM'];

const reviews = [
{ name: 'Adaeze Okonkwo', initials: 'AO', date: '4 days ago', rating: 5, text: 'They diagnosed a fault two other workshops missed and explained the repair cost clearly before starting.' },
{ name: 'Segun Balogun', initials: 'SB', date: '2 weeks ago', rating: 5, text: 'Brake job finished in under two hours and the invoice matched the quote exactly.' },
{ name: 'Musa Bello', initials: 'MB', date: '1 month ago', rating: 4, text: 'The mobile technician came to my office and replaced my battery on the spot. Very convenient.' }];


const trustPoints: [typeof ShieldCheckIcon, string][] = [
[ShieldCheckIcon, 'Certified technicians'],
[PackageIcon, 'Genuine parts sourcing'],
[CheckCircle2Icon, '3-month service warranty'],
[UsersIcon, 'OyaDrop support coverage']];


interface MechanicKioskfrontPageProps {
  onBack: () => void;
}

export function MechanicKioskfrontPage({ onBack }: MechanicKioskfrontPageProps) {
  const [selectedService, setSelectedService] = useState<RepairService | null>(null);
  const [serviceMode, setServiceMode] = useState<ServiceMode>('Workshop');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookingStep, setBookingStep] = useState(0);
  const [vehicle, setVehicle] = useState('');
  const [plate, setPlate] = useState('');
  const [concern, setConcern] = useState('');
  const [location, setLocation] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [copied, setCopied] = useState(false);

  const reference = `FIX-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const canContinue =
  bookingStep === 1 ? Boolean(vehicle && concern) : bookingStep === 2 ? Boolean(selectedSlot && (serviceMode === 'Workshop' || location)) : bookingStep === 3 ? Boolean(guestName && guestPhone) : true;

  const resetBooking = () => {
    setBookingStep(0);
    setSelectedService(null);
    setSelectedSlot('');
    setVehicle('');
    setPlate('');
    setConcern('');
    setLocation('');
    setGuestName('');
    setGuestPhone('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText('https://oyadrop.com/fix/torqueline');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const stepTitles = ['', 'Vehicle & issue', 'Where & when', 'Your details', 'Review request', 'Request sent'];

  return (
    <div className="min-h-screen bg-[#0A0E1A] pb-32 text-white">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#0A0E1A]/95 px-4 py-3 backdrop-blur-xl">
        <motion.button aria-label="Back to OyaDrop" onClick={onBack} whileTap={{ scale: 0.94 }} className="rounded-full bg-white/5 p-2 text-gray-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400">
          <ArrowLeftIcon className="h-5 w-5" />
        </motion.button>
        <div className="flex items-center gap-2">
          <WrenchIcon className="h-4 w-4 text-amber-300" />
          <span className="text-xs font-semibold text-gray-400">OyaFix kioskfront</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl">
        <section className="relative">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&h=520&fit=crop"
            alt="A vehicle being serviced inside a professional workshop"
            className="h-52 w-full object-cover opacity-70" />
          
          <div className="absolute inset-0 bg-[#0A0E1A]/55" />
          <div className="relative -mt-16 px-4">
            <div className="flex items-end justify-between">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-[#0A0E1A] bg-amber-400 text-[#2b1a00] shadow-xl">
                <WrenchIcon className="h-11 w-11" />
              </div>
              <span className="mb-2 flex items-center gap-1.5 rounded-full border border-amber-300/25 bg-amber-400/15 px-3 py-1.5 text-xs font-bold text-amber-200">
                <span className="h-2 w-2 rounded-full bg-amber-300" />
                Open · 8AM–7PM
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <h1 className="text-2xl font-bold">TorqueLine Auto Works</h1>
              <BadgeCheckIcon className="h-5 w-5 text-amber-300" aria-label="Verified provider" />
            </div>
            <p className="mt-1 text-sm text-gray-400">Honest diagnosis, fair pricing, cars fixed right the first time.</p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5">
                <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" />
                <b>4.8</b>
                <span className="text-gray-500">(192 reviews)</span>
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <MapPinIcon className="h-4 w-4 text-amber-300" />
                Lekki · Ajah · VI
              </span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-4 gap-3 px-4 py-6">
          <ActionButton label="WhatsApp" icon={MessageCircleIcon} className="bg-[#25D366]/15 text-[#25D366]" />
          <ActionButton label="Chat" icon={MessageCircleIcon} className="bg-amber-400/15 text-amber-300" />
          <ActionButton label="Call" icon={PhoneIcon} className="bg-white/10 text-white" />
          <ActionButton label={copied ? 'Copied' : 'Share'} icon={copied ? CheckIcon : Share2Icon} className="bg-white/10 text-white" onClick={handleShare} />
        </section>

        <section className="px-4 pb-7">
          <h2 className="text-lg font-bold">How would you like to be served?</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(['Workshop', 'Mobile visit'] as ServiceMode[]).map((mode) => {
              const selected = serviceMode === mode;
              return (
                <motion.button
                  key={mode}
                  onClick={() => setServiceMode(mode)}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-2xl border-2 p-4 text-left ${selected ? 'border-amber-400 bg-amber-400/10' : 'border-white/10 bg-[#131B2E]'}`}>
                  
                  {mode === 'Workshop' ? <WrenchIcon className={`h-5 w-5 ${selected ? 'text-amber-300' : 'text-gray-400'}`} /> : <CarIcon className={`h-5 w-5 ${selected ? 'text-amber-300' : 'text-gray-400'}`} />}
                  <p className="mt-3 text-sm font-bold">{mode}</p>
                  <p className="mt-1 text-xs text-gray-500">{mode === 'Workshop' ? 'Drop your car at Lekki Phase 1.' : 'A technician comes to you.'}</p>
                </motion.button>);

            })}
          </div>
        </section>

        <section className="px-4 pb-7">
          <h2 className="text-lg font-bold">What needs fixing?</h2>
          <p className="mt-1 text-sm text-gray-500">Select a service to start a repair request.</p>
          <div className="mt-4 space-y-3">
            {repairServices.map((service, index) => {
              const selected = selectedService?.id === service.id;
              return (
                <motion.button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  whileTap={{ scale: 0.985 }}
                  className={`w-full rounded-2xl border-2 p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${selected ? 'border-amber-400 bg-amber-400/10' : 'border-white/10 bg-[#131B2E]'}`}>
                  
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${selected ? 'bg-amber-400 text-[#2b1a00]' : 'bg-white/5 text-gray-300'}`}>
                      <WrenchIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold">{service.name}</h3>
                        <span className="whitespace-nowrap text-sm font-bold text-amber-300">{service.price}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-400">{service.description}</p>
                      <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                        <Clock3Icon className="h-3.5 w-3.5" />
                        {service.duration}
                      </p>
                    </div>
                  </div>
                </motion.button>);

            })}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0D1720] px-4 py-6">
          <h2 className="text-lg font-bold">Our standard</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {trustPoints.map(([Icon, label]) =>
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#131B2E] p-3">
                <Icon className="h-5 w-5 flex-shrink-0 text-amber-300" />
                <span className="text-sm text-gray-200">{label}</span>
              </div>
            )}
          </div>
        </section>

        <section className="px-4 py-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Next available</h2>
              <p className="mt-1 text-sm text-gray-500">Choose a slot to carry into your request.</p>
            </div>
            <Clock3Icon className="h-5 w-5 text-amber-300" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {availability.map((slot) =>
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${selectedSlot === slot ? 'border-amber-400 bg-amber-400/15 text-amber-200' : 'border-white/10 bg-[#131B2E] text-gray-400'}`}>
              
                {slot}
              </button>
            )}
          </div>
        </section>

        <section className="px-4 pb-7">
          <h2 className="text-lg font-bold">Workshop & coverage</h2>
          <div className="mt-3 rounded-2xl border border-white/10 bg-[#131B2E] p-4">
            <div className="flex gap-3">
              <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300" />
              <div>
                <p className="font-semibold">12 Admiralty Road, Lekki Phase 1</p>
                <p className="mt-1 text-sm text-gray-500">Mobile visits across Lekki, Ajah and Victoria Island. Recovery available by request.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-32">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Driver reviews</h2>
            <span className="flex items-center gap-1 text-sm font-bold">
              <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" />
              4.8
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {reviews.map((review, index) =>
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-white/10 bg-[#131B2E] p-4">
              
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/15 text-sm font-bold text-amber-200">{review.initials}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }).map((_, starIndex) =>
                  <StarIcon key={starIndex} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  )}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-300">{review.text}</p>
              </motion.article>
            )}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedService && bookingStep === 0 &&
        <motion.div initial={{ y: 120 }} animate={{ y: 0 }} exit={{ y: 120 }} className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#0A0E1A]/95 p-4 backdrop-blur-xl">
            <div className="mx-auto max-w-2xl">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{selectedService.name}</p>
                  <p className="text-xs text-gray-500">{serviceMode}{selectedSlot ? ` · ${selectedSlot}` : ''}</p>
                </div>
                <p className="text-base font-bold text-amber-300">{selectedService.price}</p>
              </div>
              <motion.button onClick={() => setBookingStep(1)} whileTap={{ scale: 0.98 }} className="w-full rounded-xl bg-amber-400 py-4 text-base font-bold text-[#2b1a00]">
                Request this repair
              </motion.button>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <AnimatePresence>
        {bookingStep > 0 && selectedService &&
        <>
            <motion.button aria-label="Close request flow" onClick={() => setBookingStep(0)} className="fixed inset-0 z-40 cursor-default bg-black/65" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="fix-booking-title"
            className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92vh] max-w-2xl flex-col rounded-t-3xl border-t border-white/10 bg-[#131B2E]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}>
            
              <header className="flex items-start justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">{bookingStep < 5 ? `Step ${bookingStep} of 4` : 'Confirmed'}</p>
                  <h2 id="fix-booking-title" className="mt-1 text-lg font-bold">{stepTitles[bookingStep]}</h2>
                </div>
                <button aria-label="Close request flow" onClick={() => bookingStep === 5 ? resetBooking() : setBookingStep(0)} className="rounded-lg p-2 text-gray-400 hover:bg-white/5">
                  <XIcon className="h-5 w-5" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-5 py-5">
                {bookingStep === 1 &&
              <div className="space-y-4">
                    <Field label="Vehicle make, model & year" value={vehicle} onChange={setVehicle} placeholder="e.g. Toyota Corolla 2018" />
                    <Field label="Plate number (optional)" value={plate} onChange={setPlate} placeholder="e.g. LSD-427-KJ" />
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-400">What is the car doing?</label>
                      <textarea
                    value={concern}
                    onChange={(event) => setConcern(event.target.value)}
                    rows={4}
                    placeholder="Describe the noise, warning light, or behaviour you noticed..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-amber-400" />
                  
                    </div>
                    <p className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm leading-5 text-amber-100">
                      A technician confirms the final cost after diagnosis — you approve before any work starts.
                    </p>
                  </div>
              }

                {bookingStep === 2 &&
              <div className="space-y-5">
                    <div>
                      <p className="mb-3 text-sm font-semibold text-gray-400">Service mode</p>
                      <div className="grid grid-cols-2 gap-3">
                        {(['Workshop', 'Mobile visit'] as ServiceMode[]).map((mode) =>
                    <button
                      key={mode}
                      onClick={() => setServiceMode(mode)}
                      className={`rounded-xl border-2 p-3 text-sm font-semibold ${serviceMode === mode ? 'border-amber-400 bg-amber-400/10 text-amber-200' : 'border-white/10 bg-[#0A0E1A] text-gray-400'}`}>
                      
                            {mode}
                          </button>
                    )}
                      </div>
                    </div>
                    {serviceMode === 'Mobile visit' && <Field label="Where should we come to?" value={location} onChange={setLocation} placeholder="Building, street and area" />}
                    <div>
                      <p className="mb-3 text-sm font-semibold text-gray-400">Preferred slot</p>
                      <div className="flex flex-wrap gap-2">
                        {availability.map((slot) =>
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`rounded-full border px-3 py-2 text-xs font-semibold ${selectedSlot === slot ? 'border-amber-400 bg-amber-400/15 text-amber-200' : 'border-white/10 bg-[#0A0E1A] text-gray-400'}`}>
                      
                            {slot}
                          </button>
                    )}
                      </div>
                    </div>
                  </div>
              }

                {bookingStep === 3 &&
              <div className="space-y-4">
                    <p className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm text-amber-100">No account required. We only use these details to confirm your repair.</p>
                    <Field label="Full name" value={guestName} onChange={setGuestName} placeholder="e.g. Musa Bello" />
                    <Field label="Phone / WhatsApp" value={guestPhone} onChange={setGuestPhone} placeholder="e.g. 0803 000 0000" type="tel" />
                  </div>
              }

                {bookingStep === 4 &&
              <div className="space-y-4">
                    <div className="rounded-2xl border border-amber-400/25 bg-amber-400/10 p-4">
                      <p className="text-sm font-bold text-amber-200">Request summary</p>
                      <div className="mt-3 space-y-2 text-sm">
                        {[
                    ['Service', selectedService.name],
                    ['Vehicle', vehicle],
                    ['Plate', plate || 'Not provided'],
                    ['Mode', serviceMode],
                    ['Location', serviceMode === 'Workshop' ? '12 Admiralty Road, Lekki Phase 1' : location],
                    ['Slot', selectedSlot],
                    ['Contact', `${guestName} · ${guestPhone}`],
                    ['Estimate', selectedService.price]].
                    map(([label, value]) =>
                    <div key={label} className="flex justify-between gap-4">
                            <span className="text-gray-400">{label}</span>
                            <span className="text-right font-semibold text-white">{value}</span>
                          </div>
                    )}
                      </div>
                    </div>
                    <p className="text-xs leading-5 text-gray-500">TorqueLine confirms the diagnosis, parts cost, and turnaround time before starting work. Parts are paid upfront.</p>
                  </div>
              }

                {bookingStep === 5 &&
              <div className="flex flex-col items-center py-8 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 14 }} className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-400/15">
                      <CheckCircle2Icon className="h-12 w-12 text-amber-300" />
                    </motion.div>
                    <h2 className="mt-6 text-2xl font-bold">Request sent</h2>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-gray-400">TorqueLine Auto Works will confirm your {selectedService.name.toLowerCase()} shortly.</p>
                    <p className="mt-5 rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-sm font-bold tracking-wider text-amber-200">{reference}</p>
                    <button onClick={() => window.setTimeout(resetBooking, 100)} className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 py-3.5 font-semibold">Message on WhatsApp</button>
                    <button onClick={resetBooking} className="mt-3 w-full rounded-xl bg-amber-400 py-3.5 font-bold text-[#2b1a00]">Done</button>
                  </div>
              }
              </div>

              {bookingStep >= 1 && bookingStep <= 4 &&
            <footer className="flex gap-3 border-t border-white/10 bg-[#0A0E1A] p-4">
                  {bookingStep > 1 &&
              <button onClick={() => setBookingStep(bookingStep - 1)} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3.5 font-semibold">
                      Back
                    </button>
              }
                  <motion.button
                disabled={!canContinue}
                onClick={() => setBookingStep(bookingStep === 4 ? 5 : bookingStep + 1)}
                whileTap={canContinue ? { scale: 0.98 } : {}}
                className={`flex-1 rounded-xl py-3.5 font-bold ${canContinue ? 'bg-amber-400 text-[#2b1a00]' : 'cursor-not-allowed bg-gray-700 text-gray-400'}`}>
                
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

function ActionButton({ label, icon: Icon, className, onClick }: {label: string;icon: typeof PhoneIcon;className: string;onClick?: () => void;}) {
  return (
    <motion.button onClick={onClick} whileTap={{ scale: 0.95 }} className="flex flex-col items-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-400">
      <span className={`flex h-12 w-12 items-center justify-center rounded-full ${className}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-xs text-gray-400">{label}</span>
    </motion.button>);

}

function Field({ label, value, onChange, placeholder, type = 'text' }: {label: string;value: string;onChange: (value: string) => void;placeholder: string;type?: string;}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-amber-400" />
      
    </div>);

}