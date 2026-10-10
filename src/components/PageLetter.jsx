import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Edit3, Check, ChevronRight, Sparkles } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export default function PageLetter({ config, onNext, onUpdateLetter }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Format letter text with bestie name and your name
  const rawLetter = config.letter?.body || "";
  const fullText = rawLetter
    .replace(/\[BESTIE_NAME\]/g, config.bestieName)
    .replace(/\[YOUR_NAME\]/g, config.yourName);

  useEffect(() => {
    setEditedBody(fullText);
  }, [fullText]);

  // Gentle typewriter effect
  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    setIsTypingDone(false);

    // Fast typewriter for smooth readability without sluggish waiting
    const interval = setInterval(() => {
      index += 3;
      if (index >= fullText.length) {
        setDisplayedText(fullText);
        setIsTypingDone(true);
        clearInterval(interval);
      } else {
        setDisplayedText(fullText.slice(0, index));
      }
    }, 15);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleSave = () => {
    setIsEditing(false);
    if (onUpdateLetter) {
      onUpdateLetter(editedBody);
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
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 25%, #23082e 0%, #13041c 65%, #08010d 100%)',
        color: '#ffffff',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '70px 16px 30px 16px'
      }}
    >
      {/* Floating Sparkles in background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + (i % 3) * 1.5,
              repeat: Infinity,
              delay: (i * 0.4)
            }}
            style={{
              position: 'absolute',
              top: `${(i * 22) % 94}%`,
              left: `${(i * 31) % 92}%`,
              color: 'rgba(255, 182, 193, 0.4)'
            }}
          >
            <Sparkles size={16} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        style={{
          width: '100%',
          maxWidth: '560px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Parchment Letter Card */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#fbf7ee',
            backgroundImage: 'radial-gradient(#eedcc3 0.8px, transparent 0.8px), radial-gradient(#eedcc3 0.8px, #fbf7ee 0.8px)',
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 16px 16px',
            borderRadius: '20px',
            padding: '36px 26px 32px 26px',
            boxShadow: '0 24px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 150, 180, 0.25)',
            border: '2px solid #ecd8c2',
            color: '#381622',
            textAlign: 'left'
          }}
        >
          {/* Wax Heart Seal / Stamp on top right */}
          <div
            style={{
              position: 'absolute',
              top: '-18px',
              right: '24px',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #e62d60, #8f0f33)',
              boxShadow: '0 4px 12px rgba(143, 15, 51, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #fff'
            }}
            title="Sealed with love"
          >
            <Heart size={20} fill="#ffffff" color="#ffffff" />
          </div>

          {/* Letter Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#8a1c41',
                fontStyle: 'italic'
              }}
            >
              Dear {config.bestieName},
            </h3>

            {/* Quick Edit Toggle Button */}
            <button
              onClick={() => {
                if (isEditing) handleSave();
                else setIsEditing(true);
              }}
              style={{
                background: 'rgba(138, 28, 65, 0.1)',
                border: '1px solid rgba(138, 28, 65, 0.3)',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#8a1c41',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer'
              }}
            >
              {isEditing ? <><Check size={12} /> Save</> : <><Edit3 size={12} /> Edit</>}
            </button>
          </div>

          {/* Letter Body: Typewriter or Edit mode */}
          {isEditing ? (
            <textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              rows={10}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1.5px solid #d4a373',
                borderRadius: '12px',
                padding: '12px',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: '#381622',
                resize: 'vertical',
                outline: 'none'
              }}
            />
          ) : (
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.05rem, 3.2vw, 1.25rem)',
                lineHeight: 1.7,
                color: '#461e2e',
                whiteSpace: 'pre-line',
                marginBottom: '20px',
                minHeight: '140px'
              }}
            >
              {isTypingDone ? fullText : displayedText}
              {!isTypingDone && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  style={{ color: '#e62d60', fontWeight: 'bold' }}
                >
                  |
                </motion.span>
              )}
            </p>
          )}

          {/* Sign off and animated heart */}
          <div style={{ marginTop: '20px', borderTop: '1px dashed #dfcbb8', paddingTop: '16px' }}>
            <p
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '2rem',
                color: '#8a1c41',
                lineHeight: 1.1,
                marginBottom: '4px'
              }}
            >
              With lots of love,
            </p>
            <p
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#341520'
              }}
            >
              {config.yourName}
            </p>
          </div>

          {/* Small animated heart at bottom */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                filter: [
                  'drop-shadow(0 0 4px rgba(230, 45, 96, 0.4))',
                  'drop-shadow(0 0 14px rgba(230, 45, 96, 0.8))',
                  'drop-shadow(0 0 4px rgba(230, 45, 96, 0.4))'
                ]
              }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <Heart size={26} fill="#e62d60" color="#e62d60" />
            </motion.div>
          </div>
        </div>

        {/* Continue Button */}
        <div style={{ marginTop: '28px' }}>
          <button
            onClick={() => {
              triggerConfetti(0.4);
              onNext();
            }}
            className="btn-peach"
          >
            The Grand Celebration 🎉 <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
