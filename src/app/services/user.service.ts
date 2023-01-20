import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserI } from '../models/user';

@Injectable()
export class UserService {

  AUTH_SERVER: string = 'http://localhost:8080/';
  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  public createAddUserFormDate(email: string, username: string, password: string): FormData {

    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username!);
    formData.append('password', password);
    return formData;
  }

  public createUserFormDate(usernam: string, email: string): FormData {

    const formData = new FormData();
    formData.append('username', usernam!);
    formData.append('email', email);
    return formData;
  }

  // * Obtiene todos los usuarios
  public getAllUser():  Observable<UserI[]> {

    const headers= new HttpHeaders()
    .set('content-type', 'application/json');

    return this.httpClient.get<UserI[]>(`${this.AUTH_SERVER}user/list`, {'headers': headers});
  }

  public addUser ( user: UserI ): Observable<UserI> {

    const formData = this.createAddUserFormDate(user.email, user.username, user.password);

    return this.httpClient.post<UserI>(`${this.AUTH_SERVER}user/add`, formData);
  }

  public editUser(form: FormData): Observable<UserI> {

    return this.httpClient.put<UserI>(`${this.AUTH_SERVER}user/update`, form);
  }

  public deleteUserforUsername(username: string): Observable<UserI> {

    return this.httpClient.delete<UserI>(`${this.AUTH_SERVER}user/delete/${username}`);
  }

}
