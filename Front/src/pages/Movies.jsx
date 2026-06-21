import React from "react";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";

const Movies = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("Todos");
  const genres = ["Todos", ...new Set(movies.map((movie) => movie.category))];
  useEffect(() => {
    fetch(`${apiUrl}/movies`)
      .then((respuesta) => respuesta.json())
      .then((datos) => setMovies(datos))
      .catch((error) => {
        console.log("error:", error, ".env:", apiUrl);
      });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const filteredMovies =
    genre === "Todos"
      ? movies
      : movies.filter((movie) => movie.category === genre);

  return (
    <main className="w-full">
      <section className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-7 gap-1 p-5 mx-auto text-xs sm:text-sm">
        {genres.map((item) => (
          <button
            className="inline-flex h-10 animate-background-shine items-center justify-center rounded-md border border-[#0830c2] bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] px-5 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-gray-50 hover:cursor-pointer mx-1"
            onClick={() => setGenre(item)}
          >
            {item}
          </button>
        ))}
      </section>
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMovies.map((pelicula) => (
            <Card
              key={pelicula.id}
              id={pelicula.id}
              title={pelicula.title}
              director={pelicula.director}
              category={pelicula.category}
              description={pelicula.description}
              duration={pelicula.duration}
              img={pelicula.img}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Movies;
