import { fetchProduits, fetchRubriques } from '@/app/lib/data';
import ProductCard from '@/app/ui/panier/ProductCard';
import { redirect } from 'next/navigation';

const RUBRIQUES = {
  guitares: 1,
  'guitares-acoustiques': 2,
  'guitares-electriques': 3,
  'guitares-classiques': 4,
  pianos: 5,
  'pianos-acoustiques': 6,
  'pianos-numeriques': 7,
  basses: 8,
  'basses-electriques': 9,
  batteries_et_percussions: 10,
  'batteries-acoustiques': 11,
  'batteries-electroniques': 12,
  claviers_et_synthetiseurs: 13,
  'synthetiseurs': 14,
  'pianos-scene': 15,
  instruments_a_vents: 16,
  'cuivres': 17,
  'bois': 18,
  instruments_traditionnels: 19,
  'cordes-frottees': 20,
  'percussions-traditionnelles': 21,
};

type RubriqueKeys = keyof typeof RUBRIQUES;

interface Produit {
  id_produit: number;
  description: string;
  photo: string;
  libelle: string;
  prix: number;
  id_rubrique: number;
  active:boolean;
  id_fournisseur:number;
}

interface Rubrique {
  id_rubrique: number;
  libelle: string;
  id_rubrique_1: number | null; // Peut être null si la rubrique est une catégorie principale
}

export async function generateStaticParams() {
  return Object.keys(RUBRIQUES).map((rubrique) => ({
    rubrique,
  }));
}

export default async function InstrumentsPage({ params }: { params: { rubrique: string } }) {
  const rubriqueKey = params.rubrique as RubriqueKeys;

  // Vérifier si la rubrique existe dans les RUBRIQUES
  if (!RUBRIQUES[rubriqueKey]) {
    return redirect("/");
  }

  const idRubrique = RUBRIQUES[rubriqueKey];

  // Fetch des produits et des rubriques depuis la base de données
  const produits: Produit[] = await fetchProduits();
  const rubriques: Rubrique[] = await fetchRubriques(); // Ajout pour récupérer les rubriques

  // Filtrer les produits selon la rubrique
  const produitsFiltres = produits.filter((p) => p.id_rubrique === idRubrique);

  // Trouver les sous-rubriques
  const sousRubriques = rubriques.filter((r) => r.id_rubrique_1 === idRubrique);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {sousRubriques.map((sousRubrique) => {
          // Filtrer les produits selon la sous-rubrique
          const produitsSousRubrique = produits.filter((p) => p.id_rubrique === sousRubrique.id_rubrique);

          return (
            <div key={sousRubrique.id_rubrique}>
              <h3 className="font-bold text-lg">{sousRubrique.libelle}</h3>

              <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-1 gap-10">
                {produitsSousRubrique.map((produit) => (
                  <ProductCard key={produit.id_produit} product={produit} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  
}
