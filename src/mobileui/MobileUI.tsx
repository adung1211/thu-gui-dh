import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import bottomleftPath from '../assets/bottomleft.png';
import bottomrightPath from '../assets/bottomright.png';
import topleftPath from '../assets/topleft.png';
import toprightPath from '../assets/topright.png';
import bottomlinePath from '../assets/bottomline.png';
import thuguiPath from '../assets/thugui.png';
import chaomungPath from '../assets/chaomung.png';
import circlePath from '../assets/circle.png';
import BeautyForm from '../BeautyForm/BeautyForm';

import { API_ENDPOINT } from '../config';

const MobileUI = () => {
  const [formData, setFormData] = useState({
    ten: 'Nguyễn Văn A',
    xungHo: 'Anh',
    chucVu: 'Chức vụ',
    longText: 'Chúc đại hội thành công tốt đẹp',
    avatar: circlePath,
  });

  const [showModal, setShowModal] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [warning, setWarning] = useState(false);

  const MAX_CHAR = 500;

  const handleFormDataChange = (updatedData) => setFormData(updatedData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'longText') {
      setWarning(value.length > MAX_CHAR);
      setCharCount(value.length);
      if (value.length > MAX_CHAR) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    handleFormDataChange({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('ten', formData.ten);
    formDataToSend.append('xungHo', formData.xungHo);
    formDataToSend.append('chucVu', formData.chucVu);
    formDataToSend.append('longText', formData.longText);

    if (formData.avatar) {
      const response = await fetch(formData.avatar);
      const blob = await response.blob();
      formDataToSend.append('avatar', blob, 'avatar.png');
    }

    try {
      const res = await fetch(API_ENDPOINT, { method: 'POST', body: formDataToSend });
      if (!res.ok) throw new Error('Network response was not ok');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded_image.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Tải Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BeautyForm onFormDataChange={handleFormDataChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='main-wrap'>
        <div className='m-main-container'>
          <div className='m-row'>
            <img src={topleftPath} style={{ width: '50%' }} alt="Top Left" />
            <img src={chaomungPath} style={{ width: '200%', justifySelf: 'center' }} alt="Welcome" />
            <img src={toprightPath} style={{ width: '50%', justifySelf: 'end' }} alt="Top Right" />
          </div>

          <img
            src={formData.avatar}
            className="cropped-avatar avatar-hover"
            style={{
              borderRadius: '50%',
              width: '50%',
              alignSelf: 'center',
              justifySelf: 'center',
              border: '5px solid #1973E8',
              marginTop: '30px',
            }}
            alt="Avatar"
            onClick={() => setShowModal(true)}
          />

          <img src={thuguiPath} style={{ width: '30%', justifySelf: 'start', alignSelf: 'end', paddingLeft: '20px' }} alt="Message" />

          <div className='m-custom-text-box'>
            <form onSubmit={handleSubmit}>
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

              <div className="mb-3">
                <label htmlFor="longText" className="form-label">Nội dung</label>
                <textarea
                  className="form-control"
                  id="longText"
                  name="longText"
                  rows={6}
                  value={formData.longText}
                  onChange={handleChange}
                  placeholder="Nhập nội dung dài"
                  required
                  style={{ resize: 'none' }}
                />
                <small className="text-muted">{charCount}/{MAX_CHAR} kí tự</small>
                {warning && <div className="text-danger">Tối đa 500 kí tự</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100">Lưu thiệp về máy</button>
            </form>
          </div>

          <div className='row2'>
            <img src={bottomleftPath} style={{ width: '45%', position: 'absolute', bottom: '0' }} alt="Bottom Left" />
            <img src={bottomrightPath} style={{ width: '45%', position: 'absolute', bottom: '0', right: '0' }} alt="Bottom Right" />
            <img src={bottomlinePath} style={{ width: '100%', position: 'absolute', bottom: '0' }} alt="Bottom Line" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileUI;
