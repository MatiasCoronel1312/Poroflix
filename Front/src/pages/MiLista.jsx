import { useStore } from "@/components/contexts/store";
import React from "react";
import { useNavigate } from "react-router";

const MiLista = () => {
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const salir = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="text-white">
      <div>MiLista</div>
      <button onClick={() => salir()}>Salir</button>
    </div>
  );
};

export default MiLista;
