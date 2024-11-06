import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    paypal: {
      Buttons: (config: {
        createOrder: (data: object, actions: { order: { create: () => Promise<string> } }) => Promise<string>;
        onApprove: (data: object, actions: { order: { capture: () => Promise<void> } }) => Promise<void>;
        onError: (err: Error) => void;
      }) => { render: (id: string) => void };
    };
  }
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPayPalButtons = () => {
      if (window.paypal && totalPrice > 0) { // Vérification que PayPal est chargé et que le total est non nul
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
    <div className={`fixed top-0 right-0 h-full w-80 bg-black text-white shadow-lg z-50 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Votre panier</h2>
          <button onClick={onClose} className="text-xl font-bold">&times;</button>
        </div>

        {cartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <div className="flex-grow overflow-y-auto">
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="mb-4 border-b border-gray-700 pb-2">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
                    <div className="flex-grow">
                      <p>{item.name} (x{item.quantity})</p>
                      <p className="text-sm text-gray-400">{(item.price * item.quantity).toFixed(2)}€</p>
                    </div>
                    <div className="flex items-center">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-600 px-2 py-1 rounded">-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-600 px-2 py-1 rounded">+</button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 text-sm hover:underline mt-2"
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4">
          <h2 className="text-lg font-bold">Total: {totalPrice.toFixed(2)}€</h2>
          {totalPrice > 0 && <div id="paypal-button-container" className="mt-4"></div>}
        </div>

        <div className="mt-4 flex justify-between">
          <button onClick={onClose} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700">Fermer</button>
          <button onClick={() => navigate('/checkout')} className="bg-amber-600 px-4 py-2 rounded hover:bg-amber-700">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
