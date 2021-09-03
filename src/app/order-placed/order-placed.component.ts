import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import { LogService } from '../log.service';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { User } from '../user';
import { UserCart } from '../usercart';
import { UsercartService } from '../usercart.service';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {

  public carts:Cart[];
  public userCarts:UserCart[];
  public cart:Cart=new Cart();
  public user:User=new User();
  public product:Product=new Product();

  constructor(private router:Router,private productService:ProductService,private logService:LogService,private userCartService:UsercartService,private cartService:CartService) {
    this.userCarts=[];
    this.carts=[];
   }

  ngOnInit(): void {
    this.logService.loggeduserId$.subscribe(
      (id)=>{
        if(id==0){
            this.router.navigate(['']);
        }});
    this.updateDatas();
    this.updQty();
    this.deleteCart();
  }

  public updateDatas()
  {
    this.logService.loggeduserId$.subscribe(
      (id)=>{
            this.user.id=id;
            this.userCartService.getUserCart().subscribe(
              (res:UserCart[])=>{
                this.userCarts=res;
                for(let i=0;i<this.userCarts.length;i++)
                {
                   
                  if(this.userCarts[i].userId==id)
                  {
                    
                   this.userCarts[i].grandTotal=0;
                   this.userCartService.updateUserToCart(this.userCarts[i]).subscribe();
                  }
                }    
              }
            );


          }
        );
    }

  public updQty()
  {
     this.userCartService.getUserCart().subscribe(
      (res:UserCart[])=>{
        this.userCarts=res;
        for(let i=0;i<this.userCarts.length;i++)
        {
          if(this.userCarts[i].userId==this.user.id)
          {
          this.cart.id=this.userCarts[i].cartId; 
          this.cartService.getCarts().subscribe(
            (response:Cart[])=>{
              this.carts=response;
              for(let i=0;i<this.carts.length;i++)
              {
                if(this.carts[i].id==this.cart.id)
                {
                  this.productService.getProductById(this.carts[i].productId).subscribe(
                    (resp:Product)=>{
                      this.product=resp;
                      
                      this.product.quantity=this.product.quantity-this.carts[i].quantity;
                      this.productService.updateProduct(this.product).subscribe(
                        (res:Product)=>{console.log(res);}
                      );
                    }
                  );
                }
              }
            }
          ); 
          }
        }
      }
     );
  }

  public deleteCart()
  {
    this.userCartService.getUserCart().subscribe(
      (res:UserCart[])=>{
        this.userCarts=res;
        for(let i=0;i<this.userCarts.length;i++)
        {
          if(this.userCarts[i].userId==this.user.id)
          {
          this.cart.id=this.userCarts[i].cartId; 
          this.cartService.getCarts().subscribe(
            (response:Cart[])=>{
              this.carts=response;
              for(let i=0;i<this.carts.length;i++)
              {
                if(this.carts[i].id==this.cart.id)
                {
                  this.cartService.deletefromCart(this.carts[i].sNo).subscribe();
                }
              }
            }
          ); 
          }
        }
      }
     );
  }

}
