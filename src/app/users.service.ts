import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>('http://jsonplaceholder.typicode.com/users/');
  } 

  verifyCityUniqueness(cityName: string, currentUserId: number): Observable<boolean> {
    return this.getUsers()
      .map(users => {
        let filteredUsers = users.filter(user => user.address.city === cityName && user.id !== currentUserId);
        return filteredUsers.length > 0;
      });
  }
}
