import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../schemas/checkoutSchema";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "@/components/contexts/store";

export const Checkout = () => {

  const navigate = useNavigate();
  const [importe, setImporte] = useState(0)
  const [plan, setPlan] = useState("")
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  useEffect(() => {
    setPlan(localStorage.getItem("selectedPlan"))
    window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
  }, [])
  useEffect(() => {
     if (plan == "Basico/mensual"){
        setImporte(7390)
    }else if(plan=="Basico/anual"){
        setImporte(64490)
    }else if(plan=="Estandar/mensual"){
        setImporte(9590)
    }else if(plan=="Estandar/anual"){
        setImporte(80490)
    }else if(plan=="Platino/mensual"){
        setImporte(11490)
    }else if(plan=="Platino/anual"){
        setImporte(95890)
    }else{setImporte("error")}
  }, [plan])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(checkoutSchema)
  });

  const onSubmit = async (data) => {

    try {

      const token = localStorage.getItem("token");

      console.log(data);

      // Acá luego conectarás con tu backend

      alert("Suscripción activada");

      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center py-10">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-zinc-900 rounded-xl p-8 border border-blue-700"
      >

        <h1 className="text-white text-4xl font-bold mb-8 text-center">
          Finalizar Suscripción
        </h1>

        {/* DATOS PERSONALES */}

        <h2 className="text-white text-2xl mb-6">
          Datos Personales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <input
              placeholder="Nombre"
              {...register("firstName")}
              className="w-full p-3 rounded bg-zinc-800 text-white"
            />
            <p className="text-red-500 text-sm">
              {errors.firstName?.message}
            </p>
          </div>

          <div>
            <input
              placeholder="Apellido"
              {...register("lastName")}
              className="w-full p-3 rounded bg-zinc-800 text-white"
            />
            <p className="text-red-500 text-sm">
              {errors.lastName?.message}
            </p>
          </div>

          <div>
            <input
              placeholder="DNI"
              {...register("dni")}
              className="w-full p-3 rounded bg-zinc-800 text-white"
            />
            <p className="text-red-500 text-sm">
              {errors.dni?.message}
            </p>
          </div>

          <div>
            <input
              placeholder="Teléfono"
              {...register("phone")}
              className="w-full p-3 rounded bg-zinc-800 text-white"
            />
            <p className="text-red-500 text-sm">
              {errors.phone?.message}
            </p>
          </div>

        </div>

        <div className="mt-4">

          <input
            placeholder="Dirección"
            {...register("address")}
            className="w-full p-3 rounded bg-zinc-800 text-white"
          />

          <p className="text-red-500 text-sm">
            {errors.address?.message}
          </p>

        </div>

        {/* PAGO */}

        <h2 className="text-white text-2xl mt-10 mb-6">
          Información de Pago
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="md:col-span-2">
            <input
              placeholder="Titular de la tarjeta"
              {...register("cardHolder")}
              className="w-full p-3 rounded bg-zinc-800 text-white"
            />
            <p className="text-red-500 text-sm">
              {errors.cardHolder?.message}
            </p>
          </div>

          <div className="md:col-span-2">
            <input
              placeholder="Número de tarjeta"
              {...register("cardNumber")}
              className="w-full p-3 rounded bg-zinc-800 text-white"
            />
            <p className="text-red-500 text-sm">
              {errors.cardNumber?.message}
            </p>
          </div>

          <div>
            <input
              placeholder="MM/AA"
              {...register("expiryDate")}
              className="w-full p-3 rounded bg-zinc-800 text-white"
            />
            <p className="text-red-500 text-sm">
              {errors.expiryDate?.message}
            </p>
          </div>

          <div>
            <input
              placeholder="CVV"
              {...register("cvv")}
              className="w-full p-3 rounded bg-zinc-800 text-white"
            />
            <p className="text-red-500 text-sm">
              {errors.cvv?.message}
            </p>
          </div>

        </div>

        {/* RESUMEN */}

        <div className="mt-10 p-5 rounded bg-zinc-800 border border-blue-700">

          <h3 className="text-white text-xl mb-2">
            Importe: ${importe}
          </h3>

          <p className="text-gray-300">
            Plan:
            <span className="text-white font-bold ml-2">
              {plan}
            </span>
          </p>

        </div>

        <button
          type="submit"
          className="w-full mt-8 h-12 rounded bg-blue-700 hover:bg-blue-600 text-white font-bold transition"
        >
          Confirmar Suscripción
        </button>

      </form>

    </div>
  );
};
