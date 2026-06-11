import { Promo } from "@/pages/Promo";
import { DetailMovie } from "../pages/DetailMovie";
import { Historial } from "../pages/Historial";
import { Home } from "../pages/Home";
import { Checkout } from "@/pages/Checkout";

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
  id: "detailMovie",
  path : "/pelicula/:id",
  Element : DetailMovie
 },
 {
  id: "promo",
  path : "/promo",
  Element : Promo
 },
 {
  id: "checkout",
  path : "/checkout",
  Element : Checkout
 }
];