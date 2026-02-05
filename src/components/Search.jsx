import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2"; // Icon tambahan untuk pemanis

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex justify-center w-full px-4">
      <div className="relative group w-full max-w-xl">
        
        {/* Glow Effect (Akan muncul saat input di-focus) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-[2rem] blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>

        <div className="relative flex items-center">
          {/* Search Icon Left */}
          <div className="absolute left-5 text-slate-400 group-focus-within:text-red-500 transition-colors duration-300">
            <IoSearch size={22} />
          </div>

          <input
            type="text"
            placeholder="Search your Pokemon..."
            className="w-full h-16 pl-14 pr-40 bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-[1.8rem] 
                       text-slate-700 font-semibold placeholder:text-slate-400 placeholder:font-medium
                       focus:outline-none focus:bg-white focus:border-red-300 transition-all duration-300
                       shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] focus:shadow-[0_20px_40px_-15px_rgba(239,68,68,0.15)]"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />

          {/* Action Buttons Group */}
          <div className="absolute right-2 flex items-center gap-2">
            {/* Shortcut Indicator (Visual Cue Modern) */}
            <kbd className="hidden md:inline-flex h-8 items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 font-mono text-[10px] font-medium text-slate-400">
              <span className="text-xs">Enter</span>
            </kbd>

            <button 
              onClick={handleSearch}
              className="h-12 px-7 bg-slate-900 hover:bg-red-600 text-white font-bold rounded-[1.2rem]
                        shadow-lg shadow-slate-200 hover:shadow-red-200 active:scale-95 transition-all duration-300 
                        flex items-center justify-center text-sm tracking-wide"
            >
              Search
            </button>
          </div>
        </div>

        {/* Suggestion Tag (Opsional - Untuk pemanis UI) */}
        <div className="flex gap-4 mt-3 ml-6 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <span className="group-hover:text-red-400 transition-colors cursor-pointer">#Pikachu</span>
          <span className="group-hover:text-red-400 transition-colors cursor-pointer">#Charizard</span>
          <span className="group-hover:text-red-400 transition-colors cursor-pointer">#Legendary</span>
        </div>
      </div>
    </div>
  );
}

export default Search;