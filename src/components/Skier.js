import React from 'react';
import styled, { keyframes } from 'styled-components';

const skiingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SkierContainer = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  animation: ${skiingAnimation} 1s linear infinite;
`;

const SkierSvg = () => (
  <svg
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
  >
    {/* Skier body */}
    <circle cx="50" cy="35" r="15" fill="#00ff00" />

    {/* Skier legs */}
    <line x1="50" y1="50" x2="40" y2="60" stroke="#00ff00" strokeWidth="2" />
    <line x1="50" y1="50" x2="60" y2="60" stroke="#00ff00" strokeWidth="2" />

    {/* Skier head */}
    <circle cx="50" cy="30" r="5" fill="#f00" />
  </svg>
);

const Skier = ({ position }) => {
  return (
    <SkierContainer position={position}>
      <SkierSvg />
    </SkierContainer>
  );
};

export default Skier;
