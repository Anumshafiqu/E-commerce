import { Component, Inject, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { APIresponseModel, Iproduct } from '../../core/service/model/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
 
productList:Iproduct [] = [];
 constructor(private productService:ProductService) {}
 categorylist$ : Observable <APIresponseModel> | undefined ;
ngOnInit(): void {
  this.getAllProduct();
  this.loadcategory();
  this.categorylist$ = this.productService.getAllcategory();
}
getAllCategoryid(categ:number){
  this.productService.GetAllProductsByCategoryId(categ).subscribe((res:APIresponseModel)=>{
    this.productList = res.data;
  })
}
loadcategory() {
  this.productService.getAllcategory().subscribe((res:APIresponseModel)=>{

  })
}
  getAllProduct() {
    debugger;
    this.productService.getallProduct().subscribe((res:APIresponseModel)=>{
this.productList = res.data
    })
  }
}
