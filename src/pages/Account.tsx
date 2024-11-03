import React from 'react';
import { useAuth } from '../context/AuthContext';

const Account: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Mon Compte</h1>
      <p className="mt-4">Bienvenue, {user?.email}!</p>
      {/* D'autres informations sur le compte de l'utilisateur */}
    </div>
  );
};

export default Account;
