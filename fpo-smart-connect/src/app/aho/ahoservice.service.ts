
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AhoserviceService {

  constructor(private http: HttpClient) { }
  getfpoList(distCode: any):Observable<any> {
    return this.http.get(`${environment.port}/ahoUpdate/getfpoList/` + distCode ,{ withCredentials: true });
  }
  getBodMeetingDetails(financialYear:any,fpoId:any):Observable<any> {
    return this.http.get(`${environment.port}/ahoUpdate/getBodMeetingDetails/${financialYear}/${fpoId}`);
  }
  // getFpoDetails(financialYear:any,fpoId:any):Observable<any> {
  //   return this.http.get(`${environment.port}/ahoUpdate/getFpoDetails/${financialYear}/${fpoId}`);
  // }

  // added by arindam


  getfpoListforBusiness(distCode: any):Observable<any> {
    return this.http.get(`${environment.port}/ahoUpdate/getfpoListforBusiness/` + distCode ,{ withCredentials: true });
  }
  getBusinessDetails(financialYear:any,fpoId:any):Observable<any> {
    return this.http.get(`${environment.port}/ahoUpdate/getBusinessDetails/${financialYear}/${fpoId}`);
  } 
  getCropDetails(financialYear:any,fpoId:any):Observable<any> {
    return this.http.get(`${environment.port}/ahoUpdate/getCropDetails/${financialYear}/${fpoId}`);
  }
  getTurnoverDetails(financialYear:any,fpoId:any):Observable<any> {
    return this.http.get(`${environment.port}/ahoUpdate/getTurnoverDetails/${financialYear}/${fpoId}`);
  }
  getProfitDetails(financialYear:any,fpoId:any):Observable<any> {
    return this.http.get(`${environment.port}/ahoUpdate/getProfitDetails/${financialYear}/${fpoId}`);
  }
  submitFinaldata(menu: any): Observable<any> {
    return this.http.post(`${environment.port}/ahoUpdate/submitFinaldata`, menu,{ withCredentials: true });
  }
  
}

