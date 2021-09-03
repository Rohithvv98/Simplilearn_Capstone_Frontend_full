import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../log.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  product: Product=new Product();
  id:any;
  constructor(private logService:LogService, private productService: ProductService, private activatedRoute : ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.logService.loggeduserId$.subscribe(
      (id)=>{
        if(id==0){
            this.router.navigate(['']);
        }});

    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.id);
     this.productService.getProductById(this.id).subscribe(
       (response: Product)=> {
          this.product=response;  
         },
          (error: HttpErrorResponse)=> {alert(error.message);
        }
      );
  }

  public updateProduct():void{
    alert("Product Details of "+this.product.name+" is updated");
     this.productService.updateProduct(this.product).subscribe(
     (response: Product)=> {
      this.router.navigate(['/manage']);
       },
        (error: HttpErrorResponse)=> {alert(error.message);
      }
   );
}


}
