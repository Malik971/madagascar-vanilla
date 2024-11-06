// Signup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (!acceptTerms) {
      setError('Vous devez accepter les termes et conditions pour vous inscrire');
      return;
    }

    try {
      // Utiliser signUp depuis AuthContext
      await signUp(email, password, subscribeNewsletter);

      // Rediriger vers la page d'accueil (l'utilisateur est déjà connecté)
      navigate('/');
    } catch (err) {
      console.error("Erreur lors de l'inscription", err);
      setError("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-semibold mb-6">S'inscrire</h2>
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirmer le mot de passe</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
            required
          />
          <label className="ml-2 text-gray-700">
            J'accepte les <a href="/conditions" className="text-blue-500">termes et conditions</a> de traitement des données personnelles.
          </label>
        </div>

        <div className="mb-4">
          <input
            type="checkbox"
            checked={subscribeNewsletter}
            onChange={() => setSubscribeNewsletter(!subscribeNewsletter)}
          />
          <label className="ml-2 text-gray-700">
            Recevoir la newsletter (réduction sur le premier achat)
          </label>
        </div>

        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Signup;
