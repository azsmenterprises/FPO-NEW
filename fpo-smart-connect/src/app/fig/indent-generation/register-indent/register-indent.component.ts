import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { FigServiceService } from '../../fig-service.service';

@Component({
  selector: 'app-register-indent',
  templateUrl: './register-indent.component.html',
  styleUrls: ['./register-indent.component.css'],
})
export class RegisterIndentComponent implements OnInit {
  constructor(
    private figServ: FigServiceService,
    private appserv: AppService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.figServ.getFPOs(this.appserv.figRefNo).subscribe((data) => {
      this.fpos = data;
    });

    this.figServ.getCropCata().subscribe((data) => {
      this.cropCatData = data;
    });
    this.figServ.getFarmers(this.appserv.figRefNo).subscribe((data) => {
      this.farmers = data;
    });
  }

  fpos: any;
  cropCatData: any;
  crops: any;
  varieties: any;
  uploadPictureShow = false;
  farmers: any;
  technicalName:any
  fertBrand:any
  years = new Date().getFullYear();

  figIndentSaleForm = new FormGroup({
    fpo: new FormControl('', Validators.required),
    farmer: new FormControl('', Validators.required),
    itemType: new FormControl('', Validators.required),
    season: new FormControl(),
    cropCatagory: new FormControl(),
    crop: new FormControl(),
    variety: new FormControl(),
    class: new FormControl(),
    technicalName: new FormControl(),
    brandName: new FormControl(),
    machineType: new FormControl(),
    quantity: new FormControl('', Validators.required),
    figRefNo: new FormControl(),
  });

  getCropAccToCatagory() {
    this.figServ
      .getCropAccToCatagory(this.figIndentSaleForm.value.cropCatagory)
      .subscribe((data) => {
        this.crops = data;
      });
  }

  getAllVarieties() {
    this.figServ
      .getAllVarieties(this.figIndentSaleForm.value.crop.Crop_Code)
      .subscribe((data) => {
        this.varieties = data;
      });
  }

  getItemTypeData(){
    this.figServ.getItemTypeData(this.figIndentSaleForm.value.itemType).subscribe(
      data=>{
        this.technicalName=data
      }
    )
  }

  getFertBrand(){
    this.figServ.getFertBrand(this.figIndentSaleForm.value.technicalName).subscribe(
      data=>{
        this.fertBrand=data
      }
    )
  }

  onSubmit() {
    if (confirm('Are you sure to submit ?')) {
      this.figIndentSaleForm.patchValue({
        figRefNo: this.appserv.figRefNo,
      });
      this.figServ
        .onSubmitIndentForm(this.figIndentSaleForm.value)
        .subscribe((data) => {
          if (data.status == 1) {
            this.toastr.success('Indent sent to corresponding FPO');
            this.figIndentSaleForm.reset();
          }
        });
    }
  }
}
