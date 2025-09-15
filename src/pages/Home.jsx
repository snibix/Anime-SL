import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/Loader";
import NavBarCat from "../components/NavBarCat";
import { fetchAnimeList } from "../data/AnimeService";
import useScrollDirection from "../hook/useScrollDirection";

function Home() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnimeCategory, setSelectedAnimeCategory] = useState("All");
  const [isChangingCategory, setIsChangingCategory] = useState(false);
  const scrollDir = useScrollDirection();

  // Fonction pour changer la catégorie sélectionnée avec animation
  const handleCategoryChange = (category) => {
    if (category === selectedAnimeCategory) return;

    setIsChangingCategory(true);

    // Attendre un peu avant de changer la catégorie pour l'animation de sortie

    setSelectedAnimeCategory(category);
    setIsChangingCategory(false);
  };

  // Fonction de retry en cas d'erreur
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchAnimeList()
      .then((data) => {
        setAnimes(data.data);

        setTimeout(() => {
          setLoading(false);
        }, 800);
      })
      .catch((err) => {
        console.error("Erreur dans le fetch :", err);
        setError(err);
        setLoading(false);
      });
  };

  // Filtrer les animes en fonction de la catégorie
  const filteredAnimes = animes.filter((anime) => {
    if (selectedAnimeCategory === "All") {
      return true;
    }
    return anime.genres.some((genre) => genre.name === selectedAnimeCategory);
  });

  useEffect(() => {
    fetchAnimeList()
      .then((data) => {
        setAnimes(data.data);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Erreur dans le fetch :", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner message="Chargement des données..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        error={error}
        onRetry={handleRetry}
        title="Erreur de chargement"
      />
    );
  }

  return (
    <main>
      <NavBarCat setSelectedCategory={handleCategoryChange} />
      <div className="pt-2 pt-lg-5">
        <section className="container">
          <div className="d-flex justify-content-between align-items-center pb-3 pb-lg-5">
            <motion.h3
              className="text-uppercase"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "tween", ease: "easeIn", duration: 0.3 }}
            >
              En cours
            </motion.h3>
          </div>

          <AnimatePresence mode="sync">
            <motion.div
              key={selectedAnimeCategory}
              className="row row-cols-1 row-cols-lg-2 g-2 g-lg-5"
              initial={{
                opacity: 0,
                y: scrollDir === "down" ? 100 : -100,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: scrollDir === "down" ? -100 : 100,
              }}
              transition={{
                type: "tween",
                damping: 30,
                stiffness: 100,
                mass: 1,
              }}
            >
              {filteredAnimes.map((anime, index) => (
                <Card
                  key={anime.id}
                  anime={anime}
                  animationDelay={index * 0.05}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}

export default Home;
