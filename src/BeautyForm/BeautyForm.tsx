import React, { useState } from 'react';
import './BeautyForm.css';  // Import a CSS file for custom styles
import Draggable from 'react-draggable';  // Import react-draggable
import Cropper from 'react-easy-crop';
import circlePath from '../assets/circle.png'
import { getCroppedImg } from './utils';  // Utility function for cropping image

const BeautyForm = ({ onFormDataChange }) => {
  const [formData, setFormData] = useState({
    ten: 'Nguyễn Văn A',
    xungHo: 'Anh',
    chucVu: 'Chức vụ',
    longText: 'Chúc đại hội thành công tốt đẹp',
    avatar: circlePath
});

  const [imageSrc, setImageSrc] = useState(null); // Store uploaded image
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // Image crop position
  const [zoom, setZoom] = useState(1); // Zoom level for cropping
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // Final cropped area
  const [croppedAvatar, setCroppedAvatar] = useState(null); // Store the cropped avatar

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is "longText" to handle character limit
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);
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
    setFormData((prevData) => ({
      ...prevData,
      avatar: croppedImage
    }));
    setCroppedAvatar(croppedImage); // Set the cropped avatar to display
    onFormDataChange({ ...formData, avatar: croppedImage });
  };


  return (
    <form>
      {/* Avatar Upload */}
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
                cropShape="round"  // Circular crop
                showGrid={false}   // No grid
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
