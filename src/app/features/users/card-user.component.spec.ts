import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardUserComponent } from './card-user.component';
import { GorestService } from '../../service/gorest.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('CardUserComponent', () => {
  let component: CardUserComponent;
  let fixture: ComponentFixture<CardUserComponent>;
  let goRestService: GorestService;
  let router: Router;

  const mockUser = {
    id: 1,
    name: 'John Doe',
    gender: 'male',
    email: 'john.doe@example.com',
    status: 'active'
  };

  beforeEach(async () => {
    const goRestServiceMock = {
      deleteUser: jasmine.createSpy('deleteUser').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CardUserComponent],
      providers: [
        { provide: GorestService, useValue: goRestServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardUserComponent);
    component = fixture.componentInstance;
    goRestService = TestBed.inject(GorestService);
    router = TestBed.inject(Router);

    component.user = mockUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user name and initials', () => {
    const userNameElement = fixture.debugElement.query(By.css('.collapse-title')).nativeElement;
    const userInitialsElement = fixture.debugElement.query(By.css('.avatar span')).nativeElement;

    expect(userNameElement.textContent).toContain('John Doe');
    expect(userInitialsElement.textContent).toBe('JO');
  });

  it('should navigate to profile on viewProfile call', () => {
    spyOn(router, 'navigate');
    component.viewProfile(1);
    expect(router.navigate).toHaveBeenCalledWith(['/profile', 1]);
  });

  it('should delete user and emit userDeleted event on deleteClicked call', () => {
    spyOn(component.userDeleted, 'emit');

    component.deleteClicked(1);

    expect(goRestService.deleteUser).toHaveBeenCalledWith(1);
    expect(component.userDeleted.emit).toHaveBeenCalledWith(1);
  });

  it('should return the first two letters of the user name in uppercase', () => {
    const result = component.getNameLetter('John Doe');
    expect(result).toBe('JO');
  });
});
