import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export interface Produit {
  id_produit: number;
  description: string;
  photo: string;
  libelle: string;
  prix: number;
}

type CartItem = {
  product: Produit;
  count: number;
};

interface CartContext {
  items: CartItem[];
  updateCart(product: Produit, qty: number): void;
  removeFromCart(product: Produit): void;
  countAllItems(): number;
  countTotalPrice(): string;
  clearCart(): void;
}

const updateCartInLS = (products: CartItem[]) => {
  localStorage.setItem("cartItems", JSON.stringify(products));
};

const CartContext = createContext<CartContext>({
  items: [],
  updateCart() {},
  removeFromCart() {},
  clearCart() {},
  countAllItems() {
    return 0;
  },
  countTotalPrice() {
    return "0";
  },
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const removeFromCart = (product: Produit) => {
    const newProducts = cartItems.filter(
      (item) => item.product.id_produit !== product.id_produit
    );
    setCartItems(newProducts);
    updateCartInLS(newProducts);
  };

  const clearCart = () => {
    setCartItems([]);
    updateCartInLS([]);
  };

  const updateCart = (product: Produit, qty: number) => {
    const finalCartItems = [...cartItems];
    const index = cartItems.findIndex(
      (item) => product.id_produit === item.product.id_produit
    );

    if (index === -1) {
      finalCartItems.push({ count: qty, product });
    } else {
      finalCartItems[index].count += qty;
    }

    if (finalCartItems[index]?.count === 0) {
      removeFromCart(product);
    } else {
      setCartItems(finalCartItems);
      updateCartInLS(finalCartItems);
    }
  };

  const countAllItems = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.count, 0);
  };

  const countTotalPrice = () => {
    return cartItems
      .reduce(
        (total, cartItem) =>
          total + cartItem.product.prix * cartItem.count,
        0
      )
      .toFixed(2);
  };

  useEffect(() => {
    const result = localStorage.getItem("cartItems");
    if (result !== null) {
      setCartItems(JSON.parse(result));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        updateCart,
        removeFromCart,
        countTotalPrice,
        countAllItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
