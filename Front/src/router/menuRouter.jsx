import { Carrito } from "../pages/Carrito";
import { Historial } from "../pages/Historial";
import { Home } from "../pages/Home";

export const menuRouter = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },
  {
    id: "historial",
    path: "/historial",
    Element: Historial
  },
  {
    id: "carrito",
    path: "/carrito",
    Element: Carrito
  }
 
];