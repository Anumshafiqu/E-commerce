import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { APIresponseModel } from './model/model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
apiURL:string='https://freeapi.gerasim.in/api/BigBasket/';
onCartupdated$: Subject<boolean> | undefined;
  constructor(private http:HttpClient) {}
  getallProduct() : Observable <APIresponseModel> {
    debugger;
 return this.http.get<APIresponseModel>(`${this.apiURL}GetAllProducts`)
  }
  getAllcategory(): Observable <APIresponseModel>{
    return this.http.get<APIresponseModel>(`${this.apiURL}GetAllCategory`)
  }
  GetAllProductsByCategoryId(categoryId : number): Observable <APIresponseModel> {
    return this.http.get<APIresponseModel>(`${this.apiURL}GetAllProductsByCategoryId?id=${categoryId}`)
  }
  onregister(obj:any): Observable <APIresponseModel> {
    return this.http.post<APIresponseModel>(`${this.apiURL}RegisterCustomer` , obj)
  }
  login(obj:any): Observable <APIresponseModel> {
    return this.http.post<APIresponseModel>(`${this.apiURL}Login` , obj)
  }
  onAddToCart(obj:any): Observable <APIresponseModel> {
    return this.http.post<APIresponseModel>(`${this.apiURL}AddToCart` , obj)
  }
  GetCartProductsByCustId(custId : number): Observable <APIresponseModel> {
    return this.http.get<APIresponseModel>(`${this.apiURL}GetCartProductsByCustomerId?id=${custId}`)
  }
  DeleteProductFromCartById(CartId : number): Observable <APIresponseModel> {
    return this.http.get<APIresponseModel>(`${this.apiURL}DeleteProductFromCartById?id=${CartId}`)
  }



  private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  getCartCount() {
    return this.cartCount.asObservable();
  }

  addToCart(product: any) {
    this.cartItems.push(product);
    this.cartCount.next(this.cartItems.length);
  }

  getCartItems() {
    return this.cartItems;
  }













}
