import React from 'react';
import styled from 'styled-components';

const ObstacleContainer = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #ff0000;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const Obstacle = ({ position }) => {
  return <ObstacleContainer position={position}></ObstacleContainer>;
};

export default Obstacle;
