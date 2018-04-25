import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  users: User[];
  currentUser: User;

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.getUsers()
      .subscribe(receivedUsers => {
        this.users = receivedUsers;
        this.currentUser = this.users[0];
      });
  }

  changeCurrentUser(event: MouseEvent, user: User) {
    this.currentUser = user;
  }
}
