// src/hooks/useAudioLoader.js
import { useState, useEffect } from 'react';

function useAudioLoader() {
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    async function loadAudioFiles() {
      const audioContext = import.meta.glob('/src/assets/sounds/*.mp3');
      const audioFileNames = Object.keys(audioContext).map(path => {
        const fileName = path.split('/').pop();
        return fileName.substring(0, fileName.lastIndexOf('.'));
      });
      setAudioFiles(audioFileNames);
    }
    loadAudioFiles();
  }, []);

  return audioFiles;
}

export default useAudioLoader;