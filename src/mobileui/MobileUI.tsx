import bottomleftPath from '../assets/bottomleft.png'
import bottomrightPath from '../assets/bottomright.png'
import topleftPath from '../assets/topleft.png'
import toprightPath from '../assets/topright.png'
import bottomlinePath from '../assets/bottomline.png'
import thuguiPath from '../assets/thugui.png'  
import chaomungPath from '../assets/chaomung.png'
import circlePath from '../assets/circle.png'

import BeautyForm from '../BeautyForm/BeautyForm'
import { useState } from 'react';

const MobileUI = () => {
    const [formData, setFormData] = useState({
        ten: 'Nguyễn Văn A',
        xungHo: 'Anh',
        chucVu: 'Chức vụ',
        longText: 'Chúc đại hội thành công tốt đẹp',
        avatar: circlePath
    });

    const handleFormDataChange = (data) => {
        setFormData(data);
    };
    return (
    <>
    <BeautyForm onFormDataChange={handleFormDataChange}/>
    <div className='main-wrap'>
        <div className='m-main-container'>
            <div className='m-row'>
                <img src={topleftPath} style={{width: '50%'}}></img>
                <img src={chaomungPath} style={{width: '200%', justifySelf: 'center'}}></img>
                <img src={toprightPath} style={{width: '50%', justifySelf: 'end'}}></img>
            </div>
            <img src={formData.avatar} className="cropped-avatar" style={{width: '35%', justifySelf: 'center', marginTop: "10px", borderRadius: '50%', border: "2px solid #1973E8"}}></img>
            <img src={thuguiPath} style={{width: '30%', justifySelf: 'start', alignSelf: 'end', paddingLeft: '20px'}}></img>
            <div className='m-custom-text-box'>
                <p className='m-textstyle1'>
                    {formData.longText}
                </p>

                <div className='m-textbox2-con'>
                    <div className='m-textbox2'>
                        <p className='m-textstyle2' style={{marginBottom: "1px"}}>
                        {formData.xungHo} <b>{formData.ten}</b>
                        </p>
                        <p className='m-textstyle2'>
                            {formData.chucVu}   
                        </p>
                    </div>
                </div>
            </div>
            <div className='m-row2'>
                <img src={bottomleftPath}  style={{width: '45%', position: 'absolute', bottom: '0'}}></img>
                <img src={bottomrightPath}  style={{width: '45%', position: 'absolute', bottom: '0', right: '0'}}></img>
                <img src={bottomlinePath}  style={{width: '100%', position: 'absolute', bottom: '0'}}></img>
            </div>
        </div>
    </div>
    </>
);
}; export default MobileUI;