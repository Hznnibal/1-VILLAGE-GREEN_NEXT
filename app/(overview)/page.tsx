import { auth } from '@/auth';
import Slider from '../ui/carrousel/Slider';
import { getUser } from '@/app/lib/usertest'; // Assurez-vous que vous avez une fonction getUser appropriée

export default async function Page() {

  const session = await auth();
  let user = null;

  if (session && session.user && session.user.email) { // Ajout d'une vérification pour session
    user = await getUser(session.user.email); // Récupérer l'utilisateur uniquement si l'utilisateur est connecté
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* Message de bienvenue personnalisé */}
      <p className="text-2xl flex flex-col justify-center ml-15">
        {user ? `Rebienvenue ${user.prenom}` : 'Bienvenue chez Village Green'}
      </p>
      <Slider />
    </main>
  );
}
