import { Historial } from "../pages/Historial";
import { Home } from "../pages/home";

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
  }
 
];