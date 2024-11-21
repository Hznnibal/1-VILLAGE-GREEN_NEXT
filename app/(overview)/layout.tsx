import { inter } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import { Metadata } from "next";
import SideNav from '../ui/SideNav/sidenav';
import Navbar from '../ui/panier/Navbar';
import Providers from '../ui/panier/Providers';

export const metadata: Metadata = {
  title: 'Village Green',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex h-screen">
            <aside className="w-64 bg-background-color text-blue-950 flex flex-col">
              <SideNav />
            </aside>
            <div className="flex flex-col flex-grow">
              <header className="h-16 bg-171717 shadow-md flex items-center justify-between p-4">
                <Navbar />
              </header>
              <main className="flex-grow overflow-y-auto bg-171717">
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </Providers>
  );
}
