import {
  Box,
  Link as ChakraLink,
  Flex,
  Heading,
  Button,
  List,
  ListItem,
  chakra,
  Grid,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import type { IScore } from "../../../types/Score";
import { useAuth } from "../../../hooks/useAuth";
import { useState, useEffect } from "react";

// SVGs import from a unique file
import { ShuffleIcon } from "../../../components/Svg";

// Card for each scores in the database
import ScoreCard from "../../../components/cards/ScoreCard";

import "../../../style.css";

export interface IPageHistoryProps {}

const PageHistory: React.FC<IPageHistoryProps> = () => {
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
          <Box display={"flex"} gap={"2rem"}>
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
          </Box>
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
                      <Link to={"/scores/:instrumentId/:morceauId"}>
                        Une de Mes Partition Aléatoire
                      </Link>
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
                    Historique de partitions
                  </Box>
                </ListItem>
              </List>
            </Box>
          </chakra.nav>
        </Box>
      </Box>

      {/*History page content*/}
      <Box position={"relative"}>
        <Box id="catalog-content">
          <Box role="tebpanel">
            <Box
              position={"relative"}
              padding={"24px"}
              mx={"auto"}
              boxSizing="border-box"
            >
              <Box>
                <Heading
                  as={"h2"}
                  fontFamily={"Inter,Arial,sans-serif"}
                  fontWeight={"700"}
                  fontSize={"20px"}
                  lineHeight={"24px"}
                  textDecoration={"none"}
                  color={"#ffffff"}
                >
                  Historique des partitions
                </Heading>
              </Box>
            </Box>
            <Box
              marginTop={"-24px"}
              padding={"24px"}
              marginX={"auto"}
              position={"relative"}
            >
              <Grid
                id="historyGrid"
                templateColumns={"repeat(auto-fit, minmax(20rem, 1fr))"}
                gap={"7"}
                justifyItems={"center"}
                p={"4"}
                overflow={"visible"}
                marginTop={"2rem"}
                marginBottom={"5rem"}
              >
                {historyScores.length > 0 ? (
                  historyScores.map((score: IScore) => (
                    <ScoreCard
                      key={score.id}
                      score={score}
                      currentInstrument={
                        score.instruments.currentInstrument.name
                      }
                    />
                  ))
                ) : (
                  <Box textAlign={"center"}>
                    <Text color={"#a19fa4"}>C'est bien vide ici ...</Text>
                    <ChakraLink
                      href={"/instruments/user"}
                      display={"inline-flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={"0.25rem"}
                      flexDir={"column"}
                      pos={"relative"}
                      verticalAlign={"middle"}
                      paddingInline={"1.5rem"}
                      py={"0.75rem"}
                      mt={"3rem"}
                      minH={"3rem"}
                      minW={"3rem"}
                      h={"auto"}
                      fontSize={"16px"}
                      fontWeight={"700"}
                      whiteSpace={"nowrap"}
                      lineHeight={"24px"}
                      fontFamily={"Inter,Arial,sans-serif"}
                      textDecor={"none"}
                      color={"#ffffff"}
                      bg={"#ad47ff"}
                      borderRadius={"0.75rem"}
                      outline={"transparent solid 2px"}
                      outlineOffset={"0px"}
                      transitionDuration={"200ms"}
                      transitionProperty={
                        "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                      }
                      appearance={"none"}
                      userSelect={"none"}
                      cursor={"pointer"}
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
                      <Text>Choisit un instrument</Text>
                      <Text>et joue ton premier morceau</Text>
                    </ChakraLink>
                  </Box>
                )}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PageHistory;
