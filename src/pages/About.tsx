import React from 'react';
import localImage4 from '../assets/images/JasonEtMalik.jpg';
import localImage5 from '../assets/images/agriculture_mada.jpg';
import localImage6 from '../assets/images/qualite_vanille_madagascar.jpg';


const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Titre principal */}
      <h1 className="text-3xl font-bold mb-6 text-amber-800">Notre Histoire : Une Passion Pour la Vanille Authentique de Madagascar</h1>
      
      {/* Section sur l'origine de l'entreprise */}
      <p className="mb-4">
        Chez <strong>Madagascar Vanilla</strong>, nous sommes bien plus qu'une entreprise d'importation de vanille. Nous sommes une équipe de passionnés, chacun avec un parcours unique, mais tous deux unis par un seul but : apporter la meilleure vanille directement depuis Madagascar jusque chez vous. 
      </p>
      <p className="mb-4">
        Après avoir terminé nos études en transport et logistique, et en informatique, nous avons décidé de combiner nos compétences pour créer quelque chose de spécial. Forts de nos expériences respectives et de nos liens personnels avec les producteurs locaux à Madagascar, nous avons choisi d'apporter au marché français un produit de qualité supérieure : la <strong>vanille de Madagascar</strong>.
      </p>
      
      {/* Ajout de l'image illustrant Madagascar */}
      <div className="flex justify-center my-6">
        <img src={localImage5} alt="Plantation de vanille à Madagascar" className="rounded-lg shadow-lg" width={400} height={300} />
      </div>
      
      {/* Section sur la qualité et les relations directes avec les agriculteurs */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-amber-700">La Qualité Avant Tout</h2>
      <p className="mb-4">
        La vanille que nous importons n'est pas simplement un produit parmi tant d'autres. Nous avons tissé des relations solides avec des agriculteurs locaux de la région de Bada, à Madagascar. Grâce à ces relations directes, nous pouvons garantir non seulement une <strong>traçabilité irréprochable</strong>, mais également une qualité exceptionnelle. 
      </p>
      <p className="mb-4">
        En travaillant main dans la main avec ces producteurs, nous avons la certitude que chaque gousse de vanille est cultivée de manière durable et équitable. Cela signifie que vous recevez un produit authentique, riche en saveurs, tout en soutenant directement les communautés locales.
      </p>
      
      {/* Ajout d'une image montrant les agriculteurs à Madagascar */}
      <div className="flex justify-center my-6">
        <img src={localImage6} alt="Agriculteurs locaux à Madagascar" className="rounded-lg shadow-lg" width={400} height={300} />
      </div>

      {/* Section sur l'expansion de l'entreprise et l'ambition */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-amber-700">Une Entreprise en Pleine Croissance</h2>
      <p className="mb-4">
        Cela fait plus d'un an et demi que nous importons de la vanille de manière indépendante, sans site web. Aujourd'hui, après avoir consolidé nos processus et augmenté le volume de nos importations, nous avons décidé d'aller plus loin. Nous avons lancé ce site pour atteindre un plus grand public et faire découvrir cette vanille d'exception aux professionnels de la cuisine, pâtissiers, et amateurs de gastronomie.
      </p>
      <p className="mb-4">
        Grâce à nos connaissances en logistique et en développement web, nous avons la vision et les compétences nécessaires pour faire de <strong>Madagascar Vanilla</strong> une référence incontournable pour l'importation de vanille de qualité. Ce projet, c'est plus qu'un simple business, c'est notre engagement à faire découvrir un produit de haute qualité tout en valorisant les producteurs malgaches.
      </p>

      {/* Ajout d'une image de votre équipe */}
      <div className="flex justify-center my-6">
        <img src={localImage4} alt="Agriculteurs locaux à Madagascar" className="rounded-lg shadow-lg" width={400} height={300} />
      </div>

      {/* Section sur l'avenir et l'impact */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-amber-700">Notre Vision pour l'Avenir</h2>
      <p className="mb-4">
        Avec Madagascar Vanilla, nous ne faisons que commencer. Nous voulons non seulement devenir une référence dans l'importation de vanille de Madagascar, mais également renforcer l'impact positif sur les producteurs locaux. En élargissant notre réseau de distribution et en augmentant nos importations, nous sommes déterminés à offrir la meilleure qualité de vanille tout en soutenant les communautés locales.
      </p>

      {/* Appel à l'action pour montrer votre engagement */}
      <p className="font-semibold text-lg mt-8 text-center">
        <em>Nous sommes une équipe jeune et passionnée, prête à faire découvrir au monde la richesse de la vanille malgache. Rejoignez-nous dans cette aventure !</em>
      </p>
    </div>
  );
};

export default About;
