import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, RotateCcw, Heart, Sparkles } from 'lucide-react';
import { audioManager } from '../utils/soundEffects';
import { triggerGrandCelebrationConfetti, triggerConfetti } from '../utils/confetti';

export default function PageGift({ config, onReplay }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleUnwrap = () => {
    if (isOpen) return;
    setIsOpen(true);
    audioManager.playGiftUnwrap();
    triggerGrandCelebrationConfetti();
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
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 30%, #2b0b36 0%, #170520 60%, #0a010f 100%)',
        color: '#ffffff',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '70px 20px 30px 20px'
      }}
    >
      {/* Ambient background particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.15, 0.8, 0.15],
              scale: [0.7, 1.25, 0.7]
            }}
            transition={{
              duration: 3 + (i % 3) * 1.5,
              repeat: Infinity,
              delay: (i * 0.3)
            }}
            style={{
              position: 'absolute',
              top: `${(i * 19) % 94}%`,
              left: `${(i * 27) % 92}%`,
              color: i % 2 === 0 ? '#ff9e7d' : '#ff758c'
            }}
          >
            <Sparkles size={16} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        style={{
          width: '100%',
          maxWidth: '560px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#ffd166',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}
        >
          A SURPRISE FOR {config.bestieName.toUpperCase()}
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5.5vw, 2.8rem)',
            fontWeight: 800,
            marginBottom: '6px',
            background: 'linear-gradient(135deg, #ffffff 0%, #ffcf6a 50%, #ff8da1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {isOpen ? "Your Birthday Surprise 💖" : "The Final Gift 🎁"}
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem',
            fontStyle: 'italic',
            color: '#ffc1d3',
            marginBottom: '28px'
          }}
        >
          {config.giftSubtitle || "This little surprise is made with love ❤️"}
        </p>

        {/* Gift Box / Unwrapped Reveal */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-gift"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '10px 0 20px 0'
              }}
            >
              {/* 3D-Styled Gift Box */}
              <motion.div
                onClick={handleUnwrap}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'relative',
                  width: '210px',
                  height: '210px',
                  cursor: 'pointer',
                  filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.6)) drop-shadow(0 0 25px rgba(255,100,140,0.45))'
                }}
              >
                {/* Gift Box Base */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '180px',
                    height: '140px',
                    left: '15px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #d92055 0%, #850c33 100%)',
                    border: '2px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.4)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Vertical Golden Ribbon */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '32px',
                      background: 'linear-gradient(90deg, #ffe082 0%, #ffb300 50%, #ffd54f 100%)',
                      boxShadow: '0 0 8px rgba(255, 179, 0, 0.5)'
                    }}
                  />
                </div>

                {/* Gift Box Lid */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: '40px',
                    left: '5px',
                    width: '200px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #ff3366 0%, #a8103c 100%)',
                    border: '2px solid rgba(255, 255, 255, 0.35)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.45)',
                    zIndex: 5
                  }}
                >
                  {/* Lid Ribbon */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '32px',
                      background: 'linear-gradient(90deg, #ffe082 0%, #ffb300 50%, #ffd54f 100%)'
                    }}
                  />
                  {/* Horizontal Ribbon on Lid */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: '14px',
                      background: 'linear-gradient(180deg, #ffe082 0%, #ffb300 50%, #ffd54f 100%)'
                    }}
                  />
                </motion.div>

                {/* Big Golden Bow on top */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10
                  }}
                >
                  <svg width="70" height="45" viewBox="0 0 70 45">
                    {/* Left Loop */}
                    <ellipse cx="22" cy="20" rx="18" ry="14" fill="#ffd54f" stroke="#ffb300" strokeWidth="2" transform="rotate(-25 22 20)" />
                    {/* Right Loop */}
                    <ellipse cx="48" cy="20" rx="18" ry="14" fill="#ffd54f" stroke="#ffb300" strokeWidth="2" transform="rotate(25 48 20)" />
                    {/* Center Knot */}
                    <circle cx="35" cy="24" r="8" fill="#ffe082" stroke="#ffb300" strokeWidth="2" />
                  </svg>
                </motion.div>
              </motion.div>

              <button
                onClick={handleUnwrap}
                className="btn-peach"
                style={{
                  marginTop: '28px',
                  fontSize: '1.15rem',
                  padding: '16px 38px',
                  boxShadow: '0 8px 28px rgba(255, 140, 95, 0.6)'
                }}
              >
                <Gift size={20} /> Unwrap It 🎁
              </button>
            </motion.div>
          ) : (
            /* Opened Gift Reveal Card */
            <motion.div
              key="opened-gift"
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="glass-panel"
              style={{
                width: '100%',
                padding: '28px 24px',
                border: '1px solid rgba(255, 209, 102, 0.4)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(255, 100, 140, 0.35)',
                margin: '10px 0'
              }}
            >
              {/* Optional Special Photograph */}
              {config.giftImage && (
                <div
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 20px auto',
                    border: '4px solid #ffd166',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 25px rgba(255, 209, 102, 0.5)'
                  }}
                >
                  <img
                    src={config.giftImage}
                    alt={config.bestieName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#ffd166',
                  marginBottom: '14px'
                }}
              >
                Happy Birthday, {config.bestieName}! 🎂❤️
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.1rem, 3.4vw, 1.3rem)',
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                  color: '#fff3ea',
                  whiteSpace: 'pre-line',
                  marginBottom: '26px'
                }}
              >
                {config.giftRevealedMessage ||
                  `Thank you for being YOU.

Here's to more memories, more laughter, and countless beautiful moments together.

You will always have a special place in my heart.

Made with love, just for you. 💗`}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    triggerConfetti(0.4);
                    onReplay();
                  }}
                  className="btn-peach"
                  style={{ width: '100%', maxWidth: '280px' }}
                >
                  <RotateCcw size={18} /> Replay the Experience 🔄
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
