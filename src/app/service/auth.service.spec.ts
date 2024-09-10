import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should save and retrieve token correctly', () => {
    const token = 'test-token';
    authService.saveToken(token);
    expect(authService.getToken()).toBe(token);
  });

  it('should save and retrieve userId correctly', () => {
    const userId = 5001;
    authService.saveUserId(userId);
    expect(authService.getUserId()).toBe(userId);
  });

  it('should generate a random userId if not in local storage', () => {
    // Simula Math.random() per restituire 0.5
    spyOn(Math, 'random').and.returnValue(0.5);
    // Verifica che il valore generato sia quello atteso
    expect(authService.getUserId()).toBe(5001);
  });

  it('should call saveUserId with a valid userId if validateToken succeeds', () => {
    const userId = 5001;
    spyOn(authService, 'saveUserId');
  
    const validToken = 'valid-token';
    spyOn(localStorage, 'getItem').and.returnValue(validToken);
  
    authService.validateToken(validToken).subscribe(response => {
      expect(response).toBeTrue();
    });
  
    const req = httpTestingController.expectOne(request =>
      request.url === 'https://gorest.co.in/public/v2/users' &&
      request.params.get('access-token') === validToken
    );
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

    const req = httpTestingController.expectOne((request) => 
      request.url === 'https://gorest.co.in/public/v2/users' &&
      request.params.get('access-token') === invalidToken
    );

    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 401, statusText: 'Unauthorized' });
  });

});
