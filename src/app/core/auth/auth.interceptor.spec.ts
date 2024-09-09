import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor'; // Assicurati che il percorso sia corretto

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useValue: AuthInterceptor,
          multi: true
        }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header with token if available', () => {
    const token = 'test-token';
    spyOn(localStorage, 'getItem').and.returnValue(token);

    httpClient.get('https://gorest.co.in/public/v2/users').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('https://gorest.co.in/public/v2/users');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush({});
  });

  it('should not add Authorization header if token is not available', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    httpClient.get('https://gorest.co.in/public/v2/users').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('https://gorest.co.in/public/v2/users');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });
});
