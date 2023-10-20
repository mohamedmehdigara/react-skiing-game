import React from 'react';

const MultiplayerLobby = ({ players, onJoin, onStart }) => {
  return (
    <div>
      <h3>Multiplayer Lobby</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>
      <button onClick={onJoin}>Join Lobby</button>
      <button onClick={onStart}>Start Game</button>
    </div>
  );
};

export default MultiplayerLobby;
