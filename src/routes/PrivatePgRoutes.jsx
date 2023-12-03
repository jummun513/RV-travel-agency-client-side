import { useContext } from "react";
import Loading from "../components/shared/Loading/Loading";
import { AuthContextPG } from "../providers/AuthProviderPG";
import { Navigate, useLocation } from "react-router-dom";


const PrivatePgRoutes = (data) => {
    const { children } = data;
    const { PGuser, pgLoading } = useContext(AuthContextPG);
    const location = useLocation();

    if (PGuser) {
        return children;
    }

    if (pgLoading) {
        return <Loading></Loading>
    }

    return <Navigate to='/privileged-guest/login' state={{ from: location }} replace></Navigate >
};

export default PrivatePgRoutes;