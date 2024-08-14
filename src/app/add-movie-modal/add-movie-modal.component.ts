import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../models/movie.model'
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-add-movie-modal',
  templateUrl: './add-movie-modal.component.html',
  styleUrls: ['./add-movie-modal.component.css']
})
export class AddMovieModalComponent implements OnInit {
  movie = new Movie(uuidv4(), "", "", ""); // Se genera ID
  currentYear = new Date().getFullYear();
  constructor(
    public dialogRef: MatDialogRef<AddMovieModalComponent>) {

  }

  onCancel(): void {
    this.dialogRef.close(); // No se envía ningún dato al cerrar
  }

  onSave(): void {
    this.movie.title = this.formatTitle(this.movie.title)
    this.dialogRef.close(this.movie); // Devuelve la película editada
  }

  ngOnInit(): void {
  }

  formatTitle(title: string): string {
    return title
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

}
