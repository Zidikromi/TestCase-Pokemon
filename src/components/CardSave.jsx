import React from 'react';
import { usePokemonContext } from '../context/PokemonContext';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { IoTrashOutline, IoMapOutline, IoSparklesOutline, IoInformationCircleOutline } from "react-icons/io5";

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
    toast.success(`${pokemonAlias} has been released back into the wild`, {
      icon: "👋",
      style: { borderRadius: '24px', background: '#0f172a', color: '#fff', fontSize: '14px', fontWeight: 'bold' }
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans selection:bg-red-100">
      {/* Modern Header */}
      <div className="bg-white/80 backdrop-blur-2xl border-b border-slate-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-3">
              MY SQUAD <IoSparklesOutline className="text-yellow-400 animate-pulse" />
            </h1>
            <p className="text-slate-500 font-semibold text-sm mt-1">
              You have <span className="text-red-500">{savedPokemon.length}</span> brave companions in your team
            </p>
          </div>
          <Link to="/" className="group flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-[1.5rem] hover:bg-red-600 transition-all duration-500 shadow-xl shadow-slate-200 active:scale-95">
            <IoMapOutline className="text-xl group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-xs uppercase tracking-widest">Explore Region</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16">
        {savedPokemon.length === 0 ? (
          /* Modern Empty State */
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-2xl mx-auto px-12 text-center">
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-red-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="relative w-44 h-44 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 shadow-inner">
                <svg className="w-24 h-24 text-slate-200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              </div>
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tighter">Your Bag is Empty!</h2>
            <p className="text-slate-400 mb-10 leading-relaxed font-medium text-lg">
              Great adventures are waiting for you. Start catching Pokémon and build your dream team now.
            </p>
            <Link to="/" className="px-12 py-5 bg-red-600 hover:bg-slate-900 text-white font-black rounded-2xl transition-all duration-500 shadow-2xl shadow-red-200 uppercase tracking-[0.2em] text-xs">
              Begin Adventure
            </Link>
          </div>
        ) : (
          /* Collection Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {savedPokemon.map((content, i) => {
              const mainColor = typeColorMap[content.types[0].type.name] || '#CBD5E1';
              
              return (
                <div 
                  key={i} 
                  className="group relative bg-white rounded-[3rem] p-3 transition-all duration-500 hover:translate-y-[-10px]"
                  style={{ boxShadow: `0 40px 80px -20px ${mainColor}30` }}
                >
                  {/* Status Badge */}
                  <div className="absolute top-8 right-8 z-30">
                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                      <span className="text-[10px] font-black uppercase text-slate-600 tracking-tighter">Buddy</span>
                    </div>
                  </div>

                  {/* Stage Area */}
                  <div className="relative rounded-[2.5rem] bg-slate-50/50 p-6 pt-12 group-hover:bg-white transition-colors duration-500 overflow-hidden border border-transparent group-hover:border-slate-100">
                    {/* Dynamic Mesh Background */}
                    <div 
                      className="absolute -top-24 -right-24 w-64 h-64 opacity-20 blur-[80px] transition-all duration-1000 group-hover:opacity-40"
                      style={{ backgroundColor: mainColor }}
                    />

                    <figure className="relative z-10 flex justify-center mb-8">
                      <img
                        src={content.sprites.other.showdown.front_default || content.sprites.front_default}
                        className="w-32 h-32 object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform duration-700 animate-float"
                        alt={content.name}
                      />
                    </figure>

                    <div className="text-center relative z-20">
                      <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.3em] block mb-1">Nickname</span>
                      <h2 className="text-2xl font-black text-slate-800 mb-6 capitalize truncate leading-tight">
                        {content.alias}
                      </h2>

                      {/* Info Bento Box */}
                      <div className="grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden mb-8">
                        <div className="bg-white p-3">
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Species</p>
                          <p className="text-[12px] font-black text-slate-700 capitalize truncate">{content.name}</p>
                        </div>
                        <div className="bg-white p-3">
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Primary Type</p>
                          <p className="text-[12px] font-black text-slate-700 capitalize truncate" style={{ color: mainColor }}>{content.types[0].type.name}</p>
                        </div>
                      </div>

                      {/* Modern Action Bar */}
                      <div className='flex items-center gap-3'>
                        <button
                          onClick={() => handleDelete(content.alias)}
                          className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-[1.2rem] transition-all duration-300 group/btn"
                          title="Release Pokemon"
                        >
                          <IoTrashOutline className="text-xl transition-transform group-hover/btn:rotate-12" />
                        </button>
                        
                        <Link
                          to={`/detail/${content.name}`}
                          className="flex-[2] flex items-center justify-center gap-2 py-4 bg-slate-900 hover:bg-red-600 text-white rounded-[1.2rem] transition-all duration-500 shadow-lg shadow-slate-200 active:scale-95"
                        >
                          <IoInformationCircleOutline className="text-xl" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Details</span>
                        </Link>
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

      {/* Modern Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default CardSave;