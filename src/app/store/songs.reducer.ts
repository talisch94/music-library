import { createReducer, on } from '@ngrx/store';
import { Song } from '../interfaces/song.interface';
import * as SongActions from './songs.actions';

export interface SongsState {
    songs: Song[];
    loading: boolean;
    error: string | null;
}

export const initialState: SongsState = {
    songs: [],
    loading: false,
    error: null
};

export const songsReducer = createReducer(
    initialState,

    // Load Songs
    on(SongActions.loadSongs, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(SongActions.loadSongsSuccess, (state, { songs }) => ({
        ...state,
        songs,
        loading: false,
        error: null
    })),

    on(SongActions.loadSongsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Add Song
    on(SongActions.addSong, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(SongActions.addSongSuccess, (state, { song }) => ({
        ...state,
        songs: [...state.songs, song],
        loading: false,
        error: null
    })),

    on(SongActions.addSongFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Delete Song
    on(SongActions.deleteSong, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(SongActions.deleteSongSuccess, (state, { id }) => ({
        ...state,
        songs: state.songs.filter(song => song.id !== id),
        loading: false,
        error: null
    })),

    on(SongActions.deleteSongFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
