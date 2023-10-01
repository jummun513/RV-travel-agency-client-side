import { Outlet } from 'react-router-dom';
import NavBar from '../../components/shared/Navbar/NavBar';
import Footer from '../../components/shared/Footer/Footer';
import { createContext, useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from '../../providers/AuthProvider';

export const AllContext = createContext("");

function Main() {
    const [lockBody, setLockBody] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const targetElement = document.querySelector('#container');

    useEffect(() => {
        (lockBody === true) && disableBodyScroll(targetElement);
        (lockBody === false) && enableBodyScroll(targetElement);
    }, [lockBody, targetElement]);

    const client = new QueryClient();

    return (
        <QueryClientProvider client={client}>
            <AllContext.Provider value={{ lockBody, setLockBody, setOpenModal, openModal }}>
                <AuthProvider>
                    <div id='container'>
                        <NavBar></NavBar>
                        <Outlet></Outlet>
                        <Footer></Footer>
                    </div>
                </AuthProvider>
            </AllContext.Provider>
        </QueryClientProvider>
    )
}

export default Main;