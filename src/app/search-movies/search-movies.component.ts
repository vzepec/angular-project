import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImdbService } from '../services/imdb.service';

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
        this.result = data.data;
        this.search = ''
        this.searchResult.emit(this.result);
      },
      error => {
        console.error('Error fetching popular movies', error);

      }
    );
  }

}
