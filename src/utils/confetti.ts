import confetti from 'canvas-confetti';

export const triggerFloralConfetti = () => {
  const colors = ['#ff2a5f', '#ccff00', '#3b82f6', '#ff6b00', '#ffffff'];
  
  // Left side spray
  confetti({
    particleCount: 40,
    angle: 60,
    spread: 55,
    origin: { x: 0.1, y: 0.7 },
    colors: colors,
    shapes: ['circle', 'square'],
    scalar: 1.2
  });

  // Right side spray
  confetti({
    particleCount: 40,
    angle: 120,
    spread: 55,
    origin: { x: 0.9, y: 0.7 },
    colors: colors,
    shapes: ['circle', 'square'],
    scalar: 1.2
  });
};
