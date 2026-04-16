import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-8 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Izquierda: Derechos reservados */}
        <div className="text-sm font-light">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </div>

        {/* Derecha: Iconos de Redes Sociales */}
        <div className="flex gap-6 text-2xl">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-blue-600 transition-all duration-300"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-pink-500 transition-all duration-300"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-sky-400 transition-all duration-300"
          >
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
