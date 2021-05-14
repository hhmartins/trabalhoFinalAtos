import { Component, OnInit } from '@angular/core';
import { Users} from './users';
import { UsersService } from './users.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public usersList: Users[];
  public editUsers: Users;
  public deleteUsers: Users;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }


  public getUsers(): void {
    this.usersService.getUsers().subscribe(
      (response: Users[]) =>{
        this.usersList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddUserRandom(users: Users): void {
    this.usersService.addUserRandom(users).subscribe(
      (response: void) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddUser(addForm: NgForm): void {
    document.getElementById('add-users-form').click();
    this.usersService.addUser(addForm.value).subscribe(
      (response: Users) => {
        console.log(response);
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateUser(users: Users): void {
    this.usersService.updateUser(users).subscribe(
      (response: Users) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onDeleteUser(userId: number): void {
    this.usersService.deleteUser(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModalUsers(users: Users, mode: string): void {
    const container = document.getElementById('main-container-users');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUsersModal');
    }
    if (mode === 'edit') {
      this.editUsers = users;
      button.setAttribute('data-target', '#updateUsersModal');
    }
    if (mode === 'delete') {
      this.deleteUsers = users;
      button.setAttribute('data-target', '#deleteUsersModal');
    }
    container.appendChild(button);
    button.click();
  }






}
