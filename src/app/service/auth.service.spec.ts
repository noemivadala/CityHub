import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: spy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and retrieve token from localStorage', () => {
    const token = 'test-token';
    service.saveToken(token);
    expect(localStorage.getItem('gorest-token')).toBe(token);
  });

  it('should retrieve token if available in localStorage', () => {
    const token = 'test-token';
    localStorage.setItem('gorest-token', token);
    expect(service.getToken()).toBe(token);
  });

  it('should return null if token is not available in localStorage', () => {
    localStorage.removeItem('gorest-token');
    expect(service.getToken()).toBeNull();
  });

  it('should save and retrieve userId from localStorage', () => {
    const userId = 123;
    service.saveUserId(userId);
    expect(localStorage.getItem('gorest-user-id')).toBe(userId.toString());
  });

  it('should retrieve userId from localStorage if available', () => {
    const userId = 123;
    localStorage.setItem('gorest-user-id', userId.toString());
    expect(service.getUserId()).toBe(userId);
  });

  it('should generate a random userId if not available in localStorage', () => {
    spyOn(service, 'generateRandomUserId').and.returnValue(999);
    localStorage.removeItem('gorest-user-id');
    expect(service.getUserId()).toBe(999);
  });

  it('should call saveUserId with a valid userId if validateToken succeeds', () => {
    const token = 'valid-token';
    const mockResponse = [{ id: 123 }];
    
    spyOn(service, 'saveUserId').and.callThrough();
    service.validateToken(token).subscribe(isValid => {
      expect(isValid).toBeTrue();
      expect(service.saveUserId).toHaveBeenCalledWith(123);
    });

    const req = httpMock.expectOne('https://gorest.co.in/public/v2/users');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('access-token')).toBe(token);
    req.flush(mockResponse);
  });

  it('should handle validation error correctly and return false', () => {
    const token = 'invalid-token';
    const errorResponse = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });

    service.validateToken(token).subscribe(isValid => {
      expect(isValid).toBeFalse();
    });

    const req = httpMock.expectOne('https://gorest.co.in/public/v2/users');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('access-token')).toBe(token);
    req.flush(null, errorResponse);
  });

  it('should logout and navigate to login page', () => {
    spyOn(localStorage, 'removeItem');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('gorest-token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('gorest-user-id');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return true if token is present in localStorage', () => {
    localStorage.setItem('gorest-token', 'some-token');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if token is not present in localStorage', () => {
    localStorage.removeItem('gorest-token');
    expect(service.isLoggedIn()).toBeFalse();
  });

});
