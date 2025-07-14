import React, { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.init';
import useAxios from '../CustomHooks/useAxios';

const AuthProvider = ({ children }) => {

    // STATES
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState("light");
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    const axiosSecure = useAxios(); // etake pore axios secure diye replace kore nibo

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.add(savedTheme);
        }
    }, []);

    // Whenever theme changes
    useEffect(() => {
        document.documentElement.classList.remove(theme === "light" ? "dark" : "light");
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () =>
        setTheme(theme === "light" ? "dark" : "light");

    // create a user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    // Login User
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // update user profile
    const updateUserInfo = ({ displayName, photoURL }) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: displayName || auth.currentUser?.displayName,
            photoURL: photoURL || auth.currentUser?.photoURL
        });
    };

    // Logout User
    const logout = () => {
        return signOut(auth);
    }

    // Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });
        return () => {
            unsubscribe();
        }
    }, [])

    // user of database
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/donors/${user.email}`)
                .then(res => setCurrentUser(res.data))
                .catch(err => console.error(err));
        } else {
            setCurrentUser(null);
        }
    }, [user, axiosSecure]);

    // User Info
    const userInfo = {
        user,
        setUser,
        currentUser,
        createUser,
        updateUserInfo,
        loginUser,
        loading,
        setLoading,
        theme,
        toggleTheme,
        logout
    };

    return <AuthContext.Provider value={userInfo}>
        {children}
    </AuthContext.Provider>;
};
export default AuthProvider;