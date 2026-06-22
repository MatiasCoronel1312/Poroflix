import { useEffect, useState } from "react";
import MovieModal from "./MovieModal";

const DashboardMovies = ({ refreshStats }) => {
  const [movies, setMovies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const getMovies = async () => {
    try {
      const response = await fetch(`${apiUrl}movies`);
      const result = await response.json();
      setMovies(result);
    } catch (error) {
      console.log(error);
    }
  };
  const saveMovie = async (data) => {
    try {
      const method = selectedMovie ? "PUT" : "POST";

      const endpoint = selectedMovie
        ? `${apiUrl}movies/${selectedMovie.id}`
        : `${apiUrl}movies`;

      await fetch(
        endpoint,
        {
          method, headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(data),
        },
      );
      setIsOpen(false);
      getMovies();
      refreshStats();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMovie = async (id) => {
    try {
      await fetch(`${apiUrl}movies/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getMovies();
      await refreshStats();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="border border-blue-700 rounded-3xl p-8">
      <div className="flex justify-center">
        <h2 className="text-3xl font-bold mb-6 px-5 py-2">Películas</h2>
        <button
          className="bg-blue-700 px-5 py-2 rounded-xl hover:cursor-pointer"
          onClick={() => {
            setSelectedMovie(null);
            setIsOpen(true);
          }}
        >
          Agregar
        </button>
      </div>
      <div className="flex gap-4 max-h-[70vh] scrollbar-hide">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="sticky top-0 border-b bg-black z-10 border-blue-700">
                <th className="py-4">Imagen</th>
                <th>Título</th>
                <th>Categoría</th>
                <th>Director</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id} className="border-b border-gray-800">
                  <td className="py-4">
                    <img
                      src={movie.img}
                      className="w-20 h-28 object-cover rounded-lg"
                    />
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.category}</td>
                  <td>{movie.director}</td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        className="bg-yellow-600 px-3 py-1 rounded-lg"
                        onClick={() => {
                          setSelectedMovie(movie);
                          setIsOpen(true);
                        }}
                      >
                        Editar
                      </button>

                      <button
                        className="bg-red-700 px-3 py-1 rounded-lg hover:cursor-pointer"
                        onClick={() => deleteMovie(movie.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <MovieModal
        isOpen={isOpen}
        movie={selectedMovie}
        onClose={() => setIsOpen(false)}
        onSave={saveMovie}
      />
    </div>
  );
};

export default DashboardMovies;
