import {
  Box,
  Heading,
  Flex,
  Grid,
  Text,
  FormLabel,
  Menu,
  MenuButton,
  Button,
  Portal,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { type IScore } from "../../types/Score";

/* Import SVG */
import { DownChevronIcon, UpChevronIcon } from "../../components/Svg";

/* Imports components */
import ScoreCard, { difficultyLvl } from "../../components/cards/ScoreCard";
import type { Item } from "../../components/MenuSelect";
import MenuSelect from "../../components/MenuSelect";
import { useAuth } from "../../hooks/useAuth";

export interface ISearchScoresInstrumentProps {}

const Search: React.FC<ISearchScoresInstrumentProps> = () => {
  /* retrieve instrument name from the URL */
  const { instrumentName } = useParams();

  const { user } = useAuth();

  /* State to stock scores */
  const [scores, setScores] = useState<IScore[] | []>([]);

  /* States for filters */
  const [artist, setArtist] = useState<string>("");
  const [morceau, setMorceau] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);
  const [selectedSort, setSelectedSort] = useState<Item | null>(null);

  /* function to retrive scores on database */
  const fetchScores = async (URL: string) => {
    const host = import.meta.env.VITE_HOST;
    const port = import.meta.env.VITE_API_PORT;

    try {
      const res = await fetch(`http://${host}:${port}${URL}`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }

      const data = await res.json();
      setScores(data);
    } catch (error) {
      console.error(
        "Impossible de récupérer les données des partitions:",
        error,
      );
    }
  };

  /* variables to store the various data from the scores for the options of the different select  */
  const allartists: string[] = [];
  const allMorceaux: string[] = [];
  const allGenders: string[] = [];
  const allDifficultes: number[] = [];

  scores.forEach((p) => {
    allartists.push(p.song.artist.name);
    allMorceaux.push(p.song.title);
    allGenders.push(p.song.gender.name);
    allDifficultes.push(p.difficulty);
  });

  /* sorted data from the scores alphabetically */
  const artists = [...new Set(allartists)].sort();
  const morceaux = [...new Set(allMorceaux)].sort();
  const genders = [...new Set(allGenders)].sort();
  const difficultes = [...new Set(allDifficultes)].sort();

  /*sorting methodes */
  const sorting: Item[] = [
    { id: "A-Z_asc", label: "alphabétique", icon: UpChevronIcon },
    { id: "difficultes_asc", label: "difficultées", icon: UpChevronIcon },
    { id: "artists_asc", label: "artistes", icon: UpChevronIcon },
    { id: "recents_asc", label: "récents", icon: UpChevronIcon },
    { id: "popular_asc", label: "populaires", icon: UpChevronIcon },
    { id: "A-Z_desc", label: "alphabétique", icon: DownChevronIcon },
    { id: "difficultes_desc", label: "difficultées", icon: DownChevronIcon },
    { id: "artists_desc", label: "artistes", icon: DownChevronIcon },
    { id: "recents_desc", label: "récents", icon: DownChevronIcon },
    { id: "popular_desc", label: "populaires", icon: DownChevronIcon },
  ];

  /* filtered scores with user selections */
  const filteredScores = scores.filter((p: IScore) => {
    const filterArtist = artist === "" || p.song.artist.name === artist;
    const filterMorceau = morceau === "" || p.song.title === morceau;
    const filterGender = gender === "" || p.song.gender.name === gender;
    const filterDifficulty = difficulty === 0 || p.difficulty === difficulty;
    const filterbyExplicitContent = !(
      p.song.isExplicit &&
      (user?.filterExplicit || user?.isChildAccount)
    );

    return (
      filterArtist &&
      filterMorceau &&
      filterGender &&
      filterDifficulty &&
      filterbyExplicitContent
    );
  });

  /* sorted scores with user sort choice */
  const sortedScores = [...filteredScores].sort((a: IScore, b: IScore) => {
    switch (selectedSort?.id) {
      case "A-Z_asc":
        return a.song.title.localeCompare(b.song.title);
      case "A-Z_desc":
        return b.song.title.localeCompare(a.song.title);
      case "artists_asc":
        return a.song.artist.name.localeCompare(b.song.artist.name);
      case "artist_desc":
        return b.song.artist.name.localeCompare(a.song.artist.name);
      case "difficultes_asc":
        return a.difficulty - b.difficulty;
      case "difficultes_desc":
        return b.difficulty - a.difficulty;
      case "recents_asc":
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "recents_desc":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "popular_asc":
        return a.popularity - b.popularity;
      case "popular_desc":
        return b.popularity - a.popularity;
      default:
        return 0;
    }
  });

  useEffect(() => {
    if (instrumentName) {
      const urlFetch = import.meta.env.VITE_URL_FETCH_ALLSCORES_INSTRUMENT;

      fetchScores(`${urlFetch}${instrumentName}`);
    } else {
      console.error("Instrument manquant ...");
    }
  }, [instrumentName]);

  return (
    <Flex direction={"column"} textAlign={"center"} gap={"2rem"} pt={"2rem"}>
      {/*Title containing the instrument name*/}
      <Heading id="headText" color={"#FDFCFE"}>
        {" "}
        SCORBRARY {instrumentName?.toUpperCase()}{" "}
      </Heading>

      {/*Search filters*/}
      <Box
        id="filtersZone"
        border={"0.0625rem solid #4e4c51"}
        mx={"1.5rem"}
        padding={"0.5rem"}
        pos={"relative"}
      >
        <Grid templateColumns={"repeat(5, 1fr)"}>
          <MenuSelect
            label="Artiste"
            listString={artists}
            itemString={artist}
            setItemString={setArtist}
          />

          <Box gridColumn={"span 1"}></Box>

          <MenuSelect
            label="Morceau"
            listString={morceaux}
            itemString={morceau}
            setItemString={setMorceau}
          />

          <Box gridColumn={"span 1"}></Box>

          <MenuSelect
            listString={genders}
            label="Genre"
            itemString={gender}
            setItemString={setGender}
          />

          <Box gridColumn={"span 1"}></Box>

          <Flex
            gridColumn={"span 1"}
            direction={"column"}
            background={"#9A36F3"}
            borderRadius={"0.5rem"}
          >
            <FormLabel
              htmlFor="difficulty"
              color={"#fdfcfe"}
              textAlign={"center"}
              p={0}
              m={0}
              fontSize={"1.25rem"}
              fontWeight={"500"}
            >
              Difficultée
            </FormLabel>
            <Menu matchWidth>
              <MenuButton
                as={Button}
                name="difficultée"
                id="difficultée"
                variant={"outline"}
                mb={"0.75rem"}
                mx={"auto"}
                height={"1.25rem"}
                width={"75%"}
                textAlign={"center"}
                border={"none"}
                borderRadius={"none"}
                background={"#141216"}
                color={"#fdfcfe"}
                _hover={{
                  bg: "#141216",
                  border: "#CBD5E0",
                }}
                _active={{
                  bg: "#141216",
                  boxShadow: "0 0 0 1px #fdfcfe",
                }}
                _focusVisible={{
                  zIndex: "1",
                  borderColor: "#4e4c51",
                }}
              >
                <Flex align={"center"} justify={"center"} w={"full"} pt={"3px"}>
                  {difficultyLvl(difficulty, "16px")}
                </Flex>
              </MenuButton>
              <Portal>
                <MenuList
                  w={"full"}
                  minW={0}
                  maxH={"200px"}
                  bg={"#3e3d3f"}
                  border={0}
                  p={0}
                  overflowY={"auto"}
                >
                  <MenuItem
                    bg={"transparent"}
                    color={"#fdfcfe"}
                    onClick={() => setDifficulty(0)}
                    _hover={{
                      bg: "#6e6c72",
                    }}
                    _focus={{
                      bg: "#6e6c72",
                    }}
                  >
                    <Flex align={"center"} justify={"space-between"} w={"full"}>
                      <Flex
                        align={"center"}
                        justify={"space-between"}
                        w={"full"}
                      >
                        <Text>...</Text>
                      </Flex>
                    </Flex>
                  </MenuItem>
                  {difficultes.map((d, index) => (
                    <MenuItem
                      key={index}
                      bg={"transparent"}
                      color={"#fdfcfe"}
                      onClick={() => setDifficulty(d)}
                      _hover={{
                        bg: "#6e6c72",
                      }}
                      _focus={{
                        bg: "#6e6c72",
                      }}
                    >
                      <Flex
                        align={"center"}
                        justify={"space-between"}
                        w={"full"}
                      >
                        <Flex align={"center"} justify={"center"} w={"full"}>
                          {difficultyLvl(d)}
                        </Flex>
                      </Flex>
                    </MenuItem>
                  ))}
                </MenuList>
              </Portal>
            </Menu>
          </Flex>

          <Box gridColumn={"span 1"}></Box>

          <MenuSelect
            itemObject={selectedSort}
            setItemObject={setSelectedSort}
            listObject={sorting}
            label="Trier"
          />

          <Box gridColumn={"span 1"}></Box>
        </Grid>
      </Box>

      {/*Search results*/}
      {sortedScores.length === 0 ? (
        <Box textAlign={"center"}>
          <Text color={"white"}>
            Aucune partition trouvée pour {instrumentName}
          </Text>
        </Box>
      ) : (
        <Grid
          id="resultZone"
          templateColumns={"repeat(auto-fit, minmax(20rem, 1fr))"}
          gap={"7"}
          justifyItems={"center"}
          p={"4"}
          overflow={"visible"}
          marginTop={"2rem"}
          marginBottom={"5rem"}
        >
          {/*Creats a card for each scores in search result*/}
          {sortedScores.map((score: IScore) => (
            <ScoreCard
              key={score.id}
              score={score}
              currentInstrument={instrumentName as string}
            />
          ))}
        </Grid>
      )}
    </Flex>
  );
};

export default Search;
