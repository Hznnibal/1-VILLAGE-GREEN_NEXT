import { inter } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import { Metadata } from "next";
import UserButton from '../ui/authentification/user-button';
import Navbar from '../ui/panier/Navbar/Navbar';
import Providers from '../ui/panier/Providers';
import SideNav from '../ui/SideNav/sidenav';

export const metadata: Metadata = {
  title: 'Village Green',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <div className="relative flex h-screen">
            <aside className="w-64 flex-shrink-0 h-full bg-background-color text-blue-950">
              <SideNav />
            </aside>
            <div className="flex-grow flex flex-col bg-171717">
              <header className="h-16 bg-171717 shadow-md flex items-center justify-between p-4 border-b z-10">
                <Navbar />
                <UserButton />
              </header>
              <main className="flex-grow overflow-y-auto p-4 bg-171717">
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </Providers>
  );
}

