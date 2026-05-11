import { useEffect, useState } from "react";
import { Card } from "../components/Card";

export const Home = () => {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    fetch("http://127.0.0.1:5000/movies")
      .then((respuesta) => respuesta.json())
      .then((datos) => {setMovies(datos)})
      .catch((error)=>{
        console.log("error:",error)
      })
  }, [])
  

  return (
    <div className="w-full py-10 flex flex-col md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-3 gap-4 justify-between">
      {movies.map((pelicula) => (
        <Card
          id={pelicula.id}
          key={pelicula.id}
          title={pelicula.title}
          director={pelicula.director}
          category={pelicula.category}
          description={pelicula.description}
          duration={pelicula.duration}
          img={pelicula.img}
        />
      ))}
    </div>
  );
};
