import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserI } from 'src/app/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hiddenLogin: boolean = false;
  hiddenRegis: boolean = true;

  constructor(private authService: AuthService, private router: Router){

  }

  onLogin(form:NgForm):void {
    this.authService.login(form.value).subscribe( res => {
      this.router.navigateByUrl("/catalogs/index");
    });
  }

  onRegister( form: NgForm ):void {
    this.authService.register(form.value).subscribe( res => {
      alert("Se ha registrado correctamente el usuario");
      this.onLoginView();
    });
  }

  public onLoginView(): void {
    this.hiddenLogin = false;
    this.hiddenRegis = true;
  }

  public onRegisView(): void {
    this.hiddenLogin = true;
    this.hiddenRegis = false;
  }
}
