import { useEffect, useState } from "react";
import Card from "../components/Card";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/Loader";
import NavBarCat from "../components/NavBarCat";
import { fetchAnimeList } from "../data/AnimeService"; // Récupération des données

// TODO : a terminer faire la recherche pour la barre de recherche
function Home() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnimeCategory, setSelectedAnimeCategory] = useState("All");

  // Fonction pour changer la catégorie sélectionnée
  const handleCategoryChange = (category) => {
    setSelectedAnimeCategory(category);
  };

  // Filtrer les animes en fonction de la catégorie
  const filteredAnimes = animes.filter((anime) => {
    if (selectedAnimeCategory === "All") {
      return true; // Si aucune catégorie n'est sélectionnée, retourner tous les animes
    }
    // Vérifier si le genre de l'anime correspond à la catégorie sélectionnée
    return anime.genres.some((genre) => genre.name === selectedAnimeCategory);
  });

  useEffect(() => {
    fetchAnimeList()
      .then((data) => {
        setAnimes(data.data);
        setLoading(false);
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
            <h3 className="text-uppercase">En cours</h3>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-5">
            {filteredAnimes.map((anime) => (
              <Card key={anime.id} anime={anime} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
