import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AdminProvider } from './context/AdminContext';
import { ContentReveal, SectionDivider } from './components/shared';
import { LoadingScreen } from './components/LoadingScreen';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { WhoWeAre } from './components/WhoWeAre';
import { Departments } from './components/Departments';
import { Board } from './components/Board';
import { Projects } from './components/Projects';
import { EventsTimeline } from './components/Events';
import { Recruitment } from './components/Recruitment';
import { Footer } from './components/Footer';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AdminProvider>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      {!isLoading && (
        <ContentReveal>
          <Nav />
          <main className="relative z-10">
            <Hero />
            <SectionDivider variant="circuit" />
            <WhoWeAre />
            <SectionDivider variant="wave" />
            <Departments />
            <SectionDivider variant="circuit" />
            <Board />
            <SectionDivider variant="circuit" />
            <Projects />
            <SectionDivider variant="wave" />
            <EventsTimeline />
            <SectionDivider variant="circuit" />
            <Recruitment />
          </main>
          <Footer />
        </ContentReveal>
      )}
    </AdminProvider>
  );
};

export default App;
