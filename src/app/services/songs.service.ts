import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Song } from '../interfaces/song.interface';

@Injectable({
    providedIn: 'root'
})
export class SongService {
    constructor(private http: HttpClient) { }

    getSongs(): Observable<Song[]> {
        return this.http.get<Song[]>('songs.json');
    }

    // Note: In a real application, these would make HTTP requests to a backend API
    // Frontend applications cannot directly write to static JSON files
    addSong(song: Song): Observable<Song> {
        // This would normally be: return this.http.post<Song>('/api/songs', song);
        return of(song); // Simulated response
    }

    deleteSong(id: string): Observable<void> {
        // This would normally be: return this.http.delete<void>(`/api/songs/${id}`);
        return of(void 0); // Simulated response
    }
}