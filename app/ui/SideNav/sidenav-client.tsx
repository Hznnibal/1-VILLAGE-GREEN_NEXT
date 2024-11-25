"use client"; // Assurez-vous que c'est bien le composant côté client

import NavLinks from "@/app/ui/SideNav/nav-links";
import VillageGreenLogo from "@/app/ui/village-logo";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SideNavClient() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 rounded-md bg-slate-900 p-2 text-white shadow-lg transition-colors hover:bg-slate-800 md:hidden"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-dark-gray shadow-lg transition-transform duration-200 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-full flex-col px-3 py-4">
                    <Link
                        href="/"
                        className="mb-6 flex items-center justify-center rounded-md border-2 border-white bg-slate-950 p-4 transition-colors hover:bg-slate-900"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="text-white">
                            <VillageGreenLogo />
                        </div>
                    </Link>

                    <div className="flex grow flex-col justify-between">
                        <div className="space-y-4">
                            <div className="text-center text-xl font-semibold text-white">
                                Nos produits
                            </div>
                            <div className="mx-auto my-1 h-[1px] w-[70%] bg-gray-300" />
                            <NavLinks />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
