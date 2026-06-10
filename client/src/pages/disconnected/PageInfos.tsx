import { Box, Link, Flex, Heading, Text, chakra, List, ListItem } from '@chakra-ui/react'
import { LogoTempo } from '../../components/Svg'
import useWindowWidth from '../../hooks/useWindowWidth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface IPageInfosProps {}

const PageInfos: React.FC<IPageInfosProps> = () => {
    const width = useWindowWidth()
    const navigate = useNavigate()
    
    const mobileBreackpoint = 768
    const desktopBreackpoint = 1160

    const paddingNavMin = width >= mobileBreackpoint ? '64px' : '16px'
    const responsiveSize = width >= mobileBreackpoint ? '24px' : '16px'

    const [bugerMenuContentDisplayed, setBurgerMenuContentDisplayed] = useState<boolean>(false)


    return (
        <>
            <chakra.nav
            display={"flex"} alignItems={"center"} justifyContent={"space-between"}
            position={"relative"}
            h={width >= mobileBreackpoint ? "80px" : '60px'} w={"100%"}
            paddingInline={'112px'} px={width >= desktopBreackpoint ? '112px' : paddingNavMin}
            bg={"#0F0D13"}
            borderBottom={width >= mobileBreackpoint ? '1px solid #555257' : undefined}
            boxSizing='border-box'>
                <Link href='/'
                flexGrow={0}
                textAlign={"center"} color={"#fdfcfe"} textDecor={"none"}
                w={'fit-content'}
                fontSize={"1,125rem"} fontWeight={"600"}
                outline={0}
                zIndex={"201"} cursor={"pointer"}
                _hover={{textDecor: "none"}}>
                    <LogoTempo />
                    &nbsp;D10H
                </Link>
                {width >= desktopBreackpoint && <Flex className='topbar-exposed-links' justify={'flex-end'} flexDir={"row"} flexGrow={1}
                ml={"112px"} mr={"calc(14px*2)"}>
                    <Link href='https://www.deezer.com/fr/offers/'
                    fontSize={"16px"} fontWeight={"700"}
                    color={"#fdfcfe"} textDecor={"none"}
                    cursor={"pointer"}
                    _active={{
                        color: "#a238ff"
                    }}
                    _focus={{
                        textDecor: "underlline"
                    }}
                    _focusVisible={{
                        textDecor: "underline"
                    }}
                    _hover={{
                        color: "#a238ff"
                    }}>
                        Offres
                    </Link>
                    <Link href='https://www.deezer.com/explore/fr/features/'
                    fontSize={"16px"} fontWeight={"700"}
                    color={"#fdfcfe"} textDecor={"none"}
                    cursor={"pointer"}
                    _active={{
                        color: "#a238ff"
                    }}
                    _focus={{
                        textDecor: "underlline"
                    }}
                    _focusVisible={{
                        textDecor: "underline"
                    }}
                    _hover={{
                        color: "#a238ff"
                    }}>
                        Découvrir Deezer
                    </Link>
                    <Link href='https://www.deezer.com/fr/channels/explore/'
                    fontSize={"16px"} fontWeight={"700"}
                    color={"#fdfcfe"} textDecor={"none"}
                    cursor={"pointer"}
                    _active={{
                        color: "#a238ff"
                    }}
                    _focus={{
                        textDecor: "underlline"
                    }}
                    _focusVisible={{
                        textDecor: "underline"
                    }}
                    _hover={{
                        color: "#a238ff"
                    }}>
                        Musique
                    </Link>
                </Flex>}
                <Flex
                flexDir={'row'} flexGrow={0} justifyContent={"flex-end"} alignItems={"center"}
                sx={{
                    "& > *:not(:last-child)": {
                        mr: width >= desktopBreackpoint ? '28px' : responsiveSize
                    }
                }}>
                    {width >= mobileBreackpoint && <Link id='topbar-login-button' href='/login'
                    display={"inline-flex"} alignItems={"center"} gap={"14px"} justifyContent={"space-evenly"}
                    position={"relative"} 
                    padding={"9px 20px"}
                    minH={"34px"} w={"fit-content"}
                    fontSize={"14px"} fontWeight={"700"}
                    color={"#fdfcfe"} textAlign={"center"} textDecor={"none"} 
                    textTransform={"none"} transitionDuration={".2s"} transitionProperty={"background-color, border-color, color, transform;"}
                    background={"transparent"}
                    borderRadius={"8px"} border={"1px solid #555257"}
                    outline={0}
                    appearance={"none"} boxSizing='border-box' cursor={"pointer"}
                    _active={{
                        transform: "scale(.95)"
                    }}
                    _focusVisible={{
                        outline: "0"
                    }}
                    _hover={{
                        bg: "#29282d"
                    }}>
                        Connexion
                    </Link>}
                    <Link id='topbar-register-button' href='/signup/?step=0'
                    display={"inline-flex"} alignItems={"center"} gap={"14px"} justifyContent={"space-evenly"}
                    position={"relative"}
                    padding={"9px 20px"}
                    minH={"34px"} w={"fit-content"}
                    fontSize={"14px"} fontWeight={"700"}
                    color={"#ffffff"} textAlign={"center"} textDecor={"none"}
                    textTransform={"none"} transitionDuration={".2s"} transitionProperty={"background-color, border-color, color, transform;"}
                    background={"#a238ff"}
                    borderRadius={"8px"} border={"1px solid transparent"}
                    outline={0}
                    appearance={"none"} boxSizing='border-box' cursor={"pointer"}
                    _active={{
                        transform: "scale(.95)"
                    }}
                    _focusVisible={{
                        outline: "0"
                    }}
                    _hover={{
                        bg: "#9333e8"
                    }}>
                        Inscription
                    </Link>
                    {width < mobileBreackpoint &&
                        <Box pos={'relative'} zIndex={'200'}>
                            <Box pos={'relative'} zIndex={'202'}
                            onClick={(e) => setBurgerMenuContentDisplayed(prev => !prev)}>
                                <chakra.span 
                                display={'block'}
                                mb={'8px'}
                                h={'3px'} w={'25px'}
                                bgColor={'#f8f8f9'}
                                transform={bugerMenuContentDisplayed ? 'translateY(10px) rotate(45deg)' : undefined}
                                transition={'all .2s ease-in-out'}/>
                                <chakra.span 
                                display={'block'}
                                mb={'8px'}
                                h={'3px'} w={'25px'}
                                bgColor={'#f8f8f9'}
                                opacity={bugerMenuContentDisplayed ? 0 : undefined}
                                transition={'all .2s ease-in-out'}/>
                                <chakra.span 
                                display={'block'}
                                h={'3px'} w={'25px'}
                                bgColor={'#f8f8f9'}
                                transform={bugerMenuContentDisplayed ? 'translateY(-12px) rotate(-45deg)' : undefined}
                                transition={'all .2s ease-in-out'}/>
                            </Box>
                            {bugerMenuContentDisplayed && 
                            <List 
                            display={'flex'} alignItems={'center'} flexDirection={'column'} justifyContent={''}
                            bgColor={'#0f0d13'}
                            left={0} pos={'fixed'} top={0}
                            h={'100%'} w={'100%'}
                            overflowY={'auto'}
                            pt={'89px'}>
                                <ListItem
                                mb={'28px'}>
                                    <Link href='/login'
                                    fontSize={'20px'} fontWeight={'600'} 
                                    color={'#fdfcfe'} textDecor={'none'}
                                    outline={'0 none'}
                                    cursor={'pointer'}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setBurgerMenuContentDisplayed(prev => !prev)
                                        setTimeout(() => {
                                            navigate('/login')
                                        },250)
                                    }}
                                    _focusVisible={{
                                        outline: '0'
                                    }}
                                    _hover={{
                                        textDecor: 'none'
                                    }}>
                                        Connexion
                                    </Link>
                                </ListItem>
                                <ListItem
                                mb={'28px'}>
                                    <Link href='/signup/?step=0'
                                    fontSize={'20px'} fontWeight={'600'} 
                                    color={'#fdfcfe'} textDecor={'none'}
                                    outline={'0 none'}
                                    cursor={'pointer'}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setBurgerMenuContentDisplayed(prev => !prev)
                                        setTimeout(() => {
                                            navigate('/signup/?step=0')
                                        },250)
                                    }}
                                    _focusVisible={{
                                        outline: '0'
                                    }}
                                    _hover={{
                                        textDecor: 'none'
                                    }}>
                                        Inscription
                                    </Link>
                                </ListItem>
                                <ListItem
                                mb={'28px'}>
                                    <Link href='https://www.deezer.com/fr/offers/'
                                    fontSize={'20px'} fontWeight={'600'} 
                                    color={'#fdfcfe'} textDecor={'none'}
                                    outline={'0 none'}
                                    cursor={'pointer'}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setBurgerMenuContentDisplayed(prev => !prev)
                                        setTimeout(() => {
                                            navigate('https://www.deezer.com/fr/offers/')
                                        },250)
                                    }}
                                    _focusVisible={{
                                        outline: '0'
                                    }}
                                    _hover={{
                                        textDecor: 'none'
                                    }}>
                                        Offres
                                    </Link>
                                </ListItem>
                                <ListItem
                                mb={'28px'}>
                                    <Link href="'https://www.deezer.com/fr/channels/explore"
                                    fontSize={'20px'} fontWeight={'600'} 
                                    color={'#fdfcfe'} textDecor={'none'}
                                    outline={'0 none'}
                                    cursor={'pointer'}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setBurgerMenuContentDisplayed(prev => !prev)
                                        setTimeout(() => {
                                            navigate('https://www.deezer.com/fr/channels/explore')
                                        },250)
                                    }}
                                    _focusVisible={{
                                        outline: '0'
                                    }}
                                    _hover={{
                                        textDecor: 'none'
                                    }}>
                                        Explorer tout notre univers
                                    </Link>
                                </ListItem>
                                <ListItem
                                mb={'28px'}>
                                    <Link href="https://www.deezer.com/explore/fr/features/"
                                    fontSize={'20px'} fontWeight={'600'} 
                                    color={'#fdfcfe'} textDecor={'none'}
                                    outline={'0 none'}
                                    cursor={'pointer'}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setBurgerMenuContentDisplayed(prev => !prev)
                                        setTimeout(() => {
                                            navigate('https://www.deezer.com/explore/fr/features/')
                                        },250)
                                    }}
                                    _focusVisible={{
                                        outline: '0'
                                    }}>
                                        Découvrir Deezer
                                    </Link>
                                </ListItem>
                            </List>}
                        </Box>}
                </Flex>
            </chakra.nav>
            <Box id='page-homepage-brand'
            display={"block"}>
                <Box as='section'
                display={"block"}
                pos={"relative"}
                paddingY={"calc(14px*10)"} paddingX={"calc(14px*2)"}
                color={"#0f0d13"}
                bg={"#fdfcfe"}
                boxSizing='border-box' overflow={"hidden"}>
                    <Box
                    display={'block'} alignItems={"center"} 
                    textAlign={"center"}>
                        <Heading as={"h1"} display={"block"}
                        maxW={"900px"}
                        marginBlock={"0.67em"} marginInline={0}
                        mx={"auto"} my={0}
                        fontSize={"120px"} fontWeight={"800"}
                        lineHeight={".9"} textTransform={"uppercase"}
                        sx={{textWrap: 'balance'}}>
                            Là où tu donnes vie à la Musique
                        </Heading>
                        <Text as={"p"} display={"block"}
                        marginBlock={"1em"} marginInline={0}
                        pb={"14px"} m={0} mt={1}
                        fontSize={"35px"} fontWeight={"700"}
                        color={"#0f0d13"}
                        lineHeight={"1.2"} textAlign={"center"}>
                            La lecture musicale par D10H
                        </Text>
                        <Text as={"p"} display={"block"}
                        marginBlock={"1em"} marginInline={0}
                        pb={"14px"} m={0}
                        fontSize={"24px"} fontWeight={"700"}
                        color={"#a238ff"}
                        lineHeight={"1.2"} textAlign={"center"}>
                            Une extension Deezer
                        </Text>
                        <Link href='/signup/?step=0'
                        display={"inline-flex"} alignItems={"center"} gap={"14px"} justifyContent={"space-evenly"}
                        position={"relative"}
                        p={"8px 32px"}
                        minH={"42px"}
                        fontSize={"16px"} fontWeight={"700"}
                        color={"#ffffff"} textAlign={"center"} textDecor={"none"}
                        textTransform={"none"} transitionDuration={".2s"} transitionProperty={"background-color, border-color, color, transform"}
                        bg={"#a238ff"}
                        borderRadius={"12px"} border={"1px solid transparent"}
                        outline={0}
                        appearance={"none"} boxSizing='border-box' cursor={"pointer"}
                        _active={{
                        transform: "scale(.95)"
                    }}
                    _focusVisible={{
                        outline: "0"
                    }}
                    _hover={{
                        bg: "#9333e8"
                    }}>
                            S'inscrire gratuitement
                        </Link>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default PageInfos