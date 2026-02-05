import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GetPokemonDetail } from '../api';
import { usePokemonContext } from '../context/PokemonContext'; // Pastikan path benar
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { IoChevronBack, IoStatsChart, IoAddCircleOutline } from "react-icons/io5";
import { toast, ToastContainer, Bounce } from 'react-toastify'; // Import toast

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
  
  // Ambil fungsi dari context
  const { savedPokemon, savePokemon } = usePokemonContext();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await GetPokemonDetail(name);
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal ambil detail:", error);
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
        toast.error(`${aliasValue} sudah ada!`);
      } else {
        // Gunakan state 'pokemon' karena kita sedang di halaman detail
        savePokemon({ ...pokemon, alias: aliasValue });
        document.getElementById('catch_modal_detail').close();
        setAliasInput('');
        toast.success(`${aliasValue} Berhasil Disimpan!`);
      }
    } else {
      toast.warn('Alias tidak boleh kosong');
    }
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
      <div className="loading loading-spinner loading-lg text-red-500"></div>
      <p className="mt-4 font-black text-slate-400 animate-pulse">MEMANGGIL POKEMON...</p>
    </div>
  );
  
  if (!pokemon) return <div className="text-center mt-20 font-bold">Pokemon Hilang dari Radar!</div>;

  const mainColor = typeColorMap[pokemon.types[0].type.name] || '#EF4444';

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans overflow-x-hidden">
      <div className="h-[40vh] w-full absolute top-0 left-0 transition-colors duration-700"
        style={{ backgroundColor: `${mainColor}20` }} />

      <div className="max-w-6xl mx-auto px-4 pt-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="group flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <IoChevronBack className="text-xl group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-slate-700">Back</span>
          </Link>
          <div className="bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-2xl shadow-sm font-black text-slate-400">
            #{pokemon.id.toString().padStart(3, '0')}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative group bg-white rounded-[3rem] p-8 shadow-2xl shadow-slate-200 overflow-hidden">
              <Swiper
                modules={[Pagination, Autoplay, Navigation]}
                spaceBetween={30} slidesPerView={1} autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }} navigation={true} className="rounded-2xl"
              >
                {[
                  pokemon.sprites.other['official-artwork'].front_default,
                  pokemon.sprites.other.showdown.front_default,
                  pokemon.sprites.other.home.front_default
                ].map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="flex flex-col items-center py-6">
                      <img src={img} alt={pokemon.name} className="w-full h-auto max-w-[320px] drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)] animate-float" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-100 flex flex-col items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Weight</span>
                <span className="text-2xl font-black text-slate-800">{pokemon.weight / 10} <small>kg</small></span>
              </div>
              <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-100 flex flex-col items-center justify-center gap-2">
                <button
                  onClick={handleSaveClick}
                  className="w-full py-4 rounded-xl bg-slate-900 text-white flex items-center justify-center gap-2 hover:bg-red-600 transition-all font-bold shadow-lg"
                >
                  <IoAddCircleOutline className="text-xl" /> Catch
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-slate-200 relative">
              <h1 className="text-5xl font-black capitalize text-slate-800 mb-6">{pokemon.name}</h1>
              <div className="flex flex-wrap gap-3">
                {pokemon.types.map((t, i) => (
                  <span key={i} className="px-8 py-2.5 rounded-2xl text-white font-black text-xs uppercase"
                    style={{ backgroundColor: typeColorMap[t.type.name] }}>
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <IoStatsChart className="text-2xl text-red-400" />
                <h2 className="text-2xl font-black">Base Stats</h2>
              </div>
              <div className="grid gap-6">
                {pokemon.stats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-[10px] font-black uppercase text-slate-400">{stat.stat.name}</span>
                      <span className="font-black">{stat.base_stat}</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full transition-all duration-1000"
                        style={{ width: `${(stat.base_stat / 150) * 100}%`, backgroundColor: mainColor }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL HARUS ADA DI SINI --- */}
      <dialog id="catch_modal_detail" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white rounded-[2.5rem] p-10">
          <h3 className="text-3xl font-black text-center mb-4">GOTCHA!</h3>
          <p className="text-center text-slate-500 mb-6">Berikan Nickname untuk {pokemon.name}</p>
          <input
            type="text"
            className="input w-full bg-slate-100 border-none h-16 text-center text-xl font-bold rounded-2xl mb-6"
            placeholder="Nickname..."
            value={aliasInput}
            onChange={(e) => setAliasInput(e.target.value)}
          />
          <div className="flex flex-col gap-3">
            <button onClick={handleSavePokemon} className="btn h-16 bg-red-600 text-white border-none rounded-2xl font-black">
              SIMPAN KE KOLEKSI
            </button>
            <form method="dialog">
              <button className="btn btn-ghost w-full">Batal</button>
            </form>
          </div>
        </div>
      </dialog>

      <ToastContainer position="bottom-center" transition={Bounce} theme="dark" />

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Detail;