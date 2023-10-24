import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/shared/Loading/Loading";
import { AuthContextPG } from "../providers/AuthProviderPG";
import NotFound from "../components/shared/NotFound/NotFound";

const ProtectLoginAndRegister = (data) => {
    const { children } = data;
    const { user, loading } = useContext(AuthContext);
    const { PGuser, pgLoading } = useContext(AuthContextPG);

    if (user || PGuser) {
        return <NotFound></NotFound>;
    }

    if (loading || pgLoading) {
        return <Loading></Loading>
    }


    else {
        return children;
    }
};

export default ProtectLoginAndRegister;