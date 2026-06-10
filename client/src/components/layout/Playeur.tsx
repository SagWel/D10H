import { Link } from "react-router-dom";
import { 
    Box, 
    Flex, 
    Button, 
    Text, 
    Slider, 
    SliderTrack, 
    SliderFilledTrack, 
    SliderThumb, 
    Popover, 
    PopoverContent, 
    PopoverArrow, 
    PopoverBody,
    PopoverTrigger,
} from "@chakra-ui/react";

import { useState, useRef } from "react";

// Pictures import as modules
import Cover from '../../img/dont-stop-the-party.png';

// SVGs import from a unique file
import { HeartLoveOnIcon, AddIcon, ShuffleIcon, VolumeOffIcon, BackIcon, PlayIcon, NextIcon, LoopAllIcon, LyricsIcon, QueueListIcon, ChromcastIcon, VolumeIcon, AudioIcon } from "../Svg";

export interface IPlayeurProps {}

const Playeur: React.FC<IPlayeurProps> = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [volume, setVolume] = useState<number>(50)
    const [MVolume, setMVolume] = useState<number>(volume)

    const timeoutRef = useRef<number | null>(null)

    const handleOpen: () => void = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setIsOpen(true)
    }

    const handleClose: () => void = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false)
        }, 100)
    }

    const handleClickOnVolumeButton: () => void = () => {
        if (volume > 0) {
            setMVolume(volume)
            setVolume(0)
        } else {
            setVolume(MVolume)
        }
    }

    return (
        <Flex 
        alignItems={"center"} justifyContent={"space-between"}
        padding={"0 1rem"}
        minWidth={"768px"} height={"80px"}
        background={"#141216"}
        borderTop={"1px solid #4e4c51"} >

            {/*Current track information*/}
            <Flex id="info-piste"
            alignItems={"center"} width={"33%"}>
                <Box id="cover" height={"3rem"} width={"3rem"}
                borderColor={"#3a393d"} borderStyle={"solid"} borderWidth={"0.0625rem"} >
                    <img src={Cover} alt="Cover" />
                </Box>
                <Flex id="title-artist" direction={"column"} justifyContent={"center"} alignItems={"start"} color="#fdfcfe"
                marginLeft={"0.5rem"}>
                    <Box id="title"
                    fontWeight={"400"}
                    _hover={{
                        textDecoration: "underline"
                    }}
                    >
                        <Box as={Link} onClick={(e) => e.preventDefault()} cursor={'not-allowed'} title="prochainement"
                        to={"direction page album de la piste"}
                        >
                            Don't Stop The Party
                        </Box>
                    </Box>
                    <Box id="artist"
                    fontSize={"14px"}
                    _hover={{
                        textDecoration: "underline"
                    }}
                    >
                        <Box as={Link} onClick={(e) => e.preventDefault()} cursor={'not-allowed'} title="prochainement"
                        to={"direction page artiste"}
                        >
                            Black Eyed Peas
                        </Box>
                    </Box>
                </Flex>
                <Flex id="add-buttons" 
                direction={"row"} justifyContent={"center"} alignItems={"center"}
                marginLeft={"1rem"}>
                    <Button aria-label="Retirer des coups de coeur" isDisabled title="prochainement"
                    display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                    minHeight={"2rem"} minWidth={"2rem"} height={"2rem"} padding={"0"}
                    color={"#fdfcfe"} background={"transparent"}
                    borderRadius={"full"}
                    _active={{
                                background: "transparent",
                                color: "#bb73ff",
                        }}
                        _focus={{
                            zIndex: "1"
                        }}
                        _focusVisible={{
                            boxShadow: "none",
                            outlineColor: "#ad47ff"
                        }}
                        _hover={{
                            background: "#2e2c30",
                            color: "#f5f2f8"
                        }}
                    >
                        <HeartLoveOnIcon />
                    </Button>
                    <Box 
                    marginLeft={"0.25rem"}>
                        <Button aria-label="Open context menu" isDisabled title="prochainement"
                        display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                        padding={"0"}
                        minHeight={"2rem"} minWidth={"2rem"} height={"2rem"}
                        color={"#fdfcfe"} background={"transparent"}
                        borderRadius={"full"}
                        _active={{
                                background: "transparent",
                                color: "#bb73ff",
                        }}
                        _focus={{
                            zIndex: "1"
                        }}
                        _focusVisible={{
                            boxShadow: "none",
                            outlineColor: "#ad47ff"
                        }}
                        _hover={{
                            background: "#2e2c30",
                            color: "#f5f2f8"
                        }}
                        >
                            <AddIcon />
                        </Button>
                    </Box>
                </Flex>
            </Flex>

            {/*Current track management*/}
            <Flex id="-center-control"
            direction={"column"} width={"33%"} gap={"0.25rem"} padding={"0 1rem"}>

                {/*Current track controllers*/}
                <Flex justifyContent={"center"} alignItems={"center"}>
                    <Flex display={"inline-flex"} gap={"0.5rem"}>
                        <Button type="button" aria-label="activer le mode aléatoire" isDisabled title="prochainement"
                        display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                        padding={"0"}
                        minWidth={"2rem"} minHeight={"2rem"} height={"2rem"}
                        background={"transparent"}
                        borderRadius={"full"}
                        _active={{
                                background: "transparent",
                                color: "#bb73ff",
                        }}
                        _focus={{
                            zIndex: "1"
                        }}
                        _focusVisible={{
                            boxShadow: "none",
                            outlineColor: "#ad47ff"
                        }}
                        _hover={{
                            background: "#2e2c30",
                            color: "#f5f2f8"
                        }}
                        >
                            <ShuffleIcon />
                        </Button>
                        <Button type="button" aria-label="Précédent" isDisabled title="prochainement"
                        display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                        padding={"0"}
                        minWidth={"2rem"} minHeight={"2rem"} height={"2rem"}
                        background={"transparent"}
                        borderRadius={"full"}
                        _active={{
                                background: "transparent",
                                color: "#bb73ff",
                        }}
                        _focus={{
                            zIndex: "1"
                        }}
                        _focusVisible={{
                            boxShadow: "none",
                            outlineColor: "#ad47ff"
                        }}
                        _hover={{
                            background: "#2e2c30",
                            color: "#f5f2f8"
                        }}
                        >
                            <BackIcon />
                        </Button>
                        <Button type="button" aria-label="Ecouter" isDisabled title="prochainement"
                        display={"inline-flex"} justifyContent={"center"} alignItems={"center"}
                        marginLeft={"0"} padding={"0"}
                        minHeight={"2rem"} height={"2rem"} minWidth={"2rem"}
                        background={"#a238ff"} borderRadius={"full"}
                        _active={{
                            color: "#e2dfe6",
                            background: "#ca97ff"
                        }}
                        _focus={{
                            zIndex: "1"
                        }}
                        _focusVisible={{
                            boxShadow: "none",
                            outlineColor: "#f5f2f8"
                        }}
                        _hover={{
                            color: "#f5f2f8",
                            background: "#bb73ff"
                        }}
                        >
                            <PlayIcon />
                        </Button>
                        <Button type="button" aria-label="Suivant" isDisabled title="prochainement"
                        display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                        padding={"0"}
                        minWidth={"2rem"} minHeight={"2rem"} height={"2rem"}
                        background={"transparent"}
                        borderRadius={"full"}
                        _active={{
                                background: "transparent",
                                color: "#bb73ff",
                        }}
                        _focus={{
                            zIndex: "1"
                        }}
                        _focusVisible={{
                            boxShadow: "none",
                            outlineColor: "#ad47ff"
                        }}
                        _hover={{
                            background: "#2e2c30",
                            color: "#f5f2f8"
                        }}
                        >
                            <NextIcon />
                        </Button>
                        <Button type="button" aria-label="Réécouter tous les titres" isDisabled title="prochainement"
                        display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                        marginLeft={"0"} padding={"0"}
                        minHeight={"2rem"} height={"2rem"} minWidth={"2rem"}
                        background={"transparent"} borderRadius={"full"}
                        _active={{
                                background: "transparent",
                                color: "#bb73ff",
                        }}
                        _focus={{
                            zIndex: "1"
                        }}
                        _focusVisible={{
                            boxShadow: "none",
                            outlineColor: "#ad47ff"
                        }}
                        _hover={{
                            background: "#2e2c30",
                            color: "#f5f2f8"
                        }}
                        >
                            <LoopAllIcon />
                        </Button>
                    </Flex>
                </Flex>

                {/*Current track state*/}
                <Flex alignItems={"center"}
                paddingTop={"0.125rem"} paddingBottom={"0.125rem"}
                width={"100%"} position={"relative"}>
                    <Box paddingRight={"1rem"}>
                        <Text fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#fdfcfe"}
                        margin={"0"}>
                            01:24
                        </Text>
                    </Box>
                    <Slider flex={"1"} aria-label="Temps de lecture"
                    min={0} max={367.41333333333336} value={84.594652} step={1}>
                        <SliderTrack 
                        height={"4px"}
                        background={"#29282d"}
                        borderRadius={"4px"}>
                            <SliderFilledTrack background={"#a238ff"} />
                        </SliderTrack>
                        <SliderThumb display={"hidden"}></SliderThumb>
                    </Slider>
                    <Box paddingLeft={"1rem"}
                    position={"absolute"} right={"0"}>
                        <Text fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#fdfcfe"}
                        margin={"0"}>
                            06:07
                        </Text>
                    </Box>
                </Flex>
            </Flex>

            {/*General controllers*/}
            <Box id="other-control" display={"inline-flex"} justifyContent={"flex-end"} alignItems={"center"}
            width={"33%"}>
                <Button type="button" aria-label="Afficher les paroles" isDisabled title="prochainement"
                display={"inline-flex"} alignItems={"center"} justifyContent={"center"} verticalAlign={"middle"}
                padding={"0"}
                minWidth={"2rem"} minHeight={"2rem"} height={"2rem"} 
                color={"#fdfcfe"} background={"transparent"}
                borderRadius={"full"}
                _active={{
                                background: "transparent",
                                color: "#bb73ff",
                        }}
                        _focus={{
                            zIndex: "1"
                        }}
                        _focusVisible={{
                            boxShadow: "none",
                            outlineColor: "#ad47ff"
                        }}
                        _hover={{
                            background: "#2e2c30",
                            color: "#f5f2f8"
                        }}>
                    <LyricsIcon />
                </Button>
                <Button type="button" aria-label="Open queuelist" isDisabled title="prochainement"
                display={"inline-flex"} alignItems={"center"} justifyContent={"center"} verticalAlign={"middle"}
                padding={"0"} marginLeft={"0.25rem"}
                minWidth={"2rem"} minHeight={"2rem"} height={"2rem"} 
                color={"#fdfcfe"} background={"transparent"}
                borderRadius={"full"}
                _active={{
                                background: "transparent",
                                color: "#bb73ff",
                        }}
                        _focus={{
                            zIndex: "1"
                        }}
                        _focusVisible={{
                            boxShadow: "none",
                            outlineColor: "#ad47ff"
                        }}
                        _hover={{
                            background: "#2e2c30",
                            color: "#f5f2f8"
                        }}>
                    <QueueListIcon />
                </Button>
                <Button type="button" aria-label="Chromcast" isDisabled title="prochainement"
                display={"inline-flex"} alignItems={"center"} justifyContent={"center"} verticalAlign={"middle"}
                padding={"0"} marginLeft={"0.25rem"}
                minWidth={"2rem"} minHeight={"2rem"} height={"2rem"} 
                color={"#fdfcfe"} background={"transparent"}
                borderRadius={"full"}
                _active={{
                                background: "transparent",
                                color: "#bb73ff",
                        }}
                        _focus={{
                            zIndex: "1"
                        }}
                        _focusVisible={{
                            boxShadow: "none",
                            outlineColor: "#ad47ff"
                        }}
                        _hover={{
                            background: "#2e2c30",
                            color: "#f5f2f8"
                        }}>
                    <ChromcastIcon />
                </Button>
                <Popover isOpen={isOpen}>
                    <PopoverTrigger>
                        <Button type="button" aria-label="Volume button"
                        display={"inline-flex"} alignItems={"center"} justifyContent={"center"} verticalAlign={"middle"}
                        padding={"0"} marginLeft={"0.25rem"}
                        minWidth={"2rem"} minHeight={"2rem"} height={"2rem"} 
                        color={"#fdfcfe"} background={"transparent"}
                        borderRadius={"full"}
                        onClick={handleClickOnVolumeButton}
                        onMouseEnter={handleOpen}
                        onMouseLeave={handleClose}
                        // onMouseLeave={onClose}
                        _active={{
                                        background: "transparent",
                                        color: "#bb73ff",
                                }}
                                _focus={{
                                    zIndex: "1"
                                }}
                                _focusVisible={{
                                    boxShadow: "none",
                                    outlineColor: "#ad47ff"
                                }}
                                _hover={{
                                    background: "#2e2c30",
                                    color: "#f5f2f8"
                                }}>
                            {volume > 0 ? <VolumeIcon /> : <VolumeOffIcon />}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                    display={'flex'} flexDir={'column'}
                    pos={'relative'}
                    w={'240px'}
                    bg={'#141216'}
                    border={0} borderRadius={'0.5rem'}
                    boxShadow={'rgba(0, 0, 0, 0.4) 0px 0px 25px 10px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px'}
                    onMouseEnter={handleOpen}
                    onMouseLeave={handleClose}
                    _focusVisible={{
                        boxShadow: 'rgba(0, 0, 0, 0.4) 0px 0px 25px 10px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;',
                        outline: 'solid 2px #ad47ff',
                        outlineOffset: '0px'
                    }}>
                        <PopoverArrow color={'#141216'} bg={'#141216'} shadow={'none'}/>
                        <PopoverBody
                        paddingInline={'1rem'} py={'14px'}>
                            <Slider value={volume}
                            pos={'relative'}
                            display={'flex'} alignItems={'center'}
                            py={'0.125rem'}
                            h={'auto'} w={'100%'}
                            onChange={(e) => setVolume(e)}>
                                <SliderTrack flex={1} h={'2px'} pos={'relative'} bg={'#242326'}>
                                <SliderFilledTrack bg={'#ad47ff'}/>
                                </SliderTrack>
                                <SliderThumb boxSize={2.5}/>
                            </Slider>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                <Button type="button" aria-label="Audio" isDisabled title="prochainement"
                display={"inline-flex"} alignItems={"center"} justifyContent={"center"} verticalAlign={"middle"}
                padding={"0"} marginLeft={"0.25rem"}
                minWidth={"2rem"} minHeight={"2rem"} height={"2rem"} 
                color={"#fdfcfe"} background={"transparent"}
                borderRadius={"full"}
                _active={{
                                background: "transparent",
                                color: "#bb73ff",
                        }}
                        _focus={{
                            zIndex: "1"
                        }}
                        _focusVisible={{
                            boxShadow: "none",
                            outlineColor: "#ad47ff"
                        }}
                        _hover={{
                            background: "#2e2c30",
                            color: "#f5f2f8"
                        }}>
                    <AudioIcon />
                </Button>
            </Box>

        </Flex>
    )
}

export default Playeur;
