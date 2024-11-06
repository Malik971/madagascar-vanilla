import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductCatalog from "./pages/ProductCatalog";
import About from "./pages/About";
import Blog from "./pages/Blog";
import CartSidebar from "./components/CartSidebar"; // Moved to components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));

const App: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Header onCartClick={() => setCartOpen(true)} />
        <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
        <Suspense fallback={<div><center><h1>Chargement...</h1></center></div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
