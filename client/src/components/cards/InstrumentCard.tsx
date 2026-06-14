import { Link } from "react-router-dom";
import { Image, Text, Flex } from "@chakra-ui/react";

/* Import type */
import type { IInstrument } from "../../types/instrument";

export interface IInstrumentCardProps {
  instrument: IInstrument;
}

// Card for each instrument in database
const InstrumentCard: React.FC<IInstrumentCardProps> = ({ instrument }) => {
//Variables for fetch
  const host = import.meta.env.VITE_HOST
  const port = import.meta.env.VITE_API_PORT
  const BASE_URL = `http://${host}:${port}/uploads/instruments/`;
  const capitalizedName =
    instrument.name.charAt(0).toUpperCase() + instrument.name.slice(1)
  const URLImg = `${BASE_URL}${capitalizedName}.png`

  return (
    <Flex
      as={Link}
      to={`/scores/${instrument.name}`}
      role="group"
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
      height={"16rem"}
      width={"16rem"}
      borderRadius={"full"}
      overflow={"hidden"}>
      <Image src={`${URLImg}`} height={"100%"} width={"100%"} />
      <Text
        position={"absolute"}
        overflow={"hidden"}
        opacity={"0"}
        color={"#FDFCFE"}
        fontSize={"24px"}
        fontWeight={"700"}
        textShadow={"5px 5px 0 black"}
        zIndex={"1"}
        _groupHover={{
          opacity: "1",
        }}
      >
        {instrument.name}
      </Text>
    </Flex>
  );
};

export default InstrumentCard;
