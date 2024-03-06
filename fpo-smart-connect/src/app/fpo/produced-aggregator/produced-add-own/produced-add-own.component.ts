import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { FigServiceService } from 'src/app/fig/fig-service.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-produced-add-own',
  templateUrl: './produced-add-own.component.html',
  styleUrls: ['./produced-add-own.component.css']
})
export class ProducedAddOwnComponent implements OnInit {
  

  constructor(private figServ: FigServiceService,
    private fpoServ: AdminService,
    private appserv: AppService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fpoServ.getCropCata().subscribe((data) => {
      this.cropCatData = data;
    });

    this.fpoServ.getFarmers(this.appserv.fpoId).subscribe((data) => {
      this.farmers = data;
      ////console.log(data);
      
    });
  }
  
  fpos: any;
  cropCatData: any;
  crops: any;
  varieties: any;
  uploadPictureShow = false;
  farmers: any;
  years = new Date().getFullYear();

  producedSaleForm = new FormGroup({
    fpo: new FormControl(),
    farmer: new FormControl(),
    type: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    season: new FormControl('', Validators.required),
    cropCatagory: new FormControl('', Validators.required),
    crop: new FormControl('', Validators.required),
    variety: new FormControl('', Validators.required),
    class: new FormControl(''),
    memtype: new FormControl(''),

    quantity: new FormControl('', Validators.required),
    sowingDate: new FormControl('',Validators.required),
    harvestingDate: new FormControl('', Validators.required),
    picOfProduct: new FormControl(''),
    figRefNo: new FormControl(''),
  });

  getCropAccToCatagory() {
    this.figServ
      .getCropAccToCatagory(this.producedSaleForm.value.cropCatagory)
      .subscribe((data) => {
        this.crops = data;
        if(data.length==0)
        {
          this.producedSaleForm.patchValue({
            variety: {Variety_Code: 'Not Applicable', Variety_Name: 'Not Applicable'}
          });
        
          
        }
      });
  }

  getAllVarieties() {
    this.figServ
      .getAllVarieties(this.producedSaleForm.value.crop.Crop_Code)
      .subscribe((data) => {
        this.varieties = data;
        //console.log(data,"variety");
        if(data.length==0)
        {
          this.producedSaleForm.patchValue({
            variety: {Variety_Code: 'Not Applicable', Variety_Name: 'Not Applicable'}
          });
        
          
        }
      
      });
  }

  onSubmit() {
    if (confirm('Are you sure to submit ?')) {
      this.producedSaleForm.patchValue({
        fpo: this.appserv.fpoId,
      });
      ////console.log(this.producedSaleForm.value.farmer);
      
if(this.producedSaleForm.value.farmer=="Self"){
  ////console.log("inside If");
  
  this.producedSaleForm.value.farmer =  {farmerName:"Self",  farmerId:this.appserv.fpoId , fpoSelfProduced:true};}
      this.fpoServ
        .onSubmitFpoSelfProducedForm(this.producedSaleForm.value)
        .subscribe((data) => {
          if (data.status == 1) {
            this.toastr.success(
              'Produced registered'
            );

            this.producedSaleForm.reset({
              fpo: '',
              farmer: '',
              type: '',
              year: '',
              season: '',
              cropCatagory: '',
              crop: '',
              variety: '',
              class: '',
              quantity: '',
              sowingDate:'',
              harvestingDate: '',
              picOfProduct: '',
              figRefNo: '',
            });
            let x
            this.varieties = x
            this.crops = x
          }
        });
    }
  }

}
