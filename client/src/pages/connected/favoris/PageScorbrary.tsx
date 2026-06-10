import { Box, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export interface IPageScorbaryProps {}

const Scorbrary: React.FC<IPageScorbaryProps> = () => {

    const { scorbraryId } = useParams();

    return (
        <Box id="main">
            <Box id="main-haeder">
                <Heading as={"h1"} color={"#fdfcfeff"} fontSize={"24px"} fontWeight={"900"}> { scorbraryId } </Heading>
            </Box>
        </Box>
    )
}

export default Scorbrary