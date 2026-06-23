import { useEffect, useState } from "react";
import SerieModal from "./SerieModal";


const DashboardSeries = ({ refreshStats }) => {
    const [series, setSeries] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSerie, setSelectedSerie] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
  
    const getSeries = async () => {
      try {
        const response = await fetch(`${apiUrl}series`);
        const result = await response.json();
        setSeries(result);
      } catch (error) {
        console.log(error);
      }
    };
    const saveSerie = async (data) => {
      try {
        const method = selectedSerie ? "PUT" : "POST";
  
        const endpoint = selectedSerie
          ? `${apiUrl}series/${selectedSerie.id}`
          : `${apiUrl}series`;
  
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
        getSeries();
        refreshStats();
      } catch (error) {
        console.log(error);
      }
    };
    const deleteSerie = async (id) => {
      try {
        await fetch(`${apiUrl}series/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await getSeries();
        await refreshStats();
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getSeries();
    }, []);
  
    return (
      <div className="border border-blue-700 rounded-3xl p-8">
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold mb-6 px-5 py-2">Películas</h2>
          <button
            className="bg-blue-700 px-5 py-2 rounded-xl hover:cursor-pointer"
            onClick={() => {
              setSelectedSerie(null);
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
                  <th>Creador</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {series.map((serie) => (
                  <tr key={serie.id} className="border-b border-gray-800">
                    <td className="py-4">
                      <img
                        src={serie.img}
                        className="w-20 h-28 object-cover rounded-lg"
                      />
                    </td>
                    <td>{serie.title}</td>
                    <td>{serie.category}</td>
                    <td>{serie.creator}</td>
                    <td>
                      <div className="flex gap-3">
                        <button
                          className="bg-yellow-600 px-3 py-1 rounded-lg"
                          onClick={() => {
                            setSelectedSerie(serie);
                            setIsOpen(true);
                          }}
                        >
                          Editar
                        </button>
  
                        <button
                          className="bg-red-700 px-3 py-1 rounded-lg hover:cursor-pointer"
                          onClick={() => deleteSerie(serie.id)}
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
        <SerieModal
          isOpen={isOpen}
          serie={selectedSerie}
          onClose={() => setIsOpen(false)}
          onSave={saveSerie}
        />
      </div>
    );
  };
  


export default DashboardSeries;
