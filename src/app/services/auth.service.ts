import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwResponseI } from '../models/jw-response';
import { tap } from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  AUTH_SERVER: string = 'http://localhost:8080/';
  authSubject = new BehaviorSubject(false);

  private token: string = "";

  constructor( private httpClient: HttpClient ) {}

  register( user: UserI ): Observable< JwResponseI > {

    return this.httpClient.post<JwResponseI>(`${this.AUTH_SERVER}api/auth/signup`, user).pipe(tap(
      (res: JwResponseI) =>{
        if ( res ) {
        }
      })
    );
  }

  login( user: UserI ): Observable< JwResponseI > {

    return this.httpClient.post<JwResponseI>(`${this.AUTH_SERVER}api/auth/signin`, user).pipe(tap(
      (res: JwResponseI) =>{
        if ( res ) {
          // guardar el token
          this.saveToken(res.accessToken, res.id.toString(), res.username);
        }
      })
    );
  }

  public logout(): void {
    this.token = "";
    localStorage.removeItem('ACCESS_TOKEN');
  }

  private saveToken(token: string, userId: string, username: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);

    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN')!;
    }

    return this.token;
  }


  public isUserLoggedIn(): boolean {

    this.getToken();
    if (this.token != null && this.token !== '') {

      return true;
    } else {

      this.logout();
      return false;
    }
  }
}
