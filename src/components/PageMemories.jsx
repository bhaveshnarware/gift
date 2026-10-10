import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Calendar, Maximize2, X, Sparkles } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export default function PageMemories({ config, onNext }) {
  const memories = config.memories || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomPhoto, setZoomPhoto] = useState(null);

  const handleNextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const activeMemory = memories[currentIndex] || {};

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'radial-gradient(circle at 50% 20%, #290d36 0%, #170521 65%, #0d0213 100%)',
        color: '#ffffff',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '70px 16px 28px 16px'
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ zIndex: 10, maxWidth: '600px' }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5.5vw, 3rem)',
            fontWeight: 800,
            marginBottom: '6px',
            background: 'linear-gradient(135deg, #ffffff 0%, #ffd166 40%, #ff85a1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {config.memoryLaneTitle || "A walk down memory lane ✨"}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 3.2vw, 1.25rem)',
            fontStyle: 'italic',
            color: '#ffc1d3',
            maxWidth: '520px',
            margin: '0 auto 12px auto'
          }}
        >
          {config.memoryLaneSubtitle || "Some moments become memories. Some people become family."}
        </p>

        {/* Counter pill */}
        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#ffd166',
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '4px 14px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          Memory {currentIndex + 1} of {memories.length}
        </span>
      </motion.div>

      {/* Main Memory Carousel Stage with Swipe & Polaroid Styling */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '14px 0',
          perspective: '1000px'
        }}
      >
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrevCard}
          aria-label="Previous memory"
          style={{
            position: 'absolute',
            left: '-14px',
            zIndex: 30,
            background: 'rgba(30, 9, 38, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Polaroid Card with Drag/Swipe */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.88, rotate: -3, x: 50 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.88, rotate: 3, x: -50 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x > 60) handlePrevCard();
              else if (info.offset.x < -60) handleNextCard();
            }}
            style={{
              width: '100%',
              maxWidth: '380px',
              backgroundColor: '#fffdfa',
              borderRadius: '16px',
              padding: '16px 16px 22px 16px',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 118, 149, 0.25)',
              border: '1px solid rgba(255, 235, 230, 0.8)',
              color: '#341520',
              textAlign: 'center',
              cursor: 'grab',
              touchAction: 'pan-y'
            }}
          >
            {/* Scrapbook Tape Accent */}
            <div
              style={{
                width: '70px',
                height: '18px',
                background: 'rgba(255, 222, 173, 0.7)',
                margin: '-24px auto 12px auto',
                borderRadius: '2px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />

            {/* Photo Container with Tap to Zoom */}
            <div
              onClick={() => setZoomPhoto(activeMemory.image)}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 3.4',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#f5e6ea',
                cursor: 'pointer',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15)'
              }}
            >
              <img
                src={activeMemory.image}
                alt={activeMemory.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              {/* Zoom pill */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  background: 'rgba(0, 0, 0, 0.55)',
                  backdropFilter: 'blur(6px)',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.72rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Maximize2 size={11} /> Zoom
              </div>
            </div>

            {/* Caption & Title */}
            <div style={{ marginTop: '16px', padding: '0 6px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  color: '#9e4a68',
                  marginBottom: '4px'
                }}
              >
                <Calendar size={13} /> {activeMemory.date || "Forever moment"}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  color: '#b0103e',
                  marginBottom: '8px'
                }}
              >
                {activeMemory.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: '1.25rem',
                  lineHeight: 1.35,
                  color: '#4a2533'
                }}
              >
                "{activeMemory.caption}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNextCard}
          aria-label="Next memory"
          style={{
            position: 'absolute',
            right: '-14px',
            zIndex: 30,
            background: 'rgba(30, 9, 38, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnails Navigation Row & Keep Going button */}
      <div style={{ width: '100%', maxWidth: '440px', zIndex: 10 }}>
        {/* Thumbnails */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '18px'
          }}
        >
          {memories.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: currentIndex === idx ? '2px solid #ffd166' : '1px solid rgba(255, 255, 255, 0.2)',
                transform: currentIndex === idx ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.25s ease',
                padding: 0,
                cursor: 'pointer',
                boxShadow: currentIndex === idx ? '0 0 12px #ff8da1' : 'none'
              }}
            >
              <img src={m.image} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>

        {/* Keep Going Button */}
        <button
          onClick={() => {
            triggerConfetti(0.5);
            onNext();
          }}
          className="btn-peach"
          style={{ width: '100%', maxWidth: '300px' }}
        >
          Keep Going 💌
        </button>
      </div>

      {/* Fullscreen Photo Modal */}
      <AnimatePresence>
        {zoomPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomPhoto(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 2, 14, 0.92)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1300,
              padding: '20px'
            }}
          >
            <button
              onClick={() => setZoomPhoto(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={zoomPhoto}
              alt="Zoomed memory"
              style={{
                maxWidth: '90vw',
                maxHeight: '80vh',
                borderRadius: '16px',
                boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255, 118, 149, 0.4)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
