import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const expand = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Define the explosionAnimation keyframe
const explosionAnimation = keyframes`
  0% {
    /* Define your animation properties here */
  }
  100% {
    /* Define your animation properties here */
  }
`;

const ExplosionAnimation = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
`;

const ExplosionCenter = styled.div`
  width: 100%;
  height: 100%;
  background-color: red; /* Customize the color */
  border-radius: 50%;
  animation: ${expand} 0.5s linear;
`;

const ExplosionLines = styled.div`
  width: 2px; /* Customize the line width */
  height: 100%;
  background-color: orange; /* Customize the color */
  animation: ${rotate} 0.5s linear;
  transform-origin: center;
`;

const AnimationContainer = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  animation: ${explosionAnimation} 0.5s ease forwards; /* Use the explosionAnimation here */
  pointer-events: none; /* Prevent interaction with the animation */
`;

const CollisionAnimation = ({ position, onAnimationEnd }) => {
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    // Listen for the animation end event
    const onAnimationEndListener = () => {
      setAnimationFinished(true);
      onAnimationEnd(); // Execute a callback function when the animation ends
    };

    // Add an event listener for animation end
    AnimationContainer.addEventListener('animationend', onAnimationEndListener);

    // Cleanup the event listener when the component unmounts
    return () => {
      AnimationContainer.removeEventListener('animationend', onAnimationEndListener);
    };
  }, [onAnimationEnd]);

  return (
    <AnimationContainer position={position}>
      <ExplosionAnimation style={{ left: position.x, top: position.y }}>
        <ExplosionCenter />
        <ExplosionLines />
      </ExplosionAnimation>
    </AnimationContainer>
  );
};

export default CollisionAnimation;
