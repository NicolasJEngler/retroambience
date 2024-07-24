import React from 'react';

function Controls({ 
  category, 
  setCategory, 
  whiteNoise, 
  setWhiteNoise, 
  audioFiles,
  overlay, 
  setOverlay, 
  nextImage, 
  previousImage,
  volume,
  setVolume,
  isPlaying,
  setIsPlaying
}) {
  const categories = ['academia', 'neon', 'rooms', 'outdoors', 'windows'];
  const overlayTypes = ['rain', 'dust', 'fireflies', 'snow', 'bubbles', 'leaves'];

  return (
    <div className="rpg-border text-xs w-96">
      <div className="mb-3">
        <label className="block mb-2">Category:</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="rpg-select w-full"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <label className="block mb-1">Image controls:</label>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <button onClick={previousImage} className="rpg-button">Previous</button>
        <button onClick={nextImage} className="rpg-button">Next</button>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div>
          <label className="block mb-1">Overlay:</label>
          <select 
            value={overlay} 
            onChange={(e) => setOverlay(e.target.value)}
            className="rpg-select w-full"
          >
            {overlayTypes.map(effect => (
              <option key={effect} value={effect}>{effect}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Sound:</label>
          <select 
            value={whiteNoise} 
            onChange={(e) => setWhiteNoise(e.target.value)}
            className="rpg-select w-full"
          >
            {audioFiles.map(audio => (
              <option key={audio} value={audio}>{audio}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-2">
        <label className="block mb-1">Volume:</label>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="rpg-range w-full"
        />
      </div>
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="rpg-button w-full"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export default Controls;