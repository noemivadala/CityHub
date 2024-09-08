import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddPostComponent } from './add-post.component';
import { GorestService } from '../../service/gorest.service';
import { AuthService } from '../../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

// Mock data
const mockPost = { user_id: 1, title: 'New Post', body: 'This is a new post' };

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;
  let goRestService: jasmine.SpyObj<GorestService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const goRestServiceSpy = jasmine.createSpyObj('GorestService', ['addPost']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserId']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, AddPostComponent],
      providers: [
        { provide: GorestService, useValue: goRestServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    goRestService = TestBed.inject(GorestService) as jasmine.SpyObj<GorestService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    authService.getUserId.and.returnValue(1);
    goRestService.addPost.and.returnValue(of(mockPost));

    // Assicuriamoci che l'EventEmitter sia stato correttamente inizializzato
    component.postAdded = new EventEmitter<any>();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit postAdded event and reset form on successful addPost', () => {
    spyOn(component.postAdded, 'emit');

    component.newPost = { user_id: 1, title: 'Test Title', body: 'Test Body' };
    component.addPost();

    expect(goRestService.addPost).toHaveBeenCalledWith({ user_id: 1, title: 'Test Title', body: 'Test Body' });
    expect(component.postAdded.emit).toHaveBeenCalledWith(mockPost);
    
    // Verifica che il form venga resettato correttamente
    expect(component.newPost).toEqual({ user_id: 1, title: '', body: '' });
  });

  it('should handle error on addPost failure', () => {
    const errorResponse = new HttpErrorResponse({ error: 'Error', status: 500 });
    goRestService.addPost.and.returnValue(throwError(() => errorResponse));
    spyOn(console, 'error');
  
    component.newPost = { user_id: 1, title: 'Test Title', body: 'Test Body' };
    component.addPost();
  
    expect(goRestService.addPost).toHaveBeenCalledWith(component.newPost);
  
    // Aggiornato il messaggio di errore in base alla lingua del messaggio reale
    expect(console.error).toHaveBeenCalledWith('Errore:', errorResponse);
  });
});
