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
  
  it('should not submit form if invalid', () => {
    goRestService.addComment.calls.reset();
    spyOn(component.commentAdded, 'emit');

    component.comment = { name: '', email: '', body: '' };
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.directive(NgForm)).componentInstance as NgForm;

    // Simula l'invio del form invalido
    component.onSubmit(form);

    // Verifica che il servizio non sia stato chiamato
    expect(goRestService.addComment).not.toHaveBeenCalled();
    // Verifica che l'evento non sia stato emesso
    expect(component.commentAdded.emit).not.toHaveBeenCalled();
  });
});
