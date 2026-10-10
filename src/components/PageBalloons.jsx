import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, X } from 'lucide-react';
import { audioManager } from '../utils/soundEffects';
import { triggerBalloonPopConfetti, triggerConfetti } from '../utils/confetti';

export default function PageBalloons({ config, onNext }) {
  const [poppedIds, setPoppedIds] = useState(new Set());
  const [activeMessage, setActiveMessage] = useState(null);

  const balloonsList = config.balloonMessages || [];
  const remainingCount = balloonsList.length - poppedIds.size;
  const allPopped = poppedIds.size === balloonsList.length;

  const handlePop = (balloon, e) => {
    if (poppedIds.has(balloon.id)) {
      // If already popped, clicking reveals its message again
      setActiveMessage(balloon);
      return;
    }

    // Get click coords for localized confetti
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    audioManager.playBalloonPop();
    triggerBalloonPopConfetti(x, y, balloon.color);

    const nextSet = new Set(poppedIds);
    nextSet.add(balloon.id);
    setPoppedIds(nextSet);
    setActiveMessage(balloon);

    if (nextSet.size === balloonsList.length) {
      setTimeout(() => {
        triggerConfetti(0.4);
      }, 600);
    }
  };

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
        background: 'radial-gradient(circle at 50% 25%, #240b30 0%, #15061e 60%, #0c0211 100%)',
        color: '#ffffff',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '70px 20px 30px 20px'
      }}
    >
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ zIndex: 10, maxWidth: '580px' }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5.5vw, 3rem)',
            fontWeight: 800,
            marginBottom: '6px',
            background: 'linear-gradient(135deg, #ffffff 0%, #ff8da1 60%, #ffd166 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {config.balloonsHeading || "Pop the balloons 🎈"}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem',
            fontStyle: 'italic',
            color: '#ffc2d4',
            marginBottom: '10px'
          }}
        >
          {config.balloonsSubtitle || "Each one holds a reason you're loved."}
        </p>

        {/* Counter Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 16px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#ffd166'
          }}
        >
          <Sparkles size={14} />
          {allPopped
            ? "All 5 balloons popped! 🎉"
            : `${remainingCount} of ${balloonsList.length} balloons remaining`}
        </div>
      </motion.div>

      {/* Floating Balloons Stage */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          height: '310px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px 0'
        }}
      >
        {balloonsList.map((balloon, index) => {
          const isPopped = poppedIds.has(balloon.id);
          // Arranging 5 balloons in a semi-arch
          const positions = [
            { x: -160, y: 15, rot: -8 },
            { x: -80, y: -45, rot: -4 },
            { x: 0, y: -70, rot: 2 },
            { x: 80, y: -45, rot: 5 },
            { x: 160, y: 15, rot: 10 }
          ];
          const pos = positions[index] || { x: 0, y: 0, rot: 0 };

          return (
            <div
              key={balloon.id}
              style={{
                position: 'absolute',
                transform: `translate(${pos.x}px, ${pos.y}px)`
              }}
            >
              <AnimatePresence>
                {!isPopped ? (
                  <motion.div
                    onClick={(e) => handlePop(balloon, e)}
                    animate={{
                      y: [0, -14, 0],
                      rotate: [pos.rot, pos.rot + 4, pos.rot]
                    }}
                    transition={{
                      duration: 3 + index * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    exit={{
                      scale: [1, 1.4, 0],
                      opacity: [1, 0.8, 0],
                      transition: { duration: 0.25 }
                    }}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      filter: `drop-shadow(0 12px 20px rgba(0,0,0,0.5)) drop-shadow(0 0 16px ${balloon.color}aa)`
                    }}
                  >
                    {/* Balloon Body */}
                    <svg viewBox="0 0 100 125" width="84" height="105">
                      <defs>
                        <radialGradient id={`balloon-grad-${balloon.id}`} cx="35%" cy="30%" r="75%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                          <stop offset="25%" stopColor={balloon.highlight || balloon.color} />
                          <stop offset="85%" stopColor={balloon.color} />
                          <stop offset="100%" stopColor={balloon.accent || '#330818'} />
                        </radialGradient>
                      </defs>
                      {/* Oval Balloon */}
                      <ellipse cx="50" cy="52" rx="42" ry="48" fill={`url(#balloon-grad-${balloon.id})`} />
                      {/* Knot */}
                      <polygon points="50,100 44,106 56,106" fill={balloon.accent || balloon.color} />
                      {/* Gloss Reflection */}
                      <ellipse cx="34" cy="36" rx="8" ry="14" fill="#ffffff" opacity="0.65" transform="rotate(-20 34 36)" />
                    </svg>

                    {/* Balloon String */}
                    <svg width="2" height="42" style={{ marginTop: '-4px' }}>
                      <line x1="1" y1="0" x2="1" y2="42" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="2 2" />
                    </svg>

                    {/* Pop Me Pill */}
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        background: 'rgba(0, 0, 0, 0.45)',
                        backdropFilter: 'blur(6px)',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        marginTop: '2px',
                        letterSpacing: '0.04em'
                      }}
                    >
                      POP ME
                    </span>
                  </motion.div>
                ) : (
                  /* Popped Badge / Re-open trigger */
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setActiveMessage(balloon)}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: `${balloon.color}33`,
                      border: `1.5px solid ${balloon.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#ffffff',
                      boxShadow: `0 0 14px ${balloon.color}66`
                    }}
                    title="Read this reason again"
                  >
                    <Heart size={18} fill={balloon.color} color={balloon.color} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom Container: Message Modal or Final All-Popped Continue */}
      <div style={{ width: '100%', maxWidth: '540px', zIndex: 10 }}>
        {allPopped && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-panel"
            style={{
              padding: '20px 24px',
              marginBottom: '16px',
              border: '1px solid rgba(255, 118, 149, 0.4)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.4), 0 0 20px rgba(255, 82, 119, 0.3)'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.3rem',
                fontStyle: 'italic',
                color: '#ffd166',
                marginBottom: '14px'
              }}
            >
              {config.balloonsCompletedMessage || "And these are just five of a million reasons! 💗"}
            </p>
            <button onClick={onNext} className="btn-peach">
              Our Memory Lane <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </div>

      {/* Pop-up Card for Revealed Reason */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMessage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 2, 14, 0.75)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1200,
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel"
              style={{
                maxWidth: '440px',
                width: '100%',
                padding: '30px 24px',
                textAlign: 'center',
                position: 'relative',
                border: `2px solid ${activeMessage.color}`,
                boxShadow: `0 16px 40px rgba(0,0,0,0.6), 0 0 30px ${activeMessage.color}66`
              }}
            >
              <button
                onClick={() => setActiveMessage(null)}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  opacity: 0.7
                }}
              >
                <X size={20} />
              </button>

              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: `${activeMessage.color}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  border: `1px solid ${activeMessage.color}`
                }}
              >
                <Heart size={28} fill={activeMessage.color} color={activeMessage.color} />
              </div>

              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: activeMessage.color,
                  textTransform: 'uppercase'
                }}
              >
                {activeMessage.title}
              </span>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  color: '#ffffff',
                  margin: '16px 0 24px 0'
                }}
              >
                "{activeMessage.message}"
              </p>

              <button
                onClick={() => setActiveMessage(null)}
                className="btn-peach"
                style={{ padding: '10px 24px', fontSize: '0.95rem' }}
              >
                Got It 💗
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
