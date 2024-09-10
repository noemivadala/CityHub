import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { NavbarComponent } from './core/components/navbar.component';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        AppComponent
      ],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show the NavbarComponent when the user is logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // Verifica che il componente Navbar sia presente
    const navbarElement = fixture.debugElement.query(By.directive(NavbarComponent));
    expect(navbarElement).toBeTruthy();
  });

  it('should NOT show the NavbarComponent when the user is NOT logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // Verifica che il componente Navbar NON sia presente
    const navbarElement = fixture.debugElement.query(By.directive(NavbarComponent));
    expect(navbarElement).toBeNull();
  });

  it(`should have as title 'CityHub'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('CityHub');
  });

});
