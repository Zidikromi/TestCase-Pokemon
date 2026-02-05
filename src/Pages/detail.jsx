import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GetPokemonDetail } from '../api';
import { usePokemonContext } from '../context/PokemonContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCreative } from 'swiper/modules';
import { IoChevronBack, IoStatsChart, IoAddCircleOutline, IoScaleOutline, IoResizeOutline, IoSparklesOutline } from "react-icons/io5";
import { toast, ToastContainer, Bounce } from 'react-toastify';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

const typeColorMap = {
  normal: '#A8A77A', fighting: '#C22E28', flying: '#A98FF3', poison: '#A33EA1',
  ground: '#E2BF65', rock: '#B6A136', bug: '#A6B91A', ghost: '#735797',
  steel: '#B7B7CE', fire: '#EE8130', water: '#6390F0', grass: '#7AC74C',
  electric: '#F7D02C', psychic: '#F95587', ice: '#96D9D6', dragon: '#6F35FC',
  dark: '#705746', fairy: '#D685AD',
};

const Detail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aliasInput, setAliasInput] = useState('');
  const { savedPokemon, savePokemon } = usePokemonContext();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await GetPokemonDetail(name);
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch detail:", error);
        setLoading(false);
      }
    };
    fetchDetail();
  }, [name]);

  const handleSaveClick = () => {
    document.getElementById('catch_modal_detail').showModal();
  };

  const handleSavePokemon = () => {
    const aliasValue = aliasInput.trim();
    if (aliasValue) {
      const isAliasExists = savedPokemon.some((p) => p.alias === aliasValue);
      if (isAliasExists) {
        toast.error(`${aliasValue} is already taken!`);
      } else {
        savePokemon({ ...pokemon, alias: aliasValue });
        document.getElementById('catch_modal_detail').close();
        setAliasInput('');
        toast.success(`${aliasValue} successfully added to squad!`);
      }
    } else {
      toast.warn('Alias cannot be empty');
    }
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-900">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="mt-8 font-black text-white tracking-[0.3em] animate-pulse">SUMMONING POKÉMON...</p>
    </div>
  );
  
  if (!pokemon) return <div className="text-center mt-20 font-black text-slate-800 text-2xl">POKÉMON LOST IN SPACE!</div>;

  const mainColor = typeColorMap[pokemon.types[0].type.name] || '#EF4444';

  return (
    <div className="min-h-screen bg-white pb-20 font-sans selection:bg-red-100 overflow-x-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 pointer-events-none opacity-40"
        style={{ background: `radial-gradient(circle at 70% 20%, ${mainColor}33 0%, transparent 50%)` }} />

      <div className="max-w-7xl mx-auto px-6 pt-10 relative z-10">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="group flex items-center gap-3 bg-slate-900 text-white pl-4 pr-8 py-3 rounded-full shadow-2xl transition-all hover:pr-10 active:scale-95">
            <IoChevronBack className="text-xl group-hover:-translate-x-1 transition-transform" />
            <span className="font-black text-xs uppercase tracking-widest">Back to Deck</span>
          </Link>
          <div className="flex items-center gap-4 bg-slate-100 px-6 py-3 rounded-full border border-slate-200">
            <span className="font-black text-slate-400 text-sm tracking-tighter">REGISTRY</span>
            <span className="font-black text-slate-900 text-sm italic">#{pokemon.id.toString().padStart(3, '0')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visuals */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="relative group bg-slate-50 rounded-[4rem] p-10 border border-slate-100 ">
               {/* Animated Background Pulse */}
               <div className="absolute inset-0 m-auto w-64 h-64 rounded-full opacity-20 " style={{ backgroundColor: mainColor }} />
               
               <Swiper
                modules={[Pagination, Autoplay, Navigation, ]}
        
                autoplay={{ delay: 4000 }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={true}
                className="rounded-3xl"
              >
                {[
                  pokemon.sprites.other['official-artwork'].front_default,
                  pokemon.sprites.other.showdown.front_default,
                  pokemon.sprites.other.home.front_default
                ].map((img, idx) => (
                  <SwiperSlide key={idx} className="flex justify-center items-center py-10">
                    <img src={img} alt={pokemon.name} 
                      className="w-full h-auto max-w-[340px] drop-shadow-[0_30px_50px_rgba(0,0,0,0.3)] animate-float pointer-events-none" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Quick Stats Bento */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-100/50 flex flex-col items-center group hover:bg-slate-900 transition-colors duration-500">
                <IoScaleOutline className="text-3xl text-slate-300 mb-3 group-hover:text-red-500 transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 group-hover:text-slate-500">Weight</span>
                <span className="text-3xl font-black text-slate-800 group-hover:text-white">{pokemon.weight / 10} <small className="text-sm">kg</small></span>
              </div>
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-100/50 flex flex-col items-center group hover:bg-slate-900 transition-colors duration-500">
                <IoResizeOutline className="text-3xl text-slate-300 mb-3 group-hover:text-blue-500 transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 group-hover:text-slate-500">Height</span>
                <span className="text-3xl font-black text-slate-800 group-hover:text-white">{pokemon.height / 10} <small className="text-sm">m</small></span>
              </div>
            </div>
          </div>

          {/* Right Column: Info & Stats */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Name Section */}
            <div className="relative">
              <span className="text-slate-200 text-8xl font-black absolute -top-16 -left-4 z-0 pointer-events-none uppercase opacity-40">
                {pokemon.types[0].type.name}
              </span>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-end gap-6">
                <h1 className="text-7xl font-black capitalize text-slate-900 tracking-tighter">
                  {pokemon.name}
                </h1>
                <div className="flex gap-2 pb-3">
                  {pokemon.types.map((t, i) => (
                    <span key={i} className="px-6 py-2 rounded-full text-white font-black text-[10px] uppercase tracking-widest shadow-lg"
                      style={{ backgroundColor: typeColorMap[t.type.name], boxShadow: `0 10px 20px -5px ${typeColorMap[t.type.name]}66` }}>
                      {t.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 rounded-[2.5rem] border border-slate-100">
               <button
                onClick={handleSaveClick}
                className="flex-1 py-6 rounded-[1.8rem] bg-slate-900 text-white flex items-center justify-center gap-3 hover:bg-red-600 transition-all duration-500 font-black shadow-xl active:scale-95"
              >
                <IoAddCircleOutline className="text-2xl" /> 
                <span className="uppercase tracking-widest text-sm">Initiate Catch</span>
              </button>
              <div className="flex-1 flex items-center justify-center gap-2 px-8 bg-white rounded-[1.8rem] border border-slate-200">
                <IoSparklesOutline className="text-yellow-400 animate-spin-slow" />
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Rare Finding</span>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />
              
              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="p-3 bg-red-500 rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                  <IoStatsChart className="text-xl text-white" />
                </div>
                <h2 className="text-2xl font-black tracking-tight uppercase">Combat Attributes</h2>
              </div>

              <div className="grid gap-8 relative z-10">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="group/stat">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] group-hover/stat:text-white transition-colors">{stat.stat.name}</span>
                      <span className="text-xl font-black italic">{stat.base_stat}</span>
                    </div>
                    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden p-[2px]">
                      <div className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        style={{ width: `${(stat.base_stat / 160) * 100}%`, backgroundColor: mainColor }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Catch Modal */}
      <dialog id="catch_modal_detail" className="modal modal-bottom sm:modal-middle backdrop-blur-xl">
        <div className="modal-box bg-white rounded-[4rem] p-12 shadow-2xl border border-slate-100 max-w-lg">
          <div className="text-center mb-10">
            <div className="inline-block p-6 bg-red-50 rounded-full mb-6">
               <IoAddCircleOutline className="text-6xl text-red-500 animate-pulse" />
            </div>
            <h3 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">GOTCHA!</h3>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Provide a unique alias for {pokemon.name}</p>
          </div>

          <input
            type="text"
            className="input w-full bg-slate-50 border-2 border-transparent focus:border-red-500 h-20 text-center text-3xl font-black rounded-[2rem] mb-8 transition-all"
            placeholder="SPARKY"
            value={aliasInput}
            onChange={(e) => setAliasInput(e.target.value)}
            autoFocus
          />

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleSavePokemon} 
              className="h-20 bg-red-600 hover:bg-slate-900 text-white border-none rounded-[2rem] font-black text-lg shadow-2xl shadow-red-200 transition-all active:scale-95 uppercase tracking-widest"
            >
              Add to Collection
            </button>
            <form method="dialog">
              <button className="w-full py-2 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-800 transition-colors">
                Cancel Mission
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <ToastContainer position="bottom-center" transition={Bounce} theme="dark" />

      <style>{`
        @keyframes float { 
          0%, 100% { transform: translateY(0px) rotate(0deg); } 
          50% { transform: translateY(-25px) rotate(2deg); } 
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        .swiper-button-next, .swiper-button-prev { color: #cbd5e1 !important; transform: scale(0.6); }
        .swiper-pagination-bullet-active { background: #ef4444 !important; }
      `}</style>
    </div>
  );
};

export default Detail;