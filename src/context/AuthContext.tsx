// AuthContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { onAuthStateChanged, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

interface AuthContextProps {
    user: User | null;
    signUp: (email: string, password: string, subscribeNewsletter: boolean) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    const signUp = async (email: string, password: string, subscribeNewsletter: boolean) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Ajouter le profil utilisateur
        await updateProfile(user, { displayName: email });

        // Enregistrer les informations de l'utilisateur dans Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            subscribeNewsletter: subscribeNewsletter,
            createdAt: new Date(),
        });
    };

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, signUp, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
