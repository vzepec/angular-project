import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditMovieModalComponent } from './edit-movie-modal.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { Movie } from '../models/movie.model'; // Importa el modelo de película

describe('EditMovieModalComponent', () => {
  let component: EditMovieModalComponent;
  let fixture: ComponentFixture<EditMovieModalComponent>;
  let dialogRefMock: MatDialogRef<EditMovieModalComponent>;

  beforeEach(async () => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [EditMovieModalComponent],
      imports: [FormsModule], // Agrega FormsModule al arreglo imports
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { movie: new Movie("1", 'Test Movie', '2023', 'Action') } }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditMovieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the movie property with a clone of the data.movie', () => {
    expect(component.movie).toEqual(component.data.movie);
  });

  it('should call dialogRef.close() when onCancel is called', () => {
    component.onCancel();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should call dialogRef.close() with the movie object when onSave is called', () => {
    const updatedTitle = 'Updated Movie Title';
    component.movie.title = updatedTitle;
    component.onSave();
    expect(dialogRefMock.close).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: updatedTitle
      })
    );
  });

  it('should format the title correctly', () => {
    const formattedTitle = component.formatTitle("test movie");
    expect(formattedTitle).toBe("Test Movie");
  });
});