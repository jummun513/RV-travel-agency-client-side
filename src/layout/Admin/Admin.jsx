import { createContext } from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from '../../providers/AuthProvider';
import AdminPanelPage from '../../components/pages/AdminPanelPage/AdminPanelPage';
import PrivateAdminRoutes from '../../routes/PrivateAdminRoutes';

export const AdminContext = createContext("");

function Admin() {
    const admin_client = new QueryClient();

    return (
        <div id='admin_container'>
            <QueryClientProvider client={admin_client}>
                <AuthProvider>
                    <PrivateAdminRoutes>
                        <div className='bg-gray-50'><AdminPanelPage></AdminPanelPage></div>
                    </PrivateAdminRoutes>
                </AuthProvider>
            </QueryClientProvider>
        </div>
    )
}

export default Admin;