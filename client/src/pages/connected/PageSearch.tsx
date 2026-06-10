import {
  Box,
  Heading,
  Flex,
  Grid,
  Text,
  Checkbox,
  FormLabel,
  Menu,
  MenuButton,
  Button,
  Portal,
  MenuList,
  MenuItem,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import type { Item } from "../../components/MenuSelect";
import { type IScore } from "../../types/Score";

import MenuSelect from "../../components/MenuSelect";
import ScoreCard, { difficultyLvl } from "../../components/cards/ScoreCard";

import { useAuth } from "../../hooks/useAuth";

/* Import SVG */
import { DownChevronIcon, UpChevronIcon } from "../../components/Svg";
import useWindowWidth from "../../hooks/useWindowWidth";

export interface ISearchProps {}

const Search: React.FC<ISearchProps> = () => {
  const { user } = useAuth();

  const width = useWindowWidth();
  const breakpoint = 1024;
  const isMinimal = width <= breakpoint;

  /* retrieve query from the URL and from backend */
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [safeQuery, setSafeQuery] = useState<string>("");
  console.log("Query : ", query);

  /* State to stock scores */
  const [scores, setScores] = useState<IScore[]>([]);

  /* States for filters */
  const [artist, setArtist] = useState<string>("");
  const [morceau, setMorceau] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);
  const [selectedSort, setSelectedSort] = useState<Item | null>(null);
  const [filteredUserInstruments, setFilteredUserInstruments] =
    useState<boolean>(true);
  const [filteredUserLvl, setFilteredUserLvl] = useState<boolean>(true);
  const [lvlPreference, setLvlPreference] = useState<boolean>(filteredUserLvl);

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
      setScores(data.scores);
      setSafeQuery(data.query);
    } catch (error) {
      console.error(
        "Impossible de récupérer les données des partitions:",
        error,
      );
    }
  };

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

    const userInst = user?.userInstruments?.find(
      (ui) => ui.instrument.name === p.instruments.currentInstrument.name,
    );

    const filterUserInstruments = !filteredUserInstruments || !!userInst;

    const filterUserLvl =
      !filteredUserLvl ||
      (!!userInst && Number(p.difficulty) <= Number(userInst.lvl) + 1);

    const isExplicit = p.song.isExplicit === true;
    const filterbyExplicitContent = !(
      isExplicit &&
      (user?.filterExplicit === "hidden" || user?.isChildAccount)
    );

    return (
      filterArtist &&
      filterMorceau &&
      filterGender &&
      filterDifficulty &&
      filterUserInstruments &&
      filterUserLvl &&
      filterbyExplicitContent
    );
  });

  /* variables to store the various data from the scores for the options of the different select  */
  const allartists: string[] = [];
  const allMorceaux: string[] = [];
  const allGenders: string[] = [];
  const allDifficultes: number[] = [];

  filteredScores.forEach((p) => {
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

  console.log("Partitions : ", scores);
  console.log("Partitions filtré : ", filteredScores);
  console.log("Instruments de l'utilisateur", user?.userInstruments);

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
    if (query) {
      const urlFetch = import.meta.env.VITE_URL_FETCH_SEARCHRESULT_SCORE;

      fetchScores(`${urlFetch}${query}`);
    } else {
      console.error("Pas de recherche demandé");
    }
  }, [query]);

  return (
    <Stack textAlign={"center"} gap={"2rem"} pt={"2rem"}>
      {/*Title containing the query*/}
      <Heading id="headText" color={"#FDFCFE"}>
        {" "}
        SCORBRARY "{query}"{" "}
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
        <Stack
          pos={"absolute"}
          right={0}
          bottom={0}
          mx={"0.75rem"}
          mb={".5rem"}
        >
          <Checkbox
            isChecked={filteredUserInstruments}
            title={isMinimal ? "Mes instruments" : undefined}
            colorScheme="gray"
            flexDir={"row-reverse"}
            size={"sm"}
            minW={"10rem"}
            gap={2}
            color={"white"}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setFilteredUserInstruments(isChecked);

              if (isChecked) {
                setFilteredUserLvl(lvlPreference);
              } else {
                setFilteredUserLvl(false);
              }
            }}
          >
            {!isMinimal && "Mes instruments"}
          </Checkbox>
          <Checkbox
            isChecked={filteredUserLvl}
            isDisabled={!filteredUserInstruments}
            title={isMinimal ? "Mon niveau" : undefined}
            colorScheme="gray"
            flexDir={"row-reverse"}
            size={"sm"}
            minW={"10rem"}
            gap={2}
            color={"white"}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setFilteredUserLvl(isChecked);
              setLvlPreference(isChecked);
            }}
          >
            {!isMinimal && "Mon niveau"}
          </Checkbox>
        </Stack>
      </Box>

      {/*Search results*/}
      {sortedScores.length === 0 ? (
        <Box textAlign={"center"}>
          <Text color={"#a19fa4"}>
            Aucune partition trouvée pour la rechercher "
            {safeQuery.length > 0 ? safeQuery : query}"
          </Text>
          <Button
            isDisabled
            title="prochainement"
            display={"inline-flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"0.25rem"}
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
            _focusVisible={{
              boxShadow: "none",
              outlineColor: "#ca97ff",
            }}
            _hover={{
              color: "#f5f2f8",
              background: "#bb73ff",
            }}
          >
            <span>Demander une partition</span>
          </Button>
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
              currentInstrument={score.instruments.currentInstrument.name}
            />
          ))}
        </Grid>
      )}
    </Stack>
  );
};

export default Search;
