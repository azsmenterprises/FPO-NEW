import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';
import { ProducedListComponent } from '../produced-list/produced-list.component';


@Component({
  selector: 'app-dialog-for-sale',
  templateUrl: './dialog-for-sale.component.html',
  styleUrls: ['./dialog-for-sale.component.css']
})

export class DialogForSaleComponent implements OnInit {
  showTraders: boolean=false;

  constructor(private toastr: ToastrService, private appServ: AppService, private fpoServ: AdminService, public dialogRef: MatDialogRef<ProducedListComponent>, @Inject(MAT_DIALOG_DATA) public data: { quantity: number, catagory: string, cropCode: string, cropName: string, variety: string, varietyName: string }) { }

  ngOnInit(): void {
    this.getTraderListForFpo()
  }
  
  selectedValue: any
  saleFormData = new FormGroup({
    relTrader: new FormControl(''),
 
    saleTo: new FormControl('', Validators.required),
    saleQuantity: new FormControl('', [Validators.required, saleAmountValidator(this.data.quantity)]),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]),
    amountCollected: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    saleDate: new FormControl('', Validators.required),
    fpoId: new FormControl(''),
    cropCatagory: new FormControl(''),
    cropCode: new FormControl(''),
    cropName: new FormControl(''),
    variety: new FormControl(''),
    varietyName: new FormControl('')
  })

  dataSource: any
  getTraderListForFpo() {
    this.fpoServ.getTraderListForFpo(this.appServ.fpoId).subscribe(
      data => {
        this.dataSource = data
        //////console.log(this.dataSource);

        // this.pagelength = data.length
      },
      error => {
        this.toastr.error('Unexpected error')
      }
    )

  }
  saleToOpt(value: any) {
    ////console.log(value, "woohoo");
    if (value == "others") {

      this.showTraders = true  
     this.saleFormData.patchValue({
      
      saleTo: ""
    })
    this.message="Kindly Add Name"
    alert(this.message);
      
    } else {
      this.showTraders = false
      
    }
  }
 message: any


  dialogueClose() {
    this.dialogRef.close();
  }

  onClear() {
    this.saleFormData.reset()
  }

  // getErrorMessage() {
  //   if (this.saleFormData.controls['mobileNo'].hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return this.saleFormData.controls['mobileNo'].hasError('maxLength') ? 'Not a valid number' : '';
  // }

  error = false
  saleQuantityEnteredCheck() {
    // if (this.saleFormData.value.saleQuantity > this.data.quantity) {
    //   this.saleFormData.controls['saleQuantity'].reset()
    //   this.error = true
    // } else {
    //   this.error = false
    // }
  }

  onSubmit() {
    this.saleFormData.patchValue({
      fpoId: this.appServ.fpoId,
      cropCatagory: this.data.catagory,
      cropCode: this.data.cropCode,
      cropName: this.data.cropName,
      variety: this.data.variety,
      varietyName: this.data.varietyName
    })
    //////console.log(this.saleFormData.value)
    this.fpoServ.fpoSalesubmit(this.saleFormData.value).subscribe(
      data => {
        if (data.status == 'success') {
          this.dialogueClose()
          this.onClear()
          this.toastr.success('Sold successfully', 'Success')

        } else {
          this.toastr.error('Sale failed')
        }
      },
      error => {
        this.toastr.error('Unexpected error')
      }
    )

  }

}



function saleAmountValidator(availableQuantity: number) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.parent?.get('saleQuantity')?.value > availableQuantity) {
      return { saleAmountValidator: true }
    } else {
      return null
    }
  }
}
