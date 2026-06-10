import {
  chakra,
  Stack,
  Text,
  Flex,
  FormControl,
  Center,
  Box,
  Image,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { WarningIcon } from "../../Svg";

import type { IInstrument, IInstrumentLvl } from "../../../types/instrument";

import { useAuth } from "../../../hooks/useAuth";

import UserInstrumentManagement from "../../UserInstrumentManagement";

export interface IFirstEditProfilProps {
  isError?: boolean;
}

const FirstEditProfil: React.FC<IFirstEditProfilProps> = ({ isError }) => {
  const { user, setIsFirstLogin } = useAuth();
  const navigate = useNavigate();

  const [userInstruments, setUserInstruments] = useState<
    IInstrumentLvl[] | undefined
  >([]);
  const [instruments, setInstruments] = useState<IInstrument[] | []>([]);

  const host = import.meta.env.VITE_HOST;
  const port = import.meta.env.VITE_API_PORT;

  /* Send to backend User's instruments */
  const handleSubmitUserInstruments = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const urlFetchCreatUserInstruments = import.meta.env
      .VITE_URL_FETCH_CREATUSERINSTRUMENTS;
    try {
      if (userInstruments && userInstruments.length > 0) {
        const res = await fetch(
          `http://${host}:${port}${urlFetchCreatUserInstruments}${user?.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user?.id,
              userInstruments: userInstruments,
            }),
            credentials: "include",
          },
        );

        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`);
        }

        setIsFirstLogin(false);
        navigate(0);
      }
    } catch (error) {
      console.error(
        "Impossible d'associer les instruments et leur niveau au profil de l'utilisateur : ",
        error,
      );
    }
  };

  const fetchInstruments = async () => {
    const urlFetchInstruments = import.meta.env.VITE_URL_FETCH_ALLINSTRUMENTS;
    try {
      const res: Response = await fetch(
        `http://${host}:${port}${urlFetchInstruments}`,
        { credentials: "include" },
      );

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }

      const data = await res.json();
      setInstruments(data);
    } catch (error) {
      console.error(
        "Imposible de récuperer les Instruments dans la base de donnée : ",
        error,
      );
    }
  };

  useEffect(() => {
    fetchInstruments();
  }, []);

  return (
    <chakra.form w={"100%"}>
      <Stack
        alignItems={"center"}
        gap={"1rem"}
        marginInline={"auto"}
        maxW={"512px"}
        w={"100%"}
      >
        <Flex
          w={"100%"}
          textAlign={"center"}
          color={isError ? "#E53E3E" : "#a19fa4"}
        >
          {isError && (
            <WarningIcon
              lineHeight={"1em"}
              flexShrink={0}
              verticalAlign={"middle"}
              mr={"0.5rem"}
              color="#E53E3E"
              display={"block"}
            />
          )}
          <Text>
            Pour accéder au site merci de configurer au moins un instrument
          </Text>
        </Flex>
        <FormControl w={"100%"} pos={"relative"}>
          <Center flexDir={"column"} py={4}>
            <Stack
              pos={"relative"}
              gap={"1.5rem"}
              alignItems={"center"}
              w={"100%"}
            >
              <Box flex={"0 0 auto"} borderRadius={"full"} overflow={"hidden"}>
                <chakra.figure
                  display={"inline-block"}
                  pos={"relative"}
                  m={0}
                  maxH={"100%"}
                  maxW={"100%"}
                  verticalAlign={"top"}
                  borderRadius={"0.25rem"}
                  boxShadow={"0 1px 6px #19192229"}
                  transform={"translateZ(0)"}
                  overflow={"hidden"}
                  _hover={{
                    boxShadow: "0 1px 6px #1919223d",
                  }}
                >
                  <Box bg={"#0000"} display={"block"} pos={"relative"}>
                    <Image
                      alt={user?.username}
                      src="https://cdn-images.dzcdn.net/images/user//125x125-000000-80-0-0.jpg"
                      display={"inline-block"}
                      verticalAlign={"top"}
                      objectFit={"cover"}
                      h={"125px"}
                      w={"125px"}
                      borderStyle={"none"}
                      border={0}
                    />
                  </Box>
                </chakra.figure>
              </Box>
              <Heading color={"#ffffff"}>
                <span>{user?.username}</span>
              </Heading>
              <Stack
                gap={"1rem"}
                marginInline={"auto"}
                w={"100%"}
                maxW={"512px"}
              >
                <Stack
                  alignItems={"center"}
                  gap={"1rem"}
                  marginInline={"auto"}
                  w={"100%"}
                  maxW={"512px"}
                >
                  <UserInstrumentManagement
                    data={userInstruments}
                    setData={setUserInstruments}
                    instruments={instruments}
                  />
                  <Button
                    bg={"#4d4c50"}
                    color={"#ffffff"}
                    onClick={handleSubmitUserInstruments}
                    isDisabled={userInstruments?.length === 0}
                    _hover={{
                      bg: "#434344",
                      color: "#f5f2f8",
                    }}
                    _active={{
                      borderColor: "#ad47ff",
                      bg: "#434344",
                    }}
                    _focus={{
                      borderColor: "#ad47ff",
                    }}
                    _focusVisible={{
                      boxShadow: "0 0 0 3px #ad47ff",
                    }}
                  >
                    Ajouter à mon profil
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Center>
        </FormControl>
      </Stack>
    </chakra.form>
  );
};

export default FirstEditProfil;
