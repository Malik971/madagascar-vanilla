import React from 'react';
import { Link } from 'react-router-dom';
import localImage from '../assets/images/poudre-de-vanille-intense-100-pure-madagascar_image.jpg';
import localImage2 from '../assets/images/Gousses_de_Vanille_Gourmet_image.jpg';
import localImage3 from '../assets/images/Extrait_de_Vanille_Pur_image.jpg';


const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 text-amber-800">Découvrez la Vanille Exceptionnelle de Madagascar</h1>
        <p className="text-xl mb-6 text-amber-700">Expérimentez les saveurs riches et aromatiques de notre vanille premium, directement sourcée des plantations luxuriantes de Madagascar.</p>
        <Link to="/products" className="bg-amber-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-amber-700 transition duration-300 inline-block">
          Achetez Maintenant
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center text-amber-800">Nos Produits Vedettes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.price}€</p>
                <Link to={`/products/${product.id}`} className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition duration-300">
                  Voir les Détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 bg-amber-50 p-8 rounded-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-amber-800">Pourquoi Choisir Notre Vanille de Madagascar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2 text-amber-700">Qualité Premium</h3>
            <p>Nos gousses de vanille sont soigneusement sélectionnées pour leur saveur et leur arôme supérieurs.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2 text-amber-700">Approvisionnement Durable</h3>
            <p>Nous travaillons directement avec les agriculteurs locaux pour garantir des pratiques équitables et une culture durable.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2 text-amber-700">Utilisation Polyvalente</h3>
            <p>Parfaite pour la pâtisserie, la cuisine et la création de produits artisanaux.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center text-amber-800">De Madagascar à Montpellier</h2>
        <p className="text-lg mb-4">
          Basés à Montpellier, en France, nous sommes fiers d'apporter les saveurs exquises de Madagascar directement aux tables européennes. Notre passion pour la vanille de haute qualité et notre engagement envers des pratiques durables nous permettent de vous offrir le meilleur de Madagascar.
        </p>
        <Link to="/about" className="text-amber-600 hover:text-amber-700 font-semibold">En savoir plus sur notre histoire</Link>
      </section>
    </div>
  );
};

const featuredProducts = [
  { id: 1, name: 'Poudre de Vanille Pure', price: 175.00,  image: localImage },
  { id: 2, name: 'Gousses de Vanille Gourmet', price: 180.00, image: localImage2 },
  { id: 3, name: 'Extrait de Vanille Pur', price: 150.00, image: localImage3 },
];

export default HomePage;