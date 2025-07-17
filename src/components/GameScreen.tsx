import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Level } from '../types';
import { levels } from '../gameLogic';
import { Oopsie, Celebration, Ripple } from './FeedbackAnimations';

interface GameScreenProps {
  level: Level;
  onWin: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ level, onWin }) => {
  const [missPosition, setMissPosition] = useState<{ x: number; y: number } | null>(null);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("🔍 Lade Bild:", level.imageSrc);
    setImageStatus('loading');
    setImageDimensions(null);
    setRipples([]);
    setMissPosition(null);
    setIsCelebrating(false);

    const img = new Image();
    img.src = level.imageSrc;
    img.onload = () => {
      console.log("✅ Bild geladen:", img.src);
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setImageStatus('loaded');
    };
    img.onerror = (err) => {
      console.error("❌ Bild konnte nicht geladen werden:", img.src, err);
      setImageStatus('error');
    };
  }, [level.imageSrc]); // 👈 HIER war der Fehler (fehlendes })

  const getRelativeClickPosition = (event: React.MouseEvent) => {
    if (!gameAreaRef.current) return null;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    return { x, y };
  };

  const addRipple = useCallback((x: number, y: number) => {
    const newRipple = { id: Date.now(), x, y };
    setRipples(currentRipples => [...currentRipples, newRipple]);
    setTimeout(() => {
      setRipples(currentRipples => currentRipples.filter(r => r.id !== newRipple.id));
    }, 600);
  }, []);

  const handleHit = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (isCelebrating) return;
    const pos = getRelativeClickPosition(event);
    if (pos) addRipple(pos.x, pos.y);

    setIsCelebrating(true);
    setTimeout(() => {
      onWin();
    }, 2500);
  }, [isCelebrating, onWin, addRipple]);

  const handleMiss = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (isCelebrating) return;
    const pos = getRelativeClickPosition(event);
    if (!pos) return;

    addRipple(pos.x, pos.y);
    setMissPosition({ x: pos.x, y: pos.y });
    setTimeout(() => setMissPosition(null), 1000);
  }, [isCelebrating, addRipple]);

  const { x, y, width, height } = level.tractorBoundingBox;
  const totalLevels = levels.length;
  const progressPercentage = (level.id / totalLevels) * 100;

  return (
    <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center select-none p-2">
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex items-center justify-between gap-4">
          <div className="bg-black bg-opacity-70 text-white font-bold py-2 px-4 rounded-lg shadow-md text-xl font-fredoka">
            {`Level ${level.id} of ${totalLevels}`}
          </div>
          <div className="flex-grow bg-gray-700 rounded-full h-4 shadow-inner">
            <div
              className="bg-yellow-400 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {imageStatus === 'loading' && <div className="text-white font-fredoka text-2xl animate-pulse">Loading Level...</div>}
      {imageStatus === 'error' && (
        <div className="w-11/12 max-w-lg bg-red-100 border-4 border-dashed border-red-400 rounded-lg p-6 text-center text-red-900 shadow-lg">
          <h3 className="font-fredoka text-3xl mb-4">Error Loading Image</h3>
          <p>Could not load the image for this level. Please check the image URL or your internet connection.</p>
        </div>
      )}

      {imageStatus === 'loaded' && imageDimensions && (
        <div 
          className="relative max-w-full max-h-full"
          ref={gameAreaRef}
        >
          <svg viewBox={`0 0 ${imageDimensions.width} ${imageDimensions.height}`} className="block w-full" style={{ height: 'auto' }} />
          <div
            className="absolute inset-0 bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${level.imageSrc})` }}
            onClick={handleMiss}
          >
            <div
              className="absolute cursor-pointer"
              style={{
                left: `${x}%`, top: `${y}%`, width: `${width}%`, height: `${height}%`
              }}
              onClick={handleHit}
              title="Click the tractor!"
            />

            {ripples.map(ripple => <Ripple key={ripple.id} position={{ x: ripple.x, y: ripple.y }} />)}
            {missPosition && <Oopsie position={missPosition} />}
            {isCelebrating && (
              <>
                <div className="absolute top-0 left-0 w-full bg-black/80 pointer-events-none" style={{ height: `${y}%` }} />
                <div className="absolute bottom-0 left-0 w-full bg-black/80 pointer-events-none" style={{ height: `${100 - (y + height)}%` }} />
                <div className="absolute left-0 bg-black/80 pointer-events-none" style={{ top: `${y}%`, height: `${height}%`, width: `${x}%` }} />
                <div className="absolute right-0 bg-black/80 pointer-events-none" style={{ top: `${y}%`, height: `${height}%`, width: `${100 - (x + width)}%` }} />
                
                <Celebration />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
