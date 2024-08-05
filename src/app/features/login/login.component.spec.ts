import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../service/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import LoginComponent from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['validateToken', 'saveToken', 'isLoggedIn', 'logout']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, HttpClientTestingModule, RouterTestingModule.withRoutes([]), LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Default behavior
    authService.isLoggedIn.and.returnValue(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call validateToken and navigate on successful login', () => {
    authService.validateToken.and.returnValue(of(true));
    authService.saveToken.and.stub();
    authService.isLoggedIn.and.returnValue(true); // Simula l'utente come loggato

    component.token = 'valid-token';
    component.login();

    expect(authService.validateToken).toHaveBeenCalledWith('valid-token');
    expect(authService.saveToken).toHaveBeenCalledWith('valid-token');
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should show error and clear token on failed login', () => {
    authService.validateToken.and.returnValue(of(false));
    
    component.token = 'invalid-token';
    component.login();

    expect(authService.validateToken).toHaveBeenCalledWith('invalid-token');
    expect(component.error).toBeTrue();
    expect(component.token).toBe('');
  });

  it('should navigate to login page on logout', () => {
    authService.logout.and.stub();
    
    component.removeToken();
    
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should display error message when token length is not 64', () => {
    component.token = 'short-token';
    fixture.detectChanges();
    
    const errorMessage = fixture.nativeElement.querySelector('.input-error');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Token must be exactly 64 characters long.');
  });

  it('should not display error message for valid token length', () => {
    component.token = 'a'.repeat(64); // Token di lunghezza 64
    fixture.detectChanges();
    
    const errorMessage = fixture.nativeElement.querySelector('.input-error');
    expect(errorMessage).toBeFalsy();
  });
});
