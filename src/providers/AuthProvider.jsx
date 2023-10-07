import { useState, useEffect, createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { useSendEmailVerification } from 'react-firebase-hooks/auth';
import axios from "axios";

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
            if (currentUser) {
                axios.post('http://localhost:5000/jwt', { email: currentUser.email })
                    .then(data => {
                        localStorage.setItem('access_token', data.data.token);
                    })
                    .catch(err => console.log(err))
            }
            else {
                localStorage.removeItem('access_token');
            }
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