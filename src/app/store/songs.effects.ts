import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { SongService } from '../services/songs.service';
import * as SongActions from './songs.actions';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SongsEffects {
    private actions$ = inject(Actions);
    private songService = inject(SongService);

    loadSongs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SongActions.loadSongs),
            switchMap(() =>
                this.songService.getSongs().pipe(
                    map(songs => SongActions.loadSongsSuccess({ songs })),
                    catchError(error => of(SongActions.loadSongsFailure({
                        error: error.message || 'Failed to load songs'
                    })))
                )
            )
        )
    );

    addSong$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SongActions.addSong),
            switchMap(({ song }) => {
                const newSong = {
                    ...song,
                    id: uuidv4() // Generate UUID for unique identification
                };

                return this.songService.addSong(newSong).pipe(
                    map(createdSong => SongActions.addSongSuccess({ song: createdSong })),
                    catchError(error => of(SongActions.addSongFailure({
                        error: error.message || 'Failed to add song'
                    })))
                );
            })
        )
    );

    deleteSong$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SongActions.deleteSong),
            switchMap(({ id }) => {
                return this.songService.deleteSong(id).pipe(
                    map(() => SongActions.deleteSongSuccess({ id })),
                    catchError(error => of(SongActions.deleteSongFailure({
                        error: error.message || 'Failed to delete song'
                    })))
                );
            })
        )
    );
}
