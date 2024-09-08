import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../service/auth.service';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({ selector: 'mock-component', template: '' })
class MockComponent {}

// Configura le rotte per il test
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
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(routes),
        CommonModule,
        NavbarComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = jasmine.createSpyObj('Router', ['login']);

    fixture.detectChanges(); // Inizializza il componente
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menuOpen when toggleMenu is called', () => {
    expect(component.menuOpen).toBeFalse(); // Inizialmente il menu deve essere chiuso

    component.toggleMenu(); // Attiviamo il menu
    expect(component.menuOpen).toBeTrue(); // Dopo il primo click, il menu deve essere aperto

    component.toggleMenu(); // Disattiviamo il menu
    expect(component.menuOpen).toBeFalse(); // Dopo il secondo click, il menu deve essere chiuso di nuovo
  });

  it('should call authService.logout and navigate to login when removeToken is called', async () => {
    // Chiamiamo la funzione di logout
    component.removeToken();
  
    // Verifica che il metodo logout di AuthService sia stato chiamato
    expect(authServiceSpy.logout).toHaveBeenCalled();
  
    // Verifica che il router navighi alla pagina di login
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  
    // Aggiungiamo anche un controllo per verificare che la navigazione si sia risolta
    const navigationPromise = routerSpy.navigate.calls.mostRecent().returnValue;
    await expectAsync(navigationPromise).toBeResolved();
  });

  it('should close the menu when a mobile link is clicked', () => {
    component.menuOpen = true;
    fixture.detectChanges();

    expect(component.menuOpen).toBeTrue(); // Verifica che il menu sia aperto

    // Simuliamo il click su un link del menu mobile
    const linkElement = fixture.debugElement.query(By.css('a[routerLink="users"]'));
    expect(linkElement).toBeTruthy(); // Verifica che il link sia presente

    linkElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Verifica che il menu sia stato chiuso
    expect(component.menuOpen).toBeFalse();
  });
});
