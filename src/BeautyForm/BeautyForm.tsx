import React, { useState } from 'react';
import './BeautyForm.css';  // Import a CSS file for custom styles
import Draggable from 'react-draggable';  // Import react-draggable
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './utils';  // Utility function for cropping image

const BeautyForm = ({ onFormDataChange }) => {
  const [formData, setFormData] = useState({
    ten: '',
    xungHo: '',
    chucVu: '',
    longText: '',
    avatar: '' // For avatar storage
  });

  const [imageSrc, setImageSrc] = useState(null); // Store uploaded image
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // Image crop position
  const [zoom, setZoom] = useState(1); // Zoom level for cropping
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // Final cropped area
  const [croppedAvatar, setCroppedAvatar] = useState(null); // Store the cropped avatar

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveAvatar = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    setFormData((prevData) => ({
      ...prevData,
      avatar: croppedImage
    }));
    setCroppedAvatar(croppedImage); // Set the cropped avatar to display
    onFormDataChange({ ...formData, avatar: croppedImage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Handle the form data (e.g., send to backend)
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="beauty-form p-4">
        <h2 className="mb-4 text-center">Nhập nội dung</h2>
        <form onSubmit={handleSubmit}>
          {/* Tên */}
          <div className="mb-3">
            <label htmlFor="ten" className="form-label">Tên</label>
            <input
              type="text"
              className="form-control"
              id="ten"
              name="ten"
              value={formData.ten}
              onChange={handleChange}
              placeholder="Nhập tên của bạn"
              required
            />
          </div>

          {/* Giới tính */}
          <div className="mb-3">
            <label className="form-label">Xưng hô</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="xungHo"
                  id="anh"
                  value="Anh"
                  checked={formData.xungHo === 'Anh'}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="anh">Anh</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="xungHo"
                  id="chi"
                  value="Chị"
                  checked={formData.xungHo === 'Chị'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="chi">Chị</label>
              </div>
            </div>
          </div>

          {/* Chức vụ */}
          <div className="mb-3">
            <label htmlFor="chucVu" className="form-label">Chức vụ</label>
            <input
              type="text"
              className="form-control"
              id="chucVu"
              name="chucVu"
              value={formData.chucVu}
              onChange={handleChange}
              placeholder="Nhập chức vụ của bạn"
              required
            />
          </div>

          {/* Long Text */}
          <div className="mb-3">
            <label htmlFor="longText" className="form-label">Nội dung</label>
            <textarea
              className="form-control"
              id="longText"
              name="longText"
              rows={4}
              value={formData.longText}
              onChange={handleChange}
              placeholder="Nhập nội dung dài"
              required
            />
          </div>

          {/* Avatar Upload */}
          <div className="mb-3">
            <label className="form-label">Tải ảnh đại diện</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="form-control" />
            {imageSrc && (
              <div className="image-container mt-3">
                <div style={{ position: 'relative', width: '300px', height: '300px' }}>
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
                <button type="button" className="btn btn-secondary mt-3" onClick={handleSaveAvatar}>
                  Lưu ảnh đại diện
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">Gửi</button>
        </form>
      </div>
    </div>
  );
};

export default BeautyForm;
