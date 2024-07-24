import { useState, useEffect } from 'react';

function useImageLoader(category) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadImages() {
      const imageContext = import.meta.glob('/src/assets/images/**/*.{png,jpg,jpeg,gif}');
      const categoryImages = Object.keys(imageContext).filter(path => path.includes(`/${category}/`));
      setImages(categoryImages);
      setCurrentIndex(0);
    }
    loadImages();
  }, [category]);

  function nextImage() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  function previousImage() {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }

  return {
    images,
    currentImage: images[currentIndex],
    nextImage,
    previousImage,
  };
}

export default useImageLoader;