import './App.css'
import DesktopUI from './desktopui/desktopui';
import MobileUI from './mobileui/MobileUI';
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
