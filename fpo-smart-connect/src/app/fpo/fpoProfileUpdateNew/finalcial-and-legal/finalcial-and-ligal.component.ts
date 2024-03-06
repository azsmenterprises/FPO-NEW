import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { AnyObject } from 'chart.js/types/basic';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-finalcial-and-ligal',
  templateUrl: './finalcial-and-ligal.component.html',
  styleUrls: ['./finalcial-and-ligal.component.css']
})
export class FinalcialAndLigalComponent implements OnInit {
  dId: any;
  FinVal: any = "Add";
  PLVal: any = "Add";
  finDetails: any;
  finDetails1: any;

  fpoData: any
  allBankNames: any
  branchName: any
  years: any = []
  finYearWiseData: any
  finYearWiseData1: any

  pdf: any;
  fetchedImage: any;
  pdfFetchData: any;
  pdfFetchData1: any;

  pdfUrl: any;
  showPDF: boolean = false;
  availFilePath: boolean = false;
  PLFilePath: boolean = false;

  // finAidType = false;
  aidType = false;
  equityType= false;
  creditType=false;
  turnOverFilePath: any;
  turnOverFilePath1: any;

  equityListDataArray: any = [];
  creditListDataArray: any = [];
  otherListDataArray: any = [];
  equityVal: any = "Add";
  creditVal: any = "Add";
  otherVal: any = "Add";
  equityIndex: any;
  hideEquityScheme: boolean = true;
  creditIndex: any;
  hideCreditScheme: boolean = true;
  otherSchemeIndex: any;
  SelectedBranchName: any;


  constructor(private appServ: AppService, private adminServ: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadBanKNames();
    this.dataForUpdate();
  }


  
  onAccountNoInput(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 18);
  }
  
  onTurnoverAmount(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 15);
  }
  
  NoAmountEquityGrant(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 9);
  }
  
  NoValueCreditCovered(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 9);
  }
  
  NoAmountOfGrant(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 9);
  }
  
  NoLoanAmountLimit(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 20);
  }
  // Fetching Bank names
  loadBanKNames() {
    this.adminServ.fetchBankNames().subscribe(
      data => {
        this.allBankNames = data
      }
    )
  }
  

  dataForUpdate() {
    this.adminServ.updateFpo(this.appServ.fpoId).subscribe(
      data => {
        this.fpoData = data
        // console.log(this.fpoData.equityGrant, "this.fpoData");
        if (data) {
          if (this.fpoData?.equityGrant) {
            this.equityListDataArray = this.fpoData?.equityGrant;
            // console.log(this.equityListDataArray.length, "this.equityListDataArray.length");

            if (this.equityListDataArray.length == 3) {
              this.hideEquityScheme = false;
            } else {
              this.hideEquityScheme = true;
            }
            // console.log(this.hideEquityScheme,"hideEquityScheme");
          }
          if (this.fpoData?.creditGrant) {
            this.creditListDataArray = this.fpoData?.creditGrant;
            if (this.creditListDataArray.length == 2) {
              this.hideCreditScheme = false;
            } else {
              this.hideCreditScheme = true;
            }
          }
          if (this.fpoData?.otherScheme) {
            this.otherListDataArray = this.fpoData?.otherScheme;
          }
        }

        this.accountDetailsPatchValue()
        this.bankAccSelect()
        this.haveLicenceSelect()
        this.schemesAvailedPatchValue()
        this.showDiv1()
        this.showDiv2()
        this.showDiv3()
        this.showDiv4()
        this.showDiv5()
        this.showDiv6()
      }
    )


    // Fetching Fin year details
    this.finYearDetails()
    this.finYearDetails1()




  }




  // ==============================Account Details Starts==========================================
  bankAccSelectShow = false
  haveLicenceSelectShow = false

  accountDetails = new FormGroup({
    haveBankAccount: new FormControl('', [Validators.required]),
    bankName: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    transactionPercentages: new FormControl('', [Validators.required]),
    branchName: new FormControl('', [Validators.required]),
    accountNo: new FormControl('', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(18), Validators.pattern("[0-9]{9,18}")])),
    panNo: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")])),
    tanNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[A-Z]{4}[0-9]{5}[A-Z]{1}")]),
    haveTradeLicence: new FormControl('', [Validators.required]),
    tradeLicenceNo: new FormControl('', [Validators.required])
  })

  boardDirectors = new FormGroup({

    noOfBoardDirectors: new FormControl(''),
  })

  finyeardata = new FormGroup({
    finYear: new FormControl('', [Validators.required]),
    finYear1: new FormControl('', [Validators.required]),
    turnoverAmount: new FormControl('', [Validators.required]),
    fpoAudit: new FormControl('', [Validators.required]),
    fpoAuditPL: new FormControl('', [Validators.required]),
    profit: new FormControl('', [Validators.required]),

    // fpoManagementCost: new FormControl('',[Validators.required]),
    // otherCost: new FormControl('',[Validators.required]),
    // income: new FormControl('',[Validators.required]),
  })

  equityData = new FormGroup({
    haveAvailedEquityGrant: new FormControl('', [Validators.required]),
    // status: new FormControl('', [Validators.required]),
    nameOfOrg: new FormControl('', [Validators.required]),
    YearOfEquity: new FormControl('', [Validators.required]),
    Amount: new FormControl('', [Validators.required]),
    PurposeOfGrantutilization: new FormControl('', [Validators.required]),
  })

  creditData = new FormGroup({
    haveAvailedCreditGrant: new FormControl('', [Validators.required]),
    // status: new FormControl('', [Validators.required]),
    nameOfOrg: new FormControl('', [Validators.required]),
    YearOfCreditavailed: new FormControl('', [Validators.required]),
    Amount: new FormControl('', [Validators.required]),
    Bankname: new FormControl('', [Validators.required]),
  })

  otherData = new FormGroup({
    schemeName: new FormControl('', [Validators.required]),
    // status: new FormControl('', [Validators.required]),
    nameOfOrg: new FormControl('', [Validators.required]),
    Amount: new FormControl('', [Validators.required]),
    Purpose1: new FormControl('', [Validators.required]),
    financialAid: new FormControl('', [Validators.required]),
    financialAidType: new FormControl('', [Validators.required]),


  })

  pdfFileFetch(event: any) {
    if (event.target.files[0] != undefined) {
      if (event.target.files[0].type !== 'application/pdf') {
        this.toastr.warning("Please upload PDF files only")
      }
      var file: File = event.target.files[0];
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.pdf = myReader.result;
        this.pdfFetchData = this.pdf.replace('data:application/pdf;base64,', '')
        this.fetchedImage = "data:application/pdf;base64," + this.pdfFetchData;

      }
      myReader.readAsDataURL(file);
    } else {
      this.pdfFetchData = "";
    }
  }
  pdfFileFetch1(event: any) {
    if (event.target.files[0] != undefined) {
      if (event.target.files[0].type !== 'application/pdf') {
        this.toastr.warning("Please upload PDF files only")
      }
      var file: File = event.target.files[0];
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.pdf = myReader.result;
        this.pdfFetchData1 = this.pdf.replace('data:application/pdf;base64,', '')
        this.fetchedImage = "data:application/pdf;base64," + this.pdfFetchData1;

      }
      myReader.readAsDataURL(file);
    } else {
      this.pdfFetchData1 = "";
    }
  }

  sanctionPdf(event: any) {
    if (event.target.files[0] != undefined) {
      if (event.target.files[0].type !== 'application/pdf') {
        this.toastr.warning("Please upload PDF files only")
      }
      var file: File = event.target.files[0];
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.pdf = myReader.result;
        this.pdfFetchData = this.pdf.replace('data:application/pdf;base64,', '')
        this.fetchedImage = "data:application/pdf;base64," + this.pdfFetchData;


      }
      myReader.readAsDataURL(file);
    } else {
      this.pdfFetchData = "";
    }
  }

  AddFinYearData() {
    this.finyeardata.value.fpoId = this.appServ.fpoId;
    if (this.finyeardata.controls['finYear'].invalid) {
      this.toastr.warning("Select fin year");
      return;
    }
    if (this.finyeardata.controls['turnoverAmount'].invalid) {
      this.toastr.warning("Fill turnover amount");
      return;
    }
    if (this.finyeardata.controls['fpoAudit'].invalid) {
      this.toastr.warning("Upload Audited Balance Sheet");
      return;
    }
    if (this.pdfFetchData != null && this.pdfFetchData != '' && this.pdfFetchData != undefined) {
      this.finyeardata.value.fpoAudit = this.pdfFetchData;
    }
    if (this.FinVal != "Update") {
      this.adminServ.finYearDetailsUpdate(this.finyeardata.value).subscribe(result => {
        if (result) {
          this.finYearDetails();
          this.FinVal = "Add";
          this.toastr.success("Added successfully")
          this.finyeardata.reset();
        } else {
          this.toastr.warning("Not added successfully")
        }
      })
    } else {
      this.finyeardata.value._id = this.finDetails._id;
      if (this.availFilePath == true) {
        this.finyeardata.value.turnOverFilePath = this.turnOverFilePath;
      }
      this.adminServ.finYearDetailsUpdate(this.finyeardata.value).subscribe(result => {
        if (result) {
          // this.boardListDataArray = result;
          this.finYearDetails();
          this.FinVal = "Add";
          this.toastr.success("Updated successfully")
          this.finyeardata.reset();
        } else {
          this.toastr.warning("Not added successfully")
        }
      })
    }

  }

  editFinDetails(x: any) {
    if (x.turnOverFilePath) {
      this.availFilePath = true;
      this.turnOverFilePath = x.turnOverFilePath;
    } else {
      this.availFilePath = false;
    }
    this.FinVal = "Update";
    this.finDetails = x;
    this.finyeardata.patchValue({
      finYear: x.finYear,
      turnoverAmount: x.turnoverAmount, 

    })
  }

  deleteFinDetails(x: any) {
    x.fpoId = this.appServ.fpoId;
    this.adminServ.deleteFinDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result.status == true) {
        this.FinVal = "Add";
        this.toastr.success(result.message);
        this.finYearDetails();
        this.finyeardata.reset();
      } else {
        this.toastr.warning(result.message)
      }
    })
  }


  AddPLData() {
    this.finyeardata.value.fpoId = this.appServ.fpoId;
    if (this.finyeardata.controls['finYear1'].invalid) {
      this.toastr.warning("Select fin year");
      return;
    }
    if (this.finyeardata.controls['profit'].invalid) {
      this.toastr.warning("Select profit Details");
      return;
    }
    if (this.finyeardata.controls['fpoAuditPL'].invalid) {
      this.toastr.warning("Upload Audited P & L Statement");
      return;
    }
    
    if (this.pdfFetchData1 != null && this.pdfFetchData1 != '' && this.pdfFetchData1 != undefined) {
      this.finyeardata.value.fpoAudit = this.pdfFetchData1;
    }
    if (this.PLVal != "Update") {
      // console.log(this.finyeardata.value, 'pldataaaaaaaaaaaaaaaaaaaaa777777777');

      this.adminServ.finYearDetailsUpdate1(this.finyeardata.value).subscribe(result => {
        if (result) {
          this.finYearDetails1();
          this.PLVal = "Add";
          this.toastr.success("Added successfully")
          this.finyeardata.reset();
        } else {
          this.toastr.warning("Not added successfully")
        }
      })
    } else {
      this.finyeardata.value._id = this.finDetails1._id;
      if (this.PLFilePath == true) {
        this.finyeardata.value.turnOverFilePath1 = this.turnOverFilePath1;
      }
      this.adminServ.finYearDetailsUpdate1(this.finyeardata.value).subscribe(result => {
        if (result) {
          // this.boardListDataArray = result;
          this.finYearDetails1();
          this.PLVal = "Add";
          this.toastr.success("Updated successfully")
          this.finyeardata.reset();
        } else {
          this.toastr.warning("Not added successfully")
        }
      })
    }

  }
  editPLDetails(x: any) {
    if (x.turnOverFilePath1) {
      this.PLFilePath = true;
      this.turnOverFilePath1 = x.turnOverFilePath1;
    } else {
      this.PLFilePath = false;
    }
    this.PLVal = "Update";
    this.finDetails1 = x;
    this.finyeardata.patchValue({
      finYear1: x.finYear1,
      profit: x.profit, 
      // profit: x.profit,
      // fpoAudit: x.fpoAudit,
      // fpoManagementCost: x.fpoManagementCost,
      // otherCost: x.otherCost,
      // income: x.income,
    })
  }

  deletePLDetails(x: any) {    
    x.fpoId = this.appServ.fpoId;
    
    this.adminServ.deletePLDetails(x).subscribe(result => {      
      this.fpoData = result;
      if (result.status == true) {
        this.PLVal = "Add";
        this.toastr.success(result.message);
        this.finYearDetails1();
        this.finyeardata.reset();
      } else {
        this.toastr.warning(result.message)
      }
      
      
    })
  }

  // downloadPdf(x: any) {
  //   let returnUrl = window.location.protocol + "//" + window.location.host + x.fpoAudit;
  //   var emptyWindow = window.open('', 'Window title', '_blank');
  //   window.open(x.fpoAudit, '_blank');
  //   // x.fpoId = this.appServ.fpoId;
  //   // this.adminServ.downloadPdf(x).subscribe(result => {
  //   //   if (result) {
  //   //     this.toastr.success("Download successfully");
  //   //   }
  //   // })
  // }

  AddEquityData() {
    this.equityData.value.fpoCode = this.appServ.fpoId;
    if (this.equityData.valid) {
      if (this.equityVal != "Update") {
        this.adminServ.AddEquityData(this.equityData.value).subscribe(result => {
          if (result.status == true) {
            this.dataForUpdate();
            this.equityVal = "Add";
            this.toastr.success(result.message);
            this.equityData.reset();
          } else {
            this.toastr.warning(result.message);
          }
        })
      } else {
        this.equityData.value.index = this.equityIndex;
        this.adminServ.updateEquityData(this.equityData.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.equityVal = "Add";
            this.toastr.success("Updated successfully")
            this.equityData.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }

  editEquityDetails(x: any) {
    this.equityscheme();
    this.equityVal = "Update";
    // console.log(x,"x");
    this.hideEquityScheme = true;
    this.equityIndex = x.index;
    this.equityData.patchValue({
      haveAvailedEquityGrant: x.haveAvailedEquityGrant,
      status: x.status,
      nameOfOrg: x.nameOfOrg,
      YearOfEquity: x.YearOfEquity,
      Amount: x.Amount,
      PurposeOfGrantutilization: x.PurposeOfGrantutilization,
    })
  }

  deleteEquityDetails(x: any) {
    x.fpoCode = this.appServ.fpoId;
    this.adminServ.deleteEquityDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.equityVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.equityData.reset();
      }
    }
    )
  }

  AddCreditData() {
    this.creditData.value.fpoCode = this.appServ.fpoId;
    if (this.creditData.valid) {
      if (this.creditVal != "Update") {
        this.adminServ.AddCreditData(this.creditData.value).subscribe(result => {
          if (result.status == true) {
            this.dataForUpdate();
            this.creditVal = "Add";
            this.toastr.success(result.message)
            this.creditData.reset();
          } else {
            this.toastr.warning(result.message)
          }
        })
      } else {
        this.creditData.value.index = this.creditIndex;
        this.adminServ.updateCreditData(this.creditData.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.creditVal = "Add";
            this.toastr.success("Updated successfully")
            this.creditData.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }

  editCreditDetails(x: any) {
    this.creditscheme();
    this.creditVal = "Update";
    this.hideCreditScheme = true;
    this.creditIndex = x.index;
    this.creditData.patchValue({
      haveAvailedCreditGrant: x.haveAvailedCreditGrant,
      status: x.status,
      nameOfOrg: x.nameOfOrg,
      YearOfCreditavailed: x.YearOfCreditavailed,
      Amount: x.Amount,
      Bankname: x.Bankname,
    })
  }

  deleteCreditDetails(x: any) {
    x.fpoCode = this.appServ.fpoId;
    this.adminServ.deleteCreditDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.equityVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.equityData.reset();
      }
    }
    )
  }

  AddOtherData() {
    this.otherData.value.fpoCode = this.appServ.fpoId;
    if (this.otherData.value) {
      if (this.otherVal != "Update") {
        this.adminServ.AddOtherData(this.otherData.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.otherVal = "Add";
            this.toastr.success("Added successfully")
            this.otherData.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.otherData.value.index = this.otherSchemeIndex;
        this.adminServ.updateOtherData(this.otherData.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.otherVal = "Add";
            this.toastr.success("Updated successfully")
            this.otherData.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }


  editOtherDetails(x: any) {
    this.finAidType();
    this.otherVal = "Update";
    this.otherSchemeIndex = x.index;
    this.otherData.patchValue({
      financialAid:x.financialAid,
      financialAidType:x.financialAidType,
      schemeName: x.schemeName,
      status: x.status,
      nameOfOrg: x.nameOfOrg,
      Amount: x.Amount,
      Purpose1: x.Purpose1,
    })
  }

  deleteOtherDetails(x: any) {
    console.log(x, "x");

    x.fpoCode = this.appServ.fpoId;
    this.adminServ.deleteOtherDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.otherVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.equityData.reset();
      }
    }
    )
  }

  accountDetailsPatchValue() {
    this.accountDetails.patchValue(this.fpoData.accountDetails)
    // this.accountDetails.patchValue({
    //   branchName: this.fpoData.accountDetails?.branchName
    // })
    this.fetchBranchName()
  }

  fetchBranchName() {
    this.accountDetails.value.branchName = "";
    this.branchName  = [];
    this.adminServ.fetchBranchName(this.accountDetails.value.bankName).subscribe(
      data => {
        this.branchName = data
      }
    )

  }

  bankAccSelect() {
    if (this.accountDetails.value.haveBankAccount == "yes") {
      this.bankAccSelectShow = true
    } else {
      this.bankAccSelectShow = false
    }
  }

  haveLicenceSelect() {
    if (this.accountDetails.value.haveTradeLicence == "Yes") {
      this.haveLicenceSelectShow = true
    } else {
      this.haveLicenceSelectShow = false
    }
  }


  getYear() {
    let currentYear: number = new Date().getFullYear();
    for (let i = (currentYear - 7); i < (currentYear + 7); i++) {
      this.years.push(i);
    }
  }
  accountDetailsSubmit() {
   
    console.log(this.accountDetails," this.accountDetails");
    
    this.adminServ.accountDetailsSubmit(this.accountDetails.value, this.appServ.fpoId).subscribe(
      data => {
        if (data.status == 1) {
          this.toastr.success('Update successfully')
        } else {
          this.toastr.warning('Update unsuccessful')
        }
        this.dataForUpdate()
      },
      error => {
        this.toastr.error('Server Error', "Error")
      }
    )
  }

  // ==============================Account Details Ends==========================================

  // ==============================Fin Year Starts==========================================

  finYearDetails() {
    this.adminServ.finYearDetails(this.appServ.fpoId).subscribe(
      data => {
        this.finYearWiseData = data

      }
    )
  }
  finYearDetails1() {
    this.adminServ.finYearDetails1(this.appServ.fpoId).subscribe(
      data => {
        this.finYearWiseData1 = data

      }
    )
  }

  schemes: any

  schemesDetails() {
    this.adminServ.schemesDetails(this.appServ.fpoId).subscribe(
      data => {
        this.schemes = data

      }
    )
  }


  finYearDetailsUpdate(_id: any, finYear: any, turnoverAmount: any, fpoAudit: any, fpoManagementCost: any) {
    let data1 = {
      _id: _id,
      fpoId: this.appServ.fpoId,
      finYear: finYear,
      turnoverAmount: turnoverAmount,
      // profit:profit,
      fpoAudit: fpoAudit,
      fpoManagementCost: fpoManagementCost,
      // otherCost: otherCost,
      // income: income
    }
    this.adminServ.finYearDetailsUpdate(data1).subscribe(
      data => {
        if (data.status == 1) {
          this.toastr.success('Update Success', "Success")
          this.finYearDetails()
        } else {
          this.toastr.error('Update unsuccessful', "Error")
        }
        this.dataForUpdate()

      },
      error => {
        this.toastr.error('Server Error', "Error")
      }
    )
  }

  finYearDetailsUpdate1(_id: any, finYear1: any, profit: any, fpoAuditPL: any) {
    let data1 = {
      _id: _id,
      fpoId: this.appServ.fpoId,
      finYear: finYear1,
      profit:profit,
      // otherCost: otherCost,
      // income: income
    }
    this.adminServ.finYearDetailsUpdate1(data1).subscribe(
      data => {
        if (data.status == 1) {
          this.toastr.success('Update Success', "Success")
          this.finYearDetails1()
        } else {
          this.toastr.error('Update unsuccessful', "Error")
        }
        this.dataForUpdate()

      },
      error => {
        this.toastr.error('Server Error', "Error")
      }
    )
  }


  SchemesAvailed(_id: any, schemeGrant: any, schemeName: any, statusEquity: any, amount: any, purpose: any, date: any) {
    let data1 = {
      _id: _id,
      fpoId: this.appServ.fpoId,
      schemeGrant: schemeGrant,

      schemeName: schemeName,
      statusEquity: statusEquity,
      amount: amount,
      purpose: purpose,
      date: date
    }
    this.adminServ.schemesDetailsUpdate(data1).subscribe(
      data => {
        if (data.status == 1) {
          this.toastr.success('Update Success', "Success")
          this.finYearDetails()
        } else {
          this.toastr.error('Update unsuccessful', "Error")
        }
        this.dataForUpdate()

      },
      error => {
        this.toastr.error('Server Error', "Error")
      }
    )
  }
  // ==============================Fin Year Ends==========================================

  // ==================================Schemes Availed start=============================================
  showEquityShow = false
  showOtherShow = false
  showCreditShow = false
  showDiv1Show = false
  showDiv2Show = false
  showDiv3Show = false
  showDiv4Show = false
  showDiv5Show = false
  showDiv6Show = false

  schemesAvailed = new FormGroup({
    haveAvailedEquityGrant: new FormControl(''),
    organisationHelped: new FormControl(''),
    equityGrantDetails: new FormControl(''),
    amountGranted: new FormControl(''),
    haveCreditGuaranteeScheme: new FormControl(''),
    organiExtendedCredGuarantee: new FormControl(''),
    credAvailedDetails: new FormControl(''),
    credAvldAmount: new FormControl(''),
    haveOtherScheme: new FormControl(''),
    OtherSchemeName: new FormControl(''),
    OtherSchemeDept: new FormControl(''),
    OtherSchemePurpose: new FormControl(''),
    OtherSchemeGrant: new FormControl(''),
    schemeName: new FormControl(''),
    schemeAvailedDetails: new FormControl(''),
    schemeAvailedAmount: new FormControl(''),
    statusEquity: new FormControl(''),
    statusCreditGuarentee: new FormControl(''),
    haveAvailedLoan: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    sourceOfLoan: new FormControl('', [Validators.required]),
    loanAmount: new FormControl('', [Validators.required]),
    loanClosedStatus: new FormControl('', [Validators.required]),
    statusOfClosure: new FormControl('', [Validators.required]),
    haveMissedEMI: new FormControl('', [Validators.required]),
    missingEMIReason: new FormControl('', [Validators.required]),
    equityPurposes1: new FormControl(''),
    equityPurposes2: new FormControl(''),
    equityPurposes3: new FormControl(''),
    credPurposes1: new FormControl(''),
    credPurposes2: new FormControl(''),
    credPurposes3: new FormControl(''),

  })

  schemesAvailedPatchValue() {
    this.schemesAvailed.patchValue(this.fpoData.schemesAvailed)
  }

  showDiv1() {
    if (this.schemesAvailed.value.haveAvailedEquityGrant == "Yes" || this.schemesAvailed.value.haveAvailedEquityGrant == "yes") {
      this.showDiv1Show = true
    } else {
      this.showDiv1Show = false
    }
  }

  showEquity() {
    if (this.schemesAvailed.value.statusEquity == "Availed already") {
      this.showEquityShow = true
    } else {
      this.showEquityShow = false
    }
  }

  showCredit() {
    if (this.schemesAvailed.value.statusCreditGuarentee == "Availed already") {
      this.showEquityShow = true
    } else {
      this.showEquityShow = false
    }
  }
  showOther() {
    if (this.schemesAvailed.value.OtherSchemeGrant == "Availed already") {
      this.showOtherShow = true
    } else {
      this.showOtherShow = false

    }
  }

  showDiv2() {
    if (this.schemesAvailed.value.haveCreditGuaranteeScheme == "Yes" || this.schemesAvailed.value.haveCreditGuaranteeScheme == "yes") {
      this.showDiv2Show = true
    } else {
      this.showDiv2Show = false
    }
  }
  showDiv3() {
    if (this.schemesAvailed.value.haveOtherScheme == "Yes" || this.schemesAvailed.value.haveOtherScheme == "yes") {
      this.showDiv3Show = true
    } else {
      this.showDiv3Show = false
    }
  }
  showDiv4() {
    if (this.schemesAvailed.value.haveAvailedLoan == "Yes" || this.schemesAvailed.value.haveAvailedLoan == "yes" || this.schemesAvailed.value.loanClosedStatus == "yes" || this.schemesAvailed.value.haveMissedEMI == "yes") {
      this.showDiv4Show = true
    } else {
      this.showDiv4Show = false
    }
  }
  showDiv5() {
    if (this.schemesAvailed.value.loanClosedStatus == "Closed" || this.schemesAvailed.value.loanClosedStatus == "Closed") {
      this.showDiv5Show = true
    } else {
      this.showDiv5Show = false
    }
  }
  showDiv6() {
    if (this.schemesAvailed.value.haveMissedEMI == "Yes" || this.schemesAvailed.value.haveMissedEMI == "yes") {
      this.showDiv6Show = true
    } else {
      this.showDiv6Show = false
    }
  }

  deleteRowfinYear(id: any) {
    // this.fpoData.secondaryBusinessDetails.splice(i, 1)
    //console.log("in ts deleterow1");

    this.adminServ.deleteRowfinYear(id, this.fpoData.fpoId).subscribe(data => {
      if (data.status == true) {
        this.toastr.success('Deleted', "Success")
        this.dataForUpdate()
      } else {
        this.toastr.error(' unsuccessful', "Error")
      }
      this.dataForUpdate()

    },
      error => {
        this.toastr.error('Server Error', "Error")

      })
  }


  boardDirectorsPatchValue() {
    this.boardDirectors.patchValue({

      noOfBoardDirectors: this.fpoData.equityGrant,
    })
  }


  creditGuarenteePatchValue() {
    this.boardDirectors.patchValue({

      creditGuranteeno: this.fpoData.creditGrant,
    })
  }

  schemesAvailedSubmit() {
    // console.log(this.schemesAvailed.valid, "this.schemesAvailed.value");

    this.adminServ.schemesAvailedSubmit(this.schemesAvailed.value, this.appServ.fpoId).subscribe(
      data => {
        if (data.status == 1) {
          this.toastr.success('Update Success', "Success")
        } else {
          this.toastr.error('Update unsuccessful', "Error")
        }
        this.dataForUpdate()

      },
      error => {
        this.toastr.error('Server Error', "Error")
      }
    )
  }

  // pendo(data: any, i: any) {
  // console.log("add"+ i,'poiuytrewq');
  // this.dId ="add"+ i

  //   let x = document.getElementById("nameOfOrgId" + i) as HTMLInputElement;
  //   let y = document.getElementById("amountId" + i) as HTMLInputElement;
  //   let z = document.getElementById("Purpose1Id" + i) as HTMLInputElement;
  //   let m = document.getElementById("Purpose2Id" + i) as HTMLInputElement;
  //   let p = document.getElementById("Purpose3Id" + i) as HTMLInputElement;
  //   if (data == 'no') {
  //     x.disabled = true;
  //     y.disabled = true;
  //     z.disabled = true;
  //     m.disabled = true;
  //     p.disabled = true;
  //   } else {
  //     x.disabled = false;
  //     y.disabled = false;
  //     z.disabled = false;
  //     m.disabled = false;
  //     p.disabled = false;
  //   }
  // }

  // ==================================Schemes Availed end=============================================

  // ==================================File upload start=============================================

  uploadedFiles = new FormGroup({
    regCertificate: new FormControl(''),
    memorandumAssociation: new FormControl(''),
    articlesOfAssociation: new FormControl(''),
    auditedBlncSheet1920: new FormControl(''),
    auditedBlncSheet1819: new FormControl(''),
    auditedBlncSheet1718: new FormControl('')
  })
  image: any

  imageDetailsFetch(event: any) {
    this.readThis(event)
  }
  readThis(inputValue: any): void {
    this.image = ''
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      let imageString = this.image.replace("data:image/png;base64,", "")

      this.uploadedFiles.patchValue({
        regCertificate: imageString
      })
    }
    myReader.readAsDataURL(file);
  }

  imageDetailsFetch1(event: any) {
    this.readThis1(event)
  }
  readThis1(inputValue: any): void {
    this.image = ''
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      let imageString = this.image.replace("data:image/png;base64,", "")

      this.uploadedFiles.patchValue({
        memorandumAssociation: imageString
      })
    }
    myReader.readAsDataURL(file);
  }

  // imageDetailsFetch2(event: any) {
  //   this.readThis2(event)
  // }
  // readThis2(inputValue: any): void {
  //   this.image = ''
  //   var file: File = inputValue.files[0];
  //   var myReader: FileReader = new FileReader();

  //   myReader.onloadend = (e) => {
  //     this.image = myReader.result;
  //     let imageString = this.image.replace("data:image/png;base64,", "")

  //     this.uploadedFiles.patchValue({
  //       articlesOfAssociation: imageString
  //     })
  //   }
  //   myReader.readAsDataURL(file);
  // }

  imageDetailsFetch3(event: any) {
    this.readThis3(event)
  }
  readThis3(inputValue: any): void {
    this.image = ''
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      let imageString = this.image.replace("data:image/png;base64,", "")

      this.uploadedFiles.patchValue({
        auditedBlncSheet1920: imageString
      })
    }
    myReader.readAsDataURL(file);
  }

  imageDetailsFetch4(event: any) {
    this.readThis4(event)
  }
  readThis4(inputValue: any): void {
    this.image = ''
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      let imageString = this.image.replace("data:image/png;base64,", "")

      this.uploadedFiles.patchValue({
        auditedBlncSheet1819: imageString
      })
    }
    myReader.readAsDataURL(file);
  }

  imageDetailsFetch5(event: any) {
    this.readThis5(event)
  }
  readThis5(inputValue: any): void {
    this.image = ''
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      let imageString = this.image.replace("data:image/png;base64,", "")

      this.uploadedFiles.patchValue({
        auditedBlncSheet1718: imageString
      })
    }
    myReader.readAsDataURL(file);
  }



  imageDetailsFetch6(event: any) {
    this.readThis6(event)
  }
  readThis6(inputValue: any): void {
    this.image = ''
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      let imageString = this.image.replace("data:image/png;base64,", "")

      this.uploadedFiles.patchValue({
        auditedBlncSheet1718: imageString
      })
    }
    myReader.readAsDataURL(file);
  }




  finAidType() {
    
    if (this.otherData.value.financialAid == "Yes") {
      console.log(this.otherData.value.financialAid,"this.otherData.value.financialAidthis.otherData.value.financialAid");
      
      this.aidType = true;
    } else {
      this.aidType = false;
    }
  }
  equityscheme() {
    
    if (this.equityData.value.haveAvailedEquityGrant == "Yes") {      
      this.equityType = true;
    } else {
      this.equityType = false;
    }
  }
  creditscheme() {
    
    if (this.creditData.value.haveAvailedCreditGrant == "Yes") {      
      this.creditType = true;
    } else {
      this.creditType = false;
    }
  }



  finalUploadFiles() {
    // ////console.log(22,this.uploadedFiles.value)
    this.adminServ.finalUploadFiles(this.uploadedFiles.value, this.appServ.fpoId).subscribe(
      data => {
        if (data.status == 1) {
          this.toastr.success('Update Success', "Success")
        } else {
          this.toastr.error('Update unsuccessful', "Error")
        }
        this.dataForUpdate()

      },
      error => {
        this.toastr.error('Server Error', "Error")
      }
    )

  }
  AddFields1() {
    //console.log( this.fpoData,"here");

    this.fpoData.equityGrant.push({ delete: true })
  }
  deleteField1(i: any) {
    this.fpoData.equityGrant.splice(i, 1)
  }



  AddFields5() {
    //console.log( this.fpoData,"here");

    this.fpoData.otherScheme.push({ delete: true })
  }
  deleteField5(i: any) {
    this.fpoData.otherScheme.splice(i, 1)
  }

  AddFields3() {
    this.fpoData.creditGrant.push({ delete: true })
  }
  deleteField3(i: any) {
    this.fpoData.creditGrant.splice(i, 1)
  }


  AddFields2() {
    this.fpoData.staffDetails.push({ delete: true })
  }
  deleteField4(i: any) {
    this.fpoData.staffDetails.splice(i, 1)
  }


  deleteRowEquity(i: any) {
    // this.fpoData.secondaryBusinessDetails.splice(i, 1)
    //console.log("in ts deleterow1");

    this.adminServ.deleteRowEquity(i, this.fpoData.fpoId).subscribe(data => {
      if (data.status == true) {
        this.toastr.success('Deleted', "Success")
        this.dataForUpdate()
      } else {
        this.toastr.error(' unsuccessful', "Error")
      }
      this.dataForUpdate()

    },
      error => {
        this.toastr.error('Server Error', "Error")

      })
  }


  deleteRowCredit(i: any) {
    // this.fpoData.secondaryBusinessDetails.splice(i, 1)
    //console.log("in ts deleterow1");

    this.adminServ.deleteRowCredit(i, this.fpoData.fpoId).subscribe(data => {
      if (data.status == true) {
        this.toastr.success('Deleted', "Success")
        this.dataForUpdate()
      } else {
        this.toastr.error(' unsuccessful', "Error")
      }
      this.dataForUpdate()

    },
      error => {
        this.toastr.error('Server Error', "Error")

      })
  }


  deleteRowOther(i: any) {
    // this.fpoData.secondaryBusinessDetails.splice(i, 1)
    //console.log("in ts deleterow1");

    this.adminServ.deleteRowOther(i, this.fpoData.fpoId).subscribe(data => {
      if (data.status == true) {
        this.toastr.success('Deleted', "Success")
        this.dataForUpdate()
      } else {
        this.toastr.error(' unsuccessful', "Error")
      }
      this.dataForUpdate()

    },
      error => {
        this.toastr.error('Server Error', "Error")

      })
  }
  equityGrantUpdate(index: any, haveAvailedEquityGrant: any, nameOfOrg: any, status: any, Amount: any, YearOfEquity: any, PurposeOfGrantutilization: any) {
    let boardDirectors = {
      fpoCode: this.appServ.fpoId,
      index: index,
      haveAvailedEquityGrant: haveAvailedEquityGrant,
      nameOfOrg: nameOfOrg,
      status: status,
      Amount: Amount,
      YearOfEquity: YearOfEquity,
      PurposeOfGrantutilization: PurposeOfGrantutilization,
      // Purpose3: Purpose3
      // panNo:pan
    }
    this.adminServ.detailsOfScheme(boardDirectors).subscribe(
      data => {
        if (data.status == 1) {
          this.toastr.success('Update Success', "Success")
        } else {
          this.toastr.error('Update unsuccessful', "Error")
        }

        this.dataForUpdate()
      },
      error => {
        this.toastr.error('Server Error', "Error")
      }
    )
  }
  creditGuranteeUpdate(index: any, haveAvailedCreditGrant: any, nameOfOrg: any, status: any, Amount: any, YearOfCreditavailed: any, Bankname: any) {
    //console.log("cred");

    let boardDirectors = {
      fpoCode: this.appServ.fpoId,
      index: index,
      haveAvailedCreditGrant: haveAvailedCreditGrant,
      nameOfOrg: nameOfOrg,
      status: status,
      Amount: Amount,
      YearOfCreditavailed: YearOfCreditavailed,
      Bankname: Bankname,
      // Purpose3: Purpose3
      // panNo:pan
    }
    this.adminServ.detailsOfCredScheme(boardDirectors).subscribe(
      data => {
        if (data.status == 1) {
          this.toastr.success('Update Success', "Success")
        } else {
          this.toastr.error('Update unsuccessful', "Error")
        }
        // ////console.log(data);
        this.dataForUpdate()

      },
      error => {
        this.toastr.error('Server Error', "Error")
      }
    )
  }



  otherSchemeUpdate(index: any, schemeName: any, nameOfOrg: any, status: any, Amount: any, Purpose1: any,financialAid:any,financialAidType:any) {
    let boardDirectors = {
      fpoCode: this.appServ.fpoId,
      index: index,
      schemeName: schemeName,
      nameOfOrg: nameOfOrg,
      status: status,
      Amount: Amount,
      Purpose1: Purpose1,

      // panNo:pan
    }
    this.adminServ.detailsOfOtherScheme(boardDirectors).subscribe(
      data => {
        if (data.status == 1) {
          this.toastr.success('Update Success', "Success")
        } else {
          this.toastr.error('Update unsuccessful', "Error")
        }
        // ////console.log(data);
        this.dataForUpdate()

      },
      error => {
        this.toastr.error('Server Error', "Error")
      }
    )
  }
  staffDetailsUpdate(sourceName: any, name: any, designation: any, contactNo: any, emailId: any, sex: any) {
    let staffDetails = {
      fpoCode: this.appServ.fpoId,
      sourceName: sourceName,
      name: name,
      designation: designation,
      contactNo: contactNo,
      emailId: emailId,
      sex: sex
    }
    this.adminServ.staffDetailsUpdate(staffDetails).subscribe(
      data => {
        if (data.status == 1) {
          this.toastr.success('Update Success', "Success")
        } else {
          this.toastr.error('Update unsuccessful', "Error")
        }
        this.dataForUpdate()

      },
      error => {
        this.toastr.error('Server Error', "Error")
      }
    )
  }
  // ==================================File upload end=============================================


  AddFieldsToFinYearData() {
    this.finYearWiseData.push({ delete: true })
  }
  deleteField2(i: any) {
    this.finYearWiseData.splice(i, 1)
  }


}
