import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import Footer from './Footer/Footer'


const Layout = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen w-full font-montserrat">
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
};
export default Layout;