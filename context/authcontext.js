'use client'
import { auth, db } from "@/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userDataOb, setUserDataOb] = useState(null);
    const [loading, setLoading] = useState(true);

    // Auth Handle

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout(){
        setUserDataOb(null);
        setCurrentUser(null);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                setLoading(true);
                setCurrentUser(user);
                if (!user) {
                    console.log('No user found');
                    return
                }
                console.log('Fetch user data');
                const docRef = doc(db, 'user', user.uid);
                const docSnap = await getDoc(docRef);
                let firebaseData = {};
                if (docSnap.exists()) {
                    console.log('Found user data');
                    firebaseData = docSnap.data();
                    console.log(firebaseData);
                }
                setUserDataOb(firebaseData);
            }
            catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userDataOb,
        setUserDataOb,
        signup,
        logout,
        login,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
