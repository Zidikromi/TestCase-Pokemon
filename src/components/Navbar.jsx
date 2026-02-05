import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Squad', path: '/saved' },
  ];

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        <nav className="sticky top-0 z-40 w-full bg-white/60 backdrop-blur-xl border-b border-slate-100/50">
          <div className="max-w-7xl mx-auto navbar px-6 h-20">
            <div className="flex-none lg:hidden">
              <label 
                htmlFor="my-drawer-3" 
                className="btn btn-ghost btn-circle text-slate-600 hover:bg-slate-100"
              >
                <IoMenuOutline size={28} />
              </label>
            </div>

            <div className="flex-1 flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors duration-500 shadow-lg shadow-slate-200">
                  <img
                    src="https://pngimg.com/d/pokemon_logo_PNG12.png"
                    alt="Logo"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <span className="text-lg font-black tracking-tighter text-slate-900 hidden sm:block">
                  POKEMON
                </span>
              </Link>
            </div>

            <div className="flex-none hidden lg:block">
              <ul className="flex items-center gap-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                        location.pathname === link.path
                          ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                          : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <div className="w-72 min-h-full bg-white p-8 flex flex-col">
          <div className="flex items-center justify-between mb-12">
            <span className="text-2xl font-black tracking-tighter italic">MENU</span>
            <label htmlFor="my-drawer-3" className="cursor-pointer text-slate-400 hover:text-slate-900 transition-colors">
              <IoCloseOutline size={30} />
            </label>
          </div>

          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block text-2xl font-black tracking-tight transition-all ${
                    location.pathname === link.path ? 'text-red-600' : 'text-slate-300 hover:text-slate-900'
                  }`}
                  onClick={() => document.getElementById('my-drawer-3').checked = false}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto border-t border-slate-50 pt-6">
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Trainer Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;