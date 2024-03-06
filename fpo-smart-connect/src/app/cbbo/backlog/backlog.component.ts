import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CbboService } from '../cbbo.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  getIaData: any;
  addData: any;
  cbboName: any;

  constructor(private service: CbboService, private toastr: ToastrService, private router: Router, private appServ: AppService) { }

  ngOnInit(): void {
    this.getIa();
    this.fetchCbboName();

  }
  fetchCbboName() {
    let data = {
      type: 'Cbbo',
    }
    this.appServ.sideBarUserName(data).subscribe(
      data => {
        this.cbboName = data.name
      }
    )
  }

backlogForm = new FormGroup({
  year: new FormControl('', [Validators.required]),
  timeSlot: new FormControl('', [Validators.required]),
  iaName: new FormControl('', [Validators.required]),
  fpo: new FormControl('', [Validators.required]),
  cin: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required]),
  MobileNo: new FormControl('', [Validators.required]),
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
  ShareCapitalMobilizedInInr: new FormControl('', [Validators.required]),
  GstLicenceApplied: new FormControl('', [Validators.required]),
  EquityGrantAvailed: new FormControl('', [Validators.required]),
  fpotradingThroughenum: new FormControl('', [Validators.required]),
  fpoFilledroc: new FormControl('', [Validators.required]),
  receivedloanFrombank: new FormControl('', [Validators.required]),
  BaselineStudyReportSubmitted: new FormControl('', [Validators.required]),
  BusinessPlanFormulated: new FormControl('', [Validators.required]),
  NoOfMouSignedVendorRegistration: new FormControl('', [Validators.required]),
  RegistrationOnEnam: new FormControl('', [Validators.required]),
  AnnualBusinessTurnoverinInr: new FormControl('', [Validators.required]),

})

getIa() {
  this.service.getIa().subscribe(result => {
    this.getIaData = result;
  })
}

publish(){

  const data = {
    year: this.backlogForm.value.year,
    timeSlot:this.backlogForm.value.timeSlot,
    iaName: this.backlogForm.value.iaName.iaName,
    cbboName: this.cbboName,
    refNo: this.backlogForm.value.iaName.refNo,
    fpo: this.backlogForm.value.fpo.fpoName,
    cin: this.backlogForm.value.cin,
    email: this.backlogForm.value.email,
    MobileNo: this.backlogForm.value.MobileNo,
    dateofIncorporation: this.backlogForm.value.dateofIncorporation,
    commencementOfBusinessfieldWithMca: this.backlogForm.value.commencementOfBusinessfieldWithMca,
    AgmConducted: this.backlogForm.value.AgmConducted,
    AuditorAppointed: this.backlogForm.value.AuditorAppointed,
    CeoAppointed: this.backlogForm.value.CeoAppointed,
    AccountedAppointed: this.backlogForm.value.AccountedAppointed,
    BankAccountOpened: this.backlogForm.value.BankAccountOpened,
    Min1WomenBod: this.backlogForm.value.Min1WomenBod,
    statutoryAudit: this.backlogForm.value.statutoryAudit,
    NoOfFarmerMobilized: this.backlogForm.value.NoOfFarmerMobilized,
    NoOfFarmerMobilizedAsShareholders: this.backlogForm.value.NoOfFarmerMobilizedAsShareholders,
    NoOfBod: this.backlogForm.value.NoOfBod,
    GstLicenceApplied: this.backlogForm.value.GstLicenceApplied,
    ShareCapitalMobilizedInInr: this.backlogForm.value.ShareCapitalMobilizedInInr,
    EquityGrantAvailed: this.backlogForm.value.EquityGrantAvailed,
    fpotradingThroughenum: this.backlogForm.value.fpotradingThroughenum,
    fpoFilledroc: this.backlogForm.value.fpoFilledroc,
    BaselineStudyReportSubmitted: this.backlogForm.value.BaselineStudyReportSubmitted,
    BusinessPlanFormulated: this.backlogForm.value.BusinessPlanFormulated,
    NoOfMouSignedVendorRegistration: this.backlogForm.value.NoOfMouSignedVendorRegistration,
    RegistrationOnEnam: this.backlogForm.value.RegistrationOnEnam,
    AnnualBusinessTurnoverinInr: this.backlogForm.value.AnnualBusinessTurnoverinInr,
    receivedloanFrombank: this.backlogForm.value.receivedloanFrombank
  }
  this.service.publishData(data).subscribe((result) => {
    this.addData = result
    alert("Details added Successfully")
    this.toastr.success('Data added successfully')
    this.backlogForm.reset();
  })

}

}
