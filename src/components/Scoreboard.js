import React from 'react';
import styled from 'styled-components';

const ScoreContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #000;
`;

const Scoreboard = ({ score }) => {
  return <ScoreContainer>Score: {score}</ScoreContainer>;
};

export default Scoreboard;
