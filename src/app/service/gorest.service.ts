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

  //user
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://gorest.co.in/public/v2/users', { headers: this.getHeaders() });
  }

  getDetailUser(id: number): Observable<User> {
    return this.http.get<User>(`https://gorest.co.in/public/v2/users/${id}`, { headers: this.getHeaders() });
  }

  createUser(newUser: User): Observable<User> {
    const url = `https://gorest.co.in/public/v2/users/`;
    return this.http.post<User>(url, newUser, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    const url = `https://gorest.co.in/public/v2/users/${id}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }

  //post
  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>('https://gorest.co.in/public/v2/posts', { headers: this.getHeaders() });
  }

  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`https://gorest.co.in/public/v2/users/${userId}/posts/`, { headers: this.getHeaders() });
  }

  addPost(newPost: Post): Observable<Post> {
    const url = `https://gorest.co.in/public/v2/users/${newPost.user_id}/posts`;
    return this.http.post<Post>(url, newPost, { headers: this.getHeaders() });
  }

  getPostDetail(postId: number): Observable<Post> {
    const url = `https://gorest.co.in/public/v2/posts/${postId}`;
    return this.http.get<Post>(url, { headers: this.getHeaders() });
  }

  //comment
  getPostComment(postId: number): Observable<Comment[]> {
    const url = `https://gorest.co.in/public/v2/posts/${postId}/comments`;
    return this.http.get<Comment[]>(url, { headers: this.getHeaders() });
  }

  addComment(postId: number, comment: Comment): Observable<Comment> {
    const url = `https://gorest.co.in/public/v2/posts/${postId}/comments`;
    return this.http.post<Comment>(url, comment, { headers: this.getHeaders() });
  }

}
