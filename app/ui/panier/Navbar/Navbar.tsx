'use client';

import { FC, useState } from "react";
import SideCart from "../SideCart";
import CartSummary from "./CartSummary";
import NavLinks from "./NavLinks";

const Navbar: FC = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showSideCart, setShowSideCart] = useState(false);

  return (
    <>
      <div className="mx-auto">
        <nav className="flex items-center justify-between w-full p-4">
          {/* Mobile menu button */}
          <button
            className="block md:hidden"
            onClick={() => setShowMobileNav(!showMobileNav)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-1 bg-gray-800 mb-1" />
            <div className="w-6 h-1 bg-gray-800 mb-1" />
            <div className="w-6 h-1 bg-gray-800" />
          </button>

          {/* Navigation links */}
          <NavLinks showMobileNav={showMobileNav} />

          {/* Cart and total */}
          <button
            className="relative"
            onClick={() => setShowSideCart(!showSideCart)}
            aria-label="Toggle side cart"
          >
            <CartSummary />
          </button>
        </nav>
      </div>

      <SideCart
        visible={showSideCart}
        onRequestClose={() => setShowSideCart(false)}
      />
    </>
  );
};

export default Navbar;
