import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  fpoId: any
  farmerDataForEdit=[] as any
  layout1Show = false
  farmerId: any
  deleteData: any
  editModalCropDataIndex: any
  cropData: any
  varietyData: any
  crop: any
  variety: any
  cropVarietySelected = [] as any
  selectedVariety: any;
  
  constructor(private fb: FormBuilder, private service: AdminService, private appServ: AppService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.searchFarmer()
    this.getCropData()
  }

  updateForm = new FormGroup({
    fpoId: new FormControl(''),
    NICFARMERID: new FormControl(''),
    farmerName: new FormControl(''),
    fatherOrHusbandName: new FormControl(''),
    Relation: new FormControl(''),
    IdType: new FormControl(''),
    IdNum: new FormControl(''),
    VCHMOBILENO1: new FormControl(''),
    EmailId: new FormControl(''),
    dist: new FormControl(''),
    block: new FormControl(''),
    gramPanchyat: new FormControl(''),
    village: new FormControl(''),
    bankName: new FormControl(''),
    bankAccNo: new FormControl(''),
    VCHIFSCCODE: new FormControl(''),
    altMobNo: new FormControl(''),
    cropData: this.fb.array([]),
    areaOnHold: new FormControl(''),
  })

  searchFarmer() {
    this.service.searchFarmer(this.appServ.fpoId, this.farmerId).subscribe(
      data => {
         ////console.log(data,"farmerDataForEditZZZZZZZzzz");
        this.layout1Show = true
        this.farmerDataForEdit = data

      },error =>{
        ////console.log(error);
        this.farmerDataForEdit.length=0
        
      }
    )
  }

  patchDataToModal(index: any) {
    this.editModalCropDataIndex = index
    //console.log(this.editModalCropDataIndex,"patch");
    jQuery.extend(this.farmerDataForEdit[index].fullFarmerData, this.farmerDataForEdit[index].additionalData);
    this.updateForm.patchValue(this.farmerDataForEdit[index].fullFarmerData)
    ////console.log(555,this.farmerDataForEdit[index].fullFarmerData);

  }

  removeCropFromArray(crop: any, variety: any) {
    // const filteredPeople = this.farmerDataForEdit[this.editModalCropDataIndex].cropData.filter((item:any) =>item.variety!=variety);    
    // this.farmerDataForEdit[this.editModalCropDataIndex].cropData=filteredPeople
    const filteredPeople = this.cropVarietySelected.filter((item: any) => item.variety != variety);
    this.cropVarietySelected = filteredPeople
    // reset
    const arr = <FormArray>this.updateForm.controls.cropData;
    arr.controls = [];

    // push to from group array
    // pushing the existing data to array
    const control = <FormArray>this.updateForm.get('cropData');
    
    for (let i = 0; i < this.farmerDataForEdit[this.editModalCropDataIndex].cropData.length; i++) {
      control.push(this.fb.control(this.farmerDataForEdit[this.editModalCropDataIndex].cropData[i]))
    }
    
    
  }

  getCropData() {
    this.service.getCropData().subscribe(
      data => {
        // ////console.log(data);
        this.cropData = data
        ////console.log(this.cropData);
        

      }

    )
  }

  loadVariety() {
    // ////console.log(22,this.crop);
    this.service.loadVariety(this.crop.Crop_Code).subscribe(
      data => {
        // ////console.log(data);
        this.varietyData = data

      }
    )

  }

  cropVarietyArrayPush() {
    // reset
    const arr = <FormArray>this.updateForm.controls.cropData;
    arr.controls = [];

    let data = {
      crop: this.crop.Crop_Name,
      variety: this.variety
    }
    //console.log(data)
    this.cropVarietySelected.push(data)
    this.farmerDataForEdit[this.editModalCropDataIndex].cropData.push(data)

    // pushing the existing data to array
    const control = <FormArray>this.updateForm.get('cropData');
    
    for (let i = 0; i < this.farmerDataForEdit[this.editModalCropDataIndex].cropData.length-1; i++) {
      control.push(this.fb.control(this.farmerDataForEdit[this.editModalCropDataIndex].cropData[i]))
    }
    // push the value from data object to array
    control.push(this.fb.control(data))


  }

  updateFarmer() {
    //  //console.log(this.updateForm.value,"HELLLLOO");
      this.service.updateFarmer(this.updateForm.value).subscribe(
        data => {
          //console.log(data,"YOOO");
          if (data.status == 1) {
            this.toastr.success('Updated Successfully')
            this.searchFarmer()
            this.crop=undefined
            this.variety=undefined
          } else {
            this.toastr.warning('Updated unsuccessful')

          }

        }
      )

  }

  dataForDelete(farmerData: any) {
    this.deleteData = {
      fpoId: farmerData.fpoId,
      farmerId: farmerData.farmerId
    }
  }

  deleteFarmer() {
    ////console.log(this.deleteData,"delete data");
    
    this.service.deleteFarmer(this.deleteData).subscribe(
      data => {
        if (data.status == 1) {
          this.toastr.success('Deleted successfully')
          this.searchFarmer()
        }
      }
    )
  }

}
