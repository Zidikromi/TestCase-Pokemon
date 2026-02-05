import React from 'react';
import { usePokemonContext } from '../context/PokemonContext';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

import { IoTrashOutline, IoMapOutline, IoSparklesOutline } from "react-icons/io5";

const typeColorMap = {
  normal: '#A8A77A', fighting: '#C22E28', flying: '#A98FF3', poison: '#A33EA1',
  ground: '#E2BF65', rock: '#B6A136', bug: '#A6B91A', ghost: '#735797',
  steel: '#B7B7CE', fire: '#EE8130', water: '#6390F0', grass: '#7AC74C',
  electric: '#F7D02C', psychic: '#F95587', ice: '#96D9D6', dragon: '#6F35FC',
  dark: '#705746', fairy: '#D685AD',
};

const CardSave = () => {
  const { savedPokemon, deletePokemon } = usePokemonContext();

  const handleDelete = (pokemonAlias) => {
    deletePokemon(pokemonAlias);
    toast.success(`${pokemonAlias} telah dilepaskan ke alam liar`, {
      icon: "👋",
      style: { borderRadius: '20px', background: '#1e293b', color: '#fff' }
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      {/* Dynamic Header Collection */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
              MY SQUAD <IoSparklesOutline className="text-yellow-400 animate-pulse" />
            </h1>
            <p className="text-slate-500 font-medium">Kamu memiliki {savedPokemon.length} Pokémon dalam tim utama</p>
          </div>
          {savedPokemon.length > 0 && (
            <Link to="/" className="group flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-slate-200">
              <IoMapOutline className="text-xl" />
              <span className="font-bold text-sm">Cari Pokémon Lagi</span>
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {savedPokemon.length === 0 ? (
          /* Modern Empty State */
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-100 max-w-3xl mx-auto px-10 text-center">
            <div className="w-40 h-40 bg-slate-50 rounded-full flex items-center justify-center mb-8 animate-bounce">
               <svg className="w-24 h-24 text-slate-200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
               </svg>
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-4">Tas Kamu Kosong!</h2>
            <p className="text-slate-500 mb-10 leading-relaxed font-medium">
              Petualangan besar menantimu. Mulailah menangkap Pokémon dan bangun tim impianmu sekarang juga.
            </p>
            <Link to="/" className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl transition-all shadow-2xl shadow-red-200 uppercase tracking-widest text-sm">
              Mulai Petualangan
            </Link>
          </div>
        ) : (
          /* Collection Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {savedPokemon.map((content, i) => {
              const mainColor = typeColorMap[content.types[0].type.name] || '#CBD5E1';
              
              return (
                <div 
                  key={i} 
                  className="group relative bg-white rounded-[2.5rem] p-4 transition-all duration-500 hover:scale-[1.03]"
                  style={{ boxShadow: `0 30px 60px -15px ${mainColor}25` }}
                >
                  {/* Status Badge */}
                  <div className="absolute top-6 right-6 z-20">
                    <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                      <span className="text-[9px] font-black uppercase tracking-tighter">Active Buddy</span>
                    </div>
                  </div>

                  {/* Stage Area */}
                  <div className="relative rounded-[2rem] bg-slate-50 p-6 pt-10 group-hover:bg-white transition-colors duration-500 overflow-hidden">
                    {/* Decorative Radial Background */}
                    <div 
                      className="absolute inset-0 opacity-10 blur-3xl transition-transform group-hover:scale-150"
                      style={{ background: `radial-gradient(circle, ${mainColor} 0%, transparent 70%)` }}
                    />

                    <figure className="relative z-10 flex justify-center mb-6">
                      <img
                        src={content.sprites.other.showdown.front_default || content.sprites.front_default}
                        className="w-36 h-36 object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] group-hover:scale-125 transition-transform duration-500 animate-float"
                        alt={content.name}
                      />
                    </figure>

                    <div className="text-center relative z-20">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Nickname</span>
                      <h2 className="text-2xl font-black text-slate-800 mb-4 capitalize truncate px-2">
                        {content.alias}
                      </h2>

                      {/* Info Bento Box */}
                      <div className="grid grid-cols-2 gap-2 bg-white/60 backdrop-blur-md border border-slate-100 rounded-2xl p-3 mb-6">
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase italic">Species</p>
                          <p className="text-[11px] font-black text-slate-600 capitalize">{content.name}</p>
                        </div>
                        <div className="border-l border-slate-200">
                          <p className="text-[9px] font-bold text-slate-400 uppercase italic">Type</p>
                          <p className="text-[11px] font-black text-slate-600 capitalize">{content.types[0].type.name}</p>
                        </div>
                      </div>

                      {/* Modern Release Button */}
                      <div className='flex flex-row gap-2'>

                      <div>
                      <button
                        onClick={() => handleDelete(content.alias)}
                        className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl transition-all duration-300 group/btn shadow-inner"
                      >
                        <IoTrashOutline className="text-lg transition-transform group-hover/btn:rotate-12" />
                        <span className="text-[11px] font-black uppercase tracking-widest">Release</span>
                      </button>
                      </div>
                      <div>
                        <Link
                        to={`/detail/${content.name}`}
                        className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-red-300 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl transition-all duration-300 group/btn shadow-inner"
                      >
                         <span className="text-[11px] font-black uppercase tracking-widest">Details</span>
                      </Link>
                      </div>
                       </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ToastContainer position="bottom-center" transition={Bounce} theme="dark" />

      {/* Shared CSS Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CardSave;