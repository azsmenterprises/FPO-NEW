import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { FigServiceService } from 'src/app/fig/fig-service.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['./stock-transfer.component.css']
})
export class StockTransferComponent implements OnInit {
  allGodowns: any;
  allCropCat: any;
  allcrops: any;
  allVarieties: any;
  availableQuant: any;
  allFpoGodowns: any;
  allDistricts: any;
  destGodowns: any;
  private modalRef: any;

  @ViewChild('confirmRegister') confirmRegister: any;

  constructor(private modalService: ModalManager,private appserv:AppService,private fpoServ:AdminService,private figServ:FigServiceService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.fpoServ.getAllFpoGodowns(this.appserv.fpoId).subscribe(
      data=>{
        this.allFpoGodowns=data
      }
    )

    this.fpoServ.getDistListForFpo().subscribe(
      data=>{
        this.allDistricts=data
      }
    )
    
  }

  stockTransferForm=new FormGroup({
    godownId:new FormControl(null,Validators.required),
    cropCatagory:new FormControl(null,Validators.required),
    crop:new FormControl(null,Validators.required),
    variety:new FormControl(null,Validators.required),
    quantity:new FormControl(null,Validators.required),
    destinationDistrictCode:new FormControl(null,Validators.required),
    destinationGodownId:new FormControl(null,Validators.required),
  })

  // loadAllCropCat(){
  //   this.figServ.getCropCata().subscribe(
  //     data=>{
  //       this.allCropCat=data
  //     }
  //   )
  // }

  loadAllCropCat(){
    this.figServ.getAvailableCropType(this.stockTransferForm.value.godownId).subscribe(
      data=>{
        this.allCropCat=data
      }
    )
  }
  loadAvailableCropType(){
    this.fpoServ.getAvailableCropType(this.stockTransferForm.value.godownId).subscribe(
      data=>{
        this.allCropCat=data
      }
    )
  }
  // loadAllAvailableCrop(){
  //   this.figServ.getAllAvailableCropAccToCatagory(this.stockTransferForm.value.godownId,this.stockTransferForm.value.cropCatagory).subscribe(
  //     data=>{
  //       this.allcrops=data
  //     },
  //     error=>{
  //       this.toastr.error(error.message)
  //     }
  //   )
  // }

  loadAllAvailableVariety(){
    this.figServ.getAllAvailableCropVarieties(this.stockTransferForm.value.crop).subscribe(
      data=>{
        this.allVarieties=data
        
      }
    )
  }






  loadAllCrop(){
    this.figServ.getCropAccToCatagory(this.stockTransferForm.value.cropCatagory).subscribe(
      data=>{
        this.allcrops=data
      },
      error=>{
        this.toastr.error(error.message)
      }
    )
  }

  loadAllVariety(){
    this.figServ.getAllVarieties(this.stockTransferForm.value.crop).subscribe(
      data=>{
        this.allVarieties=data
        
      }
    )
  }
  loadAvailableQuant(){
    this.fpoServ.loadAvailableQuant(this.stockTransferForm.value).subscribe(
      data=>{
        this.availableQuant=data.availableQuant
        if(data.availableQuant==0){
          this.toastr.warning('Stock is not available')
        }
      }
    )
  }

  loadDestGodown(){
    this.fpoServ.loadDestGodown(this.stockTransferForm.value.destinationDistrictCode).subscribe(
      data=>{
        this.destGodowns=data
      }
    )
  }

  openRegisterConfirmationModal(){
    this.modalRef = this.modalService.open(this.confirmRegister, {
      size: "md",
      modalClass: 'mymodal',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    })
  }

  closeModal() {
    this.modalService.close(this.modalRef);
    //or this.modalRef.close();
  }

  stockTransferSubmit(){
    this.fpoServ.stockTransferSubmit(this.stockTransferForm.value,this.appserv.fpoId).subscribe(
      data=>{
        if(data.status>0){
          this.toastr.success('Transfered Successfully')
          this.stockTransferForm.reset()
          this.availableQuant=''
          this.closeModal()
        }else{
          this.toastr.warning('Transfer Unsuccessfull')
        }
      },error=>{
        this.toastr.error('Unexpected error')
      }
    )
  }

}
