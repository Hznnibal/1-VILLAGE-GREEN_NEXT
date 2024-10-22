import { ArrowDownCircleIcon, GifIcon } from '@heroicons/react/16/solid';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import { MapIcon } from '@heroicons/react/24/solid';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Guitares', href: '/guitares' },
  { name: 'Pianos', href: '/pianos' },
  { name: 'Basses', href: '/basses' },
  { name: 'Batteries et Percussions', href: '/batteries_et_percussions' },
  { name: 'Claviers et Synthétiseurs', href: '/claviers_et_synthetiseurs' },
  { name: 'Instruments à vents', href: '/instruments_a_vents' },
  { name: 'Instruments Traditionnels', href: '/instruments_traditionnels' },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <p className="hidden md:block">{link.name}</p>
        </a>
      ))}
    </>
  );
}
