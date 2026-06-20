import React, { useState } from "react";
import { Logo } from "../../Logo";
import { Link } from "react-router-dom";
import { UserIcon } from "./navbarComponent/UserIcon";
import Modals from "@/components/formComponents/Modals";
import { useStore } from "@/components/contexts/store";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const isOpenModal = useStore((state) => state.isOpenModal);
  const handleOpenModal = useStore((state) => state.handleOpenModal);

  return (
    <header className="h-28 w-full font-extrabold">
      <div className="fixed top-0 left-0 w-full z-40 bg-black/85">

        <nav className="max-w-6xl mx-auto px-4 h-28 flex justify-between items-center text-white">
          <Logo />
          <div className="hidden md:flex items-center gap-8 text-xl">

            <Link to="/movies" className="hover:text-gray-300 transition">
              Películas
            </Link>

            <Link to="/series" className="hover:text-gray-300 transition">
              Series
            </Link>

            <Link to="/" className="hover:text-gray-300 transition">
              Mi lista
            </Link>

            <Link to="/" className="text-2xl">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>

            <button
              onClick={handleOpenModal}
              className="hover:cursor-pointer"
            >
              <UserIcon />
            </button>

          </div>

          <div className="flex items-center gap-4 md:hidden">

            <Link to="/">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>

            <button onClick={handleOpenModal}>
              <UserIcon />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl"
            >
              <i className="fa-solid fa-bars"></i>
            </button>

          </div>

        </nav>

        {menuOpen && (
          <div className="md:hidden flex flex-col items-center gap-6 py-6 text-white text-xl bg-black">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Películas
            </Link>

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Series
            </Link>

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Mi lista
            </Link>

          </div>
        )}
      </div>

      {isOpenModal && <Modals />}
    </header>
  );
};