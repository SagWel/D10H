import { Box, Link } from "@chakra-ui/react"

/* Import component */
import { IconCard } from "./ScoreCard"

/* Import type */
import type { IOtherInstrument } from "../../types/instrument"

export interface IOtherInstrumentCardProps {
    instrument : IOtherInstrument
}

/* Card for each instrument in score data for Tools */
const OtherInstrumentCard: React.FC<IOtherInstrumentCardProps> = ({ instrument }) => {
    
    return (
        <Box as={Link} href={`/scores/${instrument.instrument.name}/${instrument.score_id}`}
        height={"fit-content"} width={"fit-content"}
        borderRadius={"full"} padding={"0.185rem"}
        _hover={{
            bg: "#29282D"
        }}>
            {IconCard(instrument.instrument.name)}
        </Box>
    )
}

export default OtherInstrumentCard