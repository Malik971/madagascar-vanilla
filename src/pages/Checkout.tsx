import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

// Charger Stripe avec la clé publique depuis le fichier .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);
console.log("Stripe Public Key:", import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Paiement</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;
