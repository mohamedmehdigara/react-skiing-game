import React, { useState } from 'react';

const Achievements = ({ achievements }) => {
  const [expandedAchievement, setExpandedAchievement] = useState(null);

  const toggleAchievementDetails = (index) => {
    setExpandedAchievement((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <h3>Achievements</h3>
      <ul>
        {achievements.map((achievement, index) => (
          <li key={index} onClick={() => toggleAchievementDetails(index)}>
            <strong>{achievement.name}</strong>
            {expandedAchievement === index && (
              <div>
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
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
