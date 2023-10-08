import { useContext } from "react";
import Loading from "../components/shared/Loading/Loading";
import { AuthContextPG } from "../providers/AuthProviderPG";
import { Navigate } from "react-router-dom";


const PrivatePgRoutes = (data) => {
    const { children } = data;
    const { PGuser, pgLoading } = useContext(AuthContextPG);

    if (pgLoading) {
        return <Loading></Loading>
    }

    if (PGuser) {
        return children;
    }
    return <Navigate to='/privileged-guest/login'></Navigate>
};

export default PrivatePgRoutes;