import React from 'react';
import styled from 'styled-components';

const PowerUpContainer = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #ff9900;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const PowerUp = ({ position }) => {
  return <PowerUpContainer position={position}></PowerUpContainer>;
};

export default PowerUp;
