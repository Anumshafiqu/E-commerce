import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { APIresponseModel } from './model/model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
apiURL:string='https://freeapi.gerasim.in/api/BigBasket/';
// onCartupdated$: Subject<boolean> | undefined;
//   constructor(private http:HttpClient) {}
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
  // onAddToCart(obj:any): Observable <APIresponseModel> {
  //   return this.http.post<APIresponseModel>(`${this.apiURL}AddToCart` , obj)
  // }
  // GetCartProductsByCustId(custId : number): Observable <APIresponseModel> {
  //   return this.http.get<APIresponseModel>(`${this.apiURL}GetCartProductsByCustomerId?id=${custId}`)
  // }
  // DeleteProductFromCartById(CartId : number): Observable <APIresponseModel> {
  //   return this.http.get<APIresponseModel>(`${this.apiURL}DeleteProductFromCartById?id=${CartId}`)
  // }








  onCartupdated$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  onAddToCart(obj: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}AddToCart`, obj);
  }

  GetCartProductsByCustId(custId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiURL}GetCartProductsByCustomerId?id=${custId}`
    );
  }

  DeleteProductFromCartById(cartId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiURL}DeleteProductFromCartById?id=${cartId}`
    );
  }

  // private cartItems = new BehaviorSubject<any[]>([]);
  // cartItems$ = this.cartItems.asObservable();
  private cartItems = new BehaviorSubject<any[]>([]); // Keep this private
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: any) {
    const currentCart = this.cartItems.value;
    currentCart.push(product);
    this.cartItems.next(currentCart);
    // const currentCart = this.cartItems.value;
    this.cartItems.next([...currentCart, product]);
  }

  getCartItems() {
    return this.cartItems.value;
  }
  clearCart() {
    this.cartItems.next([]); // Reset the cart to an empty array
  }
}
