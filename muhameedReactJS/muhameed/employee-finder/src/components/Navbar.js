import { Link } from "react-router-dom";
import Logo from '../assets/logo.png';
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="logo"/>
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/favs">
              Favorites
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar