import { fetchProduits, fetchRubriques } from '@/app/lib/data';
import { redirect } from 'next/navigation';
import ProductList from './ProductList';

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
  synthetiseurs: 14,
  'pianos-scene': 15,
  instruments_a_vents: 16,
  'cuivres': 17,
  'bois': 18,
  instruments_traditionnels: 19,
  'cordes-frottees': 20,
  'percussions-traditionnelles': 21,
} as const;

type RubriqueKeys = keyof typeof RUBRIQUES;

export async function generateStaticParams() {
  return Object.keys(RUBRIQUES).map((rubrique) => ({
    rubrique,
  }));
}

export default async function InstrumentsPage({
  params,
}: {
  params: { rubrique: string };
}) {
  const resolvedParams = await params;
  const rubrique = resolvedParams.rubrique;

  if (!rubrique) {
    redirect('/');
  }



  const rubriqueKey = rubrique as RubriqueKeys;
  const idRubrique = RUBRIQUES[rubriqueKey];

  if (!idRubrique) {
    redirect('/');
  }

  const [produits, rubriques] = await Promise.all([
    fetchProduits(),
    fetchRubriques(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductList
        produits={produits}
        rubriques={rubriques}
        selectedRubrique={idRubrique}
      />
    </div>
  );
}