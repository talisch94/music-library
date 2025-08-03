import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SongsState } from './songs.reducer';

export const selectSongsState = createFeatureSelector<SongsState>('songs');

export const selectAllSongs = createSelector(
    selectSongsState,
    (state: SongsState) => state.songs
);

export const selectSongsLoading = createSelector(
    selectSongsState,
    (state: SongsState) => state.loading
);

export const selectSongsError = createSelector(
    selectSongsState,
    (state: SongsState) => state.error
);

