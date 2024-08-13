import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchMoviesComponent } from './search-movies.component';
import { ImdbService } from '../services/imdb.service';
import { Movie } from '../models/movie.model';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('SearchMoviesComponent', () => {
  let component: SearchMoviesComponent;
  let fixture: ComponentFixture<SearchMoviesComponent>;
  let mockImdbService: jasmine.SpyObj<ImdbService>;
  let mockRenderer: jasmine.SpyObj<Renderer2>;
  let mockSearchInput: jasmine.SpyObj<ElementRef>;

  beforeEach(async () => {
    mockImdbService = jasmine.createSpyObj('ImdbService', ['searchMovies']);
    mockRenderer = jasmine.createSpyObj('Renderer2', ['nativeElement']);
    mockSearchInput = jasmine.createSpyObj('ElementRef', ['nativeElement']);

    await TestBed.configureTestingModule({
      declarations: [SearchMoviesComponent],
      providers: [
        { provide: ImdbService, useValue: mockImdbService },
        { provide: Renderer2, useValue: mockRenderer },
        { provide: ElementRef, useValue: mockSearchInput },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('llamado a getPopularMovies y emit searchResult on success', () => {
    const mockData = {
      data: [
        { id: '1', title: 'Movie 1', year: "2023", image: 'image1.jpg' },
        { id: '2', title: 'Movie 2', year: "2022", image: 'image2.jpg' },
      ],
    };
    const expectedResult: Movie[] = [
      new Movie('1', 'Movie 1', "2023", 'image1.jpg'),
      new Movie('2', 'Movie 2', "2022", 'image2.jpg'),
    ];

    component.search = 'test';
    mockImdbService.searchMovies.and.returnValue(of(mockData));

    spyOn(component.searchResult, 'emit');

    component.getPopularMovies();

    expect(mockImdbService.searchMovies).toHaveBeenCalledWith('test');
    expect(component.result).toEqual(jasmine.arrayWithExactContents(expectedResult));
    expect(component.search).toEqual('');
    expect(component.searchResult.emit).toHaveBeenCalledWith(expectedResult);
  });

  it('llamado a getPopularMovies y manejo de error', () => {
    const mockError = new Error('Error fetching movies');

    component.search = 'test';
    mockImdbService.searchMovies.and.returnValue(throwError(() => mockError));

    spyOn(console, 'error');

    component.getPopularMovies();

    expect(mockImdbService.searchMovies).toHaveBeenCalledWith('test');
    expect(console.error).toHaveBeenCalledWith('Error fetching popular movies', mockError);
  });

});