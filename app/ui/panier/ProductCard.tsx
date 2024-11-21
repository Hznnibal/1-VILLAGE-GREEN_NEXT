import { Produit } from "@/app/lib/definitions";
import Image from "next/image";
import { FC } from "react";
import BuyingOptions from "./BuyingOptions";

interface Props {
  product: Produit;
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className="w-full h-[32rem] bg-black shadow-md rounded-lg overflow-hidden relative border-2 border-white transition-transform duration-300 ease-in-out transform group hover:scale-105 hover:shadow-[0_4px_15px_rgba(255,255,255,0.2)] flex flex-col">
      <div className="h-[60%] relative">
        <Image
          src={product.photo}
          alt={product.libelle}
          className="w-full h-full object-cover"
          fill
        />
      </div>

      <div className="h-[40%]  flex flex-col justify-between p-4 space-y-2">
        <div>
          <h1 className="font-semibold text-lg text-white">{product.libelle}</h1>
          <div className="flex items-center space-x-3">
            <p className="line-through italic text-gray-500">
              {product.prix + 20} €
            </p>
            <p className="font-semibold text-white">{product.prix} €</p>
          </div>
          <p className="text-gray-400 text-sm line-clamp-2 mt-2">
            {product.description}
          </p>
        </div>

        <span className="absolute top-2 right-2 font-semibold bg-slate-800 p-2 rounded-md inline-block text-sm text-white shadow-md">
          {Math.round((1 - product.prix / (product.prix + 20)) * 100)}% Off
        </span>

        <div>
          <BuyingOptions product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
