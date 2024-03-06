import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http:HttpClient) {
  }
  fpoRefNo: any;
  // figRefNo = 'ODFIG10';
  figRefNo:any
  farmerRefNo: any;
  adminRefNo: any;
  fpoId:any
  cgRefNo:any
  iaRefNo: any;
  cbboCode: any;
  cbboRefNo: any;
  adhrefNo:any;
  ahorefNo:any;


  getFigFpoCgId():Observable<any>{
    return this.http.get(`${environment.port}/login/getFigFpoIdForReloadPagePurpose`,{withCredentials:true})
  }
  sideBarUserName(data:any):Observable<any>{
   return this.http.post(`${environment.port}/login/sideBarUserName`,data,{withCredentials:true})
  }

}
