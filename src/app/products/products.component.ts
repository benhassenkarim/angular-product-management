import { Component ,OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
// @ts-ignore
  products!  :Array<Product> ;
  currentPage:number=0;
  pageSize:number=5;
  totalPages:number=0;
  errorMessage! : string;
  searchFormGroup! :FormGroup;
  currentAction :string="all";

constructor(private productService : ProductService,private fb:FormBuilder,
            public authService:AuthenticationService,private router:Router ) {

}
  ngOnInit(): void {
  this.searchFormGroup=this.fb.group({
    keyword:this.fb.control(null)
  });
/*this.HandelgetAllData();*/
    this.HandelgetAllPageProducts();
  }
HandelgetAllData(){
  this.productService.getAllProducts().subscribe({
    next:(data )=>{
      this.products=data;
    },
    error : (err)=>{
      this.errorMessage=err;
    }
  });
}
  HandelgetAllPageProducts(){
    this.productService.getPageProducts(this.currentPage,this.pageSize).subscribe({
      next:(data )=>{
        this.products=data.products;
        this.totalPages=data.totalPages;
      },
      error : (err)=>{
        this.errorMessage=err;
      }
    });
  }

  HandelDeleteProduct(p: Product) {
  let supp=confirm("Are you sure ?")
    if(supp==false) return;
    /*let index=this.products.indexOf(p);
    this.products.splice(index,1);*/
this.productService.deleteProduct(p.id).subscribe({
  next:(data)=>{
    let index=this.products.indexOf(p);
    this.products.splice(index,1);
  }
});

  }

  HandelSetPromotion(p: Product) {
  let promo=p.promotion;
this.productService.setPromotion(p.id).subscribe({
  next:(data)=>{
    /*console.log("ok");*/
    p.promotion=!promo;
  },
  error :err=>{
    this.errorMessage=err;
  }
});
  }

  HandelSearchProducts() {
  this.currentAction="search";
  this.currentPage=0;
let keyword=this.searchFormGroup.value.keyword;
this.productService.searchProducts(keyword,this.currentPage,this.pageSize).subscribe({
  next:(data)=>{
    this.products=data.products;
    this.totalPages=data.totalPages;
  }
})
  }

  gotoPage(i: number) {
this.currentPage=i;
if(this.currentAction=='all')
this.HandelgetAllPageProducts();
else this.HandelSearchProducts();
  }

  handelNewProduct() {
this.router.navigateByUrl("admin/newproduct");
  }
}
