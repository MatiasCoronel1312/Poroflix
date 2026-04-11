import React from "react";
import { Lista } from "./Lista";
import { Novedades } from "./Novedades";

export const Menu = () => {
  return (
    <ul className="flex">
        <Lista/>
        <Novedades/>
    </ul>
  );
};
