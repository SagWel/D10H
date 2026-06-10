import { Link } from "react-router-dom";
import { Flex, Box, IconButton, Image, Text } from "@chakra-ui/react";

// SVGs import from a unique file
import { LogoMinIcon, HomeIcon, InstruIcon, HeartIcon, AddIcon } from "../Svg";

export interface IBarNavMinProps {}

const BarNavMin: React.FC<IBarNavMinProps> = () => {
    return (
        <Box id="sideleft"
        paddingBottom={"40px"}
        position={"fixed"}
        height={"100%"} width={"80px"}
        zIndex={"2"}
        >
            
            {/*Navigation links box*/}
            <Flex id="navigation" 
            p={"1.5rem 0 1rem"} paddingTop={"1rem"}
            direction={"column"} alignItems={"stretch"} gap={"1.5rem"}
            borderBottomColor={"#3a393d"} borderBottomStyle={"solid"} borderBottomWidth={"0.0625rem"}
            zIndex={"1"}>
                <Box id="Links" 
                p={"0 1rem 0 1rem"} 
                color={"#fdfcfeff"}
                textAlign={"center"}>
                    <Box id="D10H_!"
                    fontSize={"1,125rem"} fontWeight={"600"}>
                        <Link to={"/"}>D10H !</Link>
                    </Box>
                    <Flex as="a" id="Deezer_Link" href="https://www.deezer.com/"
                    justifyContent={"center"}
                    marginTop={"0.0625rem"}
                    height={"32px"}
                    textDecoration={"none"}>
                        <LogoMinIcon />                        
                    </Flex>
                    </Box>
                    <Flex id="NavigationLinks" 
                    paddingX={"0.5rem"}
                    direction={"column"} alignItems={"stretch"} gap={"0.25rem"}
                    height={"8rem"}>
                        <Flex as={Link} to={"/"} id="Acceuil"
                        alignItems={"center"} gap={"0.5rem"} justifyContent={"center"}
                        padding={"0.5rem"}
                        borderRadius={"0.5rem"}
                        textDecoration={"none"}
                        _hover={{
                                bg: "#29282D",
                                borderRadius: "0.5rem"
                            }}>
                            <HomeIcon />
                        </Flex>
                        <Flex as={Link} to={"/instruments/user"} id="Instuments"
                        alignItems={"center"} gap={"0.5rem"} justifyContent={"center"}
                        padding={"0.5rem"}
                        borderRadius={"0.5rem"}
                        textDecoration={"none"}
                        _hover={{
                                bg: "#29282D",
                                borderRadius: "0.5rem"
                            }}>
                                <InstruIcon />
                        </Flex>
                        <Flex as={Link} to={"/Favoris"} id="Favoris"
                        alignItems={"center"} gap={"0.5rem"} justifyContent={"center"}
                        padding={"0.5rem"}
                        borderRadius={"0.5rem"}
                        textDecoration={"none"}
                        _hover={{
                                bg: "#29282D",
                                borderRadius: "0.5rem"
                            }}>
                                <HeartIcon />
                        </Flex>
                    </Flex>
            </Flex>

            {/*List of the user's playlists, named "Scorbrary", of musical scores*/}
            <Box id="sidebar">
                <Box id="sidebar-visible">
                    <Flex id="scorbraries"
                    alignItems={"center"} justifyContent={"center"}
                    marginTop={"1rem"} marginBottom={"0.25rem"}
                    minHeight={"2.5rem"} width={"100%"}>
                            <IconButton id="boutoun-new-scorbrary" aria-label="Ajouter un Scorbrary" isDisabled title="prochainement"
                            display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                            userSelect={"none"}
                            minHeight={"2rem"} width={"2rem"} minWidth={"2rem"} height={"auto"}
                            padding={"0"}
                            borderRadius={"full"}
                            icon={
                                <AddIcon />
                            }
                            variant={"ghost"}
                            _hover={{
                                bg: "#3A393D",
                            }}
                            _active={{
                                bg: "#464549",
                            }}
                            _focusVisible={{
                                outlineColor: "#9A36F3",
                                boxShadow: "none",
                            }}
                            ></IconButton>
                    </Flex>
                    <Flex id="scorbraries-list"
                    direction={"column"} alignItems={"center"} gap={"0"}
                    paddingX={"0.5rem"}
                    width={"100%"}>
                            <Text fontSize={'14px'} opacity={'0.6'} title="prochainement">
                                ...
                            </Text>
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}

export default BarNavMin
