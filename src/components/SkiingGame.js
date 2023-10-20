import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Skier from './Skier';
import Obstacle from './Obstacle';
import Scoreboard from './Scoreboard';
import GameOver from './GameOver';
import PauseButton from './PauseButton';
import RestartButton from './RestartButton';
import GameSettings from './GameSettings';
import HighScoreList from './HighScoreList';
import SettingsModal from './SettingsModal';
import Achievements from './Achievements';
import WeatherEffects from './WeatherEffects';
import MultiplayerLobby from './MultiplayerLobby';
import SkierAvatar from './SkierAvatar';


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
  const [score, setScore] = useState(0);
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
  const [achievements, setAchievements] = useState([]); // Populate achievements data
  const [weather, setWeather] = useState('sunny'); // Weather condition
  const [timeOfDay, setTimeOfDay] = useState('day'); // Time of day
  const [players, setPlayers] = useState([]); // For multiplayer lobby
  const [showMultiplayerLobby, setShowMultiplayerLobby] = useState(false);
  const [playerAvatar, setPlayerAvatar] = useState({
    avatar: 'default',
    outfit: 'basic',
    accessories: [],
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPaused && !isGameOver) {
        // Handle player controls to move the skier left or right.
        if (e.key === 'ArrowLeft' && skierPosition.x > 0) {
          setSkierPosition((prevPosition) => ({
            ...prevPosition,
            x: prevPosition.x - 10,
          }));
        } else if (e.key === 'ArrowRight' && skierPosition.x < 760) {
          setSkierPosition((prevPosition) => ({
            ...prevPosition,
            x: prevPosition.x + 10,
          }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skierPosition, isPaused, isGameOver]);

  // Game logic, obstacle generation, collision detection, etc.
  // Update skierPosition, obstacles, score, isGameOver, and isPaused as the game progresses.

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
  };

  const joinMultiplayerLobby = () => {
    // Logic to join a multiplayer lobby.
    setPlayers([...players, { name: 'PlayerX' }]); // Add the joining player.
  };

  const startMultiplayerGame = () => {
    // Logic to start a multiplayer game.
    setShowMultiplayerLobby(false);
    // Add logic to synchronize gameplay with other players.
  };

  return (
    <GameContainer>
      {isGameOver ? <GameOver /> : null}
      {isPaused && !isGameOver ? <PauseButton label="Pause" onClick={pauseGame} /> : null}
      {!isPaused && isGameOver ? <RestartButton onClick={restartGame} /> : null}
      {showSettingsModal && (
        <SettingsModal
          onClose={() => setShowSettingsModal(false)}
          onSave={saveGameSettings}
          settings={gameSettings}
        />
      )}
      <Skier position={skierPosition} />
      {obstacles.map((obstacle, index) => (
        <Obstacle key={index} position={obstacle.position} />
      ))}
      <Scoreboard score={score} />
      <GameSettings
        level={gameSettings.level}
        speed={gameSettings.speed}
        onLevelChange={(e) => setGameSettings({ ...gameSettings, level: e.target.value })}
        onSpeedChange={(e) => setGameSettings({ ...gameSettings, speed: e.target.value })}
      />
      <HighScoreList scores={highScores} />
      <button onClick={openSettingsModal}>Settings</button>
      <Achievements achievements={achievements} />
      <WeatherEffects weather={weather} timeOfDay={timeOfDay} />
      {showMultiplayerLobby && (
        <MultiplayerLobby
          players={players}
          onJoin={joinMultiplayerLobby}
          onStart={startMultiplayerGame}
        />
      )}
      <SkierAvatar avatar={playerAvatar.avatar} outfit={playerAvatar.outfit} accessories={playerAvatar.accessories} />
    </GameContainer>
  );
};

export default SkiingGame;