import { Promo } from "@/pages/Promo";
import { DetailMovie } from "../pages/DetailMovie";
import { DetailSerie } from "../pages/DetailSerie";
import { Historial } from "../pages/Historial";
import { Home } from "../pages/Home";
import { Checkout } from "@/pages/Checkout";
import Movies from "@/pages/Movies";
import Series from "@/pages/Series";
import AdminDashboard from "./AdminDashboard";
import UserPerfil from "./UserPerfil";
import PlayRoute from "./PlayRoute";

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
    id: "detailSerie",
    path: "/serie/:id",
    Element: DetailSerie,
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
    id: "perfil",
    path: "/perfil",
    Element: UserPerfil
  },
  {
    id: "play",
    path: "/play/:type/:id",
    Element: PlayRoute
  }
];
