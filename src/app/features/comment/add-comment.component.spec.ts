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

    //postId e i dati del commento
    component.postId = 1;
    component.comment = {
      name: 'Alice',
      email: 'alice@example.com',
      body: 'This is a comment'
    };
    
    fixture.detectChanges();  //dati inizializzati
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit commentAdded event and reset form on successful submit', () => {
    spyOn(component.commentAdded, 'emit');

    const form = fixture.debugElement.query(By.directive(NgForm)).componentInstance as NgForm;

    //form valido
    expect(form.valid).toBeTruthy();

    component.onSubmit(form);

    const expectedComment: Comment = {
      ...mockComment,
      post_id: component.postId
    };

    expect(goRestService.addComment).toHaveBeenCalledWith(1, expectedComment);
    expect(component.commentAdded.emit).toHaveBeenCalledWith(mockComment);
    expect(component.comment).toEqual({ name: '', email: '', body: '' });
  });

  it('should not submit form if invalid', () => {
    goRestService.addComment.calls.reset();
    spyOn(component.commentAdded, 'emit');

    //form invalido
    component.comment = { name: '', email: '', body: '' };
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.directive(NgForm)).componentInstance as NgForm;

    component.onSubmit(form);

    expect(goRestService.addComment).not.toHaveBeenCalled();
    expect(component.commentAdded.emit).not.toHaveBeenCalled();
  });
});
