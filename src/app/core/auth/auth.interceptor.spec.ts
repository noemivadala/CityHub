import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClient(withInterceptors([AuthInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController .verify();
  });

  it('should add Authorization header with token if available', () => {
    const token = 'test-token';
    spyOn(localStorage, 'getItem').and.returnValue(token);

    httpClient.get('https://gorest.co.in/public/v2/users').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/users');
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

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/users');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });
});
