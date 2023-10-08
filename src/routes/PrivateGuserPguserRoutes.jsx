import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "../components/shared/Loading/Loading";
import { AuthContextPG } from "../providers/AuthProviderPG";

const PrivateGuserPguserRoutes = (data) => {
    const { children } = data;
    const { user, loading } = useContext(AuthContext);
    const { PGuser, pgLoading } = useContext(AuthContextPG);

    if (loading || pgLoading) {
        return <Loading></Loading>
    }

    if (user || PGuser) {
        return children;
    }

    if (!user) {
        return <Navigate to='/login'></Navigate>
    }

    if (!PGuser) {
        return <Navigate to='/privileged-guest/login'></Navigate>
    }
};

export default PrivateGuserPguserRoutes;