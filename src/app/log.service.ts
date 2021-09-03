import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logUserIdsource=new BehaviorSubject<number>(0);
  loggeduserId$=this.logUserIdsource.asObservable();
  constructor() { }

  public sendId(loggedId :number){
     this.logUserIdsource.next(loggedId);
  }

}
