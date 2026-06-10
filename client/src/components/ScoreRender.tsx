import { Box, Text } from "@chakra-ui/react";
import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
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
        TabStave
} from 'vexflow'

/* Import type */
import { type INoteData } from "../types/Score";

/* Import hook */
import { useScore } from "../hooks/useScore";

import '../style.css'
import { usePlayScoreStates } from "../hooks/usePlayScore";

export interface IMeasureObject {
    stave: Stave;
    voice: Voice;
    beams: Beam[];
    ties: StaveTie[];
    tuplets: Tuplet[];
}

export interface INoteSynchro {
    startTimeMs: number,
    durationMs: number,
    id?: string,
    key: string,
    x: number
    y: number
}

export interface IScoreRenderProps {}

const ScoreRender: React.FC<IScoreRenderProps> = () => {

    /* Import score data from context by hook */
    const {score} = useScore() 

    const { onPlay } = usePlayScoreStates()

    const { instrumentName } = useParams()

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

    /* Time Ref */
    const currentTimeRef = useRef<number>(0)

    /* Boxs Ref */
    const containerRef = useRef<HTMLDivElement | null>(null)
    const lastScrolledYRef = useRef<number>(-1)

    /* Style */
    const hideScrollbarStyle = {
        '&::WebkitScrollbar': {
        display: 'none',
        },
        'msOverflowStyle': 'none',
        'scrollbarWidth': 'none', 
    };

    //Draw beams on Stave
    const drawBeams = (context: SVGContext, beams: Beam[]) => {
        beams.forEach((beam: Beam) => {
            beam.setContext(context);
            beam.draw();
        });
    };

    const findBeamForNote = (note: StaveNote, beams: Beam[]) => {
        return beams.find(b => b.getNotes().includes(note)) || null
    }

    //Draw ties on Staves
    const drawTies = (context: SVGContext, ties: StaveTie[]) => {
        ties.forEach((tie: StaveTie) => {
            tie.setContext(context);
            tie.draw();
        });
    };

    // Return Measures data for drawing
    const mapToVexFlow = (notes: INoteData[], clef: string, tieGroup: any) => {
        const beams: Beam[] = []
        let currentBeamGroup: StaveNote[] = []

        const ties: StaveTie[] = []

        const tuplets: Tuplet[] = []
        let currentTupletGroup: StaveNote[] = []

        const allNotes: StaveNote[] = []

        notes.forEach(n => {
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

            if (n.ties?.[0] === "start") tieGroup.first.push(note)
            if (n.ties?.[0] === "end") {
                tieGroup.first.push(note)
                if (tieGroup.first.length === 2) {
                    const firstNote = tieGroup.first[0];
                    const firstKeys = firstNote.getKeys();

                    const lastNote = tieGroup.first[1];
                    const lastKeys = lastNote.getKeys();

                    const firstIndices: number[] = [];
                    const lastIndices: number[] = []

                    lastKeys.forEach((lastKey : string, lastIdx: number) => {
                        const firstIdx: number = firstKeys.indexOf(lastKey);
                        if (firstIdx !== -1) {
                            firstIndices.push(firstIdx);
                            lastIndices.push(lastIdx);
                        }
                    });

                    const finalFirst = firstIndices.length > 0 ? firstIndices : [0];
                    const finalLast = lastIndices.length > 0 ? lastIndices : [0];

                    ties.push(new StaveTie({
                        firstNote: tieGroup.first[0],
                        lastNote: tieGroup.first[1],
                        firstIndexes: finalFirst,
                        lastIndexes: finalLast
                    }))
                }
                tieGroup.first = []
            }
            if (n.ties && n.ties.length > 1 && n.ties[1] === "start") tieGroup.second.push(note)
            if (n.ties && n.ties.length > 1 && n.ties[1] === "end") {
                tieGroup.second.push(note)
                if (tieGroup.second.length === 2) {
                    ties.push(new StaveTie({
                        firstNote: tieGroup.second[0],
                        lastNote: tieGroup.second[1]
                    }).setDirection(2))
                }
                tieGroup.second = []
            }

            if (n.tuplet?.type === "start") currentTupletGroup.push(note)
            if (n.tuplet?.type === "mid") currentTupletGroup.push(note)
            if (n.tuplet?.type === "end") {
                currentTupletGroup.push(note)
                tuplets.push(new Tuplet(currentTupletGroup, {numNotes: n.tuplet.num, notesOccupied: n.tuplet.occupied, location: Tuplet.LOCATION_TOP}))
                currentTupletGroup = []
            }
            allNotes.push(note)
            
        })
        return { allNotes, beams, ties, tuplets }
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
        context.setStrokeStyle("rgba(255, 129, 92, 0.7)")
        context.moveTo(0,0)
        context.lineTo(0, stave.getHeight())
        context.stroke()

        /* cursor */
        const cursor = svg.lastElementChild as HTMLElement

        if (cursor) cursor.id = "music-cursor"
    }

    /* Cursor move management */
    const moveCursor = (cursor: HTMLElement, positionX: number, positionY: number) => {
        cursor.style.transform = `translate(${positionX}px, ${positionY}px)`
    }

    //found note on time
    const findNote = (currentTimeMs: number, synchronizationData: INoteSynchro[]) => {
        const noteNow = synchronizationData.find((n) => 
            currentTimeMs >= n.startTimeMs && currentTimeMs < (n.startTimeMs + n.durationMs)
        );
        return noteNow
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

    useEffect(() => {

        if (!score) return

        let hasTab = false;
        switch (instrumentName?.toLowerCase()) {
            case 'guitare' : 
                hasTab = true
                break
            case 'basse' : 
                hasTab = true
                break
            case 'ukulele' : 
                hasTab = true
                break
            default : 
                break
        }

        if (!svgScoreRef.current || !svgCursorRef.current|| !containerRef.current) return console.error('Erreur lors du chargement de la partition ...');
        if (svgScoreRef.current) svgScoreRef.current.innerHTML = "";
        
        /*dimmensions */
        const lineSpacing: number = 160
        const multiTrackSpacing: number = 100
        const totalLineHeight = hasTab ? lineSpacing + 80 : lineSpacing
        const containerWidth: number = containerRef.current.offsetWidth ?? 800;        
        const measurePerLine: number = 4;
        const totalLines: number = Math.ceil(score.measures.length / measurePerLine);
        const firstMeasureExtraWidth = 80
        const dynamicHeight: number = totalLines * totalLineHeight + 50;
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
        
        /* Ties management variable */
        const tieGroups = {
            first: [] as StaveNote[],
            second: [] as StaveNote[]
        }

        /*Final render Measures variable */
        const measuresToRender: IMeasureObject[] = [];
        
        /*measures construction */
        score.measures.forEach((measure, index) => {
            const { allNotes: measureNotes, beams: measureBeams, ties: measureTies, tuplets: measureTuplets } = mapToVexFlow(measure.notes, score.clef, tieGroups)

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

            if (hasTab) {
                const tabStave: TabStave = new TabStave(currentX, currentY + multiTrackSpacing, fixedMeasureWidth) 

                if (index % measurePerLine === 0) {
                    tabStave.addClef("tab")
                    tabStave.setWidth(stave.getWidth())
                }
                tabStave.setContext(contextScore).draw()
            }

            try {
                const [numBeats, beatValue] = score.time_signature.split('/').map(Number);
                const voice = new Voice({ numBeats:numBeats, beatValue:beatValue });

                voice.addTickables(measureNotes);          

                const formattingWidth = stave.getWidth() - (stave.getNoteStartX() - stave.getX()) - 10;

                new Formatter().joinVoices([voice]).format([voice], formattingWidth);
                
                measuresToRender.push({ stave, voice, beams: measureBeams, ties: measureTies, tuplets : measureTuplets });
            } catch (error) {
                console.error(`Erreur mesure n°${index + 1} `, 'background: #222; color: #ff0000; font-size: 14px; font-weight: bold;');
                console.warn("Détails de l'erreur :", error);
                console.log("Contenu JSON de cette mesure :", measure);
                
                const emptyVoice = new Voice({ numBeats: 4, beatValue: 4 }).setStrict(false);
                measuresToRender.push({ stave, voice: emptyVoice, beams: measureBeams, ties: measureTies, tuplets : measureTuplets });
            }
            currentX += fixedMeasureWidth;
        })

        measuresToRenderRef.current = measuresToRender;

        /*measures display */
        renderAllMeasures(contextScore, measuresToRender)

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
    },[score])

    useEffect(() => {
        if (onPlay) {
            if (contextCursorRef.current && staveRef.current && svgCursorRef.current) drawCursor(contextCursorRef.current, staveRef.current, svgCursorRef.current)

            const Timer = setInterval(() => {
                const now: number = currentTimeRef.current

                const currentNoteData: INoteSynchro | undefined = findNote(now, dataArrayRef.current)
                
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
                            moveCursor(cursor, posX, currentNoteData.y)
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
            }, 16)

            return () => clearInterval(Timer)
        }
    },[onPlay])

    if (!score) {
        return <Box textAlign={"center"}><Text color={"black"}>Chargement de la partition ...</Text></Box>
    }
    return (
            <Box position={"relative"} w={"100%"} ref={containerRef} overflowY={"auto"} maxH={"800px"}
            sx={hideScrollbarStyle}>
                <Box id="score-container" ref={svgScoreRef} sx={{ display: "block", height: "auto"}}/>
                <Box id="cursor-container" ref={svgCursorRef} sx={{ position: "absolute", top: "0", left: "0", pointerEvents: "none", width:"100%", background: "transparent"}}/>
            </Box>
        )
}

export default ScoreRender