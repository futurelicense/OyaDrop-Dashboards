import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, DollarSign, User, CheckCircle, Calendar } from 'lucide-react';
type JobStatus = 'pending' | 'ongoing' | 'completed' | 'cancelled' | 'scheduled';
interface Job {
  id: string;
  clientName: string;
  address: string;
  price: number;
  time: string;
  scheduledDate?: string;
  details: string;
  status: JobStatus;
}
const mockJobs: Job[] = [{
  id: 'JOB-2847',
  clientName: 'Adebayo O.',
  address: 'Lekki Phase 1, Lagos',
  price: 15000,
  time: '2:30 PM',
  details: 'AC Repair - Split unit not cooling',
  status: 'pending'
}, {
  id: 'JOB-2846',
  clientName: 'Chioma N.',
  address: 'Victoria Island',
  price: 8500,
  time: '11:00 AM',
  details: 'Plumbing - Leaking pipe',
  status: 'ongoing'
}, {
  id: 'JOB-2848',
  clientName: 'Funke A.',
  address: 'Ikeja GRA',
  price: 18000,
  time: '10:00 AM',
  scheduledDate: 'Tomorrow',
  details: 'Generator Servicing - Full maintenance',
  status: 'scheduled'
}, {
  id: 'JOB-2849',
  clientName: 'Tunde B.',
  address: 'Ajah',
  price: 12500,
  time: '3:00 PM',
  scheduledDate: 'Dec 28',
  details: 'Electrical - Wiring installation',
  status: 'scheduled'
}, {
  id: 'JOB-2850',
  clientName: 'Blessing M.',
  address: 'Surulere',
  price: 9000,
  time: '9:00 AM',
  scheduledDate: 'Dec 30',
  details: 'Plumbing - Bathroom fixtures',
  status: 'scheduled'
}, {
  id: 'JOB-2845',
  clientName: 'Ibrahim K.',
  address: 'Ikeja GRA',
  price: 12000,
  time: '9:00 AM',
  details: 'Electrical - Socket installation',
  status: 'completed'
}];
const tabs: {
  id: JobStatus;
  label: string;
  color: string;
}[] = [{
  id: 'pending',
  label: 'Pending',
  color: '#FFB800'
}, {
  id: 'scheduled',
  label: 'Scheduled',
  color: '#A855F7'
}, {
  id: 'ongoing',
  label: 'Ongoing',
  color: '#00D9C0'
}, {
  id: 'completed',
  label: 'Completed',
  color: '#10B981'
}, {
  id: 'cancelled',
  label: 'Cancelled',
  color: '#EF4444'
}];
export function JobOrderManagement() {
  const [activeTab, setActiveTab] = useState<JobStatus>('pending');
  const filteredJobs = mockJobs.filter(job => job.status === activeTab);
  return <div className="px-4 py-6">
      <h2 className="text-lg font-bold text-white mb-4">Job Management</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const jobCount = mockJobs.filter(j => j.status === tab.id).length;
        return <motion.button key={tab.id} className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${isActive ? 'border-2' : 'bg-[#131B2E] text-gray-400 border border-white/10'}`} style={{
          backgroundColor: isActive ? tab.color + '20' : undefined,
          borderColor: isActive ? tab.color : undefined,
          color: isActive ? tab.color : undefined
        }} onClick={() => setActiveTab(tab.id)} whileTap={{
          scale: 0.95
        }}>
              <div className="flex items-center gap-2">
                {tab.label}
                {jobCount > 0 && <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{
              backgroundColor: isActive ? tab.color : '#6B7280',
              color: isActive ? '#000' : '#fff'
            }}>
                    {jobCount}
                  </span>}
              </div>
            </motion.button>;
      })}
      </div>

      {/* Job Cards */}
      <div className="space-y-3">
        {filteredJobs.length === 0 ? <div className="text-center py-12">
            <p className="text-gray-400 text-sm">No {activeTab} jobs</p>
          </div> : filteredJobs.map((job, index) => <motion.div key={job.id} className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10" initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: index * 0.1
      }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white">{job.id}</span>
                <div className="flex items-center gap-2">
                  {job.scheduledDate && <span className="text-xs font-semibold text-purple-400 bg-purple-500/20 px-2 py-1 rounded-lg">
                      {job.scheduledDate}
                    </span>}
                  <span className="text-xs text-gray-400">{job.time}</span>
                </div>
              </div>

              {/* Client & Address */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-white">{job.clientName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{job.address}</span>
                </div>
              </div>

              {/* Details */}
              <div className="bg-[#0A0E1A]/50 rounded-xl p-3 mb-3">
                <p className="text-sm text-white">{job.details}</p>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className="text-lg font-bold text-green-400">
                    ₦{job.price.toLocaleString()}
                  </span>
                </div>

                {job.status === 'pending' && <div className="flex gap-2">
                    <motion.button className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-semibold text-sm" whileTap={{
              scale: 0.95
            }}>
                      Reject
                    </motion.button>
                    <motion.button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl text-white font-semibold text-sm shadow-lg" whileTap={{
              scale: 0.95
            }}>
                      Accept
                    </motion.button>
                  </div>}

                {job.status === 'scheduled' && <motion.button className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-400 font-semibold text-sm flex items-center gap-2" whileTap={{
            scale: 0.95
          }}>
                    <Calendar className="w-4 h-4" />
                    View Details
                  </motion.button>}

                {job.status === 'ongoing' && <motion.button className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl text-white font-semibold text-sm shadow-lg flex items-center gap-2" whileTap={{
            scale: 0.95
          }}>
                    <CheckCircle className="w-4 h-4" />
                    Complete
                  </motion.button>}
              </div>
            </motion.div>)}
      </div>
    </div>;
}