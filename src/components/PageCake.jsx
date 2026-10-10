import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';
import { audioManager } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

export default function PageCake({ config, onNext }) {
  const [isBlown, setIsBlown] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);
    audioManager.playBlowCandle();
    triggerConfetti(0.5);

    setTimeout(() => {
      setShowWish(true);
      triggerConfetti(0.4);
    }, 800);
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
        background: 'radial-gradient(circle at 50% 30%, #20092c 0%, #13041a 60%, #0a020e 100%)',
        color: '#ffffff',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '24px'
      }}
    >
      {/* Tiny stars & glowing particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.15, 0.9, 0.15],
              scale: [0.7, 1.25, 0.7]
            }}
            transition={{
              duration: 2.2 + (i % 4) * 0.8,
              repeat: Infinity,
              delay: (i * 0.25)
            }}
            style={{
              position: 'absolute',
              top: `${(i * 17) % 95}%`,
              left: `${(i * 29) % 94}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? '#ffd166' : '#ff94b8',
              boxShadow: '0 0 8px currentColor'
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        style={{ zIndex: 10, maxWidth: '580px', width: '100%' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            fontStyle: 'italic',
            letterSpacing: '0.06em',
            color: '#ffb3c6',
            marginBottom: '6px'
          }}
        >
          {config.cakeHeading || "First things first 🎂"}
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5.5vw, 3rem)',
            fontWeight: 700,
            marginBottom: '28px',
            background: 'linear-gradient(135deg, #fff 0%, #ffcf6a 60%, #ff8da1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {isBlown ? "A Wish Made! ✨" : "Make a wish, birthday star ✨"}
        </h2>

        {/* Animated Cake Container */}
        <div
          onClick={handleBlowCandle}
          style={{
            position: 'relative',
            width: '260px',
            height: '240px',
            margin: '0 auto 24px auto',
            cursor: isBlown ? 'default' : 'pointer',
            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.6))'
          }}
          title={isBlown ? "Candle blown!" : "Tap candle to blow it out!"}
        >
          {/* Candle & Flame */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 5
            }}
          >
            {/* Flame */}
            <AnimatePresence>
              {!isBlown ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{
                    scale: [1, 1.15, 0.95, 1],
                    rotate: [-2, 3, -3, 2]
                  }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                    transition: { duration: 0.3 }
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    position: 'absolute',
                    top: '-32px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '18px',
                    height: '28px',
                    borderRadius: '50% 50% 35% 35% / 60% 60% 40% 40%',
                    background: 'radial-gradient(ellipse at 50% 65%, #ffffff 0%, #ffe600 35%, #ff5500 80%, transparent 100%)',
                    boxShadow: '0 0 25px #ffb703, 0 0 45px #ff5d8f',
                    transformOrigin: 'bottom center'
                  }}
                />
              ) : (
                /* Smoke puff on blowout */
                <motion.div
                  initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
                  animate={{
                    opacity: [0.8, 0.4, 0],
                    y: -45,
                    scale: [0.6, 1.5, 2.2],
                    x: [0, 8, -6]
                  }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                  style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '50%',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(230,230,250,0.7) 0%, transparent 70%)',
                    filter: 'blur(3px)'
                  }}
                />
              )}
            </AnimatePresence>

            {/* Candle Stick */}
            <div
              style={{
                width: '12px',
                height: '42px',
                borderRadius: '3px',
                background: 'repeating-linear-gradient(45deg, #ff94b8, #ff94b8 6px, #ffffff 6px, #ffffff 12px)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                margin: '0 auto'
              }}
            />
          </div>

          {/* SVG Multi-Tier Birthday Cake */}
          <svg
            viewBox="0 0 260 190"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '190px'
            }}
          >
            <defs>
              <linearGradient id="cakePlate" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#493240" />
                <stop offset="50%" stop-color="#e2b4d8" />
                <stop offset="100%" stop-color="#493240" />
              </linearGradient>
              <linearGradient id="tierTop" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#d94b76" />
                <stop offset="30%" stop-color="#ff7b9f" />
                <stop offset="100%" stop-color="#b02652" />
              </linearGradient>
              <linearGradient id="tierBase" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#c43867" />
                <stop offset="35%" stop-color="#ff6b93" />
                <stop offset="100%" stop-color="#8a1740" />
              </linearGradient>
              <linearGradient id="frosting" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#ffeef3" />
                <stop offset="50%" stop-color="#ffffff" />
                <stop offset="100%" stop-color="#ffd5e2" />
              </linearGradient>
            </defs>

            {/* Cake Plate */}
            <ellipse cx="130" cy="180" rx="120" ry="10" fill="url(#cakePlate)" opacity="0.8" />

            {/* Bottom Tier */}
            <rect x="40" y="110" width="180" height="65" rx="14" fill="url(#tierBase)" />
            {/* Frosting dripping on bottom tier */}
            <path
              d="M40 115 Q 55 130, 70 115 T 100 115 T 130 115 T 160 115 T 190 115 T 220 115 L 220 110 L 40 110 Z"
              fill="url(#frosting)"
            />
            {/* Gold pearl sprinkles */}
            {[55, 80, 110, 135, 165, 195].map((x, i) => (
              <circle key={i} cx={x} cy="150" r="3.5" fill="#ffd166" />
            ))}

            {/* Top Tier */}
            <rect x="75" y="55" width="110" height="58" rx="12" fill="url(#tierTop)" />
            {/* Top Frosting */}
            <path
              d="M75 60 Q 86 72, 97 60 T 119 60 T 141 60 T 163 60 T 185 60 L 185 55 L 75 55 Z"
              fill="url(#frosting)"
            />
            {/* Strawberries / Cherries on top */}
            {[90, 115, 140, 165].map((x, i) => (
              <circle key={`berry-${i}`} cx={x} cy="52" r="6" fill="#e62d60" />
            ))}
          </svg>
        </div>

        {/* Tap Prompt or Wish Revealed */}
        <AnimatePresence mode="wait">
          {!isBlown ? (
            <motion.div
              key="tap-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ marginTop: '8px' }}
            >
              <button
                onClick={handleBlowCandle}
                className="btn-peach"
                style={{
                  fontSize: '1rem',
                  padding: '12px 28px',
                  boxShadow: '0 0 25px rgba(255, 157, 118, 0.45)'
                }}
              >
                Tap Candle to Blow Out 🎂💨
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="wish-revealed"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="glass-panel"
              style={{
                padding: '24px',
                marginTop: '12px',
                border: '1px solid rgba(255, 209, 102, 0.35)',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 82, 119, 0.3)'
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.15rem, 3.8vw, 1.4rem)',
                  fontStyle: 'italic',
                  color: '#fff3c4',
                  lineHeight: 1.6,
                  marginBottom: '18px'
                }}
              >
                {config.cakeWishRevealed ||
                  "May all your secret wishes and sweetest dreams come true today! 🌟💖"}
              </p>

              <button onClick={onNext} className="btn-peach">
                Continue to Balloons <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
