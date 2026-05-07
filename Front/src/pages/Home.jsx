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
    <div className="w-full p-10 flex justify-between">
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
