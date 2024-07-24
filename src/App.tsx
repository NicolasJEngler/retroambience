// src/App.jsx
import React, { useState, useEffect } from 'react';
import BackgroundImage from './components/BackgroundImage';
import WhiteNoisePlayer from './components/WhiteNoisePlayer';
import OverlayEffect from './components/OverlayEffect';
import Controls from './components/Controls';
import useImageLoader from './hooks/useImageLoader';
import useAudioLoader from './hooks/useAudioLoader';

function App() {
  const [category, setCategory] = useState('academia');
  const [whiteNoise, setWhiteNoise] = useState('');
  const [overlay, setOverlay] = useState('rain');
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { images, currentImage, nextImage, previousImage } = useImageLoader(category);
  const audioFiles = useAudioLoader();

  // Set initial white noise when audio files are loaded
  useEffect(() => {
    if (audioFiles.length > 0 && !whiteNoise) {
      setWhiteNoise(audioFiles[0]);
    }
  }, [audioFiles, whiteNoise]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900">
      <BackgroundImage image={currentImage} />
      <WhiteNoisePlayer type={whiteNoise} volume={volume} isPlaying={isPlaying} />
      <OverlayEffect type={overlay} />
      <div className="absolute bottom-4 left-4 right-4 z-50">
        <Controls 
          category={category}
          setCategory={setCategory}
          whiteNoise={whiteNoise}
          setWhiteNoise={setWhiteNoise}
          audioFiles={audioFiles}
          overlay={overlay}
          setOverlay={setOverlay}
          nextImage={nextImage}
          previousImage={previousImage}
          volume={volume}
          setVolume={setVolume}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </div>
  );
}

export default App;