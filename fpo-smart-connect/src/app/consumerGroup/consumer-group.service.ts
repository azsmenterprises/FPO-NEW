import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsumerGroupService {

  sideBarOpen=new Subject<boolean>()

  constructor(private http:HttpClient) { }

  getDashboardData(cgRefNo:any):Observable<any>{
    return this.http.get(`${environment.port}/consumerGroup/getDashboardData/`+cgRefNo)
  }
  getDashboardChart(cgRefNo:any):Observable<any>{
    return this.http.get(`${environment.port}/consumerGroup/getDashboardChart/`+cgRefNo)
  }

  getCropCatagory(cgRefNo:any):Observable<any>{
    return this.http.get(`${environment.port}/consumerGroup/getAllCropCat/`+cgRefNo)
  }

  loadCrops(cropCat:any):Observable<any>{
    return this.http.get(`${environment.port}/consumerGroup/loadCrops/`+cropCat)
  }

  addProductSubmit(formData:any):Observable<any>{
    return this.http.post(`${environment.port}/consumerGroup/addProductSubmit`,formData)
  }

  getConsumerListToApprove(cgRefNo:any):Observable<any>{
    return this.http.get(`${environment.port}/consumerGroup/getConsumerListToApprove/`+cgRefNo)
  }

  approveConsumer(dataToApprove:any,buttonType:any):Observable<any>{
    dataToApprove.buttonType=buttonType
    return this.http.post(`${environment.port}/consumerGroup/approveConsumer`,dataToApprove)
  }

  getFpoListForCg(cgRefNo:any):Observable<any>{
    return this.http.get(`${environment.port}/consumerGroup/getFpoListForCg/`+cgRefNo)
  }

  getApprovedConsumerList(cgRefNo:any):Observable<any>{
    return this.http.get(`${environment.port}/consumerGroup/getApprovedConsumerList/`+cgRefNo)
  }

  blockUnblockConsumer(data:any):Observable<any>{
    return this.http.post(`${environment.port}/consumerGroup/blockUnblockConsumer`,data)
  }
  
  getProductsAddedList(cgRefNo:any):Observable<any>{
    return this.http.get(`${environment.port}/consumerGroup/getProductsAddedList/`+cgRefNo)
  }
  
  blockUnblockProduct(data:any):Observable<any>{
    return this.http.post(`${environment.port}/consumerGroup/blockUnblockProduct`,data)
  }

  getAllDist():Observable<any>{
    return this.http.get(`${environment.port}/landRoute/getDistricts`)
  }

  consumerRegisterSubmit(consumerRegisterSubmit:any):Observable<any>{
    return this.http.post(`${environment.port}/consumerGroup/consumerRegisterSubmit`,consumerRegisterSubmit)
  }
  getTrader(cgRefNo:any):Observable<any>{
    return this.http.get(`${environment.port}/consumerGroup/getTrader/`+cgRefNo)
  }
  updateTrader(cgRefNo:any,data:any):Observable<any>{
    // ////////console.log(cgRefNo,"service");
    
    return this.http.post(`${environment.port}/consumerGroup/updateTrader/`+cgRefNo,data)
  }

}
