import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer/Footer';
import NavBar from '../components/shared/Navbar/Navbar';
import { createContext, useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { QueryClient, QueryClientProvider } from "react-query";

export const AllContext = createContext("");

function Main() {
    const [lockBody, setLockBody] = useState(null);
    const targetElement = document.querySelector('#container');

    useEffect(() => {
        (lockBody === true) && disableBodyScroll(targetElement);
        (lockBody === false) && enableBodyScroll(targetElement);
    }, [lockBody, targetElement]);

    const client = new QueryClient();


    return (
        <QueryClientProvider client={client}>
            <AllContext.Provider value={{ lockBody, setLockBody }}>
                <div id='container'>
                    <NavBar></NavBar>
                    <Outlet></Outlet>
                    <Footer></Footer>
                </div>
            </AllContext.Provider>
        </QueryClientProvider>
    )
}

export default Main;