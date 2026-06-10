import { Box, Grid, List, chakra, ListItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import InstrumentCard from "../../components/cards/InstrumentCard";
import { type IInstrument } from "../../types/instrument";
import { useEffect, useState } from "react";

export interface IPageListeInstrumentsProps {}

const PageListeInstruments: React.FC<IPageListeInstrumentsProps> = () => {
  /* State to stock instruments */
  const [allInstuments, setAllInstuments] = useState<IInstrument[] | []>([]);

  const host = import.meta.env.VITE_HOST;
  const port = import.meta.env.VITE_API_PORT;

  const fetchAllInstruments = async () => {
    const urlFetchAllInstruments = import.meta.env
      .VITE_URL_FETCH_ALLINSTRUMENTS;

    try {
      const res: Response = await fetch(
        `http://${host}:${port}${urlFetchAllInstruments}`,
        { credentials: "include" },
      );

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }

      const data = await res.json();
      if (data) {
        setAllInstuments(data);
      }
    } catch (error) {
      console.error(
        "Imposible de récuperer les Instruments dans la base de donnée : ",
        error,
      );
    }
  };

  useEffect(() => {
    fetchAllInstruments();
  }, []);

  return (
    <>
      <Box id="header-container" marginBottom={"12px"} boxShadow={"0 2px 2px"}>
        <Box id="container" padding={"24px 24px 0"} marginX={"49px"}>
          <chakra.nav marginBottom={"0"} width={"100%"} boxShadow={"none"}>
            <Box padding={0} width={"100%"}>
              <List listStyleType={"none"} margin={0} padding={0}>
                <ListItem
                  listStyleType={"none"}
                  position={"relative"}
                  display={"inline-block"}
                  margin={0}
                  padding={0}
                  w={"50%"}
                  textAlign={"center"}
                  color={"#a19fa4"}
                >
                  <Box
                    as={Link}
                    to={"/instruments/user"}
                    display={"block"}
                    paddingBottom={"16px"}
                    fontSize={"16px"}
                    fontFamily={"Inter,Arial,sans-serif"}
                    fontWeight={"400"}
                    lineHeight={"24px"}
                    textDecoration={"none"}
                    backgroundColor={"transparent"}
                    borderBottom={"transparent 2px solid"}
                  >
                    Mes instruments
                  </Box>
                </ListItem>
                <ListItem
                  listStyleType={"none"}
                  display={"inline-block"}
                  position={"relative"}
                  margin={0}
                  padding={0}
                  paddingLeft={"44px"}
                  w={"50%"}
                  textAlign={"center"}
                  color={"#a19fa4"}
                >
                  <Box
                    as={Link}
                    to={"/instruments/all"}
                    display={"block"}
                    paddingBottom={"16px"}
                    fontSize={"16px"}
                    fontFamily={"Inter,Arial,sans-serif"}
                    fontWeight={"600"}
                    lineHeight={"24px"}
                    textDecoration={"none"}
                    color={"#ffffff"}
                    borderBottom={"#ad47ff solid 2px"}
                  >
                    Tous les instruments
                  </Box>
                </ListItem>
              </List>
            </Box>
          </chakra.nav>
        </Box>
      </Box>
      <Grid
        marginTop={"3rem"}
        paddingBottom={"3rem"}
        justifyItems={"center"}
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        columnGap={"3rem"}
        rowGap={"6rem"}
        px={"12"}
      >
        {/*Creats a card for each instrument in database*/}
        {allInstuments.map((instrument) => (
          <InstrumentCard key={instrument.id} instrument={instrument} />
        ))}
      </Grid>
    </>
  );
};

export default PageListeInstruments;
