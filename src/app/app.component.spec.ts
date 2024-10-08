import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { ImdbService } from './services/imdb.service';
import { Movie } from './models/movie.model';
import { Renderer2 } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddMovieModalComponent } from './add-movie-modal/add-movie-modal.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let imdbServiceSpy: jasmine.SpyObj<ImdbService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let renderer2Spy: jasmine.SpyObj<Renderer2>;

  beforeEach(async () => {
    const imdbSpy = jasmine.createSpyObj('ImdbService', ['getPopularMovies']);
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    const rendererSpy = jasmine.createSpyObj('Renderer2', ['setAttribute', 'removeAttribute']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [MatDialogModule, NoopAnimationsModule],
      providers: [
        { provide: ImdbService, useValue: imdbSpy },
        { provide: MatDialog, useValue: dialogMock },
        { provide: Renderer2, useValue: rendererSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    imdbServiceSpy = TestBed.inject(ImdbService) as jasmine.SpyObj<ImdbService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    renderer2Spy = TestBed.inject(Renderer2) as jasmine.SpyObj<Renderer2>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Se setea isLoading como true y se llama a getPopularMovies en ngOnInit', () => {
    spyOn(component, 'getPopularMovies');
    component.ngOnInit();
    expect(component.isLoading).toBeTrue();
    expect(component.getPopularMovies).toHaveBeenCalled();
  });

  it('Se verifica y setea imagen en verifyImage()', () => {
    const movies: Movie[] = [
      { id: '1', title: 'Movie 1', year: "2020", img: '' },
      { id: '2', title: 'Movie 2', year: "2021", img: 'https://example.com/image.jpg' },
      { id: '3', title: 'Movie 3', year: "2022", img: 'invalid-url' }
    ];

    component.verifyImage(movies);

    expect(movies[0].img).toBe(component.imageNotFound);
    expect(movies[1].img).toBe('https://example.com/image.jpg');
    expect(movies[2].img).toBe(component.imageNotFound);
  });

  it('Se actualiza popularMovies y isLoading cuando onSearchResult es llamado', () => {
    const searchResult = [
      { id: '1', title: 'Movie 1', year: "2020", img: 'https://example.com/image.jpg' }
    ];

    component.onSearchResult(searchResult);

    expect(component.popularMovies).toEqual(searchResult);
    expect(component.isLoading).toBeFalse();
  });

  it('se obtienen peliculas populares y se actualiza el estado en getPopularMovies', () => {
    const mockMovies = {
      data: {
        list: [
          { title: { id: '1', titleText: { text: 'Movie 1' }, releaseYear: { year: "2020" }, primaryImage: { imageUrl: 'https://example.com/image.jpg' } } },
        ]
      }
    };

    imdbServiceSpy.getPopularMovies.and.returnValue(of(mockMovies));
    component.getPopularMovies();

    expect(imdbServiceSpy.getPopularMovies).toHaveBeenCalled();
    expect(component.popularMovies.length).toBe(1);
    expect(component.isLoading).toBeFalse();
  });

  it('manejo de error en getPopularMovies', () => {
    imdbServiceSpy.getPopularMovies.and.returnValue(throwError('error'));
    component.getPopularMovies();

    expect(component.isLoading).toBeFalse();
    expect(component.popularMovies.length).toBe(0);
  });

  it('se abre AddMovieModalComponent cuando onAdd es ejecutado', () => {
    component.popularMovies = []
    const newMovie = { id: '1', title: 'New Movie', year: 2023, img: 'https://example.com/image.jpg' };
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(newMovie) });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    component.onAdd();
    expect(dialogSpy.open).toHaveBeenCalledWith(AddMovieModalComponent, { width: '500px' });
    expect(component.popularMovies.length).toBe(1);
    expect(component.popularMovies[0]).toEqual(newMovie);
  });

  it('se abre EditMovieModalComponent y actualiza pelicula en onEdit()', () => {
    const movie = new Movie('1', 'Movie 1', "2020", 'https://example.com/image.jpg');
    component.popularMovies = [movie];

    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({ id: '1', title: 'Edited Movie', year: "2020", img: 'https://example.com/edited.jpg' }) });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    component.onEdit('1');

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(component.popularMovies[0].title).toBe('Edited Movie');
  });

  it('se borra pelicula cuando onDelete() es ejecutado', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.popularMovies = [
      new Movie('1', 'Movie 1', "2020", 'https://example.com/image.jpg')
    ];

    component.onDelete('1');

    expect(component.popularMovies.length).toBe(0);
  });

});
