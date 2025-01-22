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
  // cartData: any[] = [];
  // ngOnInit(): void {
  //   this.getCart();
  // }
  loggesuserdata: any;
  // constructor(private prodSer: ProductService) {
  //   const localData = localStorage.getItem('ecomuser');
  //   if (localData != null) {
  //     this.loggesuserdata = JSON.parse(localData)
  //   }
  //   this.prodSer.onCartupdated$?.subscribe(res => {
  //     this.getCart();
  //   })
  // }
  //   onRegister() {
  // this.prodSer.onregister(this.userResgister).subscribe((res:any)=>{
  //   if(res.result){
  //     alert('signup success')
  //   }else {
  //     alert(res.message)
  //   }
  // })
  //   }
  onRegister() {
    if (!this.userResgister.Name || !this.userResgister.MobileNo || !this.userResgister.Password) {
      alert('All fields are required');
      return;
    }
    this.prodSer.onregister(this.userResgister).subscribe((res: any) => {
      if (res.result) {
        alert('Signup success');
      } else {
        alert(res.message);
      }
    });
  }

  // removeProduct(CartId: number) {
  //   this.prodSer.DeleteProductFromCartById(CartId).subscribe((res: any) => {
  //     if (res.result) {
  //       this.getCart();
  //     } else {
  //       alert(res.message)
  //     }
  //   })
  // }
  // getCart() {
  //   this.prodSer.GetCartProductsByCustId(this.loggesuserdata.custId).subscribe((res: any) => {
  //     if (res.result) {
  //       this.cartData = res.data;
  //     } else {
  //       alert(res.message)
  //     }
  //   })
  // }

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














  cartData: any[] = [];
  loggedUserId: number = 0;

  constructor(private prodSer: ProductService) {
    const localData = localStorage.getItem('ecomuser');
    if (localData != null) {
      const parsedData = JSON.parse(localData);
      this.loggedUserId = parsedData.custId;
    }

    this.prodSer.onCartupdated$?.subscribe(() => {
      this.getCart();
    });
  }

  // ngOnInit(): void {
  //   this.getCart();
  // }

  addtocart(ProductId: number) {
    const cartObj = {
      ProductId: ProductId,
      CustId: this.loggedUserId,
      Quantity: 1,
    };
    this.prodSer.onAddToCart(cartObj).subscribe((res: any) => {
      if (res.result) {
        alert('Product added to cart');
        this.prodSer.onCartupdated$?.next(true);
      }
    });
  }

  getCart() {
    this.prodSer
      .GetCartProductsByCustId(this.loggedUserId)
      .subscribe((res: any) => {
        if (res.result) {
          this.cartData = res.data;
        } else {
          alert(res.message);
        }
      });
  }

  removeProduct(cartId: number) {
    this.prodSer.DeleteProductFromCartById(cartId).subscribe((res: any) => {
      if (res.result) {
        this.getCart();
      } else {
        alert(res.message);
      }
    });
  }

  checkout() {
    alert('Proceeding to checkout...');
  }







  cartItems: any[] = [];
  showCart = false;

  // constructor(private cartService: CartService) {}

  ngOnInit() {
    this.prodSer.cartItems$.subscribe((items) => {
      this.cartItems = items;
      // this.getCart()
    });
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  // clearCart() {
  //   this.prodSer.cartItems.next([]);
  //   this.cartItems = [];
  // }
  clearCart() {
    this.prodSer.clearCart(); // Use the method exposed in the service
  }
  
}
