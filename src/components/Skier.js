import React from 'react';
import styled from 'styled-components';

const SkierContainer = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #00ff00;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const Skier = ({ position }) => {
  return <SkierContainer position={position}></SkierContainer>;
};

export default Skier;
