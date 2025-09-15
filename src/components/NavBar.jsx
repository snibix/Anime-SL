import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../public/logo/logo.webp";

function NavBar({ setSelectedCategory, searchTerm, setSearchTerm }) {
  const categories = [
    "All",
    "Action",
    "Adventure",
    "Drama",
    "Comedy",
    "Fantasy",
  ];

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="img-fluid img-perso" alt="Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCategories"
          aria-controls="navbarCategories"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCategories">
          <ul className="navbar-nav mx-auto text-uppercase">
            {categories.map((cat) => (
              <li key={cat} className="nav-item">
                <button
                  className="nav-link btn btn-link text-white"
                  onClick={() => setSelectedCategory(cat)}
                  style={{ textDecoration: "none" }}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Barre de recherche */}
        <form className="d-flex ms-3">
          <input
            className="form-control"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  setSelectedCategory: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default NavBar;
