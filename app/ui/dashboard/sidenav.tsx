'use client'

import { useState } from 'react';

import NavLinks from '@/app/ui/dashboard/nav-links';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className={`flex flex-col px-3 py-4 md:px-2 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <form>
          </form>
        </div>
      </div>
      <button
        className="p-2"
        onClick={toggleSidebar}
      >
        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-8" />}
      </button>
    </div>
  );
}
