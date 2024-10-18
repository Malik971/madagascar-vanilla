import React from 'react';
import { useCart } from '../context/CartContext';
import { useParams, Link } from 'react-router-dom';
import localImage from '../assets/images/poudre-de-vanille-intense-100-pure-madagascar_image.jpg';
import localImage2 from '../assets/images/Gousses_de_Vanille_Gourmet_image.jpg';
import localImage3 from '../assets/images/Extrait_de_Vanille_Pur_image.jpg';


const products = [
  {
    id: 1,
    name: 'Poudre de Vanille Pure',
    price: 175.00,
    image: localImage,
    description: "Notre poudre de vanille pure est fabriquée à partir de gousses de vanille de Madagascar de la plus haute qualité. Parfaite pour la pâtisserie, la cuisine et les boissons, elle apporte une saveur riche et authentique à vos créations culinaires.",
    characteristics: [
      { name: "Origine", value: "Madagascar" },
      { name: "Type", value: "Bourbon (Planifolia)" },
      { name: "Teneur en vanilline", value: "1.5% - 2.0%" },
      { name: "Certification", value: "Biologique" }
    ],
    variants: [
      { size: "50g", price: 175.00 },
      { size: "100g", price: 320.00 },
      { size: "250g", price: 750.00 }
    ]
  },
  {
    id: 2,
    name: 'Gousses de Vanille Gourmet',
    price: 180.00,
    image: localImage2, 
    description: "Les gousses de vanille gourmet sont parfaites pour vos desserts et plats gastronomiques...",
    characteristics: [
      { name: "Origine", value: "Madagascar" },
      { name: "Type", value: "Bourbon (Planifolia)" },
      { name: "Teneur en vanilline", value: "1.7% - 2.2%" },
      { name: "Certification", value: "Biologique" }
    ],
    variants: [
      { size: "50g", price: 180.00 },
      { size: "100g", price: 340.00 },
      { size: "250g", price: 760.00 }
    ]
  },
  {
    id: 3,
    name: 'Extrait de Vanille Pur',
    price: 150.00,
    image: localImage3, 
    description: "Notre extrait de vanille pur est un concentré de saveur...",
    characteristics: [
      { name: "Origine", value: "Madagascar" },
      { name: "Type", value: "Bourbon (Planifolia)" },
      { name: "Teneur en vanilline", value: "1.4% - 1.9%" },
      { name: "Certification", value: "Biologique" }
    ],
    variants: [
      { size: "50ml", price: 150.00 },
      { size: "100ml", price: 290.00 },
      { size: "250ml", price: 670.00 }
    ]
  }
];

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === parseInt(id || '0'));

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4 text-amber-800">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">{product.price.toFixed(2)}€</p>
          <p className="mb-6">{product.description}</p>
          
          <h2 className="text-xl font-semibold mb-2 text-amber-700">Caractéristiques:</h2>
          <ul className="mb-6">
            {product.characteristics.map((char, index) => (
              <li key={index} className="mb-1">
                <span className="font-semibold">{char.name}:</span> {char.value}
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mb-2 text-amber-700">Variantes:</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {product.variants.map((variant, index) => (
              <button key={index} className="border border-amber-600 rounded-lg p-2 text-amber-800 hover:bg-amber-100 transition duration-300">
                {variant.size} - {variant.price.toFixed(2)}€
              </button>
            ))}
          </div>

          <Link to="/cart" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition duration-300 inline-block text-center">
            Ajouter au Panier
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;