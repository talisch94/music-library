import { createAction, props } from '@ngrx/store';
import { Song } from '../interfaces/song.interface';

// Load Songs Actions
export const loadSongs = createAction('[Song] Load Songs');

export const loadSongsSuccess = createAction(
    '[Song] Load Songs Success',
    props<{ songs: Song[] }>()
);

export const loadSongsFailure = createAction(
    '[Song] Load Songs Failure',
    props<{ error: string }>()
);

// Add Song Actions
export const addSong = createAction(
    '[Song] Add Song',
    props<{ song: Omit<Song, 'id'> }>()
);

export const addSongSuccess = createAction(
    '[Song] Add Song Success',
    props<{ song: Song }>()
);

export const addSongFailure = createAction(
    '[Song] Add Song Failure',
    props<{ error: string }>()
);

// Delete Song Actions
export const deleteSong = createAction(
    '[Song] Delete Song',
    props<{ id: string }>()
);

export const deleteSongSuccess = createAction(
    '[Song] Delete Song Success',
    props<{ id: string }>()
);

export const deleteSongFailure = createAction(
    '[Song] Delete Song Failure',
    props<{ error: string }>()
);
