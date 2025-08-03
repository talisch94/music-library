import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SongsListComponent } from "./components/songs-list/songs-list.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SongsListComponent],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    protected readonly title = signal('frontend');
}
