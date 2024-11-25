import { lusitana } from '@/app/ui/fonts';
import { CogIcon } from '@heroicons/react/24/outline';
CogIcon

export default function VillageGreenLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <CogIcon className="h-12 w-12 rotate-[15deg] ml-5" />
      <p className="text-[30px]">Village Green</p>
    </div>
  );
}
