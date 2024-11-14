'use client'

import { useCart } from "@/app/ui/panier/CartProvider";
import Image from "next/image";
import { FC, useEffect } from "react";

const CheckoutPage: FC = () => {
  const {
    countTotalPrice,
    items: cartItems,
    removeFromCart,
    updateCart,
    clearCart,
  } = useCart();

  const handleCheckout = async () => {
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url; // Redirection vers Stripe Checkout
    }
  };

  useEffect(() => {
    const result = localStorage.getItem("cartItems");
    if (result !== null) {
      console.log(JSON.parse(result));
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="py-4 text-2xl">Checkout</h1>
      {cartItems.map((cartItem) => (
        <div key={cartItem.product.id_produit} className="p-4">
          <div className="flex space-x-4">
            <Image
              src={cartItem.product.photo}
              alt={cartItem.product.libelle}
              className="rounded object-cover"
              width={64}
              height={64}
            />
            <div className="flex-1">
              <h2 className="font-semibold">{cartItem.product.libelle}</h2>
              <div className="flex text-gray-400 text-sm space-x-1">
                <span>{cartItem.count}</span>
                <span>x</span>
                <span>{(cartItem.count * cartItem.product.prix).toFixed(2)}</span>
              </div>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => removeFromCart(cartItem.product)}
                className="text-xs uppercase hover:underline"
              >
                Supprimer
              </button>
              <div className="flex items-center justify-between">
                <button onClick={() => updateCart(cartItem.product, -1)}> - </button>
                <span className="text-xs">{cartItem.count}</span>
                <button onClick={() => updateCart(cartItem.product, 1)}> + </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="py-4 flex flex-col items-end">
        <h1 className="font-semibold text-xl uppercase">Total</h1>
        <p className="font-semibold">
          <span className="text-gray-400 font-normal">Total: </span> ${countTotalPrice()}
        </p>

        <button
          onClick={handleCheckout}
          className="border-2 border-blue-600 py-2 px-6 mt-4 rounded text-blue-600 uppercase"
        >
          Commandez
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
