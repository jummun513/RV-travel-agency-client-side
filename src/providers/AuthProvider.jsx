import { useState, useEffect, createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { useSendEmailVerification } from 'react-firebase-hooks/auth';
import axios from "axios";
import { useQuery } from "react-query";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = (data) => {
    const { children } = data;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sendEmailVerification, sending, errorEmailVerification] = useSendEmailVerification(auth);

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
                axios.post(`${import.meta.env.VITE_clientSideLink}/jwt`, { email: currentUser?.email })
                    .then(data => {
                        localStorage.setItem('access_token', data.data.token);
                        setUser(currentUser);
                    })
            }
            else {
                localStorage.removeItem('access_token');
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            return unsubscribe();
        }
    }, [])


    const token = localStorage.getItem('access_token');
    const condition = user !== null && token !== null;

    const { data: Guser = {}, isLoading, isError } = useQuery('g_user', async () => {
        const response = await fetch(`${import.meta.env.VITE_clientSideLink}/general-users/${user?.email}`, {
            headers: {
                authorization: `bearer ${token}`,
            }
        });
        return response.json();
    }, { enabled: condition });

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
        isLoading,
        isError,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;