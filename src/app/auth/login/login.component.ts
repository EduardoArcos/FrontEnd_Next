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

  constructor(private authService: AuthService, private router: Router){

  }

  onLogin(form:NgForm):void {
    this.authService.login(form.value).subscribe( res => {
      this.router.navigateByUrl("/catalogs/index");
    });
  }

}
