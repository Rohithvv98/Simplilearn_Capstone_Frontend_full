import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getUserbyName(userName : String) : Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/findUser/${userName}`);
  }

  public getUserbyId(userId : number) : Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/admin/findUserById/${userId}`);
  }

  public addUser(user :User) : Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/user/addUser`,user);
  }

  public updateUser(user :User) : Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/updateUser`,user);
  }

  public deleteUser(userId :number) : Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/deleteUser/${userId}`);
  }
}
