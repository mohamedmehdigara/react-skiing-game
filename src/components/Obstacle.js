import React from 'react';
import styled, { keyframes } from 'styled-components';

const obstacleAnimation = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const ObstacleContainer = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  animation: ${obstacleAnimation} 3s linear infinite;
`;

const ObstacleSvg = () => (
  <svg
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
  >
    {/* Obstacle shape (e.g., a tree) */}
    <rect x="40" y="20" width="20" height="40" fill="#ff0000" />
  </svg>
);

const Obstacle = ({ position }) => {
  return (
    <ObstacleContainer position={position}>
      <ObstacleSvg />
    </ObstacleContainer>
  );
};

export default Obstacle;
