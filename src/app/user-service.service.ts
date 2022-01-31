import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddUser } from './addUser';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }



  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseUrl}/api/users`);
  }

  getUserById(id: number): Observable<User>{
    return this.httpClient.get<User>(`${this.baseUrl}/api/users/${id}`);
  }

  addUser(user: AddUser){
    console.log(user);
    return this.httpClient.post(`${this.baseUrl}/api/users`, user);
  }

  editUser(id: number, user: AddUser){
    return this.httpClient.put(`${this.baseUrl}/api/users/${id}`, user);
  }

  deleteUser(id: number){
    return this.httpClient.delete(`${this.baseUrl}/api/users/${id}`);
  }
}
