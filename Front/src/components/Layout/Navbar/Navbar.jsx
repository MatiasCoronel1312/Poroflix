import React, { useState } from "react";
import { Logo } from "../../Logo";
import { Link } from "react-router-dom";
import { CartIcon } from "./navbarComponent/CartIcon";
import { UserIcon } from "./navbarComponent/UserIcon";
import ModalForm from "@/pages/ModalForm";
import Modals from "@/components/formComponents/Modals";
import { useStore } from "@/components/contexts/store";

export const Navbar = () => {
  const [sumador, setSumador] = useState(0);
  const isOpenModal = useStore((state) => state.isOpenModal)
  const handleOpenModal = useStore((state) => state.handleOpenModal)
  
  // sumador = 0
  //if(condicion):
    //funcion
  const contador = sumador>=1?
  //               condicion?true:false
    <div
      className="bg-red-700 rounded-full w-3 h-3 text-[10px] flex justify-center
  items-center text-white absolute top-0 right-0">
      {sumador}
    </div>:
    <></>;

  return (
    <header className="bg-black flex justify-between items-center h-28.75 w-full px-6 font-extrabold">
      <Logo />
      <nav className="w-full pl-5">
        <div className="flex justify-between h-10 w-full items-center text-2xl text-white">
          <Link to="/"><button onClick={()=>(setSumador(sumador+1))}>Listas</button></Link>
          <Link to="/">Categorias</Link>
          <Link to="/">SoyBuscador</Link>
          <Link to="/carrito" className="w-9 h-9 relative">
            <CartIcon />
            {
              contador
            }
          </Link>
          <Link ><button className="hover:cursor-pointer" onClick={handleOpenModal}><UserIcon/></button></Link>
        </div>
      </nav>
      {
        //if (isOpenModal==False): 
        //  def nada
        //else:
        // def ModalForm
       // condicion?true: false
       isOpenModal?<Modals/>:<></>
      }
    </header>
  );
};
