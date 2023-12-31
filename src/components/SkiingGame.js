import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Skier from './Skier';
import Obstacle from './Obstacle';
import GameOver from './GameOver';
import RestartButton from './RestartButton';
import PauseButton from './PauseButton';
import PowerUp from './PowerUp';
import Scoreboard from './Scoreboard';
import GameSettings from './GameSettings'; // Import the missing components
import HighScoreList from './HighScoreList';
import Achievements from './Achievements';
import MultiplayerLobby from './MultiplayerLobby';
import SkierAvatar from './SkierAvatar';
import WeatherEffects from './WeatherEffects';
import CollisionAnimation from './CollisionAnimation';
import BackgroundScenery from './BackgroundScenery'; // Import the missing component

const GameContainer = styled.div`
  position: relative;
  width: 800px;
  height: 400px;
  background-color: #f0f0f0;
  overflow: hidden;
`;

const SkiingGame = () => {
  const [skierPosition, setSkierPosition] = useState({ x: 400, y: 200 });
  const [obstacles, setObstacles] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    level: 'medium',
    speed: 5,
    soundVolume: 50,
    controlKeys: 'arrows',
    showHints: true,
  });
  const [highScores, setHighScores] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [weather, setWeather] = useState('sunny');
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [players, setPlayers] = useState([]);
  const [showMultiplayerLobby, setShowMultiplayerLobby] = useState(false);
  const [playerAvatar, setPlayerAvatar] = useState({
    avatar: 'default',
    outfit: 'basic',
    accessories: [],
  });

  // Add PowerUp state
  const [powerUps, setPowerUps] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const moveSkier = (direction) => {
    if (!isPaused && !isGameOver) {
      const { x, y } = skierPosition;
      let newX = x;
      let newY = y;

      if (direction === 'left') {
        newX = x - 10;
      } else if (direction === 'right') {
        newX = x + 10;
      } else if (direction === 'up') {
        newY = y - 10;
      } else if (direction === 'down') {
        newY = y + 10;
      }

      // Ensure the skier stays within bounds
      newX = Math.max(0, Math.min(760, newX));
      newY = Math.max(0, Math.min(360, newY));

      setSkierPosition({ x: newX, y: newY });
    }
  };

  const handleCollision = () => {
    if (lives > 1) {
      setLives(lives - 1);
    } else {
      setIsGameOver(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'Left') {
      moveSkier('left');
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
      moveSkier('right');
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
      moveSkier('up');
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
      moveSkier('down');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skierPosition, isPaused, isGameOver]);

 useEffect(() => {
  const updateObstacles = () => {
    if (!isPaused && !isGameOver) {
      const updatedObstacles = obstacles.map((obstacle) => {
        if (obstacle.position) {
          const newY = obstacle.position.y + gameSettings.speed;
          // Check if the obstacle is still within the visible area
          if (newY <= 400) {
            return {
              ...obstacle,
              position: {
                x: obstacle.position.x,
                y: newY,
              },
            };
          }
          // Obstacle has reached the end of the screen, don't include it in the updated obstacles
          return null;
        }
        return obstacle; // Return the obstacle as is if 'position' is undefined
      });

      // Remove obstacles that have fallen off the screen
      const filteredObstacles = updatedObstacles.filter((obstacle) => obstacle !== null);

      // Generate new obstacles
      if (Math.random() < 0.1) {
        const newObstacle = {
          position: {
            x: Math.random() * 800,
            y: 0,
          },
        };
        filteredObstacles.push(newObstacle);
      }

      setObstacles(filteredObstacles);

      updatedObstacles.forEach((obstacle) => {
        if (obstacle && checkCollision(skierPosition, obstacle.position)) {
          handleCollision();
        }
      });
    }
  };

  const obstacleInterval = setInterval(updateObstacles, 100);

  return () => {
    clearInterval(obstacleInterval);
  };
}, [isPaused, isGameOver]);

  const gameLoop = () => {
    if (!isPaused && !isGameOver) {
      setSkierPosition((prevPosition) => ({
        ...prevPosition,
        y: prevPosition.y + 1,
      }));
    }

    requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    requestAnimationFrame(gameLoop);
  }, []);

  const pauseGame = () => {
    setIsPaused(true);
  };

  const restartGame = () => {
    setIsGameOver(false);
    setIsPaused(false);
    setSkierPosition({ x: 400, y: 200 });
    setObstacles([]);
    setScore(0);
    setLives(3);
  };

  const checkCollision = (skier, obstacle) => {
    return (
      skier.x < obstacle.position.x + 40 &&
      skier.x + 40 > obstacle.position.x &&
      skier.y < obstacle.position.y + 40 &&
      skier.y + 40 > obstacle.position.y
    );
  };

  // ...

const saveGameSettings = (newSettings) => {
  // Assuming newSettings is an object with properties like 'level', 'speed', etc.
  // Update the game settings with the new values
  setGameSettings({
    ...gameSettings, // Preserve existing settings
    ...newSettings,  // Override with new settings
  });
};

const joinMultiplayerLobby = () => {
  // Implement the logic for joining the multiplayer lobby
  // This may involve setting some state to indicate that the player is in the lobby
  // and possibly connecting to a multiplayer server.
  // For example:
  setShowMultiplayerLobby(true); // Show the multiplayer lobby component
};

const startMultiplayerGame = () => {
  // Implement the logic for starting a multiplayer game
  // This may involve transitioning from the lobby to the game itself
  // and setting up connections or game state for multiplayer gameplay.
  // For example:
  setShowMultiplayerLobby(false); // Hide the multiplayer lobby component
  // Implement further logic to start the multiplayer game
};

// ...


  return (
    <GameContainer>
      <BackgroundScenery weather={weather} timeOfDay={timeOfDay} />
      <PowerUp powerUps={powerUps} />
      {isGameOver && <GameOver />}
      {!isPaused && isGameOver ? <RestartButton onClick={restartGame} /> : null}
      {isPaused && !isGameOver ? (
        <PauseButton label="Pause" onClick={pauseGame} />
      ) : null}
      {skierPosition && (
        <Skier position={skierPosition} />
      )}
      {obstacles.map((obstacle, index) => (
        <Obstacle key={index} position={obstacle.position} />
      ))}
      
      {lives < 3 && (
        <CollisionAnimation position={skierPosition} onAnimationEnd={handleCollision} />
      )}
      <Scoreboard score={score} />
      <GameSettings
        level={gameSettings.level}
        speed={gameSettings.speed}
        onLevelChange={(e) =>
          setGameSettings({ ...gameSettings, level: e.target.value })
        }
        onSpeedChange={(e) =>
          setGameSettings({ ...gameSettings, speed: e.target.value })
        }
        onControlKeysChange={(e) =>
          saveGameSettings({ ...gameSettings, controlKeys: e.target.value })
        }
      />
      <HighScoreList scores={highScores} />
      <Achievements achievements={achievements} />
      <WeatherEffects weather={weather} timeOfDay={timeOfDay} />
      {showMultiplayerLobby && (
        <MultiplayerLobby
          players={players}
          onJoin={joinMultiplayerLobby}
          onStart={startMultiplayerGame}
        />
      )}
      <SkierAvatar
        avatar={playerAvatar.avatar}
        outfit={playerAvatar.outfit}
        accessories={playerAvatar.accessories}
      />
    </GameContainer>
  );
};

export default SkiingGame;
