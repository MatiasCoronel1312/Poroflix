import React, { useState } from "react";

export const PlanSwitch = ({active, promoAnual, promoMensual}) => {

  return (
    <div className="flex justify-center items-center h-10 bg-black/0">
      <div className="relative flex bg-black/80 rounded-full p-1 w-96 h-10 justify-center items-center">
        <div className="text-xs absolute -top-4 right-5 text-white">
            Ahorra hasta 30%
        </div>
        <div
          className={`
            absolute top-1 left-1
            h-[calc(100%-8px)] w-[calc(50%-4px)]
            rounded-full bg-white
            transition-all duration-300
            ${active === "anual" ? "translate-x-full" : ""}
          `}
        />

        {/* Botón mensual */}
        <button
          onClick={promoMensual}
          className={`
            relative z-10 flex-1 py-3 rounded-full
            font-bold transition-colors duration-300
            text-lg
            ${active === "mensual" ? "text-black" : "text-white"}
          `}
        >
          MENSUAL
        </button>

        {/* Botón anual */}
        <button
          onClick={promoAnual}
          className={`
            relative z-10 flex-1 py-3 rounded-full
            font-bold transition-colors duration-300
            text-lg
            ${active === "anual" ? "text-black" : "text-white"}
          `}
        >
          ANUAL
        </button>
      </div>
    </div>
  );
};
