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
        <iframe width="560" height="315" className="rounded-4xl" src={movie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <button className="bt">Agregar al carrito</button>
        <button >Comprar</button>
      </div>
      <div className="w-[50%] p-3">
        <div className="text-2xl font-bold">{movie.title}</div>
        <div className="">{movie.detail}</div>
        <div>Director: {movie.director}</div>
        <div>Categoria: {movie.category}</div>
        <div>Duracion: {movie.duration}min.</div>
      </div>
    </div>
  );
};
