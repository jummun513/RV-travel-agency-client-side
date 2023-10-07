import { useEffect, createContext, useReducer } from "react";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('pg_user')) || null,
    error: null
};

export const AuthContextPG = createContext(INITIAL_STATE);

const AuthReducerPG = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                error: null
            };
        case 'LOGIN_FAILURE':
            return {
                user: null,
                error: action.payload
            };
        case 'LOG_OUT':
            return {
                user: null,
                error: null,
            };
        default:
            return state;
    }
}

const AuthProviderPG = (data) => {
    const { children } = data;

    const [state, dispatch] = useReducer(AuthReducerPG, INITIAL_STATE);


    useEffect(() => {
        console.log(state.user);
        localStorage.setItem('pg_user', JSON.stringify(state.user))
    }, [state.user])



    // these data are passed as props
    const authInfo = {
        PGuser: state.user,
        error: state.error,
        dispatch
    }

    return (
        <AuthContextPG.Provider value={authInfo}>
            {children}
        </AuthContextPG.Provider>
    );
};

export default AuthProviderPG;