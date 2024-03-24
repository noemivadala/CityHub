import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class GorestService {

  constructor( private http: HttpClient ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://gorest.co.in/public/v2/users');
  }

  getDetailUser(id: number): Observable<User[]> {
    return this.http.get<User[]>( `https://gorest.co.in/public/v2/users/${id}`);
  }
  
  editUser(editUser: User): Observable<User[]> {
    return this.http.put<User[]>( `https://gorest.co.in/public/v2/users/${editUser.id}`, editUser);
  }

  deleteUser(id: number): Observable<User[]> {
    return this.http.delete<User[]>( `https://gorest.co.in/public/v2/users/${id}`);
  }

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>('https://gorest.co.in/public/v2/posts');
  }

}
