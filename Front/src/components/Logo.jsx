import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
export const Logo = () => {
  return (
    <Link
      className="h-[90%] flex items-center hover:scale-90 duration-500"
      to="/"
    >
      <div className="w-50 h-[90%] relative">
        <div className="absolute top-5 italic left-0 z-20 text-white text-4xl font-bold drop-shadow-md [text-shadow:4px_4px_3px_rgba(146,0,0,0.5)] hover:scale-110 duration-300">
          POROFLIX
        </div>
        <div
          className="ml-5 w-34 h-23 pr-[4.5px] bg-[#920000]
            [clip-path:polygon(0%_0%,100%_50%,0%_100%)] flex justify-center items-center"
        >
          <div
            className="w-32 h-22 bg-black 
            [clip-path:polygon(0%_0%,100%_50%,0%_100%)] flex justify-center items-center "
          ></div>
        </div>
      </div>
    </Link>
  );
};
