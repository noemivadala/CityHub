import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'HTTP_INTERCEPTORS',
          useValue: authInterceptor,
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

  it('should add Authorization header if token is present in localStorage', () => {
    // simula token
    const token = 'test-token';
    spyOn(localStorage, 'getItem').and.returnValue(token);

    httpClient.get('/test').subscribe();

    const httpRequest = httpMock.expectOne('/test');

    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });

  it('should not add Authorization header if token is not present in localStorage', () => {
    // assenza token
    spyOn(localStorage, 'getItem').and.returnValue(null);

    httpClient.get('/test').subscribe();

    const httpRequest = httpMock.expectOne('/test');

    expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
  });

  it('should pass the request to the next handler unchanged if no token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    httpClient.get('/test').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne('/test');
    httpRequest.flush({ data: 'test' });

    expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
  });

  it('should clone the request and add the Authorization header if token is present', () => {
    const token = 'test-token';
    spyOn(localStorage, 'getItem').and.returnValue(token);

    httpClient.get('/test').subscribe();

    const httpRequest = httpMock.expectOne('/test');

    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });
});
