import React, { useContext, useState } from "react";
import { Logo } from "../Logo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../../schemas/loginSchema";

const FormLogin = ({ handleLogin }) => {
  const [password, setPassword] = useState(true);
  const handleChangeType = () => {
    setPassword(!password);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
       localStorage.setItem("token", result.token);
       console.log(result);
       
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="w-[90%] h-full flex flex-col items-center justify-around mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Logo />
      <h2 className="text-white w-full">
        Inicia sesión para disfrutar de tus peliculas favoritas!
      </h2>
      <input
        className="bg-slate-200 rounded h-10 w-full p-2"
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        {...register("email")}
        required
      />
      {errors.email && (
        <p className="text-red-600 text-xs">{errors.email.message}</p>
      )}
      <div className="h-10 w-full relative">
        <input
          className="bg-slate-200 rounded h-10 w-full p-2"
          type={password ? "password" : "text"}
          id="password"
          name="password"
          placeholder="Contraseña"
          {...register("password")}
          required
        />
        <div
          className="text-gray-400 absolute right-3 top-2.5 hover:cursor-pointer"
          onClick={handleChangeType}
        >
          {
            //condicion?true:false
            password ? (
              <i className="fa-solid fa-eye h-full"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )
          }
        </div>
      </div>
      {errors.password && (
        <p className="text-red-600 text-xs">{errors.password.message}</p>
      )}
      <div className="flex justify-around w-full">
        <button
          type="submit"
          className="inline-flex h-10 animate-background-shine items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2  focus:ring-offset-gray-50 hover:cursor-pointer"
        >
          Iniciar sesion
        </button>
      </div>
      <p className="text-gray-400 text-sm">
        ¿Eres nuevo?{" "}
        <button
          className="hover:cursor-pointer text-blue-600"
          onClick={handleLogin}
        >
          Regístrate
        </button>
      </p>
    </form>
  );
};

export default FormLogin;
