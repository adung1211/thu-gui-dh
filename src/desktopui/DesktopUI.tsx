import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import topleftPath from '../assets/topleft.png';
import toprightPath from '../assets/topright.png';
import bottomleftPath from '../assets/bottomleft.png';
import bottomrightPath from '../assets/bottomright.png';
import bottomlinePath from '../assets/bottomline.png';
import thuguiPath from '../assets/thugui.png';
import chaomungPath from '../assets/chaomung.png';
import circlePath from '../assets/circle.png';
import BeautyForm from '../BeautyForm/BeautyForm';

const DesktopUI = () => {
    const [formData, setFormData] = useState({
        ten: 'Nguyễn Văn A',
        xungHo: 'Anh',
        chucVu: 'Chức vụ',
        longText: 'Chúc đại hội thành công tốt đẹp',
        avatar: circlePath
    });

    const [showModal, setShowModal] = useState(false);
    const [charCount, setCharCount] = useState(0); // Character count for longText
    const [warning, setWarning] = useState(false); // Warning for reaching limit
  
    const MAX_CHAR = 500;

    const handleFormDataChange = (data) => {
        setFormData(data);
    };

    // New handleChange function to update formData
    const handleChange = (e) => {
        const { name, value } = e.target; // Get name and value from the event target
        if (name === 'longText') {
            if (value.length > MAX_CHAR) {
              setWarning(true);
              return; // Do not update form data if exceeding limit
            } else {
              setWarning(false);
            }
            setCharCount(value.length); // Update character count
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value // Update the specific field in formData
        }));
        handleFormDataChange({
            ...formData,
            [name]: value // Update the form data and notify parent
        });
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
        <>
            {/* React-Bootstrap Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Tải Avatar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BeautyForm onFormDataChange={handleFormDataChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
            <div className='main-wrap'>
                <div className="main-container">
                    <div className='row0'>
                        <img src={topleftPath} style={{width: '120%'}} alt="Top left" />
                        <img src={thuguiPath} style={{width: '60%', alignSelf: 'end'}} alt="Thu gui" />
                        <img src={chaomungPath} style={{width: '120%', justifySelf: 'end', alignSelf: 'end'}} alt="Chao mung" />
                        <img src={toprightPath} style={{width: '120%', justifySelf: 'end'}} alt="Top right" />
                    </div>
                    <div className='row1'>
                        <img 
                            src={formData.avatar} 
                            className="cropped-avatar avatar-hover" 
                            style={{borderRadius: '50%', width: '50%', alignSelf: 'center', justifySelf: 'center', border: "5px solid #1973E8", marginTop: "30px"}} 
                            alt="Avatar"
                            onClick={() => setShowModal(true)}
                        />
                        <div className='custom-text-box' style={{alignSelf: 'end'}}>
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
              rows={6}
              value={formData.longText}
              onChange={handleChange}
              placeholder="Nhập nội dung dài"
              required
              style={{resize: "none"}}
            />
            <small className="text-muted">{charCount}/{MAX_CHAR} kí tự </small>
            {warning && <div className="text-danger">Tối đa 500 kí tự</div>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">Lưu thiệp về máy</button>
                        </form>
                            
                        </div>
                    </div>
                    <div className='row2'>
                        <img src={bottomleftPath} style={{width: '30%', position: 'absolute', bottom: '0'}} alt="Bottom left" />
                        <img src={bottomrightPath} style={{width: '30%', position: 'absolute', bottom: '0', right: '0'}} alt="Bottom right" />
                        <img src={bottomlinePath} style={{width: '100%', position: 'absolute', bottom: '0'}} alt="Bottom line" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DesktopUI;
