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

  //se è disponibile
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
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
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.tokenKey);
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem(this.tokenKey);
      return !!token;
    }
    return false;
  }

}
