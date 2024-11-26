"use client";

import VillageGreenLogo from "@/app/ui/village-logo";
import { cn } from "@/app/utils/utils";
import {
  ChevronDown,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  UserIcon,
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  title: string;
  href?: string;
  icon: React.ReactNode;
  submenu?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admindashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Commande",
    icon: <ShoppingCart className="h-5 w-5" />,
    submenu: [
      { title: "Historique commande", href: "/admindashboard/commande/historique" },
      { title: "Chiffre d'affaire", href: "/admindashboard/commande/chiffre_daffaire" },
      { title: "Produit les plus vendus", href: "/admindashboard/commande/produits-plus-vendus" },
    ],
  },
  {
    title: "Clients",
    href: "admindashboard/clients",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Gérer les rubriques",
    icon: <Settings className="h-5 w-5" />,
    submenu: [
      { title: "Produits", href: "/admindashboard/rubriques/produits" },
      { title: "Rubriques", href: "/admindashboard/rubriques/rubriques" },
      { title: "Fournisseurs", href: "/admindashboard/rubriques/fournisseur" },
    ],
  },
];


export default function SideNav() {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const pathname = usePathname();

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md bg-slate-950 p-4 md:h-40 border-2 border-white"
        href="/"
      >
        <div className=" text-white md:w-64">
          <VillageGreenLogo />
        </div>
      </Link>


      <nav className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {navItems.map((item) => (
          <div key={item.title} className="space-y-1">
            {item.submenu ? (
              <div>
                <button
                  onClick={() => toggleMenu(item.title)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    openMenus[item.title] ? "bg-accent text-accent-foreground" : "text-foreground"
                  )}
                >
                  <span className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      openMenus[item.title] ? "rotate-180" : ""
                    )}
                  />
                </button>
                {openMenus[item.title] && (
                  <div className="mt-1 ml-4 pl-4 border-l space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "block px-4 py-2 text-sm rounded-lg transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                          isActive(subItem.href)
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href!}
                className={cn(
                  "flex items-center space-x-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive(item.href!)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            )}
          </div>
        ))}
        <Link href="/admindashboard" className="flex items-center gap-2 p-2 text-sm font-medium text-blue-50">
          <UserIcon className="w-6" />
          <span className="hidden md:block">######</span>
        </Link>
      </nav>
    </div>
  );
}
