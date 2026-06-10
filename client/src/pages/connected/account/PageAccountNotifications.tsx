import { 
    Box, 
    Button,
    chakra, 
    Checkbox, 
    Container, 
    Flex, 
    Heading, 
    List, 
    ListItem, 
    Table, 
    Tbody, 
    Td, 
    Text,
    Thead,
    Tr,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useState } from "react"

import { UpChevronSoftIcon, DownChevronSoftIcon } from "../../../components/Svg"

export interface IPageAccountNotifictions {}

const PageAccountNotifications: React.FC<IPageAccountNotifictions> = () => {

    const [opacity, setOpacity] = useState<"0" | "1">("0")
    const [scale, setScale] = useState<"0" | "1">("0")

    const handleOnClick = () => {
        if (opacity === "0" && scale === "0") {
            setOpacity('1')
            setScale('1')
        } else {
            setOpacity('0')
            setScale('0')
        }
    }

    const disabled = true

    return(
        <>
            <chakra.nav
            display={"block"}
            pos={'relative'}
            pt={"24px"}
            borderBottom={"1px solid #141216"}
            boxShadow={"0 2px 6px -4px #19192229"} boxSizing="border-box">
                <Box
                pos={'relative'}
                py={0} px={'24px'} mx={'auto'}
                whiteSpace={"nowrap"}
                boxSizing="border-box">
                    <List listStyleImg={"initial"} listStylePos={'initial'} listStyleType={'none'}
                        m={0} p={0}>
                        <ListItem listStyleImg={"initial"} listStylePos={'initial'} listStyleType={'none'}
                            pos={'relative'}
                            display={"inline-block"}
                            m={0} p={0}
                            fontSize={"16px"}
                            color={"#a19fa4"}>
                            <Text as={Link} to={"/account"}
                                display={"block"}
                                pb={"16px"}
                                color={"#a19fa4"}
                                backgroundColor={'transparent'}
                                borderBottom={"2px solid transparent"}
                                outline={"0 none"}
                                fontSize={"16px"} fontFamily={"Inter,Arial,sans-serif"} fontWeight={"400"}
                                lineHeight={"24px"} textDecor={'none'} cursor={'pointer'}
                                transitionDuration={'.15s'} transitionProperty={"border-color, color"}
                                boxSizing="border-box"
                                _hover={{
                                    borderColor: '#a19fa4'
                                }}>
                                Mes informations
                            </Text>
                        </ListItem>
                        <ListItem listStyleImg={"initial"} listStylePos={'initial'} listStyleType={'none'}
                            pos={'relative'}
                            display={"inline-block"}
                            m={0} p={0} pl={"44px"}
                            fontSize={"16px"}
                            color={"#a19fa4"}>
                            <Text as={Link}
                                display={"block"}
                                pb={"16px"}
                                color={"white"}
                                backgroundColor={'transparent'}
                                borderBottom={"2px solid transparent"} borderColor={"#ad47ff"}
                                outline={"0 none"}
                                fontSize={"16px"} fontFamily={"Inter,Arial,sans-serif"} fontWeight={"600"}
                                lineHeight={"24px"} textDecor={'none'} cursor={'pointer'}
                                transitionDuration={'.15s'} transitionProperty={"border-color, color"}
                                boxSizing="border-box">
                                Préférences de notifications
                            </Text>
                        </ListItem>
                        <ListItem listStyleImg={"initial"} listStylePos={'initial'} listStyleType={'none'}
                            pos={'relative'}
                            display={"inline-block"}
                            m={0} p={0} pl={"44px"}
                            fontSize={"16px"}
                            color={"#a19fa4"}>
                            <Text as={Link} to={"/account/devices"} title="prochainement"
                                display={"block"}
                                pb={"16px"}
                                color={"#a19fa4"}
                                backgroundColor={'transparent'}
                                borderBottom={"2px solid transparent"}
                                outline={"0 none"}
                                fontSize={"16px"} fontFamily={"Inter,Arial,sans-serif"} fontWeight={"400"}
                                lineHeight={"24px"} textDecor={'none'} cursor={'pointer'}
                                transitionDuration={'.15s'} transitionProperty={"border-color, color"}
                                boxSizing="border-box"
                                sx={disabled ? {
                                    opacity: 0.5,
                                    cursor: 'not-allowed',
                                    textDecor: 'none',
                                    _hover : {
                                        borderColor: 'none'
                                    }
                                } : {}}
                                _hover={{
                                    borderColor: '#a19fa4'
                                }}>
                                Mes appareils connectés
                            </Text>
                        </ListItem>
                        <ListItem listStyleImg={"initial"} listStylePos={'initial'} listStyleType={'none'}
                            pos={'relative'}
                            display={"inline-block"}
                            m={0} p={0} pl={"44px"}
                            fontSize={"16px"}
                            color={"#a19fa4"}>
                            <Text as={Link} to={"/apps"} target="_blanket" title="prochainement"
                                display={"block"}
                                pb={"16px"}
                                color={"#a19fa4"}
                                backgroundColor={'transparent'}
                                borderBottom={"2px solid transparent"}
                                outline={"0 none"}
                                fontSize={"16px"} fontFamily={"Inter,Arial,sans-serif"} fontWeight={"400"}
                                lineHeight={"24px"} textDecor={'none'} cursor={'pointer'}
                                transitionDuration={'.15s'} transitionProperty={"border-color, color"}
                                boxSizing="border-box"
                                sx={disabled ? {
                                    opacity: 0.5,
                                    cursor: 'not-allowed',
                                    textDecor: 'none',
                                    _hover : {
                                        borderColor: 'none'
                                    }
                                } : {}}
                                _hover={{
                                    borderColor: '#a19fa4'
                                }}>
                                Mes Applications
                            </Text>
                        </ListItem>
                        <ListItem listStyleImg={"initial"} listStylePos={'initial'} listStyleType={'none'}
                            pos={'relative'}
                            display={"inline-block"}
                            m={0} p={0} pl={"44px"}
                            fontSize={"16px"}
                            color={"#a19fa4"}>
                            <Text as={Link} to={"/account/display"}
                                display={"block"}
                                pb={"16px"}
                                color={"#a19fa4"}
                                backgroundColor={'transparent'}
                                borderBottom={"2px solid transparent"}
                                outline={"0 none"}
                                fontSize={"16px"} fontFamily={"Inter,Arial,sans-serif"} fontWeight={"400"}
                                lineHeight={"24px"} textDecor={'none'} cursor={'pointer'}
                                transitionDuration={'.15s'} transitionProperty={"border-color, color"}
                                boxSizing="border-box"
                                _hover={{
                                    borderColor: '#a19fa4'
                                }}>
                                Paramètres d'affichage
                            </Text>
                        </ListItem>
                        <ListItem listStyleImg={"initial"} listStylePos={'initial'} listStyleType={'none'}
                            pos={'relative'}
                            display={"inline-block"}
                            m={0} p={0} pl={"44px"}
                            fontSize={"16px"}
                            color={"#a19fa4"}>
                            <Text as={Button} isDisabled
                                display={"flex"} align={'center'}
                                p={0} m={0}
                                color={"#a19fa4"}
                                background={'transparent'}
                                border={0} borderBottom={"2px solid transparent"}
                                outline={"0 none"}
                                fontSize={"16px"} fontFamily={"Inter,Arial,sans-serif"} fontWeight={"400"}
                                lineHeight={"normal"} textDecor={'none'} verticalAlign={"middle"} cursor={'pointer'} appearance={"none"}
                                transitionDuration={'.15s'} transitionProperty={"border-color, color"} overflow={'visible'}
                                boxSizing="border-box"
                                onClick={handleOnClick}
                                _hover={{
                                    bg: 'transparent',
                                    _disabled: {bg: 'transparent'}
                                }}>
                                Plus
                                {(scale === '1' && opacity === '1') ?
                                    <UpChevronSoftIcon lineHeight={'1em'} flexShrink={0} color="#a19fa4" verticalAlign={"middle"} display={'block'} marginInlineStart={"5px"} mt={'3px'} /> :
                                    <DownChevronSoftIcon lineHeight={'1em'} flexShrink={0} color="#a19fa4" verticalAlign={"middle"} display={'block'} marginInlineStart={"5px"} mt={'3px'} />
                                }
                            </Text>
                            <List listStyleImg={"initial"} listStylePos={'initial'} listStyleType={'none'}
                                pos={'absolute'} left={"auto"} right={0} top={'45px'} zIndex={'1001'}
                                m={0} p={0} mt={1}
                                minW={"100%"}
                                fontSize={"12px"}
                                textAlign={'left'} opacity={opacity}
                                bgColor={"#141216"}
                                borderRadius={'10px'}
                                float={'left'}
                                boxShadow={'0 4px 20px 0 #0000003d'}
                                transform={`scaleY(${scale})`} transformOrigin={'50% 0'}
                                transitionDuration={'.15s'} transitionProperty={'opacity, transform'}>
                                <ListItem role="group"
                                    listStyleImg={"initial"} listStylePos={'initial'} listStyleType={'none'}
                                    m={0} p={0}
                                    color={'#a19fa4'}>
                                    <Text as={Link} to={'/account/share'}
                                        display={'block'}
                                        p={'0 15px'}
                                        w={'100%'}
                                        fontSize={'16px'} fontFamily={'Inter,Arial,sans-serif'} fontWeight={'400'}
                                        lineHeight={'32px'} textAlign={'left'} textDecor={'none'} whiteSpace={'nowrap'} color={'#a19fa4'} cursor={'pointer'}
                                        bgColor={"#141216"}
                                        outline={'0 none'}
                                        transitionDuration={'.15s'} transitionProperty={'background-color, color'}
                                        _hover={{
                                            bg: "#242326",
                                            color: "white",
                                            textDecor: 'none'
                                        }}>
                                        Préférences de partage
                                    </Text>
                                </ListItem>
                                <ListItem role="group"
                                    listStyleImg={"initial"} listStylePos={'initial'} listStyleType={'none'}
                                    m={0} p={0}
                                    color={'#a19fa4'}>
                                    <Text as={Link} to={'/account/country_selector'}
                                        display={'block'}
                                        p={'0 15px'}
                                        w={'100%'}
                                        fontSize={'16px'} fontFamily={'Inter,Arial,sans-serif'} fontWeight={'400'}
                                        lineHeight={'32px'} textAlign={'left'} textDecor={'none'} whiteSpace={'nowrap'} color={'#a19fa4'} cursor={'pointer'}
                                        bgColor={"#141216"}
                                        outline={'0 none'}
                                        transitionDuration={'.15s'} transitionProperty={'background-color, color'}
                                        _hover={{
                                            bg: "#242326",
                                            color: "white",
                                            textDecor: 'none'
                                        }}>
                                        Sélection du pays
                                    </Text>
                                </ListItem>
                            </List>
                        </ListItem>
                    </List>
                </Box>
            </chakra.nav>
            <Flex align={'center'} justify={'center'}
            p={"1.5rem"}
            w={'full'} h={"95%"}>
                <Container
                p={"1.5rem"}
                maxW={'1024px'}
                bg={'#141216'}
                borderRadius={'0.5rem'} border={'1px solid #4e4c51'}>
                    <Box>
                        <Heading as={'h2'}
                        pt={'1.5rem'} m={0}
                        fontFamily={'"Deezer Product",Tahoma,Arial,sans-serif'} fontWeight={'700'} fontSize={'100%'}
                        lineHeight={'normal'}>
                            Partitions
                        </Heading>
                        <Table>
                           <Thead>
                                <Tr>
                                    <Td
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    w={'700px'}
                                    fontSize={'0.875rem'}
                                    textAlign={'start'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}
                                    />
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    w={'110px'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Text 
                                        display={'-webkit-box'}
                                        noOfLines={2}
                                        m={0}
                                        fontSize={'0.75rem'}
                                        textDecorationLine={'line-through'}
                                        overflow={'hidden'} textOverflow={'ellipsis'}>
                                            Notificagtions mobile
                                        </Text>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    w={'110px'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Text 
                                        display={'-webkit-box'}
                                        noOfLines={2}
                                        m={0}
                                        fontSize={'0.75rem'}
                                        overflow={'hidden'} textOverflow={'ellipsis'}>
                                            Emails
                                        </Text>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    w={'110px'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Text 
                                        display={'-webkit-box'}
                                        noOfLines={2}
                                        m={0}
                                        fontSize={'0.75rem'}
                                        textDecorationLine={'line-through'}
                                        overflow={'hidden'} textOverflow={'ellipsis'}>
                                            Messages texte
                                        </Text>
                                    </Td>
                                </Tr>
                           </Thead>
                           <Tbody>
                                <Tr>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'start'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Text fontWeight={'700'} fontSize={'1rem'} m={0}>
                                            Recommandation musicales
                                        </Text>
                                        <Text color={'#a19fa4'} fontSize={'0.75rem'} m={0}>
                                            Dernières découvertes de notre équipe
                                        </Text>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'start'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Text fontWeight={'700'} fontSize={'1rem'} m={0}>
                                            Artistes que j'aime
                                        </Text>
                                        <Text color={'#a19fa4'} fontSize={'0.75rem'} m={0}>
                                            Nouveautés & actualités des artistes que j'aime ou qui peuvent m'intéresser
                                        </Text>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'start'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Text fontWeight={'700'} fontSize={'1rem'} m={0}>
                                            Scorbraries que j'aime
                                        </Text>
                                        <Text color={'#a19fa4'} fontSize={'0.75rem'} m={0}>
                                            Mises à jour & nouvelles partitition des scorbraies que j'aime ou qui peuvent m'intéresser
                                        </Text>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'start'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Text fontWeight={'700'} fontSize={'1rem'} m={0}>
                                            Côté social
                                        </Text>
                                        <Text color={'#a19fa4'} fontSize={'0.75rem'} m={0}>
                                            Informations sur l'activité des utilisateurs que je suis
                                        </Text>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'start'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Text fontWeight={'700'} fontSize={'1rem'} m={0}>
                                            Mon répertoire
                                        </Text>
                                        <Text color={'#a19fa4'} fontSize={'0.75rem'} m={0}>
                                            Informations et statistiques sur les partitions que je joue, outils d'apprentissage exclusifs et fonctionnalités interactives liées à ma pratique musicale
                                        </Text>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                </Tr>
                           </Tbody>
                        </Table>
                    </Box>
                    <Box>
                         <Heading as={'h2'}
                        pt={'1.5rem'} m={0}
                        fontFamily={'"Deezer Product",Tahoma,Arial,sans-serif'} fontWeight={'700'} fontSize={'100%'}
                        lineHeight={'normal'}>
                            Extras
                        </Heading>
                        <Table>
                           <Thead>
                                <Tr>
                                    <Td
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    w={'700px'}
                                    fontSize={'0.875rem'}
                                    textAlign={'start'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}
                                    />
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    w={'110px'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Text 
                                        display={'-webkit-box'}
                                        noOfLines={2}
                                        m={0}
                                        fontSize={'0.75rem'}
                                        textDecorationLine={'line-through'}
                                        overflow={'hidden'} textOverflow={'ellipsis'}>
                                            Notificagtions mobile
                                        </Text>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    w={'110px'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Text 
                                        display={'-webkit-box'}
                                        noOfLines={2}
                                        m={0}
                                        fontSize={'0.75rem'}
                                        overflow={'hidden'} textOverflow={'ellipsis'}>
                                            Emails
                                        </Text>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    w={'110px'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Text 
                                        display={'-webkit-box'}
                                        noOfLines={2}
                                        m={0}
                                        fontSize={'0.75rem'}
                                        textDecorationLine={'line-through'}
                                        overflow={'hidden'} textOverflow={'ellipsis'}>
                                            Messages texte
                                        </Text>
                                    </Td>
                                </Tr>
                           </Thead>
                           <Tbody>
                                <Tr>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'start'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Text fontWeight={'700'} fontSize={'1rem'} m={0}>
                                            Actualités, offres et bons plans
                                        </Text>
                                        <Text color={'#a19fa4'} fontSize={'0.75rem'} m={0}>
                                            L'actualité D10h, nos conseils et nos offres
                                        </Text>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'start'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Text fontWeight={'700'} fontSize={'1rem'} m={0}>
                                            Nos conseils pour utiliser D10h
                                        </Text>
                                        <Text color={'#a19fa4'} fontSize={'0.75rem'} m={0}>
                                            Apprenez à tirer le meilleur parti de nos outils de lecture, découvrez nos fonctionnalités avancées d'annotation et rejoignez notre programme de testeurs pour façonner l'avenir de la plateforme.
                                        </Text>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'} pl={'0.125rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'start'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Text fontWeight={'700'} fontSize={'1rem'} m={0}>
                                            Mon opinion
                                        </Text>
                                        <Text color={'#a19fa4'} fontSize={'0.75rem'} m={0}>
                                            Partager mes suggestions pour améliorer l'expérience D10h
                                        </Text>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                    <Td 
                                    paddingInline={'1rem'} py={'0.5rem'}
                                    fontSize={'0.875rem'}
                                    textAlign={'center'}
                                    borderColor={'#38373b'} borderBottom={'1px solid #4e4c51'}>
                                        <Checkbox isDisabled
                                        pos={'relative'}
                                        display={'inline-flex'} alignItems={'center'}
                                        verticalAlign={'top'}
                                        cursor={'pointer'}
                                        sx={{
                                            '.chakra-checkbox__control': {
                                                transitionDuration: '200ms',
                                                transitionProperty: 'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform',
                                                color: '#ffff',
                                                w: '20px',
                                                h: '20px',
                                                transform: 'perspective(1000px) translateZ(0px)',
                                                border: '1px solid #4e4c51',
                                                borderRadius: '0.25rem',
                                                _checked: {
                                                    bg: '#ad47ff',
                                                    borderColor: '#ad47ff',
                                                    color: '#ffffff'
                                                },
                                                _disabled: {
                                                    bg: '#4e4c51',
                                                    border: 'none'
                                                }
                                            }
                                            
                                        }}/>
                                    </Td>
                                </Tr>
                           </Tbody>
                        </Table>
                    </Box>
                </Container>
            </Flex>
        </>
    )
}

export default PageAccountNotifications