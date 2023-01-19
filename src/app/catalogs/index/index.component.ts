import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  constructor(private authService: AuthService, private router: Router){

  }

  onlogout():void {
    this.authService.logout();

    this.router.navigateByUrl("/auth/login");
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
