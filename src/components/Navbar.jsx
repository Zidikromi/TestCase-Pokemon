import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
  <div className="drawer">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col">
    {/* Navbar - Sticky & Glassmorphism */}
    <nav className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto navbar px-4 sm:px-6">
        {/* Mobile Menu Button */}
        <div className="flex-none lg:hidden">
          <label 
            htmlFor="my-drawer-3" 
            aria-label="open sidebar" 
            className="btn btn-square btn-ghost hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>

        {/* Logo Section */}
        <div className="flex-1 flex items-center gap-2 ml-2 lg:ml-0">
          <img
            src="https://pngimg.com/d/pokemon_logo_PNG12.png"
            alt="Logo"
            className="w-10 h-10 object-contain hover:rotate-12 transition-transform duration-300"
          />
          <img
            src="https://external-preview.redd.it/tQged7mKJ3cUpNMq5IMeceZvyKP3cTyHqhNmKEQ0Vv8.png?width=640&crop=smart&auto=webp&s=5fc89334e792e2c9b294d1d328bf522cdede4cdf"
            alt="Pokemon Text"
            className="hidden sm:block h-8 mt-1"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="flex-none hidden lg:block">
          <ul className="flex items-center gap-1">
            <li>
              <Link
                to="/"
                className="px-6 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/saved"
                className="relative px-6 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-2"
              >
                Saved
                <span className="flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {/* Your Page Content Here */}
  </div>

  {/* Drawer Side - Modern Sidebar */}
  <div className="drawer-side z-50">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="w-80 min-h-full bg-white p-6 shadow-2xl flex flex-col">
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 mb-10 px-2">
         <img src="https://pngimg.com/d/pokemon_logo_PNG12.png" className="w-8 h-8" alt="logo" />
         <span className="text-xl font-black italic text-slate-800 tracking-tighter">POKÉDEX</span>
      </div>

      {/* Sidebar Links */}
      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            className="flex items-center gap-4 p-4 rounded-2xl text-slate-600 font-bold hover:bg-red-50 hover:text-red-600 transition-all group"
            onClick={closeMenu}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-red-500 transition-all"></span>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/saved"
            className="flex items-center gap-4 p-4 rounded-2xl text-slate-600 font-bold hover:bg-red-50 hover:text-red-600 transition-all group"
            onClick={closeMenu}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-red-500 transition-all"></span>
            Saved Collection
          </Link>
        </li>
      </ul>

      {/* Sidebar Footer/Branding */}
      <div className="mt-auto p-4 bg-slate-50 rounded-2xl">
        <p className="text-xs text-slate-400 font-medium text-center">Catch 'em all! v2.0</p>
      </div>
    </div>
  </div>
</div>
  );
};
export default Navbar;
