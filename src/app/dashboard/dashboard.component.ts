import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import { LogService } from '../log.service';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { UserCart } from '../usercart';
import { UsercartService } from '../usercart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public usercarts:UserCart[];
  public carts:Cart[];
  public products: Product[];
  cart :Cart=new Cart();
  user :User=new User();



  constructor(private router:Router,private productService: ProductService,private cartService:CartService,private logService :LogService,private userService:UserService,private userCartService:UsercartService) { 
    this.products=[];
    this.usercarts=[];
    this.carts=[];
  }

  ngOnInit(): void { 
    this.logService.loggeduserId$.subscribe(
      (id)=>{
        if(id==0){
            this.router.navigate(['']);
        }});
    this.getProducts();
    this.getUserId();
   }

  public getProducts():void{
  this.productService.getProducts().subscribe(
    (response: Product[])=> {
      let j=0;
      for(let i=0;i<response.length;i++)
      {
        if(response[i].quantity>0)
        {
          this.products[j]=response[i];
          j++;
        }
      }
    },
    (error : HttpErrorResponse) => {
      alert(error.message);
    }
  );  
  }

  public categorysearch(key : string):void {

    const results: Product[] =[];
    for(const product of this.products){
      if(product.category.toLowerCase().indexOf(key.toLowerCase())!= -1)
      {
        results.push(product);
      }
    }
    this.products= results;
    if(results.length==0 || !key)
    {
      this.getProducts();
      
    }
  }


  public addtocart(prodid:number){
    this.cart.productId=prodid;  //ProductId
    //this.cart.quantity=?; qty needed
    this.cartService.getCarts().subscribe(
      (res:Cart[])=>{
        this.carts=res;
        let flag=0;
        //if product is present
        for(let i=0;i<this.carts.length;i++)
        { 
          if(this.carts[i].id==this.cart.id)
          {
          if(this.carts[i].productId==prodid)
          {
            flag=1;
            this.carts[i].quantity=this.carts[i].quantity+1;
            for(let j=0;j<this.products.length;j++)
              {
                if(this.products[j].id==prodid)
                {
                  this.carts[i].total=this.carts[i].quantity*this.products[j].price;
                  this.cartService.updateCart(this.carts[i]).subscribe(
                    (response:Cart)=>{
                      alert("added to cart");

                    }
                  );
                }
              }
           
          }
        }
        }
        //if product is not present
        if(flag==0)
        {
          this.cart.quantity=1;
          for(let i=0;i<this.products.length;i++)
          {
            if(this.products[i].id==prodid)
            {
              this.cart.total=this.products[i].price*this.cart.quantity;
            }
          }
          this.cartService.addToCart(this.cart).subscribe(
            (res:Cart)=> {
              alert("added to cart");
            }
          );
        }
      }
    );
    
  }

  public getUserId()
  {
    this.logService.loggeduserId$.subscribe(
      (id)=>{
          this.userCartService.getUserCart().subscribe(
            (resp:UserCart[])=>{
              this.usercarts=resp;
              for(let i=0;i<this.usercarts.length;i++)
              {
                if(this.usercarts[i].userId==id)
                {
                  this.cart.id=this.usercarts[i].cartId;
                }
              }
            }
          );
          }
        );
  }
}
