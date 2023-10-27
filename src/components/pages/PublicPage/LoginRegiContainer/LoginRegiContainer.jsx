import { useLocation } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import './LoginRegiContainer.css';

const LoginRegiContainer = () => {
    const location = useLocation();

    return (
        <div className="relative">
            <div className="w-full h-full bg-login-back bg-cover bg-no-repeat bg-center">
                <div className="w-full h-full flex items-center backdrop-blur-sm 4xl:backdrop-blur-md">
                    <div className={`bg-login-front overflow-hidden flex w-full h-full mt-[165px] xxs:mt-[192px] lg:mt-[212px] xl:mt-[264px] 3xl:mt-[276px] mb-[109px] xxs:mb-[128px] lg:mb-[138px] xl:mb-[164px] 3xl:mb-[170px] rounded-lg sm:rounded-xl lg:rounded-2xl bg-cover bg-no-repeat bg-center mx-2 xxs:mx-5 xs:mx-auto min-w-[250px] xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl ${location.pathname.includes('login') ? 'flex-row-reverse' : 'flex-row'}`}>
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