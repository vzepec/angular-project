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
    this.getPopularMovies()
  }

  onSearchResult(result: any): void {
    this.searchResult = result;
    console.log('Search result received in AppComponent:', this.searchResult);
  }

  getPopularMovies(): void {
    this.imdbService.getPopularMovies().subscribe(
      data => {
        this.popularMovies = data.data.list;
        console.log(this.popularMovies);
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching popular movies', error);
        this.isLoading = false;
      }
    );
  }
}
