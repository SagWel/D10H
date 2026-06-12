import { FormControl, FormLabel, Stack, Flex, chakra, Text, Button, Heading, Select } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"
import { useState } from "react"

import { useAuth } from "../hooks/useAuth"

import type { IInstrument, IInstrumentLvl } from "../types/instrument"

import { DisableIcon, RemoveIcon, AddIcon, AddCircleIcon, CloseButtonIcon } from "./Svg"

import { difficultyLvl } from "./cards/ScoreCard"

export interface IUserInstrumentManagementProps {
    data: IInstrumentLvl[] | undefined,
    setData: React.Dispatch<React.SetStateAction<IInstrumentLvl[] | undefined>>,
    instruments: IInstrument[]
}

const UserInstrumentManagement: React.FC<IUserInstrumentManagementProps> = ({ data, setData, instruments }) => {
    const {user} = useAuth()

    const location = useLocation()
    const pathSegment = location.pathname.split('/').filter(segment => segment.length > 0);
    const onPageAccount = (pathSegment[0] === 'account' && pathSegment.length === 1)

    const [isOpenAddInstrument, setIsOpenAddInstrument] = useState<boolean>(false)
    const [currentInstrument, setCurrentInstrument] = useState<IInstrument | undefined>(undefined)
    const [currentLvl, setCurrentLvl] = useState<1 | 2 | 3| 4 | 5 | undefined>(undefined)

    /* Delete instrument in list */
    const deleteInstrument: (id: number) => void = (id) => {
        setData(prevItems => prevItems.filter((_, i) => i !== id))
    }

    const handleReduceLvl: (ui: IInstrumentLvl) => any = (ui) => {
        const updateData = data?.flatMap((userI: IInstrumentLvl) => {
            if (userI.instrument.id === ui.instrument.id) {
                if (userI.lvl === 1 && data.length > 1 && confirm("Vous allez supprimer l'instrument de votre liste. Est ce bien ce que vous voulez faire ?")) {
                    return []
                } else if (userI.lvl > 1) {
                    return [{ ...userI, lvl: userI.lvl - 1}]
                }
            }

            return [userI]
        })

        setData(updateData)
    }

    const handleIncreaseLvl: (ui: IInstrumentLvl) => any = (ui) => {
        const updateData = data?.flatMap((userI: IInstrumentLvl) => {
                if (userI.instrument.id === ui.instrument.id) {
                if (userI.lvl === 5) {
                    return [userI]
                }

                return [{ ...userI, lvl: userI.lvl + 1}]
                }

                return [userI]
        })

        setData(updateData)
    }

    /* Add instrument in list */
    const handleOnClickAddInstrument = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (currentInstrument && currentLvl) {
            const currentUserInstrument: IInstrumentLvl = {
                instrument: currentInstrument,
                lvl: currentLvl
            }
            setCurrentInstrument(undefined)            
            setCurrentLvl(undefined)
            
            setData(prevInstrumentLvl => [...prevInstrumentLvl, currentUserInstrument])
            setIsOpenAddInstrument(false)
        }
    }
    
    return (
        <FormControl w={'100%'}>
            <FormLabel display={"block"}
            marginInlineEnd={"0.75rem"}
            mb={"0.5rem"}
            fontWeight={"500"} fontSize={"0.875rem"}
            color={"#a19fa4"}
            textAlign={"start"}
            opacity={1}
            transitionDuration={"200ms"} transitionProperty={"background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"}>
                {onPageAccount ? "Mes instruments" : "Instrument(s) joué(s)"}
            </FormLabel>
            <Stack alignItems={"center"} gap={"1rem"}
            position={"relative"}
            paddingInlineStart={"1rem"} paddingInlineEnd={"0.75rem"} py={"0.75rem"}
            w={"100%"} h={"fit-content"} minW={"0"} minH={"3rem"}
            fontSize={"16px"} fontWeight={"400"} fontFamily={"Inter,Arial,sans-serif"}
            color={"#ffffff"} lineHeight={"24px"} textDecor={"none"}
            bg={"#242326"}
            borderRadius={"0.5rem"} borderColor={"transparent"} borderWidth={"0.125rem"} borderStyle={"solid"}
            outline={"transparent solid 2px"} outlineOffset={"2px"}
            transitionDuration={"200ms"} transitionProperty={"background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"}
            appearance={"none"}>
                {isOpenAddInstrument ? 
                (<>
                    <Flex justify={'center'}
                    paddingInlineStart={"1rem"} paddingInlineEnd={"0.75rem"} padding={"0.75rem"}
                    w={'100%'}
                    borderBottom={"1px solid #38373b"} textAlign={'center'}
                    margin={0}>
                        <Heading
                            fontWeight={"700"} lineHeight={"24px"} fontFamily={"Inter,Arial,sans-serif"}
                            textDecoration={"none"} color={"#ffffff"} size={'m'}>
                            Ajouter un instrument
                        </Heading>
                        <CloseButtonIcon color="#ffffff" flexShrink={0} aria-label="fermer"
                        pos={"absolute"} top={0} right={0}
                        mt={'3px'} mr={'3px'}
                        size="24px" onClick={() => setIsOpenAddInstrument(false)} />
                    </Flex>
                    <Stack gap={'1rem'} w={'100%'}>
                        <Flex>
                            <Select name="instrument" id="identity" value={currentInstrument?.id ?? ""} placeholder="Selectionner instrument" required
                            pos={"relative"} textTransform={"capitalize"}
                            pb={"1px"} mr={'1px'}
                            w={"50%"} h={"3rem"} minW={0} minH={"3rem"}
                            fontSize={"16px"} fontWeight={"400"} fontFamily={"Inter,Arial,sans-serif"}
                            lineHeight={"24px"} color={"#ffffff"} textDecor={"none"}
                            bg={"#4d4c50"}
                            borderRadius={"0.5rem"} border={"transparent solid 0.125rem"}
                            outline={"transparent solid 2px"} outlineOffset={"none"}
                            transitionDuration={"200ms"} transitionProperty={"background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"}
                            appearance={"none"}
                            onChange={(e) => setCurrentInstrument(instruments.find((i) => i.id == Number(e.target.value)))}
                            sx={{
                                paddingInlineStart: "1rem",
                                paddingInlineEnd: "2rem",
                                "> option": { bg: "#4e4c51" }
                            }}
                            _placeholder={{ color: "#5D6E73" }}
                            _active={{
                                borderColor: "#ad47ff"
                            }}
                            _focus={{
                                borderColor: "#ad47ff"
                            }}
                            _hover={{
                                bg: "#5e5d5f",
                                color: "#f5f2f8"
                            }}>
                                {Array.isArray(instruments) &&
                                    instruments.filter(i => !data?.some(ui => ui.instrument.id === i.id)).map((i, index) => (
                                        <chakra.option textTransform={"capitalize"} value={i.id} key={index}>{i.name}</chakra.option>
                                    )
                                    )}
                            </Select>
                            <Select name="lvl" id="lvl" value={currentLvl ?? ""} placeholder="Niveau exercé" required
                            pos={"relative"}
                            pb={"1px"}
                            w={"50%"} h={"3rem"} minW={0} minH={"3rem"}
                            fontSize={"16px"} fontWeight={"400"} fontFamily={"Inter,Arial,sans-serif"}
                            lineHeight={"24px"} color={"#ffffff"} textDecor={"none"}
                            bg={"#4d4c50"}
                            borderRadius={"0.5rem"} border={"transparent solid 0.125rem"}
                            outline={"transparent solid 2px"} outlineOffset={"none"}
                            transitionDuration={"200ms"} transitionProperty={"background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"}
                            appearance={"none"}
                            onChange={(e) => setCurrentLvl((Number(e.target.value) as 1 | 2 | 3 | 4 | 5))}
                            sx={{
                                paddingInlineStart: "1rem",
                                paddingInlineEnd: "2rem",
                                "> option": { bg: "#4e4c51" }
                            }}
                            _placeholder={{ color: "#5D6E73" }}
                            _active={{
                                borderColor: "#ad47ff"
                            }}
                            _focus={{
                                borderColor: "#ad47ff"
                            }}
                            _hover={{
                                bg: "#5e5d5f",
                                color: "#f5f2f8"
                            }}>
                                <option value={1}>Niveau 1 (Débutant)</option>
                                <option value={2}>Niveau 2</option>
                                <option value={3}>Niveau 3 (Intermédiaire)</option>
                                <option value={4}>Niveau 4</option>
                                <option value={5}>Niveau 5 (Expert)</option>
                            </Select>
                        </Flex>
                        <Flex justifyContent={"center"} alignItems={"center"}>
                            <Button px={"4rem"} bg={"#4d4c50"} color={"#ffffff"}
                                onClick={handleOnClickAddInstrument}
                                isDisabled={!currentInstrument || !currentLvl}
                                _focusVisible={{
                                    boxShadow: "0 0 0 3px #ad47ff"
                                }}
                                _active={{
                                    borderColor: "#ad47ff"
                                }}
                                _focus={{
                                    borderColor: "#ad47ff"
                                }}
                                _hover={{
                                    bg: "#5e5d5f",
                                    color: "#f5f2f8"
                                }}>
                                Ajouter
                            </Button>
                        </Flex>
                    </Stack>
                </>) :
                (<>
                    {data?.map((ui: IInstrumentLvl, index) => (
                        <Flex key={index} w={"100%"} bg={"#4d4c50"} justifyContent={"space-between"} alignItems={"center"} ps={"1rem"} borderRadius={"0.375rem"}>
                            <Flex w={"100%"} alignItems={"center"} justifyContent={"space-between"} minH={'2rem'}>
                                <Flex w={"50%"} justifyContent={"space-between"}>
                                    <Text fontSize={"20px"}>{ui.instrument.name.toUpperCase()}</Text>
                                    <Text fontSize={"24px"}>{"==>"}</Text>
                                </Flex>
                                <Flex flexDir={"row"} justifyContent={"center"} w={"50%"} alignItems={"center"} pos={'relative'}>
                                    {difficultyLvl(ui.lvl)}
                                    {(onPageAccount && user?.userInstruments.some(userI => userI.instrument === ui.instrument)) &&
                                        <Flex position={'absolute'} right={0} gap={1} mr={1}>
                                            <Button isDisabled={data.length === 1 && ui.lvl === 1}
                                            p={0}
                                            h={'1.75rem'} w={'1.75rem'} minH={'1.75rem'} minW={'1.75rem'}
                                            bg={'transparent'}
                                            borderRadius={'full'}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleReduceLvl(ui)
                                            }}
                                            _hover={{
                                                bg: '#a19fa4'
                                            }}>
                                                <RemoveIcon aria-label="supprimer"/>
                                            </Button>
                                            <Button isDisabled={ui.lvl === 5}
                                                p={0}
                                                h={'1.75rem'} w={'1.75rem'} minH={'1.75rem'} minW={'1.75rem'}
                                                bg={'transparent'}
                                                borderRadius={'full'}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleIncreaseLvl(ui)
                                                }}
                                                _hover={{
                                                    bg: '#a19fa4'
                                                }}>
                                                <AddIcon size="20px" aria-label="ajouter" />
                                            </Button>
                                        </Flex>
                                    }
                                </Flex>
                                {(onPageAccount && data.length > 1 && !user?.userInstruments.some(userI => userI.instrument === ui.instrument)) &&
                                    <Button
                                    bg={"transparent"} p={0} pos={'absolute'} right={0} mr={3} minH={'2rem'} h={'2rem'} minW={'2rem'} w={'2rem'}
                                    onClick={() => deleteInstrument(index)}
                                    _hover={{
                                        bg: "#434344"
                                    }}
                                    _active={{
                                        borderColor: "#ad47ff",
                                        bg: "#434344"
                                    }}
                                    _focus={{
                                        borderColor: "#ad47ff"
                                    }}
                                    _focusVisible={{
                                        boxShadow: "0 0 0 3px #ad47ff"
                                    }}>
                                        <DisableIcon aria-label="supprimer" />
                                    </Button>
                                }
                            </Flex>
                            {!onPageAccount && 
                                <Button 
                                bg={"transparent"} p={0}
                                onClick={() => deleteInstrument(index)}
                                _hover={{
                                    bg: "#434344"
                                }}
                                _active={{
                                    borderColor: "#ad47ff",
                                    bg: "#434344"
                                }}
                                _focus={{
                                    borderColor: "#ad47ff"
                                }}
                                _focusVisible={{
                                    boxShadow: "0 0 0 3px #ad47ff"
                                }}>
                                    <DisableIcon aria-label="supprimer" />
                                </Button>
                            }
                        </Flex>
                    ))}
                    <Flex as={Button} w={"100%"} bg={"#4d4c50"} justifyContent={"center"} alignItems={"center"}
                        onClick={() => setIsOpenAddInstrument(true)}
                        _hover={{
                            bg: "#434344"
                        }}
                        _active={{
                            borderColor: "#ad47ff",
                            bg: "#434344"
                        }}
                        _focus={{
                            borderColor: "#ad47ff"
                        }}
                        _focusVisible={{
                            boxShadow: "0 0 0 3px #ad47ff"
                        }}>
                        <AddCircleIcon aria-label="ajouter" />
                    </Flex>
                </>)
                }
            </Stack>
        </FormControl>
    )
}

export default UserInstrumentManagement