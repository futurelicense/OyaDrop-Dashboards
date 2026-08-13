import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BellIcon,
  CalendarDaysIcon,
  CarIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  GaugeIcon,
  HomeIcon,
  MapPinIcon,
  MenuIcon,
  MessageCircleIcon,
  PackageIcon,
  PhoneIcon,
  PlusIcon,
  Settings2Icon,
  ShieldCheckIcon,
  StarIcon,
  WalletIcon,
  WrenchIcon,
  XIcon } from
'lucide-react';

type Tab = 'home' | 'jobs' | 'schedule' | 'messages' | 'settings';
type JobStatus = 'new' | 'scheduled' | 'en-route' | 'in-progress' | 'completed';
type JobFilter = 'all' | 'new' | 'scheduled' | 'in-progress' | 'completed';

interface RepairJob {
  id: string;
  time: string;
  customer: string;
  initials: string;
  vehicle: string;
  plate: string;
  service: string;
  concern: string;
  mode: 'Workshop' | 'Mobile visit';
  address: string;
  duration: string;
  price: number;
  status: JobStatus;
  checklist: string[];
  parts: string[];
  technician: string;
  notes?: string;
}

const initialJobs: RepairJob[] = [
{
  id: 'FX-4821',
  time: '08:30',
  customer: 'Adaeze Okonkwo',
  initials: 'AO',
  vehicle: 'Toyota Corolla 2018',
  plate: 'LSD-427-KJ',
  service: 'Full diagnostics + oil service',
  concern: 'Engine light on, rough idle at low speed.',
  mode: 'Workshop',
  address: 'Bay 2 · TorqueLine Auto Works, Lekki Phase 1',
  duration: '2 hrs',
  price: 26000,
  status: 'completed',
  checklist: ['OBD scan', 'Oil & filter change', 'Fluid top-up', 'Road test'],
  parts: ['Oil filter', '5W-30 engine oil (4L)'],
  technician: 'Emeka Nwosu'
},
{
  id: 'FX-4822',
  time: '11:00',
  customer: 'Segun Balogun',
  initials: 'SB',
  vehicle: 'Honda Accord 2015',
  plate: 'KTU-903-XA',
  service: 'Front brake pad replacement',
  concern: 'Squealing noise when braking at speed.',
  mode: 'Workshop',
  address: 'Bay 1 · TorqueLine Auto Works, Lekki Phase 1',
  duration: '1 hr 30 min',
  price: 38000,
  status: 'in-progress',
  checklist: ['Wheel removal', 'Pad & rotor inspection', 'Pad fitting', 'Brake test'],
  parts: ['Front brake pads (set)', 'Brake cleaner'],
  technician: 'Ibrahim Sule',
  notes: 'Customer waiting in the lounge — keep updates frequent.'
},
{
  id: 'FX-4823',
  time: '14:15',
  customer: 'Chioma Eze',
  initials: 'CE',
  vehicle: 'Kia Sportage 2020',
  plate: 'AGL-118-LA',
  service: 'AC repair (mobile visit)',
  concern: 'AC blows warm air after 10 minutes.',
  mode: 'Mobile visit',
  address: '14 Admiralty Way, Lekki Phase 1',
  duration: '2 hrs',
  price: 45000,
  status: 'en-route',
  checklist: ['Pressure test', 'Leak detection', 'Compressor check', 'Gas recharge'],
  parts: ['R134a refrigerant', 'O-ring kit'],
  technician: 'Tunde Alabi'
},
{
  id: 'FX-4824',
  time: '16:30',
  customer: 'Musa Bello',
  initials: 'MB',
  vehicle: 'Mercedes-Benz C300 2017',
  plate: 'FST-560-AB',
  service: 'Battery replacement + electrical check',
  concern: 'Car struggles to start in the morning.',
  mode: 'Mobile visit',
  address: '7 Ozumba Mbadiwe Ave, Victoria Island',
  duration: '1 hr',
  price: 72000,
  status: 'new',
  checklist: ['Battery load test', 'Alternator output', 'Terminal cleaning', 'Battery fitting'],
  parts: ['70Ah AGM battery', 'Terminal grease'],
  technician: 'Unassigned',
  notes: 'New request — respond within 10 minutes to keep response score.'
}];


const messages = [
{ customer: 'Musa Bello', initials: 'MB', text: 'Can your technician come before 5pm today?', time: '2m', unread: true },
{ customer: 'Chioma Eze', initials: 'CE', text: 'Gate code is 4471. Ask for the blue Sportage.', time: '18m', unread: true },
{ customer: 'Segun Balogun', initials: 'SB', text: 'Thanks — how long until the brakes are done?', time: '1h', unread: false },
{ customer: 'Adaeze Okonkwo', initials: 'AO', text: 'Received the service report. Great work!', time: 'Yesterday', unread: false }];


const statusStyle: Record<JobStatus, {label: string;classes: string;}> = {
  new: { label: 'New request', classes: 'border-amber-400/40 bg-amber-400/15 text-amber-200' },
  scheduled: { label: 'Scheduled', classes: 'border-white/15 bg-white/5 text-gray-300' },
  'en-route': { label: 'En route', classes: 'border-sky-400/30 bg-sky-400/10 text-sky-200' },
  'in-progress': { label: 'In progress', classes: 'border-amber-400/30 bg-amber-400/10 text-amber-200' },
  completed: { label: 'Completed', classes: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200' }
};

interface MechanicDashboardPageProps {
  onMenuClick: () => void;
}

export function MechanicDashboardPage({ onMenuClick }: MechanicDashboardPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isAvailable, setIsAvailable] = useState(true);
  const [jobs, setJobs] = useState<RepairJob[]>(initialJobs);
  const [selectedJob, setSelectedJob] = useState<RepairJob | null>(null);
  const [jobFilter, setJobFilter] = useState<JobFilter>('all');
  const [toast, setToast] = useState('');

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  };

  const updateJobStatus = (jobId: string, status: JobStatus, feedback: string) => {
    setJobs((current) => current.map((job) => job.id === jobId ? { ...job, status } : job));
    setSelectedJob((current) => current && current.id === jobId ? { ...current, status } : current);
    showToast(feedback);
  };

  const declineJob = (jobId: string) => {
    setJobs((current) => current.filter((job) => job.id !== jobId));
    setSelectedJob(null);
    showToast('Request declined and returned to the OyaFix pool.');
  };

  const filteredJobs = jobs.filter((job) => {
    if (jobFilter === 'all') return true;
    if (jobFilter === 'in-progress') return job.status === 'in-progress' || job.status === 'en-route';
    return job.status === jobFilter;
  });

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0A0E1A]/95 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <button aria-label="Open navigation" onClick={onMenuClick} className="rounded-xl bg-white/5 p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400">
            <MenuIcon className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-[#2b1a00]">
              <WrenchIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold leading-tight">TorqueLine Auto Works</p>
                <ShieldCheckIcon className="h-4 w-4 text-amber-300" aria-label="Verified provider" />
              </div>
              <p className="text-xs text-gray-500">Emeka Nwosu · OyaFix partner</p>
            </div>
          </div>
          <button aria-label="Notifications" onClick={() => showToast('3 new OyaFix notifications.')} className="relative rounded-xl bg-white/5 p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400">
            <BellIcon className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-400" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl pb-28">
        <AnimatePresence mode="wait">
          {activeTab === 'home' &&
          <motion.section key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="px-4 py-5">
              <div className="rounded-2xl border border-white/10 bg-[#131B2E] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold">{isAvailable ? 'Accepting jobs' : 'Jobs paused'}</p>
                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      {isAvailable ?
                    'Your workshop and mobile team are visible to drivers in Lekki, Ajah and Victoria Island.' :
                    'New repair requests will route to other OyaFix mechanics until you go live.'}
                    </p>
                  </div>
                  <button
                  aria-label="Toggle job availability"
                  aria-pressed={isAvailable}
                  onClick={() => {
                    setIsAvailable((value) => !value);
                    showToast(isAvailable ? 'Job requests paused.' : 'You are now accepting job requests.');
                  }}
                  className={`relative h-8 w-14 flex-shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${isAvailable ? 'bg-amber-400' : 'bg-gray-600'}`}>
                  
                    <motion.span className="absolute top-1 h-6 w-6 rounded-full bg-white shadow" animate={{ left: isAvailable ? 30 : 4 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }} />
                  </button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <MetricCard label="Today’s jobs" value="4" detail="1 awaiting response" icon={ClipboardCheckIcon} />
                <MetricCard label="Earnings today" value="₦181,000" detail="+12% vs yesterday" icon={WalletIcon} />
                <MetricCard label="Rating" value="4.8" detail="192 reviews" icon={StarIcon} />
                <MetricCard label="On-time rate" value="94%" detail="Last 30 days" icon={GaugeIcon} />
              </div>

              <section className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <h1 className="text-lg font-bold">Today’s bay schedule</h1>
                  <button onClick={() => setActiveTab('jobs')} className="text-xs font-semibold text-amber-300">View all</button>
                </div>
                <div className="space-y-3">
                  {jobs.map((job, index) =>
                <JobCard
                  key={job.id}
                  job={job}
                  index={index}
                  onSelect={() => setSelectedJob(job)}
                  onPrimaryAction={() => {
                    const action = getNextAction(job);
                    if (action) updateJobStatus(job.id, action.status, action.feedback);
                  }}
                  onDecline={() => declineJob(job.id)} />

                )}
                </div>
              </section>

              <section className="mt-7">
                <h2 className="mb-3 text-lg font-bold">Quick actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <QuickAction label="Add availability" detail="Open a new bay slot" icon={CalendarDaysIcon} onClick={() => showToast('Availability editor opened for your next free bay.')} />
                  <QuickAction label="Create job card" detail="Log a walk-in vehicle" icon={PlusIcon} onClick={() => showToast('Walk-in job card ready.')} />
                  <QuickAction label="Message customer" detail="2 unread chats" icon={MessageCircleIcon} onClick={() => setActiveTab('messages')} />
                  <QuickAction label="Parts & inventory" detail="3 items low in stock" icon={PackageIcon} onClick={() => setActiveTab('settings')} />
                </div>
              </section>
            </motion.section>
          }

          {activeTab === 'jobs' &&
          <motion.section key="jobs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="px-4 py-5">
              <h1 className="text-xl font-bold">Job cards</h1>
              <p className="mt-1 text-sm text-gray-500">Track every vehicle from request to handover.</p>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Job status filters">
                {(['all', 'new', 'scheduled', 'in-progress', 'completed'] as JobFilter[]).map((filter) =>
              <button
                key={filter}
                role="tab"
                aria-selected={jobFilter === filter}
                onClick={() => setJobFilter(filter)}
                className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-semibold capitalize transition-colors ${jobFilter === filter ? 'border-amber-400 bg-amber-400/15 text-amber-200' : 'border-white/10 bg-[#131B2E] text-gray-400'}`}>
                
                    {filter === 'all' ? 'All jobs' : filter.replace('-', ' ')}
                  </button>
              )}
              </div>
              <div className="mt-4 space-y-3">
                {filteredJobs.length === 0 ?
              <p className="rounded-2xl border border-white/10 bg-[#131B2E] p-6 text-center text-sm text-gray-500">No jobs in this status right now.</p> :

              filteredJobs.map((job, index) =>
              <JobCard
                key={job.id}
                job={job}
                index={index}
                onSelect={() => setSelectedJob(job)}
                onPrimaryAction={() => {
                  const action = getNextAction(job);
                  if (action) updateJobStatus(job.id, action.status, action.feedback);
                }}
                onDecline={() => declineJob(job.id)} />

              )
              }
              </div>
            </motion.section>
          }

          {activeTab === 'schedule' &&
          <motion.section key="schedule" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="px-4 py-5">
              <h1 className="text-xl font-bold">Schedule</h1>
              <p className="mt-1 text-sm text-gray-500">Balance workshop bays and mobile call-outs.</p>
              <div className="mt-5 grid grid-cols-7 gap-2">
                {['Mon 14', 'Tue 15', 'Wed 16', 'Thu 17', 'Fri 18', 'Sat 19', 'Sun 20'].map((day, index) =>
              <button key={day} className={`rounded-xl border px-1 py-3 text-center ${index === 3 ? 'border-amber-400 bg-amber-400/15' : 'border-white/10 bg-[#131B2E]'}`}>
                    <span className="block text-[10px] uppercase tracking-wide text-gray-500">{day.split(' ')[0]}</span>
                    <span className={`text-sm font-bold ${index === 3 ? 'text-amber-200' : 'text-white'}`}>{day.split(' ')[1]}</span>
                  </button>
              )}
              </div>
              <section className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-bold">Thursday agenda</h2>
                  <span className="text-xs text-amber-300">2 bays · 2 mobile visits</span>
                </div>
                <div className="space-y-3">
                  {jobs.map((job, index) =>
                <JobCard
                  key={job.id}
                  job={job}
                  index={index}
                  onSelect={() => setSelectedJob(job)}
                  onPrimaryAction={() => {
                    const action = getNextAction(job);
                    if (action) updateJobStatus(job.id, action.status, action.feedback);
                  }}
                  onDecline={() => declineJob(job.id)} />

                )}
                </div>
              </section>
            </motion.section>
          }

          {activeTab === 'messages' &&
          <motion.section key="messages" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="px-4 py-5">
              <h1 className="text-xl font-bold">Messages</h1>
              <p className="mt-1 text-sm text-gray-500">Keep drivers updated on diagnosis, cost and pickup.</p>
              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#131B2E]">
                {messages.map((message, index) =>
              <button
                key={message.customer}
                onClick={() => showToast(`Opening chat with ${message.customer}.`)}
                className={`flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-white/5 ${index !== messages.length - 1 ? 'border-b border-white/10' : ''}`}>
                
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-amber-400/15 text-sm font-bold text-amber-200">
                      {message.initials}
                      {message.unread && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[#131B2E] bg-amber-400" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-2">
                        <p className="truncate text-sm font-bold">{message.customer}</p>
                        <span className="text-xs text-gray-500">{message.time}</span>
                      </div>
                      <p className={`mt-1 truncate text-sm ${message.unread ? 'text-gray-200' : 'text-gray-500'}`}>{message.text}</p>
                    </div>
                  </button>
              )}
              </div>
            </motion.section>
          }

          {activeTab === 'settings' &&
          <motion.section key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5 px-4 py-5">
              <div>
                <h1 className="text-xl font-bold">Workshop settings</h1>
                <p className="mt-1 text-sm text-gray-500">Control what drivers see and how your team operates.</p>
              </div>
              <SettingsGroup
              title="Services & pricing"
              items={[
              ['Diagnostics', 'From ₦8,000'],
              ['Oil & filter service', 'From ₦18,000'],
              ['Brake service', 'From ₦35,000'],
              ['AC repair', 'From ₦45,000'],
              ['Roadside recovery', 'Custom quote']]
              } />
            
              <SettingsGroup
              title="Operations"
              items={[
              ['Coverage zones', 'Lekki, Ajah, Victoria Island'],
              ['Service modes', 'Workshop + mobile visits'],
              ['Deposit policy', 'Parts paid upfront'],
              ['Technicians', '5 certified'],
              ['Parts & inventory', '3 items low in stock']]
              } />
            
              <button onClick={() => showToast('Kioskfront settings saved.')} className="w-full rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-4 text-left text-sm font-bold text-amber-200">
                Manage public kioskfront
                <ChevronRightIcon className="float-right h-5 w-5" />
              </button>
            </motion.section>
          }
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-[#0A0E1A]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl" aria-label="Mechanic dashboard navigation">
        <div className="mx-auto flex max-w-3xl justify-around">
          {[
          { id: 'home' as Tab, label: 'Home', icon: HomeIcon },
          { id: 'jobs' as Tab, label: 'Jobs', icon: ClipboardCheckIcon },
          { id: 'schedule' as Tab, label: 'Schedule', icon: CalendarDaysIcon },
          { id: 'messages' as Tab, label: 'Messages', icon: MessageCircleIcon },
          { id: 'settings' as Tab, label: 'Settings', icon: Settings2Icon }].
          map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${active ? 'text-amber-300' : 'text-gray-500'}`}>
                
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>);

          })}
        </div>
      </nav>

      <AnimatePresence>
        {selectedJob &&
        <>
            <motion.button aria-label="Close job details" className="fixed inset-0 z-40 cursor-default bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedJob(null)} />
            <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="mechanic-job-title"
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[88vh] max-w-3xl overflow-y-auto rounded-t-3xl border-t border-white/10 bg-[#131B2E]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 330, damping: 32 }}>
            
              <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-[#131B2E]/95 px-5 py-3 backdrop-blur">
                <p className="text-xs font-semibold tracking-wider text-gray-500">JOB {selectedJob.id}</p>
                <button aria-label="Close job details" onClick={() => setSelectedJob(null)} className="rounded-lg p-2 text-gray-400 hover:bg-white/5">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-5 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 id="mechanic-job-title" className="text-xl font-bold">{selectedJob.service}</h2>
                    <p className="mt-1 text-sm text-gray-400">{selectedJob.time} · {selectedJob.duration} · {selectedJob.mode}</p>
                  </div>
                  <StatusPill status={selectedJob.status} />
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0A0E1A]/60 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/15 text-sm font-bold text-amber-200">{selectedJob.initials}</div>
                    <div className="flex-1">
                      <p className="font-bold">{selectedJob.customer}</p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-gray-400">
                        <MapPinIcon className="h-4 w-4 text-amber-300" />
                        {selectedJob.address}
                      </p>
                    </div>
                    <button aria-label={`Call ${selectedJob.customer}`} onClick={() => showToast(`Calling ${selectedJob.customer}...`)} className="rounded-xl bg-white/5 p-3 text-amber-300">
                      <PhoneIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <SheetSection title="Vehicle">
                  <div className="flex items-center gap-3">
                    <CarIcon className="h-5 w-5 text-amber-300" />
                    <div>
                      <p className="text-sm font-semibold text-white">{selectedJob.vehicle}</p>
                      <p className="mt-0.5 text-xs text-gray-500">Plate {selectedJob.plate}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-300">{selectedJob.concern}</p>
                </SheetSection>

                <SheetSection title="Work checklist">
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedJob.checklist.map((item) =>
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle2Icon className="h-4 w-4 text-amber-300" />
                        {item}
                      </li>
                  )}
                  </ul>
                </SheetSection>

                <SheetSection title="Parts required">
                  <ul className="space-y-2">
                    {selectedJob.parts.map((part) =>
                  <li key={part} className="flex items-center gap-2 text-sm text-gray-300">
                        <PackageIcon className="h-4 w-4 text-amber-300" />
                        {part}
                      </li>
                  )}
                  </ul>
                  {selectedJob.notes && <p className="mt-3 rounded-xl bg-amber-400/10 p-3 text-sm leading-5 text-amber-100">{selectedJob.notes}</p>}
                </SheetSection>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/50 p-3">
                    <p className="text-xs text-gray-500">Technician</p>
                    <p className="mt-1 text-sm font-semibold">{selectedJob.technician}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/50 p-3">
                    <p className="text-xs text-gray-500">Job value</p>
                    <p className="mt-1 text-sm font-semibold text-amber-300">₦{selectedJob.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {selectedJob.status === 'new' ?
                <button onClick={() => declineJob(selectedJob.id)} className="rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white">Decline</button> :

                <button onClick={() => showToast(`Message sent to ${selectedJob.customer}.`)} className="rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white">Contact customer</button>
                }
                  {getNextAction(selectedJob) &&
                <button
                  onClick={() => {
                    const action = getNextAction(selectedJob);
                    if (action) updateJobStatus(selectedJob.id, action.status, action.feedback);
                  }}
                  className="rounded-xl bg-amber-400 py-3 text-sm font-bold text-[#2b1a00]">
                  
                      {getNextAction(selectedJob)?.label}
                    </button>
                }
                </div>
              </div>
            </motion.aside>
          </>
        }
      </AnimatePresence>

      <AnimatePresence>
        {toast &&
        <motion.div
          role="status"
          className="fixed bottom-24 left-4 right-4 z-[60] mx-auto max-w-md rounded-xl border border-amber-400/25 bg-[#2a2008] px-4 py-3 text-center text-sm font-semibold text-amber-100 shadow-2xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}>
          
            {toast}
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}

function MetricCard({ label, value, detail, icon: Icon }: {label: string;value: string;detail: string;icon: typeof StarIcon;}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#131B2E] p-4">
      <Icon className="h-5 w-5 text-amber-300" />
      <p className="mt-3 text-xl font-bold">{value}</p>
      <p className="text-xs font-semibold text-gray-300">{label}</p>
      <p className="mt-1 text-[11px] text-gray-500">{detail}</p>
    </div>);

}

interface JobCardProps {
  job: RepairJob;
  index: number;
  onSelect: () => void;
  onPrimaryAction: () => void;
  onDecline: () => void;
}

function JobCard({ job, index, onSelect, onPrimaryAction, onDecline }: JobCardProps) {
  const action = getNextAction(job);
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`rounded-2xl border p-4 ${job.status === 'new' ? 'border-amber-400/40 bg-amber-400/10' : 'border-white/10 bg-[#131B2E]'}`}>
      
      <div className="flex gap-3">
        <div className="w-12 flex-shrink-0 text-center">
          <p className="text-sm font-bold text-amber-300">{job.time}</p>
          <div className="mx-auto mt-2 h-2 w-2 rounded-full bg-amber-400" />
        </div>
        <button onClick={onSelect} className="min-w-0 flex-1 text-left focus:outline-none">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-bold">{job.customer}</p>
              <p className="mt-1 text-xs text-gray-400">{job.vehicle} · {job.plate}</p>
            </div>
            <StatusPill status={job.status} />
          </div>
          <p className="mt-2 text-sm text-gray-300">{job.service}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
            <span>{job.mode}</span>
            <span>{job.duration}</span>
            <span>₦{job.price.toLocaleString()}</span>
          </div>
        </button>
      </div>
      {action &&
      <div className="mt-4 flex gap-2 border-t border-white/10 pt-3">
          {job.status === 'new' ?
        <button onClick={onDecline} className="flex-1 rounded-xl bg-white/5 py-2.5 text-sm font-semibold text-gray-300">Decline</button> :

        <button onClick={onSelect} className="flex-1 rounded-xl bg-white/5 py-2.5 text-sm font-semibold text-gray-300">Job card</button>
        }
          <button onClick={onPrimaryAction} className="flex-1 rounded-xl bg-amber-400 py-2.5 text-sm font-bold text-[#2b1a00]">{action.label}</button>
        </div>
      }
    </motion.article>);

}

function StatusPill({ status }: {status: JobStatus;}) {
  const config = statusStyle[status];
  return <span className={`whitespace-nowrap rounded-full border px-2 py-1 text-[10px] font-bold ${config.classes}`}>{config.label}</span>;
}

function QuickAction({ label, detail, icon: Icon, onClick }: {label: string;detail: string;icon: typeof StarIcon;onClick: () => void;}) {
  return (
    <button onClick={onClick} className="rounded-2xl border border-white/10 bg-[#131B2E] p-4 text-left transition-colors hover:border-amber-400/35 focus:outline-none focus:ring-2 focus:ring-amber-400">
      <Icon className="h-5 w-5 text-amber-300" />
      <p className="mt-4 text-sm font-bold">{label}</p>
      <p className="mt-1 text-xs text-gray-500">{detail}</p>
    </button>);

}

function SettingsGroup({ title, items }: {title: string;items: [string, string][];}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#131B2E]">
      <h2 className="border-b border-white/10 px-4 py-3 text-sm font-bold">{title}</h2>
      {items.map(([label, value], index) =>
      <button key={label} className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-white/5 ${index < items.length - 1 ? 'border-b border-white/10' : ''}`}>
          <span className="text-sm text-gray-300">{label}</span>
          <span className="flex items-center gap-1 text-right text-xs text-gray-500">
            {value}
            <ChevronRightIcon className="h-4 w-4" />
          </span>
        </button>
      )}
    </section>);

}

function SheetSection({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <section>
      <h3 className="mb-2 text-sm font-bold text-white">{title}</h3>
      <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/50 p-4">{children}</div>
    </section>);

}

function getNextAction(job: RepairJob) {
  if (job.status === 'new') return { label: 'Accept job', status: 'scheduled' as JobStatus, feedback: 'Job accepted and added to your bay schedule.' };
  if (job.status === 'scheduled') return { label: job.mode === 'Mobile visit' ? 'Start route' : 'Check in vehicle', status: 'en-route' as JobStatus, feedback: 'Customer notified that you are on the way.' };
  if (job.status === 'en-route') return { label: 'Start repair', status: 'in-progress' as JobStatus, feedback: 'Repair started. Timer running on this job card.' };
  if (job.status === 'in-progress') return { label: 'Mark complete', status: 'completed' as JobStatus, feedback: 'Job completed. Service report sent to the customer.' };
  return null;
}