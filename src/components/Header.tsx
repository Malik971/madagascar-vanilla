import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-amber-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Madagascar Vanilla</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-amber-200">Home</Link></li>
            <li><Link to="/products" className="hover:text-amber-200">Products</Link></li>
            <li><Link to="/about" className="hover:text-amber-200">About</Link></li>
            <li><Link to="/blog" className="hover:text-amber-200">Blog</Link></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="hover:text-amber-200">
            <ShoppingCart />
          </Link>
          <Link to="/account" className="hover:text-amber-200">
            <User />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;