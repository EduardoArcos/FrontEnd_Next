import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const token = localStorage.getItem('ACCESS_TOKEN');

      if (token != null && token !== '') {

        return true;
      } else {

        alert(`Debes iniciar sesión para acceder a esta página`);
        this.router.navigate(['/login']);
        return false;
      }
  }

}
