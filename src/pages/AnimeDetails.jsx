import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoCard from "../components/InfoCard";

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

  if (loading) {
    return <div className="text-center mt-5">Chargement...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!animeData) {
    return <div className="alert alert-warning">Anime non trouvé</div>;
  }

  return (
    <div className="container mt-4">
      <div className="">
        <div className="">
          <div className="row">
            {/* Image */}
            <div className="col-md-4">
              <img
                src={animeData.images.jpg.large_image_url}
                alt={animeData.title}
                className="img-fluid rounded h-end-50"
              />

              {/* Genres */}
              {animeData.genres && animeData.genres.length > 0 && (
                <div className="py-4">
                  <h3 className="h5 mb-3 text-center">Genres</h3>
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {animeData.genres.map((genre) => (
                      <span key={genre.mal_id} className="badge bg-dark p-2">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Informations supplémentaires */}
              <div className="row justify-content-center">
                <InfoCard title="Score" description={animeData.score} />
                <InfoCard
                  title="Épisodes"
                  description={animeData.episodes || "?"}
                />
              </div>
            </div>

            {/* Informations */}
            <div className="col-md-8">
              {animeData.title_japanese && (
                <h2 className="card-title mb-3">
                  {animeData.title} || {animeData.title_japanese}
                </h2>
              )}

              {/* Trailer */}
              <div className="col-12 col-md-12 py-3">
                <h3 className="mb-4">Trailer</h3>
                <div className="ratio ratio-21x9 py-5">
                  <iframe
                    src={animeData.trailer.embed_url}
                    title={`Trailer de ${animeData.title}`}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Synopsis */}
              <div className="py-4">
                <h3 className="h4">Synopsis</h3>
                <p className="p-2">{animeData.synopsis}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeDetails;
