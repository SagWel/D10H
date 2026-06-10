import { Box, Flex, Text } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { Renderer, 
        Stave, 
        StaveNote, 
        Voice, 
        Formatter, 
        Beam, 
        Dot, 
        Accidental, 
        StaveTie, 
        SVGContext,
        Tickable,
        Tuplet,
        VexFlow,
        Annotation,
} from 'vexflow'

import type { INoteData, ITie } from "../../types/Score";

import { useScore } from "../../hooks/useScore";
import { usePlayScoreDispatch, usePlayScoreStates } from "../../hooks/usePlayScore";

import '../../style.css'
import useWindowWidth from "../../hooks/useWindowWidth";

export interface INoteSynchro {
    startMeasureMs : number,
    startTimeMs: number,
    durationMs: number,
    id?: string,
    key: string,
    x: number
    y: number
}

export interface IMeasureObject {
    stave: Stave;
    voice: Voice;
    beams: Beam[];
    ties: StaveTie[];
    tuplets: Tuplet[];
}

export interface IScoreRenderChantProps {}

const ScoreRenderChant: React.FC<IScoreRenderChantProps> = () => {
    
    // Import score data from context by hook
    const { score } = useScore()

    // Import State to start timer
    const { onPlay, backToStart, previousMeasure, nextMeasure, tempoPercent } = usePlayScoreStates()

    const { setOnPlay, setBackToStart } = usePlayScoreDispatch()

    // Import State for responsive
    const width = useWindowWidth()

    const tempo = score && score.bpm * (tempoPercent / 100)

    // Refs
        /* Partittion Ref */
    const svgScoreRef = useRef<HTMLDivElement | null>(null)
    const contextScoreRef = useRef<SVGContext | null>(null)

        /* Cursor Ref */
    const svgCursorRef = useRef<HTMLDivElement | null>(null)
    const contextCursorRef = useRef<SVGContext | null>(null)

        /* VexFlow Ref */
    const measuresToRenderRef = useRef<any[]>([])
    const lastNoteIdRef = useRef<HTMLElement | null>(null)
    const notesMapRef = useRef<Map<string, StaveNote>>(new Map());
    const staveRef = useRef<Stave | null>(null)
    const dataArrayRef = useRef<INoteSynchro[]>([])
    const currentMeasureStartTime = useRef<number | undefined>(undefined)

        /* Time Ref */
    const currentTimeRef = useRef<number>(0)

        /* Boxs Ref */
    const containerRef = useRef<HTMLDivElement | null>(null)
    const lastScrolledYRef = useRef<number>(-1)

    const [numBeats, beatValue] = score ? score.time_signature.split('/').map(Number) : [4, 4]

    const msPerBeat = (score && tempo) && 60000 / tempo
    const msPerMeasure = msPerBeat && numBeats * msPerBeat

    //Draw beams on Stave
    const drawBeams = (context: SVGContext, beams: Beam[]) => {
        beams.forEach((beam: Beam) => {
            beam.setContext(context);
            beam.draw();
        });
    };

    //Draw ties on Staves
    const drawTies = (context: SVGContext, ties: StaveTie[]) => {
        ties.forEach((tie: StaveTie) => {
            tie.setContext(context);
            tie.draw();
        });
    };

    // Return Measures data for drawing
    const mapToVexFlow = (notes: INoteData[], currentMeasurIndex: number, clef: string, openTies: { note: StaveNote; index: number; direction?: string, measureIndex: number }[], allTies: StaveTie[], measurePerLine: number) => {
        const beams: Beam[] = []
        let currentBeamGroup: StaveNote[] = []

        const tuplets: Tuplet[] = []
        let currentTupletGroup: StaveNote[] = []

        const allNotes: StaveNote[] = []

        notes.forEach((n: INoteData) => {
            let duration = n.duration
            if (n.dots) duration += "d"
            if (n.isRest) duration += "r"
            
            const note: StaveNote = new StaveNote({keys: n.keys, duration: duration, clef: clef} )

            if (n.dots) note.addModifier(new Dot(), 0)
            if (n.accidental) note.addModifier(new Accidental(n.accidental), 0)

            if (n.beam === "start") currentBeamGroup.push(note)
            if (n.beam === "continue") currentBeamGroup.push(note)
            if (n.beam === "end") {
                currentBeamGroup.push(note)
                beams.push(new Beam(currentBeamGroup))
                currentBeamGroup = []
            }
            
            if (n.keyTies) {
                
                n.keyTies.forEach((tieList: ITie[] | null, index: number) => {

                    if (!tieList) return
                    
                    tieList.forEach((t) => {
                        
                        if (t.status === 'start') {
                            openTies.push({
                                note: note,
                                index: index,
                                direction: t.direction,
                                measureIndex: currentMeasurIndex
                            })
                            
                        }

                        if (t.status === 'end') {
                            const currentKeyName = n.keys[index]
                            
                            const tieStartIndex = openTies.findIndex(openTie => {
                                const firstNoteKey =  openTie.note.getKeys()
                                
                                return firstNoteKey[openTie.index].toLowerCase() === currentKeyName.toLowerCase()
                            })                            

                            if (tieStartIndex !== -1) {
                                const startTie = openTies[tieStartIndex]

                                if (Math.floor(startTie.measureIndex / measurePerLine) === Math.floor(currentMeasurIndex / measurePerLine)) {
                                    const singleTie = new StaveTie({
                                        firstNote: startTie.note,
                                        lastNote: note,
                                        firstIndexes: [startTie.index],
                                        lastIndexes: [index]
                                    })

                                    singleTie.renderOptions.firstXShift = -10
                                    singleTie.renderOptions.lastXShift = 0
                                    singleTie.renderOptions.yShift = 1
                                    singleTie.renderOptions.cp1 = 2
                                    singleTie.renderOptions.cp2 = 4
                                
                                    if (startTie.direction !== 'auto') {
                                        if (startTie.direction === 'up') singleTie.setDirection(VexFlow.Modifier.Position.ABOVE)
                                        if (startTie.direction === 'down') singleTie.setDirection(VexFlow.Modifier.Position.BELOW)
                                    }

                                    allTies.push(singleTie)

                                } else {
                                    const topTie = new StaveTie({
                                        firstNote: startTie.note,
                                        firstIndexes: [startTie.index]
                                    })

                                    topTie.renderOptions.firstXShift = -10
                                    topTie.renderOptions.lastXShift = 0
                                    topTie.renderOptions.yShift = 1
                                    topTie.renderOptions.cp1 = 2
                                    topTie.renderOptions.cp2 = 4
                                
                                    if (startTie.direction !== 'auto') {
                                        if (startTie.direction === 'up') topTie.setDirection(VexFlow.Modifier.Position.ABOVE)
                                        if (startTie.direction === 'down') topTie.setDirection(VexFlow.Modifier.Position.BELOW)
                                    }

                                    allTies.push(topTie)

                                    const bottomTie = new StaveTie({
                                        lastNote: note,
                                        lastIndexes: [index]
                                    })

                                    bottomTie.renderOptions.firstXShift = -10
                                    bottomTie.renderOptions.lastXShift = 0
                                    bottomTie.renderOptions.yShift = 1
                                    bottomTie.renderOptions.cp1 = 2
                                    bottomTie.renderOptions.cp2 = 4
                                
                                    if (startTie.direction !== 'auto') {
                                        if (startTie.direction === 'up') bottomTie.setDirection(VexFlow.Modifier.Position.ABOVE)
                                        if (startTie.direction === 'down') bottomTie.setDirection(VexFlow.Modifier.Position.BELOW)
                                    }

                                    allTies.push(bottomTie)
                                }

                                openTies.splice(tieStartIndex, 1)
                            }
                        }
                    })
                })
            }

            if (n.tuplet) {
                if (n.tuplet.type === 'start') currentTupletGroup.push(note)
                if (n.tuplet.type === 'mid') currentTupletGroup.push(note)
                if (n.tuplet.type === 'end') {
                    currentTupletGroup.push(note)
                    tuplets.push(new Tuplet(currentTupletGroup, {numNotes: n.tuplet.num, notesOccupied: n.tuplet.occupied, location: Tuplet.LOCATION_TOP}))
                    currentTupletGroup = []
                }
            }
            allNotes.push(note)

            if (n.lyrics) note.addModifier(new Annotation(n.lyrics).setVerticalJustification(Annotation.VerticalJustify.BOTTOM).setFont({size: 11}), 0)
        })
        return { allNotes, beams, tuplets }
    }

     // Draw Measures
    const renderAllMeasures = (context: SVGContext , measures: IMeasureObject[]) => {
        measures.forEach(({ stave, voice, beams, ties, tuplets}) => {
            stave.setContext(context).draw()
            voice.draw(context, stave)

            if (beams?.length > 0) drawBeams(context, beams)
            if (ties?.length > 0) drawTies(context, ties)
            if (tuplets?.length > 0) {
                tuplets.forEach(t => t.setContext(context).draw())
            }
        })
        
        staveRef.current = measures[0].stave
    }

    // Draw cursor
    const drawCursor = (context: SVGContext, stave: Stave, svg: HTMLElement) => {
        context.beginPath()
        context.setLineWidth(5)
        context.setStrokeStyle("#FF8564")
        context.moveTo(0,0)
        context.lineTo(0, stave.getHeight())
        context.stroke()

        /* cursor */
        const cursor = svg.lastElementChild as HTMLElement

        if (cursor) cursor.id = "music-cursor"
    }

    // Cursor move management 
    const moveCursor = (cursor: HTMLElement, positionX: number, positionY: number) => {
        cursor.style.transform = `translate(${positionX}px, ${positionY}px)`
    }

    //found note on time
    const findNote: (currentTimeMs: number, synchronizationData: INoteSynchro[]) => INoteSynchro | undefined = (currentTimeMs: number, synchronizationData: INoteSynchro[]) => {
        const noteNow = synchronizationData.find((n) => 
            currentTimeMs >= n.startTimeMs && currentTimeMs < (n.startTimeMs + n.durationMs)
        );
        return noteNow
    }

    const getMeasureStartTime = (measureId: number) => {
        return msPerMeasure ? measureId * msPerMeasure : 0
    }

    const findMeasure = (timeMs: number, data: INoteSynchro[]) => {
        const measureNowStartTimeMs = data.find((n) => {     
            return timeMs >= n.startMeasureMs && timeMs < (n.startMeasureMs + (msPerMeasure || 0))
        })
        return measureNowStartTimeMs?.startMeasureMs
    }

    //update notes color on time
    const onTimeUpdate = (currentNote: HTMLElement | null) => {
        const lastNote: HTMLElement | null = lastNoteIdRef.current
        
        if (currentNote && currentNote !== lastNote) {
            if (lastNote) lastNote.classList.remove('note-active')
            currentNote.classList.add('note-active')
            lastNoteIdRef.current = currentNote
        }
    }

    // Notes Rendering useEffect
    useEffect(() => {
        if (!score) return

        if (!svgScoreRef.current || !svgCursorRef.current|| !containerRef.current) return console.error('Erreur lors du chargement de la partition ...');
        if (svgScoreRef.current) svgScoreRef.current.innerHTML = "";

        /*dimmensions */
        const lineSpacing: number = 160
        const containerWidth: number = containerRef.current.offsetWidth ?? 800;
        const maxMeasurePerLine: number = width < 1024 ? 2 : 4
        const measurePerLine: number = width < 768 ? 1 : maxMeasurePerLine
        const totalLines: number = Math.ceil(score.measures.length / measurePerLine);
        const firstMeasureExtraWidth: number = 80
        const dynamicHeight: number = totalLines * lineSpacing + 50;
        const availableWidth: number = containerWidth - 40 - firstMeasureExtraWidth;
        const fixedMeasureWidth: number = availableWidth / measurePerLine;

        /*render */
        const rendererScore = new Renderer(svgScoreRef.current, Renderer.Backends.SVG);
        rendererScore.resize(Math.round(containerWidth), Math.round(dynamicHeight));
    
        /*context */
        const contextScore = (rendererScore.getContext() as SVGContext);
        contextScoreRef.current = contextScore;

        /*positions */
        let currentX = 20;
        let currentY = 0;

        /*Final render Measures variable */
        const measuresToRender: IMeasureObject[] = [];

        
        const allTies: StaveTie[] = []
        const openTies: { note: StaveNote; index: number; direction?: string, measureIndex: number }[] = [];

        /*measures construction */
        score.measures.forEach((measure, index) => {
            const { allNotes: measureNotes, beams: measureBeams, tuplets: measureTuplets } = mapToVexFlow(measure.notes, index, score.clef, openTies, allTies, measurePerLine)
            

            if (index > 0 && index % measurePerLine === 0) {
                currentX = 20;
                currentY += 160;
            }
        
            const stave: Stave = new Stave(currentX, currentY, fixedMeasureWidth)

            if (index % measurePerLine === 0) {
                stave.addClef(score.clef)
                stave.addTimeSignature(score.time_signature)
                if (score.clef_signature) stave.addKeySignature(score.clef_signature)
                stave.setWidth(stave.getBoundingBox().getW() + 50)
                currentX += 50
            } else {
                stave.setNoteStartX(stave.getX() + 10);
            }

            try {
                const voice = new Voice({ numBeats:numBeats, beatValue:beatValue });

                voice.addTickables(measureNotes);          

                const formattingWidth = stave.getWidth() - (stave.getNoteStartX() - stave.getX()) - 10;

                new Formatter().joinVoices([voice]).format([voice], formattingWidth);
                
                measuresToRender.push({ stave, voice, beams: measureBeams, ties: [], tuplets : measureTuplets });
            } catch (error) {
                console.error(`Erreur mesure n°${index + 1} `, 'background: #222; color: #ff0000; font-size: 14px; font-weight: bold;');
                console.warn("Détails de l'erreur :", error);
                console.log("Contenu JSON de cette mesure :", measure);
                
                const emptyVoice = new Voice({ numBeats: 4, beatValue: 4 }).setStrict(false);
                measuresToRender.push({ stave, voice: emptyVoice, beams: measureBeams, ties: [], tuplets : measureTuplets });
            }
            currentX += fixedMeasureWidth;
        })

        measuresToRenderRef.current = measuresToRender;

        /*measures display */
        renderAllMeasures(contextScore, measuresToRender)
        if (allTies.length > 0) {
            allTies.forEach(tie => {
                tie.setContext(contextScore).draw()
            });
        }

        // data synchro generation
        const notesMap = new Map();
        const synchronizationData: INoteSynchro[] = []
        let runningTimeMs: number = 0;

        notesMapRef.current = notesMap;
        

        measuresToRender.forEach((m, mIndex) => {
            const tickables: Tickable[] = m.voice.getTickables()
            const y: number = m.stave.getYForLine(0)

            tickables.forEach((tickable: Tickable) => {
                const note = tickable as StaveNote
                
                const durationMs: number = (note.getTicks().value() / 4096) * (60000 / score.bpm)               
                
                const x: number = note.getAbsoluteX()
                const id: string | undefined = note.getAttribute('id') ?? `note_${mIndex}_${Math.round(runningTimeMs)}`.replaceAll(/[^a-zA-Z0-9]/g, "_")

                synchronizationData.push({
                    startMeasureMs: getMeasureStartTime(mIndex),
                    startTimeMs: runningTimeMs,
                    durationMs: durationMs,
                    id: id,
                    key: note.getKeys().join(","),
                    x: x,
                    y: y
                })

                notesMap.set(id, note);
                runningTimeMs += durationMs
            })

            //ghost note
            if ((mIndex + 1) % measurePerLine === 0 || mIndex === measuresToRender.length - 1) {
                synchronizationData.push({
                    startMeasureMs: getMeasureStartTime(mIndex),
                    startTimeMs: runningTimeMs,
                    durationMs: 0,
                    id: `ghost-${mIndex}`,
                    key: "ghost",
                    x: m.stave.getX() + m.stave.getWidth(),
                    y: y
                })
            }
        })

        dataArrayRef.current = synchronizationData
        
        // Cursor
        if (svgCursorRef.current) svgCursorRef.current.innerHTML = "";

        const rendererCursor = new Renderer(svgCursorRef.current, Renderer.Backends.SVG);
        rendererCursor.resize(Math.round(containerWidth), Math.round(dynamicHeight));

        const contextCursor = rendererCursor.getContext() as SVGContext;
        contextCursorRef.current = contextCursor;
    
    }, [score, width])

    // Cursor Rendering useEffect
    useEffect(() => {
        if (onPlay) {
            if (contextCursorRef.current && staveRef.current && svgCursorRef.current) drawCursor(contextCursorRef.current, staveRef.current, svgCursorRef.current)

            const Timer = setInterval(() => {
                const now: number = currentTimeRef.current

                const currentNoteData: INoteSynchro | undefined = findNote(now, dataArrayRef.current)

                currentMeasureStartTime.current = findMeasure(now, dataArrayRef.current)
                
                if (currentNoteData) {
                    const currentNote: HTMLElement | null = document.getElementById(`vf-${currentNoteData.id}`)
                    const currentNoteId: number = dataArrayRef.current.findIndex(n => n.id === currentNoteData.id)
                    const nextNoteData: INoteSynchro = dataArrayRef.current[currentNoteId + 1]
                    
                    if (nextNoteData) {
                        const ratio: number = Math.min((now - currentNoteData.startTimeMs) / (currentNoteData.durationMs || 1), 1);

                        let posX: number = currentNoteData.x
                        if (nextNoteData.y === currentNoteData.y) {
                            posX = currentNoteData.x + (nextNoteData.x - currentNoteData.x) * ratio
                        }

                        const cursor: HTMLElement | null = document.getElementById('music-cursor')

                        if (cursor) {
                            moveCursor(cursor, posX, currentNoteData.y - 20)
                        }
                    }

                    onTimeUpdate(currentNote)

                    if (nextNoteData) {
                        const container: HTMLDivElement | null = containerRef.current
                        const targetY: number = nextNoteData.y

                        if(targetY !== lastScrolledYRef.current && container) {
                            const isChangingLine: boolean = targetY > currentNoteData.y
                            const isTooLow: boolean = targetY > (container.scrollTop + container.offsetHeight * 0.5)

                            if (isChangingLine || isTooLow) {
                                container.scrollTo({
                                    top: targetY -50,
                                    behavior: 'smooth'
                                })

                                lastScrolledYRef.current = targetY
                            }
                        }
                    }

                } else onTimeUpdate(null)
                currentTimeRef.current += 16

                const finalTimeMs = (score?.song.duration || 0) * 1000
                
                if (currentTimeRef.current >= finalTimeMs) {
                    setOnPlay(false)
                    setBackToStart(true)
                    setTimeout(() => {            
                        setBackToStart(false)
                    }, 100)
                    currentTimeRef.current = 0
                }
            }, 16)
            // tempo ? 16 / (tempo / 100) : 16

            return () => clearInterval(Timer)
        }
    },[onPlay, width, backToStart, previousMeasure, nextMeasure, tempo])

    useEffect(() => {
        const cursor: HTMLElement | null = document.getElementById('music-cursor')
        if (cursor) {

            if (backToStart) {
                currentTimeRef.current = 0

                lastScrolledYRef.current = dataArrayRef.current[0].y
    
                moveCursor(cursor, dataArrayRef.current[0].x, dataArrayRef.current[0].y - 20)
                
                const newCurrentNote = document.getElementById(`vf-${dataArrayRef.current[0].id}`)

                onTimeUpdate(newCurrentNote)
    
                setTimeout(() => {
                    const container: HTMLDivElement | null = containerRef.current
                    if (container) {
                        container.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })
                    }
                })
            }

            if (previousMeasure) {
                const currentMeasureStartTimeMs = currentMeasureStartTime.current

                const previousMeasureStartTimeMs = (currentMeasureStartTimeMs && currentMeasureStartTimeMs > 0)
                ? currentMeasureStartTimeMs - (msPerMeasure as number)
                : 0;

                currentTimeRef.current = previousMeasureStartTimeMs
                const currentNoteData: INoteSynchro | undefined = findNote(currentTimeRef.current, dataArrayRef.current)

                if (currentNoteData) {

                    moveCursor(cursor, currentNoteData.x, currentNoteData.y)

                    const currentNote: HTMLElement | null = document.getElementById(`vf-${currentNoteData.id}`)

                    onTimeUpdate(currentNote)

                    setTimeout(() => {
                        const container: HTMLDivElement | null = containerRef.current
                        if (container) {
                            const targetY: number = currentNoteData.y

                            if(targetY !== lastScrolledYRef.current) {
                                const isChangingLine: boolean = targetY < currentNoteData.y
                                const isTooLow: boolean = targetY < (container.scrollTop + container.offsetHeight * 0.5)

                                if (isChangingLine || isTooLow) {
                                    container.scrollTo({
                                        top: targetY - 50,
                                        behavior: 'smooth'
                                    })
                                }

                                lastScrolledYRef.current = targetY
                            }
                        }
                    })
                }
            }

            if (nextMeasure) {
                const currentMeasureStartTimeMs = currentMeasureStartTime.current

                const lastMeasureTimeMs = (msPerMeasure as number) * ((score?.measures?.length as number) - 1);
                const nextMeasureStartTimeMs = (currentMeasureStartTimeMs && currentMeasureStartTimeMs < lastMeasureTimeMs)
                ? currentMeasureStartTimeMs + (msPerMeasure as number)
                : lastMeasureTimeMs

                currentTimeRef.current = nextMeasureStartTimeMs
                const currentNoteData: INoteSynchro | undefined = findNote(currentTimeRef.current, dataArrayRef.current)

                if (currentNoteData) {

                    moveCursor(cursor, currentNoteData.x, currentNoteData.y)

                    const currentNote: HTMLElement | null = document.getElementById(`vf-${currentNoteData.id}`)

                    onTimeUpdate(currentNote)

                    setTimeout(() => {
                        const container: HTMLDivElement | null = containerRef.current
                        if (container) {
                            const targetY: number = currentNoteData.y

                            if(targetY !== lastScrolledYRef.current) {
                                const isChangingLine: boolean = targetY > currentNoteData.y
                                const isTooLow: boolean = targetY > (container.scrollTop + container.offsetHeight * 0.5)

                                if (isChangingLine || isTooLow) {
                                    container.scrollTo({
                                        top: targetY - 50,
                                        behavior: 'smooth'
                                    })
                                }

                                lastScrolledYRef.current = targetY
                            }
                        }
                    })
                }
            }
        }
    },[backToStart, previousMeasure, nextMeasure])


    if (!score) {
        return <Box textAlign={"center"}><Text color={"black"}>Chargement de la partition ...</Text></Box>
    }

    if (width < 646) {
        return (
            <Flex justify={'center'} align={'center'} h={'full'} textAlign={'center'}>
                <Text color={"#242222"} fontWeight={'700'} px={1.5}>
                    Cet outil n'ai pas disponible pour ce format d'écran
                </Text>
            </Flex>
        )
    }

    return (
        <Box position={"relative"} w={"100%"} ref={containerRef} overflowY={"auto"} maxH={"800px"}
        sx={{
            '&::WebkitScrollbar': {
            display: 'none',
            },
            'msOverflowStyle': 'none',
            'scrollbarWidth': 'none', 
        }}>
            <Box id="score-container" ref={svgScoreRef} 
            sx={{ 
                display: "block", 
                height: "auto"
            }}/>
            
            <Box id="cursor-container" ref={svgCursorRef} 
            sx={{ 
                position: "absolute", 
                top: "0", 
                left: "0", 
                pointerEvents: "none", 
                width:"100%", 
                background: "transparent"
            }}/>
        </Box>
    )
}

export default ScoreRenderChant