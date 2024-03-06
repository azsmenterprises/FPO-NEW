import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FigServiceService {

  sideBarOpen = new Subject<boolean>()

  constructor(private httpclient: HttpClient) { }

  getfarmerRegData(): Observable<any> {
    return this.httpclient.get(
      `${environment.port}/fig/getAllAppliedFarmer`,
      { withCredentials: true }
    );
  }

  fetchAllProducedDataForForwardToFpo(figRefNo: any): Observable<any> {
    return this.httpclient.get(`${environment.port}/fig/fetchAllProducedDataForForwardToFpo/` + figRefNo)
  }

  getAvailableCropType(godownId: any): Observable<any> {
    return this.httpclient.get(`${environment.port}/fig/getAvailableCropType/` + godownId)
  }

  approve(data: any): Observable<any> {
    return this.httpclient.post(`${environment.port}/fig/approve`, data);
  }

  forwardToFpo(data: any): Observable<any> {
    return this.httpclient.post(`${environment.port}/fig/forwardToFpo`, data);
  }

  // ==========================Produced Start=============================================

  getFPOs(figRefNo: any): Observable<any> {
    return this.httpclient.get(`${environment.port}/fig/getFPOs/` + figRefNo);
  }

  getFarmers(figRefNo: any): Observable<any> {
    return this.httpclient.get(
      `${environment.port}/fig/getFarmers/` + figRefNo
    );
  }

  forwardProducedDataToFpo(dataForForwardToFpo: any): Observable<any> {
    return this.httpclient.post(`${environment.port}/fig/forwardProducedDataToFpo`, dataForForwardToFpo)
  }

  getCropCata(): Observable<any> {
    return this.httpclient.get(`${environment.port}/fig/getCropCata`);
  }

  // getAllAvailableCropAccToCatagory(godownId:any,cropCat: any): Observable<any> {
  //   return this.httpclient.get(
  //     `${environment.port}/fig/getAllAvailableCropAccToCatagory/` +godownId +'/'+ cropCat 
  //   );
  // }

  getCropAccToCatagory(cropCat: any): Observable<any> {
    return this.httpclient.get(
      `${environment.port}/fig/getCropAccToCatagory/` + cropCat
    );
  }
  getAllVarieties(cropCode: any): Observable<any> {
    return this.httpclient.get(
      `${environment.port}/fig/getAllVarieties/` + cropCode
    );
  }
  getAllAvailableCropVarieties(cropCode: any): Observable<any> {
    return this.httpclient.get(
      `${environment.port}/fig/getAllAvailableCropVarieties/` + cropCode
    );
  }


  getItemTypeData(itemType: any): Observable<any> {
    return this.httpclient.get(
      `${environment.port}/fig/getItemTypeData/` + itemType
    );
  }

  getFertBrand(fertTypeName: any): Observable<any> {

    return this.httpclient.get(
      `${environment.port}/fig/getFertBrand/` + fertTypeName
    );
  }

  onSubmitProducedForm(indentForm: any): Observable<any> {
    return this.httpclient.post(
      `${environment.port}/fig/onSubmitProducedForm`,
      indentForm
    );
  }

  onSubmitIndentForm(indentForm: any): Observable<any> {
    return this.httpclient.post(
      `${environment.port}/fig/onSubmitIndentForm`,
      indentForm
    );
  }

  getAppliedProducedAggregator(figRefNo: any): Observable<any> {
    return this.httpclient.get(
      `${environment.port}/fig/getAppliedProducedAggregator/` + figRefNo
    );
  }

  getAppliedSaleIndents(fpoId: any, itemType: any,year:any ,season:any): Observable<any> {
    return this.httpclient.get(
      `${environment.port}/fig/getAppliedSaleIndents/` +
      fpoId +
      '/' +
      itemType + '/' + year + '/' + season
    );
  }

  getApprovedIndents(figRefNo: any): Observable<any> {
    return this.httpclient.get(
      `${environment.port}/fig/getApprovedIndents/` + figRefNo
    );
  }
  getRejectedIndents(figRefNo: any): Observable<any> {
    return this.httpclient.get(
      `${environment.port}/fig/getRejectedIndents/` + figRefNo
    );
  }
  getapprovedFpo(figRefNo:any): Observable<any> {
    return this.httpclient.get(
      `${environment.port}/fig/getapproveddata/`+figRefNo
    );
  }
  getRejectedFpo(figRefNo:any): Observable<any> {
    return this.httpclient.get(
      `${environment.port}/fig/getrejectedata/`+figRefNo
    );
  }
  // ==========================Produced end=============================================
}
