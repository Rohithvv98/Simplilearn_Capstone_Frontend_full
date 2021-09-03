
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '../log.service';
import { User } from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user:User=new User();

   constructor(private logService: LogService,private userService :UserService,private router:Router) {
    
    } 
   ngOnInit(): void {
    this.getUser();
  }
 
 // for interaction with login
 public getUser():void{
  this.logService.loggeduserId$.subscribe(
    (id)=>{
      if(id!=0){
      this.userService.getUserbyId(id).subscribe(
        (response:User)=>{
          this.user=response;
        },
        (error: HttpErrorResponse)=>{
          alert(error.message);
        }
      );
    }
    }
  );
}


public logout()
{
  window.location.replace('/login');
}

}
