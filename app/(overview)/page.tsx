import { getUser } from '@/app/lib/getuser';
import { auth } from '@/auth';
import Slider from '../ui/carrousel/Slider';

export default async function Page() {

  const session = await auth();
  let user = null;

  if (session && session.user && session.user.email) {
    user = await getUser(session.user.email);
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <p className="text-2xl flex flex-col justify-center ml-15 text-slate-50 mb-5">
        {user ? `Rebienvenue ${user.prenom}` : 'Bienvenue chez Village Green'}
      </p>
      <Slider />
    </main>
  );
}

