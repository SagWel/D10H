import {Box, Flex, Heading, IconButton, List} from "@chakra-ui/react"
import { useState, useRef, useEffect } from "react"

/* Import SVG */
import { LeftCarouselIcon, RightCarouselIcon } from "./Svg"

/* Import type */
import type { IScore } from "../types/Score"
import { useAuth } from "../hooks/useAuth"
import ScoreCard from "./cards/ScoreCard"

export interface IScoreCarouselProps {
    data: IScore[],
    id: string,
    title: string
}

const ScoreCarousel: React.FC<IScoreCarouselProps> = ({ data, id, title }) => {

    const { user } = useAuth()    

    const filteredForChildData = data.filter((p: IScore) => {
        return p.song.isExplicit === false 
    })

    /* States for carousels moves*/
    const [translate, setTranslate] = useState<number>(0)
    const [maxScroll, setMaxScroll] = useState<number>(0)

    /* Ref */
    const carouselContainerRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

    /* Carousel side scrolling */
    const scroll = (direction: "left" | "right") => {        
        const currentContainerWidth = carouselContainerRef.current?.clientWidth || 0;        
        const currentScrollWidth = listRef.current?.scrollWidth || 0;        
        const currentMaxScroll = currentContainerWidth - currentScrollWidth

        setMaxScroll(currentMaxScroll);

        if(direction === "left") {
            const newTranslate = translate + currentContainerWidth
            setTranslate(Math.min(0, newTranslate))
        } else {            
            const newTranslate = translate - currentContainerWidth
            setTranslate(Math.max(currentMaxScroll, newTranslate))                
        }
    }

    const cursor = (direction: "left" | "right") => {
        if(direction === "left" && translate === 0 || direction === "right" && translate === maxScroll) {
            return "not-allowed"
        } else return "pointer"
    }

    useEffect(() => {
        if (carouselContainerRef.current && listRef.current) {            
            setMaxScroll(carouselContainerRef.current.clientWidth - listRef.current.scrollWidth);            
        }
    }, [data])

    return (
        <Box as="section" id={id}>
            <Box>
                <Box 
                p={"24px"} mx={"auto"}
                position={"relative"}
                boxSizing="border-box">
                    <Flex flexDir={"column"} justifyContent={"center"}
                    minH={"32px"}
                    position={"relative"}>
                        <Box>
                            <Heading as={"h2"}
                            m={0}
                            fontFamily={"Inter,Arial,sans-serif"} fontSize={"20px"} fontWeight={"700"} lineHeight={"24px"} textDecor={"none"}
                            color={"#ffffff"}>
                                {title}
                            </Heading>
                        </Box>
                        {data.length > 4 &&
                        <Box position={"absolute"} right={0} top={"50%"} transform={"translateY(-50%)"}>
                            <Flex display={"inline-flex"}
                            ps={"8px"}>
                                <IconButton type="button" aria-label="Précédent" isDisabled={translate === 0} cursor={cursor("left")}
                                display={"inline-flex"} alignItems={"center"} justifyContent={"center"} gap={"0,25rem"}
                                position={"relative"} whiteSpace={"nowrap"} verticalAlign={"middle"}
                                minH={"3rem"} minW={"3rem"} h={"auto"}
                                paddingInline={"1,5rem"} p={0} m={0}
                                fontSize={"16px"} fontWeight={"700"} lineHeight={"24px"} fontFamily={"Inter,Arial,sans-serif"}
                                textDecor={"none"} color={"#ffffff"}
                                bg={"transparent"}
                                borderRadius={"16rem"} border={0}
                                outline={"transparent solid 2px"} outlineOffset={0} appearance={"none"} userSelect={"none"} overflow={"visible"}
                                transitionDuration={"200ms"} transitionProperty={"background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"}
                                onClick={() => scroll("left")}
                                _disabled={{
                                    color: "#706e73"
                                }}
                                _hover={{
                                    bg: translate === 0 ? "transparent" : "#2e2c30"
                                }}
                                _active={{
                                    color: "#e2dfe6",
                                    bg: "#38373b"
                                }}
                                _focusVisible={{
                                    boxShadow: "none",
                                    outlineColor: "#ad47ff"
                                }}>
                                    <LeftCarouselIcon focusable={"false"} aria-hidden={"true"} w={"24px"} h={"24px"} lineHeight={"1rem"} flexShrink={0} verticalAlign={"middle"} display={"block"}/>
                                </IconButton>
                            </Flex>
                            <Flex display={"inline-flex"}
                            ps={"8px"}>
                                <IconButton type="button" aria-label="suivant" isDisabled={translate === maxScroll || data.length <= 4} cursor={cursor("right")}
                                display={"inline-flex"} alignItems={"center"} justifyContent={"center"} gap={"0,25rem"}
                                position={"relative"} whiteSpace={"nowrap"} verticalAlign={"middle"}
                                minH={"3rem"} minW={"3rem"} height={"auto"}
                                paddingInline={"1,5rem"} p={0} m={0}
                                fontFamily={"Inter,Arial,sans-serif"} fontSize={"16px"} fontWeight={"700"} lineHeight={"24px"}
                                textDecor={"none"} color={"#ffffff"}
                                bg={"transparent"}
                                borderRadius={"16rem"} border={0}
                                outline={"transparent solid 2px"} outlineOffset={0}
                                appearance={"none"} userSelect={"none"} overflow={"visible"}
                                transitionDuration={"200ms"} transitionProperty={"background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"}
                                onClick={() => {                                 
                                    scroll("right")}}
                                _disabled={{
                                    color: "#706e73"
                                }}
                                _hover={{
                                    bg: translate === maxScroll || data.length === 0 ? "transparent" : "#2e2c30"
                                }}
                                 _active={{
                                    color: "#e2dfe6",
                                    bg: "#38373b"
                                }}
                                _focusVisible={{
                                    boxShadow: "none",
                                    outlineColor: "#ad47ff"
                                }}>
                                    <RightCarouselIcon  focusable={"false"} aria-hidden={"true"} w={"24px"} h={"24px"} lineHeight={"1rem"} flexShrink={0} verticalAlign={"middle"} display={"block"}/>
                                </IconButton>
                            </Flex>
                        </Box>
                        }
                    </Flex>
                </Box>
                <Box 
                p={"24px"} pt={0} mx={"auto"}
                position={"relative"}
                boxSizing="border-box">
                    <Box m={"-2px"} overflow={"hidden"} p={"2px"} ref={carouselContainerRef}>
                        <Box 
                        transitionDuration={".6s"} transitionProperty={"transform"} transitionTimingFunction={"ease-in-out"}
                        style={{
                            transform: `translateX(${translate}px)`
                        }}>
                            <List as={Flex} ref={listRef}
                            flexWrap={"nowrap"} gap={"5rem"}
                            mt={"-24px"} m={0} p={0}
                            position={"relative"}
                            overflow={"visible"}
                            listStyleType={"none"}>
                                { (user?.isChildAccount ||  user?.filterExplicit) ? 
                                filteredForChildData.map(e => 
                                    <ScoreCard key={e.id} score={e} currentInstrument={e.instruments.currentInstrument.name} />
                                ) :
                                data.map(e => 
                                    <ScoreCard key={e.id} score={e} currentInstrument={e.instruments.currentInstrument.name} />
                                )
                                }
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ScoreCarousel