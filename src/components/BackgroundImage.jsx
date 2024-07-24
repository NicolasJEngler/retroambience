import React from 'react';

function BackgroundImage({ image }) {
  return (
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${image})` }}
    />
  );
}

export default BackgroundImage;