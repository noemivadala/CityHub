import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../service/auth.service';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({ selector: 'mock-component', template: '' })
class MockComponent {}

// Definisci le rotte utilizzate nel test
const routes: Routes = [
  { path: 'login', component: MockComponent },
  { path: 'users', component: MockComponent },
  { path: 'post', component: MockComponent },
];

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['logout']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteMock = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { params: {} }
    });

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(routes), // routerModule con le rotte
        NavbarComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges(); // Inizializza il componente
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica che il componente sia stato creato correttamente
  });

  it('should toggle menuOpen when toggleMenu is called', () => {
    expect(component.menuOpen).toBeFalse(); // Inizialmente il menu deve essere chiuso

    component.toggleMenu(); // Attiviamo il menu
    expect(component.menuOpen).toBeTrue(); // Dopo il primo click, il menu deve essere aperto

    component.toggleMenu(); // Disattiviamo il menu
    expect(component.menuOpen).toBeFalse(); // Dopo il secondo click, il menu deve essere chiuso di nuovo
  });

  it('should call authService.logout and navigate to login when removeToken is called', () => {
    component.removeToken(); // Chiamiamo la funzione di logout

    expect(authServiceSpy.logout).toHaveBeenCalled(); // Verifica che il metodo logout di AuthService sia stato chiamato
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']); // Verifica che l'utente sia stato rediretto alla pagina di login
  });

  it('should close the menu when a mobile link is clicked', () => {
    // Forziamo il menu ad essere aperto
    component.menuOpen = true;
    fixture.detectChanges();

    // Simuliamo il click su un link del menu mobile
    const linkElement = fixture.debugElement.query(By.css('a[routerLink="users"]'));
    linkElement.triggerEventHandler('click', null);

    expect(component.menuOpen).toBeFalse(); // Verifica che il menu sia stato chiuso dopo il click
  });
});
