import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, provideRoutes } from '@angular/router';
import ProfileUserComponent from './profile-user.component';
import { GorestService } from '../../service/gorest.service';
import { RouterTestingModule } from '@angular/router/testing';

// Mock data
const mockUser = { id: 1, name: 'John Doe', gender: 'male', email: 'john.doe@example.com', status: 'active' };
const mockPosts = [{ id: 1, title: 'Post 1', body: 'Body 1', user_id: 1 }];

describe('ProfileUserComponent', () => {
  let component: ProfileUserComponent;
  let fixture: ComponentFixture<ProfileUserComponent>;
  let goRestService: jasmine.SpyObj<GorestService>;

  beforeEach(async () => {
    const goRestServiceSpy = jasmine.createSpyObj('GorestService', ['getDetailUser', 'getPostsByUser']);
    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1') // Simula l'ID utente '1'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ProfileUserComponent
      ],
      providers: [
        { provide: GorestService, useValue: goRestServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileUserComponent);
    component = fixture.componentInstance;
    goRestService = TestBed.inject(GorestService) as jasmine.SpyObj<GorestService>;

    // Configura i ritorni dei metodi spy
    goRestService.getDetailUser.and.returnValue(of(mockUser));
    goRestService.getPostsByUser.and.returnValue(of(mockPosts));

    fixture.detectChanges(); // Assicura che `ngOnInit` venga chiamato
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details on init', () => {
    expect(goRestService.getDetailUser).toHaveBeenCalledWith(1);
    expect(component.user).toEqual(mockUser);
  });

  it('should fetch user posts on init', () => {
    expect(goRestService.getPostsByUser).toHaveBeenCalledWith(1);
    expect(component.posts).toEqual(mockPosts);
  });
});
