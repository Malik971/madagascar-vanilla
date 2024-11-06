import React, { createContext, useState, useContext, ReactNode } from 'react';

// Définir le type d'un produit dans le panier
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  image: string;
}

// Définir le type du contexte
interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void; // Ajout de updateQuantity
  totalAmount: number; // Ajout de totalAmount
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

  // Fonction pour mettre à jour la quantité d'un produit dans le panier
  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Calculer le montant total des articles dans le panier
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Fonction pour vider le panier
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity, // Ajout de updateQuantity au contexte
        totalAmount,    // Ajout de totalAmount au contexte
        clearCart,
      }}
    >
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
