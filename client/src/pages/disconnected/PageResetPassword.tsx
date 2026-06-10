import { Box, Flex, Stack, chakra, Link, Heading, FormControl, FormLabel, Input, FormHelperText, Button} from "@chakra-ui/react"
import { LogoTempo } from "../../components/Svg"
import { useState } from "react"

export interface IPageResetPasswordProps {}

const PageResetPassword: React.FC<IPageResetPasswordProps> = () => {

    const [email, setEmail] = useState<string>('')

    return (
        <Stack alignItems={"center"} gap={"1.5rem"}
        minH={"100vh"} w={"100%"}
        pb={"3rem"}>
            <chakra.nav w={"100%"}>
                <Box display={"none"}
                alignItems={"center"}
                paddingInline={"0.5rem"}
                py={"1.5rem"}
                w={"100%"}
                borderBottom={0} borderBottomColor={"#38373b !important"}>
                    <Flex alignItems={"center"} w={"100%"}>
                        <Flex justifyContent={"left"}
                        marginInlineEnd={0} gap={8}
                        w={"100%"}>
                            <Link href="https://www.deezer.com/" target="_blanket"
                            color={"inherit"}
                            textDecor={"inherit"}>
                                <LogoTempo />
                            </Link>
                            <Link href="/"
                            fontSize={"1,125rem"} fontWeight={"600"}
                            color={"#fdfcfe"}
                            _hover={{textDecor: "none", color: "#a238ff"}}>
                            D10h
                            </Link>
                        </Flex>
                    </Flex>
                </Box>
                <Box display={"inherit"} alignItems={"center"}
                w={"100%"}
                paddingInline={"0.5rem"}
                py={"1.5rem"}
                borderBottom={0} borderColor={"#38373b !important"}>
                    <Flex alignItems={"center"} w={"100%"}>
                        <Flex justifyContent={"left"}
                        marginInlineEnd={0}
                        w={"100%"}>
                            <Link href="/"
                            color={"inherit"}
                            textDecor={"inherit"}>
                                <LogoTempo />
                            </Link>
                        </Flex>
                    </Flex>
                </Box>
            </chakra.nav>
            <Stack align={'center'} gap={'1rem'} flexGrow={1}
            h={'100%'} w={'100%'}>
                <Stack align={'center'} gap={'0.5rem'} flexGrow={1}
                pos={'relative'}
                w={'100%'}
                p={'1rem'}
                bg={'#000000'}>
                    <Stack align={'center'} gap={'0.5rem'}
                    px={'1rem'}
                    w={'100%'}
                    textAlign={'center'}>
                        <Heading as={'h1'}
                        fontWeight={"700"} fontSize={"1.875rem"}
                        maxW={"100ch"}
                        color={"#ffffff"}
                        lineHeight={"1.33"}>
                            Réinitialise ton mot de passe
                        </Heading>
                    </Stack>
                    <chakra.form w={'100%'} action={'#'}>
                        <Stack align={'center'} gap={'1rem'}
                        marginInline={'auto'}
                        maxW={'512px'} w={'100%'}>
                            <FormControl w={'100%'} pos={'relative'}>
                                <FormLabel htmlFor="email" display={'block'}
                                marginInlineEnd={'0.75rem'} mb={'0.5rem'}
                                fontWeight={'500'} fontSize={'0.875rem'}
                                textAlign={'start'} color={'#a19fa4'}
                                transitionDuration={'200ms'} transitionProperty={'background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform'}
                                opacity={1}>
                                    Email
                                </FormLabel>
                                <Input autoComplete="email" id="email" name="email" type="email" value={email}
                                position={"relative"}
                                paddingInlineStart={"1rem"} paddingInlineEnd={"0.75rem"}
                                w={"100%"} h={"3rem"} minW={"0"} minH={"3rem"}
                                fontSize={"16px"} fontWeight={"400"} fontFamily={"Inter,Arial,sans-serif"}
                                color={"#ffffff"} lineHeight={"24px"} textDecor={"none"}
                                bg={"#242326"}
                                borderRadius={"0.5rem"} borderColor={"transparent"} borderWidth={"0.125rem"} borderStyle={"solid"}
                                outline={"transparent solid 2px"} outlineOffset={"2px"}
                                transitionDuration={"200ms"} transitionProperty={"background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"}
                                appearance={"none"}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                _active={{
                                    borderColor: "#ad47ff"
                                }}
                                _focus={{
                                    borderColor: "#ad47ff"
                                }}
                                _hover={{
                                    bg: "#2e2c30",
                                    color: "#f5f2f8"
                                }}/>
                                <FormHelperText
                                mt={'0.75rem'}
                                fontSize={'0.875rem'}
                                lineHeight={'normal'} color={'#a19fa4'}>
                                    Entre ton adresse email pour recevoir un lien de réinitialisation de ton mot de passe.
                                </FormHelperText>
                            </FormControl>
                            <Button type="submit"
                            display={"inline-flex"} alignItems={'center'} justifyContent={'center'} gap={'0.25rem'}
                            position={'relative'} verticalAlign={'middle'}
                            px={'1.5rem'} py={'0.75rem'}
                            minH={'3rem'} minW={'3rem'} h={'auto'} w={'100%'}
                            fontSize={'16px'} fontWeight={'700'} fontFamily={'Inter,Arial,sans-serif'}
                            whiteSpace={'nowrap'} lineHeight={'24px'} textDecor={'none'} color={'#ffffff'}
                            bg={'#ad47ff'}
                            borderRadius={'0.75rem'}
                            outline={'transparent solid 2px'} outlineOffset={0}
                            transitionDuration={"200ms"} transitionProperty={"background-color,border-color,outline-color,color,fill,stroke,opacity,box-shadow,transform"}
                            appearance={'none'} userSelect={'none'}
                            _active={{
                                color: '#e2dfe6',
                                bg: '#ca97ff'
                            }}
                            _focusVisible={{
                                boxShadow: 'none',
                                outlineColor: '#f5f2f8'
                            }}
                            _hover={{
                                color: '#f5f2f8',
                                bg: '#bb73ff'
                            }}>
                                <span>Envoyer le lien</span>
                            </Button>
                        </Stack>
                    </chakra.form>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default PageResetPassword