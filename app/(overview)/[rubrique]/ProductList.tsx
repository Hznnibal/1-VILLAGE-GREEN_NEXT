'use client';

import ProductCard from '@/app/ui/panier/ProductCard';
import { useState } from 'react';
import FilterMenu from './FilterMenu';

type ProductListProps = {
    produits: any[];
    rubriques: any[];
    selectedRubrique: number;
};

export default function ProductList({
    produits,
    rubriques,
    selectedRubrique,
}: ProductListProps) {
    const [selectedSousRubrique, setSelectedSousRubrique] = useState<number | null>(null);

    const sousRubriques = rubriques.filter(
        (r) => r.id_rubrique_1 === selectedRubrique
    );

    const filteredProduits = selectedSousRubrique
        ? produits.filter((p) => p.id_rubrique === selectedSousRubrique)
        : produits.filter((p) =>
            sousRubriques.some((sr) => sr.id_rubrique === p.id_rubrique)
        );

    return (
        <>
            <FilterMenu
                rubriques={rubriques}
                selectedRubrique={selectedRubrique}
                setSelectedSousRubrique={setSelectedSousRubrique}
                selectedSousRubrique={selectedSousRubrique}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProduits.map((produit) => (
                    <ProductCard key={produit.id_produit} product={produit} />
                ))}
            </div>
        </>
    );
}