import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AnimeDetails() {
  const { id } = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.jikan.moe/v4/seasons/2024/fall?sfw`
        );
        const animeDataId = await response.json();
        const anime = animeDataId.data.find(
          (anime) => anime.mal_id === parseInt(id)
        );
        setAnimeData(anime);
      } catch (error) {
        setError("Erreur lors de la récupération des détails de l'anime");
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Loading avec spinner élégant
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="text-muted fs-5">Chargement des détails...</p>
        </div>
      </div>
    );
  }

  // État d'erreur amélioré
  if (error) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-danger d-flex align-items-center p-4">
              <i className="bi bi-exclamation-triangle-fill me-3 fs-3"></i>
              <div>
                <h5 className="alert-heading mb-2">Erreur de chargement</h5>
                <p className="mb-0">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Anime non trouvé
  if (!animeData) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-warning d-flex align-items-center p-4">
              <i className="bi bi-search me-3 fs-3"></i>
              <div>
                <h5 className="alert-heading mb-2">Anime introuvable</h5>
                <p className="mb-0">
                  L'anime demandé n'a pas été trouvé dans la base de données.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-0">
      {/* Hero section avec background gradient */}
      <div
        className="position-relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(0,123,255,0.1) 0%, rgba(108,117,125,0.1) 100%)`,
          minHeight: "200px",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <motion.div
              className="col-12"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "tween",
                ease: "easeOut",
                duration: 0.6,
              }}
            >
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#/" className="text-decoration-none">
                      Accueil
                    </a>
                  </li>
                  <li className="breadcrumb-item active">{animeData.title}</li>
                </ol>
              </nav>
              <h1 className="display-5 fw-bold mb-2">{animeData.title}</h1>
              {animeData.title_japanese && (
                <p className="fs-5 text-muted mb-0">
                  {animeData.title_japanese}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container my-5">
        <div className="row g-4">
          {/* Colonne gauche - Image et infos */}
          <motion.div
            className="col-lg-4"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              ease: "easeOut",
              duration: 0.6,
            }}
          >
            {/* Image avec effet hover */}
            <div className="card border-0 shadow-lg mb-4">
              <div className="position-relative overflow-hidden">
                <img
                  src={animeData.images.jpg.large_image_url}
                  alt={animeData.title}
                  className="card-img-top rounded"
                  style={{
                    height: "545px",
                    objectFit: "fill",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
                {/* Badge de score */}
                {animeData.score && (
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-warning text-dark fs-6 p-2 rounded-pill">
                      ⭐ {animeData.score}/10
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Genres avec style moderne */}
            {animeData.genres && animeData.genres.length > 0 && (
              <div className="card border-0 shadow mb-4">
                <div className="card-body">
                  <h5 className="card-title d-flex align-items-center mb-3">
                    <i className="bi bi-tags-fill me-2 text-primary"></i>
                    Genres
                  </h5>
                  <div className="d-flex flex-wrap gap-2">
                    {animeData.genres.map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="badge rounded-pill px-3 py-2"
                        style={{
                          backgroundColor: "#e3f2fd",
                          color: "#1976d2",
                          fontSize: "0.875rem",
                        }}
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Informations dans des cards élégantes */}
            <div className="row g-3">
              <div className="col-6">
                <div className="card border-0 shadow text-center h-100">
                  <div className="card-body">
                    <i className="bi bi-star-fill text-warning fs-3 mb-2"></i>
                    <h6 className="card-title text-muted mb-1">Score</h6>
                    <p className="card-text fs-4 fw-bold text-primary mb-0">
                      {animeData.score || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card border-0 shadow text-center h-100">
                  <div className="card-body">
                    <i className="bi bi-play-circle-fill text-success fs-3 mb-2"></i>
                    <h6 className="card-title text-muted mb-1">Épisodes</h6>
                    <p className="card-text fs-4 fw-bold text-primary mb-0">
                      {animeData.episodes || "?"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Colonne droite - Contenu principal */}
          <motion.div
            className="col-lg-8"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              ease: "easeOut",
              duration: 0.6,
            }}
          >
            {/* Trailer avec design amélioré */}
            {animeData.trailer?.embed_url && (
              <div className="card border-0 shadow mb-4">
                <div className="card-body">
                  <h4 className="card-title d-flex align-items-center mb-4">
                    <i className="bi bi-play-btn-fill me-2 text-primary"></i>
                    Bande-annonce
                  </h4>
                  <div className="ratio ratio-16x9 rounded overflow-hidden">
                    <iframe
                      src={animeData.trailer.embed_url}
                      title={`Trailer de ${animeData.title}`}
                      allowFullScreen
                      className="border-0"
                      style={{ borderRadius: "8px" }}
                    ></iframe>
                  </div>
                </div>
              </div>
            )}

            {/* Synopsis avec meilleur design */}
            {animeData.synopsis && (
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h4 className="card-title d-flex align-items-center mb-4">
                    <i className="bi bi-book-fill me-2 text-primary"></i>
                    Synopsis
                  </h4>
                  <div
                    className="p-4 rounded"
                    style={{
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #e9ecef",
                      lineHeight: "1.8",
                    }}
                  >
                    <p className="mb-0 fs-6" style={{ textAlign: "justify" }}>
                      {animeData.synopsis}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Informations supplémentaires */}
            <div className="card border-0 shadow mt-4">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center mb-3">
                  <i className="bi bi-info-circle-fill me-2 text-primary"></i>
                  Informations détaillées
                </h5>
                <div className="row g-3">
                  {animeData.status && (
                    <div className="col-md-6">
                      <div
                        className="d-flex align-items-center p-3 rounded"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <strong className="me-2">Statut:</strong>
                        <span
                          className={`badge ${
                            animeData.status === "Currently Airing"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {animeData.status}
                        </span>
                      </div>
                    </div>
                  )}
                  {animeData.aired?.string && (
                    <div className="col-md-6">
                      <div
                        className="d-flex align-items-center p-3 rounded"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <strong className="me-2">Diffusion:</strong>
                        <span>{animeData.aired.string}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AnimeDetails;
