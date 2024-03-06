import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../root-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backlogentry',
  templateUrl: './backlogentry.component.html',
  styleUrls: ['./backlogentry.component.css']
})
export class BacklogentryComponent implements OnInit {
  getIaData: any;
  addData: any;
  getCbboData: any;
  getFpoData: any;

  constructor(private service: RootAdminService, private toastr: ToastrService, private router: Router, private el: ElementRef,) { }

  ngOnInit(): void {
    this.getIa();
    this.getCbbo();
    this.getFpo();
  }

  backlogForm = new FormGroup({
    year: new FormControl('', [Validators.required]),
    iaName: new FormControl('', [Validators.required]),
    target: new FormControl('', [Validators.required]),
    achievement: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    block: new FormControl('', [Validators.required]),
    totalCbbo: new FormControl('', [Validators.required]),
    NoOfFarmerMobilizedAsShareholders: new FormControl('', [Validators.required]),
    NoOfBod: new FormControl('', [Validators.required]),
    Min1WomenBod: new FormControl('', [Validators.required]),
    commencementOfBusinessfieldWithMca: new FormControl('', [Validators.required]),
    AuditorAppointed: new FormControl('', [Validators.required]),
    AgmConducted: new FormControl('', [Validators.required]),
    BaselineStudyReportSubmitted: new FormControl('', [Validators.required]),
    BankAccountOpened: new FormControl('', [Validators.required]),
    ShareCapitalMobilizedInInr: new FormControl('', [Validators.required]),
    AnnualBusinessTurnoverinInr: new FormControl('', [Validators.required]),
    appointedca: new FormControl('', [Validators.required]),
    CeoAppointed: new FormControl('', [Validators.required]),
    AccountedAppointed: new FormControl('', [Validators.required]),

  })

  getIa() {
    this.service.getIa().subscribe(result => {
      this.getIaData = result;
    })
  }

  getCbbo() {
    this.service.getCbbo().subscribe(result => {
      this.getCbboData = result;
      console.log(result, 'result');

    })
  }

  getFpo() {
    this.service.getFpo().subscribe(result => {
      this.getFpoData = result;
    })
  }

  publish() {
    if (this.backlogForm.valid) {
      const data = {
        oldData: true,
        year: this.backlogForm.value.year,
        iaName: this.backlogForm.value.iaName.iaName,
        refNo: this.backlogForm.value.iaName.refNo,
        target: this.backlogForm.value.target,
        achievement: this.backlogForm.value.achievement,
        district: this.backlogForm.value.district,
        block: this.backlogForm.value.block,
        totalCbbo: this.backlogForm.value.totalCbbo,
        commencementOfBusinessfieldWithMca: this.backlogForm.value.commencementOfBusinessfieldWithMca,
        NoOfBod: this.backlogForm.value.NoOfBod,
        Min1WomenBod: this.backlogForm.value.Min1WomenBod,
        NoOfFarmerMobilizedAsShareholders: this.backlogForm.value.NoOfFarmerMobilizedAsShareholders,
        AuditorAppointed: this.backlogForm.value.AuditorAppointed,
        AgmConducted: this.backlogForm.value.AgmConducted,
        BaselineStudyReportSubmitted: this.backlogForm.value.BaselineStudyReportSubmitted,
        BankAccountOpened: this.backlogForm.value.BankAccountOpened,
        ShareCapitalMobilizedInInr: this.backlogForm.value.ShareCapitalMobilizedInInr,
        AnnualBusinessTurnoverinInr: this.backlogForm.value.AnnualBusinessTurnoverinInr,
        CeoAppointed: this.backlogForm.value.CeoAppointed,
        appointedca: this.backlogForm.value.appointedca,
        AccountedAppointed: this.backlogForm.value.AccountedAppointed,
      }
      this.service.publishData(data).subscribe((result) => {
        this.addData = result
        this.toastr.success('Data added successfully')
        this.backlogForm.reset();
      })
    } else {
      this.toastr.warning("Fill all required fields")
      for (const key of Object.keys(this.backlogForm.controls)) {
        if (this.backlogForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          invalidControl.blur();
          invalidControl.focus();
          break;
        }
      }
    }
  }
}
