import { Component, OnInit, Output, EventEmitter, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ImdbService } from '../services/imdb.service';
import { Movie } from '../models/movie.model'

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.css'],
})


export class SearchMoviesComponent implements OnInit {
  search = '';
  result = '';

  @ViewChild('searchInput') searchInput!: ElementRef;
  @Output() searchResult = new EventEmitter<any>();

  constructor(private imdbService: ImdbService, private renderer: Renderer2) { }

  ngOnInit(): void { }

  private removeInputFocus(): void {
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.blur(); // Eliminar el foco del input
      }
    }, 0);
  }

  getPopularMovies(): void {
    this.imdbService.searchMovies(this.search).subscribe(
      data => {
        console.log(data);
        this.result = data.data.map((movieData: any) => {
          return new Movie(movieData.id, movieData.title, movieData.year, movieData.image);
        });
        this.search = ''
        this.searchResult.emit(this.result);
      },
      error => {
        console.error('Error fetching popular movies', error);

      }
    );
    this.removeInputFocus();
  }

  getPopularMoviesMock(): void {
    this.imdbService.searchMoviesMock(this.search).subscribe(
      data => {
        console.log(data);

        this.result = data.data.map((movieData: any) => {
          return new Movie(
            movieData.id,
            movieData.title,
            movieData.year,
            movieData.image
          );
        });
        this.search = ''
        this.searchResult.emit(this.result);
      },
      error => {
        console.error('Error fetching popular movies', error);

      }
    );
    this.removeInputFocus();
  }

}
