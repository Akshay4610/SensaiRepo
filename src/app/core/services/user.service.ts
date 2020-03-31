import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../shared/models/user.model'; 


const baseURL = 'https://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${baseURL}/users`);
  }

  register(user: User) {
    return this.http.post(`${baseURL}/users`, user);
  }

  delete(id: number) {
    
  }
}
