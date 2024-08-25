import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SearchComponent] // Importa il componente standalone
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger iniziale della visualizzazione
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica se il componente viene creato correttamente
  });

  it('should emit searchChanged event when input value changes', () => {
    spyOn(component.searchChanged, 'emit'); // Spy sull'evento searchChanged

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    // Simula l'inserimento di testo nel campo di input
    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.searchChanged.emit).toHaveBeenCalledWith('test'); // Verifica se l'evento viene emesso con il valore corretto
  });

  it('should call emitSearch when input event occurs', () => {
    spyOn(component, 'emitSearch'); // Spy sulla funzione emitSearch

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    // Simula l'inserimento di testo nel campo di input
    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.emitSearch).toHaveBeenCalledWith('test'); // Verifica se emitSearch viene chiamata con il valore corretto
  });
});
