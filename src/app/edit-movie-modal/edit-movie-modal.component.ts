import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-movie-modal',
  templateUrl: './edit-movie-modal.component.html',
  styleUrls: ['./edit-movie-modal.component.css']
})
export class EditMovieModalComponent {
  movie: any;

  constructor(
    public dialogRef: MatDialogRef<EditMovieModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = { ...data.movie }; // Clona los datos de la película
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.movie); // Devuelve la película editada
  }
}
