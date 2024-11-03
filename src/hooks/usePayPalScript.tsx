import { useEffect } from 'react';

export const usePayPalScript = () => {
  useEffect(() => {
    const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
    if (!clientId) {
      console.error("Le client ID PayPal n'est pas défini dans les variables d'environnement.");
      return;
    }

    // Créer et insérer le script PayPal avec le client ID et la devise EUR
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
    script.async = true;
    document.body.appendChild(script);

    // Nettoyer le script au démontage du composant
    return () => {
      document.body.removeChild(script);
    };
  }, []);
};
