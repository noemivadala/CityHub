import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { GorestService } from '../../service/gorest.service';
import { Post } from '../../models/post';
import { SearchComponent } from "../../core/components/search.component";
import { AddPostComponent } from "./add-post.component";
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import ListPostComponent from './list-post.component';

// Mock data
const mockPosts: Post[] = [
  { id: 1, user_id: 1, title: 'Post 1', body: 'Body of Post 1' },
  { id: 2, user_id: 1, title: 'Post 2', body: 'Body of Post 2' }
];

describe('ListPostComponent', () => {
  let component: ListPostComponent;
  let fixture: ComponentFixture<ListPostComponent>;
  let goRestService: jasmine.SpyObj<GorestService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const goRestServiceSpy = jasmine.createSpyObj('GorestService', ['getPost']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Importa HttpClientTestingModule
        ListPostComponent,
        RouterTestingModule,
        SearchComponent,
        AddPostComponent
      ],
      providers: [
        { provide: GorestService, useValue: goRestServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPostComponent);
    component = fixture.componentInstance;
    goRestService = TestBed.inject(GorestService) as jasmine.SpyObj<GorestService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    goRestService.getPost.and.returnValue(of(mockPosts)); // Simula il ritorno del servizio
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on init', () => {
    fixture.detectChanges(); // Triggers ngOnInit

    expect(goRestService.getPost).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
    expect(component.filteredPosts).toEqual(mockPosts);
  });

  it('should filter posts based on search term', () => {
    fixture.detectChanges(); // Ensure posts are fetched

    component.onSearchChanged('Post 1');
    fixture.detectChanges(); // Update the view

    expect(component.filteredPosts.length).toBe(1);
    expect(component.filteredPosts[0].title).toBe('Post 1');
  });

  it('should navigate to post details on viewComment', () => {
    const postId = 1;
    component.viewComment(postId);

    expect(router.navigate).toHaveBeenCalledWith(['/post', postId]);
  });

  it('should add a new post and filter posts', () => {
    const newPost: Post = { id: 3, user_id: 1, title: 'Post 3', body: 'Body of Post 3' };

    fixture.detectChanges(); // Ensure posts are fetched
    component.onPostAdded(newPost);
    fixture.detectChanges(); // Update the view

    expect(component.posts).toContain(newPost);
    expect(component.filteredPosts).toContain(newPost);
  });
});
