import '@/app/ui/global.css';
import SideNav from '../ADMIN/sidenav';
import { inter } from '../ui/fonts';
import Providers from '../ui/panier/Providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex h-screen">
            <aside className="w-64 bg-black text-fuchsia-100 flex flex-col">
              <SideNav />
            </aside>
            <div className="flex flex-col flex-grow">
              <main className="flex-grow p-6 overflow-y-auto bg-black">
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </Providers >
  );
}
