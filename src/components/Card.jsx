import React, { useEffect, useState } from 'react';
import { GetPokemon } from '../api';
import { usePokemonContext } from '../context/PokemonContext';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Filter from './filter';
import { Link } from 'react-router-dom';

const typeColorMap = {
  normal: '#A8A77A', fighting: '#C22E28', flying: '#A98FF3', poison: '#A33EA1',
  ground: '#E2BF65', rock: '#B6A136', bug: '#A6B91A', ghost: '#735797',
  steel: '#B7B7CE', fire: '#EE8130', water: '#6390F0', grass: '#7AC74C',
  electric: '#F7D02C', psychic: '#F95587', ice: '#96D9D6', dragon: '#6F35FC',
  dark: '#705746', fairy: '#D685AD', unknown: '#999999', shadow: '#555555',
};

const Card = ({ searchQuery }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [visiblePokemon, setVisiblePokemon] = useState([]);
  const [visiblePokemonCount, setVisiblePokemonCount] = useState(30);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { savedPokemon, savePokemon } = usePokemonContext();
  const [aliasInput, setAliasInput] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetPokemon(300);
        setPokemonData(result);
        setVisiblePokemon(result.slice(0, visiblePokemonCount));
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };
    fetchData();
  }, [visiblePokemonCount]);

  useEffect(() => {
    const filteredPokemon = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    let filteredByType = filteredPokemon;
    if (selectedType !== 'all') {
      filteredByType = filteredByType.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType)
      );
    }
    setVisiblePokemon(filteredByType.slice(0, visiblePokemonCount));
  }, [searchQuery, pokemonData, visiblePokemonCount, selectedType]);

  const loadMorePokemon = () => setVisiblePokemonCount((prev) => prev + 30);

  const handleSaveClick = (content) => {
    setSelectedPokemon({ ...content, alias: '' });
    document.getElementById('my_modal_2').showModal();
  };

  const handleSavePokemon = () => {
    const aliasValue = aliasInput.trim();
    if (aliasValue) {
      const isAliasExists = savedPokemon.some((p) => p.alias === aliasValue);
      if (isAliasExists) {
        toast.error(`${aliasValue} is already in your collection!`);
      } else {
        savePokemon({ ...selectedPokemon, alias: aliasValue });
        document.getElementById('my_modal_2').close();
        setAliasInput('');
        toast.success(`${aliasValue} successfully saved!`);
      }
    } else {
      toast.warn('Alias cannot be empty');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans text-slate-900">
      {/* Dynamic Header */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Filter onChange={setSelectedType} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {visiblePokemon.map((content, i) => {
            const primaryColor = typeColorMap[content.types[0].type.name];
            
            return (
              <div 
                key={i} 
                className="group relative bg-white rounded-[2.5rem] p-2 transition-all duration-500 hover:scale-[1.02]"
                style={{ boxShadow: `0 20px 40px -15px ${primaryColor}33` }}
              >
                {/* ID Badge */}
                <span className="absolute top-6 left-8 text-4xl font-black text-slate-100 group-hover:text-slate-200 transition-colors">
                  #{content.id.toString().padStart(3, '0')}
                </span>

                <div className="relative overflow-hidden rounded-[2.2rem] bg-slate-50 p-6 pt-12 transition-colors group-hover:bg-white">
                  {/* Floating Sprite */}
                  <figure className="relative z-10 flex justify-center mb-6">
                    <img
                      src={content.sprites.other.showdown.front_default || content.sprites.front_default}
                      className="w-32 h-32 object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] group-hover:scale-125 transition-transform duration-500 animate-float"
                      alt={content.name}
                    />
                    <div 
                      className="absolute inset-0 m-auto w-24 h-24 rounded-full opacity-20 blur-2xl transition-all group-hover:scale-150"
                      style={{ backgroundColor: primaryColor }}
                    />
                  </figure>

                  <div className="text-center relative z-20">
                    <h2 className="text-2xl font-black capitalize mb-2 tracking-tight text-slate-800">
                      {content.name}
                    </h2>
                    
                    {/* Types Pill */}
                    <div className="flex justify-center gap-2 mb-6">
                      {content.types.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white"
                          style={{ backgroundColor: typeColorMap[t.type.name] }}
                        >
                          {t.type.name}
                        </span>
                      ))}
                    </div>

                    {/* Stats Compact */}
                    <div className="flex items-center justify-around bg-white/50 backdrop-blur-sm rounded-2xl py-3 mb-6 border border-slate-100">
                      <div className="text-center">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Height</p>
                        <p className="text-sm font-bold text-slate-700">{content.height / 10}m</p>
                      </div>
                      <div className="w-[1px] h-6 bg-slate-200" />
                      <div className="text-center">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Weight</p>
                        <p className="text-sm font-bold text-slate-700">{content.weight / 10}kg</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleSaveClick(content)}
                        className="py-3 px-4 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-red-600 transition-colors shadow-lg shadow-slate-200"
                      >
                        Catch
                      </button>
                      <Link
                        to={`/detail/${content.name}`}
                        className="py-3 px-4 rounded-2xl bg-white border border-slate-200 text-slate-900 text-xs font-bold hover:border-slate-900 transition-all"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Button */}
      <div className="mt-20 flex justify-center px-6">
        <button
          onClick={loadMorePokemon}
          className="group relative px-10 py-4 bg-white border-2 border-slate-900 rounded-3xl font-black text-slate-900 overflow-hidden transition-all hover:text-white"
        >
          <span className="relative z-10 uppercase tracking-widest">Load More</span>
          <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>

      {/* Modern Dialog */}
      <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle backdrop-blur-md">
        <div className="modal-box bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 max-w-md">
          
          <div className="mb-8 text-center">
            {/* Image Container with Glow Effect */}
            <div className="relative inline-flex items-center justify-center w-40 h-40 mb-4">
              <div 
                className="absolute inset-0 rounded-full opacity-20 blur-3xl animate-pulse"
                style={{ 
                  backgroundColor: selectedPokemon ? typeColorMap[selectedPokemon.types[0].type.name] : '#ef4444' 
                }} 
              />
              
              {selectedPokemon && (
                <img
                  src={selectedPokemon.sprites.other.showdown.front_default || selectedPokemon.sprites.front_default}
                  className="w-32 h-32 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] z-10 animate-float"
                  alt={selectedPokemon.name}
                />
              )}
            </div>

            <h3 className="text-3xl font-black text-slate-800 capitalize tracking-tighter">
              Gotcha, {selectedPokemon?.name}!
            </h3>
            <p className="text-slate-500 font-medium mt-2">Give your buddy an alias</p>
          </div>

          <input
            type="text"
            placeholder="e.g. Sparky"
            className="input w-full h-16 bg-slate-50 border-2 border-transparent focus:border-red-500 rounded-[1.5rem] text-center text-xl font-bold transition-all mb-6"
            value={aliasInput}
            onChange={(e) => setAliasInput(e.target.value)}
            autoFocus
          />

          <div className="flex flex-col gap-3">
            <button 
              onClick={handleSavePokemon} 
              className="btn h-16 bg-red-600 hover:bg-red-700 border-none text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-red-200 uppercase tracking-widest transition-all active:scale-95"
            >
              Save Pokemon
            </button>
            
            <form method="dialog">
              <button className="btn btn-ghost w-full text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <ToastContainer position="bottom-center" transition={Bounce} theme="dark" />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Card;