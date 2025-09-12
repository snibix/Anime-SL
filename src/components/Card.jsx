import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Card({ anime }) {
  return (
    <article className="col">
      <div className="d-flex">
        <Link to={`/anime/${anime.mal_id}`}>
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="rounded-1"
            style={{
              width: "190px",
              height: "250px",
              objectFit: "cover",
            }}
          />
        </Link>

        <div className="px-3 d-flex flex-column justify-content-around align-items-center shadow">
          <h3 className="text-uppercase fs-5">{anime.title}</h3>
          <p className="synop-perso">{anime.synopsis}</p>
          <p className="synop-perso">{anime.episodes} episodes</p>
          <p className="synop-perso">{anime.score} / 10</p>
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
