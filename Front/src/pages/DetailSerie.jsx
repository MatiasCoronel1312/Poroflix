import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

export const DetailSerie = () => {
  const [serie, setSerie] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${apiUrl}/series/${id}`)
      .then((respuesta) => respuesta.json())
      .then((dato) => setSerie(dato))
      .catch((error) => {
        console.log("error:", error);
      });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const addToList = async (contentId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}user-content`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        content_id: contentId,
        content_type: "series",
        action: "toggle_list",
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${serie.img})`,
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2">
            <div className="aspect-video w-full overflow-hidden rounded-3xl">
              <iframe
                className="w-full h-full"
                src={serie.trailer}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button className="inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-[#0830c2] bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] px-5 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-gray-50 hover:cursor-pointer" onClick={() => addToList(id)}>
                + Lista
              </button>
              <button
                className="inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-[#0830c2] bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] px-5 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-gray-50 hover:cursor-pointer"
                onClick={() => {
                  navigate(`/play/serie/${id}`);
                }}
              >
                Reproducir
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {serie.title}
            </h1>
            <p className="text-base md:text-lg leading-7">{serie.detail}</p>
            <div className="mt-6 space-y-3 text-base md:text-lg">
              <div>
                <span className="font-bold">Creador: </span>
                {serie.creator}
              </div>
              <div>
                <span className="font-bold">Categoría: </span>
                {serie.category}
              </div>
              <div>
                <span className="font-bold">Temporada: </span>
                {serie.seasons}
              </div>
              <div>
                <span className="font-bold">Episodios: </span>
                {serie.episodes}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
