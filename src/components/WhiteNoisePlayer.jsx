// src/components/WhiteNoisePlayer.jsx
import React, { useEffect, useRef } from 'react';

function WhiteNoisePlayer({ type, volume, isPlaying }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && type) {
      import(`../assets/sounds/${type}.mp3`).then(module => {
        audioRef.current.src = module.default;
        audioRef.current.loop = true;
        audioRef.current.volume = volume;
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play().catch(error => console.error('Playback prevented:', error));
        }
      }).catch(error => console.error('Failed to load audio:', error));
    }
  }, [type]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && audioRef.current.src) {
        audioRef.current.play().catch(error => console.error('Playback prevented:', error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return <audio ref={audioRef} />;
}

export default WhiteNoisePlayer;