import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '../log.service';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public products: Product[];
  itemNo:number=5;
  numbers:number[];
  pageNum:number=1;
  public dataSource:Product[];

  constructor(private productService: ProductService,private router:Router,private logService:LogService) { 
    this.products=[];
    this.numbers=[];
    this.dataSource=[];
  }
  ngOnInit(): void { 
    this.logService.loggeduserId$.subscribe(
      (id)=>{
        if(id!=0){
          this.getProducts();
        }
        else
        {
          this.router.navigate(['']);
        }
      });
   }

  public getProducts():void{  
  this.productService.getProducts().subscribe(
    (response: Product[])=> {
      this.products=response;
     
      if((this.products.length%this.itemNo)==0){
      this.numbers=[];
      for(let i=0;i<(Math.round(this.products.length/this.itemNo));i++)
      {
        this.numbers[i]=i;
      }
     }
      else if((this.products.length%this.itemNo)==this.products.length)
      {   
        this.numbers=[];
        this.numbers=[0];
      }
      else{
        this.numbers=[];
        for(let i=0;i<(Math.ceil(this.products.length/this.itemNo));i++)
        {
          this.numbers[i]=i;
        }
      }
      let j=0;
      for(let i=(this.itemNo*(this.pageNum-1));i<(this.itemNo*this.pageNum);i++)
      {
        if(i<this.products.length){
        this.dataSource[j]=this.products[i];
        j++;
        }
      }

    },
    (error : HttpErrorResponse) => {
      alert(error.message);
    }
  );  
  }

  deleteproduct(id : number):void{
    if (confirm("Are you sure you want to delete!")) {
      this.productService.deleteProduct(id).subscribe();  
      alert("redirecting to FoodFox Home");
      this.router.navigate(['/dashboard']);
    } else {
     alert("could not delete");
    }
  }

  pagination()
  {
    let j=0;
    this.dataSource=[];
      for(let i=(this.itemNo*(this.pageNum-1));i<(this.itemNo*this.pageNum);i++)
      {
        if(i<this.products.length){
        this.dataSource[j]=this.products[i];
        j++;
        }
      }
    if((this.products.length%this.itemNo)==0){
      this.numbers=[];
      for(let i=0;i<(Math.round(this.products.length/this.itemNo));i++)
      {
        this.numbers[i]=i;
      }
     }
      else if((this.products.length%this.itemNo)==this.products.length)
      {   
        this.numbers=[];
        this.numbers=[0];
      }
      else{
        this.numbers=[];
        for(let i=0;i<(Math.ceil(this.products.length/this.itemNo));i++)
        {
          this.numbers[i]=i;
        }
      }
      
  }


  public searchProducts(key : string):void {
    this.dataSource=[];
    for(let product of this.products){
      if(product.name.toLowerCase().indexOf(key.toLowerCase())!= -1 || product.category.toLowerCase().indexOf(key.toLowerCase())!= -1)
      {
        //results.push(product);
        this.dataSource.push(product);
      }
    }
    this.products= this.dataSource;
    if(this.dataSource.length==0 || !key)
    {
      this.getProducts();
    }
  }

  changePage(page:number)
  {
    this.pageNum=page;
    this.pagination();
  }

}

