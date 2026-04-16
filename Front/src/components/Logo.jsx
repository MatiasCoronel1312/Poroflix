import { Link } from "react-router-dom"
import logo from "../assets/Logo.png"
export const Logo = () => {
  return (
    <Link className="h-[90%]" to="/"><img src={logo} alt="logo" className="h-full"/></Link>
  )
}
