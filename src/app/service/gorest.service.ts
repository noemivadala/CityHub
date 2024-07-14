import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GorestService {
  
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  constructor( private http: HttpClient, private authService: AuthService ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://gorest.co.in/public/v2/users');
  }

  getDetailUser(id: number): Observable<User> {
    return this.http.get<User>( `https://gorest.co.in/public/v2/users/${id}`);
  }

  createUser(newUser: User): Observable<User> {
    const url = `https://gorest.co.in/public/v2/users/`;
    return this.http.post<User>(url, newUser, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    const url = `https://gorest.co.in/public/v2/users/${id}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>('https://gorest.co.in/public/v2/posts');
  }

  getPostDetail(postId: number): Observable<Post> {
    return this.http.get<Post>(`https://gorest.co.in/public/v2/posts/${postId}`, { headers: this.getHeaders() });
  }

  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`https://gorest.co.in/public/v2/users/${userId}/posts/`);
  }

  addPost(newPost: Post): Observable<Post> {
    const url = `https://gorest.co.in/public/v2/users/${newPost.user_id}/posts`;
    return this.http.post<Post>(url, newPost, { headers: this.getHeaders() });
  }

  getPostComment(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`https://gorest.co.in/public/v2/posts/${postId}/comments`, { headers: this.getHeaders() });
  }

  addComment(postId: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`https://gorest.co.in/public/v2/posts/${postId}/comments`, comment, { headers: this.getHeaders() });
  }

}
