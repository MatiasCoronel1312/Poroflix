import React, { useState } from "react";
import { Logo } from "../Logo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/registerSchema.js";

const FormSignIn = ({ handleLogin }) => {
  const [password1, setPassword1] = useState(true);
  const [password2, setPassword2] = useState(true);

  const handleChangeType1 = () => {
    setPassword1(!password1);
  };
  const handleChangeType2 = () => {
    setPassword2(!password2);
  };
  //----------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    // try {
    //   const response = await fetch(
    //     "http://localhost:5000/register",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(data),
    //     }
    //   );

    //   const result = await response.json();

    //   console.log(result);

    // } catch (error) {
    //   console.log(error);
    // }
    console.log(data);
  };
  //------------------------------------------------------

  return (
    <form
      className="w-[90%] h-full flex flex-col items-center justify-around mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Logo />
      <h2 className="text-white w-full">
        Suscribase para elegir el plan que se adapte a sus necesidades!
      </h2>

      <input
        className="bg-slate-200 rounded h-10 w-full p-2"
        type="text"
        id="username"
        name="username"
        placeholder="Usuario"
        {...register("username")}
        required
      ></input>
      {errors.username && (
        <p className="text-red-600 text-xs">{errors.username.message}</p>
      )}
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
          type={password1 ? "password" : "text"}
          id="password"
          name="password"
          placeholder="Contraseña"
          {...register("password")}
          required
        />
        <div
          className="text-gray-400 absolute right-3 top-2.5 hover:cursor-pointer"
          onClick={handleChangeType1}
        >
          {
            //condicion?true:false
            password1 ? (
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
      <div className="h-10 w-full relative">
        <input
          className="bg-slate-200 rounded h-10 w-full p-2"
          type={password2 ? "password" : "text"}
          id="password"
          name="password"
          placeholder="Confirmar Contraseña"
          {...register("confirmPassword")}
          required
        />
        <div
          className="text-gray-400 absolute right-3 top-2.5 hover:cursor-pointer"
          onClick={handleChangeType2}
        >
          {
            //condicion?true:false
            password2 ? (
              <i class="fa-solid fa-eye h-full"></i>
            ) : (
              <i class="fa-solid fa-eye-slash"></i>
            )
          }
        </div>
      </div>
      {errors.confirmPassword && <p className="text-red-600 text-xs">{errors.confirmPassword.message}</p>}
      <div className="flex justify-center w-full ">
        <button
          type="submit"
          className="inline-flex h-10 animate-background-shine items-center justify-center rounded-md border border-red-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%]  w-[70%] font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-gray-50 hover:cursor-pointer"
        >
          Registrarse
        </button>
      </div>
      <div className="w-full flex justify-center">
        <p className="text-gray-400 text-sm">
          ¿Ya tienes cuenta?{" "}
          <button
            className="text-red-600 hover:cursor-pointer"
            onClick={handleLogin}
          >
            Iniciar sesion
          </button>
        </p>
      </div>
    </form>
  );
};

export default FormSignIn;
