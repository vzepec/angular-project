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

  it('Inicializa movie con un clon de data.movie', () => {
    expect(component.movie).toEqual(component.data.movie);
  });

  it('llamado a dialogRef.close() cuando onCancel es ejecutado', () => {
    component.onCancel();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('llamado a dialogRef.close() con el objeto movie cuando onSave es ejecutado', () => {
    const updatedTitle = 'Updated Movie Title';
    component.movie.title = updatedTitle;
    component.onSave();
    expect(dialogRefMock.close).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: updatedTitle
      })
    );
  });

  it('formateo del titulo', () => {
    const formattedTitle = component.formatTitle("test movie");
    expect(formattedTitle).toBe("Test Movie");
  });
});