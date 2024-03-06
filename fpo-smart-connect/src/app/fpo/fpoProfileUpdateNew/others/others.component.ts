import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {
  show = false;
  show1 = false;
  show2 = false;
  show3 = false;
  recordPdf: any;
  pdf: any;
  fetchedImage: any;
  recordVal: any = "Add";

  trainingBtnVal: any = "Add";
  // minDate: any;
  objectId: any;
  rewardBtnVal: any = "Add";
  recordBtnVal: any = "Add";

  awardNo: any;
  recordNo: any;
  recordIndex: any;



  constructor(private fb: FormBuilder, private appServ: AppService, private adminServ: AdminService, private toastr: ToastrService) { }



  ngOnInit(): void {
    // this.minDate = new Date();
    this.fetchTrainingData()
    this.fetchAwards()
    this.fetchRecords()




  }
  trainingDetailsForm = new FormGroup({
    trainingOrExposureVisit: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    trainingPurpose: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    maleAttendeesNo: new FormControl('', [Validators.required]),
    femaleAttendeesNo: new FormControl('', [Validators.required]),
    organisedBy: new FormControl('', [Validators.required]),
  })

  rewardForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.minLength(4), Validators.maxLength(4), Validators.min(1980), Validators.max(new Date().getFullYear())]),
    awardedOrganisation: new FormControl('', [Validators.required]),
  })
  recordForm = new FormGroup({

    recordType: new FormControl('', [Validators.required]),
    // reg: new FormControl('', [Validators.required]),
    doc: new FormControl('', [Validators.required]),
    // license: new FormControl('', [Validators.required]),
    // receipt: new FormControl('', [Validators.required]),
    receiptUpload: new FormControl('', [Validators.required]),
    // recordIndex: new FormControl(''),

  })

  trainingDataList: any;
  awards: any
  records: any
  AddRecordData1: any

  onNoMaleInput(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 9);
  }
  onNoaFemaleInput(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 9);
  }
  
  onReceivedYear(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 4);
  }
  fetchTrainingData() {
    //Fetching training details
    this.adminServ.trainingDetailsFetch(this.appServ.fpoId).subscribe(result => {
      this.trainingDataList = result;
    }
    )
  }

  fetchAwards() {
    this.adminServ.fetchAwards(this.appServ.fpoId).subscribe(result => {
      // console.log(result,"awards")
      this.awards = result;
    }
    )
  }
  fetchRecords() {
    this.adminServ.fetchRecords(this.appServ.fpoId).subscribe(result => {
      this.records = result;
      // console.log(this.records, "this.recordsthis.records");

    }
    )
  }

  recordStatus() {

    if (this.recordForm.value.recordType == "Register") {
      this.show = true;
    } else {
      this.show = false;
    }
    if (this.recordForm.value.recordType == "ReceiptBook") {
      this.show3 = true;
    } else {
      this.show3 = false;
    }
    if (this.recordForm.value.recordType == "SoftwareLicense") {
      this.show2 = true;
    } else {
      this.show2 = false;
    }
    if (this.recordForm.value.recordType == "Document") {
      this.show1 = true;
    } else {
      this.show1 = false;
    }
  }


  uploadReceipt(event: any) {
    if (event.target.files[0] != undefined) {
      if (event.target.files[0].type !== 'application/pdf') {
        this.toastr.warning("Please upload PDF files only")
      }
      var file: File = event.target.files[0];
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.pdf = myReader.result;
        this.recordPdf = this.pdf.replace('data:application/pdf;base64,', '')
        this.fetchedImage = "data:application/pdf;base64," + this.recordPdf;
      }
      myReader.readAsDataURL(file);
    } else {
      this.recordPdf = "";
    }
  }





  addTraingDetails() {
    this.trainingDetailsForm.value.fpoId = this.appServ.fpoId;
    if (this.trainingDetailsForm.valid) {
      if (this.trainingBtnVal != "Update") {
        this.adminServ.trainingDataUpdate(this.trainingDetailsForm.value).subscribe(result => {
          if (result.status == true) {
            this.fetchTrainingData();
            this.trainingBtnVal = "Add";
            this.toastr.success(result.message);
            this.trainingDetailsForm.reset();
          } else {
            this.toastr.warning(result.message);
          }
        })
      } else {
        this.trainingDetailsForm.value._id = this.objectId;
        this.adminServ.trainingDataUpdate(this.trainingDetailsForm.value).subscribe(result => {
          if (result.status == true) {
            this.fetchTrainingData();
            this.trainingBtnVal = "Add";
            this.toastr.success(result.message);
            this.trainingDetailsForm.reset();
          } else {
            this.toastr.warning(result.message)
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }
  editTrainingDetails(x: any) {
    this.trainingBtnVal = "Update";
    // console.log(x,"x");
    this.objectId = x._id;
    this.trainingDetailsForm.patchValue({
      trainingOrExposureVisit: x.trainingOrExposureVisit,
      year: x.year,
      trainingPurpose: x.trainingPurpose,
      location: x.location,
      maleAttendeesNo: x.maleAttendeesNo,
      femaleAttendeesNo: x.femaleAttendeesNo,
      organisedBy: x.organisedBy
    })
  }

  deleteTrainingDetails(x: any) {
    x.fpoId = this.appServ.fpoId;
    // console.log(x,"delete data");
    this.adminServ.deleteTrainingDetails(x).subscribe(result => {
      if (result.status == true) {
        this.trainingBtnVal = "Add";
        this.toastr.success(result.message);
        this.fetchTrainingData();
        this.trainingDetailsForm.reset();
      } else {
        this.toastr.warning(result.message);
      }
    }
    )
  }

  addAwardDetails() {
    this.rewardForm.value.fpoId = this.appServ.fpoId;
    if (this.rewardForm.valid) {
      if (this.rewardBtnVal != "Update") {
        this.adminServ.awardUpdate(this.rewardForm.value).subscribe(result => {
          if (result.status == true) {
            this.fetchAwards();
            this.rewardBtnVal = "Add";
            this.toastr.success(result.message);
            this.rewardForm.reset();
          } else {
            this.toastr.warning(result.message);
          }
        })
      } else {
        this.rewardForm.value.awardNo = this.awardNo;
        this.adminServ.awardUpdate(this.rewardForm.value).subscribe(result => {
          if (result.status == true) {
            this.fetchAwards();
            this.rewardBtnVal = "Add";
            this.toastr.success("Updated successfully")
            this.rewardForm.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }

  editAwardDetails(x: any) {
    this.rewardBtnVal = "Update";
    console.log(x, "x");
    this.awardNo = x.awardNo;

    this.rewardForm.patchValue({
      type: x.type,
      year: x.year,
      awardedOrganisation: x.awardedOrganisation,
    })
  }

  deleteAwardDetails(x: any) {
    x.fpoId = this.appServ.fpoId;
    this.adminServ.deleteAwardDetails(x).subscribe(result => {
      if (result.status == true) {
        this.rewardBtnVal = "Add";
        this.toastr.success(result.message);
        this.fetchAwards();
        this.rewardForm.reset();
      } else {
        this.toastr.warning(result.message);
      }
    }
    )
  }
  AddRecordData() {
    // console.log(this.recordForm.value, "this.recordForm.value != this.recordForm.value != ");
    this.recordForm.value.fpoCode = this.appServ.fpoId;
    if (this.recordForm.valid) {
      // if (this.recordForm.value != "" && this.recordForm.value != "Update") {
      if (this.recordBtnVal != "Update") {

        this.adminServ.AddRecordData(this.recordForm.value).subscribe(result => {
          console.log(result, "result.statusresult.status");

          if (result.status == true) {
            this.fetchRecords();
            this.recordVal = "Add";
            this.toastr.success(result.message)
            this.recordForm.reset();
          } else {
            this.toastr.warning(result.message)
          }
        })
      } else {
        this.recordForm.value.recordNo = this.recordNo;
        this.adminServ.AddRecordData(this.recordForm.value).subscribe(result => {
          if (result) {
            this.fetchRecords();
            this.recordVal = "Add";
            this.toastr.success("Updated successfully")
            this.recordForm.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }

  dataForUpdate() {
    throw new Error('Method not implemented.');
  }



  editRecordDetails(x: any) {
    this.recordStatus();
    this.recordBtnVal = "Update";
    console.log(x, "x");
    this.recordNo = x.recordNo;
    this.recordForm.patchValue({
      recordType: x.recordType,
      doc: x.doc,
      receiptUpload: x.receiptUpload,
    })
  }

  deleteRecordDetails(x: any) {
    x.fpoId = this.appServ.fpoId;
    this.adminServ.deleteRecordDetails(x).subscribe(result => {      
      if (result.status == true) {
        this.recordBtnVal = "Add";
        this.toastr.success(result.message);
        this.fetchRecords();
        this.recordForm.reset();
      } else {
        this.toastr.warning(result.message);
      }
    }
    )
  }


  // AddFields1() {
  //   this.trainingDatas.push({ delete: true })
  // }
  // deleteField1(i: any) {
  //   this.trainingDatas.splice(i, 1)
  // }
  // AddFields2() {
  //   this.awards.push({ delete: true })
  // }
  // deleteField2(i: any) {
  //   this.awards.splice(i, 1)
  // }





  // deleteTrainingRow(id: any) {
  //   // this.fpoData.secondaryBusinessDetails.splice(i, 1)

  //   this.adminServ.deleteTrainingRow(id, this.appServ.fpoId).subscribe(data => {
  //     if (data.status == true) {
  //       this.fetchTrainingData()
  //       this.toastr.success('Deleted', "Success")
  //     } else {
  //       this.toastr.error(' unsuccessful', "Error")
  //     }
  //     // this.fetchTrainingData()

  //   },
  //     error => {
  //       this.toastr.error('Server Error', "Error")

  //     })
  // }







  // trainingDataUpdate(_id: any, trainingOrExposureVisit: any, year: any, trainingPurpose: any, location: any, maleAttendeesNo: any, femaleAttendeesNo: any, organisedBy: any) {
  //   let data1 = {
  //     fpoId: this.appServ.fpoId,
  //     _id: _id,
  //     trainingOrExposureVisit: trainingOrExposureVisit,
  //     year: year,
  //     trainingPurpose: trainingPurpose,
  //     location: location,
  //     maleAttendeesNo: maleAttendeesNo,
  //     femaleAttendeesNo: femaleAttendeesNo,
  //     organisedBy: organisedBy
  //   }
  //   this.adminServ.trainingDataUpdate(data1).subscribe(
  //     data => {
  //       if (data.status == 1) {
  //         this.toastr.success('Update Success', "Success")
  //       } else {
  //         this.toastr.error('Update unsuccessful', "Error")
  //       }
  //       this.fetchTrainingData()
  //     },
  //     error => {
  //       this.toastr.error('Server Error', "Error")
  //     }
  //   )
  // }

  // awardUpdate(index: any, type: any, year: any, awardedOrganisation: any) {
  //   let data1 = {
  //     type: type,
  //     year: year,
  //     awardedOrganisation: awardedOrganisation
  //   }
  //   this.awards[index] = data1
  //   this.adminServ.awardUpdate(this.awards, this.appServ.fpoId).subscribe(
  //     data => {
  //       if (data.status == 1) {
  //         this.toastr.success('Update Success', "Success")
  //       } else {
  //         this.toastr.error('Update unsuccessful', "Error")
  //       }
  //       this.fetchTrainingData()
  //     },
  //     error => {
  //       this.toastr.error('Server Error', "Error")
  //     }
  //   )
  // }



  // Extra practice===============================
  // awardForm = new FormGroup({
  //   data: new FormArray([
  //     this.addAwardFormGroup()
  //   ])
  // })

  // addAwardFormGroup(): FormGroup {
  //   return this.fb.group({
  //     type: [''],
  //     year: [''],
  //     awardedOrganisation: ['']
  //   })
  // }

  // edit() {
  //   this.awardForm.setControl('data', this.existingData(this.awards))
  // }
  // test(){
  //   // ////console.log(this.awards)
  //   ////console.log(this.awardForm.value);

  // }
  // existingData(awards:any): FormArray {
  //   const formArray = new FormArray([])

  //   awards.forEach((e:any) => {
  //     formArray.push(this.fb.group({
  //       type: e.type,
  //       year: e.year,
  //       awardedOrganisation: e.awardedOrganisation
  //     }))

  //   })

  //   return formArray
  // }






}
