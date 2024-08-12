import { Component } from '@angular/core';
import { ImdbService } from './services/imdb.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-project';
  popularMovies: any;
  isLoading = true;

  constructor(private imdbService: ImdbService) { }

  ngOnInit(): void {
    this.getPopularMovies()
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
