import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CbboService } from '../cbbo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-manycbbo',
  templateUrl: './manycbbo.component.html',
  styleUrls: ['./manycbbo.component.css']
})
export class ManycbboComponent implements OnInit {
  addData: any;
  menuList: any;
  getIaData: any = [];
  getFpoData: any = [];
  // submitted: boolean = false;
  FpoData: any;
  submitButton: boolean = true
  data: any;
  cbboName: any;
  // loadDateArray: any;
  show1: boolean = false;
  show2: boolean = false;
  // show3: boolean = false;
  // show4: boolean = false;
  // show5: boolean = false;
  // show6: boolean = false;
  // show7: boolean = false;
  // show8: boolean = false;
  // show9: boolean = false;
  // show10: boolean = false;
  // show11: boolean = false;
  // show12: boolean = false;
  timeSlot: any;
  previousMonth: any;
  currentMonth: any;
  turnOverFilePath: any;
  businessFilePath: any;
  showTurnOverReportBtn: boolean = false;
  showbBusinesPlanReportBtn: boolean = false;
  checkAllValidData: boolean = true;

  constructor(private service: CbboService, private toastr: ToastrService, private router: Router, private appServ: AppService) { }

  ngOnInit(): void {
    this.getIa();
    // this.getFpo();
    this.fetchCbboName();
    this.timeSlot = ''
    var toDay = new Date().getTime() //don't remove/
    var current = new Date();
    // console.log(current, "current");
    // var currentMonth1 = current.getMonth() + 1;
    var currentDate = current.getDate();
    // console.log(currentMonth1, "currentMonth");
    // console.log(currentDate, "currentDate");
    // window['showMonth'+currentMonth] = true; 
    // eval("showMonth"+ currentMonth +" = "+true);
    // console.log( eval("showMonth"+ currentMonth +" = "+currentMonth),"showmonth");
    // const dateStr = new Date().toDateString(); // 'Fri Apr 10 2020'
    // console.log(dateStr, "dateStr");
    // const dateStrArr = dateStr.split(' '); // ['Fri', 'Apr', '10', '2020']
    // console.log(dateStrArr[1]); // 'Apr'
    const date = new Date(Date.now());
    this.currentMonth = date.toLocaleString('en-US', { month: 'long' }); // {month:'long'}
    // console.log(this.currentMonth, "currentMonth1");
    this.show1 = true;
    if (currentDate >= 1 && currentDate <= 5) {
      const current1 = new Date();
      current1.setMonth(current1.getMonth() - 1);
      this.previousMonth = current1.toLocaleString('default', { month: 'long' });
      this.show2 = true;
      console.log(this.previousMonth, "previousMonth");
    } else {
      this.show2 = false;
    }

    // var toDay = Date.parse('2023-01-05') //need to remove
    // var temp =new Date('2023-05-01')
    // console.log(toDay, "toDay");
    // console.log(temp.getTime());

    // var firstApr = Date.parse('2022-04-01')
    // var midApr = Date.parse('2022-04-15')
    // var lastSept = Date.parse('2022-09-31')
    // var midOct = Date.parse('2022-10-15')
    // var firstOct = Date.parse('2022-10-01')
    // var lastMar = Date.parse('2023-03-31')
    // var firstApr1 = Date.parse('2023-04-01')
    // var midApr1 = Date.parse('2023-04-15')

    // var april = Date.parse('2022-04-01')
    // var may = Date.parse('2022-05-01')
    // var may5 = Date.parse('2022-05-06')
    // var jun = Date.parse('2022-06-01')
    // var jun5 = Date.parse('2022-06-06')
    // var jul = Date.parse('2022-07-01')
    // var jul5 = Date.parse('2022-07-06')
    // var aug = Date.parse('2022-08-01')
    // var aug5 = Date.parse('2022-08-06')
    // var sept = Date.parse('2022-09-01')
    // var sept5 = Date.parse('2022-09-06')
    // var oct = Date.parse('2022-10-01')
    // var oct5 = Date.parse('2022-10-06')
    // var nov = Date.parse('2022-11-01')
    // var nov5 = Date.parse('2022-11-06')
    // var dec = Date.parse('2022-12-01')
    // var dec5 = Date.parse('2022-12-06')
    // var jan = Date.parse('2023-01-01')
    // var jan5 = Date.parse('2023-01-06')
    // var feb = Date.parse('2023-02-01')
    // var feb5 = Date.parse('2023-02-06')
    // var mar = Date.parse('2023-03-01')
    // var mar5 = Date.parse('2023-03-06')
    // var mar1 = Date.parse('2023-03-31')
    // this.loadDateArray = []
    //=========================================================
    // if (toDay > april && toDay <= may) {
    //   this.show1 = true;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > may && toDay <= may5) {
    //   this.show1 = true;
    //   this.show2 = true;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > may5 && toDay <= jun) {
    //   this.show1 = false;
    //   this.show2 = true;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > jun && toDay <= jun5) {
    //   this.show1 = false;
    //   this.show2 = true;
    //   this.show3 = true;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > jun5 && toDay <= jul) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = true;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > jul && toDay <= jul5) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = true;
    //   this.show4 = true;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > jul5 && toDay <= aug) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = true;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > aug && toDay <= aug5) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = true;
    //   this.show5 = true;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > aug5 && toDay <= sept) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = true;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > sept && toDay <= sept5) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = true;
    //   this.show6 = true;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > sept5 && toDay <= oct) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = true;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > oct && toDay <= oct5) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = true;
    //   this.show7 = true;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > oct5 && toDay <= nov) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = true;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > nov && toDay <= nov5) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = true;
    //   this.show8 = true;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > nov5 && toDay <= dec) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = true;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > dec && toDay <= dec5) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = true;
    //   this.show9 = true;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > dec5 && toDay <= jan) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = true;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > jan && toDay <= jan5) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = true;
    //   this.show10 = true;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > jan5 && toDay <= feb) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = true;
    //   this.show11 = false;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > feb && toDay <= feb5) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = true;
    //   this.show11 = true;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > feb5 && toDay <= mar) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = true;
    //   this.show12 = false;
    //   return;
    // } else if (toDay > mar && toDay <= mar5) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = true;
    //   this.show12 = true;
    //   return;
    // } else if (toDay > mar5 && toDay <= mar1) {
    //   this.show1 = false;
    //   this.show2 = false;
    //   this.show3 = false;
    //   this.show4 = false;
    //   this.show5 = false;
    //   this.show6 = false;
    //   this.show7 = false;
    //   this.show8 = false;
    //   this.show9 = false;
    //   this.show10 = false;
    //   this.show11 = false;
    //   this.show12 = true;
    //   return;
    // }
    //================================================================
    // if (toDay > firstApr && toDay <= midApr) {
    //   this.show1 = true;
    //   this.show2 = true;
    //   return;
    //  }else if (toDay > midApr && toDay <= lastSept) {
    //   this.show1 = true;
    //   this.show2 = false;
    //   return;
    // } else if (toDay > firstOct && toDay <= midOct) {
    //   this.show1 = true;
    //   this.show2 = true;
    //   return;
    // } else if (toDay > midOct && toDay <= lastMar) {
    //   this.show1 = false;
    //   this.show2 = true;
    //   return;
    // } else if (toDay > firstApr1 && toDay <= midApr1) {
    //   this.show1 = true;
    //   this.show2 = true;
    //   return;
    // }

    this.addForm.controls['cin'].disable();
    this.addForm.controls['email'].disable();
    this.addForm.controls['MobileNo'].disable();
    this.addForm.controls['dateofIncorporation'].disable();
    this.addForm.controls['EquityGrantAvailed'].disable();
    this.addForm.controls['BankAccountOpened'].disable();
    this.addForm.controls['NoOfBod'].disable();
    this.addForm.controls['NoOfFarmerMobilized'].disable();
    this.addForm.controls['BaselineStudyReportSubmitted'].disable();
    this.addForm.controls['BusinessPlanFormulated'].disable();
    this.addForm.controls['NoOfBod'].disable();
    this.addForm.controls['AnnualBusinessTurnoverinInr'].disable();
    this.addForm.controls['ShareCapitalMobilizedInInr'].disable();
    this.addForm.controls['NoOfFarmerMobilizedAsShareholders'].disable();
    this.addForm.controls['RegistrationOnEnam'].disable();
    this.addForm.controls['fpotradingThroughenum'].disable();
    this.addForm.controls['fpoFilledroc'].disable();
    this.addForm.controls['statutoryAudit'].disable();
    this.addForm.controls['receivedloanFrombank'].disable();
    this.addForm.controls['GstLicenceApplied'].disable();
    this.addForm.controls['AccountedAppointed'].disable();
    this.addForm.controls['CeoAppointed'].disable();
    this.addForm.controls['Min1WomenBod'].disable();
    this.addForm.controls['BusinessPlanFormulatedforYear'].disable();

  }
  addForm = new FormGroup({
    year: new FormControl('', [Validators.required]),
    timeSlot: new FormControl('', [Validators.required]),
    iaName: new FormControl('', [Validators.required]),
    fpo: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
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

  monthWiseFpo() {
    console.log(this.addForm.value.timeSlot, 'month');
    this.service.monthWiseFpo(this.addForm.value.timeSlot, this.cbboName).subscribe(result => {
      this.getFpoData = result;
    })
  }

  fetchCbboName() {
    let data = {
      type: 'Cbbo',
    }
    this.appServ.sideBarUserName(data).subscribe(
      data => {
        this.cbboName = data.name
        if (this.cbboName) {
          // this.getFpo();
        }
      }
    )
  }
  publish() {
    // if (confirm('Kindly Confirm')) {
    if (this.checkAllValidData == false) {
      this.toastr.warning("Kindly update data in FPO Profile");
      return;
    }
    this.addForm.controls['cin'].enable();
    this.addForm.controls['email'].enable();
    this.addForm.controls['MobileNo'].enable();
    this.addForm.controls['dateofIncorporation'].enable();
    this.addForm.controls['EquityGrantAvailed'].enable();
    this.addForm.controls['BankAccountOpened'].enable();
    this.addForm.controls['NoOfBod'].enable();
    this.addForm.controls['NoOfFarmerMobilized'].enable();
    this.addForm.controls['BusinessPlanFormulated'].enable();
    this.addForm.controls['NoOfBod'].enable();
    this.addForm.controls['BaselineStudyReportSubmitted'].enable();
    this.addForm.controls['AnnualBusinessTurnoverinInr'].enable();
    this.addForm.controls['ShareCapitalMobilizedInInr'].enable();
    this.addForm.controls['NoOfFarmerMobilizedAsShareholders'].enable();
    this.addForm.controls['RegistrationOnEnam'].enable();
    this.addForm.controls['fpotradingThroughenum'].enable();
    this.addForm.controls['fpoFilledroc'].enable();
    this.addForm.controls['statutoryAudit'].enable();
    this.addForm.controls['receivedloanFrombank'].enable();
    this.addForm.controls['GstLicenceApplied'].enable();
    this.addForm.controls['AccountedAppointed'].enable();
    this.addForm.controls['CeoAppointed'].enable();
    this.addForm.controls['Min1WomenBod'].enable();
    this.addForm.controls['BusinessPlanFormulatedforYear'].enable();


    const data = {
      year: this.addForm.value.year,
      timeSlot: this.addForm.value.timeSlot,
      iaName: this.addForm.value.iaName.iaName,
      cbboName: this.cbboName,
      refNo: this.addForm.value.iaName.refNo,
      fpo: this.addForm.value.fpo.fpoName,
      cin: this.addForm.value.cin,
      email: this.addForm.value.email,
      MobileNo: this.addForm.value.MobileNo,
      dateofIncorporation: this.addForm.value.dateofIncorporation,
      commencementOfBusinessfieldWithMca: this.addForm.value.commencementOfBusinessfieldWithMca,
      AgmConducted: this.addForm.value.AgmConducted,
      AuditorAppointed: this.addForm.value.AuditorAppointed,
      CeoAppointed: this.addForm.value.CeoAppointed,
      AccountedAppointed: this.addForm.value.AccountedAppointed,
      BankAccountOpened: this.addForm.value.BankAccountOpened,
      Min1WomenBod: this.addForm.value.Min1WomenBod,
      statutoryAudit: this.addForm.value.statutoryAudit,
      NoOfFarmerMobilized: this.addForm.value.NoOfFarmerMobilized,
      NoOfFarmerMobilizedAsShareholders: this.addForm.value.NoOfFarmerMobilizedAsShareholders,
      NoOfBod: this.addForm.value.NoOfBod,
      GstLicenceApplied: this.addForm.value.GstLicenceApplied,
      ShareCapitalMobilizedInInr: this.addForm.value.ShareCapitalMobilizedInInr,
      EquityGrantAvailed: this.addForm.value.EquityGrantAvailed,
      fpotradingThroughenum: this.addForm.value.fpotradingThroughenum,
      fpoFilledroc: this.addForm.value.fpoFilledroc,
      BaselineStudyReportSubmitted: this.addForm.value.BaselineStudyReportSubmitted,
      BusinessPlanFormulated: this.addForm.value.BusinessPlanFormulated,
      BusinessPlanFormulatedforYear: this.addForm.value.BusinessPlanFormulatedforYear,
      NoOfMouSignedVendorRegistration: this.addForm.value.NoOfMouSignedVendorRegistration,
      RegistrationOnEnam: this.addForm.value.RegistrationOnEnam,
      AnnualBusinessTurnoverinInr: this.addForm.value.AnnualBusinessTurnoverinInr,
      receivedloanFrombank: this.addForm.value.receivedloanFrombank
    }


    this.service.publishData(data).subscribe((result) => {
      this.addData = result;
      this.toastr.success('Data added successfully')
      this.showTurnOverReportBtn = false;
      this.showbBusinesPlanReportBtn = false;

      this.addForm.controls['cin'].disable();
      this.addForm.controls['email'].disable();
      this.addForm.controls['MobileNo'].disable();
      this.addForm.controls['dateofIncorporation'].disable();
      this.addForm.controls['EquityGrantAvailed'].disable();
      this.addForm.controls['BankAccountOpened'].disable();
      this.addForm.controls['NoOfBod'].disable();
      this.addForm.controls['NoOfFarmerMobilized'].disable();
      this.addForm.controls['BaselineStudyReportSubmitted'].disable();
      this.addForm.controls['BusinessPlanFormulated'].disable();
      this.addForm.controls['NoOfBod'].disable();
      this.addForm.controls['AnnualBusinessTurnoverinInr'].disable();
      this.addForm.controls['ShareCapitalMobilizedInInr'].disable();
      this.addForm.controls['NoOfFarmerMobilizedAsShareholders'].disable();
      this.addForm.controls['RegistrationOnEnam'].disable();
      this.addForm.controls['fpotradingThroughenum'].disable();
      this.addForm.controls['fpoFilledroc'].disable();
      this.addForm.controls['statutoryAudit'].disable();
      this.addForm.controls['receivedloanFrombank'].disable();
      this.addForm.controls['GstLicenceApplied'].disable();
      this.addForm.controls['AccountedAppointed'].disable();
      this.addForm.controls['CeoAppointed'].disable();
      this.addForm.controls['Min1WomenBod'].disable();
      this.addForm.controls['BusinessPlanFormulatedforYear'].disable();


      this.addForm.reset();

    })

    // }

  }
  getIa() {
    this.service.getIa().subscribe(result => {
      this.getIaData = result;
    })
  }
  // getFpo() {
  //   this.service.getFpo(this.cbboName).subscribe(result => {
  //     this.getFpoData = result;
  //   })
  // }
  getDetails() {
    const fpoId = this.addForm.value.fpo.fpoId;
    this.getFpoReportFile(fpoId);

    if (this.addForm.value.fpo == 'other') {
      Swal.fire({
        title: "Go to Report Missing FPO tab Notify to admin or Enrol FPO",
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl("/cbbo/missingreport")
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    } else {
      this.service.getDetails(fpoId).subscribe(result => {
        this.FpoData = result;
        // console.log(result, 'result');
        if (result.length == 0) {
          Swal.fire({
            title: "Kindly update data in FPO Profile*",
            confirmButtonText: 'Ok',
          })
          this.addForm.reset();
          this.addForm.patchValue({
            year: "",
            timeSlot: "",
            iaName: "",
            fpo: "",
          })
          return;
        }

        this.addForm.patchValue({
          cin: this.FpoData[0].regNoOfFPO
        })
        if (this.FpoData[0].regNoOfFPO == "") {
          this.submitButton = false;
          this.checkAllValidData = false;
          this.addForm.patchValue({
            cin: "Kindly update data in FPO Profile*"
          })
        } else {
          this.addForm.controls['cin'].disable()
          this.submitButton = true
        }

        this.addForm.patchValue({
          email: this.FpoData[0].fpoMailId
        })
        if (this.FpoData[0].fpoMailId == "") {
          this.submitButton = false;
          this.checkAllValidData = false;
          this.addForm.patchValue({
            email: "Kindly update data in FPO Profile*"
          })
        } else {
          this.addForm.controls['email'].disable()
          this.submitButton = true
        }

        this.addForm.patchValue({
          MobileNo: this.FpoData[0].fpoContactNo
        })
        if (this.FpoData[0].fpoContactNo == "") {
          this.submitButton = false;
          this.checkAllValidData = false;
          this.addForm.patchValue({
            MobileNo: "Kindly update data in FPO Profile*"
          })
        } else {
          this.addForm.controls['MobileNo'].disable()
          this.submitButton = true
        }

        this.addForm.patchValue({
          dateofIncorporation: this.FpoData[0].dateOfReg
        })
        if (this.FpoData[0].dateOfReg == "") {
          this.submitButton = false;
          this.checkAllValidData = false;
          this.addForm.patchValue({
            dateofIncorporation: "Kindly update data in FPO Profile*"
          })
        } else {
          this.addForm.controls['dateofIncorporation'].disable()
          this.submitButton = true
        }

        this.addForm.patchValue({
          BankAccountOpened: this.FpoData[0].haveBankAccount
        })
        if (this.FpoData[0].haveBankAccount == "") {
          this.addForm.controls['BankAccountOpened'].enable();
        } else {
          this.addForm.controls['BankAccountOpened'].disable();
        }

        if (this.FpoData[0].womenbod == true) {
          this.addForm.patchValue({
            Min1WomenBod: this.addForm.value.Min1WomenBod = 'yes'
          })
          this.addForm.controls['Min1WomenBod'].disable();

        } else {
          this.addForm.patchValue({
            Min1WomenBod: this.addForm.value.Min1WomenBod = 'no'
          })
          this.addForm.controls['Min1WomenBod'].disable();

        }

        this.addForm.patchValue({
          NoOfFarmerMobilized: this.FpoData[0].noOfFarmerMember
        })
        if (this.FpoData[0].noOfFarmerMember == "") {
          this.submitButton = false;
          this.checkAllValidData = false;
          this.addForm.patchValue({
            NoOfFarmerMobilized: "Kindly update data in FPO Profile*"
          })
        } else {
          this.addForm.controls['NoOfFarmerMobilized'].disable()
          this.submitButton = true
        }

        this.addForm.patchValue({
          EquityGrantAvailed: this.FpoData[0].haveAvailedEquityGrant
        })
        if (this.FpoData[0].haveAvailedEquityGrant == "") {
          this.addForm.controls['EquityGrantAvailed'].enable()
        } else {
          this.addForm.controls['EquityGrantAvailed'].disable()
        }

        this.addForm.patchValue({
          BusinessPlanFormulated: this.FpoData[0].businessPlanFor2021
        })
        if (this.FpoData[0].businessPlanFor2021 == "") {
          this.addForm.controls['BusinessPlanFormulated'].enable()
        } else {
          this.addForm.controls['BusinessPlanFormulated'].disable()
        }

        this.addForm.patchValue({
          BusinessPlanFormulatedforYear: this.FpoData[0].haveYearPlan
        })
        if (this.FpoData[0].haveYearPlan == "") {
          this.submitButton = false;
          this.checkAllValidData = false;
          this.addForm.patchValue({
            BusinessPlanFormulatedforYear: "Kindly update data in FPO Profile*"
          })
        } else {
          this.addForm.controls['BusinessPlanFormulatedforYear'].disable()
          this.submitButton = true
        }

        if (this.FpoData[0].ceo == true) {
          this.addForm.patchValue({
            CeoAppointed: this.addForm.value.CeoAppointed = 'yes'
          })
          this.addForm.controls['CeoAppointed'].disable()

        } else {
          this.addForm.patchValue({
            CeoAppointed: this.addForm.value.CeoAppointed = 'no'
          })
          this.addForm.controls['CeoAppointed'].disable()

        }

        if (this.FpoData[0].accountant == true) {
          this.addForm.patchValue({
            AccountedAppointed: this.addForm.value.AccountedAppointed = 'yes'
          })
          this.addForm.controls['AccountedAppointed'].disable()

        } else {
          this.addForm.patchValue({
            AccountedAppointed: this.addForm.value.AccountedAppointed = 'no'
          })
          this.addForm.controls['AccountedAppointed'].disable()

        }

        if (this.FpoData[0].gst == true) {
          this.addForm.patchValue({
            GstLicenceApplied: this.addForm.value.GstLicenceApplied = 'yes'
          })
          this.addForm.controls['GstLicenceApplied'].disable()

        } else {
          this.addForm.patchValue({
            GstLicenceApplied: this.addForm.value.GstLicenceApplied = 'no'
          })
          this.addForm.controls['GstLicenceApplied'].disable()

        }

        this.addForm.patchValue({
          NoOfBod: this.FpoData[0].bod
        })
        if (this.FpoData[0].bod == "") {
          this.submitButton = false;
          this.checkAllValidData = false;
          this.addForm.patchValue({
            NoOfBod: "Kindly update data in FPO Profile*"
          })
        } else {
          this.addForm.controls['NoOfBod'].disable()
          this.submitButton = true
        }

        this.addForm.patchValue({
          BaselineStudyReportSubmitted: this.FpoData[0].baselineSurvey
        })
        if (this.FpoData[0].baselineSurvey == "") {
          this.addForm.controls['BaselineStudyReportSubmitted'].enable()
        } else {
          this.addForm.controls['BaselineStudyReportSubmitted'].disable()
        }

        this.addForm.patchValue({
          AnnualBusinessTurnoverinInr: this.FpoData[0].turnover
        })
        if (this.FpoData[0].turnover == "") {
          this.submitButton = false;
          this.checkAllValidData = false;
          this.addForm.patchValue({
            AnnualBusinessTurnoverinInr: "Kindly update data in FPO Profile*"
          })
        } else {
          this.addForm.controls['AnnualBusinessTurnoverinInr'].disable()
          this.submitButton = true
        }

        this.addForm.patchValue({
          ShareCapitalMobilizedInInr: this.FpoData[0].paidUpCapitalAmount
        })
        if (this.FpoData[0].paidUpCapitalAmount == "") {
          this.submitButton = false;
          this.checkAllValidData = false;
          this.addForm.patchValue({
            ShareCapitalMobilizedInInr: "Kindly update data in FPO Profile*"
          })
        } else {
          this.addForm.controls['ShareCapitalMobilizedInInr'].disable()
          this.submitButton = true
        }

        this.addForm.patchValue({
          NoOfFarmerMobilizedAsShareholders: this.FpoData[0].NoOfFarmerMobilizedAsShareholders
        })
        if (this.FpoData[0].NoOfFarmerMobilizedAsShareholders == "") {
          this.submitButton = false;
          this.checkAllValidData = false;
          this.addForm.patchValue({
            NoOfFarmerMobilizedAsShareholders: "Kindly update data in FPO Profile*"
          })
        } else {
          this.addForm.controls['NoOfFarmerMobilizedAsShareholders'].disable()
          this.submitButton = true
        }

        this.addForm.patchValue({
          statutoryAudit: this.FpoData[0].statutoryAudit
        })
        if (this.FpoData[0].statutoryAudit == "") {
          this.addForm.controls['statutoryAudit'].enable()
        } else {
          this.addForm.controls['statutoryAudit'].disable()
        }

        this.addForm.patchValue({
          fpoFilledroc: this.FpoData[0].fpofilledRoc
        })
        if (this.FpoData[0].fpofilledRoc == "") {
          this.addForm.controls['fpoFilledroc'].enable()
        } else {
          this.addForm.controls['fpoFilledroc'].disable()
        }

        this.addForm.patchValue({
          fpotradingThroughenum: this.FpoData[0].tradingThroughenum
        })
        if (this.FpoData[0].tradingThroughenum == "") {
          this.addForm.controls['fpotradingThroughenum'].enable()
        } else {
          this.addForm.controls['fpotradingThroughenum'].disable()
        }

        this.addForm.patchValue({
          RegistrationOnEnam: this.FpoData[0].registrationEnum
        })
        if (this.FpoData[0].registrationEnum == "") {
          this.addForm.controls['RegistrationOnEnam'].enable()
        } else {
          this.addForm.controls['RegistrationOnEnam'].disable()
        }

        this.addForm.patchValue({
          receivedloanFrombank: this.FpoData[0].haveAvailedLoan
        })
        if (this.FpoData[0].haveAvailedLoan == "") {
          this.addForm.controls['receivedloanFrombank'].enable()
        } else {
          this.addForm.controls['receivedloanFrombank'].disable()
        }
      })
    }
  }
  getFpoReportFile(fpoId: any) {
    this.service.getFpoReportFile(fpoId).subscribe(result => {
      if (result.status == true && result.turnOverFilePath != "") {
        this.turnOverFilePath = result.turnOverFilePath;
        this.showTurnOverReportBtn = true;
      } else {
        this.showTurnOverReportBtn = false;
      }
      if (result.status == true && result.businessFilePath != "") {
        this.businessFilePath = result.businessFilePath;
        this.showbBusinesPlanReportBtn = true;
      } else {
        this.showbBusinesPlanReportBtn = false;
      }
    })
  }

  draft() {
    if (this.addForm.valid) {
      this.addForm.controls['cin'].enable();
      this.addForm.controls['email'].enable();
      this.addForm.controls['MobileNo'].enable();
      this.addForm.controls['dateofIncorporation'].enable();
      this.addForm.controls['EquityGrantAvailed'].enable();
      this.addForm.controls['BankAccountOpened'].enable();
      this.addForm.controls['NoOfBod'].enable();
      this.addForm.controls['NoOfFarmerMobilized'].enable();
      this.addForm.controls['BaselineStudyReportSubmitted'].enable();
      this.addForm.controls['BusinessPlanFormulated'].enable();
      this.addForm.controls['NoOfBod'].enable();
      this.addForm.controls['AnnualBusinessTurnoverinInr'].enable();
      this.addForm.controls['ShareCapitalMobilizedInInr'].enable();
      this.addForm.controls['NoOfFarmerMobilizedAsShareholders'].enable();
      this.addForm.controls['RegistrationOnEnam'].enable();
      this.addForm.controls['fpotradingThroughenum'].enable();
      this.addForm.controls['fpoFilledroc'].enable();
      this.addForm.controls['statutoryAudit'].enable();
      this.addForm.controls['receivedloanFrombank'].enable();
      this.addForm.controls['GstLicenceApplied'].enable();
      this.addForm.controls['AccountedAppointed'].enable();
      this.addForm.controls['CeoAppointed'].enable();
      this.addForm.controls['Min1WomenBod'].enable();
      this.addForm.controls['BusinessPlanFormulatedforYear'].enable();
      
      const data = {
        year: this.addForm.value.year,
        timeSlot: this.addForm.value.timeSlot,
        iaName: this.addForm.value.iaName.iaName,
        cbboName: this.cbboName,
        refNo: this.addForm.value.iaName.refNo,
        fpo: this.addForm.value.fpo.fpoName,
        cin: this.addForm.value.cin,
        email: this.addForm.value.email,
        MobileNo: this.addForm.value.MobileNo,
        dateofIncorporation: this.addForm.value.dateofIncorporation,
        commencementOfBusinessfieldWithMca: this.addForm.value.commencementOfBusinessfieldWithMca,
        AgmConducted: this.addForm.value.AgmConducted,
        AuditorAppointed: this.addForm.value.AuditorAppointed,
        CeoAppointed: this.addForm.value.CeoAppointed,
        AccountedAppointed: this.addForm.value.AccountedAppointed,
        BankAccountOpened: this.addForm.value.BankAccountOpened,
        Min1WomenBod: this.addForm.value.Min1WomenBod,
        statutoryAudit: this.addForm.value.statutoryAudit,
        NoOfFarmerMobilized: this.addForm.value.NoOfFarmerMobilized,
        NoOfFarmerMobilizedAsShareholders: this.addForm.value.NoOfFarmerMobilizedAsShareholders,
        NoOfBod: this.addForm.value.NoOfBod,
        GstLicenceApplied: this.addForm.value.GstLicenceApplied,
        ShareCapitalMobilizedInInr: this.addForm.value.ShareCapitalMobilizedInInr,
        EquityGrantAvailed: this.addForm.value.EquityGrantAvailed,
        fpotradingThroughenum: this.addForm.value.fpotradingThroughenum,
        fpoFilledroc: this.addForm.value.fpoFilledroc,
        BaselineStudyReportSubmitted: this.addForm.value.BaselineStudyReportSubmitted,
        BusinessPlanFormulated: this.addForm.value.BusinessPlanFormulated,
        BusinessPlanFormulatedforYear: this.addForm.value.BusinessPlanFormulatedforYear,
        NoOfMouSignedVendorRegistration: this.addForm.value.NoOfMouSignedVendorRegistration,
        RegistrationOnEnam: this.addForm.value.RegistrationOnEnam,
        AnnualBusinessTurnoverinInr: this.addForm.value.AnnualBusinessTurnoverinInr,
        receivedloanFrombank: this.addForm.value.receivedloanFrombank
      }

      if (confirm('Kindly Confirm')) {
        this.service.draftData(data).subscribe((result) => {
          this.addData = result
          this.toastr.success('Data Drafted successfully')

          this.showTurnOverReportBtn = false;
          this.showbBusinesPlanReportBtn = false;

          this.addForm.controls['cin'].disable();
          this.addForm.controls['email'].disable();
          this.addForm.controls['MobileNo'].disable();
          this.addForm.controls['dateofIncorporation'].disable();
          this.addForm.controls['EquityGrantAvailed'].disable();
          this.addForm.controls['BankAccountOpened'].disable();
          this.addForm.controls['NoOfBod'].disable();
          this.addForm.controls['NoOfFarmerMobilized'].disable();
          this.addForm.controls['BaselineStudyReportSubmitted'].disable();
          this.addForm.controls['BusinessPlanFormulated'].disable();
          this.addForm.controls['NoOfBod'].disable();
          this.addForm.controls['AnnualBusinessTurnoverinInr'].disable();
          this.addForm.controls['ShareCapitalMobilizedInInr'].disable();
          this.addForm.controls['NoOfFarmerMobilizedAsShareholders'].disable();
          this.addForm.controls['RegistrationOnEnam'].disable();
          this.addForm.controls['fpotradingThroughenum'].disable();
          this.addForm.controls['fpoFilledroc'].disable();
          this.addForm.controls['statutoryAudit'].disable();
          this.addForm.controls['receivedloanFrombank'].disable();
          this.addForm.controls['GstLicenceApplied'].disable();
          this.addForm.controls['AccountedAppointed'].disable();
          this.addForm.controls['CeoAppointed'].disable();
          this.addForm.controls['Min1WomenBod'].disable();
          this.addForm.controls['BusinessPlanFormulatedforYear'].disable();

          this.addForm.reset();
        })
      }
    } else {
      this.toastr.warning("Please fill the all required fields")
    }
  }
}
