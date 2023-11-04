import { Outlet } from 'react-router-dom';
import NavBar from '../../components/shared/Navbar/NavBar';
import Footer from '../../components/shared/Footer/Footer';
import { createContext, useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from '../../providers/AuthProvider';
import AuthProviderPG from '../../providers/AuthProviderPG';
import Loading from '../../components/shared/Loading/Loading';

export const AllContext = createContext("");

function Main() {
    const [lockBody, setLockBody] = useState(null);
    const targetElement = document.querySelector('#container');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (lockBody === true) && disableBodyScroll(targetElement);
        (lockBody === false) && enableBodyScroll(targetElement);
    }, [lockBody, targetElement]);

    useEffect(() => {
        // Simulate loading your website content
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Replace with actual loading logic

    }, []);

    const client = new QueryClient();

    return (
        <QueryClientProvider client={client}>
            {
                loading ? <Loading></Loading> :
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
            }
        </QueryClientProvider>
    )
}

export default Main;