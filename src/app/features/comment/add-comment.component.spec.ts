import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { AddCommentComponent } from './add-comment.component';
import { GorestService } from '../../service/gorest.service';
import { Comment } from '../../models/comment';
import { By } from '@angular/platform-browser';

const mockComment: Comment = {
  id: 1,
  post_id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  body: 'This is a comment'
};

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;
  let goRestService: jasmine.SpyObj<GorestService>;

  beforeEach(async () => {
    const goRestServiceSpy = jasmine.createSpyObj('GorestService', ['addComment']);
    goRestServiceSpy.addComment.and.returnValue(of(mockComment));

    await TestBed.configureTestingModule({
      imports: [FormsModule, AddCommentComponent],
      providers: [
        { provide: GorestService, useValue: goRestServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCommentComponent);
    component = fixture.componentInstance;
    goRestService = TestBed.inject(GorestService) as jasmine.SpyObj<GorestService>;

    // imposta i dati del commento iniziale
    component.postId = 1;
    component.comment = {
      name: 'Alice',
      email: 'alice@example.com',
      body: 'This is a comment'
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit commentAdded event and reset form on successful submit', async () => {
    spyOn(component.commentAdded, 'emit');
    
    const form = fixture.debugElement.query(By.directive(NgForm)).componentInstance as NgForm;
    
    // verifica che il form sia valido
    expect(form.valid).toBeTruthy();

    // simula l'invio del form
    component.onSubmit(form);

    // aspetta la stabilizzazione dell'asincrono
    await fixture.whenStable();  
    
    // verifica che il servizio sia stato chiamato con i parametri corretti
    expect(goRestService.addComment).toHaveBeenCalledWith(1, jasmine.objectContaining({
      name: 'Alice',
      email: 'alice@example.com',
      body: 'This is a comment'
    }));

    // verifica che l'evento commentAdded sia stato emesso con il commento corretto
    expect(component.commentAdded.emit).toHaveBeenCalledWith(jasmine.objectContaining({
      id: 1,
      post_id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      body: 'This is a comment'
    }));

    // verifica che il form sia stato resettato
    expect(component.comment).toEqual({ name: '', email: '', body: '' });
    fixture.detectChanges();  
    expect(form.valid).toBeFalsy();  // il form dovrebbe essere invalido dopo il reset
  });

  it('should not submit form if invalid', () => {
    // reset delle chiamate
    goRestService.addComment.calls.reset();
    spyOn(component.commentAdded, 'emit');

    // rendi il form invalido
    component.comment = { name: '', email: '', body: '' };
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.directive(NgForm)).componentInstance as NgForm;

    // simula l'invio del form invalido
    component.onSubmit(form);

    // verifica che il servizio non sia stato chiamato
    expect(goRestService.addComment).not.toHaveBeenCalled();
    // verifica che l'evento non sia stato emesso
    expect(component.commentAdded.emit).not.toHaveBeenCalled();
  });
});
