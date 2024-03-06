import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  issueCertificate = false;
  shareIssued = false;
  fpoExtendLoan = false;
  fetchedImage: any;
  pdf: any;
  MOAFileFetchData: any;
  AOAFileFetchData: any;
  MOAFilePath: any = "";
  AOAFilePath: any = "";

  lowerLimit: number = 0; // Lower limit for the number field
  upperLimit: number = 100000; // Upper limit for the number field
  selectedNumber: number = 0; // Default selected number

  lowLimit: number = 0; // Lower limit for the number field
  upLimit: number = 100000; // Upper limit for the number field
  selectNumber: number = 0; // Default selected number

  lowerLimits: number = 0; // Lower limit for the number field
  upperLimits: number = 100000; // Upper limit for the number field
  selectedNumbers: number = 0; // Default selected number

  lowerLimite: number = 0; // Lower limit for the number field
  upperLimite: number = 100000; // Upper limit for the number field
  selectedNumbere: number = 0; // Default selected number

  lowLimite: number = 0; // Lower limit for the number field
  upLimite: number = 100000; // Upper limit for the number field
  selectNumbere: number = 0; // Default selected number

  lowerLimited: number = 0; // Lower limit for the number field
  upperLimited: number = 100000; // Upper limit for the number field
  selectedNumbered: number = 0; // Default selected number

  lowLimited: number = 0; // Lower limit for the number field
  upLimited: number = 100000; // Upper limit for the number field
  selectNumbered: number = 0; // Default selected number

  

  constructor(private appServ: AppService, private adminServ: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dataForUpdate();
  // this.totalNoOfFarmer();
  // this.totalNoOfFarmer1();
  // this.totalNoOfFarmer2();

    // this.certificate();
  }

  fpoData: any

  fpoDetails = new FormGroup({
    noOfFarmerMember: new FormControl(''),
    year: new FormControl(''),
    noOfFarmerMember1: new FormControl(''),
    noOfFarmerMember2: new FormControl(''),
    noOfMaleFarmerMember: new FormControl('', [Validators.required]),
    noOfFemaleFarmerMember: new FormControl('', [Validators.required]),
    noOfMaleFarmerMember1: new FormControl('', [Validators.required]),
    noOfFemaleFarmerMember1: new FormControl('', [Validators.required]),
    noOfMaleFarmerMember2: new FormControl('', [Validators.required]),
    noOfFemaleFarmerMember2: new FormControl('', [Validators.required]),
    noOfScStFarmerMember: new FormControl(''),
    noOfSmallOrMarginalFarmer: new FormControl(''),
    NoOfFarmerMobilizedAsShareholders: new FormControl('', [Validators.required]),
    numberOfFigures: new FormControl(''),
    numberOfFiguresActivelyEngaged: new FormControl(''),
    shareCapitalRaisedAmount: new FormControl(''),
    paidUpCapitalAmount: new FormControl('', [Validators.required]),
    shareCertificateIssueStatus: new FormControl(''),
    fpoIssueDividends: new FormControl(''),
    fpoExtendLoan: new FormControl(''),
    totalshareCertificates: new FormControl(''),
    totalFpoIssueDividends: new FormControl(''),
    rateOfLoan: new FormControl('', [Validators.required]),


    moaDoc: new FormControl(''),
    aoaDoc: new FormControl(''),
  })

  dataForUpdate() {
    this.adminServ.updateFpo(this.appServ.fpoId).subscribe(
      data => {
        this.fpoData = data;
        if (this.fpoData?.FPOData?.MOAFileUploaded == true) {
          this.MOAFilePath = this.fpoData?.FPOData?.MOAFilePath;
        }
        if (this.fpoData?.FPOData?.AOAFileUploaded == true) {
          this.AOAFilePath = this.fpoData?.FPOData?.AOAFilePath;
        }
        this.fpoDetailsPatchValue()
        // this.totalNoOfFarmer()
        this.totalNoOfFarmer1()

        this.totalNoOfFarmer2()

      }
    )
  }

  onNumberChange(value: number) {
    // Ensure the entered value stays within the specified range
    if (value < this.lowerLimit) {
      this.selectedNumber = this.lowerLimit;
    } else if (value > this.upperLimit) {
      this.selectedNumber = this.upperLimit;
    } else {
      this.selectedNumber = value;
    }
  }
  
  onNumberChanged(value: number) {
    // Ensure the entered value stays within the specified range
    if (value < this.lowLimit) {
      this.selectNumber = this.lowLimit;
    } else if (value > this.upLimit) {
      this.selectNumber = this.upLimit;
    } else {
      this.selectNumber = value;
    }
  }

  onNumChange(value: number) {
    // Ensure the entered value stays within the specified range
    if (value < this.lowerLimits) {
      this.selectedNumbers = this.lowerLimits;
    } else if (value > this.upperLimits) {
      this.selectedNumbers = this.upperLimits;
    } else {
      this.selectedNumbers = value;
    }
  }

  onNumberFarmChange(value: number) {
    // Ensure the entered value stays within the specified range
    if (value < this.lowerLimite) {
      this.selectedNumbere = this.lowerLimite;
    } else if (value > this.upperLimite) {
      this.selectedNumbere = this.upperLimite;
    } else {
      this.selectedNumbere = value;
    }
  }
  
  onNumbFarmChange(value: number) {
    // Ensure the entered value stays within the specified range
    if (value < this.lowLimite) {
      this.selectNumbere = this.lowLimite;
    } else if (value > this.upLimite) {
      this.selectNumbere = this.upLimite;
    } else {
      this.selectNumbere = value;
    }
  }
  onNumberMembChange(value: number) {
    // Ensure the entered value stays within the specified range
    if (value < this.lowerLimited) {
      this.selectedNumbered = this.lowerLimited;
    } else if (value > this.upperLimit) {
      this.selectedNumbered = this.upperLimited;
    } else {
      this.selectedNumbered = value;
    }
  }
  
  onNumbMembChange(value: number) {
    // Ensure the entered value stays within the specified range
    if (value < this.lowLimited) {
      this.selectNumbered = this.lowLimited;
    } else if (value > this.upLimited) {
      this.selectNumbered = this.upLimited;
    } else {
      this.selectNumbered = value;
    }
  }
  onNumFigChange(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 9);
  }
  noOfShares(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 9);
  }
  
  onNumFigActive(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 9);
  }

  onNoAuthorised(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 9);
  }
  
  onCapitalRaisedTillDate(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 9);
  }

  NoTimesDividends(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 9);
  }
  NoRateLoanRepaymen(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 9);
  }

  fpoDetailsPatchValue() {
    this.fpoDetails.patchValue(this.fpoData.FPOData)
  }

  totalNoOfFarmer() {
    let total = parseInt(this.fpoDetails.value.noOfMaleFarmerMember) + parseInt(this.fpoDetails.value.noOfFemaleFarmerMember)
    this.fpoDetails.patchValue({
      noOfFarmerMember: total
    })
  }

  totalNoOfFarmer1() {
    let total = parseInt(this.fpoDetails.value.noOfMaleFarmerMember1) + parseInt(this.fpoDetails.value.noOfFemaleFarmerMember1)
    this.fpoDetails.patchValue({
      noOfFarmerMember1: total
    })
  }

  totalNoOfFarmer2() {
    let total = parseInt(this.fpoDetails.value.noOfMaleFarmerMember2) + parseInt(this.fpoDetails.value.noOfFemaleFarmerMember2)
    this.fpoDetails.patchValue({
      noOfFarmerMember2: total
    })
  }


  groupDetailsUpdate(sourceGroupName: any, groupName: any, typeOfGroup: any, noOfMembers: any, gramPanchyat: any, village: any, shareCapitalRaised: any) {
    let groupDetails = {
      fpoCode: this.appServ.fpoId,
      sourceGroupName: sourceGroupName,
      groupName: groupName,
      typeOfGroup: typeOfGroup,
      noOfMembers: noOfMembers,
      gramPanchyat: gramPanchyat,
      village: village,
      shareCapitalRaised: shareCapitalRaised
    }
    this.adminServ.groupDetailsUpdate(groupDetails).subscribe(
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

  MOAFileFetch(event: any) {
    // console.log(event.target.files[0], "event.target.files[0]");
    if (event.target.files[0] != undefined) {
      if (event.target.files[0].type !== 'application/pdf') {
        this.toastr.warning("Please upload PDF files only")
      }
      var file: File = event.target.files[0];
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.pdf = myReader.result;
        this.MOAFileFetchData = this.pdf.replace('data:application/pdf;base64,', '')
      }
      myReader.readAsDataURL(file);
    } else {
      this.MOAFileFetchData = "";
    }
  }
  AOAFileFetch(event: any) {
    // console.log(event.target.files[0], "event.target.files[0]");
    if (event.target.files[0] != undefined) {
      if (event.target.files[0].type !== 'application/pdf') {
        this.toastr.warning("Please upload PDF files only")
      }
      var file: File = event.target.files[0];
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.pdf = myReader.result;
        this.AOAFileFetchData = this.pdf.replace('data:application/pdf;base64,', '')
      }
      myReader.readAsDataURL(file);
    } else {
      this.AOAFileFetchData = "";
    }
  }
  // uploadBusinessFile(year: any) {
  //   if (this.MOAFileFetchData != null && this.MOAFileFetchData != '' && this.MOAFileFetchData != undefined) {
  //     let data = {
  //       fpoId: this.appServ.fpoId,
  //       MOAFileFetchData: this.MOAFileFetchData,
  //       year: year
  //     }
  //     this.adminServ.uploadBusinessFile(data).subscribe(result => {
  //       if (result.status == true) {
  //         this.dataForUpdate();
  //         // this.toastr.success('Updated Successfully')
  //       } else {
  //         // this.toastr.warning('Update unsuccessful')
  //       }
  //       this.dataForUpdate();
  //     },
  //       error => {
  //         this.toastr.error('Server Error', "Error")
  //       }
  //     )
  //   }
  // }

  membersDetailsSubmit() {
    // console.log(this.fpoDetails.value, 2222);

    if (this.MOAFileFetchData == null || this.MOAFileFetchData == '' || this.MOAFileFetchData == undefined) {
      this.fpoDetails.value.moaDoc = "";
    } else {
      console.log("hittttttttt");
      
      this.fpoDetails.value.moaDoc = this.MOAFileFetchData;
    }
    if (this.AOAFileFetchData == null || this.AOAFileFetchData == '' || this.AOAFileFetchData == undefined) {
      this.fpoDetails.value.aoaDoc = "";
    } else {

      this.fpoDetails.value.aoaDoc = this.AOAFileFetchData;
    }
    if (this.fpoDetails.controls['year'].invalid) {
      this.toastr.warning("Select Financial Year ");
      return;
    }
    if (this.fpoDetails.controls['noOfMaleFarmerMember'].invalid) {
      this.toastr.warning("Fill Number of Male farmer Members");
      return;
    }
    if (this.fpoDetails.controls['noOfFemaleFarmerMember'].invalid) {
      this.toastr.warning("Fill Number of Female farmer Members");
      return;
    }
    if (this.fpoDetails.controls['noOfMaleFarmerMember1'].invalid) {
      this.toastr.warning("Fill Number of Male Small/Marginal Farmer Members");
      return;
    }
    if (this.fpoDetails.controls['noOfFemaleFarmerMember1'].invalid) {
      this.toastr.warning("Fill Number of Female Small/Marginal Farmer Members");
      return;
    }
    if (this.fpoDetails.controls['numberOfFiguresActivelyEngaged'].invalid) {
      this.toastr.warning("Fill Number of Figures Actively Engaged");
      return;
    }
    if (this.fpoDetails.controls['noOfMaleFarmerMember2'].invalid) {
      this.toastr.warning("Fill Number of Male Shareholder Members");
      return;
    }
    if (this.fpoDetails.controls['noOfFemaleFarmerMember2'].invalid) {
      this.toastr.warning("Fill Number of Female Shareholder Members");
      return;
    }
    if (this.fpoDetails.controls['paidUpCapitalAmount'].invalid) {
      this.toastr.warning("Fill Shared/Paid Up Capital Raised Till Date");
      return;
    }
    if (this.fpoDetails.controls['shareCertificateIssueStatus'].invalid) {
      this.toastr.warning("Fill FPO issue share certificates to FPO members");
      return;
    }
    if (this.fpoDetails.controls['fpoIssueDividends'].invalid) {
      this.toastr.warning("Fill FPO issues Dividends/Patronage Bonus");
      return;
    }
    if (this.fpoDetails.controls['fpoExtendLoan'].invalid) {
      this.toastr.warning("Fill FPO extends loan to FPO members");
      return;
    }
   
    if (this.fpoDetails.value) {
      this.fpoDetails.value.fpoId = this.appServ.fpoId;
      this.adminServ.farmerDetailsSubmit(this.fpoDetails.value).subscribe(
        data => {
          if (data.status == 1) {
            this.toastr.success('Updated Successfully')
          } else {
            this.toastr.warning('Update unsuccessful')
          }
          this.dataForUpdate();
        },
        error => {
          this.toastr.error('Server Error', "Error")
        }
      )
    } else {
      this.toastr.warning("Fill minimum mandatory required fields")
    }

  }

  certificate() {
    if (this.fpoDetails.value.shareCertificateIssueStatus == "Yes") {
      this.issueCertificate = true;
    } else {
      this.issueCertificate = false;
    }
  }
  dividends() {
    if (this.fpoDetails.value.fpoIssueDividends == "Yes") {
      this.shareIssued = true;
    } else {
      this.shareIssued = false;
    }
  }
  
  extendLoans() {
    if (this.fpoDetails.value.fpoExtendLoan == "Yes") {
      this.fpoExtendLoan = true;
    } else {
      this.shareIssued = false;
    }
  }

  // AddFields3() {
  //   if (this.fpoData?.groupDetails) {
  //     this.fpoData.groupDetails.push({ delete: true })
  //   } else {
  //     this.fpoData.groupDetails = []
  //     this.fpoData.groupDetails.push({ delete: true })
  //   }
  // }
  // deleteField3(i: any) {
  //   this.fpoData.groupDetails.splice(i, 1)
  // }
  // pdf: any
  // imageDetailsFetch2(event: any) {
  //   this.readThis2(event);
  // }
  // readThis2(inputValue: any): void {
  //   var file: File = inputValue.files[0]; 
  //   var myReader: FileReader = new FileReader();

  //   myReader.onloadend = (e) => {
  //     this.pdf = myReader.result;
  //     let imageString = this.pdf.replace('data:application/pdf;base64,', '')
  //     // let imageString = this.pdf.replace('data:application/pdf;base64,', '')

  //     // this.fpoDetails.patchValue({
  //     //   moaDoc: imageString
  //     // })
  //     this.fetchedImage = "data:application/pdf;base64," + imageString;
  //     // this.fetchedImage = "data:image/jpeg;base64," + imageString;
  //     console.log(this.fetchedImage,"this.fetchedImage");

  //   }
  //   myReader.readAsDataURL(file);
  // }

  // imageDetailsFetch3(event: any) {
  //   this.readThis3(event)
  // }
  // readThis3(inputValue: any): void {
  //   this.pdf = ''
  //   var file: File = inputValue.files[0];
  //   var myReader: FileReader = new FileReader();

  //   myReader.onloadend = (e) => {
  //     this.pdf = myReader.result;
  //     let imageString = this.pdf.replace('data:application/pdf;base64,', '');

  //     this.fpoDetails.patchValue({
  //       aoaDoc: imageString
  //     })
  //   }
  //   myReader.readAsDataURL(file);
  // }










}
