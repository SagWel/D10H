import { createContext, useCallback, useMemo, useState, type ReactNode } from "react"
import type { IScore } from "../types/Score"

interface ScoreContextType {
    score: IScore | undefined
    setScore: (p: IScore | undefined) => void

    playback: {
        pctBpm: number,
        isMetronomeActive: boolean,
        isCountdownActive: boolean
        loopRegion: {
            startMeasureId : number,
            endMeasureId: number
        } | null,
        learningConfig: {
            startPct: number,
            endPct: number,
            step: number
        } | null
    }

    audio: {
        mutedTracks: number[],
        isSoloMode: boolean
    }

    annotations : any[]

    activeModal: 'tuner' | 'tempo' | 'looper' | 'learning' | 'chords' | null

    setPlayback: (update: any) => void
    toggleMute: (trackId: number) => void,
    setActiveModal: (modal: 'tuner' | 'tempo' | 'looper' | 'learning' | 'chords' | null) => void
    toggleIsSoloMode: (isSoloMode: boolean) => void
    
}

const ScoreContext: React.Context<ScoreContextType | undefined> = createContext<ScoreContextType | undefined>(undefined)

interface ScoreProviderProps {
    children: ReactNode
}

const ScoreProvider = ({ children } : ScoreProviderProps) => {
    const [score, setScore] = useState<IScore | undefined>(undefined)
    
    /* playback */
    const [pctBpm, setPctBpm] = useState<number>(100)
    const [isMetronomeActive, setIsMetronomeActive] = useState<boolean>(false)
    const [isCountdownActive, setIsCountdownActive] = useState<boolean>(false)
    const [loopRegion, setLoopRegion] = useState<{startMeasureId: number, endMeasureId: number} | null>(null)
    const [learningConfig, setLearningConfig] = useState<{startPct: number, endPct: number, step: number} | null>(null)

    /* audio */
    const [mutedTracks, setMutedTracks] = useState<number[] | []>([])
    const [isSoloMode, setIsSoloMode] = useState<boolean>(false)

    /* annotations */
    const [annotations, setAnnotations] = useState<any[]>([])

    /* modals */
    const [activeModal, setActiveModal] = useState<'tuner' | 'tempo' | 'looper' | 'learning' | 'chords' | null>(null)

    const toggleMute = useCallback((trackId: number) => {
        setMutedTracks(prev => prev.includes(trackId) ? 
            prev.filter(id => id !== trackId) :
            [...prev, trackId])
    }, [])

    const toggleIsSoloMode = useCallback(() => {
        setIsSoloMode(prev => !prev)
    },[])

    const setPlayback = useCallback((update: any) => {
        if (update.pctBpm !== undefined) setPctBpm(update.pctBpm)
        
        if (update.isMetronomeActive !== undefined) setIsMetronomeActive(update.isMetronomeActive)
        
        if (update.isCountdownActive !== undefined) setIsCountdownActive(update.isCountdownActive)
        
        if (update.loopRegion !== undefined) setLoopRegion(update.loopRegion)

        if (update.learningConfig !== undefined) setLearningConfig(update.learningConfig)
    },[])

    const contextValue = useMemo(() => ({
        score,
        setScore,
        playback: {
            pctBpm,
            isMetronomeActive,
            isCountdownActive,
            loopRegion,
            learningConfig
        },
        setPlayback,
        audio: {
            mutedTracks,
            isSoloMode,
        },
        toggleMute,
        toggleIsSoloMode,
        annotations,
        activeModal,
        setActiveModal
    }),[
        score, pctBpm, isMetronomeActive, isCountdownActive, loopRegion, 
        learningConfig, mutedTracks, isSoloMode, annotations, activeModal, 
        setPlayback, toggleMute
    ])

    return (
        <ScoreContext.Provider value={contextValue}>
            {children}
        </ScoreContext.Provider>
    )
}

export {ScoreContext, ScoreProvider}