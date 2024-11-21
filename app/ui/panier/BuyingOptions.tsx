"use client";

import { Produit } from "@/app/lib/definitions";
import { useCart } from "@/app/ui/panier/CartProvider";
import { FC } from "react";
interface Props {
  product: Produit;
}

const BuyingOptions: FC<Props> = ({ product }) => {
  const { updateCart } = useCart();
  const onAddToCartClick = () => {
    updateCart(product, 1);
  };

  return (
    <div className="flex p-2 space-x-2">
      <button
        onClick={onAddToCartClick}
        className="flex-1 border-2 border-blue-50 p-2 rounded-md text-blue-50"
      >
        Ajoutez au panier
      </button>
      <button className="flex-1 bg-blue-50 p-2 rounded-md text-black">
        Payez maintenant
      </button>
    </div>
  );
};

export default BuyingOptions;
