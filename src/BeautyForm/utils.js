export const getCroppedImg = async (imageSrc, crop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const size = Math.min(crop.width, crop.height); // Crop to a square or circle
    canvas.width = size;
    canvas.height = size;
    
    ctx.drawImage(
      image,
      crop.x, crop.y,
      crop.width, crop.height,
      0, 0,
      size, size
    );
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };
  
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = () => resolve(image);
      image.onerror = reject;
    });