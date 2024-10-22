import './App.css'
import "./index.css";
import "./assets/fonts/cocofy.ttf";
import "./assets/fonts/althergothic.ttf";
import "./assets/fonts/futureextra.ttf"
import DesktopUI from './desktopui/DesktopUI';
import MobileUI from './mobileui/MobileUI';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMediaQuery } from 'react-responsive';


const App = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    return (
        <div>
            {isMobile ? <MobileUI /> : <DesktopUI />}
        </div>
    );
};

export default App;
