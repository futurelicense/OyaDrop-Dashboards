import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BellIcon,
  BriefcaseIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  HomeIcon,
  LinkIcon,
  MenuIcon,
  Settings2Icon,
  ShieldCheckIcon,
  StarIcon,
  UsersIcon,
  WalletIcon,
  XIcon } from
'lucide-react';
import { usePartner } from '../context/PartnerContext';
import { childServices, type PartnerServiceLine } from '../data/oyaPartner';

type Tab = 'home' | 'services' | 'providers' | 'jobs' | 'settings';
type JobStatus = 'new' | 'in-progress' | 'completed';

interface PartnerJob {
  id: string;
  serviceId: string;
  service: string;
  customer: string;
  initials: string;
  offering: string;
  mode: string;
  provider: string;
  time: string;
  price: string;
  status: JobStatus;
}

const initialJobs: PartnerJob[] = [
{
  id: 'HUB-2201',
  serviceId: 'car-wash',
  service: 'Car wash',
  customer: 'Adaeze Okonkwo',
  initials: 'AO',
  offering: 'Full detail',
  mode: 'At the workshop',
  provider: 'Chinedu Okeke',
  time: '09:20',
  price: '₦18,000',
  status: 'in-progress'
},
{
  id: 'HUB-2202',
  serviceId: 'clean',
  service: 'Home cleaning',
  customer: 'Tosin Adeyemi',
  initials: 'TA',
  offering: 'Deep clean',
  mode: 'At your home',
  provider: 'Dami Adebayo',
  time: '11:00',
  price: '₦24,000',
  status: 'new'
},
{
  id: 'HUB-2203',
  serviceId: 'mechanic',
  service: 'OyaFix',
  customer: 'Segun Balogun',
  initials: 'SB',
  offering: 'Brake service',
  mode: 'Workshop',
  provider: 'Ibrahim Sule',
  time: '13:30',
  price: '₦35,000',
  status: 'new'
},
{
  id: 'HUB-2198',
  serviceId: 'car-wash',
  service: 'Car wash',
  customer: 'Chioma Eze',
  initials: 'CE',
  offering: 'Mobile wash',
  mode: 'Mobile wash',
  provider: 'Blessing Ade',
  time: '08:10',
  price: '₦7,500',
  status: 'completed'
}];


const statusStyle: Record<JobStatus, string> = {
  new: 'border-amber-400/40 bg-amber-400/15 text-amber-200',
  'in-progress': 'border-sky-400/30 bg-sky-400/10 text-sky-200',
  completed: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
};

interface PartnerBusinessDashboardPageProps {
  onMenuClick: () => void;
  onOpenFront?: () => void;
}

export function PartnerBusinessDashboardPage({ onMenuClick, onOpenFront }: PartnerBusinessDashboardPageProps) {
  const { partner, toggleService, toggleProvider, addProvider, addOffering, updateOffering } = usePartner();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [jobs, setJobs] = useState(initialJobs);
  const [toast, setToast] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [serviceFilter, setServiceFilter] = useState(partner.services[0]?.id ?? '');
  const [showAddProvider, setShowAddProvider] = useState(false);
  const [showAddOffering, setShowAddOffering] = useState(false);
  const [providerName, setProviderName] = useState('');
  const [providerRole, setProviderRole] = useState('');
  const [offeringName, setOfferingName] = useState('');
  const [offeringPrice, setOfferingPrice] = useState('');
  const [editingPrice, setEditingPrice] = useState<{serviceId: string;offeringId: string;value: string;} | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const liveServices = partner.services.filter((service) => service.enabled);
  const staffCount = partner.services.reduce((total, service) => total + service.providers.filter((provider) => provider.available).length, 0);
  const filteredService = partner.services.find((service) => service.id === serviceFilter) ?? partner.services[0];

  const copyLink = () => {
    navigator.clipboard?.writeText(`https://${partner.handle}`);
    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 2000);
    showToast('Partner OneLink copied.');
  };

  const acceptJob = (jobId: string) => {
    setJobs((current) => current.map((job) => job.id === jobId ? { ...job, status: 'in-progress' } : job));
    showToast('Job accepted and assigned.');
  };

  const completeJob = (jobId: string) => {
    setJobs((current) => current.map((job) => job.id === jobId ? { ...job, status: 'completed' } : job));
    showToast('Job marked complete. Payment can be released.');
  };

  const handleAddProvider = () => {
    if (!filteredService || !providerName.trim() || !providerRole.trim()) return;
    addProvider(filteredService.id, {
      name: providerName.trim(),
      role: providerRole.trim(),
      rating: 5,
      reviews: 0,
      completed: '0 jobs',
      responseTime: '~5 min',
      available: true,
      modes: filteredService.serveModes.map((mode) => mode.id),
      specialties: [filteredService.label]
    });
    setProviderName('');
    setProviderRole('');
    setShowAddProvider(false);
    showToast(`${providerName.trim()} added under ${filteredService.label}.`);
  };

  const handleAddOffering = () => {
    if (!filteredService || !offeringName.trim() || !offeringPrice.trim()) return;
    addOffering(filteredService.id, {
      name: offeringName.trim(),
      price: offeringPrice.trim().startsWith('₦') ? offeringPrice.trim() : `₦${offeringPrice.trim()}`,
      duration: 'Custom',
      description: 'Added from the partner dashboard.'
    });
    setOfferingName('');
    setOfferingPrice('');
    setShowAddOffering(false);
    showToast(`${offeringName.trim()} added to ${filteredService.label}.`);
  };

  const groupedServices = useMemo(() => {
    return partner.services.filter((service) => !service.parentId);
  }, [partner.services]);

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0A0E1A]/95 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <button aria-label="Open navigation" onClick={onMenuClick} className="rounded-xl bg-white/5 p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400">
            <MenuIcon className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400 text-[#042f2f] text-sm font-black">
              LS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold leading-tight">{partner.name}</p>
                <ShieldCheckIcon className="h-4 w-4 text-teal-300" aria-label="Verified partner" />
              </div>
              <p className="text-xs text-gray-500">{partner.operator} · Partner dashboard</p>
            </div>
          </div>
          <button aria-label="Notifications" onClick={() => showToast('2 new partner requests.')} className="relative rounded-xl bg-white/5 p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400">
            <BellIcon className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-teal-400" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl pb-28">
        <AnimatePresence mode="wait">
          {activeTab === 'home' &&
          <motion.section key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="px-4 py-5">
              <div className="rounded-2xl border border-white/10 bg-[#131B2E] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Partner OneLink</p>
                <p className="mt-2 truncate text-sm text-gray-300">{partner.handle}</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button onClick={copyLink} className="rounded-xl border border-white/10 bg-[#0A0E1A] py-2.5 text-xs font-bold">
                    {linkCopied ? 'Copied' : 'Copy OneLink'}
                  </button>
                  <button onClick={onOpenFront} className="rounded-xl bg-teal-400 py-2.5 text-xs font-bold text-[#042f2f]">
                    Open Business Front
                  </button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <MetricCard label="Live services" value={String(liveServices.length)} detail={`${partner.services.length} in catalogue`} icon={BriefcaseIcon} />
                <MetricCard label="Active providers" value={String(staffCount)} detail="Visible on OneLink" icon={UsersIcon} />
                <MetricCard label="Today’s jobs" value={String(jobs.filter((job) => job.status !== 'completed').length)} detail="Across all services" icon={ClipboardCheckIcon} />
                <MetricCard label="Rating" value={String(partner.rating)} detail={`${partner.reviews} reviews`} icon={StarIcon} />
              </div>

              <section className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-bold">Incoming jobs</h2>
                  <button onClick={() => setActiveTab('jobs')} className="text-xs font-semibold text-teal-300">View all</button>
                </div>
                <div className="space-y-3">
                  {jobs.slice(0, 3).map((job) =>
                <JobRow key={job.id} job={job} onAccept={() => acceptJob(job.id)} onComplete={() => completeJob(job.id)} />
                )}
                </div>
              </section>
            </motion.section>
          }

          {activeTab === 'services' &&
          <motion.section key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="px-4 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold">Services</h1>
                  <p className="mt-1 text-sm text-gray-500">What customers see on your OneLink. Car wash is a sub-service under OyaFix.</p>
                </div>
                <button onClick={() => setShowAddOffering(true)} className="rounded-xl bg-teal-400 px-3 py-2 text-xs font-bold text-[#042f2f]">
                  Add offering
                </button>
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {partner.services.map((service) =>
              <button
                key={service.id}
                onClick={() => setServiceFilter(service.id)}
                className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-semibold ${serviceFilter === service.id ? 'border-teal-400 bg-teal-400/15 text-teal-200' : 'border-white/10 bg-[#131B2E] text-gray-400'}`}>
                
                    {service.label}
                  </button>
              )}
              </div>

              {groupedServices.map((service) =>
            <ServiceManageCard
              key={service.id}
              service={service}
              children={childServices(partner, service.id)}
              highlightId={serviceFilter}
              editingPrice={editingPrice}
              onToggle={toggleService}
              onEditPrice={(serviceId, offeringId, value) => setEditingPrice({ serviceId, offeringId, value })}
              onSavePrice={() => {
                if (!editingPrice) return;
                updateOffering(editingPrice.serviceId, editingPrice.offeringId, { price: editingPrice.value });
                setEditingPrice(null);
                showToast('Offering price updated.');
              }} />

            )}
            </motion.section>
          }

          {activeTab === 'providers' &&
          <motion.section key="providers" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="px-4 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold">Providers</h1>
                  <p className="mt-1 text-sm text-gray-500">Staff who appear after a customer picks a service and how they want to be served.</p>
                </div>
                <button onClick={() => setShowAddProvider(true)} className="rounded-xl bg-teal-400 px-3 py-2 text-xs font-bold text-[#042f2f]">
                  Add provider
                </button>
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {partner.services.map((service) =>
              <button
                key={service.id}
                onClick={() => setServiceFilter(service.id)}
                className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-semibold ${serviceFilter === service.id ? 'border-teal-400 bg-teal-400/15 text-teal-200' : 'border-white/10 bg-[#131B2E] text-gray-400'}`}>
                
                    {service.label}
                  </button>
              )}
              </div>

              <div className="mt-5 space-y-3">
                {filteredService?.providers.map((provider) =>
              <div key={provider.id} className="rounded-2xl border border-white/10 bg-[#131B2E] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold">{provider.name}</p>
                        <p className="mt-0.5 text-xs text-gray-500">{provider.role} · {filteredService.label}</p>
                        <p className="mt-2 text-xs text-gray-400">{provider.rating} ★ · {provider.completed} · {provider.responseTime}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {provider.modes.map((mode) => {
                        const label = filteredService.serveModes.find((item) => item.id === mode)?.label ?? mode;
                        return <span key={mode} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-gray-400">{label}</span>;
                      })}
                        </div>
                      </div>
                      <button
                    aria-label={`Toggle ${provider.name} availability`}
                    aria-pressed={provider.available}
                    onClick={() => {
                      toggleProvider(filteredService.id, provider.id);
                      showToast(provider.available ? `${provider.name} hidden from OneLink.` : `${provider.name} is now bookable.`);
                    }}
                    className={`relative h-8 w-14 flex-shrink-0 rounded-full ${provider.available ? 'bg-teal-400' : 'bg-gray-600'}`}>
                    
                        <span className="absolute top-1 h-6 w-6 rounded-full bg-white shadow" style={{ left: provider.available ? 30 : 4 }} />
                      </button>
                    </div>
                  </div>
              )}
              </div>
            </motion.section>
          }

          {activeTab === 'jobs' &&
          <motion.section key="jobs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="px-4 py-5">
              <h1 className="text-xl font-bold">Jobs</h1>
              <p className="mt-1 text-sm text-gray-500">Requests coming in through your Partner OneLink.</p>
              <div className="mt-5 space-y-3">
                {jobs.map((job) =>
              <JobRow key={job.id} job={job} onAccept={() => acceptJob(job.id)} onComplete={() => completeJob(job.id)} />
              )}
              </div>
            </motion.section>
          }

          {activeTab === 'settings' &&
          <motion.section key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4 px-4 py-5">
              <div>
                <h1 className="text-xl font-bold">Partner settings</h1>
                <p className="mt-1 text-sm text-gray-500">Control the public OneLink and how services are fulfilled.</p>
              </div>
              <SettingsRow label="Business name" value={partner.name} />
              <SettingsRow label="Operator" value={partner.operator} />
              <SettingsRow label="Coverage" value={partner.zone} />
              <SettingsRow label="Hours" value={partner.hours} />
              <button onClick={copyLink} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#131B2E] p-4 text-left">
                <span>
                  <span className="block text-xs text-gray-500">OneLink</span>
                  <span className="mt-1 block text-sm font-semibold">{partner.handle}</span>
                </span>
                <LinkIcon className="h-4 w-4 text-teal-300" />
              </button>
              <button onClick={onOpenFront} className="flex w-full items-center justify-between rounded-2xl border border-teal-400/25 bg-teal-400/10 p-4 text-left text-sm font-bold text-teal-200">
                Preview Business Front
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </motion.section>
          }
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-[#0A0E1A]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl" aria-label="Partner dashboard navigation">
        <div className="mx-auto flex max-w-3xl justify-around">
          {[
          { id: 'home' as Tab, label: 'Home', icon: HomeIcon },
          { id: 'services' as Tab, label: 'Services', icon: BriefcaseIcon },
          { id: 'providers' as Tab, label: 'Providers', icon: UsersIcon },
          { id: 'jobs' as Tab, label: 'Jobs', icon: ClipboardCheckIcon },
          { id: 'settings' as Tab, label: 'Settings', icon: Settings2Icon }].
          map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-semibold ${active ? 'text-teal-300' : 'text-gray-500'}`}>
                
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>);

          })}
        </div>
      </nav>

      <AnimatePresence>
        {(showAddProvider || showAddOffering) &&
        <>
            <motion.button aria-label="Close form" className="fixed inset-0 z-40 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => {
            setShowAddProvider(false);
            setShowAddOffering(false);
          }} />
            <motion.aside
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-3xl rounded-t-3xl border-t border-white/10 bg-[#131B2E] p-5"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}>
            
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">{showAddProvider ? 'Add provider' : 'Add offering'}</h2>
                <button onClick={() => {
                setShowAddProvider(false);
                setShowAddOffering(false);
              }} className="rounded-lg p-2 text-gray-400">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <p className="mb-4 text-xs text-gray-500">Saving to {filteredService?.label}.</p>
              {showAddProvider ?
            <div className="space-y-3">
                  <Field label="Full name" value={providerName} onChange={setProviderName} placeholder="e.g. Ngozi Ade" />
                  <Field label="Role" value={providerRole} onChange={setProviderRole} placeholder="e.g. Mobile wash specialist" />
                  <button onClick={handleAddProvider} className="w-full rounded-xl bg-teal-400 py-3 text-sm font-bold text-[#042f2f]">
                    Save provider
                  </button>
                </div> :

            <div className="space-y-3">
                  <Field label="Offering name" value={offeringName} onChange={setOfferingName} placeholder="e.g. Engine wash" />
                  <Field label="Price" value={offeringPrice} onChange={setOfferingPrice} placeholder="e.g. 6500" />
                  <button onClick={handleAddOffering} className="w-full rounded-xl bg-teal-400 py-3 text-sm font-bold text-[#042f2f]">
                    Save offering
                  </button>
                </div>
            }
            </motion.aside>
          </>
        }
      </AnimatePresence>

      <AnimatePresence>
        {toast &&
        <motion.div
          role="status"
          className="fixed bottom-24 left-4 right-4 z-50 mx-auto max-w-md rounded-xl border border-white/15 bg-[#131B2E] px-4 py-3 text-center text-sm font-semibold shadow-2xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}>
          
            {toast}
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}

function MetricCard({ label, value, detail, icon: Icon }: {label: string;value: string;detail: string;icon: typeof WalletIcon;}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#131B2E] p-4">
      <Icon className="h-4 w-4 text-teal-300" />
      <p className="mt-3 text-xl font-bold">{value}</p>
      <p className="text-xs font-semibold text-gray-300">{label}</p>
      <p className="mt-1 text-[11px] text-gray-500">{detail}</p>
    </div>);

}

function JobRow({ job, onAccept, onComplete }: {job: PartnerJob;onAccept: () => void;onComplete: () => void;}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#131B2E] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-400/15 text-xs font-bold text-teal-200">
            {job.initials}
          </div>
          <div>
            <p className="text-sm font-bold">{job.offering}</p>
            <p className="mt-0.5 text-xs text-gray-500">{job.customer} · {job.service} · {job.mode}</p>
            <p className="mt-1 text-xs text-gray-400">{job.time} · {job.provider}</p>
          </div>
        </div>
        <span className={`rounded-full border px-2 py-1 text-[10px] font-bold capitalize ${statusStyle[job.status]}`}>{job.status.replace('-', ' ')}</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm font-bold text-teal-300">{job.price}</p>
        {job.status === 'new' && <button onClick={onAccept} className="rounded-lg bg-teal-400 px-3 py-1.5 text-xs font-bold text-[#042f2f]">Accept</button>}
        {job.status === 'in-progress' && <button onClick={onComplete} className="rounded-lg border border-teal-400/30 px-3 py-1.5 text-xs font-bold text-teal-200">Complete</button>}
        {job.status === 'completed' && <span className="flex items-center gap-1 text-xs text-emerald-300"><CheckCircle2Icon className="h-3.5 w-3.5" /> Done</span>}
      </div>
    </div>);

}

function ServiceManageCard({
  service,
  children,
  highlightId,
  editingPrice,
  onToggle,
  onEditPrice,
  onSavePrice
}: {
  service: PartnerServiceLine;
  children: PartnerServiceLine[];
  highlightId: string;
  editingPrice: {serviceId: string;offeringId: string;value: string;} | null;
  onToggle: (id: string) => void;
  onEditPrice: (serviceId: string, offeringId: string, value: string) => void;
  onSavePrice: () => void;
}) {
  const lines = [service, ...children];
  return (
    <div className="mt-4 space-y-3">
      {lines.map((line) => {
        const Icon = line.icon;
        const highlighted = highlightId === line.id;
        return (
          <article key={line.id} className={`rounded-2xl border p-4 ${highlighted ? 'border-teal-400/40 bg-teal-400/5' : 'border-white/10 bg-[#131B2E]'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: line.accentSoft, color: line.accent }}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">{line.label}{line.parentId ? ' · under OyaFix' : ''}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{line.brand} · {line.offerings.length} offerings · {line.providers.length} providers</p>
                </div>
              </div>
              <button
                aria-label={`Toggle ${line.label}`}
                aria-pressed={line.enabled}
                onClick={() => onToggle(line.id)}
                className={`relative h-8 w-14 flex-shrink-0 rounded-full ${line.enabled ? 'bg-teal-400' : 'bg-gray-600'}`}>
                
                <span className="absolute top-1 h-6 w-6 rounded-full bg-white shadow" style={{ left: line.enabled ? 30 : 4 }} />
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {line.offerings.map((offering) => {
                const editing = editingPrice?.serviceId === line.id && editingPrice.offeringId === offering.id;
                return (
                  <div key={offering.id} className="flex items-center justify-between gap-3 rounded-xl bg-[#0A0E1A] px-3 py-2">
                    <p className="text-xs text-gray-300">{offering.name}</p>
                    {editing ?
                    <div className="flex items-center gap-2">
                        <input
                        value={editingPrice.value}
                        onChange={(event) => onEditPrice(line.id, offering.id, event.target.value)}
                        className="w-24 rounded-lg border border-white/10 bg-[#131B2E] px-2 py-1 text-xs text-white outline-none" />
                      
                        <button onClick={onSavePrice} className="text-[11px] font-bold text-teal-300">Save</button>
                      </div> :

                    <button onClick={() => onEditPrice(line.id, offering.id, offering.price)} className="text-xs font-bold" style={{ color: line.accent }}>
                        {offering.price}
                      </button>
                    }
                  </div>);

              })}
            </div>
          </article>);

      })}
    </div>);

}

function SettingsRow({ label, value }: {label: string;value: string;}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#131B2E] p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>);

}

function Field({ label, value, onChange, placeholder }: {label: string;value: string;onChange: (value: string) => void;placeholder: string;}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-gray-400">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-white/25" />
      
    </label>);

}
