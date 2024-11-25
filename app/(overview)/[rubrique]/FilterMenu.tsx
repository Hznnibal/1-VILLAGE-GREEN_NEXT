'use client';

type FilterMenuProps = {
    rubriques: any[];
    selectedRubrique: number;
    selectedSousRubrique: number | null;
    setSelectedSousRubrique: (id: number | null) => void;
};

export default function FilterMenu({
    rubriques,
    selectedRubrique,
    selectedSousRubrique,
    setSelectedSousRubrique,
}: FilterMenuProps) {
    const sousRubriques = rubriques.filter(
        (rubrique) => rubrique.id_rubrique_1 === selectedRubrique
    );

    return (
        <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
                <button
                    onClick={() => setSelectedSousRubrique(null)}
                    className={`px-4 py-2 rounded-full transition-all duration-200 ${selectedSousRubrique === null
                        ? 'bg-black text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                >
                    Tous
                </button>
                {sousRubriques.map((sousRubrique) => (
                    <button
                        key={sousRubrique.id_rubrique}
                        onClick={() => setSelectedSousRubrique(sousRubrique.id_rubrique)}
                        className={`px-4 py-2 rounded-full transition-all duration-200 ${selectedSousRubrique === sousRubrique.id_rubrique
                            ? 'bg-black text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            }`}
                    >
                        {sousRubrique.libelle}
                    </button>
                ))}
            </div>
        </div>
    );
}