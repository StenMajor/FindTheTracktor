import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Oopsie, Celebration, Ripple } from './FeedbackAnimations';
import { backgroundImages, tractorImages, getRandomElement } from '../endlessGameLogic';

interface EndlessGameScreenProps {
  onWin: () => void;
  levelCount: number;
}

const EndlessGameScreen: React.FC<EndlessGameScreenProps> = ({ onWin, levelCount }) => {
  const [missPosition, setMissPosition] = useState<{ x: number; y: number } | null>(null);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [tractorImage, setTractorImage] = useState<string>('');
  const [tractorPosition, setTractorPosition] = useState({ x: 50, y: 50 });
  const gameAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupLevel = () => {
      setImageStatus('loading');
      const randomBg = getRandomElement(backgroundImages);
      const randomTractor = getRandomElement(tractorImages);

      setBackgroundImage(randomBg);
      setTractorImage(randomTractor);

      // Position tractor randomly
      const x = Math.random() * 80; // 0 to 80% of width
      const y = Math.random() * 70; // 0 to 70% of height, to avoid sky
      setTractorPosition({ x, y });

      // Preload images
      const bgImg = new Image();
      bgImg.src = randomBg;
      const tractorImg = new Image();
      tractorImg.src = randomTractor;

      Promise.all([bgImg.decode(), tractorImg.decode()])
        .then(() => setImageStatus('loaded'))
        .catch(() => setImageStatus('error'));
    };

    setupLevel();
  }, [levelCount]);

  const handleHit = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (isCelebrating) return;
    setIsCelebrating(true);
    setTimeout(() => {
      onWin();
      setIsCelebrating(false);
    }, 2500);
  }, [isCelebrating, onWin]);

  const handleMiss = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (isCelebrating) return;
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setMissPosition({ x, y });
    setTimeout(() => setMissPosition(null), 1000);
  }, [isCelebrating]);

  return (
    <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center select-none p-2">
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-black bg-opacity-70 text-white font-bold py-2 px-4 rounded-lg shadow-md text-xl font-fredoka">
          {`Level: ${levelCount + 1}`}
        </div>
      </div>

      {imageStatus === 'loading' && <div className="text-white font-fredoka text-2xl animate-pulse">Loading Level...</div>}
      {imageStatus === 'error' && <div className="text-red-500">Error loading images.</div>}

      {imageStatus === 'loaded' && (
        <div
          ref={gameAreaRef}
          className="relative w-full h-full bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          onClick={handleMiss}
        >
          <div
            className="absolute w-[20%] h-[20%] bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url(${tractorImage})`,
              left: `${tractorPosition.x}%`,
              top: `${tractorPosition.y}%`,
              cursor: 'pointer'
            }}
            onClick={handleHit}
          />
          {missPosition && <Oopsie position={missPosition} />}
          {isCelebrating && <Celebration />}
        </div>
      )}
    </div>
  );
};

export default EndlessGameScreen;
