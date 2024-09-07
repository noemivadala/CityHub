import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor'; // Assicurati che il percorso sia corretto
import { AuthService } from '../../service/auth.service';

describe('AuthService', () => {
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
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
    spyOn(localStorage, 'getItem').and.returnValue(validToken);

    authService.validateToken(validToken).subscribe(response => {
      expect(response).toBeTrue();
    });

    const req = httpMock.expectOne('https://gorest.co.in/public/v2/users');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: userId }]);

    expect(authService.saveUserId).toHaveBeenCalledWith(userId);
  });

  it('should handle validation error correctly and return false', () => {
    const invalidToken = 'invalid-token';
    spyOn(localStorage, 'getItem').and.returnValue(invalidToken);

    authService.validateToken(invalidToken).subscribe(response => {
      expect(response).toBeFalse();
    });

    const req = httpMock.expectOne('https://gorest.co.in/public/v2/users');
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 401, statusText: 'Unauthorized' });
  });
});
