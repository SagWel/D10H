import {
  Stack,
  chakra,
  Box,
  Flex,
  Link,
  Heading,
  FormControl,
  Button,
  FormLabel,
  Input,
  Text,
  Wrap,
  Image,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  InputGroup,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  useSearchParams,
  useNavigate,
  type NavigateFunction,
} from "react-router-dom";

/* Import SVG */
import {
  LogoTempo,
  DisplayIcon,
  FacebookIcon,
  GoogleIcon,
  AppleIcon,
  RightCarouselIcon,
  LeftCarouselIcon,
  WarningIcon,
  IncrementIcon,
  DecrementIcon,
  ValidateIcon,
  CheckIcon,
} from "../../components/Svg";

import "../../style.css";

/* Import hooks */
import { useAuth } from "../../hooks/useAuth";

export interface IPageSignupProps {}

const PageSignup: React.FC<IPageSignupProps> = () => {
  /* variable for navigation */
  const navigate: NavigateFunction = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const currentStep = parseInt(searchParams.get("step") || "0");

  const sessionInformations = sessionStorage.getItem("smartJourneyState");

  type InformationsType = {
    appName: string;
    steps: string[];
    userData: {};
  };

  let informationsData: InformationsType = {
    appName: "D10H_!",
    steps: ["email_or_phone", "create_password", "user_profile"],
    userData: {},
  };

  let sessionEmail: string = "";
  // let sessionPassword: string = ''

  if (sessionInformations) {
    sessionEmail = JSON.parse(sessionInformations).userData.email || "";
    // sessionPassword = JSON.parse(sessionInformations).userData.password || ''
  } else {
    sessionStorage.setItem(
      "smartJourneyState",
      JSON.stringify(informationsData),
    );
  }

  /* States for inputs */
  const [email, setEmail] = useState<string>(sessionEmail);
  const [password, setPassword] = useState<string>("");
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const [username, setUsername] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [identity, setidentity] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const passwordLenght: boolean = password.length >= 8;
  const passwordLetter: boolean = /[a-zA-Z]/.test(password);
  const passwordNumber: boolean = /\d/.test(password);

  const emailFormat: boolean =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const host: string = import.meta.env.VITE_HOST;
  const port: string = import.meta.env.VITE_API_PORT;
  const urlFetchFindByEmail = import.meta.env.VITE_URL_FETCH_FINDBYEMAIL;
  const urlFetchCreatUser = import.meta.env.VITE_URL_FETCH_CREATUSER;

  /* Authentication variables for after signup */
  const { setUser, setIsAuthenticated, setIsFirstLogin } = useAuth();

  /* function to proceed to the next step */
  const handleOnClickNext = () => {
    setIsError(false);
    setMessage("");
    const nextStep: number = currentStep + 1;
    setSearchParams({ step: nextStep.toString() });
  };

  /* function to proceed to the previous step */
  const handleOnClickPrev = () => {
    setIsError(false);
    setMessage("");
    const prevStep: number = currentStep - 1;
    setSearchParams({ step: prevStep.toString() });
  };

  /* function to verify if email is already in database */
  const handleOnClickEmail = async () => {
    setIsError(false);
    setMessage("");

    try {
      const res: Response = await fetch(
        `http://${host}:${port}${urlFetchFindByEmail}${email}`,
        { credentials: "include" },
      );

      if (!res.ok) {
        const data = await res.json();

        setIsError(data.isFounded);
        setMessage(`${data.message}`);
      }

      const data = await res.json();

      setIsLogin(data.isFounded);
      handleOnClickNext();
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors du test de l'email");
      setIsError(true);
    }
  };

  const testPasswordSecuityLvl = () => {
    if (
      passwordLenght &&
      passwordLetter &&
      passwordNumber &&
      /[A-Z]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      return (
        <Text
          flex={"1 1 0%"}
          fontSize={"16px"}
          fontWeight={"400"}
          fontFamily={"Inter,Arial,sans-serif"}
          lineHeight={"24px"}
          textDecor={"none"}
          textAlign={"end"}
          color={"#00b23d"}
        >
          Fort
        </Text>
      );
    }

    if (
      passwordLenght &&
      passwordLetter &&
      passwordNumber &&
      (/[A-Z]/.test(password) || /[!@#$%^&*(),.?":{}|<>]/.test(password))
    ) {
      return (
        <Text
          flex={"1 1 0%"}
          fontSize={"16px"}
          fontWeight={"400"}
          fontFamily={"Inter,Arial,sans-serif"}
          lineHeight={"24px"}
          textDecor={"none"}
          textAlign={"end"}
          color={"#fe9935"}
        >
          Moyen
        </Text>
      );
    }

    if (passwordLenght && passwordLetter && /\d/.test(password)) {
      return (
        <Text
          flex={"1 1 0%"}
          fontSize={"16px"}
          fontWeight={"400"}
          fontFamily={"Inter,Arial,sans-serif"}
          lineHeight={"24px"}
          textDecor={"none"}
          textAlign={"end"}
          color={"#f44336"}
        >
          Faible
        </Text>
      );
    }

    return (
      <Text
        flex={"1 1 0%"}
        fontSize={"16px"}
        fontWeight={"400"}
        fontFamily={"Inter,Arial,sans-serif"}
        lineHeight={"24px"}
        textDecor={"none"}
        textAlign={"end"}
        color={"#f44336"}
      >
        Trop faible
      </Text>
    );
  };

  const displayPassword = () => {
    if (inputType === "password") setInputType("text");
    if (inputType === "text") setInputType("password");
  };

  /* function to creat user in database et login him */
  const handleOnClickCreatUser = async () => {
    try {
      const res: Response = await fetch(
        `http://${host}:${port}${urlFetchCreatUser}${email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          /* creating data tu upload on database */
          body: JSON.stringify({
            email: email,
            password: password,
            username: username,
            age: age,
            identity: identity,
          }),
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }

      const data = await res.json();
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsFirstLogin(data.isFirstLogin);
      navigate("/");
    } catch (error) {
      console.error("Impossible de créer l'utilisateur: ", error);
      setIsError(true);
    }
  };

  /* function to submit login information if email is already on db*/
  const onSubmit = async () => {
    const host: string = import.meta.env.VITE_HOST;
    const port: string = import.meta.env.VITE_API_PORT;
    const urlFetchLogin: string = import.meta.env.VITE_URL_FETCH_LOGIN;

    try {
      const res: Response = await fetch(
        `http://${host}:${port}${urlFetchLogin}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }

      const data = await res.json();
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsFirstLogin(data.isFirstLogin);

      if (data.user && data.isAuthenticated) {
        navigate("/");
      } else {
        setIsError(true);
        setMessage("Identifiant incorrect");
      }
    } catch (error) {
      console.error("Impossible de trouver l'utilisateur: ", error);
      setIsError(true);
      setMessage("Identifiant incorrect");
    }
  };

  return (
    <Stack
      alignItems={"center"}
      gap={"1.5rem"}
      pb={"3rem"}
      minH={"100vh"}
      w={"100%"}
    >
      <chakra.nav w={"100%"}>
        <Box
          display={"none"}
          alignItems={"center"}
          paddingInline={"0.5rem"}
          py={"1.5rem"}
          w={"100%"}
          borderBottom={0}
          borderBottomColor={"#38373b !important"}
        >
          <Flex alignItems={"center"} w={"100%"}>
            <Flex justifyContent={"left"} marginInlineEnd={0} w={"100%"}>
              <Link
                href="/"
                fontSize={"1,125rem"}
                fontWeight={"600"}
                color={"#ffffff"}
                textDecor={"inherit"}
                _hover={{ textDecor: "none" }}
              >
                <LogoTempo />
                &nbsp;D10H
              </Link>
            </Flex>
          </Flex>
        </Box>
        <Box
          display={"inherit"}
          alignItems={"center"}
          w={"100%"}
          paddingInline={"0.5rem"}
          py={"1.5rem"}
          borderBottom={0}
          borderColor={"#38373b !important"}
        >
          <Flex alignItems={"center"} w={"100%"}>
            <Flex justifyContent={"left"} marginInlineEnd={0} w={"100%"}>
              <Link href="/" color={"inherit"} textDecor={"inherit"}>
                <LogoTempo />
              </Link>
            </Flex>
          </Flex>
        </Box>
      </chakra.nav>
      <Stack
        alignItems={"center"}
        gap={"1rem"}
        flexGrow={1}
        h={"100%"}
        w={"100%"}
      >
        <Stack
          alignItems={"center"}
          gap={"0.5rem"}
          flexGrow={1}
          pos={"relative"}
          p={"1rem"}
          width={"100%"}
          bg={"#000000"}
        >
          {/* First step of registering process */}
          {currentStep === 0 && (
            <Stack
              alignItems={"center"}
              gap={"0.5rem"}
              marginInline={"auto"}
              maxW={"512px"}
              w={"100%"}
            >
              <Stack alignItems={"center"} gap={"1.5rem"} w={"100%"}>
                <Stack
                  gap={"1.5rem"}
                  paddingInline={"0"}
                  w={"100%"}
                  maxW={"512px"}
                  color={"#ffffff"}
                >
                  <Heading
                    as={"h2"}
                    fontWeight={"700"}
                    fontSize={"46px"}
                    lineHeight={"48px"}
                    maxW={"100ch"}
                  >
                    Entre ton adresse email
                  </Heading>
                </Stack>
                <chakra.form style={{ width: "100%" }}>
                  <Stack
                    alignItems={"center"}
                    gap={"1rem"}
                    marginInline={"auto"}
                    maxW={"512px"}
                    w={"100%"}
                  >
                    <FormControl
                      w={"100%"}
                      pos={"relative"}
                      isInvalid={isError}
                    >
                      <FormLabel
                        display={"block"}
                        marginInlineEnd={"0.75rem"}
                        mb={"0.5rem"}
                        fontWeight={"500"}
                        fontSize={"0.875rem"}
                        color={"#a19fa4"}
                        textAlign={"start"}
                        opacity={1}
                        transitionDuration={"200ms"}
                        transitionProperty={
                          "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                        }
                      >
                        Email
                      </FormLabel>
                      <Input
                        name="email"
                        type="email"
                        id="email"
                        autoComplete="email"
                        placeholder="Adresse email"
                        required
                        value={email}
                        position={"relative"}
                        paddingInlineStart={"1rem"}
                        paddingInlineEnd={"0.75rem"}
                        w={"100%"}
                        h={"3rem"}
                        minW={"0"}
                        minH={"3rem"}
                        fontSize={"16px"}
                        fontWeight={"400"}
                        fontFamily={"Inter,Arial,sans-serif"}
                        color={"#ffffff"}
                        lineHeight={"24px"}
                        textDecor={"none"}
                        bg={"#242326"}
                        borderRadius={"0.5rem"}
                        borderColor={"transparent"}
                        borderWidth={"0.125rem"}
                        borderStyle={"solid"}
                        outline={"transparent solid 2px"}
                        outlineOffset={"2px"}
                        transitionDuration={"200ms"}
                        transitionProperty={
                          "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                        }
                        appearance={"none"}
                        _placeholder={{ color: "#5D6E73" }}
                        onChange={(e) => {
                          if (isError) {
                            setIsError(false);
                            setMessage("");
                          }
                          setEmail(e.target.value);
                        }}
                        onBlur={(e) => {
                          if (e.target.value === "") {
                            setIsError(true);
                            setMessage("Le champ ne doit pas être vide");
                          }
                          if (
                            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                              e.target.value,
                            )
                          ) {
                            setIsError(true);
                            setMessage(
                              "Le format de ton adresse email n'est pas valide.",
                            );
                          }
                        }}
                        _active={{
                          borderColor: "#ad47ff",
                        }}
                        _focus={{
                          borderColor: "#ad47ff",
                        }}
                        _focusVisible={{
                          borderColor: "transparent",
                        }}
                        _hover={{
                          bg: "#2e2c30",
                          color: "#f5f2f8",
                        }}
                      />
                      {isError && (
                        <FormErrorMessage
                          display={"flex"}
                          alignItems={"center"}
                          mt={"0.5rem"}
                          fontSize={"0.875rem"}
                          lineHeight={"normal"}
                          textAlign={"start"}
                          color={"#E53E3E"}
                        >
                          <WarningIcon
                            lineHeight={"1em"}
                            flexShrink={0}
                            verticalAlign={"middle"}
                            mr={"0.5rem"}
                            color="#E53E3E"
                            display={"block"}
                          />
                          {message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    <Button
                      type="submit"
                      isDisabled={!emailFormat}
                      display={"inline-flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={"0.25rem"}
                      whiteSpace={"nowrap"}
                      verticalAlign={"middle"}
                      pos={"relative"}
                      paddingInline={"1.5rem"}
                      py={"0.75rem"}
                      p={0}
                      minH={"3rem"}
                      minW={"3rem"}
                      h={"auto"}
                      w={"100%"}
                      fontWeight={"700"}
                      fontSize={"16px"}
                      fontFamily={"Inter,Arial,sans-serif"}
                      lineHeight={"24px"}
                      textDecor={"none"}
                      color={"#ffffff"}
                      bg={"#ad47ff"}
                      borderRadius={"0.75rem"}
                      outline={"transparent solid 2px"}
                      outlineOffset={0}
                      transitionDuration={"200ms"}
                      transitionProperty={
                        "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                      }
                      userSelect={"none"}
                      onClick={(e) => {
                        e.preventDefault();
                        informationsData = {
                          appName: "D10H_!",
                          steps: [
                            "email_or_phone",
                            "create_password",
                            "user_profile",
                          ],
                          userData: {
                            email: email,
                          },
                        };
                        sessionStorage.setItem(
                          "smartJourneyState",
                          JSON.stringify(informationsData),
                        );
                        handleOnClickEmail();
                      }}
                      _active={{
                        color: "#e2dfe6",
                        bg: "#ca97ff",
                      }}
                      _focusVisible={{
                        boxShadow: "none",
                        outlineColor: "#f5f2f8",
                      }}
                      _hover={{
                        color: "#f5f2f8",
                        bg: "#bb73ff",
                      }}
                      _disabled={{
                        color: "#706e73",
                        bg: "#2e2c30",
                      }}
                    >
                      <span>Continuer</span>
                    </Button>
                    {/* <Text as={"p"} color={"#a19fa4"}>ou</Text>
                                    <Wrap flexShrink={0} justifyContent={"center"}>
                                        <Flex pos={"relative"}>
                                            <Button type="button" aria-label="facebook"
                                            display={"inline-flex"} alignItems={"center"} justifyContent={"center"} gap={"0.25rem"}
                                            whiteSpace={"nowrap"} verticalAlign={"middle"}
                                            pos={"relative"}
                                            paddingInline={0}
                                            py={0} p={0}
                                            minH={"3rem"} minW={"3rem"} h={"auto"}
                                            fontWeight={"700"} fontSize={"16px"} fontFamily={"Inter,Arial,sans-serif"}
                                            lineHeight={"24px"} textDecor={"none"} color={"#ffffff"}
                                            bg={"transparent"}
                                            border={"#4e4c51 solid 0.0625rem"} borderRadius={"full"}
                                            outline={"transparent solid 1px"} outlineOffset={0}
                                            transitionDuration={"200ms"} transitionProperty={"background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"}
                                            userSelect={"none"}
                                            _active={{
                                                bg: "#38373b",
                                                borderColor: "#656367",
                                                color: "#e2dfe6"
                                            }}
                                            _focusVisible={{
                                                boxShadow: "none",
                                                borderColor: "#ad47ff",
                                                outlineColor: "#ad47ff"
                                            }}
                                            _hover={{
                                                bg: "#2e2c30",
                                                borderColor: "#59575c",
                                                color: "#f5f2f8"
                                            }}>
                                                <FacebookIcon 
                                                lineHeight={"1rem"} flexShrink={0} verticalAlign={"middle"} display={"block"}/>
                                            </Button>
                                        </Flex>
                                        <Flex pos={"relative"}>
                                            <Button type="button" aria-label="google"
                                            display={"inline-flex"} alignItems={"center"} justifyContent={"center"} gap={"0.25rem"}
                                            whiteSpace={"nowrap"} verticalAlign={"middle"}
                                            pos={"relative"}
                                            paddingInline={0}
                                            py={0} p={0}
                                            minH={"3rem"} minW={"3rem"} h={"auto"}
                                            fontWeight={"700"} fontSize={"16px"} fontFamily={"Inter,Arial,sans-serif"}
                                            lineHeight={"24px"} textDecor={"none"} color={"#ffffff"}
                                            bg={"transparent"}
                                            border={"#4e4c51 solid 0.0625rem"} borderRadius={"full"}
                                            outline={"transparent solid 1px"} outlineOffset={0}
                                            transitionDuration={"200ms"} transitionProperty={"background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"}
                                            userSelect={"none"}
                                            _active={{
                                                bg: "#38373b",
                                                borderColor: "#656367",
                                                color: "#e2dfe6"
                                            }}
                                            _focusVisible={{
                                                boxShadow: "none",
                                                borderColor: "#ad47ff",
                                                outlineColor: "#ad47ff"
                                            }}
                                            _hover={{
                                                bg: "#2e2c30",
                                                borderColor: "#59575c",
                                                color: "#f5f2f8"
                                            }}>
                                                <GoogleIcon 
                                                lineHeight={"1rem"} flexShrink={0} verticalAlign={"middle"} display={"block"}/>
                                            </Button>
                                        </Flex>
                                        <Flex pos={"relative"}>
                                            <Button type="button" aria-label="apple"
                                            display={"inline-flex"} alignItems={"center"} justifyContent={"center"} gap={"0.25rem"}
                                            whiteSpace={"nowrap"} verticalAlign={"middle"}
                                            pos={"relative"}
                                            paddingInline={0}
                                            py={0} p={0}
                                            minH={"3rem"} minW={"3rem"} h={"auto"}
                                            fontWeight={"700"} fontSize={"16px"} fontFamily={"Inter,Arial,sans-serif"}
                                            lineHeight={"24px"} textDecor={"none"} color={"#ffffff"}
                                            bg={"transparent"}
                                            border={"#4e4c51 solid 0.0625rem"} borderRadius={"full"}
                                            outline={"transparent solid 1px"} outlineOffset={0}
                                            transitionDuration={"200ms"} transitionProperty={"background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"}
                                            userSelect={"none"}
                                            _active={{
                                                bg: "#38373b",
                                                borderColor: "#656367",
                                                color: "#e2dfe6"
                                            }}
                                            _focusVisible={{
                                                boxShadow: "none",
                                                borderColor: "#ad47ff",
                                                outlineColor: "#ad47ff"
                                            }}
                                            _hover={{
                                                bg: "#2e2c30",
                                                borderColor: "#59575c",
                                                color: "#f5f2f8"
                                            }}>
                                                <AppleIcon 
                                                lineHeight={"1rem"} flexShrink={0} verticalAlign={"middle"} display={"block"}/>
                                            </Button>
                                        </Flex>
                                    </Wrap> */}
                  </Stack>
                </chakra.form>
                {/* <Stack alignItems={"center"} gap={"0.75rem"}>
                                <Link href="https://www.deezer.com/fr/activate"
                                display={"block"}
                                paddingInline={"2rem"}
                                py={"1rem"}
                                maxW={"100%"}
                                color={"inherit"}
                                textDecor={"inherit"}
                                _focusVisible={{
                                    outlineColor: "#ad47ff"
                                }}>
                                    <Stack alignItems={"center"} flexDir={"row"} gap={"0.5rem"}>
                                        <Image alt="Orange" src="https://cdn-images.dzcdn.net/images/misc/ca4c4a56fa60322f150f0f3a57547956/48x0-none-90-1-1.png" 
                                        h={"24px"} borderStyle={"none"}/>
                                        <Image alt="SFR" src="https://cdn-images.dzcdn.net/images/misc/03b7777a67b9a2e38bcdded22b3f5573/48x0-none-90-1-1.png" 
                                        h={"24px"} borderStyle={"none"}/>
                                        <Image alt="Bouygues Telecom" src="https://cdn-images.dzcdn.net/images/misc/912bd5209924e7d14782dc1040afa749/48x0-none-90-1-1.png" 
                                        h={"24px"} borderStyle={"none"}/>
                                        <Text as={"p"}
                                        pl={"0.75rem"}
                                        fontSize={"14px"} fontWeight={"400"} fontFamily={"Inter,Arial,sans-serif"}
                                        lineHeight={"20px"} textDecor={"none"} color={"#a19fa4"}>
                                            Offres partenaires
                                        </Text>
                                        <RightCarouselIcon lineHeight={"1em"} flexShrink={0} verticalAlign={"middle"} color="#a19fa4" display={"block"}/>
                                    </Stack>
                                </Link>
                            </Stack> */}
              </Stack>
            </Stack>
          )}

          {/* Second step of registering process */}
          {currentStep === 1 &&
            (isLogin ? (
              <Stack
                alignItems={"center"}
                gap={"0.5rem"}
                marginInline={"auto"}
                maxW={"512px"}
                w={"100%"}
              >
                <Stack
                  onClick={() => {
                    setIsError(false);
                    setMessage("");
                    handleOnClickPrev();
                  }}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={"0.125rem"}
                  flexDir={"row"}
                  maxW={"512px"}
                  w={"100%"}
                  textAlign={"start"}
                  cursor={"pointer"}
                >
                  <LeftCarouselIcon
                    lineHeight={"1rem"}
                    flexShrink={0}
                    color="#a19fa4"
                    verticalAlign={"middle"}
                    display={"block"}
                  />
                  <Text
                    fontSize={"14px"}
                    fontWeight={"400"}
                    fontFamily={"Inter,Arial,sans-serif"}
                    lineHeight={"20px"}
                    textDecor={"none"}
                    color={"#a19fa4"}
                  >
                    Étape 2 sur 2
                  </Text>
                </Stack>
                <Stack alignItems={"center"} gap={"1.5rem"} w={"100%"}>
                  <Stack
                    gap={"1.5rem"}
                    paddingInline={"0"}
                    w={"100%"}
                    maxW={"512px"}
                    color={"#ffffff"}
                  >
                    <Heading
                      as={"h2"}
                      fontWeight={"700"}
                      fontSize={"46px"}
                      lineHeight={"48px"}
                      maxW={"100ch"}
                    >
                      Renseigne ton mot de passe
                    </Heading>
                  </Stack>
                  <chakra.form style={{ width: "100%" }}>
                    <Stack
                      alignItems={"center"}
                      gap={"1rem"}
                      marginInline={"auto"}
                      maxW={"512px"}
                      w={"100%"}
                    >
                      <FormControl
                        w={"100%"}
                        pos={"relative"}
                        isInvalid={isError}
                      >
                        <FormLabel
                          display={"block"}
                          marginInlineEnd={"0.75rem"}
                          mb={"0.5rem"}
                          fontWeight={"500"}
                          fontSize={"0.875rem"}
                          color={"#a19fa4"}
                          textAlign={"start"}
                          opacity={1}
                          transitionDuration={"200ms"}
                          transitionProperty={
                            "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                          }
                        >
                          Mot de passe
                        </FormLabel>
                        <InputGroup
                          display={"flex"}
                          pos={"relative"}
                          w={"100%"}
                          isolation={"isolate"}
                        >
                          <Input
                            type={inputType}
                            autoComplete="current-password"
                            name="password"
                            id="password"
                            value={password}
                            required
                            position={"relative"}
                            paddingInlineStart={"1rem"}
                            paddingInlineEnd={"0.75rem"}
                            w={"100%"}
                            h={"3rem"}
                            minW={"0"}
                            minH={"3rem"}
                            fontSize={"16px"}
                            fontWeight={"400"}
                            fontFamily={"Inter,Arial,sans-serif"}
                            color={"#ffffff"}
                            lineHeight={"24px"}
                            textDecor={"none"}
                            bg={"#242326"}
                            borderRadius={"0.5rem"}
                            borderColor={"transparent"}
                            borderWidth={"0.125rem"}
                            borderStyle={"solid"}
                            outline={"transparent solid 2px"}
                            outlineOffset={"2px"}
                            transitionDuration={"200ms"}
                            transitionProperty={
                              "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                            }
                            appearance={"none"}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            _active={{
                              borderColor: "#ad47ff",
                            }}
                            _focus={{
                              borderColor: "#ad47ff",
                            }}
                            _hover={{
                              bg: "#2e2c30",
                              color: "#f5f2f8",
                            }}
                          />
                          <InputRightElement
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            position={"absolute"}
                            right={0}
                            top={0}
                            marginInlineStart={"1rem"}
                            marginInlineEnd={"0.75rem"}
                            w={"1.5rem"}
                            h={"3rem"}
                            fontSize={"16px"}
                            zIndex={"2"}
                          >
                            <Button
                              display={"inline-flex"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              gap={"0.25rem"}
                              whiteSpace={"nowrap"}
                              pos={"relative"}
                              paddingInline={0}
                              py={0}
                              p={0}
                              minH={"3rem"}
                              minW={"3rem"}
                              h={"auto"}
                              fontWeight={"700"}
                              fontSize={"16px"}
                              fontFamily={"Inter,Arial,sans-serif"}
                              verticalAlign={"middle"}
                              lineHeight={"24px"}
                              textDecor={"none"}
                              bg={"transparent"}
                              borderRadius={"0.75rem"}
                              outline={"transparent solid 2px"}
                              outlineOffset={0}
                              transitionDuration={"200ms"}
                              transitionProperty={
                                "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                              }
                              userSelect={"none"}
                              onClick={displayPassword}
                              _focusVisible={{ boxShadow: "none" }}
                              _hover={{ bg: "transparent" }}
                            >
                              <DisplayIcon
                                display={"block"}
                                size="20px"
                                lineHeight={"1rem"}
                                flexShrink={0}
                                verticalAlign={"middle"}
                                mb={"1px"}
                              />
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormHelperText
                          as={Link}
                          href="/resetpassword"
                          target="_blank"
                          mt={"0.5rem"}
                          fontSize={"0.875rem"}
                          lineHeight={"normal"}
                          color={"#a19fa4"}
                          textDecor={"inherit"}
                          bg={"transparent"}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                          _focusVisible={{ outlineColor: "#ad47ff" }}
                          _hover={{ textDecor: "none" }}
                        >
                          Mot de passe oublié?
                        </FormHelperText>
                        {isError && (
                          <FormErrorMessage
                            display={"flex"}
                            alignItems={"center"}
                            mt={"0.5rem"}
                            fontSize={"0.875rem"}
                            lineHeight={"normal"}
                            textAlign={"start"}
                            color={"#E53E3E"}
                          >
                            <WarningIcon
                              lineHeight={"1em"}
                              flexShrink={0}
                              verticalAlign={"middle"}
                              mr={"0.5rem"}
                              color="#E53E3E"
                              display={"block"}
                            />
                            {message}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                      <Button
                        type="submit"
                        display={"inline-flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={"0.25rem"}
                        pos={"relative"}
                        paddingInline={"1.5rem"}
                        py={"0.75rem"}
                        minH={"3rem"}
                        minW={"3rem"}
                        h={"auto"}
                        w={"100%"}
                        whiteSpace={"nowrap"}
                        verticalAlign={"middle"}
                        fontWeight={"700"}
                        fontSize={"16px"}
                        fontFamily={"Inter,Arial,sans-serif"}
                        lineHeight={"24px"}
                        textDecor={"none"}
                        color={"#ffffff"}
                        bg={"#ad47ff"}
                        borderRadius={"0.75rem"}
                        outline={"transparent solid 2px"}
                        outlineOffset={0}
                        transitionDuration={"200ms"}
                        transitionProperty={
                          "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                        }
                        userSelect={"none"}
                        onClick={(e) => {
                          e.preventDefault();

                          const passwordEmpty = password.trim() === "";
                          if (passwordEmpty) {
                            setIsError(true);
                            setMessage("Le champ ne doit pas être vide");
                          }

                          onSubmit();
                        }}
                        _active={{
                          color: "#e2dfe6",
                          bg: "#ca97ff",
                        }}
                        _focusVisible={{
                          boxShadow: "none",
                          outlineColor: "#f5f2f8",
                        }}
                        _hover={{
                          color: "#f5f2f8",
                          bg: "#bb73ff",
                        }}
                      >
                        <span>Se connecter</span>
                      </Button>
                    </Stack>
                  </chakra.form>
                </Stack>
              </Stack>
            ) : (
              <Stack
                alignItems={"center"}
                gap={"0.5rem"}
                marginInline={"auto"}
                maxW={"512px"}
                w={"100%"}
              >
                <Stack
                  onClick={() => {
                    setIsError(false);
                    setMessage("");
                    handleOnClickPrev();
                  }}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={"0.125rem"}
                  flexDir={"row"}
                  maxW={"512px"}
                  w={"100%"}
                  textAlign={"start"}
                  cursor={"pointer"}
                >
                  <LeftCarouselIcon
                    lineHeight={"1rem"}
                    flexShrink={0}
                    color="#a19fa4"
                    verticalAlign={"middle"}
                    display={"block"}
                  />
                  <Text
                    fontSize={"14px"}
                    fontWeight={"400"}
                    fontFamily={"Inter,Arial,sans-serif"}
                    lineHeight={"20px"}
                    textDecor={"none"}
                    color={"#a19fa4"}
                  >
                    Étape 2 sur 3
                  </Text>
                </Stack>
                <Stack alignItems={"center"} gap={"1.5rem"} w={"100%"}>
                  <Stack
                    gap={"1.5rem"}
                    paddingInline={"0"}
                    w={"100%"}
                    maxW={"512px"}
                    color={"#ffffff"}
                  >
                    <Heading
                      as={"h2"}
                      fontWeight={"700"}
                      fontSize={"46px"}
                      lineHeight={"48px"}
                      maxW={"100ch"}
                    >
                      Créer un mot de passe
                    </Heading>
                  </Stack>
                  <chakra.form style={{ width: "100%" }}>
                    <Stack
                      alignItems={"center"}
                      gap={"1rem"}
                      marginInline={"auto"}
                      maxW={"512px"}
                      w={"100%"}
                    >
                      <FormControl
                        w={"100%"}
                        pos={"relative"}
                        isInvalid={isError}
                      >
                        <FormLabel
                          display={"block"}
                          marginInlineEnd={"0.75rem"}
                          mb={"0.5rem"}
                          fontWeight={"500"}
                          fontSize={"0.875rem"}
                          color={"#a19fa4"}
                          textAlign={"start"}
                          opacity={1}
                          transitionDuration={"200ms"}
                          transitionProperty={
                            "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                          }
                        >
                          Mot de passe
                        </FormLabel>
                        <InputGroup
                          display={"flex"}
                          pos={"relative"}
                          w={"100%"}
                          isolation={"isolate"}
                        >
                          <Input
                            name="password"
                            type={inputType}
                            id="password"
                            autoComplete="password"
                            placeholder="Mot de passe"
                            required
                            value={password}
                            position={"relative"}
                            paddingInlineStart={"1rem"}
                            paddingInlineEnd={"0.75rem"}
                            w={"100%"}
                            h={"3rem"}
                            minW={"0"}
                            minH={"3rem"}
                            fontSize={"16px"}
                            fontWeight={"400"}
                            fontFamily={"Inter,Arial,sans-serif"}
                            color={"#ffffff"}
                            lineHeight={"24px"}
                            textDecor={"none"}
                            bg={"#242326"}
                            borderRadius={"0.5rem"}
                            borderColor={"transparent"}
                            borderWidth={"0.125rem"}
                            borderStyle={"solid"}
                            outline={"transparent solid 2px"}
                            outlineOffset={"2px"}
                            transitionDuration={"200ms"}
                            transitionProperty={
                              "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                            }
                            appearance={"none"}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              if (isError && password && !passwordLenght) {
                                setMessage(
                                  "Ton mot de passe doit comporter au moins 8 caractères.",
                                );
                              }
                              if (
                                isError &&
                                passwordLenght &&
                                (!passwordLetter || !passwordNumber)
                              ) {
                                setMessage("Trop faible");
                              } else {
                                setIsError(false);
                                setMessage("");
                              }
                            }}
                            onBlur={(e) => {
                              if (e.target.value === "") {
                                setIsError(true);
                                setMessage("Le champ de doit pas être vide");
                              }
                              if (password && !passwordLenght) {
                                setIsError(true);
                                setMessage(
                                  "Ton mot de passe doit comporter au moins 8 caractères.",
                                );
                              }
                            }}
                            _placeholder={{ color: "#5D6E73" }}
                            _active={{
                              borderColor: "#ad47ff",
                            }}
                            _focus={{
                              borderColor: "#ad47ff",
                            }}
                            _hover={{
                              bg: "#2e2c30",
                              color: "#f5f2f8",
                            }}
                          />
                          <InputRightElement
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            position={"absolute"}
                            right={0}
                            top={0}
                            marginInlineStart={"1rem"}
                            marginInlineEnd={"0.75rem"}
                            w={"1.5rem"}
                            h={"3rem"}
                            fontSize={"16px"}
                            zIndex={"2"}
                          >
                            <Button
                              display={"inline-flex"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              gap={"0.25rem"}
                              whiteSpace={"nowrap"}
                              pos={"relative"}
                              paddingInline={0}
                              py={0}
                              p={0}
                              minH={"3rem"}
                              minW={"3rem"}
                              h={"auto"}
                              fontWeight={"700"}
                              fontSize={"16px"}
                              fontFamily={"Inter,Arial,sans-serif"}
                              verticalAlign={"middle"}
                              lineHeight={"24px"}
                              textDecor={"none"}
                              bg={"transparent"}
                              borderRadius={"0.75rem"}
                              outline={"transparent solid 2px"}
                              outlineOffset={0}
                              transitionDuration={"200ms"}
                              transitionProperty={
                                "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                              }
                              userSelect={"none"}
                              onClick={displayPassword}
                              _focusVisible={{ boxShadow: "none" }}
                              _hover={{ bg: "transparent" }}
                            >
                              <DisplayIcon
                                display={"block"}
                                size="20px"
                                lineHeight={"1rem"}
                                flexShrink={0}
                                verticalAlign={"middle"}
                                mb={"1px"}
                              />
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        {password !== "" && (
                          <Flex
                            justify={"between"}
                            py={"0.75rem"}
                            mt={"0.5rem"}
                            px={"1rem"}
                            bg={"#141216"}
                            borderRadius={"0.5rem"}
                          >
                            <Stack
                              align={"flex-start"}
                              gap={"0.5rem"}
                              marginInlineEnd={"1rem"}
                            >
                              <Text
                                fontSize={"16px"}
                                fontWeight={"400"}
                                fontFamily={"Inter,Arial,sans-serif"}
                                lineHeight={"24px"}
                                textDecor={"none"}
                                color={"#ffffff"}
                              >
                                Ton mot de passe doit inclure
                              </Text>
                              <Stack
                                align={"center"}
                                flexDir={"row"}
                                gap={"0.25rem"}
                                color={passwordLenght ? "#00b23d" : "#ffffff"}
                              >
                                {passwordLenght ? (
                                  <ValidateIcon
                                    lineHeight={"24px"}
                                    flexShrink={0}
                                    verticalAlign={"middle"}
                                    animation={
                                      "300ms ease 0s 1 normal none running"
                                    }
                                  />
                                ) : (
                                  <CheckIcon />
                                )}
                                <chakra.span>Au moins 8 caractères</chakra.span>
                              </Stack>
                              <Stack
                                align={"center"}
                                flexDir={"row"}
                                gap={"0.25rem"}
                                color={passwordLetter ? "#00b23d" : "#ffffff"}
                              >
                                {passwordLetter ? (
                                  <ValidateIcon
                                    lineHeight={"24px"}
                                    flexShrink={0}
                                    verticalAlign={"middle"}
                                    animation={
                                      "300ms ease 0s 1 normal none running"
                                    }
                                  />
                                ) : (
                                  <CheckIcon />
                                )}
                                <chakra.span>Au moins une lettre</chakra.span>
                              </Stack>
                              <Stack
                                align={"center"}
                                flexDir={"row"}
                                gap={"0.25rem"}
                                color={passwordNumber ? "#00b23d" : "#ffffff"}
                              >
                                {passwordNumber ? (
                                  <ValidateIcon
                                    lineHeight={"24px"}
                                    flexShrink={0}
                                    verticalAlign={"middle"}
                                    animation={
                                      "300ms ease 0s 1 normal none running"
                                    }
                                  />
                                ) : (
                                  <CheckIcon />
                                )}
                                <chakra.span>Au moins un nombre</chakra.span>
                              </Stack>
                            </Stack>
                            {testPasswordSecuityLvl()}
                          </Flex>
                        )}
                        {isError && (
                          <FormErrorMessage
                            display={"flex"}
                            alignItems={"center"}
                            mt={"0.5rem"}
                            fontSize={"0.875rem"}
                            lineHeight={"normal"}
                            textAlign={"start"}
                            color={"#E53E3E"}
                          >
                            <WarningIcon
                              lineHeight={"1em"}
                              flexShrink={0}
                              verticalAlign={"middle"}
                              mr={"0.5rem"}
                              color="#E53E3E"
                              display={"block"}
                            />
                            {message}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                      <Button
                        type="submit"
                        isDisabled={
                          !passwordLenght || !passwordLetter || !passwordNumber
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            passwordLenght &&
                            passwordLetter &&
                            passwordNumber
                          ) {
                            informationsData = {
                              appName: "D10H_!",
                              steps: [
                                "email_or_phone",
                                "create_password",
                                "user_profile",
                              ],
                              userData: {
                                email: email,
                                // password : password
                              },
                            };
                            sessionStorage.setItem(
                              "smartJourneyState",
                              JSON.stringify(informationsData),
                            );
                            const usernameSuggestion: string = email
                              .split("@")[0]
                              .split(/[.\-_]/)
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1),
                              )
                              .join("");
                            setUsername(usernameSuggestion);
                            handleOnClickNext();
                          }
                        }}
                        display={"inline-flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={"0.25rem"}
                        whiteSpace={"nowrap"}
                        verticalAlign={"middle"}
                        pos={"relative"}
                        paddingInline={"1.5rem"}
                        py={"0.75rem"}
                        p={0}
                        minH={"3rem"}
                        minW={"3rem"}
                        h={"auto"}
                        w={"100%"}
                        fontWeight={"700"}
                        fontSize={"16px"}
                        fontFamily={"Inter,Arial,sans-serif"}
                        lineHeight={"24px"}
                        textDecor={"none"}
                        color={"#ffffff"}
                        bg={"#ad47ff"}
                        borderRadius={"0.75rem"}
                        outline={"transparent solid 2px"}
                        outlineOffset={0}
                        transitionDuration={"200ms"}
                        transitionProperty={
                          "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                        }
                        userSelect={"none"}
                        _active={{
                          color: "#e2dfe6",
                          bg: "#ca97ff",
                        }}
                        _focusVisible={{
                          boxShadow: "none",
                          outlineColor: "#f5f2f8",
                        }}
                        _hover={{
                          color: "#f5f2f8",
                          bg: "#bb73ff",
                        }}
                        _disabled={{
                          color: "#706e73",
                          bg: "#2e2c30",
                        }}
                      >
                        <span>Continuer</span>
                      </Button>
                      <Text as={"p"} color={"#a19fa4"}>
                        ou
                      </Text>
                      <Wrap flexShrink={0} justifyContent={"center"}>
                        <Flex pos={"relative"}>
                          <Button
                            type="button"
                            aria-label="facebook"
                            display={"inline-flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            gap={"0.25rem"}
                            whiteSpace={"nowrap"}
                            verticalAlign={"middle"}
                            pos={"relative"}
                            paddingInline={0}
                            py={0}
                            p={0}
                            minH={"3rem"}
                            minW={"3rem"}
                            h={"auto"}
                            fontWeight={"700"}
                            fontSize={"16px"}
                            fontFamily={"Inter,Arial,sans-serif"}
                            lineHeight={"24px"}
                            textDecor={"none"}
                            color={"#ffffff"}
                            bg={"transparent"}
                            border={"#4e4c51 solid 0.0625rem"}
                            borderRadius={"full"}
                            outline={"transparent solid 1px"}
                            outlineOffset={0}
                            transitionDuration={"200ms"}
                            transitionProperty={
                              "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                            }
                            userSelect={"none"}
                            _active={{
                              bg: "#38373b",
                              borderColor: "#656367",
                              color: "#e2dfe6",
                            }}
                            _focusVisible={{
                              boxShadow: "none",
                              borderColor: "#ad47ff",
                              outlineColor: "#ad47ff",
                            }}
                            _hover={{
                              bg: "#2e2c30",
                              borderColor: "#59575c",
                              color: "#f5f2f8",
                            }}
                          >
                            <FacebookIcon
                              lineHeight={"1rem"}
                              flexShrink={0}
                              verticalAlign={"middle"}
                              display={"block"}
                            />
                          </Button>
                        </Flex>
                        <Flex pos={"relative"}>
                          <Button
                            type="button"
                            aria-label="google"
                            display={"inline-flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            gap={"0.25rem"}
                            whiteSpace={"nowrap"}
                            verticalAlign={"middle"}
                            pos={"relative"}
                            paddingInline={0}
                            py={0}
                            p={0}
                            minH={"3rem"}
                            minW={"3rem"}
                            h={"auto"}
                            fontWeight={"700"}
                            fontSize={"16px"}
                            fontFamily={"Inter,Arial,sans-serif"}
                            lineHeight={"24px"}
                            textDecor={"none"}
                            color={"#ffffff"}
                            bg={"transparent"}
                            border={"#4e4c51 solid 0.0625rem"}
                            borderRadius={"full"}
                            outline={"transparent solid 1px"}
                            outlineOffset={0}
                            transitionDuration={"200ms"}
                            transitionProperty={
                              "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                            }
                            userSelect={"none"}
                            _active={{
                              bg: "#38373b",
                              borderColor: "#656367",
                              color: "#e2dfe6",
                            }}
                            _focusVisible={{
                              boxShadow: "none",
                              borderColor: "#ad47ff",
                              outlineColor: "#ad47ff",
                            }}
                            _hover={{
                              bg: "#2e2c30",
                              borderColor: "#59575c",
                              color: "#f5f2f8",
                            }}
                          >
                            <GoogleIcon
                              lineHeight={"1rem"}
                              flexShrink={0}
                              verticalAlign={"middle"}
                              display={"block"}
                            />
                          </Button>
                        </Flex>
                        <Flex pos={"relative"}>
                          <Button
                            type="button"
                            aria-label="apple"
                            display={"inline-flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            gap={"0.25rem"}
                            whiteSpace={"nowrap"}
                            verticalAlign={"middle"}
                            pos={"relative"}
                            paddingInline={0}
                            py={0}
                            p={0}
                            minH={"3rem"}
                            minW={"3rem"}
                            h={"auto"}
                            fontWeight={"700"}
                            fontSize={"16px"}
                            fontFamily={"Inter,Arial,sans-serif"}
                            lineHeight={"24px"}
                            textDecor={"none"}
                            color={"#ffffff"}
                            bg={"transparent"}
                            border={"#4e4c51 solid 0.0625rem"}
                            borderRadius={"full"}
                            outline={"transparent solid 1px"}
                            outlineOffset={0}
                            transitionDuration={"200ms"}
                            transitionProperty={
                              "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                            }
                            userSelect={"none"}
                            _active={{
                              bg: "#38373b",
                              borderColor: "#656367",
                              color: "#e2dfe6",
                            }}
                            _focusVisible={{
                              boxShadow: "none",
                              borderColor: "#ad47ff",
                              outlineColor: "#ad47ff",
                            }}
                            _hover={{
                              bg: "#2e2c30",
                              borderColor: "#59575c",
                              color: "#f5f2f8",
                            }}
                          >
                            <AppleIcon
                              lineHeight={"1rem"}
                              flexShrink={0}
                              verticalAlign={"middle"}
                              display={"block"}
                            />
                          </Button>
                        </Flex>
                      </Wrap>
                    </Stack>
                  </chakra.form>
                  <Stack alignItems={"center"} gap={"0.75rem"}>
                    <Link
                      href="https://www.deezer.com/fr/activate"
                      display={"block"}
                      paddingInline={"2rem"}
                      py={"1rem"}
                      maxW={"100%"}
                      color={"inherit"}
                      textDecor={"inherit"}
                      _focusVisible={{
                        outlineColor: "#ad47ff",
                      }}
                    >
                      <Stack
                        alignItems={"center"}
                        flexDir={"row"}
                        gap={"0.5rem"}
                      >
                        <Image
                          alt="Orange"
                          src="https://cdn-images.dzcdn.net/images/misc/ca4c4a56fa60322f150f0f3a57547956/48x0-none-90-1-1.png"
                          h={"24px"}
                          borderStyle={"none"}
                        />
                        <Image
                          alt="SFR"
                          src="https://cdn-images.dzcdn.net/images/misc/03b7777a67b9a2e38bcdded22b3f5573/48x0-none-90-1-1.png"
                          h={"24px"}
                          borderStyle={"none"}
                        />
                        <Image
                          alt="Bouygues Telecom"
                          src="https://cdn-images.dzcdn.net/images/misc/912bd5209924e7d14782dc1040afa749/48x0-none-90-1-1.png"
                          h={"24px"}
                          borderStyle={"none"}
                        />
                        <Text
                          as={"p"}
                          pl={"0.75rem"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          fontFamily={"Inter,Arial,sans-serif"}
                          lineHeight={"20px"}
                          textDecor={"none"}
                          color={"#a19fa4"}
                        >
                          Offres partenaires
                        </Text>
                        <RightCarouselIcon
                          lineHeight={"1em"}
                          flexShrink={0}
                          verticalAlign={"middle"}
                          color="#a19fa4"
                          display={"block"}
                        />
                      </Stack>
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          {/* Last step of registering process */}
          {currentStep === 2 && (
            <Stack
              alignItems={"center"}
              gap={"0.5rem"}
              marginInline={"auto"}
              maxW={"512px"}
              w={"100%"}
            >
              <Stack
                onClick={handleOnClickPrev}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={"0.125rem"}
                flexDir={"row"}
                maxW={"512px"}
                w={"100%"}
                textAlign={"start"}
                cursor={"pointer"}
              >
                <LeftCarouselIcon
                  lineHeight={"1rem"}
                  flexShrink={0}
                  color="#a19fa4"
                  verticalAlign={"middle"}
                  display={"block"}
                />
                <Text
                  fontSize={"14px"}
                  fontWeight={"400"}
                  fontFamily={"Inter,Arial,sans-serif"}
                  lineHeight={"20px"}
                  textDecor={"none"}
                  color={"#a19fa4"}
                >
                  Étape 3 sur 3
                </Text>
              </Stack>
              <Stack alignItems={"center"} gap={"1.5rem"} w={"100%"}>
                <Stack
                  gap={"1.5rem"}
                  paddingInline={"0"}
                  w={"100%"}
                  maxW={"512px"}
                  color={"#ffffff"}
                >
                  <Heading
                    as={"h2"}
                    fontWeight={"700"}
                    fontSize={"46px"}
                    lineHeight={"48px"}
                    maxW={"100ch"}
                  >
                    Entre tes informations personnelles
                  </Heading>
                </Stack>
                <chakra.form style={{ width: "100%" }}>
                  <Stack
                    alignItems={"center"}
                    gap={"1rem"}
                    marginInline={"auto"}
                    maxW={"512px"}
                    w={"100%"}
                  >
                    <FormControl
                      w={"100%"}
                      pos={"relative"}
                      isInvalid={isError}
                    >
                      <FormLabel
                        display={"block"}
                        marginInlineEnd={"0.75rem"}
                        mb={"0.5rem"}
                        fontWeight={"500"}
                        fontSize={"0.875rem"}
                        color={"#a19fa4"}
                        textAlign={"start"}
                        opacity={1}
                        transitionDuration={"200ms"}
                        transitionProperty={
                          "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                        }
                      >
                        Pseudo
                      </FormLabel>
                      <Input
                        name="username"
                        type="username"
                        id="username"
                        autoComplete="username"
                        placeholder="Pseudo"
                        required
                        value={username}
                        position={"relative"}
                        paddingInlineStart={"1rem"}
                        paddingInlineEnd={"0.75rem"}
                        w={"100%"}
                        h={"3rem"}
                        minW={"0"}
                        minH={"3rem"}
                        fontSize={"16px"}
                        fontWeight={"400"}
                        fontFamily={"Inter,Arial,sans-serif"}
                        color={"#ffffff"}
                        lineHeight={"24px"}
                        textDecor={"none"}
                        bg={"#242326"}
                        borderRadius={"0.5rem"}
                        borderColor={"transparent"}
                        borderWidth={"0.125rem"}
                        borderStyle={"solid"}
                        outline={"transparent solid 2px"}
                        outlineOffset={"2px"}
                        transitionDuration={"200ms"}
                        transitionProperty={
                          "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                        }
                        appearance={"none"}
                        onChange={(e) => setUsername(e.target.value)}
                        _placeholder={{ color: "#5D6E73" }}
                        _active={{
                          borderColor: "#ad47ff",
                        }}
                        _focus={{
                          borderColor: "#ad47ff",
                        }}
                        _hover={{
                          bg: "#2e2c30",
                          color: "#f5f2f8",
                        }}
                      />
                      {isError && (
                        <FormErrorMessage
                          display={"flex"}
                          alignItems={"center"}
                          mt={"0.5rem"}
                          fontSize={"0.875rem"}
                          lineHeight={"normal"}
                          textAlign={"start"}
                          color={"#E53E3E"}
                        >
                          <WarningIcon
                            lineHeight={"1em"}
                            flexShrink={0}
                            verticalAlign={"middle"}
                            mr={"0.5rem"}
                            color="#E53E3E"
                            display={"block"}
                          />
                          Le champ ne doit pas être vide.
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      w={"100%"}
                      pos={"relative"}
                      isInvalid={isError}
                    >
                      <FormLabel
                        display={"block"}
                        marginInlineEnd={"0.75rem"}
                        mb={"0.5rem"}
                        fontWeight={"500"}
                        fontSize={"0.875rem"}
                        color={"#a19fa4"}
                        textAlign={"start"}
                        opacity={1}
                        transitionDuration={"200ms"}
                        transitionProperty={
                          "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                        }
                      >
                        Âge
                      </FormLabel>
                      <NumberInput
                        name="age"
                        id="age"
                        value={age > 0 ? age : undefined}
                        step={1}
                        min={0}
                        max={9007199254740991}
                        zIndex={0}
                        onChange={(e) => setAge(Number(e))}
                      >
                        <NumberInputField
                          paddingInlineStart={"1rem"}
                          paddingInlineEnd={"0.75rem"}
                          w={"100%"}
                          h={"3rem"}
                          minW={"0"}
                          minH={"3rem"}
                          fontSize={"16px"}
                          fontWeight={"400"}
                          fontFamily={"Inter,Arial,sans-serif"}
                          color={"#ffffff"}
                          lineHeight={"24px"}
                          textDecor={"none"}
                          bg={"#242326"}
                          borderRadius={"0.5rem"}
                          borderColor={"transparent"}
                          borderWidth={"0.125rem"}
                          borderStyle={"solid"}
                          outline={"transparent solid 2px"}
                          outlineOffset={"2px"}
                          transitionDuration={"200ms"}
                          transitionProperty={
                            "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                          }
                          appearance={"none"}
                          _placeholder={{ color: "#5D6E73" }}
                          _active={{
                            borderColor: "#ad47ff",
                          }}
                          _focus={{
                            borderColor: "#ad47ff",
                          }}
                          _hover={{
                            bg: "#2e2c30",
                            color: "#f5f2f8",
                          }}
                        />
                        <NumberInputStepper
                          right={"2px"}
                          top={"2px"}
                          bottom={"2px"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          marginInline={0}
                          m={"auto 1px"}
                          py={"2px"}
                          h={"100%"}
                          borderInlineStart={"1px solid #4e4c51"}
                        >
                          <NumberIncrementStepper
                            h={"100%"}
                            w={"100%"}
                            maxH={"1.5rem"}
                            maxW={"1.5rem"}
                            color={"inherit"}
                            border={0}
                            borderInlineStart={"1px solid inherit"}
                            children={<IncrementIcon size="20px" />}
                          />
                          <NumberDecrementStepper
                            h={"100%"}
                            w={"100%"}
                            maxH={"1.5rem"}
                            maxW={"1.5rem"}
                            color={"inherit"}
                            border={0}
                            borderInlineStart={"1px solid inherit"}
                            children={<DecrementIcon size="20px" />}
                          />
                        </NumberInputStepper>
                      </NumberInput>
                      {isError && (
                        <FormErrorMessage
                          display={"flex"}
                          alignItems={"center"}
                          mt={"0.5rem"}
                          fontSize={"0.875rem"}
                          lineHeight={"normal"}
                          textAlign={"start"}
                          color={"#E53E3E"}
                        >
                          <WarningIcon
                            lineHeight={"1em"}
                            flexShrink={0}
                            verticalAlign={"middle"}
                            mr={"0.5rem"}
                            color="#E53E3E"
                            display={"block"}
                          />
                          Le champ ne doit pas être vide.
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      w={"100%"}
                      pos={"relative"}
                      isInvalid={isError}
                    >
                      <FormLabel
                        display={"block"}
                        marginInlineEnd={"0.75rem"}
                        mb={"0.5rem"}
                        fontWeight={"500"}
                        fontSize={"0.875rem"}
                        color={"#a19fa4"}
                        textAlign={"start"}
                        opacity={1}
                        transitionDuration={"200ms"}
                        transitionProperty={
                          "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                        }
                      >
                        Identité
                      </FormLabel>
                      <Select
                        name="identity"
                        id="identity"
                        placeholder="Identité"
                        required
                        value={identity}
                        pos={"relative"}
                        pb={"1px"}
                        w={"100%"}
                        h={"3rem"}
                        minW={0}
                        minH={"3rem"}
                        fontSize={"16px"}
                        fontWeight={"400"}
                        fontFamily={"Inter,Arial,sans-serif"}
                        lineHeight={"24px"}
                        color={"#ffffff"}
                        textDecor={"none"}
                        bg={"#242326"}
                        borderRadius={"0.5rem"}
                        border={"transparent solid 0.125rem"}
                        outline={"transparent solid 2px"}
                        outlineOffset={"none"}
                        transitionDuration={"200ms"}
                        transitionProperty={
                          "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                        }
                        appearance={"none"}
                        onChange={(e) => setidentity(e.target.value)}
                        sx={{
                          paddingInlineStart: "1rem",
                          paddingInlineEnd: "2rem",
                          "> option": { bg: "#4e4c51" },
                        }}
                        _placeholder={{ color: "#5D6E73" }}
                        _active={{
                          borderColor: "#ad47ff",
                        }}
                        _focus={{
                          borderColor: "#ad47ff",
                        }}
                        _hover={{
                          bg: "#2e2c30",
                          color: "#f5f2f8",
                        }}
                      >
                        <option value={"F"}>Femme</option>
                        <option value={"M"}>Homme</option>
                        <option value={"NB"}>Non-binaire</option>
                        <option value={"P"}>Private</option>
                      </Select>
                      {isError && (
                        <FormErrorMessage
                          display={"flex"}
                          alignItems={"center"}
                          mt={"0.5rem"}
                          fontSize={"0.875rem"}
                          lineHeight={"normal"}
                          textAlign={"start"}
                          color={"#E53E3E"}
                        >
                          <WarningIcon
                            lineHeight={"1em"}
                            flexShrink={0}
                            verticalAlign={"middle"}
                            mr={"0.5rem"}
                            color="#E53E3E"
                            display={"block"}
                          />
                          Le champ ne doit pas être vide.
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    <Text
                      as={"p"}
                      fontSize={"12px"}
                      fontFamily={"Inter,Arial,sans-serif"}
                      fontWeight={"400"}
                      lineHeight={"16px"}
                      textDecor={"none"}
                      textAlign={"center"}
                      opacity={"0.9"}
                      color={"#a19fa4"}
                      m={0}
                    >
                      En cliquant sur "Inscris-toi gratuitement", tu acceptes de
                      créer un compte ainsi que les&nbsp;
                      <Link
                        href="https://www.deezer.com/legal/cgu"
                        target="_blank"
                        textDecor={"underline"}
                      >
                        Conditions générales d'utilisation
                      </Link>
                      et la&nbsp;
                      <Link
                        href="https://www.deezer.com/legal/personal-datas"
                        target="_blanket"
                        textDecor={"underline"}
                      >
                        Politique de protection des données
                      </Link>
                    </Text>
                    <Button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        sessionStorage.removeItem("smartJourneyState");
                        handleOnClickCreatUser();
                      }}
                      display={"inline-flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={"0.25rem"}
                      whiteSpace={"nowrap"}
                      verticalAlign={"middle"}
                      pos={"relative"}
                      paddingInline={"1.5rem"}
                      py={"0.75rem"}
                      p={0}
                      minH={"3rem"}
                      minW={"3rem"}
                      h={"auto"}
                      w={"100%"}
                      fontWeight={"700"}
                      fontSize={"16px"}
                      fontFamily={"Inter,Arial,sans-serif"}
                      lineHeight={"24px"}
                      textDecor={"none"}
                      color={"#ffffff"}
                      bg={"#ad47ff"}
                      borderRadius={"0.75rem"}
                      outline={"transparent solid 2px"}
                      outlineOffset={0}
                      transitionDuration={"200ms"}
                      transitionProperty={
                        "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
                      }
                      userSelect={"none"}
                      _active={{
                        color: "#e2dfe6",
                        bg: "#ca97ff",
                      }}
                      _focusVisible={{
                        boxShadow: "none",
                        outlineColor: "#f5f2f8",
                      }}
                      _hover={{
                        color: "#f5f2f8",
                        bg: "#bb73ff",
                      }}
                    >
                      <span>Inscris-toi gratuitement</span>
                    </Button>
                  </Stack>
                </chakra.form>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PageSignup;
