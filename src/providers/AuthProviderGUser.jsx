import { createContext, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useQuery } from "react-query";

export const AuthContextGUser = createContext(null)

const AuthProviderGUser = (data) => {
    const { children } = data;
    const { user } = useContext(AuthContext);

    const { data: Guser = {}, isLoading, isError } = useQuery('g_user', async () => {
        const response = await fetch(`http://localhost:5000/general-users/${user?.email}`);
        return response.json();
    }, { enabled: !!user })

    const authInfo = {
        Guser,
        isLoading,
        isError,
    }

    console.log(Guser);

    return (
        <AuthContextGUser.Provider value={authInfo}>
            {children}
        </AuthContextGUser.Provider>
    );
};

export default AuthProviderGUser;