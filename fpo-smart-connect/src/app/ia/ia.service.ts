import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IaService {
  sideBarOpen = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getData`, { withCredentials: true });
  }
  getAverage(FinYear: any): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getAverage/` + FinYear, { withCredentials: true });
  }
  getYearwiseData(FinYear: any): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getYearwiseData/` + FinYear, { withCredentials: true })
  }

  getTabledata(FinYear: any): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getTabledata/` + FinYear, { withCredentials: true })
  }

  getturnOver(FinYear: any): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getturnOver/` + FinYear, { withCredentials: true });
  }

  getmouRegistration(FinYear: any): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getmouRegistration/` + FinYear, { withCredentials: true });
  }

  getBusinessplan(FinYear: any): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getBusinessplan/` + FinYear, { withCredentials: true });
  }

  getTargetdata(FinYear: any): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getTargetdata/` + FinYear, { withCredentials: true })
  }

  getAverageofshare(FinYear: any): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getAverageofshare/` + FinYear, { withCredentials: true })
  }
  submit(data: any): Observable<any> {
    return this.http.post(`${environment.port}/iaUpdate/submit`, data ,{ withCredentials: true });
  }
  getRegdage(fpoAge: any): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getRegdage/` + fpoAge, { withCredentials: true })
  }

  getAchievement(iaName: any,year : any): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getAchievement/${iaName}/${year}`)
  }
  iaTarget(data: any): Observable<any> {
    return this.http.post(`${environment.port}/iaUpdate/iaTarget`, data);
  }

  getcbboList(iaName: any): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getcbboList/` + iaName)
  }

  fpoList(iaName: any, cbboName: any,year:any): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/fpoList/${iaName}/${cbboName}/${year}`)
  }

  cbboTarget(data: any): Observable<any> {
    return this.http.post(`${environment.port}/iaUpdate/cbboTarget`, data);
  }

  showcbboTarget(iaName: any): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/showcbboTarget/` + iaName)
  }

  gettotalCbbo(): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/gettotalCbbo`,{ withCredentials: true });
  }

  gettotalFpo(): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/gettotalFpo`,{ withCredentials: true });
  }

  getwomenBod(): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getwomenBod`,{ withCredentials: true });
  }

  getshareHolder(): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getshareHolder`,{ withCredentials: true });
  }
  
  getshareCapital(): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getshareCapital`,{ withCredentials: true });
  }
  getaverageofCapital(): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getaverageofCapital`,{ withCredentials: true });
  }

  getaverageofShare(): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getaverageofShare`,{ withCredentials: true });
  }

  getaverageofTurnover(): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/getaverageofTurnover`,{ withCredentials: true });
  }

  selfTarget(): Observable<any> {
    return this.http.get(`${environment.port}/iaUpdate/selfTarget`,{ withCredentials: true })
  }

  deleteRowTarget(data: any): Observable<any> {
    return this.http.post(`${environment.port}/iaUpdate/deleteRowTarget`,data)
  }
  deleteCbboTarget(data: any): Observable<any> {
    return this.http.post(`${environment.port}/iaUpdate/deleteCbboTarget`,data)
  }
  // getDataByFilter(year : any, timeSlot: any,cbboName: any,fpo: any, ): Observable<any> {
  //   return this.http.get(`${environment.port}/iaUpdate/getDataByFilter/${year}/${timeSlot}/${cbboName}/${fpo}`)
  // }
  getDataByFilter(data: any): Observable<any> {
    console.log(data,"data");
    
    return this.http.post(`${environment.port}/iaUpdate/getDataByFilter`,data,{ withCredentials: true })
  }
}
