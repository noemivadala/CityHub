import { HttpRequest, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> => {
  const token = localStorage.getItem('gorest-token');
  
  if (token) {
    const cloneReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloneReq);
  }

  return next(req);
};
