import { Outlet, useLocation } from 'react-router-dom';
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
    const location = useLocation();

    useEffect(() => {
        (lockBody === true) && disableBodyScroll(targetElement);
        (lockBody === false) && enableBodyScroll(targetElement);
    }, [lockBody, targetElement]);

    useEffect(() => {
        // Simulate loading your website content
        setTimeout(() => {
            setLoading(false);
        }, 500); // Replace with actual loading logic

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
                                    {(
                                        // location.pathname.includes('login') ||
                                        location.pathname.includes('email-confirmation') ||
                                        location.pathname.includes('admin-panel')
                                    ) || <NavBar></NavBar>}
                                    <Outlet></Outlet>
                                    {
                                        (
                                            // location.pathname.includes('login') ||
                                            location.pathname.includes('email-confirmation') ||
                                            location.pathname.includes('admin-panel')
                                        ) ||
                                        <Footer></Footer>
                                    }
                                </div>
                            </AuthProviderPG>
                        </AuthProvider>
                    </AllContext.Provider>
            }
        </QueryClientProvider>
    )
}

export default Main;