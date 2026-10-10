// Web Audio API based ambient audio synthesizer & sound effects
// 100% reliable, zero external dependencies required, sounds warm and magical

class AudioManager {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicGain = null;
    this.melodyTimer = null;
    this.externalAudio = null;
    this.useExternal = false;
    this.isMuted = false;
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.isPlayingMusic);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach(fn => {
      try { fn(this.isPlayingMusic); } catch (e) {}
    });
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play custom audio file if provided, otherwise fallback to music box generator
  playMusic(customUrl = null, startTime = 0) {
    this.init();
    if (this.isPlayingMusic) return;

    if (customUrl) {
      try {
        const resolvedUrl = typeof window !== 'undefined' ? new URL(customUrl, window.location.href).href : customUrl;
        if (!this.externalAudio || this.externalAudio.src !== resolvedUrl) {
          if (this.externalAudio) {
            this.externalAudio.pause();
          }
          this.externalAudio = new Audio(customUrl);
          this.externalAudio.loop = true;
          this.externalAudio.volume = 0.5;
          this.hasStarted = false;

          if (startTime > 0) {
            this.externalAudio.addEventListener('loadedmetadata', () => {
              this.externalAudio.currentTime = startTime;
            }, { once: true });

            // If audio loops back to beginning, resume from startTime
            this.externalAudio.addEventListener('timeupdate', () => {
              if (this.externalAudio.currentTime < 1 && this.hasStarted) {
                this.externalAudio.currentTime = startTime;
              }
            });
          }
        }

        if (startTime > 0 && !this.hasStarted) {
          try {
            if (this.externalAudio.readyState >= 1) {
              this.externalAudio.currentTime = startTime;
            }
          } catch (e) {
            // will be handled by loadedmetadata
          }
        }

        const playPromise = this.externalAudio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.isPlayingMusic = true;
              this.useExternal = true;
              this.hasStarted = true;
              if (startTime > 0 && Math.abs(this.externalAudio.currentTime - startTime) > 2 && this.externalAudio.currentTime < startTime) {
                this.externalAudio.currentTime = startTime;
              }
              this.notify();
            })
            .catch(() => {
              // Fallback to synth if external file fails or blocked
              this.startSynthMelody();
            });
          return;
        }
      } catch (e) {
        this.startSynthMelody();
        return;
      }
    }

    this.startSynthMelody();
  }

  startSynthMelody() {
    if (!this.ctx) return;
    this.isPlayingMusic = true;
    this.useExternal = false;
    this.notify();

    // Harmonic pentatonic / emotional lofi melody notes in Hz
    // G3, C4, D4, E4, G4, A4, C5, D5, E5, G5
    const notes = [
      196.00, 261.63, 293.66, 329.63, 392.00, 
      440.00, 523.25, 587.33, 659.25, 783.99
    ];

    // Gentle musical sequence (arpeggiated music box)
    const sequence = [
      [1, 4, 6], [2, 5, 7], [3, 6, 8], [4, 7, 9],
      [3, 6, 8], [2, 5, 7], [1, 4, 6], [0, 3, 5],
      [1, 3, 6], [2, 4, 7], [3, 5, 8], [4, 6, 9]
    ];

    let step = 0;

    const playNextChord = () => {
      if (!this.isPlayingMusic || !this.ctx) return;
      
      const chord = sequence[step % sequence.length];
      step++;

      chord.forEach((noteIdx, i) => {
        const delay = i * 0.18; // slight arpeggio stagger
        const freq = notes[noteIdx] || 440;
        this.playMusicBoxNote(freq, delay, 2.5);
      });

      this.melodyTimer = setTimeout(playNextChord, 1600);
    };

    playNextChord();
  }

  playMusicBoxNote(freq, delay = 0, duration = 2.0) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime + delay;

    // Dual oscillator: Warm sine + delicate sparkle triangle
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now); // soft harmonic chime

    // Music box envelope: instant attack, bell-like organic decay
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  pauseMusic() {
    this.isPlayingMusic = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
    if (this.externalAudio) {
      this.externalAudio.pause();
    }
    this.notify();
  }

  toggleMusic(customUrl = null, startTime = 0) {
    if (this.isPlayingMusic) {
      this.pauseMusic();
      return false;
    } else {
      this.playMusic(customUrl, startTime);
      return true;
    }
  }

  // SFX: Soft popping sound for balloons
  playBalloonPop() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Frequency drop for the rubber release pop
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);

    // Followed by little high sparkle
    this.playChime(now + 0.04, 784);
  }

  // SFX: Candle blow out whoosh & sparkles
  playBlowCandle() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Breath / whoosh simulation with bandpass noise
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + 0.35);
    filter.Q.value = 1.8;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.45);

    // Magical chime cascade after blowing candle
    setTimeout(() => {
      this.playChimeCascade();
    }, 280);
  }

  // SFX: Ribbon pull / harp glide
  playRibbonPull() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const freqs = [392, 440, 523, 587, 659, 784, 880];

    freqs.forEach((freq, idx) => {
      const time = now + idx * 0.05;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.12, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.42);
    });
  }

  // SFX: Gift unwrap fanfare
  playGiftUnwrap() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const time = now + idx * 0.12;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.95);
    });
  }

  playChime(time, freq) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.52);
  }

  playChimeCascade() {
    const freqs = [523, 659, 784, 1046];
    freqs.forEach((f, i) => {
      setTimeout(() => {
        if (this.ctx) {
          this.playChime(this.ctx.currentTime, f);
        }
      }, i * 110);
    });
  }
}

export const audioManager = new AudioManager();
