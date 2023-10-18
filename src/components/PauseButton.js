import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const PauseButton = ({ label, onClick }) => {
  return (
    <Button onClick={onClick}>
      {label}
    </Button>
  );
};

export default PauseButton;
