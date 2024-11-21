import LoginForm from '@/app/ui/authentification/login-form';
import '@/app/ui/global.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connexion',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-center justify-center rounded-lg border-2 border-white p-3 md:h-36">
          <h1 className="text-4xl font-bold text-white text-center w-full">
            Connexion
          </h1>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
