import { useCart } from "@/app/ui/panier/CartProvider";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface Props {
  visible?: boolean;
  onRequestClose?(): void;
}

const SideCart: FC<Props> = ({ visible, onRequestClose }) => {
  const {
    items: cartItems,
    updateCart,
    removeFromCart,
    countTotalPrice,
    clearCart,
  } = useCart();
  const router = useRouter();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <div
      style={{ right: visible ? "0" : "-100%" }}
      className="shadow-md transition-all w-96 bg-white min-h-screen fixed right-0 top-0 flex flex-col z-50"
    >
      <div className="p-4 flex justify-between">
        <h1 className="font-semibold uppercase text-gray-600">Panier</h1>
        <button onClick={clearCart} className="uppercase text-sm">
          Tout supprimer
        </button>
      </div>
      <div className="w-full h-0.5 bg-gray-200" />

      {cartItems.map((cartItem) => {
        return (
          <div key={cartItem.product.id_produit} className="p-4">
            <div className="flex space-x-4">
              <Image
                src={cartItem.product.photo} // Utilisation de 'photo' au lieu de 'thumbnail'
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
                  <button onClick={() => updateCart(cartItem.product, -1)}>
                    -
                  </button>
                  <span className="text-xs">{cartItem.count}</span>
                  <button onClick={() => updateCart(cartItem.product, 1)}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="w-full h-0.5 bg-gray-200" />

      <div className="mt-auto p-4">
        <div className="py-4">
          <h1 className="font-semibold text-xl uppercase">Total</h1>
          <p className="font-semibold">
            <span className="text-gray-400 font-normal">
              The total of your cart is:
            </span>{" "}
            ${countTotalPrice()}
          </p>
        </div>

        <button
          onClick={() => {
            if (isLoggedIn) {
              console.log("send data to the server and create payment link");
              router.push("/checkout");
            } else {
              router.push("/auth/sign-in");
            }
            onRequestClose && onRequestClose();
          }}
          className="border-2 border-blue-600 py-2 w-full rounded text-blue-600 uppercase"
        >
          Commandez
        </button>
        <button
          onClick={onRequestClose}
          className="outline-none block mt-4 text-center w-full uppercase"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default SideCart;
