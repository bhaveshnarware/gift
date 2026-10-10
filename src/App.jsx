import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initialBirthdayConfig } from './config/birthdayConfig';
import ProgressBar from './components/ProgressBar';
import AudioPlayer from './components/AudioPlayer';
import SettingsModal from './components/SettingsModal';
import PageIntro from './components/PageIntro';
import PageReveal from './components/PageReveal';
import PageCake from './components/PageCake';
import PageBalloons from './components/PageBalloons';
import PageMemories from './components/PageMemories';
import PageLetter from './components/PageLetter';
import PageCelebration from './components/PageCelebration';
import PageGift from './components/PageGift';
import './index.css';

export default function App() {
  const [config, setConfig] = useState(initialBirthdayConfig);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const totalPages = 8;

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleReplay = () => {
    setCurrentPage(1);
  };

  const handleUpdateLetter = (newBody) => {
    setConfig((prev) => ({
      ...prev,
      letter: {
        ...prev.letter,
        body: newBody
      }
    }));
  };

  // Cinematic page transitions
  const pageVariants = {
    initial: { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 1.04, filter: 'blur(8px)', transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="app-container">
      {/* Ambient background glow orbs */}
      <div className="ambient-glow-orb orb-1" aria-hidden="true" />
      <div className="ambient-glow-orb orb-2" aria-hidden="true" />

      {/* Cinematic Overlays */}
      <div className="cinema-overlay" aria-hidden="true" />
      <div className="cinema-vignette" aria-hidden="true" />

      {/* Audio toggle button */}
      <AudioPlayer musicPath={config.musicPath} musicStartTime={config.musicStartTime} />

      {/* Progress navigation dots & Settings trigger */}
      <ProgressBar
        currentPage={currentPage}
        totalPages={totalPages}
        onSelectPage={goToPage}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Settings / Personalization Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSaveConfig={setConfig}
      />

      {/* Active Page View */}
      <main style={{ flex: 1, width: '100%', position: 'relative' }}>
        <AnimatePresence mode="wait">
          {currentPage === 1 && (
            <motion.div key="page-1" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ width: '100%', height: '100%' }}>
              <PageIntro config={config} onNext={goToNextPage} />
            </motion.div>
          )}

          {currentPage === 2 && (
            <motion.div key="page-2" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ width: '100%', height: '100%' }}>
              <PageReveal config={config} onNext={goToNextPage} />
            </motion.div>
          )}

          {currentPage === 3 && (
            <motion.div key="page-3" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ width: '100%', height: '100%' }}>
              <PageCake config={config} onNext={goToNextPage} />
            </motion.div>
          )}

          {currentPage === 4 && (
            <motion.div key="page-4" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ width: '100%', height: '100%' }}>
              <PageBalloons config={config} onNext={goToNextPage} />
            </motion.div>
          )}

          {currentPage === 5 && (
            <motion.div key="page-5" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ width: '100%', height: '100%' }}>
              <PageMemories config={config} onNext={goToNextPage} />
            </motion.div>
          )}

          {currentPage === 6 && (
            <motion.div key="page-6" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ width: '100%', height: '100%' }}>
              <PageLetter config={config} onNext={goToNextPage} onUpdateLetter={handleUpdateLetter} />
            </motion.div>
          )}

          {currentPage === 7 && (
            <motion.div key="page-7" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ width: '100%', height: '100%' }}>
              <PageCelebration config={config} onNext={goToNextPage} />
            </motion.div>
          )}

          {currentPage === 8 && (
            <motion.div key="page-8" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ width: '100%', height: '100%' }}>
              <PageGift config={config} onReplay={handleReplay} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
