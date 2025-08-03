import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { SongGenre } from '../../enums/song-genre.enum';

@Component({
    selector: 'app-add-song-modal',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatError,
        MatInput,
        MatSelect,
        MatOption,
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle
    ],
    templateUrl: './add-song-modal.component.html',
    styleUrl: './add-song-modal.component.scss'
})
export class AddSongModalComponent {
    private readonly dialogRef = inject(MatDialogRef<AddSongModalComponent>);
    private readonly fb = inject(FormBuilder);

    songForm: FormGroup;
    genres = Object.values(SongGenre);

    constructor() {
        this.songForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(1)]],
            artist: ['', [Validators.required, Validators.minLength(1)]],
            genre: ['', Validators.required],
            coverURL: ['', Validators.required],
            releaseDate: ['', [Validators.required, this.dateValidator]]
        });
    }

    private dateValidator(control: AbstractControl): ValidationErrors | null {
        const inputDate = new Date(control.value);
        const today = new Date();
        today.setHours(23, 59, 59, 999); // Set to the end of today

        if (isNaN(inputDate.getTime()) || inputDate > today) {
            return { invalidDate: true };
        }

        return null;
    }

    onSubmit(): void {
        if (this.songForm.valid) {
            const newSongData = {
                name: this.songForm.value.name,
                artist: this.songForm.value.artist,
                genre: this.songForm.value.genre,
                coverURL: this.songForm.value.coverURL,
                releaseDate: new Date(this.songForm.value.releaseDate)
            };
            this.dialogRef.close(newSongData);
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
