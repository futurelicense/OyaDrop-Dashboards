import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Navigation,
  ArrowDownUp,
  User,
  Plus,
  Home,
  Briefcase,
  Clock,
  ChevronDown,
  Baby,
  Accessibility,
  Check,
  X } from
'lucide-react';
interface LocationStepProps {
  pickup: string;
  destination: string;
  stops: string[];
  onPickupChange: (val: string) => void;
  onDestinationChange: (val: string) => void;
  onStopsChange: (val: string[]) => void;
  onContinue: () => void;
}
export function LocationStep({
  pickup,
  destination,
  stops,
  onPickupChange,
  onDestinationChange,
  onStopsChange,
  onContinue
}: LocationStepProps) {
  const [forMe, setForMe] = useState(true);
  const [filters, setFilters] = useState({
    gender: false,
    childSeat: false,
    accessible: false
  });
  const [destLater, setDestLater] = useState(false);
  const handleSwap = () => {
    const temp = pickup;
    onPickupChange(destination);
    onDestinationChange(temp);
  };
  const addStop = () => {
    if (stops.length < 3) {
      onStopsChange([...stops, '']);
    }
  };
  const updateStop = (index: number, val: string) => {
    const newStops = [...stops];
    newStops[index] = val;
    onStopsChange(newStops);
  };
  const removeStop = (index: number) => {
    const newStops = stops.filter((_, i) => i !== index);
    onStopsChange(newStops);
  };
  const canContinue = pickup && (destination || destLater);
  return (
    <motion.div
      className="px-4 py-2 space-y-6"
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
        x: -20
      }}>
      
      {/* For Me Toggle */}
      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 bg-[#131B2E] border border-white/10 px-4 py-2 rounded-full text-sm font-semibold text-white"
          onClick={() => setForMe(!forMe)}>
          
          <User className="w-4 h-4 text-cyan-400" />
          {forMe ? 'For Me' : 'For Someone Else'}
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Location Inputs */}
      <div className="bg-[#131B2E] rounded-2xl p-4 border border-white/10 relative">
        <div className="space-y-4 relative">
          {/* Pickup */}
          <div className="relative flex items-center">
            <div className="w-8 flex justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <input
              type="text"
              placeholder="Current Location"
              value={pickup}
              onChange={(e) => onPickupChange(e.target.value)}
              className="flex-1 bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/5 focus:border-cyan-500/50 focus:outline-none text-sm" />
            
          </div>

          {/* Stops */}
          {stops.map((stop, index) =>
          <div key={index} className="relative flex items-center">
              <div className="w-8 flex justify-center">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
              </div>
              <div className="flex-1 flex gap-2">
                <input
                type="text"
                placeholder="Add stop"
                value={stop}
                onChange={(e) => updateStop(index, e.target.value)}
                className="flex-1 bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/5 focus:border-cyan-500/50 focus:outline-none text-sm" />
              
                <button
                onClick={() => removeStop(index)}
                className="p-3 bg-red-500/10 text-red-400 rounded-xl">
                
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Dropoff */}
          {!destLater &&
          <div className="relative flex items-center">
              <div className="w-8 flex justify-center">
                <div className="w-2.5 h-2.5 rounded-sm bg-red-500" />
              </div>
              <input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => onDestinationChange(e.target.value)}
              className="flex-1 bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/5 focus:border-cyan-500/50 focus:outline-none text-sm" />
            
            </div>
          }

          {/* Connecting Line */}
          <div className="absolute left-[15px] top-8 bottom-8 w-[2px] bg-white/10 -z-10" />
        </div>

        {/* Swap Button */}
        {!destLater && stops.length === 0 &&
        <button
          onClick={handleSwap}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0A0E1A] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10">
          
            <ArrowDownUp className="w-4 h-4" />
          </button>
        }
      </div>

      {/* Filters & Options */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() =>
          setFilters((f) => ({
            ...f,
            gender: !f.gender
          }))
          }
          className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${filters.gender ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-[#131B2E] border-white/10 text-gray-400'}`}>
          
          <User className="w-3.5 h-3.5" /> Female Driver
        </button>
        <button
          onClick={() =>
          setFilters((f) => ({
            ...f,
            childSeat: !f.childSeat
          }))
          }
          className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${filters.childSeat ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-[#131B2E] border-white/10 text-gray-400'}`}>
          
          <Baby className="w-3.5 h-3.5" /> Child Seat
        </button>
        <button
          onClick={() =>
          setFilters((f) => ({
            ...f,
            accessible: !f.accessible
          }))
          }
          className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${filters.accessible ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-[#131B2E] border-white/10 text-gray-400'}`}>
          
          <Accessibility className="w-3.5 h-3.5" /> Accessible
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${destLater ? 'bg-cyan-500 border-cyan-500' : 'border-white/20 bg-[#131B2E]'}`}>
            
            {destLater && <Check className="w-3 h-3 text-white" />}
          </div>
          <input
            type="checkbox"
            className="hidden"
            checked={destLater}
            onChange={(e) => setDestLater(e.target.checked)} />
          
          Add Destination Later
        </label>

        {!destLater && stops.length < 3 &&
        <button
          onClick={addStop}
          className="flex items-center gap-1 text-sm text-cyan-400 font-semibold">
          
            <Plus className="w-4 h-4" /> Add Stop
          </button>
        }
      </div>

      {/* Saved Locations */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3">Saved Locations</h3>
        <div className="space-y-2">
          <button
            onClick={() => onDestinationChange('2931 Shady Pines Drive, Lekki')}
            className="w-full flex items-center gap-4 p-3 bg-[#131B2E] border border-white/5 rounded-xl hover:bg-white/5 transition-colors text-left">
            
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
              <Home className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Home</p>
              <p className="text-xs text-gray-400 truncate">
                2931 Shady Pines Drive, Lekki
              </p>
            </div>
          </button>
          <button
            onClick={() => onDestinationChange('1840 Columbia Mine Road, VI')}
            className="w-full flex items-center gap-4 p-3 bg-[#131B2E] border border-white/5 rounded-xl hover:bg-white/5 transition-colors text-left">
            
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Work</p>
              <p className="text-xs text-gray-400 truncate">
                1840 Columbia Mine Road, VI
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Locations */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3">
          Recently Travelled
        </h3>
        <div className="space-y-2">
          {[
          '1694 Candlelight Drive, Ikeja',
          '3808 Simpson Avenue, Yaba',
          '4055 Shinn Avenue, Surulere'].
          map((loc, i) =>
          <button
            key={i}
            onClick={() => onDestinationChange(loc)}
            className="w-full flex items-center gap-4 p-3 bg-[#131B2E] border border-white/5 rounded-xl hover:bg-white/5 transition-colors text-left">
            
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-300 truncate">{loc}</p>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Continue Button */}
      <div className="pt-4 pb-8">
        <motion.button
          onClick={onContinue}
          disabled={!canContinue}
          className={`w-full py-4 rounded-xl font-bold text-base shadow-lg transition-all ${canContinue ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-cyan-500/20' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
          whileTap={
          canContinue ?
          {
            scale: 0.98
          } :
          {}
          }>
          
          Continue
        </motion.button>
      </div>
    </motion.div>);

}