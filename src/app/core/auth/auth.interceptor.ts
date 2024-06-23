import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authToken = '72762c3059a7a2a9bc5c8b5e5cd50ccef480ff929908c0f2abba3aeee3d2c384';
  const router = inject(Router)
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });


  return next(authReq)
  .pipe(
    catchError(err => {
      if (err instanceof HttpErrorResponse) {
        console.log('error', err.status)
        switch (err.status) {
          case 401:
            console.log('non sei autorizzato')
            router.navigateByUrl('login')
            break;
          case 404:
            console.log('Risorsa non trovata')
            break;
          default:
            console.log('Errore generico', err.status)
            break;
        }
      }
      return of(err);
    })
  )
};
