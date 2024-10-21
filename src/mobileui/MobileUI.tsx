import bottomleftPath from '../assets/bottomleft.png'
import bottomrightPath from '../assets/bottomright.png'
import topleftPath from '../assets/topleft.png'
import toprightPath from '../assets/topright.png'
import bottomlinePath from '../assets/bottomline.png'
import thuguiPath from '../assets/thugui.png'  
import chaomungPath from '../assets/chaomung.png'
import circlePath from '../assets/circle.png'

const MobileUI = () => (
    <div className='main-wrap'>
        <div className='m-main-container'>
            <div className='m-row'>
                <img src={topleftPath} style={{width: '50%'}}></img>
                <img src={chaomungPath} style={{width: '200%', justifySelf: 'center'}}></img>
                <img src={toprightPath} style={{width: '50%', justifySelf: 'end'}}></img>
            </div>
            <img src={circlePath} style={{width: '30%', justifySelf: 'center', paddingTop: '10px'}}></img>
            <img src={thuguiPath} style={{width: '30%', justifySelf: 'start', alignSelf: 'end', paddingLeft: '20px'}}></img>
            <div className='m-custom-text-box'></div>
        </div>
    </div>
);

export default MobileUI;