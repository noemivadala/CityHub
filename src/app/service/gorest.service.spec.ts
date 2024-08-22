import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GorestService } from './gorest.service';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

describe('GorestService', () => {
  let service: GorestService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {

    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GorestService,
        { provide: AuthService, useValue: authServiceSpyObj }
      ]
    });

    service = TestBed.inject(GorestService);
    httpMock = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    authServiceSpy.getToken.and.returnValue('test-token');
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('User API calls', () => {
    it('should get users', () => {
      const mockUsers: User[] = [{ id: 1, name: 'John Doe', email: 'john.doe@example.com', gender: 'Male', status: 'Active' }];

      service.getUsers().subscribe(users => {
        expect(users.length).toBe(1);
        expect(users).toEqual(mockUsers);
      });

      const req = httpMock.expectOne('https://gorest.co.in/public/v2/users');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush(mockUsers);
    });

    it('should get a user detail', () => {
      const mockUser: User = { id: 1, name: 'John Doe', email: 'john.doe@example.com', gender: 'Male', status: 'Active' };

      service.getDetailUser(1).subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne('https://gorest.co.in/public/v2/users/1');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush(mockUser);
    });

    it('should create a user', () => {
      const newUser: User = { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', gender: 'Female', status: 'Inactive' };
      const mockUser: User = { ...newUser, id: 2 };

      service.createUser(newUser).subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne('https://gorest.co.in/public/v2/users/');
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush(mockUser);
    });

    it('should delete a user', () => {
      service.deleteUser(1).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('https://gorest.co.in/public/v2/users/1');
      expect(req.request.method).toBe('DELETE');
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush(null);
    });
  });

  describe('Post API calls', () => {
    it('should get posts', () => {
      const mockPosts: Post[] = [{ user_id: 1, id: 1, title: 'Post Title', body: 'Post Body' }];

      service.getPost().subscribe(posts => {
        expect(posts.length).toBe(1);
        expect(posts).toEqual(mockPosts);
      });

      const req = httpMock.expectOne('https://gorest.co.in/public/v2/posts');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush(mockPosts);
    });

    it('should get posts by user', () => {
      const mockPosts: Post[] = [{ user_id: 1, id: 1, title: 'Post Title', body: 'Post Body' }];

      service.getPostsByUser(1).subscribe(posts => {
        expect(posts.length).toBe(1);
        expect(posts).toEqual(mockPosts);
      });

      const req = httpMock.expectOne('https://gorest.co.in/public/v2/users/1/posts/');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush(mockPosts);
    });

    it('should add a post', () => {
      const newPost: Post = { user_id: 1, id: 2, title: 'New Post Title', body: 'New Post Body' };
      const mockPost: Post = { ...newPost, id: 2 };

      service.addPost(newPost).subscribe(post => {
        expect(post).toEqual(mockPost);
      });

      const req = httpMock.expectOne('https://gorest.co.in/public/v2/users/1/posts');
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush(mockPost);
    });

    it('should get post detail', () => {
      const mockPost: Post = { user_id: 1, id: 1, title: 'Post Title', body: 'Post Body' };

      service.getPostDetail(1).subscribe(post => {
        expect(post).toEqual(mockPost);
      });

      const req = httpMock.expectOne('https://gorest.co.in/public/v2/posts/1');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush(mockPost);
    });
  });

  describe('Comment API calls', () => {
    it('should get comments for a post', () => {
      const mockComments: Comment[] = [{ post_id: 1, id: 1, name: 'Commenter', email: 'commenter@example.com', body: 'Comment Body' }];

      service.getPostComment(1).subscribe(comments => {
        expect(comments.length).toBe(1);
        expect(comments).toEqual(mockComments);
      });

      const req = httpMock.expectOne('https://gorest.co.in/public/v2/posts/1/comments');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush(mockComments);
    });

    it('should add a comment', () => {
      const newComment: Comment = { post_id: 1, id: 2, name: 'Commenter', email: 'commenter@example.com', body: 'New Comment Body' };
      const mockComment: Comment = { ...newComment, id: 2 };

      service.addComment(1, newComment).subscribe(comment => {
        expect(comment).toEqual(mockComment);
      });

      const req = httpMock.expectOne('https://gorest.co.in/public/v2/posts/1/comments');
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush(mockComment);
    });
  });
});
