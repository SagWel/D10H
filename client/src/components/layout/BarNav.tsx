import { 
    Flex, Box, Heading, IconButton, Image, Modal, ModalBody, ModalHeader, ModalCloseButton, ModalContent, 
    ModalOverlay, useDisclosure, Text, Input, FormControl, FormLabel, Switch, Link
 } from "@chakra-ui/react";

// SVGs import from a unique file
import { LogoIcon, HomeIcon, InstruIcon, HeartIcon, AddIcon, CollabIcon } from "../Svg";


export interface IBarNavProps {}

const BarNav: React.FC<IBarNavProps> = () => {

    /* Modal management */
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box id="sideleft"
        paddingBottom={"80px"}
        position={"fixed"}
        height={"100%"} w={"271px"}
        >

            {/*Navigation links box*/}
            <Flex id="navigation" 
            p={"1.5rem 0 1rem"} paddingTop={"1rem"}
            direction={"column"} justifyContent={"space-between"} 
            height={"14rem"} 
            borderBottomColor={"#3a393d"} borderBottomStyle={"solid"} borderBottomWidth={"0.0625rem"}>
                <Box id="Links" 
                p={"0 1rem 0px 1rem"} 
                color={"#fdfcfeff"}>
                    <Box id="D10H_!" 
                    paddingLeft={"105px"}
                    fontSize={"1,125rem"} fontWeight={"600"}>
                        <Link href={"/"}
                        _active={{
                            bg: '#2e2c30',
                            textDecor: 'none'
                        }}
                        _focusVisible={{
                            textDecor: 'underline'
                        }}
                        _hover={{
                            color: '#bb73ff',
                            textDecor: 'none'
                        }}>
                            D10H
                        </Link>
                    </Box>
                    <a id="Deezer_Link" href="https://www.deezer.com/">
                        <Box>
                            <LogoIcon />
                        </Box>
                    </a>
                    </Box>
                    <Flex id="Navigation_Links" 
                    paddingLeft={"0.5rem"} paddingRight={"0.5rem"} gap={"0.25rem"}
                    direction={"column"} justifyContent={"space-around"} 
                    height={"8rem"}>
                        <Link href={"/"}
                        _hover={{
                            textDecor: 'none'
                        }}>
                            <Flex id="Acceuil" 
                            gap={"0.5rem"} p={"0.5rem"} 
                            direction={"row"}
                            height={"52,5rem"} color={"#fdfcfeff"}
                            _hover={{
                                bg: "#29282D",
                                borderRadius: "0.5rem"
                            }}>
                                <HomeIcon />
                                <Heading fontSize={"1.125rem"} fontWeight={"700"}>Accueil</Heading>
                            </Flex>
                        </Link>
                        <Link href={"/instruments/user"}
                        _hover={{
                            textDecor: 'none'
                        }}>
                            <Flex 
                            gap={"0.5rem"} p={"0.5rem"}
                            direction={"row"}
                            height={"40px"} color={"#fdfcfeff"}
                            _hover={{
                                bg: "#29282D",
                                borderRadius: "0.5rem"
                            }}>
                                <InstruIcon />
                                <Heading fontSize={"1.125rem"} fontWeight={"700"}>Instruments</Heading>
                            </Flex>
                        </Link>
                        <Link href={"/Favoris"}
                        _hover={{
                            textDecor: 'none'
                        }}>
                            <Flex 
                            gap={"0.5rem"} p={"0.5rem"} 
                            direction={"row"}
                            height={"40px"} color={"#fdfcfeff"}
                            _hover={{
                                bg: "#29282D",
                                borderRadius: "0.5rem"
                            }}>
                                <HeartIcon />
                                <Heading fontSize={"1.125rem"} fontWeight={"700"}>Favoris</Heading>
                            </Flex>
                        </Link>
                    </Flex>
            </Flex>

            {/*List of the user's playlists, named "Scorbrary", of musical scores*/}
            <Box id="sidebar">
                <Box id="sidebar-visible">
                    <Flex id="scorbraries" 
                    padding={"0px 1rem 0px 16px"}
                    direction={"row"} justifyContent={"space-between"} alignItems={"center"} 
                    height={"40px"}>
                            <Link href={"/favoris/scorbraries"} onClick={(e) => e.preventDefault()} cursor={'not-allowed'} _hover={{textDecor:'none'}}>
                                <Heading fontSize={"1.125rem"} fontWeight={"700"} color={"#fdfcfeff"}>Scorbraries</Heading>
                            </Link>
                            <IconButton id="boutoun-new-scorbrary" aria-label="Ajouter un Scorbrary" isDisabled title="prochainement"
                            padding={"0"}
                            height={"2rem"} width={"2rem"} minWidth={"2rem"}
                            borderRadius={"full"}
                            icon={<AddIcon />}
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
                            onClick={onOpen}
                            >
                                
                            </IconButton>
                    </Flex>
                    <Flex id="scorbraries-list"
                    direction={"column"} padding={"0 1rem"}
                    fontFamily={"Inter, Arial, sans-serif"} fontSize={"16px"} fontWeight={"400"}
                    color={"#fdfcfeff"}>
                            <Text fontSize={'14px'} opacity={'0.6'}>
                                PROCHAINEMNT ...
                            </Text>
                    </Flex>
                </Box>
            </Box>

            {/*Scorbrary add modal*/} 
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay background={"rgba(0, 0, 0, 0.48)"}
                style={{
                    opacity: "1"
                }} />
                <ModalContent 
                maxW={"48rem"}
                paddingBottom={"1rem"} paddingTop={"0.25rem"}
                bg={"#000000"} borderRadius={"0.5rem"}
                boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px"}
                style={{
                    opacity: 1,
                    transform: "none"
                }}>
                    <ModalHeader display={"flex"}
                    justifyContent={"space-between"}
                    paddingInlineStart={"1rem"} paddingInlineEnd={"0.75rem"} padding={"1.5rem"}
                    fontSize={"18px"} fontWeight={"700"} lineHeight={"24px"} fontFamily={"Inter,Arial,sans-serif"}
                    borderBottom={"1px solid #38373b"}>
                        <Heading as={"h2"} 
                        fontFamily={"Inter,Arial,sans-serif"} fontWeight={"700"} fontSize={"20px"} lineHeight={"24px"} textDecoration={"none"} color={"#ffffff"}
                        margin={0}>
                            Créer ma scorbrary
                        </Heading>
                        <ModalCloseButton color={"#ffffff"} flexShrink={0}
                        position={"static"} 
                        w={"auto"} h={"auto"}
                        onClick={onClose}/>
                    </ModalHeader>
                    <ModalBody
                    width={"100%"}
                    paddingInline={"1.5rem"}
                    fontSize={"14px"} fontWeight={"400"} fontFamily={"Inter,Arial,sans-serif"} lineHeight={"20px"} textDecoration={"none"} textAlign={"left"}>
                        <Flex
                        flexDirection={"column"}>
                            <Box id="carousel-select"
                            position={"relative"}
                            width={"100%"} maxWidth={"100%"}
                            marginTop={"1.5rem"}>
                                {/*Carousel*/}
                                {/*<Flex>

                                </Flex>
                                <Flex>

                                </Flex>
                                <Flex>

                                </Flex>*/}
                            </Box>
                            <Box id="infos-scorbrary"
                            padding={"1.5rem"}>
                                <Flex flexDirection={"column"} gap={"1rem"} marginBottom={"1rem"}>
                                    <Flex id="name-input"
                                    flexDirection={"column"} gap={"0.25rem"} alignItems={"flex-start"}>
                                        <Text fontSize={"14px"} fontWeight={"400"} lineHeight={"20px"} fontFamily={"Inter,Arial,sans-serif"} role="heading" color={"whiteAlpha.900"}>
                                            Nom
                                        </Text>
                                        <Input aria-label="Nom de la Scorbrary" type="text"
                                        placeholder={"Nom de la Scrobrary"} maxLength={50}
                                        paddingStart={"1rem"} paddingInlineEnd={"0.75rem"}
                                        h={"2rem"} minH={0}
                                        bg={"#242326"}
                                        border={"transparent 0.125rem solid"} borderRadius={"0.5rem"}
                                        fontSize={"14px"} fontFamily={"Inter,Arial,sans-serif"} fontWeight={"400"} lineHeight={"20px"}
                                        _active={{
                                            borderColor: "#ad47ff"
                                        }}
                                        _focus={{
                                            borderColor: "#ad47ff"
                                        }}
                                        _hover={{
                                            background: "#2e2c30",
                                            color: "#f5f2f8"
                                        }}
                                        _placeholder={{
                                            color: "#706e73"
                                        }}/>
                                    </Flex>
                                    <FormControl display={"flex"} alignItems={"center"} position={"relative"} width={"100%"}>
                                        <FormLabel gap={"1rem"} display={"flex"} flex={"1 1 0%"}
                                        marginInlineEnd={"0.75rem"}
                                        fontWeight={"500"} fontSize={"0.875rem"} color={"#a19fa4"}>
                                            <Flex alignItems={"center"} justifyContent={"center"} width={"2rem"} h={"2rem"} borderRadius={"full"} background={"#242326"}>
                                                <CollabIcon />
                                            </Flex>
                                            <Flex alignItems={"center"} justifyContent={"space-between"} flex={"1 1 0%"}>
                                                <Flex direction={"column"}>
                                                    <Text
                                                    fontSize={"16px"} fontWeight={"400"} fontFamily={"Inter,Arial,sans-serif"} lineHeight={"24px"} color={"#ffffff"}>
                                                        Collaborative
                                                    </Text>
                                                    <Text as={"span"}
                                                    fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} fontFamily={"Inter,Arial,sans-serif"} color={"#a19fa4"}>
                                                        Tu peux inviter tes amis à ajouter des titres
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                            <Switch/>
                                        </FormLabel>
                                    </FormControl>
                                </Flex>
                                <Flex>

                                </Flex>
                            </Box>
                            <Flex id="Btns">

                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default BarNav
