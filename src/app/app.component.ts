import { Component } from '@angular/core';
import { ProductService } from './core/service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 userResgister :any ={
  "CustId": 0,
  "Name": "",
  "MobileNo": "",
  "Password": ""
 }
 userLogin :any ={
  
    "UserName": "string",
    "UserPassword": "string"
  
 }
 constructor(private prodSer:ProductService) {}
  onRegister() {
this.prodSer.onregister(this.userResgister).subscribe((res:any)=>{
  if(res.result){
    alert('signup success')
  }else {
    alert(res.message)
  }
})
  }
  onlogin() {
    this.prodSer.login(this.userLogin).subscribe((res:any)=>{
      if(res.result){
        alert('Login success')
      }else {
        alert(res.message)
      }
    })
      }
}
