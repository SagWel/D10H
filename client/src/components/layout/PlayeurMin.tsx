import { Link } from "react-router-dom";
import { 
    Box, 
    Flex, 
    Button, 
    Text, 
    Image, 
    Popover, 
    PopoverContent, 
    PopoverArrow, 
    PopoverBody, 
    Slider, 
    SliderTrack, 
    SliderFilledTrack, 
    PopoverTrigger, 
    SliderThumb 
} from "@chakra-ui/react";

/* Import SVG */
import { HeartLoveOnIcon,
    AddIcon,
    BackIcon,
    PlayIcon,
    NextIcon,
    ChromcastIcon,
    VolumeIcon,
    AudioIcon,
    BreackIcon,
    VolumeOffIcon,
    RewindIcon,
    FFIcon
} from "../Svg";
import { usePlayScoreDispatch, usePlayScoreStates } from "../../hooks/usePlayScore";
import { useCallback, useRef, useState } from "react";
import { useScore } from "../../hooks/useScore";

import '../../style.css'

export interface IPlayeurMinProps {}

const PlayeurMin: React.FC<IPlayeurMinProps> = () => {
    const { setOnPlay, setBackToStart, setNextMeasure, setPreviousMeasure } = usePlayScoreDispatch()
    const { onPlay, tempoPercent, countdown } = usePlayScoreStates()
    const { score } = useScore()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const timeoutRef = useRef<number | null>(null)

    const [volume, setVolume] = useState<number>(50)
    const [MVolume, setMVolume] = useState<number>(volume)

    const [onPlayWithCountdown, setOnPlayWithCountdown] = useState<boolean>(false)

    const handleClickBack: () => void = useCallback(() => {
        setBackToStart(true)
        setTimeout(() => {            
            setBackToStart(false)
        }, 100)
    }, [setBackToStart])

    const handleClickPrevious: () => void = useCallback(() => {
        setPreviousMeasure(true)
        setTimeout(() => {
            setPreviousMeasure(false)
        }, 100)
    }, [setPreviousMeasure])

    const handleClickFF: () => void = useCallback(() => {
        setNextMeasure(true)
        setTimeout(() => {
            setNextMeasure(false)
        }, 100)
    }, [setNextMeasure])

    const handleClickNext: () => void = () => {}
    
    const handlePlay: () => void = useCallback(() => {
            setOnPlay(prev => !prev)
    }, [setOnPlay])

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
        minWidth={"768px"} height={"40px"}
        background={"#141216"}
        borderTop={"1px solid #4e4c51"} >
            <Flex id="info-piste"
            alignItems={"center"} width={"33%"} height={"100%"}>
                <Box id="cover" width={"2.5rem"}
                borderColor={"#3a393d"} borderStyle={"solid"} borderWidth={"0.0625rem"}>
                    <Image src={score?.song.album.cover_small} alt="Cover"/>
                </Box>
                <Box id="title"
                fontWeight={"400"} color={"#fdfcfe"} marginLeft={"0.5rem"}
                _hover={{
                    textDecoration: "underline"
                }}
                >
                    <Box as={Link} onClick={(e) => e.preventDefault()} cursor={'not-allowed'} title="prochainement"
                    to={""}
                    >
                        {score?.song.deezer_full_name}
                    </Box>
                </Box>
                <Flex id="add-buttons"
                direction={"row"} justifyContent={"center"} alignItems={"center"}
                marginLeft={"1rem"}>
                    <Button aria-label="Retirer des coups de coeur" disabled title="prochainement"
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
                        <Button aria-label="Open context menu" disabled title="prochainement"
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
            <Flex id="-center-control"
            justifyContent={"center"} alignItems={"center"}
            width={"33%"} gap={"1rem"} padding={"0 1rem"}>
                <Flex display={"inline-flex"} gap={"0.5rem"}>
                    <Button type="button" aria-label="Précédent"
                    display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                    padding={"0"}
                    minWidth={"2rem"} minHeight={"2rem"} height={"2rem"}
                    background={"transparent"}
                    borderRadius={"full"}
                    onClick={handleClickBack}
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
                    <Button type="button" aria-label="Précédent"
                    display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                    padding={"0"}
                    minWidth={"2rem"} minHeight={"2rem"} height={"2rem"}
                    background={"transparent"}
                    borderRadius={"full"}
                    onClick={handleClickPrevious}
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
                        <RewindIcon />
                    </Button>
                    <Button type="button" aria-label="Ecouter"
                    display={"inline-flex"} justifyContent={"center"} alignItems={"center"}
                    marginLeft={"0"} padding={"0"}
                    minHeight={"2rem"} height={"2rem"} minWidth={"2rem"}
                    background={"#a238ff"} borderRadius={"full"}
                    onClick={handlePlay}
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
                        {(onPlay || onPlayWithCountdown) ? <BreackIcon /> : <PlayIcon />}
                    </Button>
                    <Button type="button" aria-label="Précédent"
                    display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                    padding={"0"}
                    minWidth={"2rem"} minHeight={"2rem"} height={"2rem"}
                    background={"transparent"}
                    borderRadius={"full"}
                    onClick={handleClickFF}
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
                        <FFIcon />
                    </Button>
                    <Button type="button" aria-label="Suivant" disabled
                    display={"inline-flex"} alignItems={"center"} justifyContent={"center"}
                    padding={"0"}
                    minWidth={"2rem"} minHeight={"2rem"} height={"2rem"}
                    background={"transparent"}
                    borderRadius={"full"}
                    onClick={handleClickNext}
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
                </Flex>

                <Flex id="timline" 
                alignItems={"center"} justifyContent={"center"}
                paddingY={"0.125rem"}
                position={"relative"}>
                    <Box paddingRight={"0.5rem"}>
                        <Text fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#fdfcfe"}
                        margin={"0"}>
                            01:24
                        </Text>
                    </Box>
                    <Flex textAlign={"center"} minWidth={"24px"}>
                        <Text fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#fdfcfe"}
                        margin={"0"}>
                            -
                        </Text>
                        <Text fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#fdfcfe"}
                        margin={"0"}>
                            -
                        </Text><Text fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#fdfcfe"}
                        margin={"0"}>
                            -
                        </Text><Text fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#fdfcfe"}
                        margin={"0"}>
                            -
                        </Text><Text fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#fdfcfe"}
                        margin={"0"}>
                            -
                        </Text><Text fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#fdfcfe"}
                        margin={"0"}>
                            -
                        </Text><Text fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#fdfcfe"}
                        margin={"0"}>
                            -
                        </Text><Text fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#fdfcfe"}
                        margin={"0"}>
                            -
                        </Text><Text fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#fdfcfe"}
                        margin={"0"}>
                            -
                        </Text><Text fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#fdfcfe"}
                        margin={"0"}>
                            -
                        </Text>
                    </Flex>
                    <Box paddingLeft={"0.5rem"}
                    position={"relative"} right={"0"}>
                        <Text fontSize={"12px"} fontWeight={"400"} lineHeight={"16px"} color={"#fdfcfe"}
                        margin={"0"}>
                            06:07
                        </Text>
                    </Box>
                </Flex>
            </Flex>
            <Box id="other-control" display={"inline-flex"} justifyContent={"flex-end"} alignItems={"center"}
            width={"33%"}>
                <Button type="button" aria-label="Chromcast" disabled title="à venir"
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

export default PlayeurMin;
