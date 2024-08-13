import { Component } from '@angular/core';
import { ImdbService } from './services/imdb.service';
import { Movie } from './models/movie.model'
import { delay } from 'rxjs/operators';

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

  onEdit(id: string) {

  }
  onDelete(id: string) {

  }
}
