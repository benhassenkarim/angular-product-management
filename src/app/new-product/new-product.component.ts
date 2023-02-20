import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{
  productFormGroup!:FormGroup;

  constructor(private fb:FormBuilder) {
  this.productFormGroup=this.fb.group({
    name: this.fb.control(null,[Validators.required,Validators.minLength(4)]),
    price :this.fb.control(null,[Validators.required]),
    promotion :this.fb.control(false,[Validators.required]),
  });
  }
  ngOnInit(): void {
  }

  handelAddProduct() {

  }
}
