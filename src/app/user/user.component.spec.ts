
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { UserServiceStub } from '../user.service.stub';
import { UserComponent } from './user.component';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { Address } from '../address.model';
import { CityValidators } from './city.validators';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
 
  beforeEach(async(() => {
    let mockUsersService = {};
    TestBed.configureTestingModule({
      declarations: [
        UserComponent
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        CityValidators,
        { provide: UsersService, useClass: UserServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create user component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with name control', () => {
    expect(component.userForm.contains('name')).toBeTruthy();
  });

  it('should create a form with email control', () => {
    expect(component.userForm.contains('email')).toBeTruthy();
  });
  
  it('should create a form with city control', () => {
    expect(component.userForm.contains('city')).toBeTruthy();
  });

  it('should display user name', () => {
    // given
    const compiled = fixture.debugElement.nativeElement;
   
    // when
    component.user = new User(0, 'John');
    component.ngOnChanges(); 
    fixture.detectChanges();

    // then
    expect(compiled.querySelector('#name').value).toMatch('John');
  });

  describe('City field', () => {
    it('should make a city control required', () => {
      //given
      let errors = {};
      let control = component.userForm.get('city');
      
      //when
      control.setValue('');
      errors = control.errors || {};
      
      //then
      expect(control.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
    });
    
    it('should display city name', () => {
      // given
      const compiled = fixture.debugElement.nativeElement;
     
      // when
      component.user = new User(0, 'Mary', 'mary@gmail.com', new Address('King','12', 'Toronto', '87766'));
      component.ngOnChanges(); 
      fixture.detectChanges();
  
      // then
      expect(compiled.querySelector('#city').value).toMatch('Toronto');
    });

    it('should invalidate city field if city name is taken', () => {
      // given
      let currentUser = new User(0, 'Mary', 'mary@gmail.com', new Address('King','12', 'Toronto', '87766'));
      let control = component.userForm.get('city');
      let errors = {};

      // when
      component.user = currentUser;
      component.ngOnChanges(); 
      fixture.detectChanges();
      errors = control.errors || {};
      
      // then
      expect(control.valid).toBeFalsy();
      expect(errors['shouldBeUnique']).toBeTruthy();;
    });
  });
});
