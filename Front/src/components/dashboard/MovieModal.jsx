import { useEffect } from "react";
import { useForm } from "react-hook-form";

const MovieModal = ({ isOpen, onClose, onSave, movie }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (movie) {
      reset(movie);
    } else {
      reset({
        title: "",
        director: "",
        category: "",
        description: "",
        detail: "",
        duration: "",
        img: "",
        trailer: "",
      });
    }
  }, [movie]);

  const submit = (data) => {
    onSave(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center">
      <div className="bg-black border border-blue-700 rounded-3xl w-175 p-8">
        <div className="flex justify-between mb-8">
          <h2 className="text-3xl font-bold">
            {movie ? "Editar película" : "Agregar película"}
          </h2>
          <button onClick={onClose} className="text-2xl hover:cursor-pointer">
            ✖
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(submit)}>
          <input
            placeholder="Título"
            className="w-full p-3 rounded bg-gray-900"
            {...register("title")}
          />

          <input
            placeholder="Director"
            className="w-full p-3 rounded bg-gray-900"
            {...register("director")}
          />

          <input
            placeholder="Categoría"
            className="w-full p-3 rounded bg-gray-900"
            {...register("category")}
          />

          <textarea
            placeholder="Descripción"
            className="w-full p-3 rounded bg-gray-900"
            {...register("description")}
          />

          <textarea
            placeholder="Detalle"
            className="w-full p-3 rounded bg-gray-900"
            {...register("detail")}
          />

          <input
            type="number"
            placeholder="Duración"
            className="w-full p-3 rounded bg-gray-900"
            {...register("duration")}
          />

          <input
            placeholder="Imagen URL"
            className="w-full p-3 rounded bg-gray-900"
            {...register("img")}
          />

          <input
            placeholder="Trailer URL"
            className="w-full p-3 rounded bg-gray-900"
            {...register("trailer")}
          />

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-500 rounded-xl"
            >
              Cancelar
            </button>

            <button type="submit" className="bg-blue-700 px-5 py-2 rounded-xl">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieModal;
