import { useState, useEffect, createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { useSendEmailVerification } from 'react-firebase-hooks/auth';
import axios from "axios";
import { useQueryClient } from "react-query";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const getUser = async (email, token) => {
    const response = await axios.get(`${import.meta.env.VITE_clientSideLink}/api/users/${email}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const AuthProvider = (data) => {
    const { children } = data;
    const [user, setUser] = useState(null);
    const [Guser, setGuser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sendEmailVerification, sending, errorEmailVerification] = useSendEmailVerification(auth);
    const queryClient = useQueryClient();

    // create new user
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // sign-in with email and password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // sign-out an existing user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // email verification
    const verificationEmailSend = () => {
        sendEmailVerification();
    }

    // auth state changing observe
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                axios.post(`${import.meta.env.VITE_clientSideLink}/api/auth/jwt`, { email: currentUser?.email })
                    .then(data => {
                        setUser(currentUser);
                        const token = data.data;
                        localStorage.setItem('access_token', token);
                        localStorage.removeItem('pg_user');
                        queryClient.setQueryData(['g_user', currentUser.email], getUser(currentUser.email, token)).then(d => setGuser(d));
                    })
            }
            else {
                localStorage.removeItem('access_token');
                setGuser(null);
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            return unsubscribe();
        }
    }, [queryClient])


    // these data are passed as props
    const authInfo = {
        user,
        loading,
        createNewUser,
        signIn,
        logOut,
        setLoading,
        verificationEmailSend,
        sending,
        errorEmailVerification,
        Guser,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;