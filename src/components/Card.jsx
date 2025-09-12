import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Card({ anime }) {
  return (
    <article className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow">
        {/* Image responsive avec ratio fixe */}
        <div className="position-relative">
          <Link to={`/anime/${anime.mal_id}`} className="text-decoration-none">
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="card-img-top rounded-top"
              style={{
                height: "250px",
                width: "100%",
                objectFit: "contain",
                backgroundColor: "#f8f9fa",
              }}
            />
          </Link>
        </div>

        {/* Contenu de la carte */}
        <div className="card-body d-flex flex-column">
          <h3 className="card-title text-uppercase fs-5 fs-md-4 mb-3 text-center text-md-start">
            {anime.title_english}
          </h3>

          <p
            className="card-text synop-perso flex-grow-1 mb-3"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "1.4",
              height: "calc(1.5em * 4.8)",
            }}
          >
            {anime.synopsis}
          </p>

          {/* Informations en bas */}
          <div className="mt-auto">
            <div className="row g-2">
              <div className="col-6">
                <p className="synop-perso mb-1">
                  <strong>{anime.episodes}</strong> épisodes
                </p>
              </div>
              <div className="col-6 text-end">
                <p className="synop-perso mb-1">
                  <strong>{anime.score}</strong> / 10
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

Card.propTypes = {
  anime: PropTypes.shape({
    title: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    episodes: PropTypes.number,
    mal_id: PropTypes.number,
    images: PropTypes.shape({
      jpg: PropTypes.shape({
        large_image_url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Card;
