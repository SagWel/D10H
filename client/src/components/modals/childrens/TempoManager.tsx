import { FormControl, FormLabel, NumberInput, NumberInputField } from "@chakra-ui/react"
import { usePlayScoreDispatch, usePlayScoreStates } from "../../../hooks/usePlayScore"

export interface ITempoManagerProps {}

const TempoManager: React.FC<ITempoManagerProps> = () => {
    const { tempoPercent } = usePlayScoreStates()
    const { setTempoPercent } = usePlayScoreDispatch()

    const format = (val: number) => val + `%`
    const parse = (val: string) => val.replace(/^\%/, '')

    return (
        <FormControl display={'flex'} flexDir={'row'} gap={5} justifyContent={'center'} alignItems={'center'}>
            <FormLabel color={"#fdfcfe"} textAlign={"center"} 
            p={0} m={0}
            fontSize={"1.25rem"} fontWeight={"500"}>
                Pourcentage tempo :
            </FormLabel>
            <NumberInput aria-label="pourcentage du tempo"
            min={1} max={200} value={format(tempoPercent)}
            maxW={'80px'} 
            m={0} p={0}
            onChange={(v) => {
                const vNumber = Number(parse(v))
                if (vNumber > 200) {setTempoPercent(200)}
                else if (vNumber < 1) {setTempoPercent(1)}
                else {setTempoPercent(vNumber)}
                }}>
                <NumberInputField textAlign={'center'} verticalAlign={'middle'} m={0} p={0}/>
            </NumberInput>
        </FormControl>
    )
}

export default TempoManager