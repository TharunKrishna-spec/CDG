import React, { Suspense, lazy, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AdminProvider } from './context/AdminContext';
import { ContentReveal, SectionDivider } from './components/shared';
import { LoadingScreen } from './components/LoadingScreen';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';

const WhoWeAre = lazy(() => import('./components/WhoWeAre').then((module) => ({ default: module.WhoWeAre })));
const Departments = lazy(() => import('./components/Departments').then((module) => ({ default: module.Departments })));
const Board = lazy(() => import('./components/Board').then((module) => ({ default: module.Board })));
const Projects = lazy(() => import('./components/Projects').then((module) => ({ default: module.Projects })));
const EventsTimeline = lazy(() => import('./components/Events').then((module) => ({ default: module.EventsTimeline })));
const Recruitment = lazy(() => import('./components/Recruitment').then((module) => ({ default: module.Recruitment })));
const Footer = lazy(() => import('./components/Footer').then((module) => ({ default: module.Footer })));

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
          <Suspense fallback={null}>
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
          </Suspense>
        </ContentReveal>
      )}
    </AdminProvider>
  );
};

export default App;
