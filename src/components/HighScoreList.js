import React from 'react';
import styled from 'styled-components';

const HighScoreListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HighScoreList = ({ scores }) => {
  return (
    <HighScoreListContainer>
      <h2>High Scores</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>{score.name}: {score.score}</li>
        ))}
      </ul>
    </HighScoreListContainer>
  );
};

export default HighScoreList;
