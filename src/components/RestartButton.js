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

const RestartButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      Restart
    </Button>
  );
};

export default RestartButton;
