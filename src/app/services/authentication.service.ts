import { Injectable } from '@angular/core';
import {AppUsser} from "../model/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
users :AppUsser[]=[];
authenticatedUser :AppUsser|undefined;
  constructor() {
    this.users.push({userId:UUID.UUID(),username:"user1",password:"1234",roles:["USER"]});
    this.users.push({userId:UUID.UUID(),username:"user2",password:"1234",roles:["USER"]});
    this.users.push({userId:UUID.UUID(),username:"admin",password:"1234",roles:["USER","ADMIN"]});
  }
  public login(username:string,password:string):Observable<AppUsser>{
    let appUser=this.users.find(u=>u.username==username);
    if(!appUser) {return throwError(()=>new Error("User not found !"));}
    if(appUser.password!=password){
      return throwError(()=>new Error("Bad credentials"));
    }
    return of(appUser);
  }
  public authenticateUser(appUser:AppUsser):Observable<boolean>{
    this.authenticatedUser=appUser;
    localStorage.setItem("authUser",JSON.stringify({username:appUser.username,roles:appUser.roles,jwt:"JWT_TOKEN"}));
 return of(true);
  }
  public hasRole(role:string):boolean{
    return this.authenticatedUser!.roles.includes(role);
  }
  public isAuthenticated():boolean{
    return this.authenticatedUser!=undefined;
  }
  public logout():Observable<boolean>{
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }
}
