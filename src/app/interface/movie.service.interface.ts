import { Observable } from 'rxjs';

export interface MovieServiceInterface {
    getPopularMovies(): Observable<any>;
    searchMovies(query: string): Observable<any>
}
