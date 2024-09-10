import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { GorestService } from '../../service/gorest.service';
import { Post } from '../../models/post';
import { Comment } from '../../models/comment';
import { AddCommentComponent } from './add-comment.component';
import { CommonModule } from '@angular/common';
import { convertToParamMap } from '@angular/router';
import CommentComponent from './comment.component';

// data
const mockPost: Post = { id: 1, user_id: 1, title: 'Post Title', body: 'Post Body' };
const mockComments: Comment[] = [
  { id: 1, post_id: 1, name: 'Alice', email: 'alice@example.com', body: 'Comment by Alice' },
  { id: 2, post_id: 1, name: 'Bob', email: 'bob@example.com', body: 'Comment by Bob' }
];

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let goRestService: jasmine.SpyObj<GorestService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const goRestServiceSpy = jasmine.createSpyObj('GorestService', ['getPostDetail', 'getPostComment']);
    goRestServiceSpy.getPostDetail.and.returnValue(of(mockPost));
    goRestServiceSpy.getPostComment.and.returnValue(of(mockComments));

    const activatedRouteStub = {
      snapshot: { paramMap: convertToParamMap({ postId: '1' }) }
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CommonModule, AddCommentComponent, CommentComponent],
      providers: [
        { provide: GorestService, useValue: goRestServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    goRestService = TestBed.inject(GorestService) as jasmine.SpyObj<GorestService>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    // Simula i parametri della rotta
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve post details and comments on init', () => {
    fixture.detectChanges();

    expect(goRestService.getPostDetail).toHaveBeenCalledWith(1);
    expect(goRestService.getPostComment).toHaveBeenCalledWith(1);

    expect(component.post).toEqual(mockPost);
    expect(component.comments).toEqual(mockComments);
  });

  it('should add a new comment', () => {
    const newComment: Comment = { id: 3, post_id: 1, name: 'Charlie', email: 'charlie@example.com', body: 'Comment by Charlie' };

    component.CommentAdd(newComment);

    expect(component.comments.length).toBe(3);
    expect(component.comments[2]).toEqual(newComment);
  });

  it('should get the first letter of a name in uppercase', () => {
    const name = 'Alice';
    const firstLetter = component.getNameLetter(name);

    expect(firstLetter).toBe('A');
  });
});
