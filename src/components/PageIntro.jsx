import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { audioManager } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

export default function PageIntro({ config, onNext }) {
  const [isPulled, setIsPulled] = useState(false);
  const dragY = useMotionValue(0);
  const stringLength = useTransform(dragY, [0, 100], [80, 180]);
  const handleScale = useTransform(dragY, [0, 100], [1, 1.25]);

  const handlePullTrigger = () => {
    if (isPulled) return;
    setIsPulled(true);
    audioManager.playRibbonPull();
    audioManager.playMusic(config.musicPath, config.musicStartTime);
    triggerConfetti(0.7);

    setTimeout(() => {
      onNext();
    }, 700);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(120% 88% at 50% 24%, #fff5f0 0%, #fae1d5 40%, #f3c2b0 75%, #e09995 100%)',
        color: '#4e2230',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '24px'
      }}
    >
      {/* Floating Sparkle motes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${(i * 19) % 95}vw`,
              y: `${(i * 27) % 90}vh`,
              opacity: 0.2,
              scale: 0.6
            }}
            animate={{
              y: [`${(i * 27) % 90}vh`, `${((i * 27) % 90) - 40}px`],
              opacity: [0.2, 0.7, 0.2],
              scale: [0.6, 1.1, 0.6]
            }}
            transition={{
              duration: 4 + (i % 4) * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              color: 'rgba(216, 68, 105, 0.55)'
            }}
          >
            <Sparkles size={16 + (i % 3) * 6} />
          </motion.div>
        ))}
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '520px',
          width: '100%',
          zIndex: 10
        }}
      >
        {/* Animated Line Drawing of a Heart */}
        <div style={{ position: 'relative', width: '180px', height: '160px', marginBottom: '24px' }}>
          <svg
            viewBox="0 0 100 90"
            style={{
              width: '100%',
              height: '100%',
              filter: 'drop-shadow(0 4px 16px rgba(220, 50, 95, 0.35))'
            }}
          >
            {/* Outline Line Drawing Heart */}
            <motion.path
              d="M50 86.5C26 68 10.5 53.6 10.5 34.6 10.5 20.4 21 11 33.2 11c8.6 0 14.2 4.7 16.8 11.4C52.6 15.7 58.2 11 66.8 11 79 11 89.5 20.4 89.5 34.6 89.5 53.6 74 68 50 86.5Z"
              fill="none"
              stroke="#e6396a"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />

            {/* Glowing inner filled heart */}
            <motion.path
              d="M50 86.5C26 68 10.5 53.6 10.5 34.6 10.5 20.4 21 11 33.2 11c8.6 0 14.2 4.7 16.8 11.4C52.6 15.7 58.2 11 66.8 11 79 11 89.5 20.4 89.5 34.6 89.5 53.6 74 68 50 86.5Z"
              fill="url(#heartGradIntro)"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: [0.85, 0.94, 0.85], opacity: [0.75, 0.95, 0.75] }}
              transition={{
                delay: 1.8,
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ transformOrigin: '50% 50%' }}
            />

            <defs>
              <radialGradient id="heartGradIntro" cx="45%" cy="35%" r="65%">
                <stop offset="0%" stop-color="#ffd5e2" />
                <stop offset="45%" stop-color="#ff7b9f" />
                <stop offset="90%" stop-color="#e62d60" />
                <stop offset="100%" stop-color="#b0103e" />
              </radialGradient>
            </defs>
          </svg>

          {/* Gentle Pulse Glow Ring */}
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0, 0.4]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1.5
            }}
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              border: '2px solid rgba(230, 57, 106, 0.5)',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Delicate message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.2rem, 3.8vw, 1.6rem)',
            fontStyle: 'italic',
            letterSpacing: '0.04em',
            color: '#7a2842',
            marginBottom: '8px'
          }}
        >
          {config.introMessage || "A little something, just for you 💗"}
        </motion.p>

        {/* Bestie subtitle hint */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(2.4rem, 7vw, 3.6rem)',
            color: '#be1849',
            lineHeight: 1.1,
            marginBottom: '28px',
            textShadow: '0 2px 10px rgba(190, 24, 73, 0.2)'
          }}
        >
          For {config.bestieName}
        </motion.h1>

        {/* Instruction and Interactive Pull String */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10px'
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#9e435e',
              marginBottom: '16px'
            }}
          >
            {config.pullInstruction || "Pull the string to reveal your surprise"}
          </p>

          {/* The Pull String Mechanic */}
          <div
            style={{
              position: 'relative',
              width: '80px',
              height: '140px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'grab'
            }}
          >
            {/* Silk string path */}
            <motion.svg
              style={{
                position: 'absolute',
                top: 0,
                width: '6px',
                height: stringLength,
                overflow: 'visible'
              }}
            >
              <line
                x1="3"
                y1="0"
                x2="3"
                y2="100%"
                stroke="#c94c6f"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
            </motion.svg>

            {/* Draggable Pull Handle / Golden Heart Tassel */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 90 }}
              dragElastic={0.3}
              style={{
                y: dragY,
                scale: handleScale,
                position: 'absolute',
                top: '70px',
                touchAction: 'none'
              }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 45) {
                  handlePullTrigger();
                }
              }}
              onClick={handlePullTrigger}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff8da1 0%, #e62d60 100%)',
                  boxShadow: '0 8px 24px rgba(230, 45, 96, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ffffff',
                  cursor: 'pointer'
                }}
              >
                <Heart size={26} color="#ffffff" fill="#ffffff" />
              </div>

              {/* Little down arrow hint */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  fontSize: '0.75rem',
                  color: '#9e435e',
                  marginTop: '8px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap'
                }}
              >
                Pull or Tap ↓
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
