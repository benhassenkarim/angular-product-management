import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {CostumersComponent} from "./costumers/costumers.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {NewProductComponent} from "./new-product/new-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";

const routes: Routes = [
  {path : "login",component :LoginComponent},
  {path : "",component :LoginComponent},
  {path : "admin",component :AdminTemplateComponent,canActivate :[AuthenticationGuard],children:[
      {path : "products",component :ProductsComponent},
      {path :"costumers",component :CostumersComponent},
      {path :"newproduct",component :NewProductComponent},
      {path :"editproduct/:id",component :EditProductComponent}
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
