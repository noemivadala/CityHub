import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AddUsersComponent } from './add-users.component';
import { GorestService } from '../../service/gorest.service';

// data
const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com', gender: 'Male', status: 'Active' };

describe('AddUsersComponent', () => {
  let component: AddUsersComponent;
  let fixture: ComponentFixture<AddUsersComponent>;
  let goRestService: jasmine.SpyObj<GorestService>;

  beforeEach(async () => {
    const goRestServiceSpy = jasmine.createSpyObj('GorestService', ['createUser']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AddUsersComponent
      ],
      providers: [
        { provide: GorestService, useValue: goRestServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUsersComponent);
    component = fixture.componentInstance;
    goRestService = TestBed.inject(GorestService) as jasmine.SpyObj<GorestService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createUser and emit user on addUser', () => {
    goRestService.createUser.and.returnValue(of(mockUser)); // Simula il ritorno del servizio

    component.addUser();

    expect(goRestService.createUser).toHaveBeenCalledWith(component.newUser);
    expect(goRestService.createUser).toHaveBeenCalledTimes(1);

    component.userAdded.subscribe(user => {
      expect(user).toEqual(mockUser);
    });
  });

  it('should reset newUser after adding user', () => {
    goRestService.createUser.and.returnValue(of(mockUser));

    component.addUser();

    expect(component.newUser).toEqual({ id: 0, name: '', email: '', gender: 'Male', status: 'Active' });
  });

  it('should handle error when adding user', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    goRestService.createUser.and.returnValue(throwError(() => new Error('Error adding user')));

    component.addUser();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error adding user:', jasmine.any(Error));
  });
});
