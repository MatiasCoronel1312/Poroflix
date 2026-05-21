import React, { useContext, useState } from "react";
import { Logo } from "../Logo";
//import { context } from "../../context";

const FormLogin = () => {
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

  return (
    <form className="h-full flex flex-col items-center justify-around">
      <Logo />
      <h2 className="text-white">
        Inicia sesión para disfrutar de tus peliculas favoritas!
      </h2>
      <input
        className="bg-slate-200 rounded p-2"
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        //value={form.email}
        //onChange={handleChange}
        required
      />
      <input
        className="bg-slate-200 rounded p-2"
        type="password"
        id="password"
        name="password"
        placeholder="Contraseña"
        //value={form.password}
        //onChange={handleChange}
        required
      />
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
