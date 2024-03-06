import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { FigServiceService } from 'src/app/fig/fig-service.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-godown-stock-sale',
  templateUrl: './godown-stock-sale.component.html',
  styleUrls: ['./godown-stock-sale.component.css']
})
export class GodownStockSaleComponent implements OnInit {
  allGodowns: any;
  allCropCat: any;
  allcrops: any;
  allVarieties: any;
  availableQuant: any;
  allFpoGodowns: any;
  allDistricts: any;
  private modalRef: any;
  panelOpenState = false;

  @ViewChild('confirmRegister') confirmRegister: any;
  allBlocks: any;
  allGPs: any;
  allVillages: any;
  allTrader: any;
  traderInfo: any;

  constructor(private modalService: ModalManager, private appserv: AppService, private fpoServ: AdminService, private figServ: FigServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fpoServ.getAllFpoGodowns(this.appserv.fpoId).subscribe(
      data => {
        this.allFpoGodowns = data
      }
    )

    this.fpoServ.getDistListForFpo().subscribe(
      data => {
        this.allDistricts = data
        // //console.log(this.allDistricts,"allDistricts");
        
      }
    )
    this.stockSaleForm.patchValue({ fpoId: this.appserv.fpoId })
    this.assignTrader()
    this.loadTrader()

  }

  stockSaleForm = new FormGroup({
    godownId: new FormControl(null, Validators.required),
    cropCatagory: new FormControl(null, Validators.required),
    crop: new FormControl(null, Validators.required),
    variety: new FormControl(null, Validators.required),
    quantity: new FormControl(null, Validators.required),
    destinationDistrictCode: new FormControl(null, Validators.required),
    // destinationBlockCode:new FormControl(null,Validators.required),
    // destinationGPCode:new FormControl(null,Validators.required),
    // destinationVillageCode:new FormControl(null,Validators.required),
    saleTo: new FormControl(null, Validators.required),
    mobileNo: new FormControl(null, [Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'), Validators.maxLength(10), Validators.minLength(10)]),
    emailId: new FormControl(null, [Validators.required, Validators.email]),
    panNo: new FormControl(null, Validators.required),
    traderId: new FormControl(null),
    fpoId: new FormControl(null)
  })

  loadAllCropCat() {
    this.figServ.getCropCata().subscribe(
      data => {
        this.allCropCat = data
      }
    )
  }

  loadAllCrop() {
    this.figServ.getCropAccToCatagory(this.stockSaleForm.value.cropCatagory).subscribe(
      data => {
        this.allcrops = data
      },
      error => {
        this.toastr.error(error.message)
      }
    )
  }

  loadAllVariety() {
    this.figServ.getAllVarieties(this.stockSaleForm.value.crop).subscribe(
      data => {
        this.allVarieties = data

      }
    )
  }
  loadAvailableQuant() {
    this.fpoServ.loadAvailableQuant(this.stockSaleForm.value).subscribe(
      data => {
        this.availableQuant = data.availableQuant
        if (data.availableQuant == 0) {
          this.toastr.warning('Stock is not available')
        }
      }
    )
  }

  loadDestBlock() {
    this.fpoServ.getblockListForFpo(this.stockSaleForm.value.destinationDistrictCode).subscribe(
      data => {
        this.allBlocks = data
      }
    )
  }
  loadDestGP() {
    this.fpoServ.getGPListForFpo(this.stockSaleForm.value.destinationBlockCode).subscribe(
      data => {
        this.allGPs = data
      }
    )
  }

  loadDestVillage() {
    this.fpoServ.getVillageListForFpo(this.stockSaleForm.value.destinationGPCode).subscribe(
      data => {
        this.allVillages = data
      }
    )
  }
  loadTrader() {
    this.fpoServ.loadTrader().subscribe(
      data => {
        this.allTrader = data
      }
    )
  }
  openRegisterConfirmationModal() {
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



  assignTrader() {
    this.fpoServ.traderData(this.stockSaleForm.value.saleTo).subscribe(
      data => {
        this.traderInfo = data[0]
        // //console.log(data, "trader detail detail");
        // //console.log(this.traderInfo,"this.traderInfo.length");
        

      }
    )
  }

  
  godownSaleDataSubmit() {
    if(this.traderInfo == undefined ){
      this.stockSaleForm.patchValue({     
        destinationDistrictCode: this.stockSaleForm.value.destinationDistrictCode ,
        mobileNo:this.stockSaleForm.value.saleTo,
        emailId:this.stockSaleForm.value.emailId,
        panNo:this.stockSaleForm.value.panNo,
       
      })
    }else{
      this.stockSaleForm.patchValue({     
        destinationDistrictCode: this.traderInfo.districtCode  ,
        mobileNo: this.traderInfo.cgMobNo,
        emailId: this.traderInfo.emailId,
        panNo: this.traderInfo.panNo,
        traderId: this.traderInfo.refNo
      })
    }
   
    
    this.fpoServ.godownSaleDataSubmit(this.stockSaleForm.value).subscribe(
      data => {
        if (data.status > 0) {
    // //console.log(this.stockSaleForm.value,"this.stockSaleForm.value");

          this.stockSaleForm.reset()
          this.availableQuant = ''
          this.toastr.success('Sold successfully')
          this.closeModal()
        } else {
          this.toastr.warning('Sale unsuccessful')
          this.closeModal()
        }
      }, error => {
        //console.log(error, "err");

      }
    )
  }

}
