import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password);
      // Ajouter une offre de bienvenue ici
      alert('Bienvenue! Vous recevez 10% de réduction sur votre première commande.');
      navigate('/');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Inscription</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700"
        >
          Inscription
        </button>
      </form>
      <p className="mt-4">
        Vous avez déjà un compte? <a href="/login" className="text-amber-600">Connectez-vous</a>
      </p>
    </div>
  );
};

export default Signup;
