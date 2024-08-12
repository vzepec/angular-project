import { Component } from '@angular/core';
import { ImdbService } from './services/imdb.service';
import { Movie } from './models/movie.model'
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

  constructor(private imdbService: ImdbService) { }

  ngOnInit(): void {
    this.getPopularMoviesMock()
  }

  onSearchResult(result: any): void {
    this.popularMovies = result;
    console.log('Search result received in AppComponent:', this.popularMovies);
  }

  getPopularMovies(): void {
    this.imdbService.getPopularMovies().subscribe(
      data => {
        this.popularMovies = data.data.list.map((movieData: any) => {
          return new Movie(
            movieData.title.titleText.text,
            movieData.title.releaseYear.year,
            movieData.title.primaryImage.imageUrl
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
    this.imdbService.getPopularMoviesMock().subscribe(
      data => {
        this.popularMovies = data.data.list.map((movieData: any) => {
          return new Movie(
            movieData.title.titleText.text,
            movieData.title.releaseYear.year,
            movieData.title.primaryImage.imageUrl
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

  onLogoClick(): void {
    this.getPopularMoviesMock()
  }
}
