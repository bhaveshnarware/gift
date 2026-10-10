import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Gift, Award } from 'lucide-react';
import { triggerGrandCelebrationConfetti, triggerConfetti } from '../utils/confetti';

export default function PageCelebration({ config, onNext }) {
  useEffect(() => {
    triggerGrandCelebrationConfetti();
  }, []);

  const handleSurpriseClick = () => {
    triggerConfetti(0.4);
    onNext();
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
        background: 'radial-gradient(circle at 50% 20%, #2f0e3d 0%, #1a0624 55%, #0b0110 100%)',
        color: '#ffffff',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '70px 20px 30px 20px'
      }}
    >
      {/* Floating Stars and Hearts Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: '105vh',
              x: `${(i * 11) % 95}vw`,
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.7, 0.7, 0],
              scale: [0.5, 1.2, 1.2, 0.7]
            }}
            transition={{
              duration: 7 + (i % 4) * 2,
              repeat: Infinity,
              delay: (i * 0.5),
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              color: i % 2 === 0 ? '#ffd166' : '#ff758c'
            }}
          >
            {i % 2 === 0 ? <Sparkles size={18 + (i % 3) * 6} /> : <Heart size={16 + (i % 3) * 6} fill="currentColor" />}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        style={{ maxWidth: '640px', width: '100%', zIndex: 10 }}
      >
        {/* Celebration Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 209, 102, 0.15)',
            border: '1px solid rgba(255, 209, 102, 0.4)',
            padding: '6px 20px',
            borderRadius: '30px',
            color: '#ffd166',
            fontSize: '0.9rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '18px'
          }}
        >
          <Award size={16} /> Celebration Day
        </motion.div>

        {/* Grand Typography Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.6rem, 8vw, 4.8rem)',
            fontWeight: 900,
            letterSpacing: '0.04em',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #ffffff 0%, #ffcf6a 45%, #ff5277 85%, #f472b6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 6px 24px rgba(255, 82, 119, 0.5))',
            marginBottom: '6px'
          }}
        >
          {config.celebrationTitle || "HAPPY BIRTHDAY"}
        </h1>

        {/* Bestie Name Subheading */}
        <h2
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(3rem, 9vw, 5.5rem)',
            color: '#ff8da1',
            lineHeight: 1.1,
            marginBottom: '24px',
            textShadow: '0 4px 20px rgba(255, 77, 121, 0.6), 0 0 40px rgba(255, 209, 102, 0.4)'
          }}
        >
          {config.bestieName}! ❤️
        </h2>

        {/* Emotional Message Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="glass-panel"
          style={{
            padding: '28px 24px',
            marginBottom: '36px',
            border: '1px solid rgba(255, 209, 102, 0.3)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5), 0 0 30px rgba(255, 118, 149, 0.25)'
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 3.8vw, 1.55rem)',
              fontStyle: 'italic',
              lineHeight: 1.7,
              color: '#fff3ea',
              whiteSpace: 'pre-line'
            }}
          >
            {config.celebrationMessage ||
              `Today is all about YOU.
Keep shining, keep smiling, and never stop being amazing.

The world is a better place with you in it. 💗`}
          </p>
        </motion.div>

        {/* Action Button: One Last Surprise */}
        <motion.button
          onClick={handleSurpriseClick}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="btn-peach"
          style={{
            fontSize: '1.2rem',
            padding: '16px 42px',
            boxShadow: '0 10px 30px rgba(255, 157, 118, 0.6)'
          }}
        >
          <Gift size={22} /> One Last Surprise 🎁
        </motion.button>
      </motion.div>
    </div>
  );
}
