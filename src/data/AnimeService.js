export const fetchAnimeList = async () => {
  try {
    const response = await fetch(
      "https://api.jikan.moe/v4/seasons/2024/fall?sfw"
    );

    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des animes: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erreur : ", err);
    return Promise.reject(err); // Retourne l'erreur pour que le composant puisse la gérer
  }
};
