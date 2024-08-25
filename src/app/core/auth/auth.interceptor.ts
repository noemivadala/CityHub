import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('gorest-token') : null;

    if (token) {
      const cloneReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(cloneReq);
    }

    return next.handle(req);
  }
}
