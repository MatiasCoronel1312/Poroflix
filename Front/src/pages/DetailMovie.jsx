import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const DetailMovie = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/movies/${id}`)
      .then((respuesta) => respuesta.json())
      .then((dato) => {
        setMovie(dato);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }, []);
  console.log(movie);
  return (
    <div className="w-full flex">
      <div className="w-[50%]">
        {/* <img className="p-3 rounded-4xl" src={movie.img}></img> */}
        <iframe
          width="560"
          height="315"
          className="rounded-4xl"
          src={movie.trailer}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <div className="flex justify-around p-3">
          <button className="inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2  focus:ring-offset-gray-50 hover:cursor-pointer">
            Agregar al carrito
          </button>
          <button className="inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-gray-50 hover:cursor-pointer">
            Comprar
          </button>
        </div>
      </div>
      <div className="w-[50%] px-5 text-gray-400">
        <div className="text-2xl font-bold text-white">{movie.title}</div>
        <p className="text-left">{movie.detail}</p>
        <div className="text-left my-1.5">Director: {movie.director}</div>
        <div className="text-left">Categoria: {movie.category}</div>
        <div className="text-left my-1.5">Duracion: {movie.duration}min.</div>
      </div>
    </div>
  );
};
