import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from '../user.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CityValidators } from './city.validators';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnChanges {
  @Input()
  set user(newUser: User) {
    this._user = newUser;
  };
  get user(): User {
    return this._user;
  };
  private _user: User;

  userForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder, 
    private cityValidators: CityValidators) {
      this.buildUserForm();
    }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get city() {
    return this.userForm.get('city');
  }
  ngOnChanges() {
    this.rebuildForm();
  }
  
  rebuildForm() {
    this.city.setAsyncValidators(this.cityValidators.cityUniqueValidator(this.user.id));
    this.userForm.reset({
      'name': this.user.name,
      'email': this.user.email,
      'city': this.user.address.city
    });
  }
  
  buildUserForm() {
    this.userForm = this.formBuilder.group({
      'name': [''],
      'email': [''],
      'city': ['', Validators.required]
    });
  }

}
