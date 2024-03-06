import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { FigServiceService } from 'src/app/fig/fig-service.service'
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-demand-add-own',
  templateUrl: './demand-add-own.component.html',
  styleUrls: ['./demand-add-own.component.css']
})
export class DemandAddOwnComponent implements OnInit {

  constructor(
    private fpoServ: AdminService,
    private figServ: FigServiceService,
    private appserv: AppService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    

    this.figServ.getCropCata().subscribe((data) => {
      this.cropCatData = data;
    });
   
    this.fpoServ.getFarmers(this.appserv.fpoId).subscribe((data) => {
      this.farmers = data;});

}

  cropCatData: any;
  crops: any;
  varieties: any;
  uploadPictureShow = false;
  farmers: any;
  technicalName:any
  fertBrand:any
  years = new Date().getFullYear();
  figIndentSaleForm = new FormGroup({
    expDate: new FormControl('', Validators.required),
    farmer: new FormControl('', Validators.required),
    itemType: new FormControl('', Validators.required),
    season: new FormControl(),
    cropCatagory: new FormControl(),
    crop: new FormControl(),
    variety: new FormControl(),
    class: new FormControl(),
    memtype:new FormControl('', Validators.required),
    technicalName: new FormControl(),
    brandName: new FormControl(),
    machineType: new FormControl(),
    quantity: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    fpoId: new FormControl(),
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
        fpoId: this.appserv.fpoId,
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