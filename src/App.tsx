import React, { useState, useCallback } from 'react';
import { GameState, GameMode } from './types';
import { levels } from './gameLogic';
import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
// import EndlessGameScreen from './components/EndlessGameScreen';
import { TractorIcon } from './components/icons';

const AllLevelsCompleteScreen: React.FC<{ onPlayAgain: () => void }> = ({ onPlayAgain }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-blue-400 text-white p-4 text-center">
    <h1 className="text-5xl md:text-7xl font-fredoka mb-4">You found them all!</h1>
    <TractorIcon className="w-24 h-24 text-yellow-300 my-8" />
    <p className="text-2xl mb-8">Great job, super finder!</p>
    <button
      onClick={onPlayAgain}
      className="bg-yellow-400 text-gray-800 font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform text-2xl font-fredoka"
    >
      Play Again
    </button>
  </div>
);

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.WELCOME);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.CLASSIC);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [endlessLevelCount, setEndlessLevelCount] = useState(0);

  const handlePlay = useCallback((mode: GameMode) => {
    setGameMode(mode);
    setCurrentLevelIndex(0);
    setEndlessLevelCount(0);
    setGameState(GameState.PLAYING);
  }, []);

  const handleLevelComplete = useCallback(() => {
    if (gameMode === GameMode.CLASSIC) {
      if (currentLevelIndex < levels.length - 1) {
        setCurrentLevelIndex(prevIndex => prevIndex + 1);
      } else {
        setGameState(GameState.ALL_LEVELS_COMPLETE);
      }
    } else {
      setEndlessLevelCount(prevCount => prevCount + 1);
      // In endless mode, we just keep incrementing. A "win" screen might not be necessary,
      // or could be shown after a certain number of levels.
    }
  }, [currentLevelIndex, gameMode]);

  const handlePlayAgain = useCallback(() => {
    setGameState(GameState.WELCOME);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.PLAYING:
        if (gameMode === GameMode.CLASSIC) {
          const currentLevel = levels[currentLevelIndex];
          return (
            <GameScreen
              level={currentLevel}
              onWin={handleLevelComplete}
            />
          );
        }
        // else {
        //   return (
        //     <EndlessGameScreen
        //       onWin={handleLevelComplete}
        //       levelCount={endlessLevelCount}
        //     />
        //   );
        // }
      case GameState.ALL_LEVELS_COMPLETE:
        return <AllLevelsCompleteScreen onPlayAgain={handlePlayAgain} />;
      case GameState.WELCOME:
      default:
        return <WelcomeScreen onPlay={handlePlay} />;
    }
  };

  return (
    <div className="w-full h-full overflow-hidden">
      {renderContent()}
    </div>
  );
};

export default App;
