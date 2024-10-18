import React from 'react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  // TODO: Implement cart state management

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {/* TODO: Add cart items list */}
      <div className="mt-8">
        <Link to="/checkout" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition duration-300">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;