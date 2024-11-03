import React, { createContext, useContext, useState, ReactNode } from 'react';

// Définir un type pour l'utilisateur
interface User {
  email: string;
}

// Définir le type du contexte d'authentification
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Créer le contexte avec un type undefined par défaut
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Définir le type des props du composant AuthProvider
interface AuthProviderProps {
  children: ReactNode; // Accepte des éléments enfants comme props
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Utilisateur initialement null

  const login = async (email: string, password: string) => {
    // Simuler une connexion (vous pouvez ajouter votre logique ici)
    setUser({ email });
  };

  const signup = async (email: string, password: string) => {
    // Simuler une inscription (vous pouvez ajouter votre logique ici)
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};