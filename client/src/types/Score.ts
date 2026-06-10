import { type IInstrument, type IOtherInstrument } from "./instrument"
import type { IUsers } from "./user"


type Durations = "w" | "h" | "q" | "8" | "16" | "32"

export interface ITie {
    status: "start" | "end",
    direction?: "up" | "down" | "auto"
}

export interface ISlide {
    type: "slide-up" | "slide-down",
    statut: "start" | "end"
}   

export interface ITab {
    str: number,
    fret: number,
    tie?: ITie
    fingering?: {
        number: "1" /*index */ | "2" /*majeur */ | "3" /*annulaire */ | "4" /*oricualire */ | "T" /*pouce*/,
        position: "left" | "right" | "above" | "below"
    }
}

export interface IGraceNote {
    keys: string[],
    duration: "8" | "16",
    tab?: ITab[],
    beam?: "start" | "continue" | "end",
    keyTies?: (ITie[] | null)[],
    keySlides?: (ISlide | null)[],
    slash: boolean
}

export interface INoteData {
    id?: string,
    keys: string[],
    tab?: ITab[],
    stroke?: "down" | "up" | "arpeggio_down" | "arpeggio_up" | "rasquedo"
    duration: Durations,
    graceNotes?: IGraceNote[],
    dots?: number,
    bpm?: number,
    isRest?: boolean,
    accidental?: string,
    articulation?: {
        type: "staccato" | "accent" | "tenuto" | "marcato" | "fermata",
        position: "above" | "below"
    },
    beam?: "start" | "continue" | "end",
    keyTies?: (ITie[] | null)[],
    keySlides?: (ISlide | null)[],
    tuplet?: {
        type: "start" | "mid" | "end",
        num?: number,
        occupied?: number
    },
    lyrics?: string,
}

export interface IMeasure {
    id: number,
    notes: INoteData[]
    shortText?: string
    bpm?: number
}

export interface IGender {
    id: number,
    name: string,
    picture: string,
    picture_small?: string,
    picture_medium?: string,
    picture_big?: string,
    picture_xl?: string
}

export interface IArtist {
    id: number,
    name: string,
    deezer_link?: string,
    albums?: IAlbum[]
    picture: string,
    picture_small?: string,
    picture_medium?: string,
    picture_big?: string,
    picture_xl?: string
}

export interface IAlbum {
    id: number,
    title: string,
    deezer_link: string,
    cover: string,
    cover_small?: string,
    cover_medium?: string,
    cover_big?: string,
    cover_xl?: string,
    scores?: IScore[]
    artist: IArtist,
    songs: ISong[]
}

export interface ISong {
    id: number,
    title: string,
    deezer_link: string,
    deezer_full_name: string,
    audio_preview: string,
    duration: number,
    artist: IArtist,
    album: IAlbum,
    gender: IGender,
    isExplicit: boolean
}

export interface IScore {
    id: number,
    difficulty: number,
    instruments: {
        currentInstrument : IInstrument,
        othersInstruments : IOtherInstrument[]
    },
    bpm: number,
    time_signature: string,
    clef: string,
    clef_signature?: string,
    measures: IMeasure[],
    song: ISong,
    score_preview: string,
    popularity: number,
    created_at: Date
}

export interface IScorbrarie {
    id: number,
    name: string,
    description?: string,
    user: IUsers,
    scores?: IScore[]
}