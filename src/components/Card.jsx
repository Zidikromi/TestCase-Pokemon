import React, { useEffect, useState } from 'react';
import { GetPokemon } from '../api';
import { usePokemonContext } from '../context/PokemonContext';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Filter from './filter';

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
        console.log(result);
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

  const loadMorePokemon = () => {
    setVisiblePokemonCount((prevCount) => prevCount + 30);
  };

  const handleSaveClick = (content) => {
    setSelectedPokemon({ ...content, alias: '' });
    document.getElementById('my_modal_2').showModal();
  };

  const handleKeyDownInput = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSavePokemon();
    }
  };



  const handleSavePokemon = () => {
    const aliasValue = aliasInput.trim();
    if (aliasValue) {
      const isAliasExists = savedPokemon.some((pokemon) => pokemon.alias === aliasValue);
      if (isAliasExists) {
        document.getElementById('my_modal_2').close();
        setAliasInput('');
        toast.error(`${aliasValue} already exists. Please choose a different alias.`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        const savedData = { ...selectedPokemon, alias: aliasValue };
        savePokemon(savedData);
        document.getElementById('my_modal_2').close();
        setAliasInput('');
        toast.success(`${aliasValue} Saved!`, {
          position: "top-right",
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
    } else {
      toast.error('Alias cannot be empty', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      document.getElementById('my_modal_2').close();
    }
  };


  return (
<div className="min-h-screen bg-slate-50 pb-20">
      {/* Filter Section */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Filter onChange={setSelectedType} />
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {visiblePokemon.map((content, i) => (
            <div 
              key={i} 
              className="group relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Image Circle Background */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-slate-100 rounded-full group-hover:bg-red-50 transition-colors duration-300" />
              
              <figure className="relative z-10 flex justify-center mb-6">
                <img
                  src={content.sprites.other.showdown.front_default}
                  className="w-40 h-40 object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
                  alt={content.name}
                />
              </figure>

              <div className="text-center">
                <h2 className="text-2xl font-black capitalize text-slate-800 mb-4 tracking-tight">
                  {content.name}
                </h2>
                
                <div className="flex justify-center gap-4 mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Height</span>
                    <span className="text-sm font-semibold text-slate-700">{content.height / 10} m</span>
                  </div>
                  <div className="w-[1px] bg-gray-200 h-8" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Weight</span>
                    <span className="text-sm font-semibold text-slate-700">{content.weight / 10} Kg</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {content.types.map((type, index) => (
                    <span
                      key={index}
                      className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-sm"
                      style={{ backgroundColor: typeColorMap[type.type.name] || '#CCCCCC' }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>

                <button
                  className="btn btn-block bg-red-500 border-none hover:bg-red-600 text-white rounded-2xl shadow-lg shadow-red-200"
                  onClick={() => handleSaveClick(content)}
                >
                  Catch Pokemon
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Section */}
      <div className="mt-16 flex justify-center">
        {!searchQuery && selectedType === 'all' && (
          <button
            className="btn btn-wide btn-outline border-2 hover:bg-slate-800 hover:border-slate-800 rounded-2xl font-bold transition-all"
            onClick={loadMorePokemon}
          >
            Load More Pokemon
          </button>
        )}
      </div>

      {/* Modern Dialog - Diletakkan di luar Loop agar performa lancar */}
      <dialog id="my_modal_2" className="modal backdrop-blur-sm">
        <div className="modal-box rounded-[32px] p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-black text-2xl text-slate-800">Gotcha!</h3>
            <p className="text-slate-500">Give your new buddy a nickname</p>
          </div>
          
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="e.g. Charizardy"
              className="input input-bordered w-full bg-slate-50 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 rounded-2xl text-center text-lg font-semibold"
              value={aliasInput}
              onChange={(e) => setAliasInput(e.target.value)}
              onKeyDown={handleKeyDownInput}
            />
          </div>

          <div className="modal-action flex-col gap-3">
            <button
              className="btn btn-block bg-red-500 hover:bg-red-600 border-none text-white rounded-2xl h-14"
              onClick={handleSavePokemon}
            >
              Save Nickname
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
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
        transition:Bounce />
    </div>
  );
};

export default Card;
