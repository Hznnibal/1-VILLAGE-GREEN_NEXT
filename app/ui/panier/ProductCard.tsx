import Image from "next/image";
import { FC } from "react";
import { Produit } from "@/app/lib/definitions"; // Assurez-vous d'importer le type 'Produit'
import BuyingOptions from "./BuyingOptions";

interface Props {
  product: Produit; // Utilisation du type 'Produit' correspondant à la table SQL
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className="w-full bg-white shadow-md rounded overflow-hidden relative">
      <div className="w-full aspect-square relative">
        <Image
          src={product.photo} // Utilise 'photo' qui correspond à l'image du produit dans votre table
          alt={product.libelle} // Utilise 'libelle' comme titre du produit
          className="w-full aspect-square object-cover"
          fill
        />
      </div>

      <div className="p-4 space-y-2">
        <h1 className="font-semibold text-2xl">{product.libelle}</h1> {/* Utilisation de 'libelle' pour le nom du produit */}
        <div className="flex items-center space-x-3">
          {/* Si vous souhaitez ajouter un prix barré, assurez-vous de gérer les prix promotionnels ou les réductions */}
          <p className="line-through italic text-gray-500">
            Prix Original: {product.prix + 20} € {/* Exemple de prix barré */}
          </p>
          <p className="font-semibold">Prix: {product.prix} €</p> {/* Affichage du prix réel */}
        </div>
      </div>

      {/* Exemple pour afficher un pourcentage de réduction si applicable */}
      <span className="absolute top-2 right-2 font-semibold bg-orange-600 p-2 rounded-md inline-block text-sm text-white shadow-md">
        {Math.round((1 - product.prix / (product.prix + 20)) * 100)}% Off {/* Exemple de calcul */}
      </span>

      <BuyingOptions product={product} />
    </div>
  );
};

export default ProductCard;
