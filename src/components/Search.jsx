import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    onSearch(value); 
  };

  return (
    <div className="flex flex-col items-center w-full px-4 group">
      <div className="relative w-full max-w-lg transition-all duration-500">
        
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-slate-400 group-focus-within:text-red-500 transition-colors duration-300 pointer-events-none">
          <IoSearchOutline size={20} strokeWidth={2} />
        </div>

        <input
          type="text"
          placeholder="Find a Pokémon..."
          className="w-full h-14 pl-14 pr-6 bg-white border-none rounded-2xl
                     text-slate-600 font-medium placeholder:text-slate-300
                     focus:outline-none focus:ring-0
                     shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                     focus:shadow-[0_20px_40px_rgba(0,0,0,0.08)] 
                     transition-all duration-500 ease-out"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
          <kbd className="hidden sm:flex h-6 w-6 items-center justify-center rounded-md border border-slate-100 bg-slate-50 font-sans text-[10px] font-bold text-slate-400 shadow-sm">
            /
          </kbd>
        </div>
      </div>

      <div className="flex gap-6 mt-4 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-700">
        {['Pikachu', 'Gengar', 'Mewtwo'].map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setSearchQuery(tag);
              onSearch(tag);
            }}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-red-400 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Search;