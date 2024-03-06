import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IaService } from 'src/app/ia/ia.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-fpo-cbbo-targets',
  templateUrl: './fpo-cbbo-targets.component.html',
  styleUrls: ['./fpo-cbbo-targets.component.css']
})
export class FpoCbboTargetsComponent implements OnInit {
  iaName: any;
  getcbboListData: any;
  fpoListData: any;
  cbboTargetData: any;
  showcbboTargetData: any;
  cbboCode: any;
  cbboName: any;
  // year: any;

  constructor(private service: IaService, private toastr: ToastrService, private router: Router, private appServ: AppService) { }

  ngOnInit(): void {
    this.fetciaName();
  }
  targetCbboForm = new FormGroup({
    year: new FormControl('', [Validators.required]),
    cbboName: new FormControl('', [Validators.required]),
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
        // this. getcbboList();
        this.showcbboTarget();
      }
    )
  }

  getcbboList() {
    this.service.getcbboList(this.iaName).subscribe(result => {
      this.getcbboListData = result;
      console.log(this.getcbboListData, "this.getcbboListData");

    })
  }

  fpoList() {
    // console.log(this.targetCbboForm.value['cbboName'],"this.targetCbboForm.value['cbboName']");

    let dropdownVals = this.targetCbboForm.value['cbboName'].split(':');
    this.cbboCode = dropdownVals[0];
    this.cbboName = dropdownVals[1];
    this.service.fpoList(this.iaName, this.cbboName, this.targetCbboForm.value.year).subscribe(result => {
      if (result.length > 0) {
        this.fpoListData = result;
        this.targetCbboForm.patchValue({
          achievements: this.fpoListData[0].fpoName
        })
      } else {
        this.targetCbboForm.patchValue({
          achievements: 0
        })
      }
    })
  }

  cbboTarget() {
    if (this.targetCbboForm.valid) {
      const data = {
        year: this.targetCbboForm.value.year,
        iaName: this.iaName,
        cbboName: this.cbboName,
        cbboCode: this.cbboCode,
        targets: this.targetCbboForm.value.targets,
        achievements: this.targetCbboForm.value.achievements,
      }
      this.service.cbboTarget(data).subscribe(result => {
        if (result) {
          this.cbboTargetData = result;
          this.toastr.success('Data added successfully')
          this.targetCbboForm.reset();
          this.showcbboTarget();
        }
      })
    } else {
      this.toastr.warning("Please fill all the required fields")
    }

  }

  showcbboTarget() {
    this.service.showcbboTarget(this.iaName).subscribe(result => {
      this.showcbboTargetData = result;
    })
  }
  deleteCbboTarget(data: any) {
    this.service.deleteCbboTarget(data).subscribe(result => {
      console.log(result, "result");

      if (result.status == true) {
        this.toastr.success(result.message);
        this.showcbboTarget();
      } else {
        this.toastr.warning(result.message);
      }
    });
  }
  // editCbboTarget(data: any) {
  //   console.log(data, 'achievements');
  //   let temp = { cbboName: data.cbboName, cbboCode: data.cbboCode }
  //   this.targetCbboForm.patchValue({
  //     year: data.year,
  //     // cbboName: `${data.cbboCode}:${data.cbboName}`,
  //     cbboName: temp,
  //     targets: data.targets,
  //     achievements: data.achievements
  //   })
  //   this.targetCbboForm.controls['cbboName'].setValue(temp);
  //   console.log(this.targetCbboForm.value.cbboName, "cbboName");
  // }

}
