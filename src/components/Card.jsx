import { motion, useInView } from "motion/react";
import PropTypes from "prop-types";
import { useRef } from "react";
import { Link } from "react-router-dom";
import useScrollDirection from "../hook/useScrollDirection";

function Card({ anime }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const scrollDir = useScrollDirection();

  return (
    <article className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <motion.div
        className="card h-100 border-0 shadow-sm position-relative overflow-hidden"
        style={{
          borderRadius: "15px",
        }}
        initial={{ opacity: 0, y: scrollDir === "down" ? 100 : -100 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: scrollDir === "down" ? 100 : -100 }
        }
        transition={{ type: "tween", ease: "easeOut", duration: 0.6 }}
        ref={ref}
        whileHover={{
          y: -15,
          boxShadow: "0px 10px 20px rgba(0,0,0,0.25)",
          transition: { type: "tween", ease: "easeIn", duration: 0.2 },
        }}
        whileTap={{
          y: 0,
          boxShadow: "0px 5px 10px rgba(0,0,0,0.15)",
        }}
      >
        {/* Image avec overlay au hover */}
        <div className="position-relative overflow-hidden">
          <Link to={`/anime/${anime.mal_id}`} className="text-decoration-none">
            <motion.img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="card-img-top"
              style={{
                height: "280px",
                width: "100%",
                objectFit: "contain",
                objectPosition: "center",
                backgroundColor: "#f8f9fa",
                borderRadius: "15px 15px 0 0",
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Overlay gradient au hover */}
            <motion.div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,123,255,0.8) 0%, rgba(108,117,125,0.8) 100%)",
                borderRadius: "15px 15px 0 0",
              }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white fw-bold fs-5">
                <i className="bi bi-play-circle-fill me-2"></i>
                Voir les détails
              </span>
            </motion.div>
          </Link>

          {/* Badge de score */}
          {anime.score && (
            <div className="position-absolute top-0 end-0 m-2">
              <span
                className="badge fs-6 px-3 py-2"
                style={{
                  background:
                    anime.score >= 8
                      ? "linear-gradient(45deg, #28a745, #20c997)"
                      : anime.score >= 7
                      ? "linear-gradient(45deg, #ffc107, #fd7e14)"
                      : "linear-gradient(45deg, #6c757d, #495057)",
                  color: "white",
                  borderRadius: "20px",
                  border: "2px solid white",
                  fontWeight: "bold",
                }}
              >
                ⭐ {anime.score}
              </span>
            </div>
          )}
        </div>

        {/* Contenu de la carte */}
        <div className="card-body d-flex flex-column p-4">
          {/* Titre avec animation */}
          <Link to={`/anime/${anime.mal_id}`} className="text-decoration-none">
            <motion.h3
              className="card-title fw-bold mb-3"
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.3",
                height: "2.6rem",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                color: "#2c3e50",
              }}
              whileHover={{ color: "#007bff" }}
              transition={{ duration: 0.3 }}
            >
              {anime.title}
            </motion.h3>
          </Link>

          {/* Synopsis */}
          <p
            className="card-text flex-grow-1 mb-3"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "1.5",
              height: "4.5rem",
              color: "#6c757d",
              fontSize: "0.9rem",
            }}
          >
            {anime.synopsis || "Synopsis non disponible"}
          </p>

          {/* Informations */}
          <div
            className="mt-auto pt-3"
            style={{ borderTop: "1px solid #e9ecef" }}
          >
            <div className="row g-0">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-2"
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: "#e3f2fd",
                      fontSize: "0.75rem",
                    }}
                  >
                    <i className="bi bi-play-circle-fill text-primary"></i>
                  </div>
                  <small className="text-muted">
                    <span className="fw-bold text-dark">
                      {anime.episodes || "?"}
                    </span>{" "}
                    ep
                  </small>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center justify-content-end">
                  <small className="text-muted me-2">Note:</small>
                  <span
                    className="badge rounded-pill px-2 py-1"
                    style={{
                      backgroundColor:
                        anime.score >= 8
                          ? "#d4edda"
                          : anime.score >= 7
                          ? "#fff3cd"
                          : "#f8d7da",
                      color:
                        anime.score >= 8
                          ? "#155724"
                          : anime.score >= 7
                          ? "#856404"
                          : "#721c24",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}
                  >
                    {anime.score || "N/A"}/10
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Effet de bordure colorée */}
        <div
          className="position-absolute bottom-0 start-0 w-100"
          style={{
            height: "4px",
            background:
              anime.score >= 8
                ? "linear-gradient(90deg, #28a745, #20c997)"
                : anime.score >= 7
                ? "linear-gradient(90deg, #ffc107, #fd7e14)"
                : "linear-gradient(90deg, #6c757d, #495057)",
          }}
        />
      </motion.div>
    </article>
  );
}

Card.propTypes = {
  anime: PropTypes.shape({
    title: PropTypes.string.isRequired,
    synopsis: PropTypes.string,
    score: PropTypes.number,
    episodes: PropTypes.number,
    mal_id: PropTypes.number.isRequired,
    images: PropTypes.shape({
      jpg: PropTypes.shape({
        large_image_url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Card;
