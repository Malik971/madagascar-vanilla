import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Un contexte pour gérer l'authentification (explication ci-dessous)

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); // Redirige vers la page d'accueil après la connexion
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Connexion</h1>
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
          Connexion
        </button>
      </form>
      <p className="mt-4">
        Pas encore de compte? <a href="/signup" className="text-amber-600">Inscrivez-vous</a>
      </p>
    </div>
  );
};

export default Login;
