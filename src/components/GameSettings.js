import React from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

const GameSettings = ({ level, speed, onLevelChange, onSpeedChange }) => {
  return (
    <SettingsContainer>
      <div>
        <label>Level: </label>
        <select value={level} onChange={onLevelChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div>
        <label>Speed: </label>
        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={onSpeedChange}
        />
      </div>
    </SettingsContainer>
  );
};

export default GameSettings;
