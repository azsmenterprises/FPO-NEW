import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';
import { ModalManager } from 'ngb-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-link-with-e-licensing',
  templateUrl: './link-with-e-licensing.component.html',
  styleUrls: ['./link-with-e-licensing.component.css']
})
export class LinkWithELicensingComponent implements OnInit {

  @ViewChild('registerModal') registerModal: any;
  @ViewChild('confirmRegister') confirmRegister: any;
  @ViewChild('confirmLogin') confirmLogin: any;
  private modalRef: any;
  fpoData: any
  districtList: any
  allBlocks: any
  gramPanchayats: any;
  villages: any;
  selectedDist: any;
  selectedBlock:any;
  showRegButton=false;

  constructor(private modalService: ModalManager, private appServ: AppService, private fpoService: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.statusForElicenseRegisterButton()
    
  }

  updateFormForElicensing = new FormGroup({
    district: new FormControl('', Validators.required),
    block: new FormControl('', Validators.required),
    gramPanchayat:new FormControl('',Validators.required),
    village: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    aadhar: new FormControl('',[ Validators.required,Validators.minLength(12),Validators.maxLength(12)]),
    fpoMailId: new FormControl('', [Validators.required,Validators.email]),
    fpoContactNo: new FormControl('',[ Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    address: new FormControl('', Validators.required),
    pincode: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(6)])
  })

  statusForElicenseRegisterButton(){
    this.fpoService.statusForElicenseRegisterButton(this.appServ.fpoId).subscribe(
      data=>{
        if(data.status==true){
          this.showRegButton=false
        }else{
          this.showRegButton=true
          this.getDistListForFpo()
        }
      }
    )
  }

  getDistListForFpo(){
    this.fpoService.getDistListForFpo().subscribe(
      data => {
        this.districtList = data
        //console.log(this.districtList,"this.districtList");
        
      }
    )
  }
  

  registerToElicensing() {
    this.closeModal()
    this.fpoService.registerToElicensing(this.appServ.fpoId).subscribe(
      data => {
        if (data.status == 'updateRequired') {
          this.fpoData = data.dataForPatch
          
          this.selectedDist=this.fpoData.district_id
        
          
          this.updateFormForElicensing.value.district=this.fpoData.district_id
         
          this.selectedBlock=this.fpoData.block_id 
          this.loadBlock()
          //console.log(this.fpoData.block_id ,"this.fpoData.block_id ");
          
          this.updateFormForElicensing.patchValue(this.fpoData)
          this.openModal()
        }else{
          this.statusForElicenseRegisterButton()
          this.toastr.success(data.status)
        }

      },
      error => {

      }
    )
  }

  loginToElicensing() {
    this.fpoService.loginToElicensing(this.appServ.fpoId).subscribe(
      data=>{
        if(data?.token){
          // this.fpoService.redirectToElicensing(data.token)
          // window.location.href='https://odishaagrilicense.nic.in'
          window.open('https://odishaagrilicense.nic.in/user/loginFpo?token='+data.token)
          this.closeModal()
        }
      },
      error=>{
        this.toastr.error('Unexpected error')
        this.closeModal()
      }
    )
  }

  openModal() {
    this.modalRef = this.modalService.open(this.registerModal, {
      size: "lg",
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
  openLoginConfirmationModal(){
    this.modalRef = this.modalService.open(this.confirmLogin, {
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

  loadBlock() {
    
    let distData = this.updateFormForElicensing.value.district
   
    //console.log(distData,"loadBlock");
    
    // this.updateFormForElicensing.patchValue({
    //   district: distData.districtName,
    //   district_id: distData.districtCode
    // })
    this.fpoService.getblockListForFpo(distData).subscribe(
      data=>{
        this.allBlocks=data
        //console.log(this.allBlocks,"this.allBlocks");
        
      }
    )
  }
  
  loadGP(){
    this.fpoService.getGPListForFpo(this.updateFormForElicensing.value.block.blockCode).subscribe(
      data=>{
        this.gramPanchayats=data
      }
    )
  }
  
  loadVillage(){
    this.fpoService.getVillageListForFpo(this.updateFormForElicensing.value.gramPanchayat.gpCode).subscribe(
      data=>{
        this.villages=data
      }
    )
  }

  submitFormForElicensing(){
    this.fpoService.submitFormForElicensing(this.updateFormForElicensing.value,this.appServ.fpoId).subscribe(
      data=>{
        this.toastr.success(data.status)
        if(data.statusValue>0){
          this.fpoService.registerToElicensing(this.appServ.fpoId).subscribe(
            response=>{
              this.toastr.success(response.status)
              this.statusForElicenseRegisterButton()
            }
          )
        }
        
        this.closeModal()

      }
    )
  }

}
