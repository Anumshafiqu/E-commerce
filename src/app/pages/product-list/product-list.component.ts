import { Component, Inject, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { APIresponseModel, Iproduct } from '../../core/service/model/model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
 
productList:Iproduct [] = [];
 constructor(private productService:ProductService) {}
ngOnInit(): void {
  this.getAllProduct();
}
  getAllProduct() {
    debugger;
    this.productService.getallProduct().subscribe((res:APIresponseModel)=>{
this.productList = res.data
    })
  }
}
