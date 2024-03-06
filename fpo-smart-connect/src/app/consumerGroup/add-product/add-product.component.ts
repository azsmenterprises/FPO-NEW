import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { ConsumerGroupService } from '../consumer-group.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private cgService: ConsumerGroupService, private toastr: ToastrService, private appServ: AppService) { }

  ngOnInit(): void {
    this.getCropCatagory()
  }

  errorImgSize = false
  allCropCatagory: any
  allCrops: any
  incrementValue: any
  addProductImg: any
  Metrics:any
  getCropCatagory() {
    this.cgService.getCropCatagory(this.appServ.cgRefNo).subscribe(
      data => {
        ////console.log(data,"response.cat");
        
        this.allCropCatagory = data[0].cat
        
      
      },
      error => {
        this.toastr.error('Unexpected error')
      }
    )
  }
  // @ViewChild("productForm") productForm:any;

  addProductForm = new FormGroup({
    Catagory: new FormControl('', Validators.required),
    itemName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    Unit: new FormControl('', [Validators.required, Validators.pattern('^[0-9].*$')]),
    minQuantity: new FormControl( 1, Validators.required),
    estimatedCost: new FormControl('', [Validators.required, Validators.pattern('^[0-9].*$')]),
    cgRefNo: new FormControl(''),
    Metrics:new FormControl(''),
    fakeImgPath: new FormControl('', Validators.required),
  })
 

  loadCrops() {
    this.cgService.loadCrops(this.addProductForm.value.Catagory).subscribe(
      data => {
        this.allCrops = data
      },
      error => {
        this.toastr.error('Unexpected error')
      }
    )

  }

  incrementInQuantity() {
    let value = parseFloat(this.addProductForm.value.minQuantity) + parseFloat(this.incrementValue)
    this.addProductForm.patchValue({
      minQuantity: value
    })
  }

  productImgUpload(file: any) {
    let maxSize = 1024 * 1024 //for 1MB
    if (file.target.files[0].size > maxSize) {
      this.errorImgSize = true
    } else {
      this.errorImgSize = false
    }
    if (file.target.files[0] != undefined) {
      this.addProductForm.patchValue({
        fakeImgPath: file.target.files[0].name
      })
      this.addProductImg = file.target.files[0]
    }

    this.addProductForm.controls['fakeImgPath'].updateValueAndValidity()
  }

  addProductSubmit() {
    this.addProductForm.patchValue({
      cgRefNo: this.appServ.cgRefNo
    })

    const formData = new FormData()
    formData.append('img', this.addProductImg)
    formData.append('formValue', JSON.stringify(this.addProductForm.value))

    this.cgService.addProductSubmit(formData).subscribe(
      data => {
        if (data.status > 0) {
          this.toastr.success('Submitted successfully')
          this.addProductForm.reset()
          this.addProductForm.clearValidators()
          this.addProductForm.patchValue({
            minQuantity: 1,
            Catagory: '',
            itemName: '',
          })
          this.incrementValue=undefined
          // this.productForm.resetForm()
        } else {
          this.toastr.warning('Unsuccessfull')
        }
      },
      error => {
        this.toastr.error('Unexpected error')
      }
    )
  }

}
