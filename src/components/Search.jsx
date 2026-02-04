import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // console.log('Search Query:', event.target.value);
  };
  
  const handleSearch = () => {
    onSearch(searchQuery);
    // console.log('Performing Search:', searchQuery);
  };

  return (
   <div className="flex justify-center mt-8 px-4">
  <div className="relative group w-full max-w-md">
    {/* Icon Search di Sisi Kiri (Visual Cue) */}
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors duration-300">
      <IoSearch size={20} />
    </div>

    <input
      type="text"
      placeholder="Search Pokemon..."
      className="w-full h-14 pl-12 pr-32 bg-white border border-gray-100 rounded-2xl shadow-sm 
                 focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-red-400 
                 transition-all duration-300 text-slate-700 font-medium placeholder:text-gray-400"
      value={searchQuery}
      onChange={handleSearchChange}
      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
    />

    {/* Tombol Search di Dalam Input */}
    <button 
      onClick={handleSearch}
      className="absolute right-2 top-2 bottom-2 px-6 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl
                shadow-lg shadow-red-200 active:scale-95 transition-all duration-200 flex items-center gap-2 text-sm"
    >
      <span>Search</span>
    </button>
  </div>
</div>
  );
}

export default Search;