import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { UsersService } from "../users.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Injectable } from "@angular/core";

@Injectable()
export class CityValidators {
 
  constructor(private usersService: UsersService) {}

  cityUniqueValidator(currentUserId: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.usersService.verifyCityUniqueness(control.value, currentUserId)
        .map(uniqueFlag => {
            return (uniqueFlag) ? { shouldBeUnique: true } : null;
        });
    };
  }

}