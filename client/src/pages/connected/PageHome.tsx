import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

/* Import conponents */
import Carousel from "../../components/ScoreCarousel";
/* Import hook */
import { useAuth } from "../../hooks/useAuth";

/* Import type */
import { type IScore } from "../../types/Score";
import { useModals } from "../../hooks/useModals";

export interface IPageAcceuilProps {}

const PageAcceuil: React.FC<IPageAcceuilProps> = () => {
  /* Varibles to stock Scores for carousel */
  const [popularScores, setPopularScores] = useState<IScore[] | []>([]);
  const [newsScores, setNewsScores] = useState<IScore[] | []>([]);
  const [suggestionsScores, setSuggestionsScores] = useState<IScore[] | []>([]);
  const [historyScores, setHistoryScores] = useState<IScore[] | []>([]);

  const { onOpen } = useModals();

  /* Variables from context by hook */
  const { isFirstLogin, user } = useAuth();

  const host = import.meta.env.VITE_HOST;
  const port = import.meta.env.VITE_API_PORT;

  const fetchScores = async (
    URL: string,
    set: React.Dispatch<React.SetStateAction<IScore[] | []>>,
  ) => {
    try {
      const res = await fetch(`http://${host}:${port}${URL}`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }

      const data = await res.json();

      set(data);
    } catch (error) {
      console.error(
        "Impossible de récupérer les données des partitions:",
        error,
      );
    }
  };

  useEffect(() => {
    const urlFetchPopular = import.meta.env.VITE_URL_FETCH_POPULAR;
    const urlFetchNews = import.meta.env.VITE_URL_FETCH_NEWS;
    const urlFetchSuggestions = import.meta.env.VITE_URL_FETCH_SUGGESTIONS;
    const urlfetchHistory = import.meta.env.VITE_URL_FETCH_HISTORY;

    fetchScores(urlFetchPopular, setPopularScores);
    fetchScores(urlFetchNews, setNewsScores);
    fetchScores(`${urlFetchSuggestions}${user?.id}`, setSuggestionsScores);
    fetchScores(`${urlfetchHistory}${user?.id}`, setHistoryScores);

    if (isFirstLogin) {
      onOpen("FIRST_EDIT_PROFIL", {
        title: "Configuration de ton Profil",
      });
    }
  }, []);

  return (
    <Box
      id="homeUser"
      overflowY={"auto"}
      height={"100%"}
      mb={"70px"}
      position={"relative"}
    >
      {historyScores.length > 0 && (
        <Carousel
          id="recents-carousel"
          data={historyScores.slice(0, 12)}
          title="Partitions joués récement"
        />
      )}

      {suggestionsScores.length > 0 && (
        <Carousel
          id="suggestions-carousel"
          data={suggestionsScores}
          title="Suggestions"
        />
      )}

      {newsScores.length > 0 && (
        <Carousel id="news-carousel" data={newsScores} title="Nouveautés" />
      )}

      {popularScores.length > 0 && (
        <Carousel
          id="popular-carousel"
          data={popularScores}
          title="Partitions populaires"
        />
      )}
    </Box>
  );
};

export default PageAcceuil;
