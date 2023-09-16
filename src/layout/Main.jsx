import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer/Footer';
import NavBar from '../components/shared/Navbar/Navbar';
import { createContext } from 'react';

export const AllContext = createContext("");

function Main() {

    return (
        <AllContext.Provider value={{}}>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </AllContext.Provider>
    )
}

export default Main;