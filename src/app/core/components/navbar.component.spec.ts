import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../service/auth.service';
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

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(routes),
        CommonModule,
        NavbarComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture.detectChanges();
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
  
});
