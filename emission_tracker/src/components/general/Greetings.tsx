import React, { useState } from 'react';
import '../../theme/general.scss';

const Greetings: React.FC = () => {
  const welcomeTime = ["Good Morning", "Good Afternoon", "Good Evening"];
  const currentDate = new Date();
  const currentTime = currentDate.getHours();
  const firstName = "John"; // Replace with actual first name
  const userType = "Driver"; // Replace with actual user type

  let messageIndex = 0;
  if (currentTime >= 4 && currentTime < 12) {
    messageIndex = 0;
  } else if (currentTime >= 12 && currentTime < 17) {
    messageIndex = 1;
  } else {
    messageIndex = 2;
  }

  const [welcomeMessage] = useState<string>(welcomeTime[messageIndex]);

  return (
    <h1>👋 {welcomeMessage}, {firstName} - {userType} Dashboard</h1>
  );
};

export default Greetings;
