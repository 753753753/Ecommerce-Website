// WelcomeAnimation.jsx
import React, { useEffect } from 'react';
import '../src/App.css';

const WelcomeAnimation = ({ onAnimationEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => onAnimationEnd(), 0); // Adjust timing if needed
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div className="welcome-animation">
      <img
        src="/img/welcome.png" // Replace with the actual image path
        alt="Welcome"
        className="welcome-image"
      />
      <h1 className="welcome-text">Welcome to SnapMarket!</h1>
    </div>
  );
};

export default WelcomeAnimation;
