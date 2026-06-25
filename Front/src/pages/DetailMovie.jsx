import { useStore } from "@/components/contexts/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export const DetailMovie = () => {
  const [movie, setMovie] = useState({});
  const [liked, setLiked] = useState(null);
  const [inList, setInList] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const handleOpenModal = useStore((state) => state.handleOpenModal);
  const styleButton =
    "inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-[#0830c2] bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] px-5 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-gray-50 hover:cursor-pointer";

  useEffect(() => {
    fetch(`${apiUrl}/movies/${id}`)
      .then((respuesta) => respuesta.json())
      .then((dato) => setMovie(dato))
      .catch((error) => {
        console.log("error:", error);
      });
    if (token) {
      fetchUserContent();
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const fetchUserContent = async () => {
    try {
      const response = await fetch(`${apiUrl}user-content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener userContent");
      }
      const data = await response.json();
      console.log(data);
      
      const currentContent = data.find(
        (item) => item.id === Number(id) && item.type === "movie",
      );
      console.log(currentContent);
      

      setLiked(currentContent.liked ?? false);
      setInList(currentContent.in_list ?? false);
    } catch (error) {
      console.error(error);
    }
  };

  const addToList = async (contentId) => {
    const response = await fetch(`${apiUrl}user-content`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        content_id: contentId,
        content_type: "movie",
        action: "toggle_list",
      }),
    });
    const data = await response.json();
    setInList(data.in_list)
    console.log(data);
  };

  const updateUserContent = async (contentId, action) => {
    const response = await fetch(`${apiUrl}user-content`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        content_id: contentId,
        content_type: "movie",
        action,
      }),
    });
    const data = await response.json();
    console.log(data);
    setLiked(data.liked);
  };

  const handleLike = async () => {
    if (!token) {
      handleOpenModal();
      navigate("/");
      return;
    }
    await updateUserContent(id, "like");
  };
  const handleDislike = async () => {
    if (!token) {
      handleOpenModal();
      navigate("/");
      return;
    }
    await updateUserContent(id, "dislike");
  };

  const handleAddToList = (id) => {
    if (!token) {
      handleOpenModal();
      navigate("/");
      return;
    }
    addToList(id);
  };
  const handlePlay = (id) => {
    if (!token) {
      handleOpenModal();
      navigate("/");
      return;
    }
    navigate(`/play/movie/${id}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.img})`,
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
                src={movie.trailer}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button
                className={styleButton}
                onClick={() => handleAddToList(id)}
              >
               {inList?" - ":" + "}Lista
              </button>
              <button
                className={styleButton}
                onClick={() => {
                  handlePlay(id);
                }}
              >
                Reproducir
              </button>
              <button onClick={handleLike}>
                {liked === true ? (
                  <i
                    className={`fa-solid fa-thumbs-up ${styleButton} text-xl p-2.5`}
                  ></i>
                ) : (
                  <i
                    className={`fa-regular fa-thumbs-up ${styleButton} text-xl p-2.5`}
                  ></i>
                )}
              </button>

              <button onClick={handleDislike}>
                {liked === false ? (
                  <i
                    className={`fa-solid fa-thumbs-down ${styleButton} text-xl p-2.5`}
                  ></i>
                ) : (
                  <i
                    className={`fa-regular fa-thumbs-down ${styleButton} text-xl p-2.5`}
                  ></i>
                )}
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {movie.title}
            </h1>
            <p className="text-base md:text-lg leading-7">{movie.detail}</p>
            <div className="mt-6 space-y-3 text-base md:text-lg">
              <div>
                <span className="font-bold">Director:</span>
                {movie.director}
              </div>
              <div>
                <span className="font-bold">Categoría:</span>
                {movie.category}
              </div>
              <div>
                <span className="font-bold">Duración:</span>
                {movie.duration} min
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
