import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service'; // Assicurati che il percorso sia corretto
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useValue: {} }] // Mock Router
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call saveUserId with a valid userId if validateToken succeeds', () => {
    const token = 'validToken';
    const mockResponse = [{ id: 123 }];

    spyOn(service, 'saveUserId'); // Spy sulla funzione saveUserId

    service.validateToken(token).subscribe(isValid => {
      expect(isValid).toBeTrue(); // Verifica che la risposta sia true
      expect(service.saveUserId).toHaveBeenCalledWith(123); // Verifica che saveUserId sia stato chiamato con l'id corretto
    });

    const req = httpMock.expectOne((req) => 
      req.url === 'https://gorest.co.in/public/v2/users' &&
      req.params.get('access-token') === token
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Rispondi alla richiesta HTTP con il mockResponse
  });

  it('should not call saveUserId if validateToken fails', () => {
    const token = 'invalidToken';
    spyOn(service, 'saveUserId');

    service.validateToken(token).subscribe(isValid => {
      expect(isValid).toBeFalse(); // Verifica che la risposta sia false
      expect(service.saveUserId).not.toHaveBeenCalled(); // Verifica che saveUserId non sia stato chiamato
    });

    const req = httpMock.expectOne((req) => 
      req.url === 'https://gorest.co.in/public/v2/users' &&
      req.params.get('access-token') === token
    );
    expect(req.request.method).toBe('GET');
    req.flush([], { status: 401, statusText: 'Unauthorized' }); // Rispondi con un errore 401
  });
});
