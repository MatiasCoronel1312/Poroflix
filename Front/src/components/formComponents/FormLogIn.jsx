import React, { useContext, useState } from "react";
import { Logo } from "../Logo";
//import { context } from "../../context";

const FormLogin = ({ handleLogin }) => {
  const [password , setPassword ] = useState(true)
  //   const {
  //     setIsLogin,
  //     loginOk,
  //     setLoginOk,
  //     form,
  //     handleChange,
  //     handleSubmit,
  //   } = useContext(context);

  //   const handleIsLogin = () => {
  //     setIsLogin(false);
  //   };
  const handleChangeType = () => {
    setPassword(!password);
  };
  return (
    <form className="w-[90%] h-full flex flex-col items-center justify-around mx-auto">
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
        //value={form.email}
        //onChange={handleChange}
        required
      />
      <div className="h-10 w-full relative">
        <input
          className="bg-slate-200 rounded h-10 w-full p-2"
          type={password ? "password" : "text"}
          id="password"
          name="password"
          placeholder="Contraseña"
          //value={form.password}
          //onChange={handleChange}
          required
        />
        <div
          className="text-gray-400 absolute right-3 top-2.5 hover:cursor-pointer"
          onClick={handleChangeType}
        >
          {
            //condicion?true:false
            password ? (
              <i class="fa-solid fa-eye h-full"></i>
            ) : (
              <i class="fa-solid fa-eye-slash"></i>
            )
          }
        </div>
      </div>
      <div className="flex justify-around w-full">
        <button className="inline-flex h-10 animate-background-shine items-center justify-center rounded-md border border-red-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2  focus:ring-offset-gray-50 hover:cursor-pointer">
          Iniciar sesion
        </button>
      </div>
      <p className="text-gray-400 text-sm">
        ¿Eres nuevo?{" "}
        <button className="hover:cursor-pointer text-red-600" onClick={handleLogin}>
          Regístrate
        </button>
      </p>
    </form>

    //-----------------LogIn-----------------------------------------------------------

    // <form className="flex flex-col p-2" onSubmit={handleSubmit}>
    //   <h1 className="font-bold text-center text-2xl p-2 items-center">
    //     Iniciar sesion
    //   </h1>
    //   <label className="font-bold py-2" htmlFor="email">
    //     Email
    //   </label>
    //   <input
    //     className="bg-slate-200 rounded p-2"
    //     type="email"
    //     id="email"
    //     name="email"
    //     value={form.email}
    //     onChange={handleChange}
    //     required
    //   />
    //   <label className="font-bold rounded py-2" htmlFor="email">
    //     Contraseña:
    //   </label>
    //   <input
    //     className="bg-slate-200 rounded p-2"
    //     type="password"
    //     id="password"
    //     name="password"
    //     value={form.password}
    //     onChange={handleChange}
    //     required
    //   />
    //   <input className="bg-[#822626] hover:bg-[#690202] cursor-pointer text-white mt-8 rounded p-2 hover:scale-[102%]" type="submit" />
    //   <div className="p-5">
    //     <p className="text-xs">
    //       No soy usuario registrado y quiero{" "}
    //       <span className="font-bold cursor-pointer" onClick={handleIsLogin}>
    //         crear una cuenta.
    //       </span>
    //     </p>
    //   </div>
    // </form>
  );
};

export default FormLogin;
