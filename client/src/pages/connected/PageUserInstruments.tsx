import { Box, Grid, List, chakra, ListItem } from "@chakra-ui/react"
import { Link } from "react-router-dom";

import InstrumentCard from '../../components/cards/InstrumentCard'

/* Import hooks */
import { useAuth } from "../../hooks/useAuth";

export interface IUserInstrumentsProps {}


const UserInstruments: React.FC<IUserInstrumentsProps> = () => {

    /* take user from context by hook */
    const {user} = useAuth()

    return (
        <Box id="main" overflowY={"auto"} height={"100%"}>
            <Box id="header-container" marginBottom={"12px"} boxShadow={"0 2px 2px"}>
                <Box id="container" padding={"24px 24px 0"} marginX={"49px"}>
                    <chakra.nav boxShadow={"none"} marginBottom={"0"} width={"100%"}>
                        <Box padding={0} width={"100%"}>
                            <List listStyleType={"none"} margin={0} padding={0}>
                                <ListItem 
                                listStyleType={"none"} margin={0} padding={0} w={"50%"} textAlign={"center"}
                                color={"#a19fa4"} display={"inline-block"} position={"relative"}>
                                    <Box as={Link} to={"/instruments/user"} borderBottom={"#ad47ff solid 2px"} color={"#ffffff"}
                                    paddingBottom={"16px"}
                                    display={"block"}
                                    fontSize={"16px"} fontFamily={"Inter,Arial,sans-serif"} fontWeight={"600"}
                                    lineHeight={"24px"} textDecoration={"none"}>
                                        Mes instruments
                                    </Box>
                                </ListItem>
                                <ListItem 
                                listStyleType={"none"} margin={0} padding={0} w={"50%"} textAlign={"center"}
                                color={"#a19fa4"} display={"inline-block"} position={"relative"} paddingLeft={"44px"}>
                                    <Box as={Link} to={"/instruments/all"} borderBottom={"transparent 2px solid"} paddingBottom={"16px"} backgroundColor={"transparent"}
                                    display={"block"}
                                    fontSize={"16px"} fontFamily={"Inter,Arial,sans-serif"} fontWeight={"400"}
                                    lineHeight={"24px"} textDecoration={"none"}
                                    _hover={{
                                        borderColor: "#a19fa4"
                                    }}>
                                        Tous les instruments
                                    </Box>
                                </ListItem>
                            </List>
                        </Box>
                    </chakra.nav>
                </Box>
            </Box>
            <Grid
            marginTop={"3rem"} paddingBottom={"3rem"}
            justifyItems={"center"}

            /* Responsive logic */
            templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)"
            }} 
            columnGap={"3rem"} rowGap={"6rem"}
            px={"12"}>
                {user?.userInstruments.map((userInstrumentsLvl) => (
                    /* Creating a card for each of the user's instruments */                
                    <InstrumentCard key={userInstrumentsLvl.instrument.id} instrument={userInstrumentsLvl.instrument} />
                ))}
            </Grid>
        </Box>
    )
}

export default UserInstruments