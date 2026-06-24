import { useNavigate } from "react-router";
import { useStore } from "@/components/contexts/store";
import { Card } from "@/components/Card";
import { CardSerie } from "@/components/CardSerie";
import React, { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export const Perfil = () => {
  const [myList, setMyList] = useState([]);
  const logout = useStore((state) => state.logout);
  const username = localStorage.getItem("username");
  const selectedPlan = localStorage.getItem("selectedPlan");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyList = async () => {
      const response = await fetch(`${apiUrl}user-content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);

      setMyList(data);
    };
    fetchMyList();
  }, []);

  const salir = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="w-full h-screen text-white text-left flex flex-col justify-start px-1">
      <div className="flex justify-between py-5">
        <div className="text-4xl">Perfil:</div>
        <button
          className="inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-[#0830c2] bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] px-5 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-gray-50 hover:cursor-pointer"
          onClick={() => salir()}
        >
          <i class="fa-solid fa-right-from-bracket pr-2"></i>
          Salir
        </button>
      </div>
      <div className="flex justify-start gap-10 pb-10 text-xl">
        <div>Nombre:  </div>
        <div>Usuario:  {username}</div>
        <div>Plan: {selectedPlan}</div>
      </div>
      <div className="">
        <div className="text-4xl">Mi Lista:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {myList.map((item) =>
            item.type == "movie" ? (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                director={item.director}
                category={item.category}
                duration={item.duration}
                img={item.img}
              />
            ) : (
              <CardSerie
                key={item.id}
                id={item.id}
                title={item.title}
                category={item.category}
                img={item.img}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};
