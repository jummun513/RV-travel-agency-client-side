import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/shared/Loading/Loading";
import { AuthContextPG } from "../providers/AuthProviderPG";

const PrivateGuserPguserRoutes = (data) => {
    const { children } = data;
    const { loading, Guser, user } = useContext(AuthContext);
    const { PGuser, pgLoading } = useContext(AuthContextPG);
    const location = useLocation();

    if (loading || pgLoading) {
        return <Loading></Loading>
    }

    if (user?.emailVerified === false) {
        return <Navigate to='/email-confirmation' state={{ from: location }} replace></Navigate>
    }

    else if ((Guser && user?.emailVerified === true) || PGuser) {
        return children;
    }

    else if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }

    else if (!PGuser) {
        return <Navigate to='/privileged-guest/login' state={{ from: location }} replace></Navigate>
    }
};

export default PrivateGuserPguserRoutes;