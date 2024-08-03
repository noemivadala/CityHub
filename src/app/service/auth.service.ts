import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'gorest-token';
  private userIdKey = 'gorest-user-id';

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

  // salvo il token
  saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // recupero il token
  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }


  // salvo l'user_id
  saveUserId(userId: number): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.userIdKey, userId.toString());
    }
  }

  getUserId(): number {
    if (this.isLocalStorageAvailable()) {
      const userId = localStorage.getItem(this.userIdKey);
      return userId ? parseInt(userId, 10) : this.generateRandomUserId();
    }
    return this.generateRandomUserId();
  }

  generateRandomUserId(): number {
    return Math.floor(Math.random() * 10000) + 1;
  }

  validateToken(token: string): Observable<boolean> {
    return this.http.get<any[]>('https://gorest.co.in/public/v2/users', {
      params: { 'access-token': token }
    }).pipe(
      map((response: any[]) => {
        if (response.length > 0) {
          const userId = response[0]?.id;
          if (userId) {
            this.saveUserId(userId); // salvataggio user_id
            return true;
          }
        }
        console.error('No valid user ID found in the response.');
        return false;
      }),
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
      localStorage.removeItem(this.userIdKey);
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
