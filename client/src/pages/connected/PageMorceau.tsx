import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* Import component */
import ScoreRenderSing from "../../components/scoreRendering/ScoreRenderSing";

/* Import Hook */
import { useScore } from "../../hooks/useScore";

/* Import background */
import Fond from "../../../public/imgs/FondPart.jpg";
import { useAuth } from "../../hooks/useAuth";
import {
  usePlayScoreDispatch,
  usePlayScoreStates,
} from "../../hooks/usePlayScore";

const SCORE_RENDERERS: Record<string, React.FC> = {
  Sing: ScoreRenderSing,
};

export interface IPageMorceauProps {}

const PageMorceau: React.FC<IPageMorceauProps> = () => {
  /* Score from context by hook */
  const { score, setScore } = useScore();

  const SelectedRenderer = SCORE_RENDERERS["Sing"] || ScoreRenderSing;

  const { onPlay } = usePlayScoreStates();

  const { setOnPlay } = usePlayScoreDispatch();

  const { morceauId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const host = import.meta.env.VITE_HOST;
  const port = import.meta.env.VITE_API_PORT;
  const BASE_URL = `http://${host}:${port}/uploads/instruments/`;
  const capitalizedName =
    score?.instruments.currentInstrument.name.charAt(0).toUpperCase() +
    score?.instruments.currentInstrument.name.slice(1);
  const URLImg = `${BASE_URL}${capitalizedName}.png`;

  if (
    (user?.filterExplicit || user?.isChildAccount) &&
    score?.song.isExplicit
  ) {
    alert(
      "Ce morceau contient des propos explicites et ne peux donc pas être consulté par vous en raison de votre age ou de vos réglages",
    );
    navigate(-1);
  }

  const fetchScore = async (URL: string) => {
    try {
      const res = await fetch(`http://${host}:${port}${URL}`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }

      const data = await res.json();
      setScore(data);
    } catch (error) {
      console.error(
        "Impossible de récupérer les donnée de la partition:",
        error,
      );
    }
  };

  useEffect(() => {
    if (morceauId) {
      const urlFetch = import.meta.env.VITE_URL_FETCH_SCORE;
      fetchScore(`${urlFetch}${morceauId}`);
    } else {
      console.error("ID manquant ...");
    }
  }, [morceauId]);

  useEffect(() => {
    const urlAddUserHistory = import.meta.env.VITE_URL_FETCH_ADDUSERHISTORY;

    const fetchAddUserHistory = async () => {
      if (onPlay) {
        try {
          const res: Response = await fetch(
            `http://${host}:${port}${urlAddUserHistory}${user?.id}/${morceauId}`,
            { credentials: "include" },
          );

          if (!res.ok) {
            throw new Error(`Erreur HTTP: ${res.status}`);
          }
        } catch (error) {
          console.error(
            "Impossible d'ajouter le morceau à l'historique de l'utilisateur",
            error,
          );
        }
      }
    };
    fetchAddUserHistory();
  }, [onPlay, user, morceauId]);

  useEffect(() => {
    const pauseForce = () => {
      if (document.visibilityState === "hidden" && onPlay) {
        setOnPlay(false);
      }
    };

    document.addEventListener("visibilitychange", pauseForce);

    return () => {
      document.removeEventListener("visibilitychange", pauseForce);
    };
  }, [onPlay, setOnPlay]);

  return (
    <Flex
      direction={"column"}
      overflowY={"auto"}
      justifyContent={"start"}
      width={"100%"}
      height={"100%"}
      background={"transparent"}
    >
      <Box width={"100%"} textAlign={"center"} position={"relative"}>
        <Flex
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          color={"#c0c0c0"}
        >
          <Heading fontWeight={"700"}>
            {score ? score.song.title : "Pas de Titre à afficher"}
          </Heading>
          <Text as={"span"} fontWeight={"400"}>
            {score ? score.song.artist.name : "Pas d'Artiste à afficher"}
          </Text>
        </Flex>
        {score?.instruments.currentInstrument.role && (
          <Text
            pos={"absolute"}
            top={"35%"}
            right={"6rem"}
            color={"#c0c0c0"}
            fontSize={"20px"}
          >
            {score?.instruments.currentInstrument.role}
          </Text>
        )}
        <Image
          position={"absolute"}
          borderRadius={"full"}
          src={`${URLImg}`}
          alt="..."
          h={"4rem"}
          w={"4rem"}
          right={"0.625rem"}
          top={"7px"}
        />
      </Box>
      <Box pos={'relative'}
      height={"100%"}
      width={"97%"}
      marginY={"10px"}
      marginInlineStart={"20px"}
      overflowY={"hidden"}>
        <Box 
        pos={'absolute'} top={0} left={0}
        w={'100%'} h={'100%'}
        backgroundImage={Fond}
        backgroundPosition={"center"}
        backgroundSize={"cover"}
        filter={'opacity(0.9)'}/>
        <SelectedRenderer />
      </Box>
    </Flex>
  );
};

export default PageMorceau;
