import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronRight } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { audioManager } from '../utils/soundEffects';

export default function PageReveal({ config, onNext }) {
  useEffect(() => {
    triggerConfetti(0.4);
  }, []);

  const handleContinue = () => {
    audioManager.init();
    triggerConfetti(0.5);
    onNext();
  };

  const balloons = [
    { color: '#ff6b8b', x: -50, y: -40, scale: 1.1, rot: -8, delay: 0 },
    { color: '#ff9478', x: 45, y: -50, scale: 1.05, rot: 10, delay: 0.2 },
    { color: '#f38181', x: 0, y: -80, scale: 1.25, rot: 2, delay: 0.4 },
    { color: '#e86af0', x: -75, y: 10, scale: 0.95, rot: -14, delay: 0.3 },
    { color: '#ffd166', x: 70, y: 15, scale: 0.95, rot: 12, delay: 0.5 },
    { color: '#ff758c', x: 0, y: -10, scale: 1.15, rot: 0, delay: 0.1 },
  ];

  return (
    <div
      onClick={handleContinue}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 20%, #2a0b32 0%, #1a0624 55%, #0e0315 100%)',
        color: '#ffffff',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '24px',
        cursor: 'pointer'
      }}
    >
      {/* Tiny floating hearts & sparkles in background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${(i * 13) % 92}vw`,
              y: '105vh',
              opacity: 0,
              scale: 0.4
            }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.65, 0.65, 0],
              scale: [0.4, 1, 1, 0.6]
            }}
            transition={{
              duration: 8 + (i % 5) * 2,
              repeat: Infinity,
              delay: (i * 0.7),
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              color: i % 2 === 0 ? 'rgba(255, 118, 149, 0.6)' : 'rgba(255, 209, 102, 0.6)'
            }}
          >
            {i % 3 === 0 ? <Heart size={14 + (i % 3) * 6} fill="currentColor" /> : <Sparkles size={12 + (i % 2) * 6} />}
          </motion.div>
        ))}
      </div>

      {/* Center Balloon Bouquet */}
      <motion.div
        initial={{ scale: 0.6, y: 100, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
        style={{
          position: 'relative',
          width: '280px',
          height: '240px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '28px',
          marginTop: '10px'
        }}
      >
        {/* Balloon strings tied together */}
        <svg
          style={{
            position: 'absolute',
            bottom: '-45px',
            width: '180px',
            height: '110px',
            pointerEvents: 'none',
            overflow: 'visible'
          }}
        >
          <path d="M40 0 Q 80 50, 90 90" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" fill="none" />
          <path d="M140 0 Q 100 50, 90 90" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" fill="none" />
          <path d="M90 -30 Q 90 40, 90 90" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" fill="none" />
          <path d="M20 20 Q 70 60, 90 90" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" fill="none" />
          <path d="M160 20 Q 110 60, 90 90" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" fill="none" />
          {/* Ribbon Bow */}
          <circle cx="90" cy="90" r="5" fill="#ffd166" />
          <path d="M90 90 C 75 80, 70 105, 90 95 C 110 105, 105 80, 90 90" fill="#ffd166" />
        </svg>

        {/* Floating Heart Balloons */}
        {balloons.map((b, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [b.y, b.y - 12, b.y],
              rotate: [b.rot, b.rot + 4, b.rot]
            }}
            transition={{
              duration: 3 + idx * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: b.delay
            }}
            style={{
              position: 'absolute',
              left: `calc(50% + ${b.x}px - 34px)`,
              top: `calc(50% + ${b.y}px - 34px)`,
              filter: `drop-shadow(0 12px 24px rgba(0,0,0,0.45)) drop-shadow(0 0 16px ${b.color}88)`
            }}
          >
            <svg viewBox="0 0 100 92" width={68 * b.scale} height={62 * b.scale}>
              <defs>
                <radialGradient id={`bg-${idx}`} cx="35%" cy="30%" r="75%">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
                  <stop offset="25%" stop-color={b.color} />
                  <stop offset="100%" stop-color="#3d0317" />
                </radialGradient>
              </defs>
              <path
                d="M50 86.5C26 68 10.5 53.6 10.5 34.6 10.5 20.4 21 11 33.2 11c8.6 0 14.2 4.7 16.8 11.4C52.6 15.7 58.2 11 66.8 11 79 11 89.5 20.4 89.5 34.6 89.5 53.6 74 68 50 86.5Z"
                fill={`url(#bg-${idx})`}
              />
              {/* Gloss Highlight */}
              <ellipse cx="32" cy="28" rx="8" ry="5" fill="#fff" opacity="0.65" />
            </svg>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.0 }}
        style={{ maxWidth: '600px', zIndex: 10 }}
      >
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.1rem, 3.5vw, 1.45rem)',
            fontStyle: 'italic',
            letterSpacing: '0.08em',
            color: '#ffc1d3',
            marginBottom: '10px',
            textTransform: 'uppercase'
          }}
        >
          {config.revealTagline || "It's officially your day!"}
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 7vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #ffffff 0%, #ffcf6a 40%, #ff5277 85%, #f472b6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 4px 18px rgba(255, 82, 119, 0.4))'
          }}
        >
          Happy Birthday, {config.bestieName}! 🎂
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1.15rem, 3.8vw, 1.5rem)',
            fontWeight: 400,
            color: '#fce7f3',
            marginBottom: '36px'
          }}
        >
          {config.revealSubtitle || "And just like that, you're turning"}{" "}
          <strong style={{ color: '#ffd166', fontSize: '1.25em', fontWeight: 800 }}>
            {config.age}
          </strong>{" "}
          ✨
        </motion.p>

        {/* Tap Anywhere to continue */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handleContinue();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="btn-peach"
          style={{
            padding: '16px 36px',
            fontSize: '1.1rem'
          }}
        >
          Tap anywhere to continue <ChevronRight size={18} />
        </motion.button>
      </motion.div>
    </div>
  );
}
