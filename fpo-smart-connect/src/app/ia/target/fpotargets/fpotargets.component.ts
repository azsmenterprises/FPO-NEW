import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IaService } from 'src/app/ia/ia.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-fpotargets',
  templateUrl: './fpotargets.component.html',
  styleUrls: ['./fpotargets.component.css']
})
export class FpotargetsComponent implements OnInit {
  iaName: any;
  achievementData: any;
  iaTargetData: any;
  selfTargetData: any;

  constructor(private service: IaService, private toastr: ToastrService, private router: Router, private appServ: AppService) { }

  ngOnInit(): void {
    this.fetciaName();
    this.selfTarget();
  }
  targetForm = new FormGroup({
    year: new FormControl('', [Validators.required]),
    targets: new FormControl('', [Validators.required]),
    achievements: new FormControl('', [Validators.required])
  })
  fetciaName() {
    let data = {
      type: 'ia',
    }
    this.appServ.sideBarUserName(data).subscribe(
      data => {
        this.iaName = data.name
        // this.getAchievement();
      }
    )
  }
  getAchievement() {
    console.log(this.targetForm.value.year, 'year');

    this.service.getAchievement(this.iaName, this.targetForm.value.year).subscribe(result => {
      if (result) {
        this.achievementData = result;
        this.targetForm.patchValue({
          achievements: this.achievementData.fpo,
          targets: this.achievementData.targets,
        })
      }
    })
  }

  iaTarget() {
    console.log(this.targetForm.value, "this.targetForm.value");
    if (this.targetForm.valid) {
      const data = {
        year: this.targetForm.value.year,
        iaName: this.iaName,
        targets: this.targetForm.value.targets,
        achievements: this.targetForm.value.achievements,
      }
      this.service.iaTarget(data).subscribe(result => {
        if (result) {
          this.iaTargetData = result;
          this.selfTarget();
          this.toastr.success('Data added successfully')
          this.targetForm.reset();
        }
      })
    } else {
      this.toastr.warning("Please fill the all required fields")
    }
  }

  selfTarget() {
    this.service.selfTarget().subscribe(result => {
      this.selfTargetData = result;
      // console.log(result,'resulttttttttttttttttttt');
    })
  }

  deleteRowTarget(data: any) {
    this.service.deleteRowTarget(data).subscribe(result => {
      if (result.status == true) {
        this.toastr.success(result.message);
        this.selfTarget();
      }else{
        this.toastr.warning(result.message);
      }
    });
  }
}
