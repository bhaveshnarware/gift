import confetti from 'canvas-confetti';

export const triggerConfetti = (originY = 0.6) => {
  try {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: originY },
      colors: ['#ff4d79', '#ff9a76', '#ffd166', '#a06cd5', '#ffffff'],
      disableForReducedMotion: true
    });
  } catch (e) {
    // Graceful fallback if confetti fails
  }
};

export const triggerGrandCelebrationConfetti = () => {
  try {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ff4d79', '#ffb3c1', '#ffd166', '#ff85a1', '#f5b09d', '#ffffff'],
        disableForReducedMotion: true
      });
    }, 280);
  } catch (e) {
    // fallback
  }
};

export const triggerBalloonPopConfetti = (x = 0.5, y = 0.5, color = '#ff4d79') => {
  try {
    confetti({
      particleCount: 35,
      spread: 55,
      startVelocity: 25,
      origin: { x, y },
      colors: [color, '#ffd166', '#ffffff'],
      disableForReducedMotion: true
    });
  } catch (e) {
    // fallback
  }
};
