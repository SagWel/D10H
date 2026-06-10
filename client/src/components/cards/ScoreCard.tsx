import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";

/* IMport type */
import { type IScore } from "../../types/Score";

// SVGs import from a unique file
import {
  GuitarIcon,
  DrumsIcon,
  PianoIcon,
  BasseIcon,
  ChantIcon,
  UkuleleIcon,
  SaxoIcon,
  DifficultyIcon,
} from "../Svg";

// Displays icons according to the difficulty value
export const difficultyLvl = (difficulty: number, size?: string) => {
  const arrayDiff = Array.from({ length: difficulty });

  return arrayDiff.map((_, index: number) => (
    <DifficultyIcon key={index} size={size} />
  ));
};

// Icon management about score's instrument
export function IconCard(instrumentKey: string): React.JSX.Element | null {
  switch (instrumentKey) {
    case "guitare":
      return <GuitarIcon />;
    case "batterie":
      return <DrumsIcon />;
    case "piano":
      return <PianoIcon />;
    case "basse":
      return <BasseIcon />;
    case "chant":
      return <ChantIcon />;
    case "ukulele":
      return <UkuleleIcon />;
    case "saxo":
      return <SaxoIcon />;
    default:
      return null;
  }
}

const host = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_API_PORT;
const BASE_URL = `http://${host}:${port}/`;

export interface IScoreCardProps {
  score: IScore;
  currentInstrument: string;
}

// Card for each scores display
const ScoreCard: React.FC<IScoreCardProps> = ({ score, currentInstrument }) => {
  return (
    <Flex
      as={"a"}
      href={`/scores/${currentInstrument}/${score.id}`}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"2"}
      backgroundColor={"transparent"}
      minH={"192px"}
    >
      <Box
        id="cardTop"
        position={"relative"}
        borderRadius={"0.125rem"}
        maxW={"12rem"}
        overflow={"visible"}
        _hover={{
          filter: "brightness(120%)",
        }}
      >
        <Image
          src={`${BASE_URL}${score.score_preview}`}
          id="preview"
          maxW={"12rem"}
          minH={"13rem"}
        ></Image>
        <Flex
          position={"absolute"}
          bottom={"-0.5rem"}
          right={"-33px"}
          boxSize={"4.125rem"}
          zIndex={"100"}
          maxHeight={"4.125rem"}
          maxWidth={"4.125Rem"}
        >
          {IconCard(score.instruments.currentInstrument.name)}
        </Flex>
        {score.instruments.currentInstrument.role && (
          <Text
            pos={"absolute"}
            bottom={"-1.25rem"}
            right={0}
            color={"#c5c5c5"}
            fontSize={"14px"}
          >
            ({score.instruments.currentInstrument.role})
          </Text>
        )}
      </Box>
      <Box id="cardInfos">
        <Box color={"#FDFCFE"}>
          <Heading as={"h3"} fontSize={"1.5rem"}>
            {score.song.title}
          </Heading>
          <Text>{score.song.artist.name}</Text>
        </Box>
        <Flex
          id="difficultyLvl"
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          marginTop={"0.5rem"}
        >
          {difficultyLvl(score.difficulty)}
        </Flex>
      </Box>
    </Flex>
  );
};

export default ScoreCard;
