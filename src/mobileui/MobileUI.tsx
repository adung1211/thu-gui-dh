import bottomleftPath from '../assets/bottomleft.png'
import bottomrightPath from '../assets/bottomright.png'
import topleftPath from '../assets/topleft.png'
import toprightPath from '../assets/topright.png'
import bottomlinePath from '../assets/bottomline.png'
// import thuguiPath from '../assets/thugui.png'  

const MobileUI = () => (
    <div className='main-wrap'>
        <div className="main-container">
            <img src={topleftPath} className='topleft-image'></img>
            <img src={toprightPath} className='topright-image'></img>
            <img src={bottomleftPath} className='bottomleft-image'></img>
            <img src={bottomrightPath} className='bottomright-image'></img>
            <img src={bottomlinePath} className='bottomline-image'></img>
            <img src={bottomlinePath} className='bottomline-image'></img>
        </div>
    </div>
);

export default MobileUI;