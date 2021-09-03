
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import { CartTable } from '../carttable';
import { LogService } from '../log.service';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { UserCart } from '../usercart';
import { UsercartService } from '../usercart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartTable:CartTable[];
  public cart:Cart=new Cart();
  public product:Product=new Product();
  public products:Product[];
  public userCarts:UserCart[];
  public carts:Cart[];
  total:number=0;


  constructor(private router:Router,private logService:LogService,private productService:ProductService, private userCartService:UsercartService,private cartService:CartService) { 
    this.userCarts=[];
    this.cartTable=[];
    this.carts=[];
    this.products=[];
  }

  ngOnInit(): void {
    this.logService.loggeduserId$.subscribe(
      (id)=>{
        if(id==0){
            this.router.navigate(['']);
        }});
    this.getCartId();
    this.getcarts();
  }

  public getcarts()
  {
    this.cartService.getCarts().subscribe(
      (response:Cart[])=>{
        this.carts=response;
        let j=0;
        for(let i=0;i<this.carts.length;i++)
        {
          if(this.carts[i].id==this.cart.id)
          {   
              this.productService.getProductById(this.carts[i].productId).subscribe(
                (response:Product)=>{
                  this.product=response;
                  this.cartTable[j]=new CartTable(this.carts[i].id,this.product.name,this.product.price,this.carts[i].quantity,this.carts[i].total);
                  j++;
                  this.total+=this.carts[i].total;
                 
                }
              );
          }
          
        }
        
      }
    );

  }

   public getCartId()
   {
     this.logService.loggeduserId$.subscribe(
       (id)=>{
             this.userCartService.getUserCart().subscribe(
               (res:UserCart[])=>{
                 this.userCarts=res;
                 for(let i=0;i<this.userCarts.length;i++)
                 {
                   if(this.userCarts[i].userId==id)
                   {
                    this.cart.id=this.userCarts[i].cartId;
                   }
                 }
               }
             );
           }
         );
   }

public deleteproduct(cartid:number,prodName:string)
{
  if(confirm("Do you want to remove '"+prodName+"' from Your Cart :("))
  {
    this.productService.getProducts().subscribe(
      (res:Product[])=>{
          this.products=res;
          for(let i=0;i<this.products.length;i++)
          {
            if(this.products[i].name==prodName)
            { 
              for(let j=0;j<this.carts.length;j++)
              {
                if((this.products[i].id==this.carts[j].productId)&&(this.carts[j].id==cartid))
                {
                  this.cartService.deletefromCart(this.carts[j].sNo).subscribe();
                  alert("redirecting to FoodFox Home");
                  this.router.navigate(['/dashboard']);
                }
              }
            }
          }
        }
    );
  }
}

public checkout()
{
  
   for(let k=0;k<this.userCarts.length;k++)
   {
     if(this.userCarts[k].cartId==this.cart.id)
     {
      this.userCarts[k].grandTotal=this.total;
      this.userCartService.updateUserToCart(this.userCarts[k]).subscribe(
        (response:UserCart)=>{
        }
      );
     }
   }
   this.router.navigate(['/payment']);
}

}
