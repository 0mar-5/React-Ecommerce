import "./Navbar.css";
import { IoBag } from "react-icons/io5";
import { useCart } from "../../context/useCart";
import { Link, NavLink } from "react-router-dom";
import Logout from "../Logout/Logout";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const { totalItems } = useCart();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-white p-3 nav">
      <div className="container">
        <Link to="/" className="navbar-brand nav__logo">
          FashionHub
        </Link>
        {/* burger menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link active nav__link"
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav__link" to="/contact">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              {isLoggedIn ? (
                <Logout setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <NavLink className="nav-link nav__link" to="/login">
                  Login
                </NavLink>
              )}
            </li>
          </ul>
          <span className="navbar-text nav__link cart__logo">
            <NavLink to="/cart">
              <IoBag />
            </NavLink>

            <span>{totalItems}</span>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
