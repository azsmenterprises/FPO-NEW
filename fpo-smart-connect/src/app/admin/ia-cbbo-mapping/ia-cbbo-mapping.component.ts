import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../root-admin.service';

@Component({
  selector: 'app-ia-cbbo-mapping',
  templateUrl: './ia-cbbo-mapping.component.html',
  styleUrls: ['./ia-cbbo-mapping.component.css']
})
export class IaCbboMappingComponent implements OnInit {
  getIaData: any;
  getCbboData: any;
  submitData: any;
  IaCbbodata: any;
  getmappedData: any;
  selectedCbboName: any;
  cbboCode: any;
  cbboName: any;
  constructor(private service: RootAdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.getIaData = [];
    // this.getCbboData = [];
    this.getIa();
    // this.getCbbo();
    this.getIaCbbo();
  }
  mappingForm = new FormGroup({
    iaName: new FormControl('', [Validators.required]),
    selectedCbboName: new FormControl('', [Validators.required]),
  })
  getIa() {
    // this.getIaData = [];
    // this.getCbboData = [];
    this.service.getIa().subscribe(result => {
      this.getIaData = result;
    })
  }

  getCbbo() {
    this.getCbboData = [];
    this.service.getCbbo().subscribe(result => {
      this.getCbboData = result;
      console.log(result, 'cbbo');

    })
  }

  submit() {
    // this.selectedCbboName ='';

    if (this.mappingForm.valid) {
      let dropdownVals = this.mappingForm.value['selectedCbboName'].split(':');
      this.cbboCode = dropdownVals[0];
      this.cbboName = dropdownVals[1];
      const data = {
        iaName: this.mappingForm.value['iaName'],
        cbboName: this.cbboName,
        cbboCode: this.cbboCode,
      }
      console.log(data, "data");

      this.service.submit(data).subscribe(result => {
        this.submitData = result;
        if (result) {
          // alert("Details Submitted")
          // console.log(result);
          this.toastr.success('Data submitted successfully')
          this.mappingForm.reset();
          this.getIaCbbo();
          // this.changeIA();
        }

      })
    }

  }

  getIaCbbo() {
    this.service.getIaCbbo().subscribe(result => {
      this.IaCbbodata = result;
    })
  }

  changeIA() {
    // this.getmappedData =[];
    // this.selectedCbboName = '';
    // console.log(this.mappingForm.value.iaName.iaName,"ianame");

    this.service.getCbboMaster(this.mappingForm.value['iaName']).subscribe(result => {
      this.getmappedData = result;
      console.log(result, "result");
      this.mappingForm.controls['selectedCbboName'].reset();
      // this.selectedCbboName = '';
      this.mappingForm.patchValue({
        selectedCbboName: "",
      })
    })
  }

  deleteRow(map: any) {
    if (confirm('Are you sure to delete ?')) {
      this.service.deleteRow(map).subscribe(result => {
        if (result) {
          this.toastr.success('Deleted successfully')
          this.getIaCbbo();
        }
      });
    }
  }
}
