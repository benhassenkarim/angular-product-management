import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private products! :Array<Product>;
  constructor() {
    this.products=[
      {id:UUID.UUID(),name:"computer",price:1500,promotion:true},
      {id:UUID.UUID(),name:"souris",price:15,promotion:false},
      {id:UUID.UUID(),name:"ecran",price:300,promotion:true},

    ];
    for (let i = 0; i < 15; i++) {
      this.products.push({id:UUID.UUID(),name:"computer",price:1500,promotion:true});
      this.products.push({id:UUID.UUID(),name:"souris",price:15,promotion:false});
      this.products.push({id:UUID.UUID(),name:"ecran",price:300,promotion:true});
    }
  }
  public  getAllProducts():Observable<Product[]>{
    let rnd=Math.random();
    if(rnd<0.3)return throwError(()=> new Error("internet connection error"));
    else
    return of([...this.products]);
  }
  // @ts-ignore
  public  getPageProducts(page:number,size:number):Observable<PageProduct>{
    let index=page*size;
   let totalPages=~~(this.products.length/size);
   if(this.products.length%size !=0){
     totalPages++;
     let pageProducts=this.products.slice(index,index+size);
     return of({page:page,size:size,totalPages:totalPages,products:pageProducts});
   }
  }
  public deleteProduct(id:string):Observable<boolean>{
    this.products =this.products.filter(p=>p.id!=id);
    return of (true);
  }
  public setPromotion(id:string ):Observable<boolean>{
    let product =this.products.find(p=>p.id==id);
    if(product !=undefined){
      product.promotion=!product.promotion;
      return of(true);
    }else return  throwError(()=>new Error("product not found"));
  }
  // @ts-ignore
  public searchProducts(keyword :string,page:number,size:number):Observable<PageProduct>{
    let results=this.products.filter(p=>p.name.includes(keyword));
    let index=page*size;
    let totalPages=~~(results.length/size);
    if(this.products.length%size !=0){
      totalPages++;
      let pageProducts=results.slice(index,index+size);
      return of({page:page,size:size,totalPages:totalPages,products:pageProducts});
  }
}
public addNewProduct(product:Product):Observable<Product>{
    product.id=UUID.UUID();
    this.products.push(product);
    return of(product);
}
public getProduct(id:string):Observable<Product>{
    let product=this.products.find(p=>p.id==id);
    if(product==undefined)return throwError(()=>new Error("product not found"));
    return of(product);
}
  gerErrorMessage(fieldname: string, error: ValidationErrors) {

    if(error['required']){
      return fieldname+" is required !";
    }else if (error['minlength']){
      return  fieldname+"must have at least "+error['minlength']['requiredLength']+" characters ";
    }else if (error['min']){
      return fieldname +"must be supp then "+error['min']['min'];
    }else return "";

  }
  public updateProduct(product:Product):Observable<Product>{
    this.products=this.products.map(p=>(p.id==product.id)?product:p);
    return of(product);
  }
}
