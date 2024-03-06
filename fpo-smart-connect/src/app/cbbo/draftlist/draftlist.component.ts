import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CbboService } from '../cbbo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-draftlist',
  templateUrl: './draftlist.component.html',
  styleUrls: ['./draftlist.component.css']
})
export class DraftlistComponent implements OnInit {
  getdraftData: any;
  dataList: any;
  viewData: any = [];
  dataList1: any;

  searchText4: any = {};
  searchText5: any = {};
  searchText6: any = {};
  searchText7: any = {};
  getAllData: any;

  constructor(private service: CbboService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.draftedData();
    this.getData();
    this.searchText4.year=""


  }

  updateForm = new FormGroup({
    year: new FormControl('', [Validators.required]),
    iaName: new FormControl('', [Validators.required]),
    fpo: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
    timeSlot: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,4})+$/)]),
    MobileNo: new FormControl('', [Validators.required, Validators.pattern("[6-9]{1}[0-9]{9}")]),
    dateofIncorporation: new FormControl('', [Validators.required]),
    commencementOfBusinessfieldWithMca: new FormControl('', [Validators.required]),
    AgmConducted: new FormControl('', [Validators.required]),
    AuditorAppointed: new FormControl('', [Validators.required]),
    CeoAppointed: new FormControl('', [Validators.required]),
    AccountedAppointed: new FormControl('', [Validators.required]),
    BankAccountOpened: new FormControl('', [Validators.required]),
    Min1WomenBod: new FormControl('', [Validators.required]),
    statutoryAudit: new FormControl('', [Validators.required]),
    NoOfFarmerMobilized: new FormControl('', [Validators.required]),
    NoOfFarmerMobilizedAsShareholders: new FormControl('', [Validators.required]),
    NoOfBod: new FormControl('', [Validators.required]),
    GstLicenceApplied: new FormControl('', [Validators.required]),
    ShareCapitalMobilizedInInr: new FormControl('', [Validators.required]),
    EquityGrantAvailed: new FormControl('', [Validators.required]),
    fpotradingThroughenum: new FormControl('', [Validators.required]),
    fpoFilledroc: new FormControl('', [Validators.required]),
    BaselineStudyReportSubmitted: new FormControl('', [Validators.required]),
    BusinessPlanFormulated: new FormControl('', [Validators.required]),
    BusinessPlanFormulatedforYear: new FormControl('', [Validators.required]),
    NoOfMouSignedVendorRegistration: new FormControl('', [Validators.required]),
    RegistrationOnEnam: new FormControl('', [Validators.required]),
    AnnualBusinessTurnoverinInr: new FormControl('', [Validators.required]),
    receivedloanFrombank: new FormControl('', [Validators.required]),

  })
  
  getData() {
    this.service.getData().subscribe(result => {
      this.getAllData = result;
    })
  }

  draftedData() {
    this.service.draftedData().subscribe(result => {
      this.getdraftData = result;
    })
  }
  deleteRow(details: any) {
    if(confirm('Are you sure to delete ?')){
    this.service.deleteRow(details).subscribe(data => {
      if (data) {
        this.toastr.success('Deleted successfully')
        this.getData();
    this.draftedData();
      }
    });
  }
  }

  editDetails(details: any) {
    // console.log(details,"this.dataList1");
    
    this.dataList1 = details;
    // this.updateForm.setValue({
    //   year: details.year,
    //   iaName: details.iaName,
    //   fpo: details.fpo,
    //   MobileNo: details.MobileNo
    // });
    console.log(this.dataList1,"this.dataList");
    
    this.updateForm.patchValue({
      year: this.dataList1.year ,
      iaName: this.dataList1.iaName ,
      fpo: this.dataList1.fpo ,
      cin: this.dataList1.cin ,
      timeSlot: this.dataList1.timeSlot ,
      email: this.dataList1.email ,
      MobileNo: this.dataList1.MobileNo ,
      dateofIncorporation: this.dataList1.dateofIncorporation ,
      commencementOfBusinessfieldWithMca: this.dataList1.commencementOfBusinessfieldWithMca ,
      AgmConducted: this.dataList1.AgmConducted ,
      AuditorAppointed: this.dataList1.AuditorAppointed ,
      CeoAppointed: this.dataList1.CeoAppointed ,
      AccountedAppointed: this.dataList1.AccountedAppointed ,
      BankAccountOpened: this.dataList1.BankAccountOpened ,
      Min1WomenBod: this.dataList1.Min1WomenBod ,
      statutoryAudit: this.dataList1.statutoryAudit ,
      NoOfFarmerMobilized: this.dataList1.NoOfFarmerMobilized ,
      NoOfFarmerMobilizedAsShareholders: this.dataList1.NoOfFarmerMobilizedAsShareholders ,
      NoOfBod: this.dataList1.NoOfBod ,
      GstLicenceApplied: this.dataList1.GstLicenceApplied ,
      ShareCapitalMobilizedInInr: this.dataList1.ShareCapitalMobilizedInInr ,
      EquityGrantAvailed: this.dataList1.EquityGrantAvailed ,
      fpotradingThroughenum: this.dataList1.fpotradingThroughenum ,
      fpoFilledroc: this.dataList1.fpoFilledroc ,
      BaselineStudyReportSubmitted: this.dataList1.BaselineStudyReportSubmitted ,
      BusinessPlanFormulated: this.dataList1.BusinessPlanFormulated ,
      BusinessPlanFormulatedforYear: this.dataList1.BusinessPlanFormulatedforYear ,
      NoOfMouSignedVendorRegistration: this.dataList1.NoOfMouSignedVendorRegistration ,
      RegistrationOnEnam: this.dataList1.RegistrationOnEnam ,
      AnnualBusinessTurnoverinInr: this.dataList1.AnnualBusinessTurnoverinInr ,
      receivedloanFrombank: this.dataList1.receivedloanFrombank ,
  
    })
  }
  updateList() {
    
    // const data = {
    //   cbboSNo : this.dataList1.cbboSNo,
    //   year: this.updateForm.value.year,
    //   iaName: this.updateForm.value.iaName,
    //   fpo: this.updateForm.value.fpo,
    //   MobileNo: this.updateForm.value.MobileNo,
    // }
    console.log(this.updateForm.value,"jay jagannath");
    
    if(this.updateForm.valid){
      this.service.updateList(this.updateForm.value).subscribe(data => {
        if (data) {
          this.toastr.success('Updated Successfully')
          this.getData();
          this.draftedData();
        } else {
          this.toastr.warning('Updated unsuccessful')
        }
      })
    }else{
      this.toastr.warning('fill all required filled')
    }
    
  }

  viewDetails(details: any) {
    console.log(details,'details');
    this.dataList = details;
    this.viewData = this.dataList
  }

  publish(data:any){
    if(confirm('Are you sure to publish ?')){
      this.service.publish(data).subscribe(
        data=>{
          if(data.status==1){
            this.toastr.success('Approved Successfully','Success')
        this.getData()
        this.draftedData()    
          }
          if(data.status==0){
            this.toastr.info('Already approved','Warning')
          }
        },
        error=>{
          this.toastr.error('Unexpected Error')
        }
      )
      }
  }
}
