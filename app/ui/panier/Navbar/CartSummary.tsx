"use client";

import { useCart } from "@/app/ui/panier/CartProvider";
import { useState } from "react";
import { CartIcon } from "./CartIcon";

const CartSummary = () => {
    const { countAllItems, countTotalPrice } = useCart();
    const [showSideCart, setShowSideCart] = useState(false);


    return (
        <div className="flex items-center space-x-3">
            <p className="font-bold text-slate-50">${countTotalPrice()}</p>
            <button
                className="relative"
                onClick={() => setShowSideCart(!showSideCart)}
                aria-label="Toggle side cart"
            >

                <CartIcon />
                {countAllItems() > 0 && (
                    <span className="absolute -top-3 -right-3 bg-blue-700 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {countAllItems() >= 9 ? "9+" : countAllItems()}
                    </span>
                )}
            </button>
        </div>
    );
};

export default CartSummary;
