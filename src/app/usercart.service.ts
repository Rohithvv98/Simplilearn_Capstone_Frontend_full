import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserCart } from './usercart';

@Injectable({
  providedIn: 'root'
})
export class UsercartService {
  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getUserCart() : Observable<UserCart[]>
  {
    return this.http.get<UserCart[]>(`${this.apiServerUrl}/usercart/all`);
  }

  public getUserCartById(id : number) : Observable<UserCart> {
    return this.http.get<UserCart>(`${this.apiServerUrl}/usercart/find/${id}`);
  }

  public addUserToCart(usercart :UserCart) : Observable<UserCart> {
    return this.http.post<UserCart>(`${this.apiServerUrl}/usercart/add`,usercart);
  }

  public updateUserToCart(usercart :UserCart) : Observable<UserCart> {
    return this.http.put<UserCart>(`${this.apiServerUrl}/usercart/update`,usercart);
  }

  
  public deleteUserfromCart(usercartId :number) : Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/usercart/delete/${usercartId}`);
  }
}
