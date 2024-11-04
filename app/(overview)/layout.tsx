import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import SideNav from '../ui/Navbar (vertical)/sidenav';
import Providers from '../ui/panier/Providers';
import Navbar from '../ui/panier/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex h-screen">
            <aside className="w-64 bg-white text-blue-950 flex flex-col">
              <SideNav />
            </aside>
            <div className="flex flex-col flex-grow">
              <header className="h-16 bg-gray-100 shadow-md flex items-center justify-between p-4">
                <Navbar />
              </header>
              <main className="flex-grow p-6 overflow-y-auto bg-white">
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </Providers>
  );
}
