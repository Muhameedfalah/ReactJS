import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="max-w-60 mx-auto">
      <ul className="menu menu-horizontal px-1 gap-2 py-4">
        <li>
          <NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} >
            <span className="font-semibold text-base lg:text-lg">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/favs" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} >
            <span className="font-semibold text-base lg:text-lg">Favorites</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
