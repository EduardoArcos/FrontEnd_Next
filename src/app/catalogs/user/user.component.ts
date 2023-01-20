import { Component  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserI } from '../../models/user';
import { userClass } from '../../models/class/userClass';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  private subscriptions: Subscription[] = [];
  public userData: UserI[] = [];
  public editUser = new userClass;
  public hiddenList = false;
  public hiddenEdit = true;
  public hiddenAdd = true;

  public idUser: number = Number(localStorage.getItem("userId"))!;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ){
    this.getAllUsers();
  }

  public getAllUsers(): void {

    this.subscriptions.push(
      this.userService.getAllUser().subscribe(
        ( resp: any[] ) => {

          this.userData = resp.map((prop:any) => {
            return {
              ...prop
            }
          });

        },
        (errorResponse: HttpErrorResponse) => {
          alert(`Ocurrio un error: ${errorResponse.message}`);

        }
      )
    );
  }

  public onEditUser(user: UserI): void {
    this.editUser = user;
    this.hiddenList = true;
    this.hiddenEdit = false;
    this.hiddenAdd = true;
  }

  public onListUser():void {

    this.hiddenList = false;
    this.hiddenEdit = true;
    this.hiddenAdd = true;
  }

  public toAdd(): void {

    this.hiddenList = true;
    this.hiddenEdit = true;
    this.hiddenAdd = false;
  }

  public onAdd( form: NgForm ):void {

    // detiene el proceso si el formulario no esta bien llenado
    if (form.invalid) {
      alert(`Favor de llenar el formulario antes de tratar de enviarlo.`);
      return;
    }

    this.subscriptions.push(
      this.userService.addUser(form.value).subscribe(
        (response: UserI) => {
          alert(`Se ha creado correctamente el usuario con el id: ${response.id}`);
          this.getAllUsers();
          this.onListUser();
        },
        (errorResponse: HttpErrorResponse) => {
          alert(`Ocurrio un error: ${errorResponse.message}`);
        }
      )
    );

  }

  public onEditUserF(user: UserI): void {

    console.log(user);

    // detiene el proceso si el formulario no esta bien llenado
    if (user.email != null || user.email !== "") {
      alert(`Favor de llenar el campo email.`);
      return;
    }

    const formData = this.userService.createUserFormDate(user.username, user.email);

    this.subscriptions.push(
      this.userService.editUser(formData).subscribe(
        (response: UserI) => {
          this.getAllUsers();
          alert(`Se ha modificado correctamente el usuario con el id: ${response.id}`);
          this.onListUser();
        },
        (errorResponse: HttpErrorResponse) => {
          alert(`Ocurrio un error: ${errorResponse.message}`);

        }
      )
      );
  }

  public onDeleteUser(username: string): void {

    this.subscriptions.push(
      this.userService.deleteUserforUsername(username).subscribe(
        (resp: UserI) => {

          alert(`Se ha eliminado el usuario con el username: ${username}`);
          this.getAllUsers();
        }
      )
    );

  }

  onlogout():void {
    this.authService.logout();

    this.router.navigateByUrl("/login");
  }

  toUser():void {

    this.router.navigateByUrl("/catalogs/user");
  }

  toFile():void {

    this.router.navigateByUrl("/catalogs/file");
  }

  toIndex():void {

    this.router.navigateByUrl("/catalogs/index");
  }
}
