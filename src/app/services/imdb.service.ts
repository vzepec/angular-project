import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MOCK_POPULAR_MOVIES, MOCK_SEARCH_MOVIE } from '../mocks/mock-data';
import { MovieServiceInterface } from '../interface/movie.service.interface';

const API_BASE_URL = 'https://imdb188.p.rapidapi.com/api/v1';
const GET_POPULAR_MOVIES_URL = `${API_BASE_URL}/getPopularMovies`;
const SEARCH_MOVIES_URL = `${API_BASE_URL}/searchIMDB`;

@Injectable({
  providedIn: 'root'
})
export class ImdbService implements MovieServiceInterface {


  private headers = new HttpHeaders({
    'x-rapidapi-key': '9e079d2e1dmsha3680fe87b5810fp13a10djsn1bd5c60abc3d',
    'x-rapidapi-host': 'imdb188.p.rapidapi.com',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    return this.http.post<any>(GET_POPULAR_MOVIES_URL, {}, { headers: this.headers });
  }

  searchMovies(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get<any>(SEARCH_MOVIES_URL, { headers: this.headers, params });
  }

  // Metodos Mock de desarrollo para simular llamado a API

  /*  getPopularMoviesMock(): Observable<any> {
    return of(MOCK_POPULAR_MOVIES);
  } */


  /* searchMoviesMock(query: string): Observable<any> {
    return of(MOCK_SEARCH_MOVIE)
  }
 */
}
