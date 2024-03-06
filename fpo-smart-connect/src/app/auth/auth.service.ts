import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userRole: string ='';
  userName : string = '';

  constructor(private http:HttpClient, 
    // private cookieeService: CookieService
    ) { }


  getSalt():Observable<any>{
   return this.http.get(`${environment.port}/login/getSaltForUserAuth`,{withCredentials:true})
  }

  getUserType():Observable<any>{
   return this.http.get(`${environment.port}/login/getUserType`,{withCredentials:true})
  }

  login(loginForm:any):Observable<any>{
    return this.http.post(`${environment.port}/login/login`,loginForm,{withCredentials:true})
  }

  getUserRoleForAuth(){
   return this.http.get(`${environment.port}/login/getUserRoleForAuth`,{withCredentials:true})
  }

  logout():Observable<any>{
    return this.http.get(`${environment.port}/login/logout`,{withCredentials:true})
  }

  passwordChange(passwordChangeData:any):Observable<any>{
    return this.http.post(`${environment.port}/login/passwordChange`,passwordChangeData,{withCredentials:true})
  }

}
