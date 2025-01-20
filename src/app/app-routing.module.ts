import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  // {path:'', redirectTo:'home' , pathMatch:'full'},
  {path: '' , component: ProductListComponent},
  {path : 'checkout' ,component: CheckoutComponent },
  {path: '**' ,component:ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
