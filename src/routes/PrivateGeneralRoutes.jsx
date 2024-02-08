import { useContext } from "react";
import Loading from "../components/shared/Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";
import AuthProvider from "../providers/AuthProvider";


const PrivateGeneralRoutes = (data) => {
    const { children } = data;
    const { loading, Guser } = useContext(AuthProvider);
    const location = useLocation();

    if (Guser) {
        return children;
    }

    if (loading) {
        return <Loading></Loading>
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate >
};

export default PrivateGeneralRoutes;