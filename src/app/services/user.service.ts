import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  AUTH_SERVER: string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }
}
