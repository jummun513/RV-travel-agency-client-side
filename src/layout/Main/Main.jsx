import { Outlet } from 'react-router-dom';
import NavBar from '../../components/shared/Navbar/NavBar';
import Footer from '../../components/shared/Footer/Footer';
import { createContext, useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from '../../providers/AuthProvider';
import AuthProviderPG from '../../providers/AuthProviderPG';

export const AllContext = createContext("");

function Main() {
    const [lockBody, setLockBody] = useState(null);
    // const [pgUser, setPGuser] = useState(null);
    const targetElement = document.querySelector('#container');

    useEffect(() => {
        (lockBody === true) && disableBodyScroll(targetElement);
        (lockBody === false) && enableBodyScroll(targetElement);
    }, [lockBody, targetElement]);

    const client = new QueryClient();

    // console.log(pgUser);

    return (
        <QueryClientProvider client={client}>
            <AllContext.Provider value={{ lockBody, setLockBody }}>
                <AuthProvider>
                    <AuthProviderPG>
                        <div id='container'>
                            <NavBar></NavBar>
                            <Outlet></Outlet>
                            <Footer></Footer>
                        </div>
                    </AuthProviderPG>
                </AuthProvider>
            </AllContext.Provider>
        </QueryClientProvider>
    )
}

export default Main;