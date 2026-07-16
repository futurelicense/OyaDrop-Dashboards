import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BellIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  Clock3Icon,
  DollarSignIcon,
  HomeIcon,
  MapPinIcon,
  MenuIcon,
  MessageCircleIcon,
  PackageIcon,
  PhoneIcon,
  PlusIcon,
  Settings2Icon,
  ShieldCheckIcon,
  SparklesIcon,
  StarIcon,
  UsersIcon,
  XIcon } from
'lucide-react';
type Tab = 'home' | 'jobs' | 'schedule' | 'messages' | 'settings';
type JobStatus = 'new' | 'scheduled' | 'en-route' | 'in-progress' | 'completed';
type JobFilter = 'all' | 'new' | 'scheduled' | 'in-progress' | 'completed';
interface CleaningJob {
  id: string;
  time: string;
  customer: string;
  initials: string;
  property: string;
  address: string;
  type: string;
  duration: string;
  price: number;
  status: JobStatus;
  access: string;
  team: string[];
  checklist: string[];
  notes?: string;
}
const initialJobs: CleaningJob[] = [
{
  id: 'CLN-1208',
  time: '09:00',
  customer: 'Amara Okafor',
  initials: 'AO',
  property: '2-bed apartment',
  address: '18 Fola Osibo, Lekki Phase 1',
  type: 'Deep cleaning',
  duration: '3 hrs',
  price: 24000,
  status: 'new',
  access: 'Call on arrival. Security has guest access details.',
  team: ['Dami', 'Kemi'],
  checklist: [
  'Kitchen degrease',
  'Bathroom sanitise',
  'Vacuum & mop',
  'Linen refresh'],

  notes: 'Customer has a small dog; please keep balcony door closed.'
},
{
  id: 'CLN-1209',
  time: '11:30',
  customer: 'Tosin Adeyemi',
  initials: 'TA',
  property: 'Terrace duplex',
  address: '6 Admiralty Way, Lekki Phase 1',
  type: 'Standard clean',
  duration: '2.5 hrs',
  price: 18500,
  status: 'en-route',
  access: 'Meet customer at the gate.',
  team: ['Dami', 'Maya'],
  checklist: ['Dust surfaces', 'Bathrooms', 'Kitchen reset', 'Floors']
},
{
  id: 'CLN-1210',
  time: '14:00',
  customer: 'Victor Obi',
  initials: 'VO',
  property: '3-bed apartment',
  address: '22B Akin Adesola, Victoria Island',
  type: 'Move-in cleaning',
  duration: '4 hrs',
  price: 32000,
  status: 'scheduled',
  access: 'Key with building concierge.',
  team: ['Kemi', 'Maya', 'Favour'],
  checklist: [
  'Cabinet interiors',
  'Window sills',
  'Bathroom scale removal',
  'Floor polish']

},
{
  id: 'CLN-1207',
  time: '08:00',
  customer: 'Sade Williams',
  initials: 'SW',
  property: 'Studio apartment',
  address: '3B Wole Olateju Crescent, VI',
  type: 'Standard clean',
  duration: '1.5 hrs',
  price: 12000,
  status: 'completed',
  access: 'Completed — customer approved handover.',
  team: ['Favour'],
  checklist: ['Bathroom', 'Kitchenette', 'Vacuum', 'Mop']
}];

const statusStyle: Record<
  JobStatus,
  {
    label: string;
    classes: string;
  }> =
{
  new: {
    label: 'New request',
    classes: 'bg-amber-400/10 text-amber-300 border-amber-400/20'
  },
  scheduled: {
    label: 'Scheduled',
    classes: 'bg-sky-400/10 text-sky-300 border-sky-400/20'
  },
  'en-route': {
    label: 'En route',
    classes: 'bg-violet-400/10 text-violet-300 border-violet-400/20'
  },
  'in-progress': {
    label: 'In progress',
    classes: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20'
  },
  completed: {
    label: 'Completed',
    classes: 'bg-white/5 text-gray-300 border-white/10'
  }
};
const messages = [
{
  customer: 'Amara Okafor',
  initials: 'AO',
  text: 'Can you bring an extra microfiber cloth?',
  time: '2m',
  unread: true
},
{
  customer: 'Tosin Adeyemi',
  initials: 'TA',
  text: 'Security has been notified. See you soon.',
  time: '18m',
  unread: true
},
{
  customer: 'Victor Obi',
  initials: 'VO',
  text: 'The concierge will hand over the keys.',
  time: '1h',
  unread: false
},
{
  customer: 'Sade Williams',
  initials: 'SW',
  text: 'Thank you, the place looks amazing.',
  time: '3h',
  unread: false
}];

interface CleanersDashboardPageProps {
  onMenuClick: () => void;
}
export function CleanersDashboardPage({
  onMenuClick
}: CleanersDashboardPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isAvailable, setIsAvailable] = useState(true);
  const [jobs, setJobs] = useState(initialJobs);
  const [selectedJob, setSelectedJob] = useState<CleaningJob | null>(null);
  const [jobFilter, setJobFilter] = useState<JobFilter>('all');
  const [toast, setToast] = useState('');
  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  };
  const updateJobStatus = (
  jobId: string,
  status: JobStatus,
  feedback: string) =>
  {
    setJobs((current) =>
    current.map((job) =>
    job.id === jobId ?
    {
      ...job,
      status
    } :
    job
    )
    );
    setSelectedJob((current) =>
    current?.id === jobId ?
    {
      ...current,
      status
    } :
    current
    );
    showToast(feedback);
  };
  const filteredJobs = jobs.filter((job) => {
    if (jobFilter === 'all') return true;
    if (jobFilter === 'in-progress')
    return job.status === 'in-progress' || job.status === 'en-route';
    return job.status === jobFilter;
  });
  const getNextAction = (job: CleaningJob) => {
    if (job.status === 'new')
    return {
      label: 'Accept job',
      status: 'scheduled' as JobStatus,
      feedback: 'Job accepted and added to your schedule.'
    };
    if (job.status === 'scheduled')
    return {
      label: 'Start route',
      status: 'en-route' as JobStatus,
      feedback: 'Route started. The client has been notified.'
    };
    if (job.status === 'en-route')
    return {
      label: 'Start cleaning',
      status: 'in-progress' as JobStatus,
      feedback: 'Cleaning session started.'
    };
    if (job.status === 'in-progress')
    return {
      label: 'Mark complete',
      status: 'completed' as JobStatus,
      feedback: 'Job completed. Receipt sent to client.'
    };
    return null;
  };
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0A0E1A]/95 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <button
            aria-label="Open navigation"
            onClick={onMenuClick}
            className="rounded-xl p-2 text-gray-300 transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-400">
            
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-400/15 flex items-center justify-center border border-emerald-400/20">
              <SparklesIcon className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold">Clean &amp; Co.</p>
                <ShieldCheckIcon
                  className="h-4 w-4 text-emerald-300"
                  aria-label="Verified provider" />
                
              </div>
              <p className="text-xs text-gray-500">Dami Adebayo · Lekki / VI</p>
            </div>
          </div>
          <button
            aria-label="View notifications"
            className="relative rounded-xl p-2 text-gray-300 transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-400">
            
            <BellIcon className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-400" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'home' &&
          <motion.section
            key="home"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            className="space-y-5 px-4 py-5">
            
              <section
              className={`rounded-2xl border p-4 ${isAvailable ? 'border-emerald-400/25 bg-emerald-400/10' : 'border-white/10 bg-[#131B2E]'}`}>
              
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-white">
                      {isAvailable ? 'Accepting bookings' : 'Bookings paused'}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      {isAvailable ?
                    'Your service is visible to clients in Lekki and Victoria Island.' :
                    'You will not receive new job requests until you go live.'}
                    </p>
                  </div>
                  <button
                  aria-label="Toggle booking availability"
                  aria-pressed={isAvailable}
                  onClick={() => {
                    setIsAvailable((value) => !value);
                    showToast(
                      isAvailable ?
                      'Bookings paused.' :
                      'You are now accepting bookings.'
                    );
                  }}
                  className={`relative h-8 w-14 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300 ${isAvailable ? 'bg-emerald-400' : 'bg-gray-600'}`}>
                  
                    <motion.span
                    className="absolute top-1 h-6 w-6 rounded-full bg-white shadow"
                    animate={{
                      left: isAvailable ? 28 : 4
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 28
                    }} />
                  
                  </button>
                </div>
              </section>

              <section
              className="grid grid-cols-2 gap-3 sm:grid-cols-4"
              aria-label="Today's performance">
              
                <Metric
                label="Today's jobs"
                value="4"
                detail="1 new request"
                icon={ClipboardCheckIcon} />
              
                <Metric
                label="Earnings today"
                value="₦86k"
                detail="Paid & pending"
                icon={DollarSignIcon} />
              
                <Metric
                label="Client rating"
                value="4.9"
                detail="268 reviews"
                icon={StarIcon} />
              
                <Metric
                label="On-time rate"
                value="98%"
                detail="Last 30 days"
                icon={Clock3Icon} />
              
              </section>

              <section>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h1 className="text-lg font-bold">Today’s route</h1>
                    <p className="text-xs text-gray-500">
                      Thursday · 4 jobs · 10.5 service hours
                    </p>
                  </div>
                  <button
                  onClick={() => setActiveTab('schedule')}
                  className="text-sm font-semibold text-emerald-300 focus:outline-none focus:underline">
                  
                    View schedule
                  </button>
                </div>
                <div className="space-y-3">
                  {jobs.map((job, index) =>
                <JobCard
                  key={job.id}
                  job={job}
                  index={index}
                  onSelect={() => setSelectedJob(job)}
                  onQuickAction={() => {
                    const action = getNextAction(job);
                    if (action)
                    updateJobStatus(
                      job.id,
                      action.status,
                      action.feedback
                    );
                  }} />

                )}
                </div>
              </section>

              <section>
                <h2 className="mb-3 text-base font-bold">Quick actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <QuickAction
                  label="Add availability"
                  detail="Open a time slot"
                  icon={CalendarDaysIcon}
                  onClick={() =>
                  showToast(
                    'Availability editor opened for your next free slot.'
                  )
                  } />
                
                  <QuickAction
                  label="Create booking"
                  detail="Add client manually"
                  icon={PlusIcon}
                  onClick={() => showToast('Manual booking flow is ready.')} />
                
                  <QuickAction
                  label="Message client"
                  detail="4 active chats"
                  icon={MessageCircleIcon}
                  onClick={() => setActiveTab('messages')} />
                
                  <QuickAction
                  label="Team & supplies"
                  detail="6 kits in stock"
                  icon={PackageIcon}
                  onClick={() => setActiveTab('settings')} />
                
                </div>
              </section>
            </motion.section>
          }

          {activeTab === 'jobs' &&
          <motion.section
            key="jobs"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            className="px-4 py-5">
            
              <h1 className="text-xl font-bold">Jobs</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage every cleaning request in one place.
              </p>
              <div
              className="mt-5 flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
              role="tablist"
              aria-label="Job status filters">
              
                {(
              [
              'all',
              'new',
              'scheduled',
              'in-progress',
              'completed'] as
              JobFilter[]).
              map((filter) =>
              <button
                key={filter}
                role="tab"
                aria-selected={jobFilter === filter}
                onClick={() => setJobFilter(filter)}
                className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-semibold capitalize transition-colors ${jobFilter === filter ? 'border-emerald-400 bg-emerald-400/15 text-emerald-300' : 'border-white/10 bg-[#131B2E] text-gray-400'}`}>
                
                    {filter === 'all' ? 'All jobs' : filter.replace('-', ' ')}
                  </button>
              )}
              </div>
              <div className="mt-4 space-y-3">
                {filteredJobs.map((job, index) =>
              <JobCard
                key={job.id}
                job={job}
                index={index}
                onSelect={() => setSelectedJob(job)}
                onQuickAction={() => {
                  const action = getNextAction(job);
                  if (action)
                  updateJobStatus(job.id, action.status, action.feedback);
                }} />

              )}
              </div>
            </motion.section>
          }

          {activeTab === 'schedule' &&
          <motion.section
            key="schedule"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            className="px-4 py-5">
            
              <h1 className="text-xl font-bold">Schedule</h1>
              <p className="mt-1 text-sm text-gray-500">
                Plan your team’s workload and travel time.
              </p>
              <div className="mt-5 grid grid-cols-7 gap-2">
                {[
              'Mon 14',
              'Tue 15',
              'Wed 16',
              'Thu 17',
              'Fri 18',
              'Sat 19',
              'Sun 20'].
              map((day, index) =>
              <button
                key={day}
                className={`rounded-xl border px-1 py-3 text-center ${index === 3 ? 'border-emerald-400 bg-emerald-400/15' : 'border-white/10 bg-[#131B2E]'}`}>
                
                    <span className="block text-[10px] text-gray-500">
                      {day.split(' ')[0]}
                    </span>
                    <span
                  className={`text-sm font-bold ${index === 3 ? 'text-emerald-300' : 'text-white'}`}>
                  
                      {day.split(' ')[1]}
                    </span>
                  </button>
              )}
              </div>
              <section className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-bold">Thursday agenda</h2>
                  <span className="text-xs text-emerald-300">
                    4 booked jobs
                  </span>
                </div>
                <div className="space-y-3">
                  {jobs.map((job, index) =>
                <JobCard
                  key={job.id}
                  job={job}
                  index={index}
                  onSelect={() => setSelectedJob(job)}
                  onQuickAction={() => {
                    const action = getNextAction(job);
                    if (action)
                    updateJobStatus(
                      job.id,
                      action.status,
                      action.feedback
                    );
                  }} />

                )}
                </div>
              </section>
            </motion.section>
          }

          {activeTab === 'messages' &&
          <motion.section
            key="messages"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            className="px-4 py-5">
            
              <h1 className="text-xl font-bold">Messages</h1>
              <p className="mt-1 text-sm text-gray-500">
                Keep clients informed before, during, and after service.
              </p>
              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#131B2E]">
                {messages.map((message, index) =>
              <button
                key={message.customer}
                onClick={() =>
                showToast(`Opening chat with ${message.customer}.`)
                }
                className={`flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-white/5 ${index !== messages.length - 1 ? 'border-b border-white/10' : ''}`}>
                
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400/15 text-sm font-bold text-emerald-300">
                      {message.initials}
                      {message.unread &&
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[#131B2E] bg-emerald-400" />
                  }
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-2">
                        <p className="truncate text-sm font-bold">
                          {message.customer}
                        </p>
                        <span className="text-xs text-gray-500">
                          {message.time}
                        </span>
                      </div>
                      <p
                    className={`mt-1 truncate text-sm ${message.unread ? 'text-gray-200' : 'text-gray-500'}`}>
                    
                        {message.text}
                      </p>
                    </div>
                  </button>
              )}
              </div>
            </motion.section>
          }

          {activeTab === 'settings' &&
          <motion.section
            key="settings"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            className="space-y-5 px-4 py-5">
            
              <div>
                <h1 className="text-xl font-bold">Business settings</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Control what clients see and how your team operates.
                </p>
              </div>
              <SettingsGroup
              title="Services & pricing"
              items={[
              ['Standard cleaning', 'From ₦12,000'],
              ['Deep cleaning', 'From ₦24,000'],
              ['Move-in / move-out', 'From ₦32,000'],
              ['Post-construction', 'Custom quote']]
              } />
            
              <SettingsGroup
              title="Operations"
              items={[
              ['Coverage zones', 'Lekki, Victoria Island, Ikoyi'],
              ['Deposit policy', '30% required to confirm'],
              ['Team management', '4 active cleaners'],
              ['Supplies & kits', '6 kits available']]
              } />
            
              <button
              onClick={() => showToast('Storefront settings saved.')}
              className="w-full rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-4 text-left text-sm font-bold text-emerald-300">
              
                Manage public booking page{' '}
                <ChevronRightIcon className="float-right h-5 w-5" />
              </button>
            </motion.section>
          }
        </AnimatePresence>
      </main>

      <nav
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-[#0A0E1A]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl"
        aria-label="Cleaner dashboard navigation">
        
        <div className="mx-auto flex max-w-3xl justify-around">
          {[
          {
            id: 'home' as Tab,
            label: 'Home',
            icon: HomeIcon
          },
          {
            id: 'jobs' as Tab,
            label: 'Jobs',
            icon: ClipboardCheckIcon
          },
          {
            id: 'schedule' as Tab,
            label: 'Schedule',
            icon: CalendarDaysIcon
          },
          {
            id: 'messages' as Tab,
            label: 'Messages',
            icon: MessageCircleIcon
          },
          {
            id: 'settings' as Tab,
            label: 'Settings',
            icon: Settings2Icon
          }].
          map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 ${active ? 'text-emerald-300' : 'text-gray-500'}`}>
                
                <Icon
                  className={`h-5 w-5 ${active ? 'fill-emerald-400/15' : ''}`} />
                
                <span>{item.label}</span>
              </button>);

          })}
        </div>
      </nav>

      <AnimatePresence>
        {selectedJob &&
        <>
            <motion.button
            aria-label="Close job details"
            className="fixed inset-0 z-40 cursor-default bg-black/60"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            onClick={() => setSelectedJob(null)} />
          
            <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-sheet-title"
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[88vh] max-w-3xl overflow-y-auto rounded-t-3xl border-t border-white/10 bg-[#131B2E]"
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
              stiffness: 330,
              damping: 32
            }}>
            
              <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-[#131B2E]/95 px-5 py-3 backdrop-blur">
                <div className="h-1.5 w-12 rounded-full bg-white/20 absolute left-1/2 top-2 -translate-x-1/2" />
                <p className="pt-2 text-xs font-semibold tracking-wider text-gray-500">
                  JOB {selectedJob.id}
                </p>
                <button
                aria-label="Close job details"
                onClick={() => setSelectedJob(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/5">
                
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-5 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 id="job-sheet-title" className="text-xl font-bold">
                      {selectedJob.type}
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">
                      {selectedJob.time} · {selectedJob.duration} ·{' '}
                      {selectedJob.property}
                    </p>
                  </div>
                  <StatusPill status={selectedJob.status} />
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0A0E1A]/60 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/15 text-sm font-bold text-emerald-300">
                      {selectedJob.initials}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">{selectedJob.customer}</p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-gray-400">
                        <MapPinIcon className="h-4 w-4 text-emerald-300" />
                        {selectedJob.address}
                      </p>
                    </div>
                    <button
                    aria-label={`Call ${selectedJob.customer}`}
                    className="rounded-xl bg-white/5 p-3 text-emerald-300">
                    
                      <PhoneIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <SheetSection title="Scope checklist">
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedJob.checklist.map((item) =>
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-300">
                    
                        <CheckCircle2Icon className="h-4 w-4 text-emerald-300" />
                        {item}
                      </li>
                  )}
                  </ul>
                </SheetSection>
                <SheetSection title="Access & service notes">
                  <p className="text-sm leading-6 text-gray-300">
                    {selectedJob.access}
                  </p>
                  {selectedJob.notes &&
                <p className="mt-3 rounded-xl bg-amber-400/10 p-3 text-sm leading-5 text-amber-100">
                      {selectedJob.notes}
                    </p>
                }
                </SheetSection>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/50 p-3">
                    <p className="text-xs text-gray-500">Assigned team</p>
                    <p className="mt-1 text-sm font-semibold">
                      {selectedJob.team.join(', ')}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/50 p-3">
                    <p className="text-xs text-gray-500">Job value</p>
                    <p className="mt-1 text-sm font-semibold text-emerald-300">
                      ₦{selectedJob.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                  onClick={() =>
                  showToast(`Message sent to ${selectedJob.customer}.`)
                  }
                  className="rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white">
                  
                    Contact client
                  </button>
                  {getNextAction(selectedJob) &&
                <button
                  onClick={() => {
                    const action = getNextAction(selectedJob);
                    if (action)
                    updateJobStatus(
                      selectedJob.id,
                      action.status,
                      action.feedback
                    );
                  }}
                  className="rounded-xl bg-emerald-400 py-3 text-sm font-bold text-[#062a25]">
                  
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
          className="fixed bottom-24 left-4 right-4 z-[60] mx-auto max-w-md rounded-xl border border-emerald-400/25 bg-[#102722] px-4 py-3 text-center text-sm font-semibold text-emerald-100 shadow-2xl"
          initial={{
            opacity: 0,
            y: 12
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: 12
          }}>
          
            {toast}
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
interface MetricProps {
  label: string;
  value: string;
  detail: string;
  icon: typeof StarIcon;
}
function Metric({ label, value, detail, icon: Icon }: MetricProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#131B2E] p-3">
      <Icon className="h-4 w-4 text-emerald-300" />
      <p className="mt-3 text-lg font-bold">{value}</p>
      <p className="text-xs font-semibold text-gray-300">{label}</p>
      <p className="mt-1 text-[10px] text-gray-500">{detail}</p>
    </article>);

}
interface JobCardProps {
  job: CleaningJob;
  index: number;
  onSelect: () => void;
  onQuickAction: () => void;
}
function JobCard({ job, index, onSelect, onQuickAction }: JobCardProps) {
  const action = getAction(job);
  return (
    <motion.article
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
      className={`rounded-2xl border p-4 ${job.status === 'new' ? 'border-emerald-400/35 bg-emerald-400/10' : 'border-white/10 bg-[#131B2E]'}`}>
      
      <div className="flex gap-3">
        <div className="w-12 text-center">
          <p className="text-sm font-bold text-emerald-300">{job.time}</p>
          <div className="mx-auto mt-2 h-2 w-2 rounded-full bg-emerald-400" />
        </div>
        <button
          onClick={onSelect}
          className="min-w-0 flex-1 text-left focus:outline-none">
          
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-bold">{job.customer}</p>
              <p className="mt-1 text-xs text-gray-400">
                {job.type} · {job.property}
              </p>
            </div>
            <StatusPill status={job.status} />
          </div>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
            <span>{job.duration}</span>
            <span>₦{job.price.toLocaleString()}</span>
            <span className="truncate max-w-[180px]">{job.address}</span>
          </div>
        </button>
      </div>
      {action &&
      <div className="mt-4 flex gap-2 border-t border-white/10 pt-3">
          {job.status === 'new' &&
        <button
          onClick={onSelect}
          className="flex-1 rounded-xl bg-white/5 py-2.5 text-sm font-semibold text-gray-300">
          
              Review
            </button>
        }
          <button
          onClick={onQuickAction}
          className="flex-1 rounded-xl bg-emerald-400 py-2.5 text-sm font-bold text-[#062a25]">
          
            {action.label}
          </button>
        </div>
      }
    </motion.article>);

}
function StatusPill({ status }: {status: JobStatus;}) {
  const config = statusStyle[status];
  return (
    <span
      className={`whitespace-nowrap rounded-full border px-2 py-1 text-[10px] font-bold ${config.classes}`}>
      
      {config.label}
    </span>);

}
function QuickAction({
  label,
  detail,
  icon: Icon,
  onClick





}: {label: string;detail: string;icon: typeof StarIcon;onClick: () => void;}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-white/10 bg-[#131B2E] p-4 text-left transition-colors hover:border-emerald-400/35 focus:outline-none focus:ring-2 focus:ring-emerald-400">
      
      <Icon className="h-5 w-5 text-emerald-300" />
      <p className="mt-4 text-sm font-bold">{label}</p>
      <p className="mt-1 text-xs text-gray-500">{detail}</p>
    </button>);

}
function SettingsGroup({
  title,
  items



}: {title: string;items: [string, string][];}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#131B2E]">
      <h2 className="border-b border-white/10 px-4 py-3 text-sm font-bold">
        {title}
      </h2>
      {items.map(([label, value], index) =>
      <button
        key={label}
        className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-white/5 ${index < items.length - 1 ? 'border-b border-white/10' : ''}`}>
        
          <span className="text-sm text-gray-300">{label}</span>
          <span className="flex items-center gap-1 text-right text-xs text-gray-500">
            {value}
            <ChevronRightIcon className="h-4 w-4" />
          </span>
        </button>
      )}
    </section>);

}
function SheetSection({
  title,
  children



}: {title: string;children: React.ReactNode;}) {
  return (
    <section>
      <h3 className="mb-2 text-sm font-bold text-white">{title}</h3>
      <div className="rounded-xl border border-white/10 bg-[#0A0E1A]/50 p-4">
        {children}
      </div>
    </section>);

}
function getAction(job: CleaningJob) {
  if (job.status === 'new')
  return {
    label: 'Accept job'
  };
  if (job.status === 'scheduled')
  return {
    label: 'Start route'
  };
  if (job.status === 'en-route')
  return {
    label: 'Start cleaning'
  };
  if (job.status === 'in-progress')
  return {
    label: 'Mark complete'
  };
  return null;
}