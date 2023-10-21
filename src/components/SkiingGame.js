import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Skier from './Skier';
import Obstacle from './Obstacle';
import GameOver from './GameOver';
import RestartButton from './RestartButton';
import PauseButton from './PauseButton';
import BackgroundScenery from './BackgroundScenery';
import PowerUp from './PowerUp';
import Scoreboard from './Scoreboard';
import GameSettings from './GameSettings'; // Import the GameSettings component
import HighScoreList from './HighScoreList';
import Achievements from './Achievements';
import MultiplayerLobby from './MultiplayerLobby';
import SkierAvatar from './SkierAvatar';
import WeatherEffects from './WeatherEffects';

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
  const [showSettingsModal, setShowSettingsModal] = useState(false);
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
  const [controlKeys, setControlKeys] = useState(gameSettings.controlKeys);

  // Add PowerUp state
  const [powerUps, setPowerUps] = useState([]);
  const [score, setScore] = useState(0);

  const moveSkier = (direction) => {
    if (!isPaused && !isGameOver) {
      const newX = skierPosition.x + (direction === 'left' ? -10 : 10);
      if (newX >= 0 && newX <= 760) {
        setSkierPosition({ ...skierPosition, x: newX });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === controlKeys.left) {
      moveSkier('left');
    } else if (e.key === controlKeys.right) {
      moveSkier('right');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skierPosition, isPaused, isGameOver, controlKeys]);

  const generateObstacle = () => {
    if (!isPaused && !isGameOver) {
      if (Math.random() < 0.02) {
        const newObstacle = {
          position: {
            x: Math.random() * 800,
            y: 0,
          },
        };
        setObstacles((prevObstacles) => [...prevObstacles, newObstacle]);
      }
    }
  };

  useEffect(() => {
    const obstacleGenerationInterval = setInterval(generateObstacle, 1000);
    return () => clearInterval(obstacleGenerationInterval);
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
  };

  const openSettingsModal = () => {
    setShowSettingsModal(true);
  };

  const saveGameSettings = (newSettings) => {
    setGameSettings(newSettings);
    setControlKeys(newSettings.controlKeys);
  };

  const joinMultiplayerLobby = () => {
    setPlayers([...players, { name: 'PlayerX' }]);
  };

  const startMultiplayerGame = () => {
    setShowMultiplayerLobby(false);
  };

  // Add initial power-up state
  const initialPowerUps = [
    { type: 'speedBoost', position: { x: 200, y: 0 } },
    { type: 'shield', position: { x: 600, y: 0 } },
  ];

  // Initialize power-ups
  useEffect(() => {
    setPowerUps(initialPowerUps);
  }, []);

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
