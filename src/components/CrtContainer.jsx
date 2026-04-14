import React from 'react';

const CrtContainer = ({ children }) => {
  return (
    <div className="crt-container">
      <div className="crt-overlay" />
      {children}
    </div>
  );
};

export default CrtContainer;
