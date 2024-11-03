import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductCatalog from './pages/ProductCatalog';
import ProductDetails from './pages/ProductDetails'; 
import About from './pages/About';
import Blog from './pages/Blog';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>  {/* On enveloppe l'application dans AuthProvider */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/products/:id" element={<ProductDetails />} /> {/* Ajout de ProductDetails */}
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />   {/* Route pour login */}
          <Route path="/signup" element={<Signup />} /> {/* Route pour signup */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
