import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineFastfood } from "react-icons/md";
import { GlobalContext } from '../../API/GLobalContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const { favorites } = useContext(GlobalContext);

  return (
    <nav className="bg-transparent z-50 bg-white fixed top-0 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:h-16 h-12 lg:px-28">
          <div className="flex-shrink-0">
            <Link to="/" className="text-amber-900 font-bold md:text-2xl text-lg">Cookify</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-gray-500 hover:text-amber-800 transition duration-300 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/searchresults" className="text-gray-500 hover:text-amber-800 transition duration-300 px-3 py-2 rounded-md text-sm font-medium">Explore</Link>
              <Link to="/favorites" className="text-gray-500 hover:text-amber-800 transition duration-300 px-3 py-2 rounded-md text-sm font-medium flex items-baseline gap-x-1">
                Favorites
                <div className='flex'>
                  <MdOutlineFastfood className='text-2xl' />
                  <div className='bg-red-600 text-white flex justify-center ml-1 items-center py-1 h-4 px-1.5 rounded-full text-[10px]'>
                    {favorites.length}
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleNavbar} className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 transition duration-300 ">
              <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white pb-3 flex justify-center`}>
        <div className="px-2 pt-2 pb-3 space-y-4 sm:px-3">
          <Link to="/" className="text-gray-500 hover:text-amber-800 transition duration-300 block px-3 py-2 rounded-md text-base font-medium" onClick={()=>setIsOpen(false)}>Home</Link>
          <Link to="/searchresults" className="text-gray-500 hover:text-amber-800 transition duration-300 block px-3 py-2 rounded-md text-base font-medium" onClick={()=>setIsOpen(false)}>Explore</Link>
          <Link to="/favorites" className="items-baseline text-gray-500 hover:text-amber-800 transition duration-300 block px-3 py-2 rounded-md text-base font-medium" onClick={()=>setIsOpen(false)}>
                Favorites ({favorites.length})
                </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
