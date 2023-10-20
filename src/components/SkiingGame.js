import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Skier from './Skier';
import Obstacle from './Obstacle';
import GameOver from './GameOver'; // Import the GameOver component
import RestartButton from './RestartButton'; // Import the RestartButton component
import PauseButton from './PauseButton'; // Import the PauseButton component

const GameContainer = styled.div`
  position: relative;
  width: 800px;
  height: 400px;
  background-color: #f0f0f0;
  overflow: hidden;
`;

const SkiingGame = () => {
  // State variables for the game
  const [skierPosition, setSkierPosition] = useState({ x: 400, y: 200 });
  const [obstacles, setObstacles] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const moveSkier = (direction) => {
    if (!isPaused && !isGameOver) {
      // Adjust skier position based on direction (left or right)
      const newX = skierPosition.x + (direction === 'left' ? -10 : 10);
      if (newX >= 0 && newX <= 760) {
        setSkierPosition({ ...skierPosition, x: newX });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      moveSkier('left');
    } else if (e.key === 'ArrowRight') {
      moveSkier('right');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skierPosition, isPaused, isGameOver]);

  useEffect(() => {
    // Implement game logic here:
    // - Generate obstacles
    // - Check for collisions
    // - Update the score
    // - Handle game over conditions
  }, [skierPosition, obstacles]);

  const pauseGame = () => {
    setIsPaused(true);
  };

  const restartGame = () => {
    setIsGameOver(false);
    setIsPaused(false);
    setSkierPosition({ x: 400, y: 200 });
    setObstacles([]);
  };

  return (
    <GameContainer>
      {/* Components for the game interface */}
      <Skier position={skierPosition} />
      {obstacles.map((obstacle, index) => (
        <Obstacle key={index} position={obstacle.position} />
      ))}
      {isGameOver && <GameOver />} {/* Display GameOver component when the game is over */}
      {!isPaused && isGameOver ? <RestartButton onClick={restartGame} /> : null} {/* Display RestartButton when not paused and the game is over */}
      {isPaused && !isGameOver ? <PauseButton label="Pause" onClick={pauseGame} /> : null} {/* Display PauseButton when paused and not game over */}
    </GameContainer>
  );
};

export default SkiingGame;
