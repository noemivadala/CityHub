import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('gorest-token') : null;

    if (token) {
      const cloneReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      })
      return next(cloneReq)
    }
    return next(req);
};