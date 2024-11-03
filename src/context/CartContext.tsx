import React, { createContext, useState, useContext, ReactNode } from 'react';

// Définir le type d'un produit dans le panier
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
}

// Définir le type du contexte
interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

// Créer le contexte avec une valeur par défaut
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Fournisseur du contexte pour englober l'application
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fonction pour ajouter un produit au panier
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Si l'article est déjà dans le panier, augmenter la quantité
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Sinon, ajouter le nouvel article
        return [...prevItems, item];
      }
    });
  };

  // Fonction pour retirer un produit du panier
  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Fonction pour vider le panier
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte du panier
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
