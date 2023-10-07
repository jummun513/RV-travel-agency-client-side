import { useLocation } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import './LoginRegiContainer.css';
import bgImage from '../../../../assets/images/login-background.jpg';
import frontImage from '../../../../assets/images/login-foreground.jpg';

const LoginRegiContainer = () => {
    const location = useLocation();

    return (
        <div className="relative top-[45px] xxs:top-[64px] lg:top-[74px] xl:top-[100px] 3xl:top-[106px] mb-[45px] xxs:mb-[64px] lg:mb-[74px] xl:mb-[100px] 3xl:mb-[106px]">
            <div style={{ backgroundImage: `url(${bgImage})` }} className="w-full h-full bg-cover bg-no-repeat bg-center">
                <div className="w-full h-full flex items-center backdrop-blur-sm 4xl:backdrop-blur-md">
                    <div style={{ backgroundImage: `url(${frontImage})` }} className={`overflow-hidden flex w-full h-full my-16 rounded-lg sm:rounded-xl lg:rounded-2xl bg-cover bg-no-repeat bg-center mx-2 xxs:mx-5 xs:mx-auto min-w-[250px] xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl ${location.pathname.includes('login') ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-full md:w-[60%] xl:w-1/2 relative overflow-hidden ${!location.pathname.includes('registration') ? 'slideInLeft' : 'hidden'}`}>
                            <Login></Login>
                        </div>
                        <div className={`w-full md:w-[60%] xl:w-1/2 relative overflow-hidden ${location.pathname.includes('registration') ? 'slideInRight' : 'hidden'}`}>
                            <Register></Register>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegiContainer;