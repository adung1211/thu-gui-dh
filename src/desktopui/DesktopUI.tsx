import topleftPath from '../assets/topleft.png'
import toprightPath from '../assets/topright.png'
import bottomleftPath from '../assets/bottomleft.png'
import bottomrightPath from '../assets/bottomright.png'
import bottomlinePath from '../assets/bottomline.png'
import thuguiPath from '../assets/thugui.png'
import chaomungPath from '../assets/chaomung.png'
import circlePath from '../assets/circle.png'

import BeautyForm from '../BeautyForm/BeautyForm'
import { useState } from 'react';

const DesktopUI = () => {
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

    const formatTextWithIndentation = (text) => {
        const indentation = '    '; // Four spaces for indentation
        return text.split('\n').map((line, index) => {
        return line.length > 0 ? indentation + line : line; // Add indentation to non-empty lines
        }).join('\n');
    };
    return (
    <>
    <BeautyForm onFormDataChange={handleFormDataChange}/>

    <div className='main-wrap'>
        <div className="main-container">
            <div className='row0'>
                <img src={topleftPath} style={{width: '120%'}}></img>
                <img src={thuguiPath} style={{width: '60%', alignSelf: 'end'}}></img>
                <img src={chaomungPath} style={{width: '120%', justifySelf: 'end', alignSelf:'end'}}></img>
                <img src={toprightPath} style={{width: '120%', justifySelf: 'end'}}></img>
            </div>
            <div className='row1'>
                <img src={formData.avatar} className="cropped-avatar" style={{borderRadius: '50%', width: '50%', alignSelf: 'center', justifySelf: 'center', border: "5px solid #1973E8", marginTop: "30px"}}></img>

                <div className='custom-text-box' style={{alignSelf: 'end'}}>
                    <p className='textstyle1' style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
                        {formatTextWithIndentation(formData.longText)}
                    </p>

                    <div className='textbox2-con'>
                        <div className='textbox2'>
                            <p className='textstyle2'>
                            {formData.xungHo} <span className='textstyle3'>{formData.ten}</span>
                            </p>
                            <p className='textstyle2' style={{marginTop: "-15px"}}>
                                {formData.chucVu}   
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='m-row2'>
                <img src={bottomleftPath}  style={{width: '30%', position: 'absolute', bottom: '0'}}></img>
                <img src={bottomrightPath}  style={{width: '30%', position: 'absolute', bottom: '0', right: '0'}}></img>
                <img src={bottomlinePath}  style={{width: '100%', position: 'absolute', bottom: '0'}}></img>
            </div>
        </div>
    </div>
    </>
);
}; export default DesktopUI;