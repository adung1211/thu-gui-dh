import React, { useState, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import circlePath from '../assets/circle.png';
import { getCroppedImg } from './utils';

const BeautyForm = ({ formData, onFormDataChange }) => {
  const [localFormData, setLocalFormData] = useState(formData);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    setLocalFormData(formData); // Sync localFormData with parent formData
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...localFormData, [name]: value };
    setLocalFormData(updatedFormData);
    onFormDataChange(updatedFormData);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    const updatedFormData = { ...localFormData, avatar: croppedImage };
    setLocalFormData(updatedFormData);
    onFormDataChange(updatedFormData);
  };

  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Tải ảnh đại diện</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="form-control" />
        {imageSrc && (
          <div className="image-container mt-3">
            <div style={{ position: 'relative', width: '310px', height: '310px' }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default BeautyForm;
