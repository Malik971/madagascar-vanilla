import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';

declare global {
  interface Window {
    paypal: {
      Buttons: (config: {
        createOrder: (data: object, actions: { order: { create: Function } }) => Promise<string>,
        onApprove: (data: object, actions: { order: { capture: Function } }) => Promise<void>,
        onError: (err: Error) => void,
      }) => { render: (id: string) => void };
    };
  }
}

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const loadPayPalButtons = () => {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: totalPrice.toFixed(2),
                },
              }],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert(`Transaction effectuée par ${details.payer.name.given_name}`);
              clearCart();
            });
          },
          onError: (err) => {
            console.error("Erreur lors du paiement PayPal", err);
          },
        }).render('#paypal-button-container');
      }
    };

    loadPayPalButtons();
  }, [totalPrice, clearCart]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Votre panier</h1>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4">
                <div className="flex justify-between">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>{(item.price * item.quantity).toFixed(2)}€</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Retirer
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-6">Total: {totalPrice.toFixed(2)}€</h2>

          <div id="paypal-button-container">acheter?</div>
        </div>
      )}
    </div>
  );
};

export default Cart;
