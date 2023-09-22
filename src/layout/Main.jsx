import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer/Footer';
import NavBar from '../components/shared/Navbar/Navbar';
import { createContext, useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export const AllContext = createContext("");

function Main() {
    const [hotel, setHotel] = useState([]);
    const [lockBody, setLockBody] = useState(false);
    const targetElement = document.querySelector('#container');

    useEffect(() => {
        lockBody && disableBodyScroll(targetElement);
        !lockBody && enableBodyScroll(targetElement);
    }, [lockBody, targetElement]);

    return (
        <AllContext.Provider value={{ hotel, setHotel, lockBody, setLockBody }}>
            <div id='container'>
                <NavBar></NavBar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </AllContext.Provider>
    )
}

export default Main;