import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'gorest-token';

  constructor(private http: HttpClient, private router: Router) { }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  validateToken(token: string): Observable<boolean> {
    return this.http.get('https://gorest.co.in/public/v2/users', {
      params: { 'access-token': token }
    }).pipe(
      map(response => true),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return of(false);
        }
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(this.tokenKey);
      return !!token;
    } else {
      return false;
    }
  }

}
