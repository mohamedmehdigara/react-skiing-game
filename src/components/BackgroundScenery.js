import React from 'react';
import styled from 'styled-components';

const SceneryContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.skyTopColor || '#87CEEB'},
    ${({ theme }) => theme.skyBottomColor || '#1E90FF'}
  );

  .mountain {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: ${({ theme }) => theme.mountainColor || '#a9a9a9'};
    clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
  }
`;

const BackgroundScenery = ({ weather, timeOfDay }) => {
  return (
    <SceneryContainer>
      {weather === 'snowy' && <Snowfall />}
      {timeOfDay === 'night' && <Stars />}
      <Mountain />
    </SceneryContainer>
  );
};

const Snowfall = () => {
  // Implement snowfall animation or effects
  return <div className="snowfall"></div>;
};

const Stars = () => {
  // Implement a starry night effect
  return <div className="stars"></div>;
};

const Mountain = () => {
  // Implement a dynamic mountain range based on the time of day
  return <div className="mountain"></div>;
};

export default BackgroundScenery;
