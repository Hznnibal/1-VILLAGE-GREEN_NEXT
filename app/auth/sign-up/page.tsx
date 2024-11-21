import SignupForm from "@/app/ui/authentification/signup";
import '@/app/ui/global.css';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Inscription',
};

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[800px] flex-col space-y-2.5 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg border-2 border-white p-3 md:h-36">
          <h1 className="mb-6 text-5xl font-bold text-white text-center w-full">
            Créez votre compte
          </h1>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}
