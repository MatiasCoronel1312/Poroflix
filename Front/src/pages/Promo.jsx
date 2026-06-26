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

  const plans = [
    {
      nombre: "Basico",
      titulo: "Básico con Anuncios",
      mensual: "7390/mes",
      anual: "64490/año",
      ahorro: "$24190",
      beneficios: ["2 Dispositivos a la vez.", "Resolución Full HD"],
    },
    {
      nombre: "Estandar",
      titulo: "Estandar",
      mensual: "9590/mes",
      anual: "80490/año",
      ahorro: "$34590",
      beneficios: [
        "2 Dispositivos a la vez.",
        "Resolución Full HD",
        "30 Descargas para ver offline",
      ],
    },
    {
      nombre: "Platino",
      titulo: "Platino",
      mensual: "11490/mes",
      anual: "95890/año",
      ahorro: "$41990",
      beneficios: [
        "4 Dispositivos a la vez.",
        "Resolución 4K Ultra HD*",
        "Audio Dolby Atmos*",
        "100 Descargas para disfrutar offline",
      ],
    },
  ];

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
            plan,
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
      className="max-w-7xl mx-auto px-4 min-h-screen flex flex-col gap-10 py-10 bg-cover bg-center"
      style={{
        backgroundImage: `url(${fondo})`,
      }}
    >
      <div className="flex justify-center px-4">
        <PlanSwitch
          active={active}
          promoMensual={promoMensual}
          promoAnual={promoAnual}
        />
      </div>
      <div className="max-w-7xl mx-auto w-full px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.nombre}
            className="bg-black/80 hover:bg-black duration-300 border-3 border-[#0830c2] rounded-3xl w-full min-h-72 text-white text-left p-6 flex flex-col justify-between">
            <div className="text-xl font-bold">{plan.titulo}</div>
            <div className="text-sm py-4 flex flex-col gap-2">
              {plan.beneficios.map((beneficio, index) => (
                <div key={index}>{beneficio}</div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
              <div className="font-extrabold text-lg">
                ${active === "anual" ? plan.anual : plan.mensual}
              </div>
              <button
                className="inline-flex h-8 animate-background-shine items-center justify-center rounded-md border border-[#0830c2] bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] px-2 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-gray-50 hover:cursor-pointer text-xs"
                onClick={() => handlePlan(`${plan.nombre}/${active}`)}
              >
                Elige este plan
              </button>
            </div>{active !== "anual" && (
              <div className="text-xs mt-4">
                O paga ${plan.anual}
                {" y ahorra "}
                {plan.ahorro}
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="max-w-6xl mx-auto px-4 text-white text-xs md:text-sm leading-6">
        *Full HD, 4K Ultra HD y Dolby Atmos no están disponibles en todo el
        contenido de cada plan. El contenido en vivo en los planes Estándar y
        Platino puede contener publicidad. Las descargas pueden estar limitadas
        de acuerdo con el tipo de contenido. Para más información,
        <code className="px-1">help.poroflix.com/plans</code>. Ahorro basado en
        un plan anual vs su versión mensual si es pagado por 12 meses. Requiere
        pago anticipado.
      </p>
    </div>
  );
};
