import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '../log.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { UserCart } from '../usercart';
import { UsercartService } from '../usercart.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user : User=new User();
  user1 :User=new User();
  userCart :UserCart=new UserCart();
  constructor(private userService: UserService,private router:Router,private logService:LogService,private userCartService:UsercartService) {}

  ngOnInit(): void {
  }
 
  public register():void{
    
    this.userService.addUser(this.user).subscribe(
    (response: User)=> {

      //getting userId
      this.userService.getUserbyName(this.user.name).subscribe(
        (response:User)=>{
          this.user1=response;
           //for sending current id to other components
            this.logService.sendId(this.user1.id);
            //now add the user to usercart
            this.userCart.userId=this.user1.id;
            this.userCartService.addUserToCart(this.userCart).subscribe(
              (response2: UserCart)=> {
                },
                (error: HttpErrorResponse)=> {alert(error.message);
              }
            );
            this.router.navigate(['/dashboard']);
        },
        (error: HttpErrorResponse)=>{alert(error.message)}
      );
         
      },
       (error: HttpErrorResponse)=> {alert(error.message);
     }
   );
 
}
}
