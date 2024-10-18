import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import localImage from '../assets/images/poudre-de-vanille-intense-100-pure-madagascar_image.jpg';
import localImage2 from '../assets/images/Gousses_de_Vanille_Gourmet_image.jpg';
import localImage3 from '../assets/images/Extrait_de_Vanille_Pur_image.jpg';

const products = [
  { id: 1, name: 'Poudre de Vanille Pure', price: 175.00, image: localImage, category: 'vanilla' },
  { id: 2, name: 'Gousses de Vanille Gourmet', price: 180.00, image: localImage2, category: 'vanilla' },
  { id: 3, name: 'Extrait de Vanille Pur', price: 150.00, image: localImage3, category: 'vanilla' },
  { id: 4, name: 'Gousses de Vanille Rouge', price: 175.00, image: 'https://images.unsplash.com/photo-1611495185729-82e0d5f30c4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', category: 'vanilla' },
];

const ProductCatalog: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filteredProducts = filter === 'all' ? products : products.filter(product => product.category === filter);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-amber-800 text-center">Nos Produits</h1>

      <div className="mb-8 flex justify-center">
        <label htmlFor="filter" className="mr-2 text-lg">Filtrer par:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2 bg-amber-50 text-amber-800"
        >
          <option value="all">Tous les Produits</option>
          <option value="vanilla">Vanille</option>
          <option value="spices">Épices</option>
          <option value="handicrafts">Artisanat</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg bg-white">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-amber-800">{product.name}</h2>
              <p className="text-gray-600 mb-4 text-lg">{product.price.toFixed(2)}€</p>
              <Link
                to={`/products/${product.id}`}
                className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition duration-300 inline-block text-center w-full"
              >
                Voir les Détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;