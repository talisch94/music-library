import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { Song } from '../../interfaces/song.interface';
import { SongComponent } from '../song/song.component';
import { AddSongModalComponent } from '../add-song-modal/add-song-modal.component';
import { selectAllSongs } from '../../store/songs.selectors';
import * as SongActions from '../../store/songs.actions';

@Component({
    selector: 'app-songs-list',
    standalone: true,
    imports: [SongComponent, MatButton, MatIcon, AsyncPipe],
    templateUrl: './songs-list.component.html',
    styleUrl: './songs-list.component.scss'
})
export class SongsListComponent implements OnInit {
    songs$: Observable<Song[]>;
    
    private readonly store = inject(Store);
    private readonly dialog = inject(MatDialog);

    constructor() {
        this.songs$ = this.store.select(selectAllSongs);
    }

    ngOnInit(): void {
        this.store.dispatch(SongActions.loadSongs());
    }

    openAddSongModal(): void {
        const dialogRef = this.dialog.open(AddSongModalComponent, {
            width: '800px',
            disableClose: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.store.dispatch(SongActions.addSong({ song: result }));
            }
        });
    }

    deleteSong(songId: string): void {
        this.store.dispatch(SongActions.deleteSong({ id: songId }));
    }
}
