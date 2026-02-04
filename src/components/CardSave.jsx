import React, { useContext, useEffect } from 'react';
import { usePokemonContext } from '../context/PokemonContext';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const typeColorMap = {
  normal: '#A8A77A',
  fighting: '#C22E28',
  flying: '#A98FF3',
  poison: '#A33EA1',
  ground: '#E2BF65',
  rock: '#B6A136',
  bug: '#A6B91A',
  ghost: '#735797',
  steel: '#B7B7CE',
  fire: '#EE8130',
  water: '#6390F0',
  grass: '#7AC74C',
  electric: '#F7D02C',
  psychic: '#F95587',
  ice: '#96D9D6',
  dragon: '#6F35FC',
  dark: '#705746',
  fairy: '#D685AD',
  unknown: '#999999',
  shadow: '#555555',
}

const CardSave = () => {
  const { savedPokemon, deletePokemon } = usePokemonContext();

  const handleDelete = (pokemonAlias) => {
    deletePokemon(pokemonAlias);
    if (savedPokemon.length > -1) {
      toast.success(`${pokemonAlias} Deleted!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };


  return (
   <div className="min-h-[80vh] py-12 px-4 sm:px-8 lg:px-16">
  {savedPokemon.length === 0 ? (
    /* Modern Empty State */
    <div className="flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-md rounded-[40px] border-2 border-dashed border-gray-200 max-w-4xl mx-auto">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h2 className="text-2xl font-black text-slate-800 mb-2">Your Bag is Empty!</h2>
      <p className="text-slate-500 mb-8 text-center max-w-xs">
        You haven't caught any Pokemon yet. Go to the home page and start your journey!
      </p>
      <Link to="/" className="btn btn-wide bg-red-500 hover:bg-red-600 border-none text-white rounded-2xl shadow-lg shadow-red-200">
        Start Exploring
      </Link>
    </div>
  ) : (
    <div className="max-w-7xl mx-auto">
      {/* Header Koleksi */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">My Collection</h1>
        <p className="text-slate-500 font-medium">You have {savedPokemon.length} buddies in your team</p>
      </div>

      {/* Modern Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {savedPokemon.map((content, i) => (
          <div 
            key={i} 
            className="group relative bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Dekorasi Background Card */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-50 rounded-full group-hover:bg-red-50 transition-colors duration-500" />
            
            <figure className="relative z-10 flex justify-center mt-4 mb-6">
              <div className="absolute inset-0 bg-slate-100 rounded-full scale-75 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <img
                src={content.sprites.other.showdown.back_default}
                className="w-40 h-40 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                alt={content.name}
              />
            </figure>

            <div className="relative z-10 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1 block">Nickname</span>
              <h2 className="text-2xl font-black text-slate-800 mb-4 capitalize truncate">
                {content.alias}
              </h2>

              <div className="flex items-center justify-center gap-4 py-3 px-4 bg-slate-50 rounded-2xl mb-6">
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Height</p>
                  <p className="text-sm font-bold text-slate-700">{content.height / 10}m</p>
                </div>
                <div className="w-px h-6 bg-gray-200" />
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Weight</p>
                  <p className="text-sm font-bold text-slate-700">{content.weight / 10}kg</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {content.types.map((type, index) => (
                  <span
                    key={index}
                    className="px-4 py-1 rounded-full text-[10px] font-black uppercase text-white shadow-sm"
                    style={{ backgroundColor: typeColorMap[type.type.name] || '#CCCCCC' }}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>

              {/* Action Button - Lebih subtle tapi tetap clear */}
              <button
                className="btn btn-block btn-ghost hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-2xl transition-all duration-300 font-bold border-gray-100"
                onClick={() => handleDelete(content.alias)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Release Buddy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}  
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </div>
  );
};

export default CardSave;