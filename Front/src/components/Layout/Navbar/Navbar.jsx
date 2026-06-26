import React, { useEffect, useRef, useState } from "react";
import { Logo } from "../../Logo";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon } from "./navbarComponent/UserIcon";
import Modals from "@/components/formComponents/Modals";
import { useStore } from "@/components/contexts/store";
import { Avatar } from "@/components/Avatar";
const apiUrl = import.meta.env.VITE_API_URL;

export const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isOpenModal = useStore((state) => state.isOpenModal);
  const handleOpenModal = useStore((state) => state.handleOpenModal);
  const role = useStore((state) => state.role);
  const token = useStore((state) => state.isAuthenticated);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [items, setItems] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    fetchContent();
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchContent = async () => {
    try {
      const [moviesResponse, seriesResponse] = await Promise.all([
        fetch(`${apiUrl}movies`),
        fetch(`${apiUrl}series`),
      ]);

      const movies = await moviesResponse.json();
      const series = await seriesResponse.json();

      const allContent = [
        ...movies.map((movie) => ({
          ...movie,
          type: "movie",
        })),
        ...series.map((serie) => ({
          ...serie,
          type: "series",
        })),
      ];

      setItems(allContent);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsAuthenticated(token);
  }, [token]);

  const handleButtonUSer = () => {
    if (isAuthenticated) {
      navigate("/perfil");
    } else {
      handleOpenModal();
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim() === "") {
      setResults([]);
      return;
    }
    const filtered = items
      .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 4);
    setResults(filtered);
  };

  return (
    <header className="h-28 w-full font-extrabold">
      <div className="fixed top-0 left-0 w-full z-40 bg-black/85">
        <nav className="max-w-6xl mx-auto px-4 h-28 flex justify-between items-center text-white">
          <Logo />
          <div className="hidden md:flex items-center gap-8 text-xl relative">
            {role === "admin" && (
              <Link to="/dashboard" className="hover:text-gray-300 transition">
                Dashboard
              </Link>
            )}
            <Link to="/movies" className="hover:text-gray-300 transition">
              Películas
            </Link>
            <Link to="/series" className="hover:text-gray-300 transition">
              Series
            </Link>

            <button onClick={() => setShowSearch(true)} className="text-2xl">
              <i className="fa-solid fa-magnifying-glass pr-2"></i>
              {showSearch && (
                <input
                  value={search}
                  onChange={handleSearch}
                  onFocus={() => setShowResults(true)}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowResults(false);
                      setShowSearch(false)
                    }, 500);
                  }}
                  placeholder="Buscar..."
                  className="border p-2 rounded"
                />
              )}
            </button>
            {showResults && results.length > 0 && (
              <div className="absolute top-20 right-10 w-100 bg-zinc-900 rounded shadow-lg mt-1 max-h-80 overflow-y-auto ">
                {results.map((item) => (
                  <button
                    key={`${item.type}-${item.id}`}
                    onClick={() => {
                      navigate(`/play/${item.type}/${item.id}`);
                      setShowResults(false);
                      setSearch("");
                    }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-zinc-800"
                  >
                    <img
                      src={item.img}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="text-left text-sm">
                      <div>{item.title}</div>
                      <small>{item.type}</small>
                    </div>
                  </button>
                ))}
              </div>
            )}
            <button onClick={handleButtonUSer} className="hover:cursor-pointer">
              {isAuthenticated ? <Avatar /> : <UserIcon />}
            </button>
          </div>

          {/* -------------CELULAR---------------------------------------------------- */}
          <div className="flex items-center gap-4 md:hidden">
            
            <button onClick={handleButtonUSer}>
              {isAuthenticated ? <Avatar /> : <UserIcon />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center gap-6 py-6 text-white text-xl bg-black">
            {role === "admin" && <Link to="/dashboard">Dashboard</Link>}
            <Link to="/movies" onClick={() => setMenuOpen(false)}>
              Películas
            </Link>
            <Link to="/series" onClick={() => setMenuOpen(false)}>
              Series
            </Link>
             <button onClick={() => setShowSearch(true)} className="text-2xl">
              <i className="fa-solid fa-magnifying-glass pr-2"></i>
              {showSearch && (
                <input
                  value={search}
                  onChange={handleSearch}
                  onFocus={() => setShowResults(true)}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowResults(false);
                      setShowSearch(false)
                    }, 500);
                  }}
                  placeholder="Buscar..."
                  className="border p-2 rounded"
                />
              )}
            </button>
            {showResults && results.length > 0 && (
              <div className="absolute top-75 right-10 w-100 bg-zinc-900 rounded shadow-lg mt-1 max-h-80 overflow-y-auto ">
                {results.map((item) => (
                  <button
                    key={`${item.type}-${item.id}`}
                    onClick={() => {
                      navigate(`/play/${item.type}/${item.id}`);
                      setShowResults(false);
                      setSearch("");
                    }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-zinc-800"
                  >
                    <img
                      src={item.img}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="text-left text-sm">
                      <div>{item.title}</div>
                      <small>{item.type}</small>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {isOpenModal && <Modals />}
    </header>
  );
};
