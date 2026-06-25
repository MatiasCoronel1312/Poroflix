import { useEffect } from "react";
import { useForm } from "react-hook-form";

const SerieModal = ({ isOpen, onClose, onSave, serie }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (serie) {
      reset(serie);
    } else {
      reset({
        title: "",
        creator: "",
        category: "",
        description: "",
        detail: "",
        seasons: null,
        episodes: null,
        img: "",
        trailer: "",
      });
    }
  }, [serie]);

  const submit = (data) => {
    onSave(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center">
      <div className="bg-black border border-blue-700 rounded-3xl w-175 p-8">
        <div className="flex justify-between mb-8">
          <h2 className="text-3xl font-bold">
            {serie ? "Editar series" : "Agregar series"}
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
            placeholder="Creador"
            className="w-full p-3 rounded bg-gray-900"
            {...register("creator")}
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
            placeholder="Temporada"
            className="w-full p-3 rounded bg-gray-900"
            {...register("seasons")}
          />
          <input
            type="number"
            placeholder="Episodios"
            className="w-full p-3 rounded bg-gray-900"
            {...register("episodes")}
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

export default SerieModal;
