import {
  Box,
  Flex,
  Link,
  chakra,
  Stack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  Button,
  FormHelperText,
  Wrap,
  Image
} from "@chakra-ui/react";
import "../../style.css";
import { useState } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";

import LogoD10h from '../../../public/imgs/LogoD10h.png'

/* import hook */
import { useAuth } from "../../hooks/useAuth";

/* import SVG */
import {
  LogoTempo,
  DisplayIcon,
  FacebookIcon,
  GoogleIcon,
  AppleIcon,
  WarningIcon,
} from "../../components/Svg";

export interface IPageLoginProps {}

const PageLogin: React.FC<IPageLoginProps> = () => {
  /* varibale for navigation by react-router-dom */
  const navigate: NavigateFunction = useNavigate();

  /* user et login management from context by hook */
  const { setUser, setIsAuthenticated, setIsFirstLogin } = useAuth();

  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);
  const [messageErrorEmail, setMessageErrorEmail] = useState<string>("");
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);
  const [messageErrorPassword, setMessageErrorPassword] = useState<string>("");

  /* States to stock inputs content */
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inputType, setInputType] = useState<"password" | "text">("password");

  const displayPassword = () => {
    if (inputType === "password") setInputType("text");
    if (inputType === "text") setInputType("password");
  };

  /* function to submit login information */
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
        setIsErrorEmail(true);
        setMessageErrorEmail("Identifiant inconnu");
        setIsErrorPassword(true);
        setMessageErrorPassword("Identifiant incorrect");
      }
    } catch (error) {
      console.error("Impossible de trouver l'utilisateur: ", error);
      setIsErrorEmail(true);
      setMessageErrorEmail("Identifiant inconnu");
      setIsErrorPassword(true);
      setMessageErrorPassword("Identifiant incorrect");
    }
  };

  return (
    <Stack
      alignItems={"center"}
      gap={"1.5rem"}
      minH={"100vh"}
      w={"100%"}
      pb={"3rem"}
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
            <Flex
              justifyContent={"left"} alignItems={'center'}
              marginInlineEnd={0}
              gap={1}
              w={"100%"}
            >
              <Link
                href="https://www.deezer.com/"
                target="_blanket"
                color={"inherit"}
                textDecor={"inherit"}
              >
                <LogoTempo />
              </Link>
              <Link
                href="/"
                fontSize={"1,125rem"}
                fontWeight={"600"}
                color={"#fdfcfe"}
              >
                <Image src={LogoD10h} h={'42px'} w={'86px'}/>
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
        gap={"0.5rem"}
        paddingInline={"1rem"}
        w={"100%"}
        textAlign={"center"}
      >
        <Heading
          as={"h1"}
          fontWeight={"700"}
          fontSize={"1.875rem"}
          maxW={"100ch"}
          color={"#ffffff"}
          lineHeight={"1.33"}
        >
          Connecte-toi
        </Heading>
      </Stack>
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
          w={"100%"}
          bg={"#000000"}
        >
          <chakra.form
            style={{
              width: "100%",
            }}
          >
            <Stack
              alignItems={"center"}
              gap={"1rem"}
              marginInline={"auto"}
              w={"100%"}
              maxW={"512px"}
            >
              <FormControl w={"100%"} pos={"relative"} isInvalid={isErrorEmail}>
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
                  value={email}
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
                    setEmail(e.target.value);
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
                {isErrorEmail && (
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
                    {messageErrorEmail}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                w={"100%"}
                pos={"relative"}
                isInvalid={isErrorPassword}
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
                  onClick={(e) => e.preventDefault()}
                  cursor={"not-allowed"}
                  title="prochainement"
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
                {isErrorPassword && (
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
                    {messageErrorPassword}
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

                  if (isErrorPassword) {
                    setIsErrorPassword(false);
                    setMessageErrorPassword("");
                  }

                  if (isErrorEmail) {
                    setIsErrorEmail(false);
                    setMessageErrorEmail("");
                  }

                  const emailEmpty = email.trim() === "";
                  const passwordEmpty = password.trim() === "";

                  if (emailEmpty) {
                    setIsErrorEmail(true);
                    setMessageErrorEmail("Le champ ne doit pas être vide");
                  }

                  if (passwordEmpty) {
                    setIsErrorPassword(true);
                    setMessageErrorPassword("Le champ ne doit pas être vide");
                  }

                  if (!emailEmpty && !passwordEmpty) {
                    onSubmit();
                  }
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
          <Box textAlign={"center"}>
            <Text
              as={"p"}
              display={"inline"}
              fontSize={"0.875rem"}
              color={"#a19fa4"}
            >
              Tu n'as pas encore de compte sur Deezer ?&nbsp;
            </Text>
            <Link
              href="/signup/?step=0"
              pos={"relative"}
              display={"inline"}
              alignItems={"center"}
              gap={"0.25rem"}
              paddingInline={"1.5rem"}
              p={0}
              minH={"3rem"}
              minW={"3rem"}
              h={"auto"}
              whiteSpace={"nowrap"}
              verticalAlign={"baseline"}
              fontFamily={"Inter,Arial,sans-serif"}
              fontWeight={"700"}
              fontSize={"0.875rem"}
              lineHeight={"normal"}
              textDecor={"none"}
              color={"#ad47ff"}
              textTransform={"none"}
              borderRadius={"0.75rem"}
              outline={"transparent solid 2px"}
              outlineOffset={0}
              transitionDuration={"200ms"}
              transitionProperty={
                "background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"
              }
              appearance={"none"}
              userSelect={"none"}
            >
              <span>Inscription</span>
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PageLogin;
