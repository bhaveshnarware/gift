import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { audioManager } from '../utils/soundEffects';

export default function AudioPlayer({ musicPath, musicStartTime = 0 }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const togglePlay = () => {
    setHasInteracted(true);
    audioManager.toggleMusic(musicPath, musicStartTime);
  };

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 1100 }}>
      <button
        onClick={togglePlay}
        className="audio-toggle-btn"
        aria-label={isPlaying ? "Mute music" : "Play music"}
        title={isPlaying ? "Mute music" : "Play ambient music"}
      >
        {isPlaying && <div className="audio-pulse" />}
        {isPlaying ? (
          <Volume2 size={20} color="#ff9e7d" />
        ) : (
          <VolumeX size={19} color="#e0b5cf" />
        )}
      </button>
      {isPlaying && (
        <div style={{
          position: 'absolute',
          top: '48px',
          right: '0',
          fontSize: '0.7rem',
          color: '#ffb3c1',
          background: 'rgba(25, 7, 32, 0.75)',
          backdropFilter: 'blur(10px)',
          padding: '2px 8px',
          borderRadius: '12px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: '4px'
        }}>
          <Music size={10} /> Playing Melodies
        </div>
      )}
    </div>
  );
}
