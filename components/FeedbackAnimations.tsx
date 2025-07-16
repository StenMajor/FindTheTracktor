
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';

// Ripple Component
interface RippleProps {
  position: { x: number; y: number }; // x, y are percentages
}

export const Ripple: React.FC<RippleProps> = ({ position }) => {
  return (
    <div
      className="absolute rounded-full border-2 border-white/70 animate-ripple select-none pointer-events-none z-30"
      style={{
        width: '50px',
        height: '50px',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%) scale(0)',
      }}
    />
  );
};


// Oopsie Component
interface OopsieProps {
  position: { x: number; y: number }; // x, y are percentages
}

export const Oopsie: React.FC<OopsieProps> = ({ position }) => {
  const oopsieRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: 'translate(-50%, -50%)',
    opacity: 0, // Start invisible until positioned correctly
  });

  useLayoutEffect(() => {
    if (!oopsieRef.current) return;

    const el = oopsieRef.current;
    const parent = el.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    
    // We need the element's rendered size to calculate centering and constraints
    const elWidth = el.offsetWidth;
    const elHeight = el.offsetHeight;
    
    // Calculate initial desired position in pixels, centered on the click
    let left = (position.x / 100) * parentRect.width - elWidth / 2;
    let top = (position.y / 100) * parentRect.height - elHeight / 2;

    // Constrain to parent boundaries
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (left + elWidth > parentRect.width) left = parentRect.width - elWidth;
    if (top + elHeight > parentRect.height) top = parentRect.height - elHeight;

    setStyle({
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      transform: 'none', // We are now setting position with left/top, not transform
      opacity: 1,
    });
  }, [position]);


  return (
    <div
      ref={oopsieRef}
      className="absolute text-5xl font-fredoka text-red-500 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg animate-pop-out select-none pointer-events-none z-30"
      style={style}
    >
      OOPS!
    </div>
  );
};

// Celebration Component
const Firework: React.FC<{ left: string; top: string; delay: number }> = ({ left, top, delay }) => {
  return (
    <div className="absolute" style={{ left, top }}>
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="firework"
          style={{
            transform: `rotate(${(i * 360) / 15}deg) translateX(30px)`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export const Celebration: React.FC = () => {
    const [fireworks, setFireworks] = useState<{ id: number, left: string, top: string, delay: number }[]>([]);

    useEffect(() => {
        const createFireworks = () => {
            const newFireworks = Array.from({ length: 5 }).map((_, index) => ({
                id: Date.now() + index,
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                delay: Math.random() * 1.5,
            }));
            setFireworks(newFireworks);
        };
        createFireworks();
    }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
       {fireworks.map(fw => (
            <Firework key={fw.id} left={fw.left} top={fw.top} delay={fw.delay} />
       ))}
      <div className="text-center">
        <h1 className="text-7xl md:text-9xl font-fredoka text-yellow-300 animate-pulse drop-shadow-lg" style={{ animationDuration: '1.5s' }}>
          WOOW!
        </h1>
      </div>
    </div>
  );
};
