import React from 'react'
import { Logo } from "../Logo";

const FormSignIn = ({handleLogin}) => {
  return (
        <form className= "w-full h-full flex flex-col items-center justify-around">
          <Logo />
          <h2 className="text-white">
            Suscribase para elegir el plan que se adapte a sus necesidades!
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
          <div className="flex justify-around  w-full ">
              <button className="inline-flex h-10 animate-background-shine items-center justify-center rounded-md border border-red-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2  focus:ring-offset-gray-50 hover:cursor-pointer" onClick={handleLogin}>
                Iniciar sesion
              </button>
              <button className="inline-flex h-10 animate-background-shine items-center justify-center rounded-md border border-red-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-gray-50 hover:cursor-pointer">
                Registrarse
              </button>
          </div>
        
        </form>
  );
};

export default FormSignIn;
