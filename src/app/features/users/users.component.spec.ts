import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GorestService } from '../../service/gorest.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Renderer2, ElementRef } from '@angular/core';
import { User } from '../../models/user';
import UsersComponent from './users.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeleteUserComponent } from "./delete-user.component";
import { SearchComponent } from "../../core/components/search.component";
import { AddUsersComponent } from "./add-users.component";
import { CardUserComponent } from "./card-user.component";

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let goRestServiceMock: any;
  let routerMock: any;
  let rendererMock: any;
  let elementRefMock: any;

  beforeEach(async () => {
    goRestServiceMock = {
      getUsers: jasmine.createSpy('getUsers').and.returnValue(of([
        { id: 1, name: 'John Doe', email: 'john@example.com', gender: 'Male', status: 'active' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', gender: 'Female', status: 'active' }
      ]))
    };

    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    rendererMock = jasmine.createSpyObj('Renderer2', ['']);
    elementRefMock = jasmine.createSpyObj('ElementRef', ['nativeElement']);

    await TestBed.configureTestingModule({
      imports: [
        UsersComponent,
        CommonModule,
        FormsModule,
        DeleteUserComponent,
        SearchComponent,
        AddUsersComponent,
        CardUserComponent
      ],
      providers: [
        { provide: GorestService, useValue: goRestServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: Renderer2, useValue: rendererMock },
        { provide: ElementRef, useValue: elementRefMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize users on init', () => {
    expect(goRestServiceMock.getUsers).toHaveBeenCalled();
    expect(component.users.length).toBe(2);
    expect(component.totalPages).toBe(1);
    expect(component.filteredUsers.length).toBe(2);
  });

  it('should update filtered users on page change', () => {
    component.users = [
      { id: 1, name: 'John Doe', email: 'john@example.com', gender: 'Male', status: 'active' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', gender: 'Female', status: 'active' },
      { id: 3, name: 'Bob Smith', email: 'bob@example.com', gender: 'Male', status: 'active' }
    ];
    component.totalPages = 1;
    component.pageSize = 2;
    component.onPageChange(2);
    expect(component.currentPage).toBe(2);
    expect(component.filteredUsers.length).toBe(1);
  });

  it('should handle user deleted', () => {
    component.users = [
      { id: 1, name: 'John Doe', email: 'john@example.com', gender: 'Male', status: 'active' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', gender: 'Female', status: 'active' }
    ];
    component.handleUserDeleted(1);
    expect(component.users.length).toBe(1);
    expect(component.filteredUsers.length).toBe(1);
    expect(component.users[0].id).toBe(2);
  });

  it('should filter users based on search term', () => {
    component.users = [
      { id: 1, name: 'John Doe', email: 'john@example.com', gender: 'Male', status: 'active' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', gender: 'Female', status: 'active' }
    ];
    component.onSearchChanged('john');
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('John Doe');
  });

  it('should handle user added', () => {
    const newUser: User = { id: 3, name: 'Bob Smith', email: 'bob@example.com', gender: 'Male', status: 'active' };
    component.handleUserAdded(newUser);
    expect(component.users.length).toBe(3);
    expect(component.filteredUsers.length).toBe(3);
    expect(component.users[0].id).toBe(3);
  });
});
