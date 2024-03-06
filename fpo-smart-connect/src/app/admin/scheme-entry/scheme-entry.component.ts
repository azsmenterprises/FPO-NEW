import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../root-admin.service';

@Component({
  selector: 'app-scheme-entry',
  templateUrl: './scheme-entry.component.html',
  styleUrls: ['./scheme-entry.component.css']
})
export class SchemeEntryComponent implements OnInit {
  schemeMasterForm!: FormGroup;
  data: any;
  result: any;
  pdfFileUrl: any;
  pdfFileGood: any;
  pdfFileError: any;
  showpdfFileError: any;
  schemeimageUrl: any;
  showschemeimageError: any;
  schemeimageFileGood: any;
  schemeimageError: any;


  constructor(private toastr:ToastrService,private fb: FormBuilder, private add: RootAdminService, private service: RootAdminService) { }

  ngOnInit(): void {
    this.data = [];
    this.schemeMasterForm = this.fb.group({
      concernedDepartment: ['', Validators.required],
      departmentdetail: ['', Validators.required],
      schemeimage: ['', Validators.required],
      beneficialtype: ['', Validators.required],
      eligibilitycritiria: ['', Validators.required],
      schemename: ['', Validators.required],
      matchingequity: ['', Validators.required],
      supportoffered: ['', Validators.required],
      weblink: ['', Validators.required],
      briefnote: ['', Validators.required],
      pdfFile: ['', Validators.required]

    })
  }

  pdfFile(event: any) {
    this.pdfFileUrl = event.target.files[0];
    if (this.pdfFileUrl != undefined) {
      var theSize = this.pdfFileUrl.size;
      var checkType = this.pdfFileUrl.type;

      if (checkType == "application/PDF" || checkType == "application/pdf") { // validation of file extension using regular expression before file upload
        this.pdfFileGood = "";
        this.pdfFileError = true;
        if (theSize > 5000000)  // validation according to file size(in bytes)
        {
          alert('file size too large');

          this.schemeMasterForm.patchValue({
            dicMsmeRegdCertificate: ''
          })
          this.showpdfFileError = true;
          this.pdfFileGood = "File size too large";

        }

      }
      else {
        this.pdfFileGood = "Wrong file Type Selected";
        this.schemeMasterForm.patchValue({
          pdfFile: ''
        })
        this.showpdfFileError = true;
      }

    }
    else {
      window.alert('Upload Mandatory Files');
    }
  }
  schemeimage(event: any) {
    this.schemeimageUrl = event.target.files[0];
    if (this.schemeimageUrl != undefined) {
      var theSize = this.schemeimageUrl.size;
      var checkType = this.schemeimageUrl.type;

      if (checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg") { // validation of file extension using regular expression before file upload
        this.schemeimageFileGood = "";
        this.schemeimageError = true;
        if (theSize > 5000000)  // validation according to file size(in bytes)
        {
          alert('file size too large');

          this.schemeMasterForm.patchValue({
            schemeimage: ''
          })
          this.showschemeimageError = true;
          this.schemeimageFileGood = "File size too large";

        }

      }
      else {
        this.schemeimageFileGood = "Wrong file Type Selected";
        this.schemeMasterForm.patchValue({
          schemeimage: ''
        })
        this.showschemeimageError = true;
      }

    }
    else {
      window.alert('Upload Mandatory Files');
    }
  }

  onsubmit() {
    
    this.service.onsubmit(this.pdfFileUrl,this.schemeimageUrl,this.schemeMasterForm.value).subscribe(response => {
      if(response.status>0){
        this.schemeMasterForm.reset()
        this.toastr.success('Submitted successfully')
      }else{
        this.toastr.warning('Unexpected error')
      }
    }, (error) => {
      this.toastr.error('Server error')
    })

  }

}
