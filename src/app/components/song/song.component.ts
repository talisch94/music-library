import { Component, input, output } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from "@angular/material/card";
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Song } from '../../interfaces/song.interface';

@Component({
    selector: 'app-song',
    standalone: true,
    imports: [
        MatCard, 
        MatCardHeader, 
        MatCardTitle, 
        MatCardSubtitle, 
        MatCardContent, 
        MatCardActions,
        MatIconButton,
        MatIcon,
        DatePipe, 
        UpperCasePipe
    ],
    templateUrl: './song.component.html',
    styleUrl: './song.component.scss'
})
export class SongComponent {
    song = input.required<Song>();
    deleteSong = output<string>();

    onDelete(): void {
        this.deleteSong.emit(this.song().id);
    }
}
