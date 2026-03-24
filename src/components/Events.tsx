import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Search, Edit, Trash2, X, Calendar, MapPin, Plus } from 'lucide-react';
import { Event } from '../types';
import { useAdmin } from '../context/AdminContext';
import { SectionHeader, getIcon } from './shared';

const TimelineCard: React.FC<{
  event: Event; index: number; isAdmin: boolean;
  onEdit: (e: Event) => void; onDelete: (id: string) => void; onRecap: (e: Event) => void;
}> = ({ event, index, isAdmin, onEdit, onDelete, onRecap }) => {
  const isEven = index % 2 === 0;
  const Icon = getIcon(event.icon);
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-12">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neon-orange shadow-[0_0_20px_rgba(255,87,34,0.4)] z-10 md:absolute md:left-1/2 md:-translate-x-1/2">
        <Icon size={18} className="text-white" />
      </div>
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-neon-orange/50 transition-all duration-500 group-hover:bg-white/[0.05]"
      >
        <div className="flex justify-between items-start mb-4">
          <span className="text-neon-orange font-black text-sm tracking-widest">{event.year}</span>
          {isAdmin && (
            <div className="flex gap-2">
              <button onClick={() => onEdit(event)} className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors"><Edit size={14} /></button>
              <button onClick={() => onDelete(event.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-white/50 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
            </div>
          )}
        </div>
        <h3 className="text-xl font-black mb-2 tracking-tight">{event.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">{event.description}</p>
        <button onClick={() => onRecap(event)}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/50 hover:text-neon-orange transition-colors group/btn"
        >
          View Recap <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};

const ArchiveView: React.FC<{ events: Event[]; onBack: () => void; onRecap: (e: Event) => void }> = ({ events, onBack, onRecap }) => {
  const [search, setSearch] = useState('');
  const filteredEvents = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()) || e.year.includes(search));

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="min-h-[600px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-bold">
          <ArrowLeft size={20} /> Back to Timeline
        </button>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input type="text" placeholder="Search events or years..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 w-full md:w-80 focus:outline-none focus:border-neon-orange/50 transition-colors" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <motion.div key={event.id} layout className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-neon-orange/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-xl text-neon-orange">{React.createElement(getIcon(event.icon), { size: 20 })}</div>
              <span className="text-xs font-black text-white/30">{event.year}</span>
            </div>
            <h4 className="text-lg font-black mb-2">{event.title}</h4>
            <p className="text-sm text-gray-500 mb-6 line-clamp-2">{event.description}</p>
            <button onClick={() => onRecap(event)}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-neon-orange hover:text-white transition-all"
            >
              View Recap
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const RecapModal: React.FC<{ event: Event; onClose: () => void }> = ({ event, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
    >
      <button onClick={onClose} className="absolute top-6 right-6 z-10 p-3 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors"><X size={24} /></button>
      <div className="grid md:grid-cols-2">
        <div className="h-64 md:h-full relative bg-white/5">
          {event.image ? (
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/10">{React.createElement(getIcon(event.icon), { size: 120 })}</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent md:bg-gradient-to-r" />
        </div>
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-neon-orange/20 text-neon-orange text-[10px] font-black uppercase tracking-widest rounded-full">{event.year} Event</span>
          </div>
          <h2 className="text-4xl font-black mb-6 tracking-tighter">{event.title}</h2>
          <div className="space-y-6 text-gray-400 leading-relaxed font-medium">
            <p>{event.longDescription || event.description}</p>
            <div className="pt-6 border-t border-white/5 flex items-center gap-6">
              <div className="flex items-center gap-2"><Calendar size={16} className="text-neon-orange" /><span className="text-xs">{event.year}</span></div>
              <div className="flex items-center gap-2"><MapPin size={16} className="text-neon-orange" /><span className="text-xs">Campus Center</span></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

const AdminModal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export const EventsTimeline = () => {
  const { events, addEvent, deleteEvent, updateEvent, isAdmin } = useAdmin();
  const [view, setView] = useState<'timeline' | 'archive'>('timeline');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const sortedEvents = [...events].sort((a, b) => parseInt(b.year) - parseInt(a.year));
  const timelineEvents = sortedEvents.slice(0, 5);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const eventData = {
      title: formData.get('title') as string,
      year: formData.get('year') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string,
      longDescription: formData.get('longDescription') as string,
    };
    if (editingEvent) { updateEvent({ ...editingEvent, ...eventData }); }
    else { addEvent(eventData); }
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <section id="events" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <SectionHeader subtitle="Events & Workshops" title="Our Journey." number="05" />
          <div className="flex items-center gap-4">
            {isAdmin && (
              <button onClick={() => { setEditingEvent(null); setIsModalOpen(true); }}
                className="flex items-center gap-2 px-6 py-3 bg-neon-orange text-white rounded-2xl font-black text-sm hover:shadow-[0_0_20px_rgba(255,87,34,0.4)] transition-all"
              >
                <Plus size={18} /> Add Event
              </button>
            )}
            <button onClick={() => setView(view === 'timeline' ? 'archive' : 'timeline')}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl font-black text-sm hover:bg-white/10 transition-all"
            >
              {view === 'timeline' ? 'View Archive' : 'View Timeline'}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'timeline' ? (
            <motion.div key="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-orange via-white/10 to-transparent" />
              <div className="space-y-12">
                {timelineEvents.map((event, idx) => (
                  <TimelineCard key={event.id} event={event} index={idx} isAdmin={isAdmin}
                    onEdit={(e) => { setEditingEvent(e); setIsModalOpen(true); }}
                    onDelete={deleteEvent} onRecap={setSelectedEvent} />
                ))}
              </div>
              <div className="mt-20 text-center">
                <button onClick={() => setView('archive')}
                  className="group inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors font-black uppercase tracking-widest text-sm"
                >
                  Explore Full Archive <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ) : (
            <ArchiveView key="archive" events={events} onBack={() => setView('timeline')} onRecap={setSelectedEvent} />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedEvent && <RecapModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      </AnimatePresence>

      <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingEvent ? 'Edit Event' : 'Add New Event'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-white/30 mb-2">Event Title</label>
            <input name="title" defaultValue={editingEvent?.title} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-orange/50 outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-white/30 mb-2">Year</label>
              <input name="year" defaultValue={editingEvent?.year} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-orange/50 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-white/30 mb-2">Icon</label>
              <input name="icon" defaultValue={editingEvent?.icon} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-orange/50 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-white/30 mb-2">Short Description</label>
            <textarea name="description" defaultValue={editingEvent?.description} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-orange/50 outline-none h-24" />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-white/30 mb-2">Long Description</label>
            <textarea name="longDescription" defaultValue={editingEvent?.longDescription} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-orange/50 outline-none h-32" />
          </div>
          <button type="submit" className="w-full py-4 bg-neon-orange text-white font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(255,87,34,0.4)] transition-all">
            {editingEvent ? 'Update Event' : 'Create Event'}
          </button>
        </form>
      </AdminModal>
    </section>
  );
};
