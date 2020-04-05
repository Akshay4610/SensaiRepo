import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { User } from '../../shared/models/user.model'; 

//Deployment changes
//const baseURL = '/api'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiURL}/users`);
  }

  register(user: User) {
    return this.http.post(`${environment.apiURL}/users`, user);
  }

  delete(id: number) {
    
  }
}
