import React from 'react';
import { GameMode } from '../types';

interface WelcomeScreenProps {
  onPlay: (mode: GameMode) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onPlay }) => {
  const imageUrl = 'https://i.ibb.co/cKXwkYNR/title-screen.png';

  return (
    <div
      className="w-full h-full bg-black bg-contain bg-no-repeat bg-center flex flex-col items-center justify-center p-8"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="flex flex-col items-center">
        <button
          onClick={() => onPlay(GameMode.CLASSIC)}
          className="bg-yellow-400 text-gray-800 font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform text-2xl font-fredoka mb-4"
        >
          Classic
        </button>
        <button
          onClick={() => onPlay(GameMode.ENDLESS)}
          className="bg-green-400 text-gray-800 font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform text-2xl font-fredoka"
        >
          Endless
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
