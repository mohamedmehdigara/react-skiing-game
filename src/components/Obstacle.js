import React from 'react';
import styled, { keyframes } from 'styled-components';

const fallAnimation = keyframes`
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
  animation: ${fallAnimation} 3s linear infinite; /* Use fall animation */
`;

const Obstacle = ({ position }) => {
  return (
    <ObstacleContainer position={position}>
      {/* You can customize the appearance of your falling obstacle here */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#ff0000', // Customize the color
          borderRadius: '50%', // Make it a circle, or use another shape
        }}
      ></div>
    </ObstacleContainer>
  );
};

export default Obstacle;
