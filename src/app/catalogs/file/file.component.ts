import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {

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
