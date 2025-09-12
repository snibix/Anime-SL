// NavBarCat.js
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavBarCat({ setSelectedCategory }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav text-uppercase container">
            <li className="nav-item">
              <Link
                className="nav-link active"
                onClick={() => setSelectedCategory("All")}
                href="#"
              >
                All
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                onClick={() => setSelectedCategory("Action")}
                href="#"
              >
                Action
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={() => setSelectedCategory("Adventure")}
                href="#"
              >
                Adventure
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={() => setSelectedCategory("Drama")}
                href="#"
              >
                Drama
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={() => setSelectedCategory("Comedy")}
                href="#"
              >
                Comedy
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                href="#"
                onClick={() => setSelectedCategory("Fantasy")}
              >
                Fantasy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

NavBarCat.propTypes = {
  setSelectedCategory: PropTypes.func.isRequired,
};

export default NavBarCat;
