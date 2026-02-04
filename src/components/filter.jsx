import React, { useEffect, useState } from 'react';
import { GetTypes } from '../api';

const Filter = ({ onChange }) => {
  const [types, setTypes] = useState([]);

  const handleSelectChange = (event) => {
    onChange(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetTypes();
        setTypes(result);
      } catch (error) {
        console.error('Error fetching Types data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredTypes = types.filter((type) => type.name !== 'unknown' && type.name !== 'shadow');

  return (
<div className="relative group w-full max-w-xs">
  {/* Label mungil di atas border */}
  <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 z-10">
    Filter Type
  </label>
  
  <select
    onChange={handleSelectChange}
    className="block w-full h-12 pl-4 pr-10 text-sm font-medium bg-white border border-gray-200 rounded-2xl appearance-none 
               focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all duration-200
               cursor-pointer text-slate-700 shadow-sm"
  >
    <option value="all">All Elements</option>
    {filteredTypes.map((type, index) => (
      <option key={index} value={type.name} className="capitalize">
        {type.name}
      </option>
    ))}
  </select>

  {/* Icon Chevron yang lebih modern (Lucide-style) */}
  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>

  );
};

export default Filter;