import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RootAdminService {
  
  sideBarOpen = new Subject<boolean>()

  constructor(private http: HttpClient) { }
  marquee_service(menu: any): Observable<any> {
    return this.http.post(`${environment.port}/adminUpdate/addData`, menu);
  }

  getInfoType() {
    return this.http.get(`${environment.port}/adminUpdate/getInfoType`);

  }

  marqueeDataList() {
    return this.http.get(`${environment.port}/adminUpdate/getAllData`);
  }
  deleteMarquee(x: any): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/delete/` + x);
  }
  updateMarquee(menu: any, id: any): Observable<any> {
    let data = {
      id: id,
      menu: menu
    }
    return this.http.post(`${environment.port}/adminUpdate/update`, data);
  }

  getFigRegisterData() {
    return this.http.get(`${environment.port}/adminUpdate/getFigRegisterData`)
  }

  approveFig(data: any): Observable<any> {
    return this.http.post(`${environment.port}/adminUpdate/approveFig`, data)
  }

  rejectFig(data: any): Observable<any> {
    return this.http.post(`${environment.port}/adminUpdate/rejectFig`, data)
  }

  onsubmit(pdfFileUrl: any, schemeimageUrl: any, data: any): Observable<any> {
    const formData = new FormData();
    formData.append('pdfFile', pdfFileUrl);
    formData.append('schemeimage', schemeimageUrl);
    formData.append('value', JSON.stringify(data));
    return this.http.post(`${environment.port}/adminUpdate/schemeMaster`, formData);
  }

  getFpodata(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getfpodata/`);
  }
  blockUnblockFpo(data: any): Observable<any> {
    return this.http.post(`${environment.port}/adminUpdate/blockUnblockfpo`, data)
  }

  approveFpo(data:any):Observable<any>{
    return this.http.post(`${environment.port}/adminUpdate/approveFpo`, data)
  }

  getIa(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getIa`);
  }

  getCbbo(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getCbbo`);
  }

  submit(data:any):Observable<any>{
    return this.http.post(`${environment.port}/adminUpdate/submit`, data);
  }

  getIaCbbo() :Observable<any>{
    return this.http.get(`${environment.port}/adminUpdate/getIaCbbo`);
  }

  getFpo() :Observable<any>{
    return this.http.get(`${environment.port}/adminUpdate/getFpo`);
  }

  assign(data:any):Observable<any>{
    return this.http.post(`${environment.port}/adminUpdate/assign`, data);
  }

  getIaCbboFpo() :Observable<any>{
    return this.http.get(`${environment.port}/adminUpdate/getIaCbboFpo`);
  }
  getCbboMaster(iaName:any):Observable<any>{
    return this.http.get(`${environment.port}/adminUpdate/getCbboMaster/`+ iaName);
  }

  gettingCbbo(iaName:any): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/gettingCbbo/` + iaName);
  }

  missingFpo() {
    return this.http.get(`${environment.port}/adminUpdate/missingFpo`);
  }

  mappingofmissingData(data: any): Observable<any> {
    return this.http.post(`${environment.port}/adminUpdate/mappingofmissingData`, data);
  }

  rejectMissingFpo(data: any): Observable<any> {
    return this.http.post(`${environment.port}/adminUpdate/rejectMissingFpo`, data);
  }

  gettotalIa(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/gettotalIa`);
  }

  gettotalCbbo(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/gettotalCbbo`);
  }

  gettotalFpo(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/gettotalFpo`);
  }

  getwomenBod(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getwomenBod`);
  }

  getshareHolder(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getshareHolder`);
  }

  getshareCapital(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getshareCapital`);
  }

  getaverageofCapital(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getaverageofCapital`);
  }

  getaverageofShare(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getaverageofShare`);
  }

  getbarchartDetails(year:any): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getbarchartDetails/${year}`);
  }

  gettargetDetails(year: any, iaName: any): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/gettargetDetails/${year}/${iaName}`)
  }

  getwomenBodyearwise(year:any): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getwomenBodyearwise/` + year);
  }

  getwomenBodagencywise(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getwomenBodagencywise`);
  }

  getequityGrant(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getequityGrant`);
  }

  getequityGrantyearwise(year:any,iaName:any): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getequityGrantyearwise/${year}/${iaName}`);
  }

  getequitygrantagencywise(year:any,iaName:any): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getequitygrantagencywise/${year}/${iaName}`);
  }

  getshareCapitalyearwise(year:any): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getshareCapitalyearwise/` + year);
  }

  getcapitalagencywise(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getcapitalagencywise`);
  }

  getcapitalaverage(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getcapitalaverage`);
  }

  getshareHolderyearwise(year:any): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getshareHolderyearwise/` + year);
  }

  getholderagencywise(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getholderagencywise`);
  }

  getholderaverage(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getholderaverage`);
  }

  getturnover(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getturnover`);
  }

  getturnoveryearwise(year:any,iaName:any): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getturnoveryearwise/${year}/${iaName}`);
  }

  getturnoveragencywise(year:any,iaName:any): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getturnoveragencywise/${year}/${iaName}`);
  }

  publishData(data:any):Observable<any>{
    return this.http.post(`${environment.port}/adminUpdate/publishData`, data);
  }

  getData():Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getOlddata`);
  }
  
  deleteRow(map:any):Observable<any> {
    return this.http.post(`${environment.port}/adminUpdate/deleteRow`,map);
  }

  deleteOldRow(details:any):Observable<any> {
    return this.http.post(`${environment.port}/adminUpdate/deleteOldRow`,details);
  }

  deleteRowMaping(map:any):Observable<any> {
    return this.http.post(`${environment.port}/adminUpdate/deleteRowMaping`,map);
  }

  getgrievanceData():Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/getgrievanceData`);
  }
}
