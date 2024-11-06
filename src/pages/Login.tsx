import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Select from "react-select";
import countryList from "react-select-country-list";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    city: "",
    address: "",
  });
  const { login } = useAuth();
  const { cartItems, totalAmount } = useCart();
  const navigate = useNavigate();
  const countries = countryList().getData(); // Liste des pays pour le sélecteur

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (selectedOption: any) => {
    setFormData((prev) => ({ ...prev, country: selectedOption.label }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/"); // Redirige vers la page d'accueil après la connexion
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const tva = (totalAmount || 0) * 0.2;
  const discountRate = 0.1;
  const discount = (totalAmount || 0) * discountRate;
  const finalAmount = (totalAmount || 0) + tva - discount;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Inscription</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="border rounded p-2"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Nom"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Téléphone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            value={formData.password}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />

          {/* Sélecteur de pays avec react-select-country-list */}
          <Select
            options={countries}
            value={countries.find(
              (country) => country.label === formData.country
            )}
            onChange={handleCountryChange}
            placeholder="Choisir un pays"
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="city"
            placeholder="Ville"
            required
            value={formData.city}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Adresse complète"
            required
            value={formData.address}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />

          {/* Récapitulatif du panier */}
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h3 className="text-lg font-semibold">Récapitulatif du panier</h3>
            <p>Articles dans le panier : {cartItems.length}</p>
            <p>Total articles : {totalAmount?.toFixed(2) || "0.00"} €</p>
            <p>TVA (20%) : {tva.toFixed(2)} €</p>
            <p>Remise de bienvenue (50%) : -{discount.toFixed(2)} €</p>
            <p className="font-bold text-lg">
              Total final : {finalAmount.toFixed(2)} €
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white font-bold py-3 rounded-lg hover:bg-amber-700 transition-all duration-300"
          >
            S'inscrire
          </button>
        </form>

        <p className="mt-4 text-center">
          Pas encore de compte ?{" "}
          <a href="/signup" className="text-amber-600 font-semibold">
            Inscrivez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
