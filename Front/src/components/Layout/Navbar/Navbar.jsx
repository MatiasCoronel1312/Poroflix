import React from "react";
import { Logo } from "../../Logo";
import { Link } from "react-router-dom";
import { UserIcon } from "./navbarComponent/UserIcon";
import Modals from "@/components/formComponents/Modals";
import { useStore } from "@/components/contexts/store";

export const Navbar = () => {
  const isOpenModal = useStore((state) => state.isOpenModal);
  const handleOpenModal = useStore((state) => state.handleOpenModal);

  return (
    <header className="h-28.75 w-full font-extrabold">
      <div className="fixed top-0 left-0 w-full z-40 bg-black/85">
        <nav className="max-w-4xl mx-auto flex justify-between items-center text-2xl text-white">
          <Logo />
          <Link to="/">Peliculas</Link>
          <Link to="/">Series</Link>
          <Link to="/">Mi lista</Link>
          <Link to="/" className="w-9 h-9">
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>
          <Link>
            <button className="hover:cursor-pointer" onClick={handleOpenModal}>
              <UserIcon />
            </button>
          </Link>
        </nav>
      </div>
      {
        isOpenModal ? <Modals /> : <></>
      }
    </header>
  );
};
