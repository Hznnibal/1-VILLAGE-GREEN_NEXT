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
          className="flex h-[48px] grow items-center justify-center gap-2 rounded-md text-gray-50 p-3 text-sm font-medium hover:bg-gray-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <p className="hidden md:block">{link.name}</p>
        </a>
      ))}
    </>
  );
}
