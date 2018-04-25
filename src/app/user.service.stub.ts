import { User } from "./user.model";
import { Address } from "./address.model";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/from";
import "rxjs/add/operator/map";

export class UserServiceStub {
  private users = [
    new User(1, 'John', 'john@gmail.com', new Address('Center','123', 'Vaughan', '12345')),
    new User(2, 'Catherine', 'catherine@gmail.com', new Address('Adelaide','12', 'Toronto', '34355')),
    new User(3, 'David', 'david@gmail.com', new Address('Zokol','45', 'Aurora', '98877'))
  ];
 
  getUsers(): Observable<User[]> {
    return Observable.from([this.users]);
  } 

  verifyCityUniqueness(cityName: string, currentUserId: number): Observable<boolean> {
    return this.getUsers().map(users => {
        let filteredUsers = users.filter(user => user.address.city === cityName && user.id !== currentUserId);
        return filteredUsers.length > 0;
      });
  }
}