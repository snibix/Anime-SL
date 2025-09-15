import { motion } from "motion/react";
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
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link className="navbar-brand me-2" to="/">
          <img src={logo} className="img-fluid img-perso" alt="Logo" />
        </Link>

        {/* Barre de recherche sur mobile */}
        <form className="d-flex flex-grow-1 me-2 d-lg-none w-50">
          <input
            className="form-control"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Burger menu */}
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

        {/* Catégories + recherche desktop */}
        <div className="collapse navbar-collapse" id="navbarCategories">
          <ul className="navbar-nav mx-auto text-uppercase">
            {categories.map((cat) => (
              <motion.li
                key={cat}
                className="nav-item px-2"
                whileHover={{
                  y: -3,
                  scale: 1.02,
                  transition: {
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.15,
                  },
                }}
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.2,
                }}
              >
                <button
                  className="nav-link btn btn-link text-white"
                  onClick={() => setSelectedCategory(cat)}
                  style={{ textDecoration: "none" }}
                >
                  {cat}
                </button>
              </motion.li>
            ))}
          </ul>

          {/* Barre de recherche desktop */}
          <form className="d-flex d-none d-lg-flex ms-3">
            <input
              className="form-control"
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
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
