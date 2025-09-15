import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/Loader";
import { fetchAnimeList } from "../data/AnimeService";
import useScrollDirection from "../hook/useScrollDirection";

function Home({ selectedCategory, searchTerm }) {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollDir = useScrollDirection();

  // Charger les données
  useEffect(() => {
    fetchAnimeList()
      .then((data) => {
        setAnimes(data.data);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => {
        console.error("Erreur dans le fetch :", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // Filtrer en fonction de la catégorie et de la recherche
  const filteredAnimes = animes.filter((anime) => {
    const matchesCategory =
      selectedCategory === "All" ||
      anime.genres.some((genre) => genre.name === selectedCategory);

    const matchesSearch =
      searchTerm === "" ||
      anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anime.title_english?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anime.title_japanese?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anime.genres.some((genre) =>
        genre.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <LoadingSpinner message="Chargement des données..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        error={error}
        onRetry={() => window.location.reload()}
        title="Erreur de chargement"
      />
    );
  }

  return (
    <main>
      <div className="pt-2 pt-lg-5">
        <section className="container">
          <div className="d-flex justify-content-between align-items-center pb-3 pb-lg-5">
            <motion.h3
              className="text-uppercase"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "tween", ease: "easeIn", duration: 0.3 }}
            >
              {searchTerm ? `Résultats pour "${searchTerm}"` : "En cours"}
              {filteredAnimes.length > 0 && (
                <small className="text-muted ms-2">
                  ({filteredAnimes.length} résultat
                  {filteredAnimes.length > 1 ? "s" : ""})
                </small>
              )}
            </motion.h3>
          </div>

          <AnimatePresence mode="sync">
            <motion.div
              key={`${selectedCategory}-${searchTerm}`}
              className="row row-cols-1 row-cols-lg-2 g-2 g-lg-5"
              initial={{ opacity: 0, y: scrollDir === "down" ? 100 : -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: scrollDir === "down" ? -100 : 100 }}
              transition={{
                type: "tween",
                damping: 30,
                stiffness: 100,
                mass: 1,
              }}
            >
              {filteredAnimes.length > 0 ? (
                filteredAnimes.map((anime, index) => (
                  <Card
                    key={`${anime.id}-${index}`}
                    anime={anime}
                    animationDelay={index * 0.05}
                  />
                ))
              ) : (
                <div className="col-12">
                  <motion.div
                    className="text-center py-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h4 className="text-muted">Aucun résultat trouvé</h4>
                    <p className="text-muted">
                      Essayez avec d'autres mots-clés ou changez de catégorie
                    </p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}

export default Home;
