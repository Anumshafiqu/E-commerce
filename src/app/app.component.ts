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
 loggesuserdata:any;
 constructor(private prodSer:ProductService) {
  const localData = localStorage.getItem('ecomuser');
  if(localData != null){
    this.loggesuserdata = JSON.parse(localData)
  }
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
  logoff(){
    localStorage.removeItem('ecomuser');
    this.loggesuserdata = undefined;
  }
  onlogin() {
    this.prodSer.login(this.userLogin).subscribe((res:any)=>{
      if(res.result){
        alert('Login success');
        this.loggesuserdata = res.data;
        localStorage.setItem('ecomuser', JSON.stringify(res.data));
      }else {
        alert(res.message)
      }
    })
      }
      
}
