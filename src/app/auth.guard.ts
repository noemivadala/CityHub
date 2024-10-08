import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.authService.validateToken(token).pipe(
      map(isValid => {
        if (!isValid) {
          this.router.navigate(['/login']);
        }
        return isValid;
      })
    );
  }
}
