import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CbboService {
  constructor(private http: HttpClient) { }

  publishData(menu: any): Observable<any> {
    return this.http.post(`${environment.port}/cbboUpdate/publishData`, menu,{ withCredentials: true });
  }
  draftData(menu: any): Observable<any> {
    return this.http.post(`${environment.port}/cbboUpdate/draftData`, menu,{ withCredentials: true });
  }
  cbboList():Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getInfoType`);
  }
  getIa(): Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getIa`);
  }
  getMappingData(cbboName:any): Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getMappingData/` +cbboName);
  }
  getFpo(cbboName:any) :Observable<any>{
    return this.http.get(`${environment.port}/cbboUpdate/getFpo/` +cbboName);
  }
  getData():Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getData`,{ withCredentials: true });
  }
  draftedData():Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/draftedData`,{ withCredentials: true });
  }
  getDetails(fpoId: any):Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getDetails/` + fpoId);
  }
  deleteRow(cbboId: any): Observable<any> {
    return this.http.put(`${environment.port}/cbboUpdate/deleteRow/`, cbboId);
  }
  updateList(data: any): Observable<any> {
    return this.http.post(`${environment.port}/cbboUpdate/updateList`, data);
  }
  publish(data:any):Observable<any>{
    return this.http.post(`${environment.port}/cbboUpdate/updatepublishList`, data);
  }

  getdistrictList() :Observable<any>{
    return this.http.get(`${environment.port}/cbboUpdate/getdistrictList`);
  }

  getBlocks(districtCode: any):Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getBlocks/` + districtCode);
  }

  getfpoList(blockName: any):Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getfpoList/` + blockName);
  }

  sendtoAdmin(data:any):Observable<any>{
    return this.http.post(`${environment.port}/cbboUpdate/sendtoAdmin`, data,{ withCredentials: true });
  }

  gettotalCbbo(): Observable<any> {
    return this.http.get(`${environment.port}/adminUpdate/gettotalCbbo`);
  }

  getwomenBod(): Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getwomenBod`,{ withCredentials: true });
  }

  getshareHolder(): Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getshareHolder`,{ withCredentials: true });
  }
  
  getshareCapital(): Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getshareCapital`,{ withCredentials: true });
  }
  getaverageofCapital(): Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getaverageofCapital`,{ withCredentials: true });
  }

  getaverageofShare(): Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getaverageofShare`,{ withCredentials: true });
  }

  getaverageofTurnover(): Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getaverageofTurnover`,{ withCredentials: true });
  }

  getTotalFpo(): Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getTotalFpo`,{ withCredentials: true });
  }

  getCbbotarget(): Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getCbbotarget`,{ withCredentials: true });
  }

  monthWiseFpo(timeSlot: any, cbboName: any): Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/monthWiseFpo/${timeSlot}/${cbboName}`);
  }
  getCbboDataByFilter(data: any): Observable<any> {
    return this.http.post(`${environment.port}/cbboUpdate/getCbboDataByFilter`,data,{ withCredentials: true });
  }
  getFpoReportFile(fpoId: any):Observable<any> {
    return this.http.get(`${environment.port}/cbboUpdate/getFpoReportFile/` + fpoId);
  }
}
