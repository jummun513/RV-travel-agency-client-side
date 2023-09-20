import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer/Footer';
import NavBar from '../components/shared/Navbar/Navbar';
import { createContext, useState } from 'react';

export const AllContext = createContext("");

function Main() {
    const [hotel, setHotel] = useState([]);

    return (
        <AllContext.Provider value={{ hotel, setHotel }}>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </AllContext.Provider>
    )
}

export default Main;