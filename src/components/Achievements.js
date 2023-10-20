import React from 'react';

const Achievements = ({ achievements }) => {
  return (
    <div>
      <h3>Achievements</h3>
      <ul>
        {achievements.map((achievement, index) => (
          <li key={index}>
            <strong>{achievement.name}</strong>
            <p>{achievement.description}</p>
            {achievement.completed ? (
              <span style={{ color: 'green' }}>Completed</span>
            ) : (
              <span style={{ color: 'red' }}>Incomplete</span>
            )}
            <div>
              Progress: {achievement.progress} / {achievement.goal}
              <progress
                value={achievement.progress}
                max={achievement.goal}
              ></progress>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
