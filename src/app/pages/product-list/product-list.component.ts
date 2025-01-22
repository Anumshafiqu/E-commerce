import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { APIresponseModel, cartClass, Iproduct } from '../../core/service/model/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  productList: Iproduct[] = [];
  constructor(private productService: ProductService) {

   }
  categorylist$: Observable<APIresponseModel> | undefined;
  cardObj: cartClass = new cartClass();
  loggedUserId :number = 0;
  ngOnInit(): void {
    this.getAllProduct();
    // this.loadcategory();
    const loggedUser = localStorage.getItem('ecomuser')
    if(loggedUser != null){
      const parseData = JSON.parse(loggedUser);
      this.loggedUserId  = parseData.CustId;
    }
    this.categorylist$ = this.productService.getAllcategory();
  }
  // addtocart(ProductId:number) {
  //   debugger;
  //   this.cardObj.ProductId = ProductId;
  //   this.cardObj.CustId = this.loggedUserId;
  //   this.cardObj.Quantity = 1;
  //   this.productService.onAddToCart(this.cardObj).subscribe((res: APIresponseModel) => {
  //    if(res.result) {
  //     alert('product added to cart');
  //      this.productService.onCartupdated$?.next(true);
  //    }
  //   })
  // }
  addtocart(ProductId: number) {
    const cartObj = {
      ProductId: ProductId,
      CustId: this.loggedUserId,
      Quantity: 1,
    };
    this.productService.onAddToCart(cartObj).subscribe((res: any) => {
      if (res.result) {
        alert('Product added to cart');
        this.productService.onCartupdated$?.next(true);
      }
    });
  }


  
  getAllCategoryid(categ: number) {
    this.productService.GetAllProductsByCategoryId(categ).subscribe((res: APIresponseModel) => {
      this.productList = res.data;
    })
  }
  loadcategory() {
    this.productService.getAllcategory().subscribe((res: APIresponseModel) => {

    })
  }
  getAllProduct() {
    this.productService.getallProduct().subscribe((res: APIresponseModel) => {
      this.productList = res.data
    })
  }









  @Input() product: any;

  // constructor(private cartService: ProductService) {}

  addToCart() {
    this.productService.addToCart(this.product);
    alert('Product added to cart!');
  }

}
