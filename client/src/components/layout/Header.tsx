import {
  Box,
  chakra,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Avatar,
  IconButton,
  Text,
  Heading,
  Image,
  Link,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

// SVGs import from a unique file
import {
  SearchIcon,
  DisableIcon,
  NotifIcon,
  DeleteButtonIcon,
  HeartIcon,
  RightCarouselIcon,
} from "../Svg";

// Context
import { useSearch } from "../../context/SearchContext";

// Hooks
import useSearchHistory, {
  type IHistoryItem,
} from "../../hooks/useSearchHistory";
import { useAuth } from "../../hooks/useAuth";
import useWindowWidth from "../..//hooks/useWindowWidth.tsx";

// Type
import {
  type IDeezerSearchResponse,
  type IDeezerTrack,
} from "../../types/Deezer";

export interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  const burgerMenuRef = useRef<HTMLDivElement | null>(null);

  /*Searchs Results management*/
  const { searchResults, setSearchResults, setIsLoading } = useSearch();

  //Viariables for responsive
  const width = useWindowWidth();
  const Breakpoint = 1160;
  const isMinimal = width <= Breakpoint;
  const headerResponsiveWidth = isMinimal ? "80px" : "272px";

  const host = import.meta.env.VITE_HOST;
  const port = import.meta.env.VITE_API_PORT;

  const BASE_URL = `http://${host}:${port}/`;

  /*Calling the Deezer API for search suggestions*/
  async function fetchDeezerSuggestions(query: string) {
    try {
      setIsLoading(true);

      const safeQuery = encodeURIComponent(query);
      const apiURL = `/api/search?q=${safeQuery}`;

      const response = await fetch(apiURL);
      const responseJson = (await response.json()) as IDeezerSearchResponse;

      setSearchResults(responseJson.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  /* Navigation */
  const navigate = useNavigate();

  type TimerId = ReturnType<typeof setTimeout>;

  /* States for searchbar */
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isInternalUpdate, setIsInternalUpdate] = useState<boolean>(false);

  /* States for Avatar button */
  const { user } = useAuth();
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);

  const timerRef = useRef<TimerId | undefined>(undefined);

  /* Variables for search history */
  const [history, _, addToHistory] = useSearchHistory();

  /* User data from context by hook */
  const { user: userToken, logout } = useAuth();

  /* search choice management */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      event.preventDefault();
      const safeQuery = encodeURIComponent(query);

      navigate(`/search?q=${safeQuery}`);
      setIsFocused(false);
      setQuery("");
    }
  };

  /*Sends suggestion selected to query*/
  function handleSuggestionClick(id: number) {
    const item = searchResults.find((result) => {
      return result.id == `${id}`;
    });

    if (item != undefined) {
      const historyItem = {
        query: item.title,
        title: item.title,
        artistName: item.artist.name,
        coverUrl: item.album.cover_small,
        type: item.type,
      };

      addToHistory(historyItem);

      setQuery(`${item.title} - ${item.artist.name}`);
    }

    if (timerRef.current != undefined) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }

    setIsFocused(false);
  }

  /*Sends history selected to query*/
  function handleHistoryClick(h: IHistoryItem) {
    if (timerRef.current != undefined) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    setIsInternalUpdate(true);
    setQuery(`${h.title} - ${h.artistName}`);
  }

  const handleResetHistory: () => void = () => {
    localStorage.removeItem("D10h_!_Search_History");
  };

  const handleAvatarClick = () => {
    if (isDisplayed) {
      setIsDisplayed(false);
    } else {
      setIsDisplayed(true);
    }
  };

  useEffect(() => {
    if (isInternalUpdate) {
      setSearchResults([]);
      setIsInternalUpdate(false);
    } else if (query && query.length < 2) {
      setSearchResults([]);
      return;
    } else {
      timerRef.current = setTimeout(() => {
        fetchDeezerSuggestions(query);
      }, 300);
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [query, isInternalUpdate]);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (
        burgerMenuRef.current &&
        !burgerMenuRef.current.contains(e.target as Node)
      ) {
        setIsDisplayed(false);
      }
    };

    if (isDisplayed) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDisplayed]);

  return (
    <Flex
      id="header-container"
      alignItems={"center"}
      height={"80px"}
      minWidth={"770px"}
      padding={"1rem"}
      background={"#000000"}
      position={"fixed"}
      left={headerResponsiveWidth}
      right={"0"}
      top={"0"}
      borderBottom={"1px solid #4e4c51"}
    >
      <Flex
        id="header"
        direction={"row"}
        align={"center"}
        height={"80px"}
        width={"100%"}
      >
        <Box
          id="top-search-bar"
          marginRight={"auto"}
          width={"375px"}
          position={"relative"}
        >
          <InputGroup
            id="search-zone"
            bg={"#242326"}
            color={"#6D6D71"}
            borderRadius={"0.5rem"}
          >
            <InputLeftElement
              id="search-icon"
              margin={"0 0.75rem 0 1rem"}
              left={"0"}
              width={"1.5rem"}
              height={"3rem"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Button
                type="submit"
                display={"inline-flex"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"0.25rem"}
                padding={"0"}
                appearance={"none"}
                userSelect={"none"}
                whiteSpace={"nowrap"}
                outline={"transparent solid 2px"}
                pointerEvents={"none"}
                textDecoration={"none"}
                background={"transparent"}
                _active={{
                  borderColor: "#9A36F3",
                }}
              >
                <SearchIcon />
              </Button>
            </InputLeftElement>
            <Input
              type="search"
              value={query ?? ""}
              aria-label="Rechercher"
              placeholder="Artistes, titres, Scorbraries ..."
              padding={"0 2.75rem 0 2.75rem"}
              height={"3rem"}
              width={"100%"}
              borderRadius={"0.5rem"}
              borderColor={"transparent"}
              borderWidth={"0.125rem"}
              borderStyle={"solid"}
              textDecoration={"none"}
              /*query update*/
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              /*Search choice management triggering*/
              onKeyDown={handleKeyDown}
              /*setTimeout clearing*/
              onFocus={() => {
                {
                  if (timerRef.current != undefined) {
                    clearTimeout(timerRef.current);
                    timerRef.current = undefined;
                  }
                }
                setIsFocused(true);
              }}
              /*Hide the suggestions after selection*/
              onBlur={() => {
                timerRef.current = setTimeout(() => {
                  setIsFocused(false);
                }, 250);
              }}
              sx={{
                "&::-webkit-search-cancel-button": {
                  display: "none",
                },
              }}
              _placeholder={{
                color: "#6F6D6A",
                fontWeight: "425",
                fontFamily: "Inter, Arial, sans-serif",
              }}
              _hover={{
                borderColor: "#2e2c30",
                bg: "#2e2c30",
              }}
              _focus={{
                borderColor: "#A238FF",
                boxShadow: "none",
              }}
              _active={{
                borderColor: "#A238FF",
              }}
            />
            <InputRightElement
              right={"0"}
              width={"1.5rem"}
              height={"3rem"}
              margin={"0 0.75rem 0 1rem"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Button
                type="button"
                aria-label="Effacer"
                isDisabled
                title="prochainement"
                padding={"0"}
                display={"inline-flex"}
                alignItems={"center"}
                justifyContent={"center"}
                verticalAlign={"baseline"}
                gap={"0.25rem"}
                appearance={"none"}
                userSelect={"none"}
                whiteSpace={"nowrap"}
                outline={"transparent solid 2px"}
                pointerEvents={"none"}
                textDecoration={"none"}
                background={"transparent"}
              >
                <DisableIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
          {isFocused && (
            <Box
              position={"absolute"}
              top={"0px"}
              left={"0px"}
              paddingTop={"10px"}
              transform={"translate3d(-1px, 48px, 0px)"}
              willChange={"transform"}
              width={"100%"}
            >
              <Box
                position={"relative"}
                padding={"0"}
                width={"375px"}
                maxHeight={"calc(100vh - 150px)"}
                backgroundColor={"#141216"}
                borderRadius={"10px"}
                boxShadow={"0 4px 20px 0 #0000003d"}
                color={"#ffffff"}
                overflow={"auto"}
              >
                <Flex
                  direction={"column"}
                  maxHeight={"440px"}
                  overflowY={"auto"}
                >
                  <Flex direction={"column"} maxHeight={"385px"}>
                    {/*Display searh history before query*/}
                    {(query || "").length === 0 &&
                    history &&
                    history.length > 0 ? (
                      <Flex direction={"column"} maxHeight={"385px"}>
                        <Flex
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          paddingInlineStart={"1rem"}
                          paddingInlineEnd={"0.75rem"}
                          paddingY={"0.5rem"}
                        >
                          <Heading
                            as={"h2"}
                            fontFamily={"Inter,Arial,sans-serif"}
                            fontWeight={"700"}
                            fontSize={"18px"}
                            lineHeight={"24px"}
                            textDecoration={"none"}
                          >
                            Dernières recherches
                          </Heading>
                          <Button
                            type="button"
                            display={"inline-flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            isDisabled
                            title="prochainement"
                            minHeight={"2rem"}
                            minWidth={"2rem"}
                            height={"auto"}
                            paddingInline={"0px"}
                            paddingY={"0px"}
                            position={"relative"}
                            verticalAlign={"middle"}
                            color={"#ffffff"}
                            background={"transparent"}
                            borderRadius={"full"}
                            appearance={"none"}
                            userSelect={"none"}
                            whiteSpace={"nowrap"}
                            outline={"transparent solid 2px"}
                            outlineOffset={"0px"}
                            lineHeight={"20px"}
                            fontWeight={"600"}
                            fontSize={"14px"}
                            fontFamily={"Inter,Arial,sans-serif"}
                            textDecoration={"none"}
                            onClick={handleResetHistory}
                            _hover={{
                              background: "#3A393D",
                            }}
                          >
                            <DeleteButtonIcon />
                          </Button>
                        </Flex>
                        <Box overflow={"auto"}>
                          <Box>
                            {history.map((h: IHistoryItem) => {
                              return (
                                <Box key={h.title}>
                                  <Box
                                    paddingInlineStart={"1rem"}
                                    paddingInlineEnd={"0"}
                                    paddingY={"0.5rem"}
                                    onClick={() => {
                                      handleHistoryClick(h);
                                    }}
                                  >
                                    <Flex alignItems={"center"} gap={"0.5rem"}>
                                      <Box
                                        id="image"
                                        minWidth={"3rem"}
                                        height={"3rem"}
                                        width={"3rem"}
                                        borderRadius={"0.125px"}
                                      >
                                        <Flex
                                          alignItems={"center"}
                                          justifyContent={"center"}
                                          position={"relative"}
                                          height={"100%"}
                                          width={"100%"}
                                          borderStyle={"solid"}
                                          borderWidth={"0.0625rem"}
                                          borderRadius={"0.125rem"}
                                          overflow={"hidden"}
                                        >
                                          <Image
                                            src={h.coverUrl}
                                            objectFit={"cover"}
                                            width={"100%"}
                                            height={"100%"}
                                            opacity={"1"}
                                          />
                                          <Flex
                                            alignItems={"center"}
                                            gap={"0.25rem"}
                                            position={"absolute"}
                                            bottom={"0.75rem"}
                                            left={"50%"}
                                            top={"50%"}
                                            transform={"translate(-50%, -50%)"}
                                          ></Flex>
                                        </Flex>
                                      </Box>
                                      <Flex
                                        role="button"
                                        direction={"column"}
                                        justifyContent={"center"}
                                        flex={"1 1 0%"}
                                        width={"fit-content"}
                                        color={"#ffffff"}
                                        textAlign={"left"}
                                        overflow={"hidden"}
                                      >
                                        <Box
                                          overflow={"hidden"}
                                          position={"relative"}
                                          whiteSpace={"nowrap"}
                                        >
                                          <Flex>
                                            <Box>
                                              <Text
                                                as={"p"}
                                                fontSize={"16px"}
                                                fontWeight={"400"}
                                                fontFamily={
                                                  "Inter,Arial,sans-serif"
                                                }
                                                color={"#ffffff"}
                                                lineHeight={"24px"}
                                                textDecoration={"none"}
                                                textOverflow={"ellipsis"}
                                                overflow={"hidden"}
                                                margin={0}
                                              >
                                                {h.title}
                                              </Text>
                                            </Box>
                                          </Flex>
                                        </Box>
                                        <Box
                                          overflow={"hidden"}
                                          position={"relative"}
                                          whiteSpace={"nowrap"}
                                          style={{
                                            maskImage:
                                              "linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 2.42%, rgb(0, 0, 0) 23.26%)",
                                          }}
                                        >
                                          <Flex
                                            style={{
                                              transform:
                                                "translate3d(0px, 0px, 0px",
                                              willChange: "transform",
                                            }}
                                          >
                                            <Box>
                                              <Text
                                                marginTop={"0.125rem"}
                                                fontSize={"14px"}
                                                fontFamily={
                                                  "Inter,Arial,sans-serif"
                                                }
                                                fontWeight={"400"}
                                                color={"#a19fa4"}
                                                lineHeight={"20px"}
                                                textDecoration={"none"}
                                                overflow={"hidden"}
                                                textOverflow={"ellipsis"}
                                              >
                                                <Text as={"span"} marginEnd={1}>
                                                  {h.type}
                                                </Text>
                                                •
                                                <Text
                                                  as={"span"}
                                                  color={"#ffffff"}
                                                  marginStart={1}
                                                >
                                                  {h.artistName}
                                                </Text>
                                              </Text>
                                            </Box>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                      <Flex
                                        direction={"column"}
                                        justifyContent={"center"}
                                        overflow={"hidden"}
                                        width={"fit-content"}
                                        color={"#ffffff"}
                                      >
                                        <Button
                                          type="button"
                                          isDisabled
                                          title="prochainement"
                                          display={"inline-flex"}
                                          alignItems={"center"}
                                          justifyContent={"center"}
                                          position={"relative"}
                                          whiteSpace={"nowrap"}
                                          verticalAlign={"middle"}
                                          paddingInline={0}
                                          paddingY={0}
                                          minHeight={"2rem"}
                                          minWidth={"2rem"}
                                          height={"auto"}
                                          outline={"tranparent solid 2px"}
                                          outlineOffset={"0px"}
                                          lineHeight={"20px"}
                                          fontWeight={"600"}
                                          fontSize={"14px"}
                                          fontFamily={"Inter,Arial,sans-serif"}
                                          textDecoration={"none"}
                                          color={"#ffffff"}
                                          background={"transparent"}
                                          borderRadius={"full"}
                                          userSelect={"none"}
                                          _hover={{
                                            background: "#3A393D",
                                          }}
                                        >
                                          <HeartIcon />
                                        </Button>
                                      </Flex>
                                    </Flex>
                                  </Box>
                                </Box>
                              );
                            })}
                          </Box>
                        </Box>
                      </Flex>
                    ) : (
                      /*Displays suggestions list*/
                      (searchResults || []).map((e: IDeezerTrack) => {
                        return (
                          <Box
                            key={e.id}
                            paddingStart={1}
                            marginY={1}
                            _hover={{
                              background: "#2e2c30",
                            }}
                            onClick={() => {
                              handleSuggestionClick(e.id);
                            }}
                          >
                            <Text as={"p"} fontWeight={"700"}>
                              {e.title}
                            </Text>
                            <Text as={"p"} fontSize={"14px"}>
                              {e.artist.name}
                            </Text>
                          </Box>
                        );
                      })
                    )}
                  </Flex>
                </Flex>
              </Box>
            </Box>
          )}
        </Box>
        <Box id="notif" marginLeft={"1rem"} height={"2rem"} width={"2rem"}>
          <IconButton
            type="button"
            aria-label="Notifications"
            disabled
            background={"transparent"}
            borderRadius={"full"}
            height={"2rem"}
            width={"2rem"}
            minWidth={"2rem"}
            _active={{
              backgroundColor: "#464549",
              color: "#ebe7ee",
              borderRadius: "full",
            }}
            _focusVisible={{
              borderRadius: "full",
              outlineColor: "#9A36F3",
              boxShadow: "none",
            }}
            _hover={{
              background: "#3A393D",
              borderRadius: "full",
            }}
          >
            <NotifIcon />
          </IconButton>
        </Box>
        <Box h={"32px"} pos={"relative"} w={"32px"} ml={"16px"}>
          <Avatar
            as={Button}
            id="compte"
            name={userToken?.username}
            src={`${BASE_URL}uploads/avatars/${user?.avatarUrl}`}
            textAlign={"center"}
            verticalAlign={"top"}
            padding={0}
            w={"2rem"}
            h={"2rem"}
            minW={"2rem"}
            fontWeight={"500"}
            bg={"#29282d"}
            color={"#a9a6aa"}
            borderRadius={"full"}
            textTransform={"uppercase"}
            onClick={handleAvatarClick}
            _hover={{
              opacity: "0.76",
              transition: "opacity 0.2s ease-in-out",
              background: "#29282d",
            }}
          />
          {isDisplayed && (
            <Box
              ref={burgerMenuRef}
              pos={"absolute"}
              top={0}
              left={0}
              pt={"10px"}
              transform={"translate3d(-332px, 32px, 0px)"}
              willChange={"tranform"}
            >
              <Box
                pos={"relative"}
                p={0}
                w={"375px"}
                maxH={"calc(100vh - 150px)"}
                bg={"#141216"}
                color={"#ffffff"}
                borderRadius={"10px"}
                boxShadow={"0 4px 20px 0 #0000003d"}
                overflowY={"auto"}
              >
                <Flex
                  as={Link}
                  href="/favoris"
                  alignItems={"center"}
                  p={"12px 20px"}
                  color={"#ffffff"}
                  textDecor={"none"}
                  bg={"transparent"}
                  outline={"transparent solid 2px"}
                  outlineOffset={"2px"}
                  transitionDuration={".15s"}
                  transitionProperty={"background-color"}
                  transitionTimingFunction={"cubic-bezier(0, 0, 0.2, 1)"}
                  cursor={"pointer"}
                  transform={"translateZ(0)"}
                  _hover={{
                    backgroundColor: "#242326",
                    color: "#ffffff",
                    textDecor: "none",
                  }}
                >
                  <Avatar
                    as={"span"}
                    name={userToken?.username}
                    src={`${BASE_URL}uploads/avatars/${user?.avatarUrl}`}
                    display={"inline-flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    pos={"relative"}
                    verticalAlign={"top"}
                    w={"2.5rem"}
                    h={"2.5rem"}
                    fontWeight={"500"}
                    textAlign={"center"}
                    textTransform={"uppercase"}
                    color={"#a19fa4"}
                    bg={"#242326"}
                    borderRadius={"16rem"}
                    borderColor={"black"}
                    flexShrink={0}
                  />
                  <Box
                    color={"#ffffff"}
                    flex={1}
                    fontSize={"16px"}
                    ml={"12px"}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                  >
                    <span>{user?.username}</span>
                  </Box>
                  <RightCarouselIcon
                    size="16px"
                    lineHeight={"1rem"}
                    flexShrink={0}
                    verticalAlign={"middle"}
                    display={"block"}
                  />
                </Flex>
                <List
                  borderTop={"1px solid #38373b"}
                  fontSize={"14px"}
                  m={0}
                  p={"8px 0"}
                  listStyleType={"none"}
                >
                  <ListItem p={"0 8px"} listStyleType={"none"} m={0}>
                    <Flex
                      as={Link}
                      role="button"
                      onClick={(e) => e.preventDefault()}
                      cursor={"not-allowed"}
                      title="prochainement"
                      alignItems={"center"}
                      p={"12px"}
                      color={"#ffffff"}
                      textDecor={"inherit"}
                      backgroundColor={"transparent"}
                      borderRadius={"4px"}
                      outline={"0 none"}
                      transitionDuration={".15s"}
                      transitionProperty={"background-color, color"}
                      transform={"translateZ(0)"}
                      _hover={{
                        backgroundColor: "#242326",
                        color: "#ffffff",
                        textDecor: "none",
                      }}
                    >
                      <chakra.span flex={1}>Membres</chakra.span>
                      <RightCarouselIcon
                        size="16px"
                        lineHeight={"1rem"}
                        flexShrink={0}
                        color="currentcolor"
                        verticalAlign={"middle"}
                        display={"block"}
                      />
                    </Flex>
                  </ListItem>
                  <ListItem p={"0 8px"} listStyleType={"none"} m={0}>
                    <Flex
                      as={Link}
                      href="/account"
                      alignItems={"center"}
                      p={"12px"}
                      color={"#ffffff"}
                      textDecor={"inherit"}
                      backgroundColor={"transparent"}
                      borderRadius={"4px"}
                      outline={"transparent solid 2px"}
                      outlineOffset={"2px"}
                      transitionDuration={".15s"}
                      transitionProperty={"background-color, color"}
                      transitionTimingFunction={"cubic-bezier(0, 0, 0.2, 1)"}
                      transform={"translateZ(0)"}
                      cursor={"pointer"}
                      _hover={{
                        backgroundColor: "#242326",
                        color: "#ffffff",
                        textDecor: "none",
                      }}
                    >
                      <chakra.span flex={1}>Paramètre de compte</chakra.span>
                      <RightCarouselIcon
                        size="16px"
                        lineHeight={"1rem"}
                        flexShrink={0}
                        color="currentcolor"
                        verticalAlign={"middle"}
                        display={"block"}
                      />
                    </Flex>
                  </ListItem>
                  <ListItem p={"0 8px"} listStyleType={"none"} m={0}>
                    <Flex
                      as={Link}
                      role="button"
                      onClick={(e) => e.preventDefault()}
                      cursor={"not-allowed"}
                      title="prochainement"
                      alignItems={"center"}
                      p={"12px"}
                      color={"#ffffff"}
                      textDecor={"inherit"}
                      backgroundColor={"transparent"}
                      borderRadius={"4px"}
                      outline={"transparent solid 2px"}
                      outlineOffset={"2px"}
                      transitionDuration={".15s"}
                      transitionProperty={"background-color, color"}
                      transitionTimingFunction={"cubic-bezier(0, 0, 0.2, 1)"}
                      transform={"translateZ(0)"}
                      _hover={{
                        backgroundColor: "#242326",
                        color: "#ffffff",
                        textDecor: "none",
                      }}
                    >
                      <chakra.span flex={1}>Gérer mon abonnement</chakra.span>
                      <RightCarouselIcon
                        size="16px"
                        lineHeight={"1rem"}
                        flexShrink={0}
                        color="currentcolor"
                        verticalAlign={"middle"}
                        display={"block"}
                      />
                    </Flex>
                  </ListItem>
                  <ListItem p={"0 8px"} listStyleType={"none"} m={0}>
                    <Flex
                      as={Link}
                      role="button"
                      onClick={(e) => e.preventDefault()}
                      cursor={"not-allowed"}
                      title="prochainement"
                      alignItems={"center"}
                      p={"12px"}
                      color={"#ffffff"}
                      textDecor={"inherit"}
                      backgroundColor={"transparent"}
                      borderRadius={"4px"}
                      outline={"transparent solid 2px"}
                      outlineOffset={"2px"}
                      transitionDuration={".15s"}
                      transitionProperty={"background-color, color"}
                      transitionTimingFunction={"cubic-bezier(0, 0, 0.2, 1)"}
                      transform={"translateZ(0)"}
                      _hover={{
                        backgroundColor: "#242326",
                        color: "#ffffff",
                        textDecor: "none",
                      }}
                    >
                      <chakra.span flex={1}>
                        Gérer mes recommandations
                      </chakra.span>
                      <RightCarouselIcon
                        size="16px"
                        lineHeight={"1rem"}
                        flexShrink={0}
                        color="currentcolor"
                        verticalAlign={"middle"}
                        display={"block"}
                      />
                    </Flex>
                  </ListItem>
                  <ListItem p={"0 8px"} listStyleType={"none"} m={0}>
                    <Flex
                      as={Link}
                      role="button"
                      alignItems={"center"}
                      p={"12px"}
                      color={"#ffffff"}
                      textDecor={"inherit"}
                      backgroundColor={"transparent"}
                      borderRadius={"4px"}
                      outline={"transparent solid 2px"}
                      outlineOffset={"2px"}
                      transitionDuration={".15s"}
                      transitionProperty={"background-color, color"}
                      transitionTimingFunction={"cubic-bezier(0, 0, 0.2, 1)"}
                      transform={"translateZ(0)"}
                      cursor={"pointer"}
                      onClick={() => {
                        logout()
                        navigate("/login")
                      }}
                      _hover={{
                        backgroundColor: "#242326",
                        color: "#ffffff",
                        textDecor: "none",
                      }}
                    >
                      Déconnexion
                    </Flex>
                  </ListItem>
                </List>
              </Box>
              <Box
                pos={"absolute"}
                left={"343px"}
                top={"4px"}
                my={0}
                h={0}
                w={0}
                border={"6px solid #0000"}
                borderBottomColor={"#141216"}
                borderTopWidth={0}
              />
            </Box>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
