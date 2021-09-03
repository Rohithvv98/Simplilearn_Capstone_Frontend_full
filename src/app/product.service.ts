import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/admin/allProduct`);
  }

  public getProductById(id : number) : Observable<Product> {
    return this.http.get<Product>(`${this.apiServerUrl}/admin/findProduct/${id}`);
  }

  public addProduct(product :Product) : Observable<Product> {
    return this.http.post<Product>(`${this.apiServerUrl}/admin/addProduct`,product);
  }

  public updateProduct(product :Product) : Observable<Product> {
    return this.http.put<Product>(`${this.apiServerUrl}/admin/updateProduct`,product);
  }

  public deleteProduct(productId :number) : Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/admin/deleteProduct/${productId}`);
  }
}
