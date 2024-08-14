import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImdbService } from './imdb.service';
import { MOCK_POPULAR_MOVIES, MOCK_SEARCH_MOVIE } from '../mocks/mock-data';

describe('ImdbService', () => {
  let service: ImdbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImdbService]
    });

    service = TestBed.inject(ImdbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('llamado para obtener peliculas', () => {
    service.getPopularMovies().subscribe(data => {
      expect(data).toEqual(MOCK_POPULAR_MOVIES);
    });

    const req = httpMock.expectOne('https://imdb188.p.rapidapi.com/api/v1/getPopularMovies');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('x-rapidapi-key')).toBe('9e079d2e1dmsha3680fe87b5810fp13a10djsn1bd5c60abc3d');
    expect(req.request.headers.get('x-rapidapi-host')).toBe('imdb188.p.rapidapi.com');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(MOCK_POPULAR_MOVIES);
  });

  it('llamado para buscar peliculas', () => {
    const query = 'The Shawshank Redemption';
    service.searchMovies(query).subscribe(data => {
      expect(data).toEqual(MOCK_SEARCH_MOVIE);
    });

    const req = httpMock.expectOne('https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=The%20Shawshank%20Redemption');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-rapidapi-key')).toBe('9e079d2e1dmsha3680fe87b5810fp13a10djsn1bd5c60abc3d');
    expect(req.request.headers.get('x-rapidapi-host')).toBe('imdb188.p.rapidapi.com');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(MOCK_SEARCH_MOVIE);
  });

});