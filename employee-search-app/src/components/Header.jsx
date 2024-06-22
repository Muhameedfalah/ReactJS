import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import Navbar from "./Navbar"
const Header = () => {
  return (
    <header className="navbar bg-base-100 border-b border-slate-300 px-4">
      <div className="container mx-auto">
        <Link to={"/"}>
          <img className="h-6 lg:h-10" src={Logo} alt="logo" />
        </Link>
        <Navbar></Navbar>
      </div>
    </header>
  )
}

export default Header