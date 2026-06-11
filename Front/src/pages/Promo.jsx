import React, { useState } from "react";
import fondo from "../assets/bg-movie.png";
import { PlanSwitch } from "@/components/PlanSwitch";
import { useNavigate } from "react-router-dom";

export const Promo = () => {
  const [active, setActive] = useState("mensual");
  const navigate = useNavigate();
  const promoMensual = () => {
    setActive("mensual");
  };
  const promoAnual = () => {
    setActive("anual");
  };

  const handlePlan = async (plan) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}subscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            plan: plan,
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("selectedPlan", result.plan);
        navigate("/checkout");
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col justify-start gap-5 pt-10"
      style={{
        backgroundImage: `url(${fondo})`,
      }}
    >
      <div className="text-white text-4xl h-10">
        <PlanSwitch
          active={active}
          promoMensual={promoMensual}
          promoAnual={promoAnual}
        />
      </div>
      <div className="w-full px-5 flex justify-around">
        <div className="bg-black/80 hover:bg-black duration-600 border-3 rounded-3xl border-[#0830c2] w-[30%] h-72 text-white text-left p-5 flex flex-col justify-between">
          <div className="text-xl">Básico con Anuncios</div>
          <div className="text-xs p-3 flex flex-col gap-1">
            <div className="pb-2">2 Dispositivos a la vez.</div>
            <div>Resolucion Full HD</div>
          </div>
          <div className="flex justify-between">
            <div className="font-extrabold">
              ${active === "anual" ? "64490/año" : "7390/mes"}
            </div>
            <button
              className="inline-flex h-8 animate-background-shine items-center justify-center rounded-md border border-[#0830c2] bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-2 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-gray-50 hover:cursor-pointer text-xs"
              onClick={() => {
                handlePlan(`Basico/${active}`);
              }}
            >
              Elige este plan
            </button>
          </div>
          <div
            className={`text-xs ${active === "anual" ? "hidden" : ""}
          `}
          >
            O paga $64490/año y ahorra $24190
          </div>
        </div>
        <div className="bg-black/80 hover:bg-black duration-600 border-3 rounded-3xl border-[#0830c2] w-[30%] h-72 text-white text-left p-5 flex flex-col justify-between">
          <div className="text-xl">Estandar</div>
          <div className="text-xs p-3 flex flex-col gap-1">
            <div>2 Dispositivos a la vez.</div>
            <div>Resolucion Full HD</div>
            <div>30 Descargas para ver offline</div>
          </div>
          <div className="flex justify-between">
            <div className="font-extrabold">
              ${active === "anual" ? "80490/año" : "9590/mes"}
            </div>
            <button
              className="inline-flex h-8 animate-background-shine items-center justify-center rounded-md border border-[#0830c2] bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-2 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-gray-50 hover:cursor-pointer text-xs"
              onClick={() => {
                handlePlan(`Estandar/${active}`);
              }}
            >
              Elige este plan
            </button>
          </div>
          <div
            className={`text-xs ${active === "anual" ? "hidden" : ""}
          `}
          >
            O paga $80490/año y ahorra $34590
          </div>
        </div>
        <div className="bg-black/80 hover:bg-black duration-600 border-3 rounded-3xl border-[#0830c2] w-[30%] h-72 text-white text-left p-5 flex flex-col justify-between">
          <div className="text-xl">Platino</div>
          <div className="text-xs p-3 flex flex-col gap-1">
            <div className="">4 Dispositivos a la vez.</div>
            <div>Resolucion 4K Ultra HD*</div>
            <div>Audio Dolby Atmos*</div>
            <div>100 Descargas para disfrutar offline</div>
          </div>
          <div className="flex justify-between">
            <div className="font-extrabold">
              ${active === "anual" ? "95890/año" : "11490/mes"}
            </div>
            <button
              className="inline-flex h-8 animate-background-shine items-center justify-center rounded-md border border-[#0830c2] bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] px-2 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-gray-50 hover:cursor-pointer text-xs"
              onClick={() => {
                handlePlan(`Platino/${active}`);
              }}
            >
              Elige este plan
            </button>
          </div>
          <div
            className={`text-xs ${active === "anual" ? "hidden" : ""}
          `}
          >
            O paga $95890/año y ahorra $41990
          </div>
        </div>
      </div>
      <p className="text-white text-xs p-3">
        *Full HD, 4K Ultra HD y Dolby Atmos no están disponibles en todo el
        contenido de cada plan. El contenido en vivo en los planes Estándar y
        Platino puede contener publicidad. Las descargas pueden estar limitadas
        de acuerdo con el tipo de contenido. Para más información,{" "}
        <code>help.poroflix.com/plans</code>. Ahorro basado en un plan anual vs.
        su versión mensual si es pagado por 12 meses. Requiere pago anticipado.
      </p>
    </div>
  );
};
