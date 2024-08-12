import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {

  private apiUrl = 'https://imdb188.p.rapidapi.com/api/v1/getPopularMovies';

  private headers = new HttpHeaders({
    'x-rapidapi-key': '9e079d2e1dmsha3680fe87b5810fp13a10djsn1bd5c60abc3d',
    'x-rapidapi-host': 'imdb188.p.rapidapi.com',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    return this.http.post<any>(this.apiUrl, {}, { headers: this.headers });
  }
}
