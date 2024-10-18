import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Madagascar Vanilla</h3>
          <p>Bringing the finest vanilla from Madagascar to your doorstep.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-amber-200">Home</Link></li>
            <li><Link to="/products" className="hover:text-amber-200">Products</Link></li>
            <li><Link to="/about" className="hover:text-amber-200">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-amber-200">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p>Email: malik97un@gmail.com</p>
          <p>Phone: +33 7 49 50 68 85</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2024 Madagascar Vanilla. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;