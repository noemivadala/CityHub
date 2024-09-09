import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../service/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
  });

  it('should generate a random userId if not in local storage', () => {
    const mockGeneratedId = 5001;
    spyOn(service, 'generateRandomUserId').and.returnValue(mockGeneratedId);

    // Clear localStorage
    localStorage.removeItem('gorest-user-id');

    const userId = service.getUserId();

    expect(userId).toBe(mockGeneratedId);
    expect(service.generateRandomUserId).toHaveBeenCalled();
  });

  it('should return userId from localStorage if present', () => {
    const userId = 12345;
    spyOn(localStorage, 'getItem').and.returnValue(userId.toString());

    const result = service.getUserId();

    expect(result).toBe(userId);
  });
});
