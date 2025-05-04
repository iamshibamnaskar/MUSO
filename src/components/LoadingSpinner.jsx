
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="music-bars">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <p className="loading-text">Loading music...</p>
    </div>
  );
};

export default LoadingSpinner;
