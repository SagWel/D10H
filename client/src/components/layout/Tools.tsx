import { Flex } from "@chakra-ui/react";

// SVGs import from a unique file
import { 
    TunnerIcon, 
    CountdownIcon, 
    MetronomeIcon, 
    TempoIcon, 
    LearningModeIcon,
    LooperIcon,
    SoloIcon,
    MuteIcon, 
    AnnotationsIcon, 
    ImpressionIcon, 
    ChordsIcon
} from "../Svg";

/* Import hook */
import { useScore } from "../../hooks/useScore";
import { useModals } from "../../hooks/useModals";

/* Import conponent */
import OtherInstrumentCard from "../cards/OtherInstrumentCard";

/* Import type */
import type { IOtherInstrument } from "../../types/instrument";
import { useCallback, useMemo, type JSX } from "react";
import ToolButton from "../buttons/ToolButton";
import { usePlayScoreDispatch, usePlayScoreStates } from "../../hooks/usePlayScore";

export interface IToolsProps {}

export type ToolType = {
    name: string,
    content: JSX.Element,
    handleOnClick: () => void
}

const Tools: React.FC<IToolsProps> = () => {

    /* Score data from context by hook */
    const { score } = useScore()

    const { 
        setCountdown, 
        setMetronome,
        setSolo,
        setMute
    } = usePlayScoreDispatch()

    const { onOpen } = useModals()
    
    const {
        countdown, 
        metronome, 
        solo, 
        tempoPercent, 
        learningMode,
        looper,
        mute,
     } = usePlayScoreStates()

    const handleTunner: () => void = useCallback(() => {
    }, [onOpen])

    const handleCountdown: () => void = useCallback(() => {
        setCountdown(prev=> !prev)
    }, [setCountdown])

    const handleMetronome: () => void = useCallback(() => {
        setMetronome(prev=> !prev)
    }, [setMetronome])

    const handleTempoManagement: () => void = useCallback(() => {
        onOpen('TEMPO_MANAGEMENT', {
            title: 'Gestion du tempo',
            topPosition: '25%'
        })
    }, [onOpen])

    const handleLearningModeOn: () => void = useCallback(() => {
    },[onOpen])

    const handleLooperOn: () => void = useCallback(() => {
    }, [onOpen])

    const handleSolo: () => void = useCallback(() => {
        if (solo) {
            setSolo(false)
            if (mute) {
                setMute(prev => [
                    { ...prev[0], muted: false }, ...prev.slice(1)
                ])
            }
        } else {
            setSolo(true)
            if (mute) {
                setMute(prev => [
                    { ...prev[0], muted: true }, ...prev.slice(1)
                ])
            }
        }
    }, [solo, mute, setSolo, setMute])

    const handleMuteOn: () => void = useCallback(() => {
    },[onOpen])

    const handleAnnotation: () => void = () => {}

    const handlePrinting: () => void = () => {}

    const handleChords: () => void = () => {}

    const Tools = useMemo((): ToolType[] => [
        {
            name: 'tunner',
            content: <TunnerIcon size="24px" color={'currentColor'}/>,
            handleOnClick: handleTunner
        },
        {
            name: 'countdown',
            content: <CountdownIcon size="24px" color={countdown ? "#ad47ff" : 'currentColor'}/>,
            handleOnClick: handleCountdown
        },
        {
            name: 'metronome',
            content: <MetronomeIcon size="24px" color={metronome ? "#ad47ff" : 'currentColor'}/>,
            handleOnClick: handleMetronome
        },
        {
            name: 'tempoManagement',
            content: <TempoIcon size="24px" color={(tempoPercent < 100 || tempoPercent > 100) ? "#ad47ff" : 'currentColor'}/>,
            handleOnClick: handleTempoManagement
        },
        {
            name: 'learningMode',
            content: <LearningModeIcon size="24px" color={learningMode.startTempoPercent === learningMode.endTempoPercent ? 'currentColor' : "#ad47ff"}/>,
            handleOnClick: handleLearningModeOn
        },
        {
            name: 'looper',
            content: <LooperIcon size="24px" color={(looper.startMeasure === 0 || looper.endMeasure === 0) ? 'currentColor' : "#ad47ff"}/>,
            handleOnClick: handleLooperOn
        },
        {
            name: 'solo',
            content: <SoloIcon size="24px" color={solo ? "#ad47ff" : 'currentColor'}/>,
            handleOnClick: handleSolo
        },
        {
            name: 'mute',
            content: <MuteIcon size="24px" color={(!solo && mute?.some(im => im.muted)) ? "#ad47ff" : 'currentColor'}/>,
            handleOnClick: handleMuteOn
        },
        {
            name: 'notes',
            content: <AnnotationsIcon size="24px" />,
            handleOnClick: handleAnnotation
        },
        {
            name: 'printing',
            content: <ImpressionIcon size="24px" />,
            handleOnClick: handlePrinting
        },
        {
            name: 'chords',
            content: <ChordsIcon size="24px" />,
            handleOnClick: handleChords
        }
    ], [setCountdown, 
        setMetronome,
        setSolo,
        setMute,
        countdown,
        metronome,
        tempoPercent,
        learningMode,
        looper,
        solo,
        mute
    ])

    return (
        <Flex id="RightBarContainer"
        direction={"column"} justifyContent={"start"} alignItems={"center"}
        marginRight={"0.5rem"} marginTop={"0.5rem"} paddingBottom={"1rem"}
        height={"100%"} width={"3rem"}>

            {/*Scores management tools*/}
            <Flex id="toolsContainer" 
            direction={"column"} justifyContent={"space-around"} alignItems={"center"}
            paddingBottom={"0.5rem"} height={"90%"}
            backgroundColor={"#141216"}
            borderTopRadius={"0.5rem"}
            borderBottomColor={"#3a393d"} borderBottomStyle={"solid"} borderBottomWidth={"0.0625rem"}>
                
                {Tools.map((t: ToolType) => {
                    return (
                        <ToolButton key={t.name} id={`${t.name}Btn`} title={t.name} onClick={t.handleOnClick}>
                            {t.content}
                        </ToolButton>
                    )
                })}

            </Flex>

            {/*Others scores from current track*/}
            <Flex id="pistesContainer"
            direction={"column"} justifyContent={"space-around"} alignItems={"center"}
            paddingY={"0.5rem"} gap={"0.5rem"} minW={"38px"}
            backgroundColor={"#141216"}
            borderBottomRadius={"0.5rem"}
            overflowY={"auto"} sx={{
                "&::-webkit-scrollbar": {
                    display: "none"
                }
            }}>
                
                {score?.instruments.othersInstruments.map((oi: IOtherInstrument) => (
                    <OtherInstrumentCard instrument={oi} />
                ))}

            </Flex>
        </Flex>
    )
}

export default Tools
