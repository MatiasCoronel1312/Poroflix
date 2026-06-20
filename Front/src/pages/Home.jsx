import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { CarouselHome } from "@/components/CarouselHome";

export const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/movies`)
      .then((respuesta) => respuesta.json())
      .then((datos) => setMovies(datos))
      .catch((error) => {
        console.log("error:", error, ".env:", apiUrl);
      });

    const getProfile = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    const user = await response.json();
      localStorage.setItem("role", user.role);
    };
    getProfile();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className="w-full">
      <section className="w-full h-85 sm:h-80 md:h-112 flex items-center justify-center">
        <CarouselHome movies={movies} />
      </section>
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((pelicula) => (
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
