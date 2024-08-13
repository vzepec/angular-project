import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-edit-movie-modal',
  templateUrl: './edit-movie-modal.component.html',
  styleUrls: ['./edit-movie-modal.component.css']
})
export class EditMovieModalComponent {
  movie: any;
  currentYear = new Date().getFullYear();

  constructor(
    public dialogRef: MatDialogRef<EditMovieModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = cloneDeep(data.movie); // Usa data directamente
  }

  onCancel(): void {
    this.dialogRef.close(); // No se envía ningún dato al cerrar
  }

  onSave(): void {
    this.dialogRef.close(this.movie); // Devuelve la película editada
  }
}

