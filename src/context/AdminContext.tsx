import React, { useState, useEffect, createContext, useContext } from 'react';
import { Event } from '../types';
import { EVENTS } from '../constants';

interface AdminContextType {
  events: Event[];
  addEvent: (e: Omit<Event, 'id'>) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (e: Event) => void;
  user: any;
  isAdmin: boolean;
}

const AdminContext = createContext<AdminContextType>({
  events: [],
  addEvent: () => {},
  deleteEvent: () => {},
  updateEvent: () => {},
  user: null,
  isAdmin: false,
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>(EVENTS);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsAdmin(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addEvent = (e: Omit<Event, 'id'>) => {
    const newEvent = { ...e, id: Math.random().toString(36).substr(2, 9) };
    setEvents(prev => [newEvent, ...prev]);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const updateEvent = (e: Event) => {
    setEvents(prev => prev.map(item => item.id === e.id ? e : item));
  };

  return (
    <AdminContext.Provider value={{ events, addEvent, deleteEvent, updateEvent, user: null, isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
