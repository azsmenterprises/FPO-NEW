import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CbboService } from '../cbbo.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-missingreport',
  templateUrl: './missingreport.component.html',
  styleUrls: ['./missingreport.component.css']
})
export class MissingreportComponent implements OnInit {
  alldistrictdata: any;
  getBlocksData: any;
  selectYear: boolean = false;
  getfpoListData: any;
  sendtoAdminData: any;
  cbboName: any;
  getIaData: any;
  getMappingDataOfFPO: any;
  constructor(private service: CbboService, private toastr: ToastrService, private router: Router, private appServ: AppService) { }

  ngOnInit(): void {
    this.getdistrictList();
    this.fetchCbboName();
    this.getIa();
  }
  missingForm = new FormGroup({
    iaName: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    block: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    fpoName: new FormControl('', [Validators.required]),
  })

  fetchCbboName() {
    let data = {
      type: 'Cbbo',
    }
    this.appServ.sideBarUserName(data).subscribe(data => {
      this.cbboName = data.name
      this.getMappingData();
    }
    )
  }

  getIa() {
    this.service.getIa().subscribe(result => {
      this.getIaData = result;
    })
  }

  getdistrictList() {
    this.service.getdistrictList().subscribe(result => {
      this.alldistrictdata = result;
      console.log(this.alldistrictdata, 'this.alldistrictdata');
      if (result) {
      } else {
        this.getBlocks();
      }
    })
  }

  getBlocks() {
    console.log(this.missingForm.value.district.districtCode);

    this.service.getBlocks(this.missingForm.value.district.districtCode).subscribe(result => {
      this.getBlocksData = result;
      console.log(this.getBlocksData);

    })
  }

  getFinancialYear() {
    this.selectYear = true;
    this.getfpoList();
  }

  getfpoList() {
    console.log(this.missingForm.value, 'this.missingForm.value.blockName');
    // this.missingForm.value.toLowerCase();
    this.service.getfpoList(this.missingForm.value.block.blockName).subscribe(result => {
      this.getfpoListData = result;
      console.log(this.getfpoListData, 'this.getfpoListData');

    })
  }

  sendtoAdmin() {
    const data = {
      district: this.missingForm.value.district.districtName,
      districtCode: this.missingForm.value.district.districtCode,
      block: this.missingForm.value.block.blockName,
      year: this.missingForm.value.year,
      fpoName: this.missingForm.value.fpoName.fpoName,
      fpoId: this.missingForm.value.fpoName.fpoId,
      cbboName: this.cbboName,
      iaName: this.missingForm.value.iaName.iaName
    }
    if (confirm('Kindly Confirm')) {
      this.service.sendtoAdmin(data).subscribe(result => {
        this.sendtoAdminData = result;
        this.toastr.success('Notified to Admin Successfully')
        this.missingForm.reset();
      })
    }
  }

  getMappingData() {
    this.service.getMappingData(this.cbboName).subscribe(result => {
      this.getMappingDataOfFPO = result;
    })
  }

}
