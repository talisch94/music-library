import { SongGenre } from "../enums/song-genre.enum";

export interface Song {
    id: string;
    name: string;
    artist: string;
    genre: SongGenre
    coverURL: string;
    releaseDate: Date;
}