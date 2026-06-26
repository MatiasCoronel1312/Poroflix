import React from "react";
import { useEffect, useState } from "react";
import { CardSerie } from "../components/CardSerie";

const Series = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [series, setSeries] = useState([]);
  const [genre, setGenre] = useState("Todos");
  const genres = ["Todos", ...new Set(series.map((item) => item.category))];
  useEffect(() => {
    fetch(`${apiUrl}series`)
      .then((respuesta) => respuesta.json())
      .then((datos) => setSeries(datos))
      .catch((error) => {
          console.log("error:", error, ".env:", apiUrl);
        });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const filteredSeries =
    genre === "Todos"
      ? series
      : series.filter((serie) => serie.category === genre);

  return (
    <main className="w-full">
      <section className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-7 gap-3 p-5 max-w-7xl mx-auto px-4 text-xs sm:text-sm">
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
          {filteredSeries.map((serie) => (
            <CardSerie
              key={serie.id}
              id={serie.id}
              title={serie.title}
              category={serie.category}
              description={serie.description}
              img={serie.img}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Series;