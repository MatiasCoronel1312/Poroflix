import { Promo } from "@/pages/Promo";
import { DetailMovie } from "../pages/DetailMovie";
import { Historial } from "../pages/Historial";
import { Home } from "../pages/Home";
import { Checkout } from "@/pages/Checkout";
import Movies from "@/pages/Movies";
import Series from "@/pages/Series";
import AdminDashboard from "./AdminDashboard";
import UserMiLIsta from "./UserMiLIsta";
import UserPerfil from "./UserPerfil";

export const menuRouter = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },
  {
    id: "historial",
    path: "/historial",
    Element: Historial,
  },
  {
    id: "detailMovie",
    path: "/pelicula/:id",
    Element: DetailMovie,
  },
  {
    id: "promo",
    path: "/promo",
    Element: Promo,
  },
  {
    id: "checkout",
    path: "/checkout",
    Element: Checkout,
  },
  {
    id: "movies",
    path: "/movies",
    Element: Movies,
  },
  {
    id: "series",
    path: "/series",
    Element: Series,
  },
  {
    id: "dashboard",
    path: "/dashboard",
    Element: AdminDashboard
  },
  {
    id: "milista",
    path: "/milista",
    Element: UserMiLIsta
  },
  {
    id: "perfil",
    path: "/perfil",
    Element: UserPerfil
  }
];
