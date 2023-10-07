import { createContext } from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from '../../providers/AuthProvider';
import AdminPanelPage from '../../components/pages/AdminPanelPage/AdminPanelPage';

export const AdminContext = createContext("");

function Admin() {
    const admin_client = new QueryClient();

    return (
        <div id='admin_container'>
            <QueryClientProvider client={admin_client}>
                <AuthProvider>
                    <AdminPanelPage></AdminPanelPage>
                </AuthProvider>
            </QueryClientProvider>
        </div>
    )
}

export default Admin;