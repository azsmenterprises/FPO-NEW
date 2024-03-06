import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  AddRecordData1(value: any) {
    throw new Error('Method not implemented.');
  }
  deleteRewardDetails(x: any) {
    throw new Error('Method not implemented.');
  }
  updateRecordData(value: any) {
    throw new Error('Method not implemented.');
  }

  sideBarOpen = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  searchFarmer(fpoId: any, farmerId: any): Observable<any> {
    ////console.log(farmerId,"farmerid");
    

    return this.http.get(
      `${environment.port}/fpo/searchFarmer/` + fpoId + '/' + farmerId
    );
  }

  updateFpo(fpoId: any): Observable<any>{
    return this.http.get(`${environment.port}/updateFpo/updateFpoData/` + fpoId);
  }
  uploadBODList(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/uploadBODList/`, data);
  }

  AddBoarddirectors(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddBoarddirectors/`, data);
  }
  updateBoardDirectors(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateBoardDirectors/`, data);
  }
  getFpoDetails(fpoId: any): Observable<any>{
    return this.http.get(`${environment.port}/updateFpo/getFpoDetails/` + fpoId);
  }
  deleteBoardDirectors(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteBoardDirectors/`, data);
  }

  AddStaffDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddStaffDetails/`, data);
  }
  updateStaffDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateStaffDetails/`, data);
  }
  deleteStaffDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteStaffDetails/`, data);
  }

  deleteRow1(i:any,fpoId:any): Observable<any> {
    let data = {
      index: i,
      fpoId: fpoId,
    };
    return this.http.post(
      `${environment.port}/updateFpo/deleteRow1/` ,data
    );
  }

  deleteRowBod(i:any,fpoId:any): Observable<any> {
    
    
    let data = {
      index: i,
      fpoId: fpoId,
    };
    return this.http.post(
      `${environment.port}/updateFpo/deleteRowBod/` ,data
    );
  }

  deleteRowStaff(i:any,fpoId:any): Observable<any> {
    //console.log("in service deleterow1");
    
    let data = {
      index: i,
      fpoId: fpoId,
    };
    return this.http.post(
      `${environment.port}/updateFpo/deleteRowStaff/` ,data
    );
  }
  deleteRowEquity(i:any,fpoId:any): Observable<any> {
    //console.log("in service deleterow1");
    
    let data = {
      index: i,
      fpoId: fpoId,
    };
    return this.http.post(
      `${environment.port}/updateFpo/deleteRowEquity/` ,data
    );
  }

  deleteRowCredit(i:any,fpoId:any): Observable<any> {
    //console.log("in service deleterow1");
    
    let data = {
      index: i,
      fpoId: fpoId,
    };
    return this.http.post(
      `${environment.port}/updateFpo/deleteRowCredit/` ,data
    );
  }



  deleteRowOther(i:any,fpoId:any): Observable<any> {
    //console.log("in service deleterow1");
    
    let data = {
      index: i,
      fpoId: fpoId,
    };
    return this.http.post(
      `${environment.port}/updateFpo/deleteRowOther/` ,data
    );
  }


  deleteRowfinYear(i:any,fpoId:any): Observable<any> {
    //console.log("in service deleterow1");
    
    let data = {
      id: i,
      fpoId: fpoId,
    };
    return this.http.post(
      `${environment.port}/updateFpo/deleteRowfinYear/` ,data
    );
  }



  // deleteRow2(i:any,fpoId:any): Observable<any> {
  //   let data = {
  //     index: i,
  //     fpoId: fpoId,
  //   };
  //   return this.http.post(
  //     `${environment.port}/updateFpo/deleteRow2/` ,data
  //   );
  // }



  deleterowInfra(i:any,fpoId:any): Observable<any> {
    let data = {
      index: i,
      fpoId: fpoId,
    };
    return this.http.post(
      `${environment.port}/updateFpo/deleterowInfra/` ,data
    );
  }

  deleteLicRow(i:any,fpoId:any): Observable<any> {
    let data = {
      index: i,
      fpoId: fpoId,
    };
    return this.http.post(
      `${environment.port}/updateFpo/deleteLicRow/` ,data
    );
  }

  

  // deleteTrainingRow(i:any,fpoId:any): Observable<any> { let data = {id: i, fpoId: fpoId, };
  //   return this.http.post(
  //     `${environment.port}/updateFpo/deleteTrainingRow/` ,data
  //   );
  // }




  // deleteRow3(i:any,fpoId:any): Observable<any> {
  //   let data = {
  //     id: i,
  //     fpoId: fpoId,
  //   };
  //   return this.http.post(
  //     `${environment.port}/updateFpo/deleteRow3/` ,data
  //   );
  // }
  cropDataOfFpo(fpoId: any) {
    return this.http.get(
      `${environment.port}/updateFpo/cropDataOfFpo/` + fpoId
    );
  }

  enumeratorSubmit(enumData: any, fpoId: any): Observable<any> {
    let data = {
      enumData: enumData,
      fpoId: fpoId,
    };
    return this.http.post(`${environment.port}/updateFpo/updateEnum`, data);
  }

  fpoDetailsSubmit(fpoDetailsData: any, fpoId: any): Observable<any> {
    let data = {
      fpoData: fpoDetailsData,
      fpoId: fpoId,
    };
    return this.http.post(
      `${environment.port}/updateFpo/updatefpoDetails`,
      data
    );
  }
  farmerDetailsSubmit(data: any): Observable<any> {
    return this.http.post( `${environment.port}/updateFpo/farmerDetailsSubmit`, data
    );
  }

  businessActivityUpdate(formData: any, fpoId: any): Observable<any> {
    let data = {
      form: formData,
      fpoId: fpoId,
    };
    return this.http.post(
      `${environment.port}/updateFpo/businessActivityUpdate`,
      data
    );
  }

  uploadBusinessFile(data: any): Observable<any> {
    return this.http.post( `${environment.port}/updateFpo/uploadBusinessFile`, data
    );
  }

  totalBusinessDoneSubmit(totalBusinessDone: any, fpoId: any): Observable<any> {
    let data = {
      totalBusinessDone: totalBusinessDone,
      fpoId: fpoId,
    };
    return this.http.post(
      `${environment.port}/updateFpo/totalBusinessDoneSubmit`,
      data
    );
  }

  cropDetailsUpdate(cropData: any): Observable<any> {
    return this.http.post( `${environment.port}/updateFpo/cropDetailsUpdate`, cropData
    );
  }
  deleteCropListDetails(cropData: any): Observable<any> {
    return this.http.post( `${environment.port}/updateFpo/deleteCropListDetails`, cropData
    );
  }

  boardDirectorsDataSubmit(boardDirectors: any, fpoId: any): Observable<any> {
    let data = {
      boardDirectorsData: boardDirectors,
      fpoId: fpoId,
    };
    return this.http.post(
      `${environment.port}/updateFpo/boardDirectorsDataSubmit`,
      data
    );
  }

  detailsOfBoardDirectors(boardDirectors: any): Observable<any> {
    return this.http.post(
      `${environment.port}/updateFpo/detailsOfBoardDirectors`,
      boardDirectors
    );
  }

  detailsOfScheme(boardDirectors: any): Observable<any> {
    return this.http.post(
      `${environment.port}/updateFpo/detailsOfScheme`,
      boardDirectors
    );
  }


  detailsOfOtherScheme(boardDirectors: any): Observable<any> {
    return this.http.post(
      `${environment.port}/updateFpo/detailsOfOtherScheme`,
      boardDirectors
    );
  }

  detailsOfCredScheme(boardDirectors: any): Observable<any> {
    return this.http.post(
      `${environment.port}/updateFpo/detailsOfCredScheme`,
      boardDirectors
    );
  }

  staffDetailsUpdate(staffDetails: any): Observable<any> {
    return this.http.post(
      `${environment.port}/updateFpo/staffDetailsUpdate`,
      staffDetails
    );
  }

  groupDetailsUpdate(groupDetails: any): Observable<any> {
    return this.http.post(
      `${environment.port}/updateFpo/groupDetailsUpdate`,
      groupDetails
    );
  }

  businessExtraDetails( data: any): Observable<any> {
    return this.http.post(`${environment.port}/updateFpo/businessExtraDetails`,data
    );
  }


  InfrastructureDetail(businessExtraDetail: any, fpoId: any): Observable<any> {
    var data = {
      fpoId: fpoId,
      businessExtraDetail: businessExtraDetail,
    };
    return this.http.post(
      `${environment.port}/updateFpo/InfrastructureDetail`,
      data
    );
  }
  
  secondaryBusinessDetailsUpdate( secondaryBusinessDetails: any): Observable<any> {
    return this.http.post(`${environment.port}/updateFpo/secondaryBusinessDetailsUpdate`, secondaryBusinessDetails
    );
  }
  deleteSecBusinessDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteSecBusinessDetails/`, data);
  }
  primaryBusinessDetailsUpdate(
    primaryBusinessDetailsUpdate: any
  ): Observable<any> {
    return this.http.post(
      `${environment.port}/updateFpo/primaryBusinessDetailsUpdate`,
      primaryBusinessDetailsUpdate
    );
  }

  deleteRow7(i:any,fpoId:any): Observable<any> {
    let data = {
      index: i,
      fpoId: fpoId,
    };
    return this.http.post(
      `${environment.port}/updateFpo/deleteRow7/` ,data
    );
  }

  licenseDetailsUpdate(
    primaryBusinessDetailsUpdate: any
  ): Observable<any> {
    return this.http.post(
      `${environment.port}/updateFpo/licenseDetailsUpdate`,
      primaryBusinessDetailsUpdate
    );
  }






  InfrastructureDetailUpdate(
    InfrastructureDetail: any
  ): Observable<any> {
    return this.http.post(
      `${environment.port}/updateFpo/InfrastructureDetailUpdate`,
      InfrastructureDetail
    );
  }

  storageDetailUpdate( storageDetail: any): Observable<any> {
    return this.http.post(`${environment.port}/updateFpo/storageDetailUpdate`, storageDetail
    );
  }
  deleteStorageDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteStorageDetails/`, data);
  }
  accountDetailsSubmit(accountData: any, fpoId: any): Observable<any> {
    let data = {
      fpoId: fpoId,
      accountData: accountData,
    };
    return this.http.post(
      `${environment.port}/updateFpo/accountDetailsSubmit`,
      data
    );
  }

  finYearDetails(fpoId: any): Observable<any> {
    return this.http.get(
      `${environment.port}/updateFpo/finYearDetails/` + fpoId
    );
  }

  schemesDetails(fpoId: any): Observable<any> {
    return this.http.get(
      `${environment.port}/updateFpo/schemesDetails/` + fpoId
    );
  }

  finYearDetailsUpdate(data: any): Observable<any> {
    return this.http.post(`${environment.port}/updateFpo/finYearDetailsUpdate`,data);
  }

  deleteFinDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteFinDetails/`, data);
  }
  downloadPdf(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/downloadPdf/`, data);
  }

  AddEquityData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddEquityData/`, data);
  }
  AddRecordData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddRecordData/`, data);
  }

  updateEquityData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateEquityData/`, data);
  }

  deleteEquityDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteEquityDetails/`, data);
  }
//================schemes===============================================
  AddCreditData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddCreditData/`, data);
  }

  updateCreditData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateCreditData/`, data);
  }

  deleteCreditDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteCreditDetails/`, data);
  }

  AddOtherData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddOtherData/`, data);
  }

  updateOtherData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateOtherData/`, data);
  }

  deleteOtherDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteOtherDetails/`, data);
  }

  //============================

  AddLicenseData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddLicenseData/`, data);
  }

  updateLicenseData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateLicenseData/`, data);
  }

  deleteLicenseDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteLicenseDetails/`, data);
  }

  AddOtherLicenseData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddOtherLicenseData/`, data);
  }

  updateOtherLicenseData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateOtherLicenseData/`, data);
  }

  deleteOtherLicenseDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteOtherLicenseDetails/`, data);
  }

  AddPrimaryBusinessDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddPrimaryBusinessDetails/`, data);
  }

  updatePrimaryBusinssDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updatePrimaryBusinssDetails/`, data);
  }

  deletePrimaryBusinessDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deletePrimaryBusinessDetails/`, data);
  }

  addInfrastructureDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/addInfrastructureDetails/`, data);
  }

  updateInfrastructureDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateInfrastructureDetails/`, data);
  }

  deleteInfrastructureDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteInfrastructureDetails/`, data);
  }
  addQualityControlDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/addQualityControlDetails/`, data);
  }

  updateQualityControlDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateQualityControlDetails/`, data);
  }

  deleteQualityControlDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteQualityControlDetails/`, data);
  }

  addCollectionCenterDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/addCollectionCenterDetails/`, data);
  }

  updateCollectionCenterDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateCollectionCenterDetails/`, data);
  }

  deleteCollectionCenterDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteCollectionCenterDetails/`, data);
  }

  addFacilityCenterDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/addFacilityCenterDetails/`, data);
  }

  updateFacilityCenterDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateFacilityCenterDetails/`, data);
  }

  deleteFacilityCenterDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteFacilityCenterDetails/`, data);
  }
  AddTieupsDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddTieupsDetails/`, data);
  }
  AddTieupsData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddTieupsData/`, data);
  }
  updateTieupsData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateTieupsData/`, data);
  }
  deleteTieupsDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteTieupsDetails/`, data);
  }

  schemesDetailsUpdate(data: any): Observable<any> {
    return this.http.post(
      `${environment.port}/updateFpo/schemesDetailsUpdate`,
      data
    );
  }
  meetingDetailsFetch(fpoId: any): Observable<any> {
    return this.http.get(
      `${environment.port}/updateFpo/meetingDetailsFetch/` + fpoId
    );
  }

  meetingDetailsUpdate(meetingData: any): Observable<any> {
    return this.http.post(`${environment.port}/updateFpo/meetingDetailsUpdate`, meetingData );
  }
  deleteScheduleMeeting(data: any): Observable<any> {
    return this.http.post(`${environment.port}/updateFpo/deleteScheduleMeeting`, data );
  }

  trainingDetailsFetch(fpoId: any): Observable<any> {
    return this.http.get(
      `${environment.port}/updateFpo/trainingDetailsFetch/` + fpoId
    );
  }

  trainingDataUpdate(data: any): Observable<any> {
    return this.http.post(
      `${environment.port}/updateFpo/trainingDataUpdate`,
      data
    );
  }
  deleteTrainingDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteTrainingDetails/`, data);
  }
  schemesAvailedSubmit(availedSchemeData: any, fpoId: any): Observable<any> {
    let data = {
      fpoId: fpoId,
      availedSchemeData: availedSchemeData,
    };
    return this.http.post(
      `${environment.port}/updateFpo/schemesAvailedSubmit`,
      data
    );
  }

  fetchBankNames() : Observable<any>{
    return this.http.get(`${environment.port}/updateFpo/fetchBankNames`);
  }

  fetchBranchName(bankname: any): Observable<any> {
    return this.http.get(
      `${environment.port}/updateFpo/fetchBranchName/` + bankname
    );
  }

  fetchAwards(fpoId: any): Observable<any> {
    return this.http.get(
      `${environment.port}/updateFpo/fetchAwards/` + fpoId
    );
  }
  fetchRecords(fpoId: any): Observable<any> {
    return this.http.get(
      `${environment.port}/updateFpo/fetchRecords/` + fpoId
    );
  }
  awardUpdate(data: any): Observable<any> {
    return this.http.post(`${environment.port}/updateFpo/awardUpdate`, data );
  }
  deleteAwardDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteAwardDetails/`, data);
  }
  deleteRecordDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteRecordDetails/`, data);
  }


  // awardUpdate(data: any, fpoId: any): Observable<any> {
  //   let awardData = {
  //     data: data,
  //     fpoId: fpoId,
  //   };
  //   return this.http.post(
  //     `${environment.port}/updateFpo/awardUpdate`,
  //     awardData
  //   );
  // }


  getFarmerDetails(farmerId: any): Observable<any> {
    let data = {
      farmerId: farmerId,
    };
    return this.http.post(
      `${environment.port}/addMembers/getFarmerDetails`,
      data
    );
  }

  finalUploadFiles(uploadedFiles: any, fpoId: any): Observable<any> {
    let data = {
      fpoId: fpoId,
      uploadedFiles: uploadedFiles,
    };
    return this.http.post(
      `${environment.port}/updateFpo/finalUploadFiles`,
      data
    );
  }

  sendOtpForAddingFpoMember(MobileNo: any): Observable<any> {
    return this.http.get(`${environment.port}/addMembers/sendOtpForAddingFpoMember/` + MobileNo, { withCredentials: true });
  }

  confirmOtpForAddMember(otpValue: any): Observable<any> {
    return this.http.get(`${environment.port}/addMembers/confirmOtpForAddMember/` + otpValue, { withCredentials: true });
  }

  getCropData(): Observable<any> {
    return this.http.get(`${environment.port}/addMembers/getCropData`);
  }
  getRelevantTrader(fpoId: any): Observable<any>{
    return this.http.get(`${environment.port}/addMembers/getRelevantTrader/`+ fpoId);
  }
  getBankData(): Observable<any> {
    return this.http.get(`${environment.port}/addMembers/getBankData`);
  }

  loadVariety(cropCode: any): Observable<any> {
    return this.http.get(
      `${environment.port}/addMembers/loadVariety/` + cropCode
    );
  } 

  finalSubmit(farmerData: any): Observable<any> {
    return this.http.post(
      `${environment.port}/addMembers/addMemberFinalSubmit`,
      farmerData
    );
  }

  updateFarmer(farmerData: any): Observable<any> {
    return this.http.post(`${environment.port}/fpo/updateFarmer`, farmerData);
  }

  deleteFarmer(dataForDelete: any): Observable<any> {
    ////console.log(dataForDelete,"service");
    
    return this.http.post(
      `${environment.port}/fpo/deleteFarmer`,
      dataForDelete
    );
  }

  getAllForwardedFarmer(fpoId: any): Observable<any> {
    return this.http.get(
      `${environment.port}/fpo/getAllForwardedFarmer/` + fpoId
    );
  }

  approveForwardedFarmer(data: any): Observable<any> {
    return this.http.post(
      `${environment.port}/fpo/approveForwardedFarmer`,
      data
    );
  }

  // ========================Added from deepsikha=======================
  viewFigProducedDetails(data: any): Observable<any> {
    return this.http.post(
      `${environment.port}/producedDemandAggre/viewFigProducedDetails`,
      data
    );
  }

  figProducedData(formData: any): Observable<any> {
    return this.http.get(
      `${environment.port}/producedDemandAggre/figProducedData`,
      { params: formData }
    );
  }
  approveFigProducedData(approveData: any): Observable<any> {
    return this.http.post(
      `${environment.port}/producedDemandAggre/approveFigProducedData`,
      approveData
    );
  }

  rejectList(rejectData: any): Observable<any> {
    // ////console.log(rejectData);
    return this.http.post(
      `${environment.port}/producedDemandAggre/rejectList`,
      rejectData
    );
  }

  approvedProduced(formData: any): Observable<any> {
    // ////console.log(`hi123`);
    return this.http.get(
      `${environment.port}/producedDemandAggre/approvedProduced`,
      { params: formData }
    );
  }

  producedAddToGodown(dataForAddToGodown:any,selectedGodown:any):Observable<any>{
    let data={...dataForAddToGodown,...dataForAddToGodown._id,...selectedGodown}
    return this.http.post(`${environment.port}/producedDemandAggre/producedAddToGodown`,data);
  }

  getAllFpoGodowns(fpoId:any):Observable<any>{
    return this.http.get(`${environment.port}/producedDemandAggre/getAllFpoGodowns/`+fpoId);
  }

  loadAvailableQuant(stockTransferForm:any):Observable<any>{
    return this.http.post(`${environment.port}/fpo/stockTransferForm`,stockTransferForm)
  }

  getAllGodowns():Observable<any>{
    return this.http.get(`${environment.port}/fpo/getAllGodowns`);
    
  }
  
  getAvailableCropType(godownId:any):Observable<any>{
    return this.http.get(`${environment.port}/fpo/getAvailableCropType/`+godownId);
    
  }

  rejectedProducedList(formData: any): Observable<any> {
    // ////console.log(`hii12`);
    return this.http.get(
      `${environment.port}/producedDemandAggre/rejectedProducedList`,
      { params: formData }
    );
  }

  indentapprovefigindent(formData: any): Observable<any> {
    // ////console.log('hii');
    return this.http.get(
      `${environment.port}/producedDemandAggre/indentapprovefigindent`,
      { params: formData }
    );
  }

  figapproveindentdetail(data: any): Observable<any> {
    let x = JSON.stringify(data);
    return this.http.get(
      `${environment.port}/producedDemandAggre/figapproveindentdetail`,
      { params: { authenticationType: 'application/json', data: x } }
    );
  }

  approveIndent(data: any): Observable<any> {
    return this.http.post(
      `${environment.port}/producedDemandAggre/approveIndent`,
      data
    );
  }

  rejectIndent(data: any): Observable<any> {
    return this.http.post(
      `${environment.port}/producedDemandAggre/rejectIndent`,
      data
    );
  }

  approvedDemand(formData: any): Observable<any> {
    // ////console.log('hii');
    return this.http.get(
      `${environment.port}/producedDemandAggre/approvedDemand`,
      { params: formData }
    );
  }

  rejectedDemand(formData: any): Observable<any> {
    // ////console.log(`hii`);
    return this.http.get(
      `${environment.port}/producedDemandAggre/rejectedDemand`,
      { params: formData }
    );
  }

  onSubmitFpoSelfProducedForm(producedForm: any): Observable<any> {
    return this.http.post(
      `${environment.port}/producedDemandAggre/onSubmitFpoSelfProducedForm`,
      producedForm
    );
  }

  fpoSalesubmit(saleFormData: any): Observable<any> {
    return this.http.post(`${environment.port}/producedDemandAggre/fpoProducedSale`, saleFormData)
  }

  getCGListForFpo(fpoId: any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/getCGListForFpo/` + fpoId)
  }

  getTraderListForFpo(fpoId: any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/getTraderListForFpo/` + fpoId)
  }

  getSoldProductsOfFpo(fpoId: any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/getSoldProductsOfFpo/` + fpoId)

  }

  getDataForDashboard(fpoId: any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/getDataForDashboard/` + fpoId)
  }
  getLikes(fpoId: any): Observable<any> {
    //console.log(fpoId,"in service");
    
    return this.http.get(`${environment.port}/fpo/getLikes/` + fpoId)
  }
  getNotifications(fpoId: any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/getNotifications/` + fpoId)
  }
   
  updateNotificationsStatus(id: any,status:any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/updateNotificationsStatus/`+ id + '/' + status)
    //console.log(id,"updateNotificationsStatus");
    
  }
  dateForDashboard(fpoId: any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/dateForDashboard/`+ fpoId)
  }

  getNotificationByStatus(fpoId: any,status:any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/getNotificationByStatus/`+ fpoId + '/' + status)
    
    
  }
  checkForPasswordChangedOrNot(fpoId: any): Observable<any> {
    return this.http.get(`${environment.port}/login/checkForPasswordChangedOrNot/` + fpoId)
  }

  getFigPendingApproveListForFpo(fpoRefNo: any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/getFigPendingApproveListForFpo/` + fpoRefNo)
  }

  ApproveFig(figData: any): Observable<any> {
    return this.http.post(`${environment.port}/fpo/ApproveFig`, figData)
  }

  getFigApprovedListForFpo(fpoRefNo: any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/getFigApprovedListForFpo/` + fpoRefNo)
  }

  getDistListForFpo(): Observable<any> {
    return this.http.get(`${environment.port}/fpo/getDistricts/`)

  }
  loadDestGodown(destinationDistrictCode:any):Observable<any>{
    return this.http.get(`${environment.port}/fpo/loadDestGodown/` + destinationDistrictCode)
  }

  stockTransferSubmit(stockTransferForm:any,fpoId:any):Observable<any>{
    stockTransferForm.fpoId=fpoId
    return this.http.post(`${environment.port}/fpo/stockTransferSubmit`, stockTransferForm)
  }

  getAllStockForReceiptData(fpoId:any):Observable<any>{
    return this.http.get(`${environment.port}/fpo/getAllStockForReceiptData/` + fpoId)
  }
  
  getAllStockInTransitData(fpoId:any):Observable<any>{
    return this.http.get(`${environment.port}/fpo/getAllStockInTransitData/` + fpoId)
  }
  receiveStock(_id:any):Observable<any>{
    return this.http.get(`${environment.port}/fpo/receiveStock/` + _id)
  }

  searchGodownReport(formData:any,fpoId:any):Observable<any>{
    formData.fpoId=fpoId
    return this.http.post(`${environment.port}/fpo/searchGodownReport`, formData)
  }

  getblockListForFpo(districtCode: any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/getBlocksOfDistrict/` + districtCode)
  }
  getGPListForFpo(blockCode: any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/getGP/` + blockCode)

  }
  getVillageListForFpo(gpCode: any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/getVillage/` + gpCode)

  }
  getAllVillageListForFpo(district:any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/getAllVillage/`+ district)

  }
  loadTrader(): Observable<any> {
    return this.http.get(`${environment.port}/fpo/loadTrader/` )

  }
  traderData(refId :any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/traderData/` + refId)

  }

  godownSaleDataSubmit(stockSaleForm:any):Observable<any>{
    return this.http.post(`${environment.port}/fpo/godownSaleDataSubmit`, stockSaleForm)
  }

  registerToElicensing(fpoId: any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/registerToElicensing/` + fpoId)

  }

  statusForElicenseRegisterButton(fpoId: any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/statusForElicenseRegisterButton/` + fpoId)
  }

  submitFormForElicensing(fpoData: any, fpoId: any): Observable<any> {
    fpoData.fpoId = fpoId
    return this.http.post(`${environment.port}/fpo/submitFormForElicensing`, fpoData)

  }

  loginToElicensing(fpoId: any): Observable<any> {
    return this.http.get(`${environment.port}/fpo/loginToElicensing/` + fpoId)
  }

  // checkForUserToElicensing(token: any):Observable<any> {
  //   return this.http.get('https://odishaagrilicense.nic.in/user/loginFpo?token='+token)
  //   // this.http.post(`${environment.port}/fpo/redirectToElicensing`,token)
    
  // }

  addGodownSubmit(addGodownFormData:any):Observable<any>{
    return this.http.post(`${environment.port}/fpo/addGodownSubmit`, addGodownFormData)
  }

  getCropCata(): Observable<any> {
    return this.http.get(`${environment.port}/fig/getCropCata`);
  }
  getFarmers(fpoId: any): Observable<any> {
    return this.http.get(
      `${environment.port}/producedDemandAggre/getFarmers/` + fpoId
    );
  }
  getCropAccToCatagory(cropCat: any): Observable<any> {
    return this.http.get(
      `${environment.port}/fpo/getCropAccToCatagory/` + cropCat
    );
  }
  getAllVarieties(cropCode: any): Observable<any> {
    return this.http.get(
      `${environment.port}/fig/getAllVarieties/` + cropCode
    );
  }

  finYearDetails1(fpoId: any): Observable<any> {
    return this.http.get(
      `${environment.port}/updateFpo/finYearDetails1/` + fpoId
    );
  }

  finYearDetailsUpdate1(data: any): Observable<any> {
    return this.http.post(`${environment.port}/updateFpo/finYearDetailsUpdate1`,data);
  }
  deletePLDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deletePLDetails/`, data);
  }
  AddRoCData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddRoCData/`, data);
  }
  
  AddKycData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddKycData/`, data);
  }
  updateKycData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateKycData/`, data);
  }
  deleteKycDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteKycDetails/`, data);
  }
  AddItrData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddItrData/`, data);
  }
  updateItrData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateItrData/`, data);
  }
  deleteItrDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteItrDetails/`,  data);
  }
  AddAnnualAuditData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddAnnualAuditData/`, data);
  }
  updateAnnualAuditData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateAnnualAuditData/`, data);
  }
  deleteAnnualAuditDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteAnnualAuditDetails/`, data);
  }
  
  updateRoCData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateRoCData/`, data);
  }
  deleteRoCDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteRoCDetails/`, data);
  }
  
  deleteBusinessPlanDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteBusinessPlanDetails/`, data);
  }
  
  AddeNamDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddeNamDetails/`, data);
  }
  AddeNamData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddeNamData/`, data);
  }
  updateeNamData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateeNamData/`, data);
  }
  deleteeNamDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteeNamDetails/`, data);
  }
  AddBusinessPlanData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/AddBusinessPlanData/`, data);
  }
  updateBusinessPlanData(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/updateBusinessPlanData/`, data);
  }
  deleteBusinessDetails(data: any): Observable<any>{
    return this.http.post(`${environment.port}/updateFpo/deleteBusinessDetails/`, data);
  }
}
