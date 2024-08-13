import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../models/movie.model'

@Component({
  selector: 'app-add-movie-modal',
  templateUrl: './add-movie-modal.component.html',
  styleUrls: ['./add-movie-modal.component.css']
})
export class AddMovieModalComponent implements OnInit {
  movie = new Movie(
    "",
    "",
    "",
    ""
  );
  
  constructor(
    public dialogRef: MatDialogRef<AddMovieModalComponent>) {
  }

  onCancel(): void {
    this.dialogRef.close(); // No se envía ningún dato al cerrar
  }

  onSave(): void {
    this.dialogRef.close(this.movie); // Devuelve la película editada
  }

  ngOnInit(): void {
  }

}
