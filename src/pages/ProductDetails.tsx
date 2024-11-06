import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
// Import Swiper styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import images
import localImage from "../assets/images/poudre-de-vanille-intense-100-pure-madagascar_image.jpg";
import localImage2 from "../assets/images/Gousses_de_Vanille_Gourmet_image.jpg";
import localImage3 from "../assets/images/Extrait_de_Vanille_Pur_image.jpg";
import localImage4 from "../assets/images/gousses-de-vanille-bio-de-madagascar-gamme-complete.jpeg";
import localImage5 from "../assets/images/Curcuma_de_Madagascar.jpg";
import localImage6 from "../assets/images/Poivre_Sauvage_Voatsiperifery.jpg";
import localImage7 from "../assets/images/Panier_open_Artisanal_en_Raphia.jpg";

const products = [
  {
    id: 1,
    name: "Poudre de Vanille Pure",
    price: 175.0,
    image: localImage,
    description:
      "Notre poudre de vanille pure est fabriquée à partir de gousses de vanille de Madagascar de la plus haute qualité. Parfaite pour la pâtisserie, la cuisine et les boissons, elle apporte une saveur riche et authentique à vos créations culinaires.",
    characteristics: [
      { name: "Origine", value: "Madagascar" },
      { name: "Type", value: "Bourbon (Planifolia)" },
      { name: "Teneur en vanilline", value: "1.5% - 2.0%" },
      { name: "Certification", value: "Biologique" },
    ],
    variants: [
      { size: "50g", price: 175.0 },
      { size: "100g", price: 320.0 },
      { size: "250g", price: 750.0 },
    ],
  },
  {
    id: 2,
    name: "Gousses de Vanille Gourmet",
    price: 180.0,
    image: localImage2,
    description:
      "Les gousses de vanille gourmet sont parfaites pour vos desserts et plats gastronomiques...",
    characteristics: [
      { name: "Origine", value: "Madagascar" },
      { name: "Type", value: "Bourbon (Planifolia)" },
      { name: "Teneur en vanilline", value: "1.7% - 2.2%" },
      { name: "Certification", value: "Biologique" },
    ],
    variants: [
      { size: "50g", price: 180.0 },
      { size: "100g", price: 340.0 },
      { size: "250g", price: 760.0 },
    ],
  },
  {
    id: 3,
    name: "Extrait de Vanille Pur",
    price: 150.0,
    image: localImage3,
    description: "Notre extrait de vanille pur est un concentré de saveur...",
    characteristics: [
      { name: "Origine", value: "Madagascar" },
      { name: "Type", value: "Bourbon (Planifolia)" },
      { name: "Teneur en vanilline", value: "1.4% - 1.9%" },
      { name: "Certification", value: "Biologique" },
    ],
    variants: [
      { size: "50ml", price: 150.0 },
      { size: "100ml", price: 290.0 },
      { size: "250ml", price: 670.0 },
    ],
  },
  {
    id: 4,
    name: "Gousses de Vanille Rouge",
    price: 140.0,
    image: localImage4,
    description:
      "Les gousses de vanille rouge de Madagascar, cueillies à maturité, sont idéales pour les infusions et préparations culinaires où une saveur intense de vanille est recherchée.",
    characteristics: [
      { name: "Origine", value: "Madagascar" },
      { name: "Type", value: "Rouge (Planifolia)" },
      { name: "Teneur en vanilline", value: "1.2% - 1.6%" },
      { name: "Certification", value: "Biologique" },
    ],
    variants: [
      { size: "50g", price: 140.0 },
      { size: "100g", price: 270.0 },
      { size: "250g", price: 600.0 },
    ],
  },
  {
    id: 5,
    name: "Curcuma de Madagascar",
    price: 50.0,
    image: localImage5,
    description:
      "Le curcuma de Madagascar est réputé pour sa saveur unique et ses propriétés anti-inflammatoires. Idéal pour assaisonner vos plats et boissons.",
    characteristics: [
      { name: "Origine", value: "Madagascar" },
      { name: "Type", value: "Curcuma Longa" },
      {
        name: "Utilisation",
        value: "Cuisine, infusion, médecine traditionnelle",
      },
      { name: "Certification", value: "Biologique" },
    ],
    variants: [
      { size: "100g", price: 50.0 },
      { size: "200g", price: 90.0 },
    ],
  },
  {
    id: 6,
    name: "Poivre Sauvage Voatsiperifery",
    price: 60.0,
    image: localImage6,
    description:
      "Le poivre sauvage Voatsiperifery est une épice rare de Madagascar, connue pour sa saveur boisée et épicée, idéale pour sublimer les viandes et poissons.",
    characteristics: [
      { name: "Origine", value: "Madagascar" },
      { name: "Type", value: "Poivre Sauvage" },
      { name: "Utilisation", value: "Assaisonnement, cuisine gastronomique" },
      { name: "Certification", value: "Biologique" },
    ],
    variants: [
      { size: "50g", price: 60.0 },
      { size: "100g", price: 110.0 },
    ],
  },
  {
    id: 7,
    name: "Panier Artisanal en Raphia",
    price: 45.0,
    image: localImage7,
    description:
      "Ce panier artisanal en raphia, tressé à la main par des artisans malgaches, est parfait pour vos courses ou comme élément décoratif authentique.",
    characteristics: [
      { name: "Origine", value: "Madagascar" },
      { name: "Matériau", value: "Raphia naturel" },
      { name: "Utilisation", value: "Panier de course, décoration" },
      { name: "Certification", value: "Artisanat fait main" },
    ],
    variants: [{ size: "Taille unique", price: 45.0 }],
  },
];

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart(); // Récupérer la fonction addToCart
  const [selectedVariant, setSelectedVariant] = useState(
    products[0].variants[0]
  ); // Variante sélectionnée
  const [quantity, setQuantity] = useState(1); // Quantité par défaut

  const product = products.find((p) => p.id === parseInt(id || "0"));

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]); // Initialiser la variante avec la première du produit trouvé
    }
  }, [product]);

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: selectedVariant.price,
      quantity: quantity,
      variant: selectedVariant.size,
    });
  };

  const handleGoBack = () => {
    navigate(-1); // Cette ligne fait revenir à la page précédente
  };

  // Paramètres pour le slider avec flèches de navigation
  const sliderSettings = {
    dots: true, // Affiche des petits indicateurs pour les images
    infinite: true, // Boucle infinie
    speed: 500, // Vitesse du slide
    slidesToShow: 1, // Nombre d'images à montrer en même temps
    slidesToScroll: 1, // Nombre d'images à faire défiler
    arrows: true, // Affiche des flèches de navigation
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleGoBack}
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all duration-300 ease-in-out mb-4"
      >
        Retour
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          {/* Slider d'images avec flèches */}
          <Slider {...sliderSettings}>
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            {/* Si le produit avait plusieurs images, tu pourrais les ajouter ici */}
            {/* Ex : 
                <div><img src={localImage2} alt="autre image" /></div>
            */}
          </Slider>
        </div>
        <div className="animate-fadeIn">
          <h1 className="text-3xl font-bold mb-4 text-amber-800">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold mb-4">
            {selectedVariant.price.toFixed(2)}€
          </p>
          <p className="mb-6">{product.description}</p>

          <h2 className="text-xl font-semibold mb-2 text-amber-700">
            Caractéristiques:
          </h2>
          <ul className="mb-6">
            {product.characteristics.map((char, index) => (
              <li key={index} className="mb-1">
                <span className="font-semibold">{char.name}:</span> {char.value}
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mb-2 text-amber-700">
            Variantes:
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {product.variants.map((variant, index) => (
              <button
                key={index}
                className={`border border-amber-600 rounded-lg p-2 text-amber-800 hover:bg-amber-100 transition-all duration-300 ${
                  selectedVariant.size === variant.size ? "bg-amber-100" : ""
                }`}
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.size} - {variant.price.toFixed(2)}€
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="mr-2">Quantité:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-transform transform hover:scale-105 duration-300 inline-block text-center"
          >
            Ajouter au Panier
          </button>

          <div className="mt-4">
            {/* Effet sur le bouton « Voir le panier » */}
            <Link
              to="/CartSidebar"
              className="text-amber-600 hover:underline hover:text-amber-800 hover:scale-105 transition-transform transform duration-300"
            >
              Voir le panier
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
