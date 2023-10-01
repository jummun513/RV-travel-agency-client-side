import { createContext, useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from '../../providers/AuthProvider';
import AdminPanelPage from '../../components/pages/AdminPanelPage/AdminPanelPage';

export const AdminContext = createContext("");

function Admin() {
    const [lockBody, setLockBody] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const targetElement = document.querySelector('#admin_container');

    useEffect(() => {
        (lockBody === true) && disableBodyScroll(targetElement);
        (lockBody === false) && enableBodyScroll(targetElement);
    }, [lockBody, targetElement]);

    const admin_client = new QueryClient();




    return (
        <div id='admin_container'>
            <QueryClientProvider client={admin_client}>
                <AdminContext.Provider value={{ lockBody, setLockBody, setOpenModal, openModal }}>
                    <AuthProvider>
                        <AdminPanelPage></AdminPanelPage>
                    </AuthProvider>
                </AdminContext.Provider>
            </QueryClientProvider>
        </div>
    )
}

export default Admin;