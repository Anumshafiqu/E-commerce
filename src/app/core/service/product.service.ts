import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIresponseModel } from './model/model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
apiURL:string='https://freeapi.gerasim.in/api/BigBasket/';
  constructor(private http:HttpClient) {}
  getallProduct() : Observable <APIresponseModel> {
    debugger;
 return this.http.get<APIresponseModel>(`${this.apiURL}GetAllCartItems`)
  }

}
