import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../core/auth/auth.interceptor';

describe('AuthService', () => {
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Usa `useClass` qui
      ]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call saveUserId with a valid userId if validateToken succeeds', () => {
    const userId = 12345;
    spyOn(authService, 'saveUserId');

    const validToken = 'valid-token';

    authService.validateToken(validToken).subscribe(response => {
      expect(response).toBeTrue();
    });

    const req = httpMock.expectOne(request =>
      request.method === 'GET' &&
      request.url === 'https://gorest.co.in/public/v2/users' &&
      request.params.get('access-token') === validToken
    );

    expect(req.request.method).toBe('GET');
    req.flush([{ id: userId }]);

    expect(authService.saveUserId).toHaveBeenCalledWith(userId);
  });

  it('should handle validation error correctly and return false', () => {
    const invalidToken = 'invalid-token';

    authService.validateToken(invalidToken).subscribe(response => {
      expect(response).toBeFalse();
    });

    const req = httpMock.expectOne(request =>
      request.method === 'GET' &&
      request.url === 'https://gorest.co.in/public/v2/users' &&
      request.params.get('access-token') === invalidToken
    );

    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 401, statusText: 'Unauthorized' });
  });
});
