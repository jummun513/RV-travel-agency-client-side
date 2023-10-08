import { useContext } from "react";
import Loading from "../components/shared/Loading/Loading";
import NotFound from "../components/shared/NotFound/NotFound";
import { AuthContext } from "../providers/AuthProvider";


const PrivateAdminRoutes = (data) => {
    const { children } = data;
    const { Guser, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loading></Loading>
    }

    if (Guser?.role === 'admin' || Guser?.role === 'developer') {
        return children;
    }

    return <NotFound></NotFound>
};

export default PrivateAdminRoutes;