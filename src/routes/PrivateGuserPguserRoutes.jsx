import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "../components/shared/Loading/Loading";
import { AuthContextPG } from "../providers/AuthProviderPG";

const PrivateGuserPguserRoutes = (data) => {
    const { children } = data;
    const { isLoading, Guser } = useContext(AuthContext);
    const { PGuser, pgLoading } = useContext(AuthContextPG);

    if (isLoading || pgLoading) {
        return <Loading></Loading>
    }

    else if (Guser || PGuser) {
        return children;
    }

    else if (!Guser) {
        return <Navigate to='/login'></Navigate>
    }

    else if (!PGuser) {
        return <Navigate to='/privileged-guest/login'></Navigate>
    }
};

export default PrivateGuserPguserRoutes;