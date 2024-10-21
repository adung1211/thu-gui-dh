import topleftPath from '../assets/topleft.png'
import toprightPath from '../assets/topright.png'
import bottomleftPath from '../assets/bottomleft.png'
import bottomrightPath from '../assets/bottomright.png'
import bottomlinePath from '../assets/bottomline.png'
import thuguiPath from '../assets/thugui.png'
import chaomungPath from '../assets/chaomung.png'
import circlePath from '../assets/circle.png'

const DesktopUI = () => (
    <div className='main-wrap'>
        <div className="main-container">
            <div className='row'>
                <img src={topleftPath} style={{width: '120%'}}></img>
                <img src={thuguiPath} style={{width: '60%', alignSelf: 'end'}}></img>
                <img src={chaomungPath} style={{width: '120%', justifySelf: 'end', alignSelf:'end'}}></img>
                <img src={toprightPath} style={{width: '120%', justifySelf: 'end'}}></img>
            </div>
            <div className='row1'>
                <img src={circlePath} style={{width: '40%', alignSelf: 'center', justifySelf: 'center'}}></img>
                <div className='custom-text-box' style={{alignSelf: 'end'}}></div>
            </div>
            <div className='m-row2'>
                <img src={bottomleftPath}  style={{width: '30%', position: 'absolute', bottom: '0'}}></img>
                <img src={bottomrightPath}  style={{width: '30%', position: 'absolute', bottom: '0', right: '0'}}></img>
                <img src={bottomlinePath}  style={{width: '100%', position: 'absolute', bottom: '0'}}></img>
            </div>
        </div>
    </div>
);

export default DesktopUI;