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
    this.movie = cloneDeep(data.movie);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.movie.title = this.formatTitle(this.movie.title)
    this.dialogRef.close(this.movie); // Devuelve la película editada
  }

  formatTitle(title: string): string {
    return title
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

