import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-fpo-details',
  templateUrl: './fpo-details.component.html',
  styleUrls: ['./fpo-details.component.css']
})
export class FpoDetailsComponent implements OnInit {
  image: any;
  distlist: any;
  blocklist: any;
  GPlist: any;
  villagelist: any;
  fpoAddressShow: any = {};
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};
  item_text: any;
  showImage: boolean=false;

 

  constructor(private appServ: AppService, private adminServ: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dataForUpdate();
    // this.dropdownList = [{item_id:1,item_text:"chhatiyA"}];

    // this.selectedItems = [{item_id:2,item_text:"baliyaaaaa"}];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'villageCode',
      textField: 'villageName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }
 
  onNoVillageInput(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 8);
  }


  onItemSelect(item: any) {
    // //console.log(item);
    this.selectedItems.push(item)
    //console.log(this.selectedItems,"selectedItems");

  }
  onSelectAll(items: any) {
    // //console.log(items);
  }
  onItemDeSelect(item: any) {
    this.selectedItems.splice(this.selectedItems.indexOf(item.id), 0);
    //console.log(this.selectedItems,"selectedItems");

    // this.resetTable();
  }

  showSeparateOfcRadio = true
  showSeparateStragRadio = true
  showRegistrationDetails = false
  ngoDetailsShow = false
  schemeDetailsShow = false
  fpoData: any
  fetchedImage: any



  fpoDetails = new FormGroup({
    state: new FormControl(''),
    district: new FormControl(''),
    districtCode: new FormControl(''),
    subDivision: new FormControl(''),
    block: new FormControl(''),
    block_id: new FormControl(''),
    gramPanchayat: new FormControl(''),
    village: new FormControl(''),
    masterVillageCode: new FormControl(''),
    noOfVillageCovered: new FormControl(''),
    coveredVillagesName: new FormControl(''),
    address: new FormControl(''),
    separateOfcOfFPO: new FormControl(''),
    fpoOfficeType: new FormControl('',[Validators.required]),
    storageFacility: new FormControl(''),
    storageFacilityType: new FormControl(''),
    fpoStorageType: new FormControl(''),
    imageOfOffice: new FormControl(''),
    fpoName: new FormControl(''),
    yearOfFormation: new FormControl('', [Validators.minLength(4), Validators.maxLength(4), Validators.min(1980), Validators.max(new Date().getFullYear())]),
    visionOfFPO: new FormControl('', [Validators.required]),
    fpoRegistrationStatus: new FormControl(''),
    // imgOfRegCerti: new FormControl(''),
    formOfRegistration: new FormControl(''),
    regNoOfFPO: new FormControl('', Validators.compose([Validators.required, Validators.minLength(21), Validators.maxLength(21), Validators.pattern("[A-Z]{10}[0-9]{10}[A-Z]{1}")])),
    dateOfReg: new FormControl(''),
    fpoContactNo: new FormControl(''),
    fpoMailId: new FormControl(''),
    selectedVillage: new FormControl(''),
    // uploadRegistrationCertificate: new FormControl(''),
    noOfVillage: new FormControl(''),
    // noOfFarmerMember: new FormControl(''),
    // noOfMaleFarmerMember: new FormControl(''),
    // noOfFemaleFarmerMember: new FormControl(''),
    // noOfScStFarmerMember: new FormControl(''),
    // noOfSmallOrMarginalFarmer: new FormControl(''),
    // shareCapitalRaisedAmount: new FormControl(''),
    // paidUpCapitalAmount: new FormControl(''),
    // shareCertificateIssueStatus: new FormControl(''),
    // fpoBusinessActivity: new FormControl('')
    organisationHelpedToCreateSPO: new FormControl(''),
    creationScheme: new FormControl(''),
    promotedByNGO: new FormControl('',  [Validators.required]),
    ngoName: new FormControl('',  [Validators.required]),
    keyPersonContactNo: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[6-9]{1}[0-9]{9}")])),
    noOfBoardDirectors: new FormControl(''),
    Capacity: new FormControl(''),
    baselineSurvey: new FormControl('')
  })
  storageDetails = new FormGroup({
    storageType: new FormControl(''),
    commodityType: new FormControl(''),
    ownership: new FormControl(''),
    storageCapacity: new FormControl(''),
    storageUtility: new FormControl(''),


  })

  //======================== For not allowing future dates ===============
  dateCompare() {
    var dateOfReg = new Date(this.fpoDetails.value['dateOfReg']);
    var currentDate = new Date();

    if (dateOfReg.getFullYear() == currentDate.getFullYear()) {
      if (dateOfReg.getMonth() == currentDate.getMonth()) {
        if (dateOfReg.getDate() == currentDate.getDate()) {
          return;
        } else if (dateOfReg.getDate() > currentDate.getDate()) {
          this.fpoDetails.get('dateOfReg')?.reset();
          this.toastr.warning("Future date should not allowed");
          return;
        } else if (dateOfReg.getDate() < currentDate.getDate()) {
          return;
        }
      } else if (dateOfReg.getMonth() > currentDate.getMonth()) {
        this.fpoDetails.get('dateOfReg')?.reset();
        this.toastr.warning("Future date should not allowed");
        return;
      } else if (dateOfReg.getMonth() < currentDate.getMonth()) {
        return;
      }
    } else if (dateOfReg.getFullYear() < currentDate.getFullYear()) {
      return;
    }
    else if (dateOfReg.getFullYear() > currentDate.getFullYear()) {
      this.fpoDetails.get('dateOfReg')?.reset();
      this.toastr.warning("Future date should not allowed");
      return;
    }

  }
  //==================

  dataForUpdate() {
    //console.log(this.selectedItems,"this.selectedItems");

    this.adminServ.updateFpo(this.appServ.fpoId).subscribe(
      data => {
        this.fpoData = data
        //console.log(this.fpoData,"this.fpoData");
        if ( this.fpoData.FPOData?.villageCoveredByFPO?.length >0) {
          this.selectedItems = this.fpoData?.FPOData?.villageCoveredByFPO
        }
        if(this.fpoData.FPOData?.imageOfOffice == ""){
          this.showImage = false;
        }else{
          this.showImage  = true;
        }

        this.fpoDetailsPatchValue()
        this.separateOfficeSelect()
        this.separateStorageSelect()
        this.registrationDetails()
        this.boardDirectorsPatchValue()
        this.getDistListOfFPO()
        this.promotedByNGOSelect()
        this.storageDetailsPatchValue()
        this.getAllVillageListFpo()
        this.nameOfScheme()





        // for (let key in student) {
        //   // increase the count
        //   ////////console.log(1,key);
        //   ////////console.log(2,student.hasOwnProperty(key));
        //   ////////console.log(3,Object.keys(student).length);

        //   ;
        // }
      }
    )
  }


  separateOfficeSelect() {
    // ////////console.log(this.fpoDetails.value.separateOfcOfFPO);
    if (this.fpoDetails.value.separateOfcOfFPO == 'Yes') {
      this.showSeparateOfcRadio = false
    } else {
      this.showSeparateOfcRadio = true
    }

  }

  separateStorageSelect() {
    if (this.fpoDetails.value.storageFacility == 'Yes') {
      this.showSeparateStragRadio = false
    } else {
      this.showSeparateStragRadio = true
    }
  }

  storageDetailUpdate(index: any, storageType: any, ownership: any, rentType: any, commodityType: any, storageCapacity: any, storageUtility: any) {

    let storageDetails = {
      fpoId: this.appServ.fpoId,
      index: index,
      storageType: storageType,
      ownership: ownership,
      rentType: rentType,
      commodityType: commodityType,
      storageCapacity: storageCapacity,
      storageUtility: storageUtility
    }
    this.adminServ.storageDetailUpdate(storageDetails).subscribe(
      data => {
        ////////console.log(data);

        if (data.status == 1) {
          this.toastr.success('Update Success', "Success")
        } else {
          this.toastr.error('Update unsuccessful2', "Error")
        }
        this.dataForUpdate()

      },
      error => {
        ////////console.log(error);

        this.toastr.error('Server Error', "Error")
      }
    )
  }


  AddFields3() {
    this.fpoData.storageDetails.push({ delete: true })
  }
  deleteField3(i: any) {
    this.fpoData.storageDetails.splice(i, 1)
  }

  deleteRow1(i: any) {
    // this.fpoData.secondaryBusinessDetails.splice(i, 1)
    //console.log("in ts deleterow1");

    this.adminServ.deleteRow1(i, this.fpoData.fpoId).subscribe(data => {
      if (data.status == true) {
        this.toastr.success('Deleted', "Success")
        this.dataForUpdate()
      } else {
        this.toastr.error(' unsuccessful', "Error")
      }
      this.dataForUpdate()

    },
      error => {
        this.toastr.error('Server Error', "Error")

      })
  }

  registrationDetails() {
    if (this.fpoDetails.value.fpoRegistrationStatus == 'Yes') {
      this.showRegistrationDetails = true
    } else {
      this.showRegistrationDetails = false
    }
  }

  promotedByNGOSelect() {
    if (this.fpoDetails.value.promotedByNGO == 'Yes' || this.fpoDetails.value.promotedByNGO == 'yes') {
      this.ngoDetailsShow = true
    } else {
      this.ngoDetailsShow = false
    }
  }

  nameOfScheme() {
    if (this.fpoDetails.value.organisationHelpedToCreateSPO == 'Central Sector Scheme - Formation and Promotion of 10,000 FPOs ') {
      this.schemeDetailsShow = true
    } else {
      this.schemeDetailsShow = false
    }
  }

  boardDirectorsPatchValue() {
    this.fpoDetails.patchValue({
      organisationHelpedToCreateSPO: this.fpoData.organisationHelpedToCreateSPO,
      creationScheme: this.fpoData.creationScheme,
      promotedByNGO: this.fpoData.promotedByNGO,
      ngoName: this.fpoData.ngoName,
      keyPersonContactNo: this.fpoData.keyPersonContactNo,
      noOfBoardDirectors: this.fpoData.noOfBoardDirectors,
      baselineSurvey: this.fpoData.baselineSurvey
    })

  }


  // ===========================Patch Values to the form fields starts==============================



  fpoDetailsPatchValue() {
    this.fpoDetails.patchValue(this.fpoData.FPOData)  //Patch fpoDetails of  inCorporation Details
    this.fetchedImage = "data:image/jpeg;base64," + this.fpoDetails.value.imageOfOffice

    this.fpoAddressShow.district = this.fpoDetails.value.district
    this.fpoAddressShow.block = this.fpoDetails.value.block
    this.fpoAddressShow.gramPanchayat = this.fpoDetails.value.gramPanchayat
    this.fpoAddressShow.village = this.fpoDetails.value.village
  }

  // ===========================Patch Values to the form fields ends==============================


  fpoDetailsSubmit() {
     console.log(this.fpoDetails.value,'sidha');

    //console.log(this.fpoDetails.value,"this.fpoDetails.value");
    this.fpoDetails.value.selectedVillage = this.selectedItems
    //console.log(this.fpoDetails.value.selectedItems,"this.fpoDetails.value.selectedItems");

    this.adminServ.fpoDetailsSubmit(this.fpoDetails.value, this.appServ.fpoId).subscribe(
      data => {

        //  console.log(data," data");

        if (data.status > 0) {
          this.toastr.success('Update Success', "Success")


        } else {
          this.toastr.warning('Update unsuccessful')
        }
        this.dataForUpdate()

      },
      error => {
        this.toastr.error('Server Error', "Error")
      }
    )

  }
  storageDetailsPatchValue() {
    this.storageDetails.patchValue({
      storageType: this.fpoData.storageType,
      commodityType: this.fpoData.commodityType,
      ownership: this.fpoData.ownership,


      storageCapacity: this.fpoData.storageCapacity,
      storageUtility: this.fpoData.storageUtility,


    })
  }
  // ===========================Below code is for image upload

  imageDetailsFetch(event: any) {
    this.readThis(event)
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    
    if (file.type.match(/^image\//)) {
      var myReader: FileReader = new FileReader();
    
      myReader.onloadend = (e) => {
        this.image = myReader.result;
        let imageString = this.image.replace(/^data:image\/(jpeg|jpg|png);base64,/, "");
    
        this.fpoDetails.patchValue({
          imageOfOffice: imageString
        })
        this.fetchedImage = "data:image/jpeg;base64," + this.fpoDetails.value.imageOfOffice;
        this.showImage = true;
      }
      myReader.readAsDataURL(file);
    } else {
      console.error("Invalid file type. Please select an image file.");
    }
  }

  // ==============================Below code is for image zoom=================================

  imgZoomed = true
  showModal = false
  show() {
    this.showModal = true; // Show-Hide Modal Check

  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }

  getDistListOfFPO() {
    this.adminServ.getDistListForFpo().subscribe((response) => {
      this.distlist = response;
      // //console.log(response," this.distlist");

    }, (error) => {
      ////////console.log('Error is', error);
    })
  }
  getBlockListOfFPO() {
    this.adminServ.getblockListForFpo(this.fpoDetails.value.district.districtCode).subscribe((response) => {
      this.blocklist = response;
    }, (error) => {
      ////////console.log('Error is', error);
    })
  }
  getGPListFpo() {
    this.adminServ.getGPListForFpo(this.fpoDetails.value.block.blockCode).subscribe((response) => {
      this.GPlist = response;
    }, (error) => {
      ////////console.log('Error is', error);



    })
  }
  getVillageListFpo() {
    this.adminServ.getVillageListForFpo(this.fpoDetails.value.gramPanchayat.gpCode).subscribe((response) => {
      this.villagelist = response;
      // //console.log(response,"this.villagelist");

    }, (error) => {
      ////////console.log('Error is', error);
    })
  }

  getAllVillageListFpo() {
    //console.log(this.fpoData.FPOData.block_id,"this.fpoData.district_id");

    this.adminServ.getAllVillageListForFpo(this.fpoData.FPOData.block_id).subscribe((response) => {
      this.dropdownList = response;
      //console.log(response,"this.villagelist");

    }, (error) => {
      ////////console.log('Error is', error);
    })
  }


}
