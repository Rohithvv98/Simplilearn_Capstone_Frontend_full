
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '../log.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { UserCart } from '../usercart';
import { UsercartService } from '../usercart.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : User=new User();
  userCart :UserCart=new UserCart();
  userCarts:UserCart[];
  htmlStr: string = '';
  constructor(private userService: UserService,private router:Router, private logService :LogService, private userCartService : UsercartService) {
      this.userCarts=[];
   }

  ngOnInit(): void {
  }
  
  onSubmit()
  {
    this.userService.getUserbyName(this.user.name).subscribe(
      (response: User)=> {
         if(this.user.password==response.password){
            this.user=response;
           //for sending current id to other components
           this.logService.sendId(this.user.id);
            //to find if user is already present
            this.userCartService.getUserCart().subscribe(
              (response1 : UserCart[]) =>{
                this.userCarts=response1;
                let flag=0;
                for(let i=0;i<this.userCarts.length;i++)
                {
                  if(this.user.id==this.userCarts[i].userId)
                  {
                    flag=1;
                    
                  }
                }
                if(flag==0)
                {
                //now add the user to usercart
                this.userCart.userId=this.user.id;
                this.userCartService.addUserToCart(this.userCart).subscribe(
                  (response2: UserCart)=> {
                      
                    },
                    (error: HttpErrorResponse)=> {alert(error.message);
                  }
                );
                }
               
              },
              (error: HttpErrorResponse)=> {alert(error.message);
              }
            );

          

           this.router.navigate(['/dashboard']);
          }
          else{
           
            this.htmlStr="You have Entered Invalid Credentials!!";
            }
        },
         (error: HttpErrorResponse)=> {
          
          this.htmlStr="You have Entered Invalid Credentials!!";
       }
     );
  }
}
