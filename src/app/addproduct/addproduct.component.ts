import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LogService } from '../log.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit 
{
  selectedFileName='';
  product : Product =new Product();
  constructor(private productService: ProductService,private router:Router,private logService:LogService) { 
  }

  ngOnInit(): void { 
    this.logService.loggeduserId$.subscribe(
      (id)=>{
        if(id==0){
            this.router.navigate(['']);
        }});
  }


   public addProduct():void{
   
          this.productService.addProduct(this.product).subscribe(
          (response: Product)=> {
            this.router.navigate(['/manage']);
            },
            (error: HttpErrorResponse)=> {alert(error.message);
          }
        );
    }

}