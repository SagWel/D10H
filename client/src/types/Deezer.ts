export interface IArtist {
    id: number;
    name: string;
}

export interface IAlbum {
    id: number;
    title: string;
    cover_small: string;
}

export interface IDeezerTrack {
    id: number;
    readable: boolean;
    title: string;
    link: string;
    duration: number;
    preview: string;
    bpm: number;
    artist: IArtist;
    album: IAlbum;
}

export interface IDeezerSearchResponse {
    data: IDeezerTrack[];
    total: number;
    next?: string;
}