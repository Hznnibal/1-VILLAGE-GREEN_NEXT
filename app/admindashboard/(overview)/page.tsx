import StripeChart from '@/app/ADMIN/graphique/CA';
import ListOrders from '@/app/ADMIN/graphique/listLastCharges';
import ListCustomers from '@/app/ADMIN/graphique/listLastCustomers';
import UserRegistrationChart from '@/app/ADMIN/graphique/UserChart';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <main className="container mx-auto py-10">
      <div className="flex gap-6 items-stretch">
        {/* Section de gauche : listes */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex-1">
            <ListCustomers />
          </div>
          <div className="flex-1">
            <ListOrders />
          </div>
        </div>

        {/* Section de droite : graphiques */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex-1 ">
            <UserRegistrationChart />
          </div>
          <div className="flex-1">
            <StripeChart />
          </div>
        </div>
      </div>
    </main>
  );
}
