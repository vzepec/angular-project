import { Component } from '@angular/core';
import { ImdbService } from './services/imdb.service';
import { Movie } from './models/movie.model'
import { delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditMovieModalComponent } from './edit-movie-modal/edit-movie-modal.component';
import { AddMovieModalComponent } from './add-movie-modal/add-movie-modal.component';

import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-project';
  popularMovies: any;
  searchResult: any;
  isLoading = true;

  constructor(private imdbService: ImdbService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPopularMoviesMock()
  }

  onSearchResult(result: any): void {
    this.popularMovies = []
    this.isLoading = true
    this.popularMovies = result;
    if (this.popularMovies) {
      this.isLoading = false
    }
  }

  getPopularMovies(): void {
    this.isLoading = true;
    this.popularMovies = []
    this.imdbService.getPopularMovies().subscribe(
      data => {
        this.popularMovies = data.data.list.map((movieData: any) => {
          return new Movie(
            movieData.title.id,
            movieData.title.titleText.text,
            movieData.title.releaseYear.year,
            movieData.title.primaryImage.imageUrl,
          );
        });
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching popular movies', error);
        this.isLoading = false;
      }
    );
  }

  getPopularMoviesMock(): void {
    this.isLoading = true;
    this.popularMovies = [];
    this.imdbService.getPopularMoviesMock().pipe(
      delay(2000)
    ).subscribe(
      data => {
        this.popularMovies = data.data.list.map((movieData: any) => {
          return new Movie(
            movieData.title.id,
            movieData.title.titleText.text,
            movieData.title.releaseYear.year,
            movieData.title.primaryImage.imageUrl
          );
        });
        console.log(this.popularMovies);
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching popular movies', error);
        this.isLoading = false;
      }
    );
  }

  onLogoClick(): void {
    this.getPopularMoviesMock()
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(AddMovieModalComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log("se agrega peli");
        this.popularMovies.unshift(result)
        console.log(this.popularMovies);

      }
    });
  }

  onEdit(id: string): void {
    const movieList = cloneDeep(this.popularMovies)
    const movie = movieList.find((m: any) => m.id === id);

    const dialogRef = this.dialog.open(EditMovieModalComponent, {
      width: '500px',
      data: { movie }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        const index = this.popularMovies.findIndex((m: any) => m.id === result.id);
        if (index > -1) {
          this.popularMovies[index] = result;
        }
      }
    });
  }
  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      const index = this.popularMovies.findIndex((m: any) => m.id === id);
      if (index > -1) {
        // Elimina la película de la lista
        this.popularMovies.splice(index, 1);
      }
    }
  }
}
