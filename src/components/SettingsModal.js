import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
`;

const SettingsModal = ({ onClose, onSave, settings }) => {
  const [updatedSettings, setUpdatedSettings] = useState(settings);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSettings({ ...updatedSettings, [name]: value });
  };

  const handleSave = () => {
    onSave(updatedSettings);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Game Settings</h2>
        <div>
          <label htmlFor="soundVolume">Sound Volume:</label>
          <input
            type="range"
            id="soundVolume"
            name="soundVolume"
            min="0"
            max="100"
            value={updatedSettings.soundVolume}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="controlKeys">Control Keys:</label>
          <select
            id="controlKeys"
            name="controlKeys"
            value={updatedSettings.controlKeys}
            onChange={handleInputChange}
          >
            <option value="arrows">Arrow Keys</option>
            <option value="wasd">WASD</option>
          </select>
        </div>
        <div>
          <label htmlFor="showHints">Show Hints:</label>
          <input
            type="checkbox"
            id="showHints"
            name="showHints"
            checked={updatedSettings.showHints}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SettingsModal;
