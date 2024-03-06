import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';
import { MatTabsModule } from '@angular/material/tabs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-board-of-directors',
  templateUrl: './board-of-directors.component.html',
  styleUrls: ['./board-of-directors.component.css']
})
export class BoardOfDirectorsComponent implements OnInit {
  DINdisabled: boolean = false;
  emailDisabled: boolean = false;
  minDate: any;
  meetingHeldBtnVal: any;
  editMeetingHeldMode: boolean = false;
  editSchMeetDetails: any;
  meetHeldDetails: any;
  ngoDetailsShow = false
  meetingDetails: any;
  fpoData: any;
  heldMeetings: any;
  BtnVal: any = "Add";
  Stffval: any = "Add";
  boardListDataArray: any = [];
  staffListDataArray: any = [];
  scheduleBtnVal: any = "Add";
  addBODUsingMethod: any = "";
  showManualTable: boolean = false;
  showExcelTable: boolean = false;
  selectedFile: any;
  excelsheetFile: any;

  @ViewChild('inputFile') inputFile!: ElementRef;
  validatedData: any = [];
  rejectedData: any = [];
  showRejectedList: boolean = false;

  


  lowerLimits: number = 0; // Lower limit for the number field
  upperLimits: number = 1000; // Upper limit for the number field
  selectedNumbers: number = 0; // Default selected number

  lowerLimite: number = 0; // Lower limit for the number field
  upperLimite: number = 1000; // Upper limit for the number field
  selectedNumbere: number = 0; // Default selected number


  constructor(private appServ: AppService, private adminServ: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addBODUsingMethod = "manual";
    this.usingMethods();
    console.log(this.addBODUsingMethod, "this.addBODUsingMethod");

    this.minDate = new Date();
    this.getFpoDetails(); //All data for update are fetched from this function
    this.getMeetingDetails();  //All meetings data are fetched from this function
    this.editMeetingHeldMode = false;
  }

  // onNumberChange(value: number) {
  //   // Ensure the entered value stays within the specified range
  //   if (value < this.lowerLimit) {
  //     this.selectedNumber = this.lowerLimit;
  //   } else if (value > this.upperLimit) {
  //     this.selectedNumber = this.upperLimit;
  //   } else {
  //     this.selectedNumber = value;
  //   }
  // }
  // onMeetingChange(value: number) {
  //   // Ensure the entered value stays within the specified range
  //   if (value < this.lowerLimit) {
  //     this.selectedNumber = this.lowerLimit;
  //   } else if (value > this.upperLimit) {
  //     this.selectedNumber = this.upperLimit;
  //   } else {
  //     this.selectedNumber = value;
  //   }
  // }

  // onMinMeetChange(value: number) {
  //   // Ensure the entered value stays within the specified range
  //   if (value < this.lowerLimit) {
  //     this.selectedNumber = this.lowerLimit;
  //   } else if (value > this.upperLimit) {
  //     this.selectedNumber = this.upperLimit;
  //   } else {
  //     this.selectedNumber = value;
  //   }
  // }

  usingMethods() {
    if (this.addBODUsingMethod == "manual") {
      this.showManualTable = true;
      this.showExcelTable = false;
    }
    if (this.addBODUsingMethod == "excel") {
      this.showManualTable = false;
      this.showExcelTable = true;
    }
  }
  onFileChange(event: any) {
    if (event.target.files[0] != undefined) {
      if (event.target.files[0].type === 'application/vnd.ms-excel' || event.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.selectedFile = event.target.files[0];
      } else {
        this.toastr.error('Please upload only .xls or .xlsx file.');
        // this.xlFile.value = null;
        // this.inputFile.nativeElement.value = '';
      }
    }else{
      this.inputFile.nativeElement.value = '';
      this.selectedFile = null;
    }
  }
  importBODData() {
    if (this.selectedFile == null || this.selectedFile == undefined) {
      this.toastr.warning('Please select a XL file first');

      return;
    }
    this.inputFile.nativeElement.value = '';
  

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const data: string = e.target.result;
      const workBook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
      const wsname: string = workBook.SheetNames[0];
      const ws: XLSX.WorkSheet = workBook.Sheets[wsname];
      var sheetData = XLSX.utils.sheet_to_json(workBook.Sheets[wsname])
      console.log(sheetData, "sheetData");
      this.validatedData = [];
      this.rejectedData = [];

      sheetData.forEach(((element: any) => {
        var vData = {
          name: element['name'],
          phNumber: element['phone'],
          sex: element['gender'],
          age: element['age'],
          educationalQual: element['qualification'],
          DIN: element['DIN'],
          fpoId: ''
        };

        if (typeof (element['phone']) == 'string') {
          element['phone'] = element['email'].trim();
        }
        var rData = {
          name: element['name'],
          phNumber: element['phone'],
          sex: element['gender'],
          age: element['age'],
          educationalQual: element['qualification'],
          DIN: element['DIN'],
          reason: ''
        };
        var letter = /^[a-zA-Z \\s?.]*$/;
        var mobileno = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        var genderMale = /^Male$/;
        var genderFemale = /^Female$/;
        var letterNumber = /^[a-zA-Z0-9 ]*$/;

        if (element['name'] == null || element['name'] == undefined || element['name'] == '' || (element['name'].toString()).match(letter) == null) {
          rData.reason = "Invalid Name.";
          this.rejectedData.push(rData);
        } else if ((element['phone'] == undefined) || element['phone'] == null || (element['phone'].toString()).match(mobileno) == null) {
          rData.reason = "Invalid Phone No.";
          this.rejectedData.push(rData);

        } else if ((element['gender'] == undefined) || element['gender'] == null || (element['gender'].toString()).match(genderMale) == null && (element['gender'].toString()).match(genderFemale) == null) {
          rData.reason = "Gender should be like('Male'/'Female') ";
          this.rejectedData.push(rData);

        } else if ((element['age'] == undefined) || element['age'] == null || element['age'] == '') {
          rData.reason = "Invalid age";
          this.rejectedData.push(rData);

        } else if ((element['qualification'] == undefined) || element['qualification'] == null || element['qualification'] == '') {
          rData.reason = "Invalid qualification";
          this.rejectedData.push(rData);

        } else if ((element['DIN'] == undefined) || element['DIN'] == null || element['DIN'] == '') {
          rData.reason = "Invalid DIN";
          this.rejectedData.push(rData);
        } else {
          vData.fpoId = this.appServ.fpoId;
          this.validatedData.push(vData);
        }
      }));

      // console.log(this.validatedData, "this.validatedData");
      // console.log(this.rejectedData, "this.rejectedData");
      if (this.validatedData && this.validatedData.length > 0) {
        this.adminServ.uploadBODList(this.validatedData).subscribe(result => {
          if (result) {
            this.getFpoDetails();
            this.BtnVal = "Add";
            this.toastr.success("Added successfully")
            this.boardDirectors.reset();
            this.selectedFile = null;
          } else {
            this.toastr.warning("Not added successfully");
            this.selectedFile = null;
          }
        })
      } else {
        this.toastr.warning("Invalid Excel Format")
      }
      if (this.rejectedData.length > 0) {
        this.showRejectedList = true;
      } else {
        this.showRejectedList = false;
      }

    };
    reader.readAsBinaryString(this.selectedFile);

  }

  boardDirectors = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+?[ ]?[. ]?|[a-zA-Z]+)+$/)]),
    phNumber: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[6-9]{1}[0-9]{9}")])),
    sex: new FormControl('', [Validators.required ]),
    age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    educationalQual: new FormControl('', [Validators.required]),
    DIN: new FormControl('', [Validators.required]),
  })

  staffDetails = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+?[ ]?[. ]?|[a-zA-Z]+)+$/)]),
    designation: new FormControl('', [Validators.required]),
    contactNo: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[6-9]{1}[0-9]{9}")])),
    emailId: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    sex: new FormControl('', [Validators.required]),
  })
  scheduleMeetingForm = new FormGroup({
    meetingDate: new FormControl('', [Validators.required]),
    meetingType: new FormControl('', [Validators.required]),
    agenda: new FormControl('', [Validators.required]),
    noOfAttendees: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    totalMinutes: new FormControl('', [Validators.required]),
    

  })
  meetingsHeldForm = new FormGroup({
    meetingDate: new FormControl('', [Validators.required]),
    meetingType: new FormControl('', [Validators.required]),
    // noOfMaleAttendees: new FormControl('', [Validators.required]),
    // noOfFemaleAttendees: new FormControl('', [Validators.required]),
    // totalMinutes: new FormControl('', [Validators.required]),
  })

  onInput(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 3);
  }
  
  onMeetingAttendance(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 9);
  }
  getFpoDetails() {
    this.adminServ.getFpoDetails(this.appServ.fpoId).subscribe(result => {
      this.fpoData = result;
      if (result) {
        if (this.fpoData?.boardDirectorsDetails) {
          this.boardListDataArray = this.fpoData.boardDirectorsDetails;
        }
        if (this.fpoData?.staffDetails) {
          this.staffListDataArray = this.fpoData.staffDetails;
        }
      }
    }
    )
  }
  AddBoardDirectors() {
    // console.log(this.boardDirectors.value,"this.boardDirectors.value");
    this.boardDirectors.value.fpoCode = this.appServ.fpoId;
    if (this.boardDirectors.valid) {
      if (this.BtnVal != "Update") {
        this.adminServ.AddBoarddirectors(this.boardDirectors.value).subscribe(result => {
          // console.log(result, 'uygtfrd');
          if (result) {
            // this.boardListDataArray = result;
            this.getFpoDetails();
            this.BtnVal = "Add";
            this.toastr.success("Added successfully")
            this.boardDirectors.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        // console.log(this.boardDirectors.value,"this.boardDirectors.value");
        this.adminServ.updateBoardDirectors(this.boardDirectors.value).subscribe(result => {
          // console.log(result, 'uygtfrd');
          if (result) {
            // this.boardListDataArray = result;
            this.DINdisabled = false;
            this.getFpoDetails();
            this.BtnVal = "Add";
            this.toastr.success("Updated successfully")
            this.boardDirectors.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }
  editBoardDirectors(x: any) {
    this.BtnVal = "Update";
    this.showManualTable = true;
    this.showExcelTable = false;
    this.addBODUsingMethod = "";

    if (x.sex == "male") {
      x.sex = "Male"
    }
    if (x.sex == "fmale") {
      x.sex = "Feale"
    }
    this.boardDirectors.patchValue({
      name: x.name,
      phNumber: x.phNumber,
      sex: x.sex,
      age: x.age,
      educationalQual: x.educationalQual,
      DIN: x.DIN,
    })
    this.DINdisabled = true;
  }
  deleteBoardDirectors(data: any) {
    // console.log(this.appServ,"this.appServ");
    data.fpoId = this.appServ.fpoId;
    // console.log(data,"data"); 

    this.adminServ.deleteBoardDirectors(data).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.DINdisabled = false;
        this.BtnVal = "Add";
        this.toastr.success("Deleted successfully");
        this.getFpoDetails();
        this.boardDirectors.reset();
      }
    }
    )
  }

  AddStaffDetails() {
    this.staffDetails.value.fpoCode = this.appServ.fpoId
    if (this.staffDetails.valid) {
      if (this.Stffval != "Update") {
        this.adminServ.AddStaffDetails(this.staffDetails.value).subscribe(result => {
          if (result) {
            this.getFpoDetails();
            this.Stffval = "Add";
            this.toastr.success("Added successfully")
            this.staffDetails.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.adminServ.updateStaffDetails(this.staffDetails.value).subscribe(result => {
          if (result) {
            // this.boardListDataArray = result;
            this.emailDisabled = false;
            this.getFpoDetails();
            this.Stffval = "Add";
            this.toastr.success("Updated successfully")
            this.staffDetails.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }


  }
  editStaffDetails(x: any) {
    this.Stffval = "Update";
    if (x.sex == "male") {
      x.sex = "Male"
    }
    if (x.sex == "fmale") {
      x.sex = "Feale"
    }
    this.staffDetails.patchValue({
      name: x.name,
      designation: x.designation,
      contactNo: x.contactNo,
      emailId: x.emailId,
      sex: x.sex,
    })
    this.emailDisabled = true;
  }
  deleteStaffDetails(data: any) {
    // console.log(this.appServ,"this.appServ");
    data.fpoId = this.appServ.fpoId;

    this.adminServ.deleteStaffDetails(data).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.emailDisabled = false;
        this.Stffval = "Add";
        this.toastr.success("Deleted successfully");
        this.staffDetails.reset();
        this.getFpoDetails();
      }
    }
    )
  }
  addScheduleMeeting() {
    // console.log(this.scheduleMeetingForm.value, "scheduleMeetingForm");
    if (this.scheduleMeetingForm.valid) {
      if (this.scheduleBtnVal != "Update") {
        let data = {
          fpoId: this.appServ.fpoId,
          meetingDate: this.scheduleMeetingForm.value.meetingDate,
          meetingType: this.scheduleMeetingForm.value.meetingType,
          noOfAttendees: this.scheduleMeetingForm.value.noOfAttendees,
          agenda: this.scheduleMeetingForm.value.agenda,
          totalMinutes: this.scheduleMeetingForm.value.totalMinutes
        }
        this.adminServ.meetingDetailsUpdate(data).subscribe(result => {
          if (result.status == 1) {
            this.toastr.success('Added Successfully');
            this.scheduleMeetingForm.reset();
          } else {
            this.toastr.warning('Add unsuccessful')
          }
          this.getMeetingDetails();

        },
          error => {
            this.toastr.error('Server Error', "Error")
          }
        )
      } else {
        this.scheduleMeetingForm.value.meetingDate = this.editSchMeetDetails.meetingDate;
        this.scheduleMeetingForm.value.meetingType = this.editSchMeetDetails.meetingType;
        this.scheduleMeetingForm.value.noOfAttendees = this.editSchMeetDetails.noOfAttendees;
        this.scheduleMeetingForm.value.totalMinutes = this.editSchMeetDetails.totalMinutes;
        this.scheduleMeetingForm.value.fpoId = this.editSchMeetDetails.fpoId;
        this.scheduleMeetingForm.value.slNo = this.editSchMeetDetails.slNo;
        // console.log(this.scheduleMeetingForm.value,"update details");

        this.adminServ.meetingDetailsUpdate(this.scheduleMeetingForm.value).subscribe(result => {
          if (result.status == 1) {
            this.toastr.success('Update Successfully');
            this.scheduleBtnVal = "Add";
            this.scheduleMeetingForm.reset();
          } else {
            this.toastr.warning('Update unsuccessful')
          }
          this.getMeetingDetails();
        }, error => {
          this.toastr.error('Server Error', "Error")
        }
        )
      }
    } else {
      this.toastr.warning("Fill all the required fields");
    }

  }
  editScheduleMeeting(x: any) {
    console.log(x, "x");
    this.editSchMeetDetails = x;
    this.scheduleBtnVal = "Update";
    this.scheduleMeetingForm.patchValue({
      meetingDate: x.meetingDate,
      meetingType: x.meetingType,
      agenda: x.agenda,
      noOfAttendees:x.noOfAttendees,
      totalMinutes:x.totalMinutes
    })
  }
  deleteScheduleMeeting(data: any) {
    this.adminServ.deleteScheduleMeeting(data).subscribe(result => {
      if (result.status == true) {
        this.toastr.success('Deleted Successfully');
        this.getMeetingDetails();
        this.scheduleMeetingForm.reset();
        this.scheduleBtnVal = "Add";
      } else {
        this.toastr.warning('Delete unsuccessful')
      }

    }, error => {
      this.toastr.error('Server Error', "Error")
    }
    )
  }
  updateMeetingHeldDetails() {
    // this.meetingHeldBtnVal = "Update";
    if (this.meetingsHeldForm.valid) {
      this.editMeetingHeldMode = false;
      this.meetingsHeldForm.value.fpoId = this.appServ.fpoId;
      this.meetingsHeldForm.value.slNo = this.meetHeldDetails.slNo;
      this.adminServ.meetingDetailsUpdate(this.meetingsHeldForm.value).subscribe(
        data => {
          if (data.status == 1) {
            this.toastr.success('Update Successfully');
            this.meetingsHeldForm.reset();
          } else {
            this.toastr.warning('Update unsuccessful')
          }
          this.getMeetingDetails()
        }, error => {
          this.toastr.error('Server Error', "Error")
        }
      )
    } else {
      this.toastr.warning("Fill all the required fields");
    }

  }
  editMeetingHeldDetails(x: any) {
    this.editMeetingHeldMode = true;
    this.meetHeldDetails = x;
    this.meetingsHeldForm.patchValue({
      meetingDate: x.meetingDate,
      meetingType: x.meetingType,
      agenda: x.agenda,
      noOfMaleAttendees: x.noOfMaleAttendees,
      noOfFemaleAttendees: x.noOfFemaleAttendees,
      totalMinutes: x.totalMinutes
    })
  }

  getMeetingDetails() {
    //Fetching Meeting details
    this.adminServ.meetingDetailsFetch(this.appServ.fpoId).subscribe(
      data => {
        this.meetingDetails = data.allMeeting
        // this.heldMeetings = data.meeting_conducted
        console.log(this.meetingDetails, "this.meetingDetails");
        // console.log(this.heldMeetings, "this.heldMeetings");

      })
    // this.adminServ.updateFpo(this.appServ.fpoId).subscribe( data => {
    //     this.fpoData = data;
    //   }
    // )
  }

  // promotedByNGOSelect() {
  //   if (this.boardDirectors.value.promotedByNGO == 'Yes') {
  //     this.ngoDetailsShow = true
  //   } else {
  //     this.ngoDetailsShow = false
  //   }
  // }

  // boardDirectorsPatchValue() {
  //   this.boardDirectors.patchValue({
  //     // organisationHelpedToCreateSPO: this.fpoData.organisationHelpedToCreateSPO,
  //     // creationScheme: this.fpoData.creationScheme,
  //     // promotedByNGO: this.fpoData.promotedByNGO,
  //     // ngoName: this.fpoData.ngoName,
  //     // keyPersonContactNo: this.fpoData.keyPersonContactNo,
  //     noOfBoardDirectors: this.fpoData.noOfBoardDirectors,
  //   })
  // }

  // AddFields1() {
  //   this.fpoData.boardDirectorsDetails.push({ delete: true })
  // }
  // deleteField1(i: any) {
  //   this.fpoData.boardDirectorsDetails.splice(i, 1)
  // }

  // AddFields2() {
  //   this.fpoData.staffDetails.push({ delete: true })
  // }
  // deleteField2(i: any) {
  //   this.fpoData.staffDetails.splice(i, 1)
  // }

  // AddFields6() {
  //   //console.log( this.meetingDetails," this.meetingDetails");

  //   this.meetingDetails.push({ delete: true })
  // }

  // deleteField6(i: any) {
  //   this.meetingDetails.splice(i, 1)
  // }

  // deleteRowBod(i: any) {
  //   // this.fpoData.secondaryBusinessDetails.splice(i, 1)
  //   //console.log("in ts deleterow1");

  //   this.adminServ.deleteRowBod(i, this.fpoData.fpoId).subscribe(data => {
  //     if (data.status == true) {
  //       this.toastr.success('Deleted', "Success")
  //       this.dataForUpdate()
  //     } else {
  //       this.toastr.error(' unsuccessful', "Error")
  //     }
  //     this.dataForUpdate()

  //   },
  //     error => {
  //       this.toastr.error('Server Error', "Error")

  //     })
  // }

  // deleteRowStaff(i: any) {
  //   // this.fpoData.secondaryBusinessDetails.splice(i, 1)
  //   //console.log("in ts deleterow1");

  //   this.adminServ.deleteRowStaff(i, this.fpoData.fpoId).subscribe(data => {
  //     if (data.status == true) {
  //       this.toastr.success('Deleted', "Success")
  //       this.dataForUpdate()
  //     } else {
  //       this.toastr.error(' unsuccessful', "Error")
  //     }
  //     this.dataForUpdate()

  //   },
  //     error => {
  //       this.toastr.error('Server Error', "Error")

  //     })
  // }

  // boardDirUpdate(sourceName: any, name: any, phNo: any, sex: any, age: any, eduQual: any, din: any) {
  //   let boardDirectors = {
  //     fpoCode: this.appServ.fpoId,
  //     sourceName: sourceName,
  //     name: name,
  //     phNumber: phNo,
  //     sex: sex,
  //     age: age,
  //     educationalQual: eduQual,
  //     DIN: din,
  //     // panNo:pan
  //   }
  //   this.adminServ.detailsOfBoardDirectors(boardDirectors).subscribe(
  //     data => {
  //       if (data.status == 1) {
  //         this.toastr.success('Update Success', "Success")
  //       } else {
  //         this.toastr.error('Update unsuccessful', "Error")
  //       }
  //       // ////console.log(data);
  //       this.dataForUpdate()

  //     },
  //     error => {
  //       this.toastr.error('Server Error', "Error")
  //     }
  //   )
  // }

  // boardDirectorsDataSubmit() {
  //   this.adminServ.boardDirectorsDataSubmit(this.boardDirectors.value, this.appServ.fpoId).subscribe(
  //     data => {
  //       if (data.status == 1) {
  //         this.toastr.success('Update Success', "Success")
  //       } else {
  //         this.toastr.error('Update unsuccessful', "Error")
  //       }
  //       this.dataForUpdate()

  //     },
  //     error => {
  //       this.toastr.error('Server Error', "Error")
  //     }
  //   )
  // }

  // staffDetailsUpdate(sourceName: any, name: any, designation: any, contactNo: any, emailId: any, sex: any) {
  //   let staffDetails = {
  //     fpoCode: this.appServ.fpoId,
  //     sourceName: sourceName,
  //     name: name,
  //     designation: designation,
  //     contactNo: contactNo,
  //     emailId: emailId,
  //     sex: sex
  //   }
  //   this.adminServ.staffDetailsUpdate(staffDetails).subscribe(
  //     data => {
  //       if (data.status == 1) {
  //         this.toastr.success('Update Success', "Success")
  //       } else {
  //         this.toastr.error('Update unsuccessful', "Error")
  //       }
  //       this.dataForUpdate()

  //     },
  //     error => {
  //       this.toastr.error('Server Error', "Error")
  //     }
  //   )
  // }

  // meetingDetailsUpdate(slNo: any, meetingDate: any, meetingType: any, noOfMaleAttendees: any, noOfFemaleAttendees: any, agenda: any, totalMinutes: any) {
  //   let data1 = {
  //     fpoId: this.appServ.fpoId,
  //     meetingDate: meetingDate,
  //     slNo: slNo,
  //     meetingType: meetingType,
  //     noOfMaleAttendees: noOfMaleAttendees,
  //     noOfFemaleAttendees: noOfFemaleAttendees,
  //     agenda: agenda,
  //     totalMinutes: totalMinutes
  //   }
  //   this.adminServ.meetingDetailsUpdate(data1).subscribe(
  //     data => {
  //       if (data.status == 1) {
  //         this.toastr.success('Update Success', "Success")
  //       } else {
  //         this.toastr.error('Update unsuccessful', "Error")
  //       }
  //       this.dataForUpdate()
  //     },
  //     error => {
  //       this.toastr.error('Server Error', "Error")
  //     }
  //   )
  // }

}
