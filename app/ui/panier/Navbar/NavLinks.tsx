"use client";

import Link from "next/link";
import { FC } from "react";

interface NavLinksProps {
    showMobileNav: boolean;
}

const NavLinks: FC<NavLinksProps> = ({ showMobileNav }) => {
    return (
        <ul
            className={`text-slate-50  w-full text-xl mr-12 md:static md:flex md:items-center md:space-y-0 md:space-x-16 md:bg-transparent ${showMobileNav ? "block space-y-4" : "hidden"}`}
        >

            <li className="flex h-[48px] text-l grow items-center justify-center gap-2 rounded-md text-gray-50 p-3 font-medium hover:bg-gray-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
                <Link href="/" className="block py-2">
                    Accueil
                </Link>
            </li>
            <li className="flex h-[48px] text-lg grow items-center justify-center gap-2 rounded-md text-gray-50 p-3 font-medium hover:bg-gray-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
                <Link href="/magasin" className="block py-2">
                    Magasin
                </Link>
            </li>
            <li className="flex h-[48px] text-lg grow items-center justify-center gap-2 rounded-md text-gray-50 p-3 font-medium hover:bg-gray-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
                <Link href="/apropos" className="block py-2">
                    A propos
                </Link>
            </li>
            <li className="flex h-[48px] text-lg grow items-center justify-center gap-2 rounded-md text-gray-50 p-3 font-medium hover:bg-gray-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
                <Link href="/contact" className="block py-2">
                    Contact
                </Link>
            </li>
            <li>
                <div className="hidden w-full h-0"></div>
            </li>
            <li>
                <div className="hidden w-full h-0"></div>
            </li>
        </ul>
    );
};

export default NavLinks;
