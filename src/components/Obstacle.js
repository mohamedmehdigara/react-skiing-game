import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the fallAnimation keyframe
const fallAnimation = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

// Define the rotationAnimation keyframe for a rotating effect (optional)
const rotationAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ObstacleContainer = styled.div`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  animation: ${fallAnimation} ${(props) => props.fallDuration}s linear infinite; /* Use fall animation */
  /* Uncomment the line below to add a rotating effect */
   animation: ${fallAnimation} ${(props) => props.fallDuration}s linear infinite, ${rotationAnimation} 2s linear infinite; */
`;

const Obstacle = ({ position, size = 30, fallDuration = 3, color = '#ff0000', shape = 'circle' }) => {
  return (
    <ObstacleContainer position={position} size={size} fallDuration={fallDuration}>
      {/* You can customize the appearance of your falling obstacle here */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: color,
          borderRadius: shape === 'circle' ? '50%' : '0%', // Make it a circle or square, or use another shape
        }}
      ></div>
    </ObstacleContainer>
  );
};

export default Obstacle;
