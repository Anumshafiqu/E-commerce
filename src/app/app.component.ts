import { Component, OnInit } from '@angular/core';
import { ProductService } from './core/service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  userResgister: any = {
    "CustId": 0,
    "Name": "",
    "MobileNo": "",
    "Password": ""
  }
  userLogin: any = {

    "UserName": "string",
    "UserPassword": "string"

  }
  cartData: any[] = [];
  // ngOnInit(): void {
  //   this.getCart();

  // }
  loggesuserdata: any;
  constructor(private prodSer: ProductService) {
    const localData = localStorage.getItem('ecomuser');
    if (localData != null) {
      this.loggesuserdata = JSON.parse(localData)
    }
    this.prodSer.onCartupdated$?.subscribe(res => {
      this.getCart();
    })
  }
    onRegister() {
  this.prodSer.onregister(this.userResgister).subscribe((res:any)=>{
    if(res.result){
      alert('signup success')
    }else {
      alert(res.message)
    }
  })
    }


  removeProduct(CartId: number) {
    this.prodSer.DeleteProductFromCartById(CartId).subscribe((res: any) => {
      if (res.result) {
        this.getCart();
      } else {
        alert(res.message)
      }
    })
  }
  getCart() {
    this.prodSer.GetCartProductsByCustId(this.loggesuserdata.custId).subscribe((res: any) => {
      if (res.result) {
        this.cartData = res.data;
      } else {
        alert(res.message)
      }
    })
  }

  logoff() {
    localStorage.removeItem('ecomuser');
    this.loggesuserdata = undefined;
  }
  onlogin() {
    this.prodSer.login(this.userLogin).subscribe((res: any) => {
      if (res.result) {
        alert('Login success');
        this.loggesuserdata = res.data;
        localStorage.setItem('ecomuser', JSON.stringify(res.data));
      } else {
        alert(res.message)
      }
    })
  }














  














  cartItems: any[] = [];
  showCart: boolean = false;

  

  ngOnInit() {
    this.cartItems = this.prodSer.getCartItems();
  }

  toggleCart() {
    this.cartItems = this.prodSer.getCartItems(); // Refresh cart items
    this.showCart = !this.showCart;
  }

  closeCart() {
    this.showCart = false;
  }

}
