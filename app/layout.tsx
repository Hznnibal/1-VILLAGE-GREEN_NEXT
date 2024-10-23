import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import SideNav from './ui/dashboard/sidenav';
import Providers from './ui/panier/Providers';
import Navbar from './ui/panier/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          {/* La Navbar est maintenant persistante à travers les pages */}
          <Navbar />
          {/* Conteneur principal avec disposition en colonne */}
          <div className="flex flex-col h-screen">
            <div className="flex flex-col md:flex-row flex-grow">
              <SideNav />
              {/* Contenu de la page */}
              <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
              </div>
            </div>
          </div>
        </body>
      </html>
    </Providers>
  );
}