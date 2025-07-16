import React from 'react';

interface WelcomeScreenProps {
  onPlay: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onPlay }) => {
  const imageUrl = 'https://i.ibb.co/cKXwkYNR/title-screen.png';

  return (
    <div
      className="w-full h-full cursor-pointer bg-black bg-contain bg-no-repeat bg-center flex flex-col items-center justify-end p-8"
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={onPlay}
      title="Click to start"
    >
      <p className="text-white text-2xl font-fredoka drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] animate-pulse">
        Click anywhere to start
      </p>
    </div>
  );
};

export default WelcomeScreen;
