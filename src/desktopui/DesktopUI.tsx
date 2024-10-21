import topleftPath from '../assets/topleft.png'
import toprightPath from '../assets/topright.png'
import bottomleftPath from '../assets/bottomleft.png'
import bottomrightPath from '../assets/bottomright.png'
import bottomlinePath from '../assets/bottomline.png'
import thuguiPath from '../assets/thugui.png'
import chaomungPath from '../assets/chaomung.png'

const DesktopUI = () => (
    <div className='main-wrap'>
        <div className="main-container">
            <div className='row'>
                <img src={topleftPath} className='topleft-image'></img>
                <img src={thuguiPath} className='thugui'></img>
                <img src={toprightPath} className='topright-image'></img>
                <img src={chaomungPath} className='chaomung'></img>
            </div>
            <div className='row'>
               
            </div>
            <div className='row'>
                <img src={bottomleftPath} className='bottomleft-image'></img>
                <img src={bottomrightPath} className='bottomright-image'></img>
                <img src={bottomlinePath} className='bottomline-image'></img>
            </div>
        </div>
    </div>
);

export default DesktopUI;