import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {auth} from "../firebase/config";

export const AuthContext = createContext();
export const AuthProvider = ({children})=> {
    const [currentUser, setcurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const register = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentcurrentUser => {
            setcurrentUser(currentcurrentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const logout = () => {
        return signOut(auth);
    }

    const value ={
        currentUser,
        loading,
        register,
        login,
        logout,
        signInWithGoogle,
    }


    
    return (
        <AuthContext value = {value}>
            {children}
        </AuthContext>
    )

}