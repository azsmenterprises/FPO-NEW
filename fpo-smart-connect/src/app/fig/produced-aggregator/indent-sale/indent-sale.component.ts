import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { FigServiceService } from '../../fig-service.service';

@Component({
  selector: 'app-indent-sale',
  templateUrl: './indent-sale.component.html',
  styleUrls: ['./indent-sale.component.css'],
})
export class IndentSaleComponent implements OnInit {
  constructor(
    private figServ: FigServiceService,
    private appserv: AppService,
    private toastr: ToastrService
  ) { }

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
  years = new Date().getFullYear();

  figIndentSaleForm = new FormGroup({
    fpo: new FormControl('', Validators.required),
    farmer: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    season: new FormControl('', Validators.required),
    cropCatagory: new FormControl('', Validators.required),
    crop: new FormControl('', Validators.required),
    variety: new FormControl('', Validators.required),
    class: new FormControl(''),
    quantity: new FormControl('', Validators.required),
    harvestingDate: new FormControl('', Validators.required),
    picOfProduct: new FormControl(''),
    figRefNo: new FormControl(''),
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

  compareDate() {
    let selectedDate = new Date(this.figIndentSaleForm.value.harvestingDate);
    if (selectedDate < new Date()) {
      this.uploadPictureShow = true;
    } else {
      this.uploadPictureShow = false;
    }
  }

  onSubmit() {
    if (confirm('Are you sure to submit ?')) {
      this.figIndentSaleForm.patchValue({
        figRefNo: this.appserv.figRefNo,
      });
      // ////console.log(this.figIndentSaleForm.value);

      this.figServ
        .onSubmitProducedForm(this.figIndentSaleForm.value)
        .subscribe((data) => {
          if (data.status == 1) {
            this.toastr.success(
              'Please goto Forward to FPO menu to forward to FPO','Produced registered'
            );
            let x
            this.varieties = x
            this.crops = x
            this.figIndentSaleForm.reset({
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
              harvestingDate: '',
              picOfProduct: '',
              figRefNo: '',
            });
          }
        });
    }
  }
}
