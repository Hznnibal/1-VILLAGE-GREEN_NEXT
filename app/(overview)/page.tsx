import Slider from '../ui/carrousel/Slider';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* Carrousel de produits */}
      <p className='text-2xl flex flex-col justify-center ml-15'> Bienvenue chez Village Green</p>
      <Slider/>
    </main>
  );
}
