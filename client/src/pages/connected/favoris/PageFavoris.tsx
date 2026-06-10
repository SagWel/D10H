import {
  Box,
  Flex,
  Heading,
  Button,
  List,
  ListItem,
  chakra,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Carousel from "../../../components/ScoreCarousel";
import { type IScore } from "../../../types/Score";
import ScoreCard from "../../../components/cards/ScoreCard";

// SVGs import from a unique file
import { ShuffleIcon } from "../../../components/Svg";
import { useAuth } from "../../../hooks/useAuth";

import "../../../style.css";

export interface IPageFavorisProps {}

const PageFavoris: React.FC<IPageFavorisProps> = () => {
  const { user } = useAuth();

  const [historyScores, setHistoryScores] = useState<IScore[] | []>([]);

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
    const urlfetchHistory = import.meta.env.VITE_URL_FETCH_HISTORY;

    fetchScores(`${urlfetchHistory}${user?.id}`, setHistoryScores);
  }, []);

  return (
    <Box id="main" overflowY={"auto"} height={"100%"}>
      {/*Favoris page content header*/}
      <Box
        id="header-container"
        marginBottom={"12px"}
        boxShadow={"0 2px 2px #2d2d3214"}
      >
        <Box
          id="container"
          mx={"auto"}
          p={"24px 24px 0"}
          pos={"relative"}
          boxSizing="border-box"
        >
          <Flex gap={"2rem"}>
            <Box alignSelf={"center"}>
              <Heading
                as={"h2"}
                fontSize={"64px"}
                fontFamily={"Tahoma,Arial,sans-serif"}
                fontWeight={"700"}
                marginBottom={"1.5rem"}
                color={"#ffffff"}
              >
                Favoris
              </Heading>
            </Box>
          </Flex>
          <Box marginTop={"1.5rem"} marginBottom={"2rem"}>
            <List
              display={"inline-flex"}
              gap={"0.25rem"}
              listStyleType={"none"}
              margin={0}
              padding={0}
            >
              <ListItem listStyleType={"none"} margin={0} padding={0}>
                <Button
                  type="button"
                  aria-label="Une de Mes Partition Aléatoire"
                  isDisabled
                  title="prochainement"
                  display={"inline-flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  verticalAlign={"middle"}
                  gap={"0.25rem"}
                  minHeight={"3rem"}
                  minWidth={"3rem"}
                  height={"auto"}
                  width={"auto"}
                  paddingInlineStart={"1rem"}
                  paddingInlineEnd={"1.5rem"}
                  paddingY={"0.75rem"}
                  position={"relative"}
                  appearance={"none"}
                  userSelect={"none"}
                  outline={"transparent solid 2px"}
                  outlineOffset={0}
                  borderRadius={"0.75rem"}
                  fontWeight={"700"}
                  fontSize={"16px"}
                  fontFamily={"Inter,Arial,sans-serif"}
                  textDecoration={"none"}
                  color={"#ffffff"}
                  background={"#ad47ff"}
                  _active={{
                    color: "#e2dfe6",
                    background: "#ca97ff",
                  }}
                  _focus={{
                    zIndex: "1",
                  }}
                  _focusVisible={{
                    boxShadow: "none",
                    outlineColor: "#ca97ff",
                  }}
                  _hover={{
                    color: "#f5f2f8",
                    background: "#bb73ff",
                  }}
                >
                  <chakra.span
                    display={"inline-flex"}
                    alignSelf={"center"}
                    flexShrink={0}
                    marginInlineEnd={0}
                  >
                    <ShuffleIcon />
                  </chakra.span>
                  <Box fontFamily={"Inter,Arial,sans-serif"}>
                    <Flex alignItems={"center"} justifyContent={"center"}>
                      <Box
                        as={Link}
                        to={"/scores/:instrumentId/:morceauId"}
                        cursor={"not-allowed"}
                      >
                        Une de Mes Partition Aléatoire
                      </Box>
                    </Flex>
                  </Box>
                </Button>
              </ListItem>
            </List>
          </Box>
          <chakra.nav
            display={"block"}
            pos={"relative"}
            marginBottom={"0"}
            width={"100%"}
            borderBottom={"1px solid #141216"}
            boxShadow={"none"}
            boxSizing="border-box"
          >
            <Box
              pos={"relative"}
              padding={0}
              mx={"auto"}
              width={"100%"}
              whiteSpace={"nowrap"}
              boxSizing="border-box"
            >
              <List listStyleType={"none"} margin={0} padding={0}>
                <ListItem
                  listStyleType={"none"}
                  margin={0}
                  padding={0}
                  color={"#a19fa4"}
                  display={"inline-block"}
                  position={"relative"}
                >
                  <Box
                    as={Link}
                    to={"/favoris"}
                    borderBottom={"#ad47ff solid 2px"}
                    color={"#ffffff"}
                    paddingBottom={"16px"}
                    display={"block"}
                    fontSize={"16px"}
                    fontFamily={"Inter,Arial,sans-serif"}
                    fontWeight={"600"}
                    lineHeight={"24px"}
                    textDecoration={"none"}
                  >
                    Vue d'ensemble
                  </Box>
                </ListItem>
                <ListItem
                  listStyleType={"none"}
                  margin={0}
                  padding={0}
                  color={"#a19fa4"}
                  display={"inline-block"}
                  position={"relative"}
                  paddingLeft={"44px"}
                >
                  <Box
                    as={Link}
                    to={"/favoris/scorbraries"}
                    onClick={(e) => e.preventDefault()}
                    cursor={"not-allowed"}
                    title="prochainement"
                    paddingBottom={"16px"}
                    backgroundColor={"transparent"}
                    borderBottom={"transparent 2px solid"}
                    display={"block"}
                    fontSize={"16px"}
                    fontFamily={"Inter,Arial,sans-serif"}
                    fontWeight={"400"}
                    lineHeight={"24px"}
                    textDecoration={"none"}
                    _hover={{
                      borderBottomColor: "#a19fa4",
                    }}
                  >
                    Scorbraries
                  </Box>
                </ListItem>
                <ListItem
                  listStyleType={"none"}
                  margin={0}
                  padding={0}
                  color={"#a19fa4"}
                  display={"inline-block"}
                  position={"relative"}
                  paddingLeft={"44px"}
                >
                  <Box
                    as={Link}
                    to={"/favoris/history"}
                    borderBottom={"transparent 2px solid"}
                    paddingBottom={"16px"}
                    backgroundColor={"transparent"}
                    display={"block"}
                    fontSize={"16px"}
                    fontFamily={"Inter,Arial,sans-serif"}
                    fontWeight={"400"}
                    lineHeight={"24px"}
                    textDecoration={"none"}
                    _hover={{
                      borderBottomColor: "#a19fa4",
                    }}
                  >
                    Historique de partitions
                  </Box>
                </ListItem>
              </List>
            </Box>
          </chakra.nav>
        </Box>
      </Box>

      {/*Favoris page content*/}
      <Box position={"relative"}>
        {/*Carousels container*/}
        <Box id="catalog-content">
          <Box>
            <Carousel
              id="recents-carousel"
              data={historyScores}
              title="Partitions joués récement"
              renderItem={(item: IScore) => (
                <ScoreCard
                  key={item.id}
                  score={item}
                  currentInstrument={item.instruments.currentInstrument.name}
                />
              )}
            />

            <chakra.section display={"block"}>
              {/* future CAROUSEL */}
            </chakra.section>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PageFavoris;
