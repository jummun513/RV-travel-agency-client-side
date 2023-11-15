import { useState, useEffect, createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { useSendEmailVerification } from 'react-firebase-hooks/auth';
// import axios from "axios";
import { useMutation, useQuery } from "react-query";
export const AuthContext = createContext(null);

const auth = getAuth(app);


// Function to obtain JWT token from the backend
const getJwtToken = async (email) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_clientSideLink}/api/auth/jwt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        if (!response.ok) {
            throw new Error('Failed to obtain JWT token');
        }

        const token = await response.json();
        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};

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

    const { mutate } = useMutation(getJwtToken, {
        onSuccess: (token) => {
            localStorage.setItem('access_token', token);
        },
    });

    // auth state changing observe
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                mutate(currentUser?.email);
                localStorage.removeItem('pg_user');
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
    }, [mutate]);



    const getUserInfo = async (email) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_clientSideLink}/api/users/${email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user information');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const { data: Guser = null, isLoading, isError } = useQuery('g_user', () => getUserInfo(user?.email), {
        enabled: user !== null,
    });


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



















// import { useState, useEffect, createContext } from "react";
// import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { app } from "../firebase/firebase.config";
// import { useSendEmailVerification } from 'react-firebase-hooks/auth';
// import axios from "axios";
// import { useQuery } from "react-query";
// export const AuthContext = createContext(null);

// const auth = getAuth(app);

// const AuthProvider = (data) => {
//     const { children } = data;
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [sendEmailVerification, sending, errorEmailVerification] = useSendEmailVerification(auth);

//     // create new user
//     const createNewUser = (email, password) => {
//         setLoading(true);
//         return createUserWithEmailAndPassword(auth, email, password);
//     }

//     // sign-in with email and password
//     const signIn = (email, password) => {
//         setLoading(true);
//         return signInWithEmailAndPassword(auth, email, password);
//     }

//     // sign-out an existing user
//     const logOut = () => {
//         setLoading(true);
//         return signOut(auth);
//     }

//     // email verification
//     const verificationEmailSend = () => {
//         sendEmailVerification();
//     }

//     // auth state changing observe
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, currentUser => {
//             if (currentUser) {
//                 axios.post(`${import.meta.env.VITE_clientSideLink}/api/auth/jwt`, { email: currentUser?.email })
//                     .then(data => {
//                         localStorage.setItem('access_token', data.data);
//                         localStorage.removeItem('pg_user');
//                         setUser(currentUser);
//                     })
//             }
//             else {
//                 localStorage.removeItem('access_token');
//                 setUser(null);
//             }
//             setLoading(false);
//         });

//         return () => {
//             return unsubscribe();
//         }
//     }, [])


//     // conditionally fetch user details from database
//     const token = localStorage.getItem('access_token');
//     const condition = user !== null && token !== null;

//     const { data: Guser = null, isLoading, isError } = useQuery('g_user', async () => {
//         const response = await fetch(`${import.meta.env.VITE_clientSideLink}/api/users/${user?.email}`, {
//             headers: {
//                 authorization: `bearer ${token}`,
//             }
//         });
//         return response.json();
//     }, { enabled: condition });

//     // these data are passed as props
//     const authInfo = {
//         user,
//         loading,
//         createNewUser,
//         signIn,
//         logOut,
//         setLoading,
//         verificationEmailSend,
//         sending,
//         errorEmailVerification,
//         Guser,
//         isLoading,
//         isError,
//     }

//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;