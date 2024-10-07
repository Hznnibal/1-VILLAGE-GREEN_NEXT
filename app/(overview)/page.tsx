import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import Slider from '../ui/carrousel/Slider';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* Carrousel de produits */}
      <Slider/>

      {/* Section principale */}
      <div className="mt-8 flex flex-col items-center gap-6 md:flex-row">
        <div className="flex flex-col items-start justify-center gap-6 bg-gray-50 p-6 rounded-lg md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800">Découvrez nos instruments</h2>
          <p className="text-lg text-gray-700">
            Exprimez votre talent à travers une large gamme d'instruments de musique classique. Profitez de nos offres exclusives sur des violons, pianos, guitares et bien plus.
          </p>
          <Link
            href="/shop"
            className="flex items-center gap-3 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-blue-400"
          >
            <span>Voir la boutique</span> <ArrowRightIcon className="w-5" />
          </Link>
        </div>

        {/* Section promotionnelle */}
        <div className="flex flex-col items-center justify-center p-6 bg-blue-100 rounded-lg md:w-1/2">
          <h3 className="text-xl font-bold text-gray-800">Offres spéciales</h3>
          <p className="text-gray-600">
            Ne manquez pas nos offres exclusives sur une sélection d'instruments. Des réductions allant jusqu'à 30% !
          </p>
          <Link
            href="/promotions"
            className="mt-4 rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-400"
          >
            Découvrir les offres
          </Link>
        </div>
      </div>
    </main>
  );
}
