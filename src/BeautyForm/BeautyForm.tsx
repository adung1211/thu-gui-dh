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
    avatar: circlePath // For avatar storage
  });

  const [imageSrc, setImageSrc] = useState(null); // Store uploaded image
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // Image crop position
  const [zoom, setZoom] = useState(1); // Zoom level for cropping
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // Final cropped area
  const [croppedAvatar, setCroppedAvatar] = useState(null); // Store the cropped avatar
  const [charCount, setCharCount] = useState(0); // Character count for longText
  const [warning, setWarning] = useState(false); // Warning for reaching limit

  const MAX_CHAR = 500;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is "longText" to handle character limit
    if (name === 'longText') {
      if (value.length > MAX_CHAR) {
        setWarning(true);
        return; // Do not update form data if exceeding limit
      } else {
        setWarning(false);
      }
      setCharCount(value.length); // Update character count
    }

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

  const handleSubmit = async (e) => {
      e.preventDefault();

      const formDataToSend = new FormData();
      formDataToSend.append('ten', formData.ten);
      formDataToSend.append('xungHo', formData.xungHo);
      formDataToSend.append('chucVu', formData.chucVu);
      formDataToSend.append('longText', formData.longText);

      // Convert base64 image to Blob and append to form data
      if (formData.avatar) {
          const response = await fetch(formData.avatar);
          const blob = await response.blob();
          formDataToSend.append('avatar', blob, 'avatar.png');
      }

      // Send form data to the backend and handle the response
      try {
          const res = await fetch('http://localhost:3000/api/endpoint', {
              method: 'POST',
              body: formDataToSend,
          });

          if (!res.ok) {
              throw new Error('Network response was not ok');
          }

          // Get the image as a Blob and create a link for download
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'downloaded_image.png'; // Filename for downloaded image
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url); // Clean up

      } catch (error) {
          console.error('Error:', error);
      }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="beauty-form p-4 col-12 col-sm-13">
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
            <small className="text-muted">{charCount}/{MAX_CHAR} kí tự </small>
            {warning && <div className="text-danger">Tối đa 500 kí tự</div>}
          </div>

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

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">Lưu thiệp về máy</button>
        </form>
      </div>
    </div>
  );
};

export default BeautyForm;
