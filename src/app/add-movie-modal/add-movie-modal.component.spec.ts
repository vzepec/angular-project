import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMovieModalComponent } from './add-movie-modal.component';
import { Movie } from '../models/movie.model'
import { FormsModule } from '@angular/forms';

describe('AddMovieModalComponent', () => {
  let component: AddMovieModalComponent;
  let fixture: ComponentFixture<AddMovieModalComponent>;
  let dialogRefMock: MatDialogRef<AddMovieModalComponent>; // Mock para MatDialogRef

  beforeEach(async () => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']); // Crea un mock para MatDialogRef

    await TestBed.configureTestingModule({
      declarations: [AddMovieModalComponent],
      imports: [FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} } // Provee MAT_DIALOG_DATA
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddMovieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia llamar a dialogRef.close() cuando onCancel es ejecutado', () => {
    component.onCancel();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('deberia llamar a dialogRef.close() con el objeto de la pelicua cuando onSave es ejecutado', () => {
    const mockMovie = new Movie("123", "Test Movie", "2023", "Action");
    component.movie = mockMovie;
    component.onSave();
    expect(dialogRefMock.close).toHaveBeenCalledWith(mockMovie);
  });

  it('deberia formatear el titulo correctamente', () => {
    const formattedTitle = component.formatTitle("test movie");
    expect(formattedTitle).toBe("Test Movie");
  });
});
