import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() searchResult = new EventEmitter<any>();

  constructor(private imdbService: ImdbService) { }

  ngOnInit(): void { }

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
  }

}
