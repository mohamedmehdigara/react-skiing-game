import React from 'react';
import styled from 'styled-components';

const GameOverContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 36px;
  color: #ff0000;
`;

const GameOver = () => {
  return <GameOverContainer>Game Over</GameOverContainer>;
};

export default GameOver;
