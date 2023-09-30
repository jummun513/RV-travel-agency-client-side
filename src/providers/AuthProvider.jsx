import { useState, useEffect, createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { useSendEmailVerification } from 'react-firebase-hooks/auth';

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
            setUser(currentUser);
            console.log(currentUser);
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [])

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
        errorEmailVerification
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;