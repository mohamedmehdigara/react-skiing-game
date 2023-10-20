import React from 'react';

const Achievements = ({ achievements }) => {
  return (
    <div>
      <h3>Achievements</h3>
      <ul>
        {achievements.map((achievement, index) => (
          <li key={index}>{achievement.name} - {achievement.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
