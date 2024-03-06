import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';
import { FigServiceService } from 'src/app/fig/fig-service.service';
@Component({
  selector: 'app-business-activity',
  templateUrl: './business-activity.component.html',
  styleUrls: ['./business-activity.component.css']
})
export class BusinessActivityComponent implements OnInit {
  cropCatData: any;
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};
  item_text: any;
  existBusinessPlan = false;
  kycUpdate = false;
  TieupAssociation = false;
  TieupsVal: any = "Add"

  kycUpload = false;
  auditUpload = false;
  annualAudit = false;
  fillingItr = false;
  itrUpload = false;
  fillingRoC = false;
  eNamTrading = false;
  eNamRegisterr = false;

  mousDone = false;
  rentTypeHide = false;
  pdf: any;
  selectedFile: any;
  jsonObj: any = {};
  obj: any = {};
  showSeparateStragRadio = false
  cropsBtnVal: any = "Add";
  cropDetailsId: any;
  cropListArray: any = [];
  secondaryBusinessActiv: any;
  processingInfrastructure: any;
  StorageFacility: any;
  secbusinessBtnVal: any = "Add";
  secBusinessIndex: any;
  storageBtnVal: any = "Add";
  storageIndex: any;
  licVal: any = "Add";
  otrVal: any = "Add";
  BusinessVal: any = "Add"
  BusinessPlanVal: any = "Add"
  RoCVal: any = "Add"
  eNamVal: any = "Add"
  kycVal: any = "Add"
  AuditVal: any = "Add"
  ItrVal: any = "Add"
  InfraVal: any = "Add"
  QualityVal: any = "Add"
  CollectionVal: any = "Add"
  CfcVal: any = "Add"

  licenseListArray: any = [];
  otherlicenseListArray: any = [];
  primaryBusinessListArray: any = [];
  infraStructureListArray: any = [];
  facilityCenterListArray : any =[];
  aggrigationListArray: any = [];

  qualityControlListArray: any = [];
  index: any;
  businessFileFetchData: any;
  businessFilePath: any;
  // businessPlanData:any;
  businessReortBtn: boolean = false;
  budinessPlanForm: any;
  finYearWiseData: any;
  otherRoCIndex: any;
  businessPlanData: any;
  KYCbusinessPlanData: any;
  AnnualAuditDetails: any;
  ITRbusinessPlanData: any;
  ROCbusinessPlanData: any;
  ENAMtradingData: any;
  TieupMouPlanData: any;
  purchaseKey: boolean = false;
  eNamRegister = false;
  pdfFetchData2 : any;
  fetchedImage2:any;


  constructor(private fb: FormBuilder, private appServ: AppService, private adminServ: AdminService, private toastr: ToastrService, private figServ: FigServiceService) { }

  ngOnInit(): void {

    this.secondaryBusinessActiv = '';
    this.StorageFacility = '';
    this.processingInfrastructure = '';
    this.dataForUpdate()
    // this.getAllCropType();
    this.getCropListDetails();

    this.adminServ.getCropCata().subscribe((data) => {
      this.cropCatData = data;
    });

    this.dropdownList = [
      { item_id: 1, item_text: 'Seed' },
      { item_id: 2, item_text: 'Fertiliser' },
      { item_id: 3, item_text: 'GST' },
      { item_id: 4, item_text: 'Udyog/Adhar' },
      { item_id: 5, item_text: 'Export' },
      { item_id: 6, item_text: 'FSSAI' },
      { item_id: 7, item_text: 'HARP' },
      { item_id: 8, item_text: 'Other' }

    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
  }

  cropsForm = new FormGroup({
    year: new FormControl('', [Validators.required]),
    season: new FormControl('', [Validators.required]),
    cropType: new FormControl('', [Validators.required]),
    cropCatagory: new FormControl('', [Validators.required]),
    cropName: new FormControl('', [Validators.required]),
    variety: new FormControl('', [Validators.required]),
    productionArea: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    Sowing: new FormControl('', [Validators.required]),
    Harvesting: new FormControl('', [Validators.required]),
    transctionAmount: new FormControl('', [Validators.required]),
    saleStatus: new FormControl('', [Validators.required]),
  })

  licenseData = new FormGroup({
    LicenseNum: new FormControl('', [Validators.required]),
    gstFilling: new FormControl('', [Validators.required]),
    dateOfIssue: new FormControl('', [Validators.required]),
    dateOfRenewal: new FormControl('', [Validators.required])
  })

  otherData = new FormGroup({
    licenseType: new FormControl('', [Validators.required]),
    LicenseNum: new FormControl('', [Validators.required]),
    dateOfIssue: new FormControl('', [Validators.required]),
    dateOfRenewal: new FormControl('', [Validators.required]),
  })

  businessData = new FormGroup({
    Year: new FormControl('', [Validators.required]),
    priBusinessActivity: new FormControl('', [Validators.required]),
    pruchasSellEngage: new FormControl('', [Validators.required]),
    nonPruchasSellEngage: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  })



  dataForUpdate() {
    this.adminServ.updateFpo(this.appServ.fpoId).subscribe(result => {
      this.fpoData = result
      console.log(this.fpoData, "fpodata.");
      //console.log(this.fpoData.StorageFacility,"fpodata.StorageFacility");
      if (result) {
        if (this.fpoData?.License) {
          this.licenseListArray = this.fpoData?.License;
        }
        if (this.fpoData?.otherLicense) {
          this.otherlicenseListArray = this.fpoData?.otherLicense;
        }
        if (this.fpoData?.primaryBusinessDetails) {
          this.primaryBusinessListArray = this.fpoData?.primaryBusinessDetails;
        }
        if (this.fpoData?.InfrastructureDetail) {
          this.infraStructureListArray = this.fpoData?.InfrastructureDetail;
        }
        if (this.fpoData?.businessActivities1920?.businessPlanFor2021 == "Yes") {
          this.existBusinessPlan = true;
        }
        if (this.fpoData?.businessActivities1920?.businessFileUploaded == true) {
          this.businessFilePath = this.fpoData?.businessActivities1920?.businessFilePath;
          this.businessReortBtn = false;
        }
        if (this.fpoData?.businessPlanDetails) {

          this.businessPlanData = this.fpoData?.businessPlanDetails;
        }
        if (this.fpoData?.kycDetails) {
          this.KYCbusinessPlanData = this.fpoData?.kycDetails;
        }
        if (this.fpoData?.auditDetails) {
          this.AnnualAuditDetails = this.fpoData?.auditDetails;
        }
        if (this.fpoData?.itrDetails) {
          this.ITRbusinessPlanData = this.fpoData?.itrDetails;
        }
        if (this.fpoData?.rocDetails) {
          this.ROCbusinessPlanData = this.fpoData?.rocDetails;
        }
        if (this.fpoData?.qualityControlDetails) {
          this.qualityControlListArray = this.fpoData?.qualityControlDetails;
        }
        if (this.fpoData?.collectionCenterDetails) { 
          this.aggrigationListArray = this.fpoData?.collectionCenterDetails;
        }
        if (this.fpoData?.facilityCenterDetails) {
          this.facilityCenterListArray = this.fpoData?.facilityCenterDetails;
        }
        if (this.fpoData?.eNamDetails) {
          this.ENAMtradingData = this.fpoData?.eNamDetails;
        }
        if (this.fpoData?.TieupDetails) {
          this.TieupMouPlanData = this.fpoData?.TieupDetails;
        }
      }
      this.formPatch()
      this.checkBoxPatch1()
      this.checkBoxPatch2()
      this.checkBoxPatch3()
      this.checkBoxPatch4()
      this.checkBoxPatch5()
      this.checkBoxPatch6()
      this.checkBoxPatch7()
      this.checkBoxPatch8()
      this.checkBoxPatch9()
      this.checkBoxPatch10()
      this.checkBoxPatch33()
      this.checkBoxPatch34()

      this.secondaryBusinessActiv = this.fpoData?.secondaryBusinessActiv;
      this.processingInfrastructure = this.fpoData?.processingInfrastructure;
      this.StorageFacility = this.fpoData?.StorageFacility;
      this.separateStorageSelect();
      // this.businessExtraDetailsPatchValue()
      // this.InfraDetailsPatchValue()
      this.processingInfra()
      this.secondaryBusinessShow()
      this.totalBusinessDonePatchValue()
      this.marktngTieUpShow()
      this.registrationDetails()
    }
    )
    // this.existBusinessPlan = true;
  }
  
  NoMemberFarmers(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 10);
  }

  NoNonMemberFarmers(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 10);
  }
  
  NoOfTransaction(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 10);
  }
  
  NoTransactionValue(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 10);
  }
  
  NoProductionArea(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 10);
  }
  
  NoProductionVolume(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 10);
  }
  
  NoSalesValue(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 10);
  }
  
  NoQuantitySold(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 10);
  }
  NoTransValue(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 10);
  }
  NoStorageWarehouse(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 10);
  }
  
  NoStorageWarehouseUtilize(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 10);
  }
  NoCapacityUtilize(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 10);
  }
  NoOfMachineAge(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '').substring(0, 10);
  }


  getCropListDetails() {
    // Fetching crop data for update
    this.adminServ.cropDataOfFpo(this.appServ.fpoId).subscribe(result => {
      this.cropListArray = result;
      console.log(this.cropListArray, " this.cropListArray ");

    })
  }
  addCropListDetails() {
    this.cropsForm.value.fpoId = this.appServ.fpoId;
    if (this.cropsForm.valid) {
      if (this.cropsBtnVal != "Update") {
        this.adminServ.cropDetailsUpdate(this.cropsForm.value).subscribe(result => {
          if (result.status == true) {
            this.getCropListDetails();
            this.cropsBtnVal = "Add";
            this.toastr.success(result.message);
            this.cropsForm.reset();
          } else {
            this.toastr.warning(result.message);
          }
        })
      } else {
        this.cropsForm.value.id = this.cropDetailsId;
        this.adminServ.cropDetailsUpdate(this.cropsForm.value).subscribe(result => {
          if (result.status == true) {
            this.getCropListDetails();
            this.cropsBtnVal = "Add";
            this.toastr.success("Updated successfully")
            this.cropsForm.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }

  editCropListDetails(x: any) {
    this.cropsBtnVal = "Update";
    // console.log(x,"x");
    this.cropDetailsId = x._id;
    this.cropsForm.patchValue({
      year: x.year,
      season: x.season,
      cropType: x.cropType,
      cropCatagory: x.cropCatagory,
      cropName: x.cropName,
      variety: x.variety,
      productionArea: x.productionArea,
      quantity: x.quantity,
      Sowing: x.Sowing,
      Harvesting: x.Harvesting,
      transctionAmount: x.transctionAmount,
      saleStatus: x.saleStatus,
      
    })
  }

  deleteCropListDetails(x: any) {
    x.fpoId = this.appServ.fpoId;
    console.log(x, "x");

    this.adminServ.deleteCropListDetails(x).subscribe(result => {
      console.log(result, "result");

      if (result.status == true) {
        this.cropsBtnVal = "Add";
        this.toastr.success(result.message);
        this.getCropListDetails();
        this.cropsForm.reset();
      } else {
        this.toastr.warning(result.message);
      }
    }
    )
  }

  getAllCropType() {
    this.adminServ.getCropData().subscribe(result => {
      this.cropTypes = result;
    }

    )
  }

  getCropAccToCatagory() {
    this.cropTypes = [];
    this.varietyData = [];
    this.cropsForm.value.cropName = "";
    let cropCatagory = this.cropsForm.value.cropCatagory;
    console.log(cropCatagory, "cropCatagory");
    this.figServ.getCropAccToCatagory(cropCatagory).subscribe((data) => {
      this.cropTypes = data;
    });
  }

  loadVariety() {
    this.varietyData = [];
    let cropName = this.cropsForm.value.cropName;
    console.log(cropName, "cropName");
    let cropData = this.cropTypes.filter((item: any) => item.Crop_Name == cropName)
    console.log(cropData, "cropData");

    this.adminServ.loadVariety(cropData[0].Crop_Code).subscribe(result => {
      this.varietyData = result

    }
    )

  }

  //============================
  secondaryBusinessForm = new FormGroup({
    businessActivity: new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required]),
    businessDetails: new FormControl('', [Validators.required]),
    quantitySold: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  })
  storageDetailsForm = new FormGroup({
    storageType: new FormControl('', [Validators.required]),
    commodityType: new FormControl('', [Validators.required]),
    ownership: new FormControl('', [Validators.required]),
    rentType: new FormControl('', [Validators.required]),
    storageCapacity: new FormControl('', [Validators.required]),
    storageUtility: new FormControl('', [Validators.required]),
  })
  InfrastructureDetailForm = new FormGroup({
    haveProcessingInfrestructure: new FormControl('', [Validators.required]),
    machineName: new FormControl('', [Validators.required]),
    ownership: new FormControl('', [Validators.required]),
    Capacity: new FormControl('', [Validators.required]),
    utility: new FormControl('', [Validators.required]),
    Age: new FormControl('', [Validators.required]),
    contactSupplier: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[6-9]{1}[0-9]{9}")])),
    packing: new FormControl('', [Validators.required]),
  })

  CommonFascilityDetailForm = new FormGroup({
    haveAccessToFacilityCenter: new FormControl('', [Validators.required]),
    facilityType: new FormControl('', [Validators.required]),
    wantToOpenFacility: new FormControl('', [Validators.required]),
    landAvailable: new FormControl('', [Validators.required]),
    landStatus: new FormControl('', [Validators.required]),
    uploadLand: new FormControl('', [Validators.required]),

  })


  qualityControlDetailForm = new FormGroup({
    assaying: new FormControl('', [Validators.required]),
    // ownership: new FormControl('', [Validators.required]),
    haveAssayingFacility: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
  })
  collectionCenterForm = new FormGroup({
    haveCollectionCenter: new FormControl('', [Validators.required]),
    collectionType: new FormControl('', [Validators.required]),
    locationOfAssaying: new FormControl('', [Validators.required]),
  })
 
  addSecBusinessDetails() {
    this.secondaryBusinessForm.value.fpoId = this.appServ.fpoId;
    if (this.secondaryBusinessForm.valid) {
      if (this.secbusinessBtnVal != "Update") {
        this.adminServ.secondaryBusinessDetailsUpdate(this.secondaryBusinessForm.value).subscribe(result => {
          if (result.status == true) {
            this.dataForUpdate();
            this.secbusinessBtnVal = "Add";
            this.toastr.success(result.message);
            this.secondaryBusinessForm.reset();
          } else {
            this.toastr.warning(result.message);
          }
        })
      } else {
        this.secondaryBusinessForm.value.index = this.secBusinessIndex;
        this.adminServ.secondaryBusinessDetailsUpdate(this.secondaryBusinessForm.value).subscribe(result => {
          if (result.status == true) {
            this.dataForUpdate();
            this.secbusinessBtnVal = "Add";
            this.toastr.success("Updated successfully")
            this.secondaryBusinessForm.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }

  editSecBusinessDetails(x: any) {
    this.secbusinessBtnVal = "Update";
    // console.log(x,"x");
    this.secBusinessIndex = x.index;
    this.secondaryBusinessForm.patchValue({
      businessActivity: x.businessActivity,
      productName: x.productName,
      businessDetails: x.businessDetails,
      quantitySold: x.quantitySold,
      amount: x.amount,
    })
  }

  deleteSecBusinessDetails(x: any) {
    x.fpoId = this.appServ.fpoId;
    this.adminServ.deleteSecBusinessDetails(x).subscribe(result => {
      if (result.status == true) {
        this.secbusinessBtnVal = "Add";
        this.toastr.success(result.message);
        this.dataForUpdate();
        this.secondaryBusinessForm.reset();
      } else {
        this.toastr.warning(result.message);
      }
    }
    )
  }

  //==========================

  addStorageDetails() {
    console.log(this.storageDetailsForm.value.ownership, "this.storageDetailsForm.value.ownership");

    this.storageDetailsForm.value.fpoId = this.appServ.fpoId;
    if (this.storageDetailsForm.controls['storageType'].valid && this.storageDetailsForm.controls['commodityType'].valid &&
      this.storageDetailsForm.controls['ownership'].valid && this.storageDetailsForm.controls['storageCapacity'].valid && this.storageDetailsForm.controls['storageUtility'].valid) {
      if (this.storageDetailsForm.value.ownership == "Rented" && this.storageDetailsForm.value.rentType == "") {
        this.toastr.warning("Please select rent type");
        return;
      }
      if (this.storageDetailsForm.value.ownership == "Own") {
        this.storageDetailsForm.value.rentType = "";
      }
      if (this.storageBtnVal != "Update") {
        this.adminServ.storageDetailUpdate(this.storageDetailsForm.value).subscribe(result => {
          if (result.status == true) {
            this.dataForUpdate();
            this.storageBtnVal = "Add";
            this.rentTypeHide = false;
            this.toastr.success(result.message);
            this.storageDetailsForm.reset();
          } else {
            this.toastr.warning(result.message);
          }
        })
      } else {
        this.storageDetailsForm.value.index = this.storageIndex;
        this.adminServ.storageDetailUpdate(this.storageDetailsForm.value).subscribe(result => {
          if (result.status == true) {
            this.dataForUpdate();
            this.storageBtnVal = "Add";
            this.rentTypeHide = false;
            this.toastr.success(result.message)
            this.storageDetailsForm.reset();
          } else {
            this.toastr.warning(result.message)
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }

  editStorageDetails(x: any) {
    this.storageBtnVal = "Update";
    console.log(x, "editStorageDetails");
    this.storageIndex = x.index;
    this.storageDetailsForm.patchValue({
      storageType: x.storageType,
      commodityType: x.commodityType,
      ownership: x.ownership,
      rentType: x.rentType,
      storageCapacity: x.storageCapacity,
      storageUtility: x.storageUtility,
    })
    if (x.ownership == "Rented") {
      this.rentTypeHide = true;
    } else {
      this.rentTypeHide = false;
    }
  }
  deleteStorageDetails(x: any) {
    x.fpoId = this.appServ.fpoId;
    this.adminServ.deleteStorageDetails(x).subscribe(result => {
      if (result.status == true) {
        this.storageBtnVal = "Add";
        this.rentTypeHide = false;
        this.toastr.success(result.message);
        this.dataForUpdate();
        this.storageDetailsForm.reset();
      } else {
        this.toastr.warning(result.message);
      }
    }
    )
  }

  ownerTypes() {
    let rentType = this.storageDetailsForm.value.ownership
    // console.log(rentType, 'rentType');
    if (rentType == "Rented") {
      this.rentTypeHide = true;
    } else {
      this.rentTypeHide = false;
    }
  }
  //========================licence data========================

  AddLicenseData() {
    this.licenseData.value.fpoCode = this.appServ.fpoId;
    if (this.licenseData.valid) {
      if (this.licVal != "Update") {
        this.adminServ.AddLicenseData(this.licenseData.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.licVal = "Add";
            this.toastr.success("Added successfully")
            this.licenseData.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.licenseData.value.index = this.index;
        this.adminServ.updateLicenseData(this.licenseData.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.licVal = "Add";
            this.toastr.success("Updated successfully")
            this.licenseData.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }

  editLicenseDetails(x: any) {
    this.licVal = "Update";
    this.index = x.index;
    this.licenseData.patchValue({
      LicenseNum: x.LicenseNum,
      dateOfIssue: x.dateOfIssue,
      gstFilling: x.gstFilling,
      dateOfRenewal: x.dateOfRenewal,
    })
  }

  deleteLicenseDetails(x: any) {
    x.fpoCode = this.appServ.fpoId;
    console.log(x, 'x');

    this.adminServ.deleteLicenseDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.licVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.licenseData.reset();
      }
    }
    )
  }

  AddOtherLicenseData() {
    this.otherData.value.fpoCode = this.appServ.fpoId;
    if (this.otherData.valid) {
      if (this.otrVal != "Update") {
        this.adminServ.AddOtherLicenseData(this.otherData.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.otrVal = "Add";
            this.toastr.success("Added successfully")
            this.otherData.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.otherData.value.index = this.index;
        this.adminServ.updateOtherLicenseData(this.otherData.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.otrVal = "Add";
            this.toastr.success("Updated successfully")
            this.otherData.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }

  editOtherLicenseDetails(x: any) {
    this.otrVal = "Update";
    this.index = x.index;
    this.otherData.patchValue({
      licenseType: x.licenseType,
      LicenseNum: x.LicenseNum,
      dateOfIssue: x.dateOfIssue,
      dateOfRenewal: x.dateOfRenewal,
    })
  }

  deleteOtherLicenseDetails(x: any) {
    x.fpoCode = this.appServ.fpoId;
    console.log(x, 'x');

    this.adminServ.deleteOtherLicenseDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.licVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.licenseData.reset();
      }
    }
    )
  }


  AddPrimaryBusinessDetails() {
    this.businessData.value.fpoCode = this.appServ.fpoId;
    if (this.businessData.valid) {
      if (this.BusinessVal != "Update") {
        this.adminServ.AddPrimaryBusinessDetails(this.businessData.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.BusinessVal = "Add";
            this.toastr.success("Added successfully")
            this.businessData.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.businessData.value.index = this.index;
        this.adminServ.updatePrimaryBusinssDetails(this.businessData.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.BusinessVal = "Add";
            this.toastr.success("Updated successfully")
            this.businessData.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }

  editPrimaryBusinessDetails(x: any) {
    this.BusinessVal = "Update";
    this.index = x.index;
    this.businessData.patchValue({
      Year: x.Year,
      priBusinessActivity: x.priBusinessActivity,
      cropCategory: x.cropCategory,
      pruchasSellEngage: x.pruchasSellEngage,
      nonPruchasSellEngage: x.nonPruchasSellEngage,
      amount: x.amount,
    })
  }

  deletePrimaryBusinessDetails(x: any) {
    x.fpoCode = this.appServ.fpoId;
    this.adminServ.deletePrimaryBusinessDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.BusinessVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.businessData.reset();
      }
    }
    )
  }


  AddRoCDetails() {
    this.RoCform.value.fpoCode = this.appServ.fpoId;
    if (this.RoCform.valid) {
      if (this.RoCVal != "Update") {
        this.adminServ.AddRoCData(this.RoCform.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.RoCVal = "Add";
            this.toastr.success("Added successfully")
            this.RoCform.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.RoCform.value.index = this.index;
        this.adminServ.updateRoCData(this.RoCform.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.RoCVal = "Add";
            this.toastr.success("Updated successfully")
            this.RoCform.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }


  editRoCDetails(x: any) {
    this.RoCVal = "Update";
    this.index = x.index;
    this.RoCform.patchValue({
      RoCYear: x.RoCYear,
      RoCFillingDone: x.RoCFillingDone,
      // uploadRoC: x.uploadRoC,

    })
  }

  deleteRoCDetails(x: any) {
    console.log(x, "x");
    x.fpoCode = this.appServ.fpoId;
    this.adminServ.deleteRoCDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.RoCVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.RoCform.reset();
      }
    }
    )
  }


  AddKycDetails() {
    this.kycform.value.fpoCode = this.appServ.fpoId;
    if (this.kycform.valid) {
      if (this.kycVal != "Update") {
        this.adminServ.AddKycData(this.kycform.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.kycVal = "Add";
            this.toastr.success("Added successfully")
            this.kycform.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.kycform.value.index = this.index;
        this.adminServ.updateKycData(this.kycform.value).subscribe(result => {
          console.log(result, "resulttttttttttt");


          if (result) {
            this.dataForUpdate();
            this.kycVal = "Add";
            this.toastr.success("Updated successfully")
            this.kycform.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }


  editKycDetails(x: any) {
    this.kycVal = "Update";
    this.index = x.index;
    this.kycform.patchValue({
      kycYear2021: x.kycYear2021,
      kycData: x.kycData,
      // kycUpload: x.kycUpload,

    })
  }


  deleteKycDetails(x: any) {
    console.log(x, "x");

    x.fpoCode = this.appServ.fpoId;
    this.adminServ.deleteKycDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.kycVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.kycform.reset();
      }
    }
    )
  }


  AddAnnualAuditDetails() {
    this.Auditform.value.fpoCode = this.appServ.fpoId;
    if (this.Auditform.valid) {
      if (this.AuditVal != "Update") {
        this.adminServ.AddAnnualAuditData(this.Auditform.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.AuditVal = "Add";
            this.toastr.success("Added successfully")
            this.Auditform.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.Auditform.value.index = this.index;
        this.adminServ.updateAnnualAuditData(this.Auditform.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.AuditVal = "Add";
            this.toastr.success("Updated successfully")
            this.Auditform.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }


  editAnnualAuditDetails(x: any) {

    this.AuditVal = "Update";
    this.index = x.index;
    this.Auditform.patchValue({
      auditYear: x.auditYear,
      annualAuditDone: x.annualAuditDone,
      // auditUpload: x.auditUpload,

    })
  }

  deleteAnnualAuditDetails(x: any) {
    x.fpoCode = this.appServ.fpoId;
    this.adminServ.deleteAnnualAuditDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.AuditVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.Auditform.reset();
      }
    }
    )
  }




  AddItrDetails() {
    this.Itrform.value.fpoCode = this.appServ.fpoId;
    if (this.Itrform.valid) {
      if (this.ItrVal != "Update") {
        this.adminServ.AddItrData(this.Itrform.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.ItrVal = "Add";
            this.toastr.success("Added successfully")
            this.Itrform.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.Itrform.value.index = this.index;
        this.adminServ.updateItrData(this.Itrform.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.ItrVal = "Add";
            this.toastr.success("Updated successfully")
            this.Itrform.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }


  editItrDetails(x: any) {
    this.ItrVal = "Update";
    this.index = x.index;
    this.Itrform.patchValue({
      itrYear: x.itrYear,
      itrFillingDone: x.itrFillingDone,
      itrUpload: x.itrUpload,

    })
  }

  deleteItrDetails(x: any) {
    console.log(x, "x");
    x.fpoCode = this.appServ.fpoId;
    this.adminServ.deleteItrDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.ItrVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.Itrform.reset();
      }
    }
    )
  }

  pdfFileFetch1(event: any) {
    if (event.target.files[0] != undefined) {
      if (event.target.files[0].type !== 'application/pdf') {
        this.toastr.warning("Please upload PDF files only")
      }
      var file: File = event.target.files[0];
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.pdf = myReader.result;
        this.pdfFetchData2 = this.pdf.replace('data:application/pdf;base64,', '')
        this.fetchedImage2 = "data:application/pdf;base64," + this.pdfFetchData2;

      }
      myReader.readAsDataURL(file);
    } else {
      this.pdfFetchData2 = "";
    }
  }

  sanctionPdf(event: any) {
    if (event.target.files[0] != undefined) {
      if (event.target.files[0].type !== 'application/pdf') {
        this.toastr.warning("Please upload PDF files only")
      }
      var file: File = event.target.files[0];
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.pdf = myReader.result;
        this.pdfFetchData2 = this.pdf.replace('data:application/pdf;base64,', '')
        this.fetchedImage2 = "data:application/pdf;base64," + this.pdfFetchData2;


      }
      myReader.readAsDataURL(file);
    } else {
      this.pdfFetchData2 = "";
    }
  }


  AddBusinessPlanDetails() {
    // console.log(this.businessForm.valid, 'this.businessFormthis.businessForm');

    this.businessForm.value.fpoCode = this.appServ.fpoId;

    if (this.businessForm.valid) {
      // console.log(this.BusinessPlanVal, "jvhgvgh");
      if (this.pdfFetchData2 != null && this.pdfFetchData2 != '' && this.pdfFetchData2 != undefined) {
        this.businessForm.value.uploadBusinessPlan = this.pdfFetchData2;
      }
      if (this.BusinessPlanVal != "Update") {
        this.adminServ.AddBusinessPlanData(this.businessForm.value).subscribe(result => {
          // console.log(result, "resultresultresultresultresultfddhgfhj");

          if (result) {
            this.dataForUpdate();
            this.BusinessPlanVal = "Add";
            this.toastr.success("Added successfully")
            this.businessForm.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.businessForm.value.index = this.index;
        console.log(this.businessForm.value, "this.businessForm.value");

        this.adminServ.updateBusinessPlanData(this.businessForm.value).subscribe(result => {
          console.log(result, "else part hitting");

          if (result) {
            this.dataForUpdate();
            this.BusinessPlanVal = "Add";
            this.toastr.success("Updated successfully")
            this.businessForm.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }


  editBusinessDetails(x: any) {
    console.log(x, "rrrrrrrrrrrrrrrr");
    // this.businessPlan();
    this.BusinessPlanVal = "Update";
    console.log(this.businessForm, "hittttttttttttttttttt");

    this.index = x.index;
    this.businessForm.patchValue({
      businessPlanYear: x.businessPlanYear,
      businessPlanFor2021: x.businessPlanFor2021,
      // uploadBusinessPlan: x.uploadBusinessPlan,

    })
  }

  deleteBusinessDetails(x: any) {
    console.log(x, "xxxxxxxxxx");

    x.fpoCode = this.appServ.fpoId;
    this.adminServ.deleteBusinessDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.BusinessPlanVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.businessForm.reset();
      }
    }
    )
  }


  AddeNamDetails() {
    this.eNamform.value.fpoCode = this.appServ.fpoId;
    console.log(this.eNamform.valid, " this.eNamform.value this.eNamform.value");

    if (this.eNamform.valid) {
      if (this.eNamVal != "Update") {
        this.adminServ.AddeNamData(this.eNamform.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.eNamVal = "Add";
            this.toastr.success("Added successfully")
            this.eNamform.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.eNamform.value.index = this.index;
        this.adminServ.updateeNamData(this.eNamform.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.eNamVal = "Add";
            this.toastr.success("Updated successfully")
            this.eNamform.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }


  editeNamDetails(x: any) {

    this.eNamVal = "Update";
    this.index = x.index;
    this.eNamform.patchValue({
      eNamYear: x.eNamYear,
      eNamTrading: x.eNamTrading,
      eNamRegister: x.eNamRegister,

    })
  }

  deleteeNamDetails(x: any) {
    console.log(x, "x");

    x.fpoCode = this.appServ.fpoId;
    this.adminServ.deleteeNamDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.eNamVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.eNamform.reset();
      }
    }
    )
  }



  AddTieupsDetails() {
    this.Tieupsform.value.fpoCode = this.appServ.fpoId;
    if (this.Tieupsform.valid) {
      if (this.TieupsVal != "Update") {
        this.adminServ.AddTieupsData(this.Tieupsform.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.TieupsVal = "Add";
            this.toastr.success("Added successfully")
            this.Tieupsform.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.Tieupsform.value.index = this.index;
        this.adminServ.updateTieupsData(this.Tieupsform.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.TieupsVal = "Add";
            this.toastr.success("Updated successfully")
            this.Tieupsform.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }


  editTieupsDetails(x: any) {

    this.TieupsVal = "Update";
    this.index = x.index;
    this.Tieupsform.patchValue({
      TieupYear: x.TieupYear,
      Tieupdone: x.Tieupdone,
      TieupAssociation: x.TieupAssociation,
      TieupCompany: x.TieupCompany,
      TieupTransaction: x.TieupTransaction
    })
  }

  deleteTieupsDetails(x: any) {
    x.fpoCode = this.appServ.fpoId;
    this.adminServ.deleteTieupsDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.TieupsVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.Tieupsform.reset();
      }
    }
    )
  }



  addInfrastructureDetails() {
    this.InfrastructureDetailForm.value.fpoId = this.appServ.fpoId;
    if (this.InfrastructureDetailForm.valid) {
      if (this.InfraVal != "Update") {
        this.adminServ.addInfrastructureDetails(this.InfrastructureDetailForm.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.InfraVal = "Add";
            this.toastr.success("Added successfully")
            this.InfrastructureDetailForm.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.InfrastructureDetailForm.value.index = this.index;
        this.adminServ.updateInfrastructureDetails(this.InfrastructureDetailForm.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.InfraVal = "Add";
            this.toastr.success("Updated successfully")
            this.InfrastructureDetailForm.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }

  editInfrastructureDetails(x: any) {
    this.processingInfra();
    this.InfraVal = "Update";
    this.index = x.index;
    this.InfrastructureDetailForm.patchValue({
      machineName: x.machineName,
      ownership: x.ownership,
      Capacity: x.Capacity,
      utility: x.utility,
      Age: parseInt(x.Age),
      contactSupplier: parseInt(x.contactSupplier),
      packing: x.packing,
    })
  }

  deleteInfrastructureDetails(x: any) {
    x.fpoId = this.appServ.fpoId;
    this.adminServ.deleteInfrastructureDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.InfraVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.InfrastructureDetailForm.reset();
      }
    }
    )
  }







  addQualityControlDetails() {
    this.qualityControlDetailForm.value.fpoId = this.appServ.fpoId;
    if (this.qualityControlDetailForm.valid) {
      if (this.QualityVal != "Update") {
        this.adminServ.addQualityControlDetails(this.qualityControlDetailForm.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.QualityVal = "Add";
            this.toastr.success("Added successfully")
            this.qualityControlDetailForm.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.qualityControlDetailForm.value.index = this.index;
        this.adminServ.updateQualityControlDetails(this.qualityControlDetailForm.value).subscribe(result => {
          console.log(result, "uuuuuuuuuuuuuuuu");

          if (result) {
            this.dataForUpdate();
            this.QualityVal = "Add";
            this.toastr.success("Updated successfully")
            this.qualityControlDetailForm.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }

  editQualityControlDetails(x: any) {
    this.QualityVal = "Update";
    this.index = x.index;
    this.qualityControlDetailForm.patchValue({
      haveAssayingFacility: x.haveAssayingFacility,
      assaying: x.assaying,
      location: x.location,
    })
  }

  deleteQualityControlDetails(x: any) {
    x.fpoId = this.appServ.fpoId;
    this.adminServ.deleteQualityControlDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.QualityVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.qualityControlDetailForm.reset();
      }
    }
    )
  }


  addCollectionCenterDetails() {
    this.collectionCenterForm.value.fpoId = this.appServ.fpoId;
    if (this.collectionCenterForm.valid) {
      if (this.CollectionVal != "Update") {
        this.adminServ.addCollectionCenterDetails(this.collectionCenterForm.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
          
            this.CollectionVal = "Add";
            this.toastr.success("Added successfully")
            this.collectionCenterForm.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.collectionCenterForm.value.index = this.index;
        this.adminServ.updateCollectionCenterDetails(this.collectionCenterForm.value).subscribe(result => {
          console.log(result,"rrrrrrrrrrrrrrrrr");
          
          if (result) {
            this.dataForUpdate();
            this.CollectionVal = "Add";
            this.toastr.success("Updated successfully")
            this.collectionCenterForm.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }

  editCollectionCenterDetails(x: any) {    
    this.CollectionVal = "Update";
    this.index = x.index;
    this.collectionCenterForm.patchValue({
      haveCollectionCenter: x.haveCollectionCenter,
      collectionType: x.collectionType,
      locationOfAssaying: x.locationOfAssaying,
    })
  }

  deleteCollectionCenterDetails(x: any) {
    x.fpoId = this.appServ.fpoId;
    this.adminServ.deleteCollectionCenterDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.CollectionVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.collectionCenterForm.reset();
      }
    }
    )
  }



  addFacilityCenterDetails() {
    this.CommonFascilityDetailForm.value.fpoId = this.appServ.fpoId;
    if (this.CommonFascilityDetailForm.value) {
      if (this.CfcVal != "Update") {
        this.adminServ.addFacilityCenterDetails(this.CommonFascilityDetailForm.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.CfcVal = "Add";
            this.toastr.success("Added successfully")
            this.CommonFascilityDetailForm.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      } else {
        this.CommonFascilityDetailForm.value.index = this.index;
        this.adminServ.updateFacilityCenterDetails(this.CommonFascilityDetailForm.value).subscribe(result => {
          if (result) {
            this.dataForUpdate();
            this.CfcVal = "Add";
            this.toastr.success("Updated successfully")
            this.CommonFascilityDetailForm.reset();
          } else {
            this.toastr.warning("Not added successfully")
          }
        })
      }
    } else {
      this.toastr.warning("Please fill up all required fields");
    }
  }

  editFacilityCenterDetails(x: any) {
    this.CfcVal = "Update";
    this.index = x.index;
    this.CommonFascilityDetailForm.patchValue({
      haveAccessToFacilityCenter: x.haveAccessToFacilityCenter,
      facilityType: x.facilityType,
      wantToOpenFacility: x.wantToOpenFacility,
      landAvailable: x.landAvailable,
      landStatus: x.landStatus,
      uploadLand: x.uploadLand
    })
  }

  deleteFacilityCenterDetails(x: any) {
    x.fpoId = this.appServ.fpoId;
    this.adminServ.deleteFacilityCenterDetails(x).subscribe(result => {
      this.fpoData = result;
      if (result) {
        this.CfcVal = "Add";
        this.toastr.success("Deleted successfully");
        this.dataForUpdate();
        this.CommonFascilityDetailForm.reset();
      }
    }
    )
  }




  //==============================
  businessExtraDetails() {
    // console.log(this.StorageFacility, "StorageFacility");
    // console.log(this.secondaryBusinessActiv, "secondaryBusinessActiv");
    // console.log(this.processingInfrastructure, "processingInfrastructure");

    if (this.secondaryBusinessActiv !== '' && this.secondaryBusinessActiv !== null) {
      if (this.StorageFacility != '' && this.StorageFacility != null) {
        if (this.processingInfrastructure != '' && this.processingInfrastructure != null) {
          let data = {
            fpoId: this.appServ.fpoId,
            secondaryBusinessActiv: this.secondaryBusinessActiv,
            StorageFacility: this.StorageFacility,
            processingInfrastructure: this.processingInfrastructure
          }
          this.adminServ.businessExtraDetails(data).subscribe(result => {
            if (result.status == true) {
              this.toastr.success(result.message)
              // this.dataForUpdate()
            } else {
              this.toastr.warning(result.message)
            }
            this.dataForUpdate()
          },
            error => {
              this.toastr.error('Server Error', "Error")
            }
          )
        } else {
          this.toastr.warning("Select processing infrastructure");
        }
      } else {
        this.toastr.warning("Select storage facility");
      }
    } else {
      this.toastr.warning("Select secondary business activity");
    }

  }
  //==========
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

  fpoData: any
  checkBoxPatch11 = false
  checkBoxPatch12 = false
  checkBoxPatch13 = false
  checkBoxPatch14 = false
  checkBoxPatch15 = false
  checkBoxPatch16 = false
  checkBoxPatch17 = false
  checkBoxPatch18 = false
  checkBoxPatch19 = false
  checkBoxPatch20 = false
  checkBoxPatch21 = false
  checkBoxPatch22 = false
  showRegistrationDetails = false

  years = new Date().getFullYear();
  //================ business activity ===========
  form = new FormGroup({
    businessActivities: this.fb.array([]),
    businessPlanFor2021: new FormControl(''),
    statutoryAudit: new FormControl(''),
    uploadBusinessPlan: new FormControl(''),
    haveYearPlan: new FormControl(''),
    fpofilledRoc: new FormControl(''),
    tradingThroughenum: new FormControl(''),
    registrationEnum: new FormControl(''),
    // license: new FormControl(''),
    // primaryActivity: new FormControl(''),
    OtherIp: new FormControl(''),
  })
  businessForm = new FormGroup({
    businessPlanYear: new FormControl('', [Validators.required]),
    businessPlanFor2021: new FormControl('', [Validators.required]),
    uploadBusinessPlan: new FormControl('', [Validators.required]),

  })
  RoCform = new FormGroup({
    RoCFillingDone: new FormControl('', [Validators.required]),
    uploadRoC: new FormControl('', [Validators.required]),
    RoCYear: new FormControl('', [Validators.required]),

  })
  eNamform = new FormGroup({
    eNamTrading: new FormControl('', [Validators.required]),
    eNamRegister: new FormControl('', [Validators.required]),
    eNamYear: new FormControl('', [Validators.required]),

  })
  kycform = new FormGroup({
    kycData: new FormControl('', [Validators.required]),
    kycUpload: new FormControl('', [Validators.required]),
    kycYear2021: new FormControl('', [Validators.required]),

  })
  Auditform = new FormGroup({
    auditUpload: new FormControl('', [Validators.required]),
    annualAuditDone: new FormControl('', [Validators.required]),
    auditYear: new FormControl('', [Validators.required]),

  })
  Itrform = new FormGroup({
    itrUpload: new FormControl('', [Validators.required]),
    itrFillingDone: new FormControl('', [Validators.required]),
    itrYear: new FormControl('', [Validators.required]),

  })
  Tieupsform = new FormGroup({
    TieupYear: new FormControl('', [Validators.required]),
    Tieupdone: new FormControl('', [Validators.required]),
    TieupAssociation: new FormControl('', [Validators.required]),
    TieupCompany: new FormControl('', [Validators.required]),
    TieupTransaction: new FormControl('', [Validators.required]),
  })



  businessActivityUpdate() {
    // console.log(this.form.value, "businessActivityUpdate");
    if (this.form.value.businessPlanFor2021 !== '' && this.form.value.businessPlanFor2021 !== null) {
      if (this.form.value.statutoryAudit !== '' && this.form.value.statutoryAudit !== null) {
        if (this.form.value.fpofilledRoc !== '' && this.form.value.fpofilledRoc !== null) {
          if (this.form.value.registrationEnum !== '' && this.form.value.registrationEnum !== null) {
            if (this.form.value.businessPlanFor2021 == "Yes" && this.form.value.haveYearPlan == '') {
              this.toastr.warning("Select No. of year for which Business Plan formulated");
              return;
            }
            if (this.form.value.registrationEnum == "Yes" && this.form.value.tradingThroughenum == '') {
              this.toastr.warning("Select FPO trading through e-NAM");
              return;
            }
            //==================
            if (this.form.value.businessPlanFor2021 == "No") {
              this.form.value.haveYearPlan = "";
            }
            if (this.form.value.registrationEnum == "No") {
              this.form.value.tradingThroughenum = "No";
            }

            //==============
            this.adminServ.businessActivityUpdate(this.form.value, this.appServ.fpoId).subscribe(result => {
              if (result.status == 1) {
                // if (this.form.value.haveYearPlan != "") {
                this.uploadBusinessFile(this.form.value.haveYearPlan);
                // }
                this.toastr.success('Updated Successfully')
              } else {
                this.toastr.warning('Update unsuccessful')
              }
              this.dataForUpdate();
            },
              error => {
                this.toastr.error('Server Error', "Error")
              }
            )


          } else {
            this.toastr.warning("Select FPO registered on e-NAM/other e-platform");
          }
        } else {
          this.toastr.warning("Select latest RoC filling");
        }
      } else {
        this.toastr.warning("Select statutory audit for FPO");
      }
    } else {
      this.toastr.warning("Select business plan");
    }



  }
  businessPlanFileFetch(event: any) {

    if (event.target.files[0] != undefined) {
      if (event.target.files[0].type !== 'application/pdf') {
        this.toastr.warning("Please upload PDF files only")
      }
      var file: File = event.target.files[0];
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.pdf = myReader.result;
        this.businessFileFetchData = this.pdf.replace('data:application/pdf;base64,', '')
        // this.fetchedImage = "data:application/pdf;base64," + this.pdfFetchData;
        // console.log(this.fetchedImage, "this.fetchedImage");
        // console.log(this.finyeardata.value.fpoAudit,"this.finyeardata.value.fpoAudit");
      }
      myReader.readAsDataURL(file);
    } else {
      this.businessFileFetchData = "";
    }
  }
  uploadBusinessFile(year: any) {
    if (this.businessFileFetchData != null && this.businessFileFetchData != '' && this.businessFileFetchData != undefined) {
      let data = {
        fpoId: this.appServ.fpoId,
        businessFileFetchData: this.businessFileFetchData,
        year: year
      }
      this.adminServ.uploadBusinessFile(data).subscribe(result => {
        if (result.status == true) {
          this.dataForUpdate();
          // this.toastr.success('Updated Successfully')
        } else {
          // this.toastr.warning('Update unsuccessful')
        }
        this.dataForUpdate();
      },
        error => {
          this.toastr.error('Server Error', "Error")
        }
      )
    }
  }
  //=======================
  showSeparateIp = true
  showTypeProcessing = true

  formPatch() {
    if (this.fpoData?.businessActivities1920) {
      this.form.patchValue(this.fpoData.businessActivities1920)
      const businessActivities: FormArray = this.form.get('businessActivities') as FormArray;
      for (let i = 0; i < this.fpoData.businessActivities1920.businessActivities.length; i++) {
        businessActivities.push(new FormControl(this.fpoData.businessActivities1920.businessActivities[i]));
      }
    }
  }
  separateStorageSelect() {
    console.log(this.StorageFacility, "(this.StorageFacility");
    if (this.StorageFacility === "Yes") {
      this.showSeparateStragRadio = true
    }
    if (this.StorageFacility === "No") {
      this.showSeparateStragRadio = false
    }

  }
  registrationDetails() {
    if (this.form.value.registrationEnum == 'Yes') {
      this.showRegistrationDetails = true
    } else {
      this.showRegistrationDetails = false
    }
  }
  // ========================================Below code is to activate checkbox according to DB start===========================================
  AddFields7() {
    this.fpoData.primaryBusinessDetails.push({ delete: true })
  }
  deleteField7(i: any) {
    this.fpoData.primaryBusinessDetails.splice(i, 1)
  }
  deleteRow7(i: any) {
    // this.fpoData.secondaryBusinessDetails.splice(i, 1)
    this.adminServ.deleteRow7(i, this.fpoData.fpoId).subscribe(data => {
      if (data.status == true) {
        this.toastr.success('Deleted', "Success")
        this.dataForUpdate()
      } else {
        this.toastr.error(' unsuccessful', "Error")
      }
      // this.dataForUpdate()

    },
      error => {
        this.toastr.error('Server Error', "Error")

      })
  }


  AddFields4() {
    this.fpoData.License.push({ delete: true })
  }
  deleteField4(i: any) {
    this.fpoData.License.splice(i, 1)
  }

  // AddFields2() {
  //   this.fpoData.secondaryBusinessDetails.push({ delete: true })
  // }
  // deleteField2(i: any) {
  //   this.fpoData.secondaryBusinessDetails.splice(i, 1)
  // }
  // deleteRow2(i: any) {
  //   this.fpoData.secondaryBusinessDetails.splice(i, 1)
  //   this.adminServ.deleteRow2(i, this.fpoData.fpoId).subscribe(data => {
  //     if (data.status == true) {
  //       this.toastr.success('Deleted', "Success")
  //       this.dataForUpdate()
  //     } else {
  //       this.toastr.error(' unsuccessful', "Error")
  //     }
  //     // this.dataForUpdate()

  //   },
  //     error => {
  //       this.toastr.error('Server Error', "Error")

  //     })
  // }



  deleterowInfra(i: any) {
    // this.fpoData.secondaryBusinessDetails.splice(i, 1)


    this.adminServ.deleterowInfra(i, this.fpoData.fpoId).subscribe(data => {
      if (data.status == true) {
        this.toastr.success('Deleted', "Success")
        this.dataForUpdate()
      } else {
        this.toastr.error(' unsuccessful', "Error")
      }
      // this.dataForUpdate()

    },
      error => {
        this.toastr.error('Server Error', "Error")

      })
  }






  deleteLicRow(i: any) {
    // this.fpoData.secondaryBusinessDetails.splice(i, 1)


    this.adminServ.deleteLicRow(i, this.fpoData.fpoId).subscribe(data => {
      if (data.status == true) {
        this.toastr.success('Deleted', "Success")
        this.dataForUpdate()
      } else {
        this.toastr.error(' unsuccessful', "Error")
      }
      // this.dataForUpdate()

    },
      error => {
        this.toastr.error('Server Error', "Error")

      })
  }

  // deleteRow3(id: any) {

  //   this.adminServ.deleteRow3(id, this.fpoData.fpoId).subscribe(data => {
  //     //console.log(data.status,"status");
  //     if (data.status == true) {
  //       this.toastr.success('Deleted', "Success")
  //       this.dataForUpdate()
  //     } else {
  //       this.toastr.error(' unsuccessful', "Error")
  //     }
  //     this.dataForUpdate()

  //   },
  //     error => {
  //       //console.log(error,"Eroorororororo");

  //       this.toastr.error('Server Error', "Error")

  //     })
  // }

  // AddFields3() {
  //   this.fpoData.storageDetails.push({ delete: true })
  // }
  // deleteField3(i: any) {
  //   this.fpoData.storageDetails.splice(i, 1)
  // }

  AddFields5() {
    this.fpoData.InfrastructureDetail.push({ delete: true })
  }
  deleteField5(i: any) {
    this.fpoData.InfrastructureDetail.splice(i, 1)
  }

  checkBoxPatch1() {
    if (this.fpoData?.businessActivities1920?.businessActivities.indexOf('Collective Procurement of Inputs') >= 0) {
      this.checkBoxPatch11 = true
    }
  }
  checkBoxPatch2() {
    if (this.fpoData?.businessActivities1920?.businessActivities.indexOf('Seed production and Supply') >= 0) {
      this.checkBoxPatch12 = true
    }
  }
  checkBoxPatch3() {
    if (this.fpoData?.businessActivities1920?.businessActivities.indexOf('Storage') >= 0) {
      this.checkBoxPatch13 = true
    }
  }
  checkBoxPatch4() {
    if (this.fpoData?.businessActivities1920?.businessActivities.indexOf('Processing and value addition') >= 0) {
      this.checkBoxPatch14 = true
    }
  }
  checkBoxPatch5() {
    if (this.fpoData?.businessActivities1920?.businessActivities.indexOf('Produce aggregation and Marketing') >= 0) {
      this.checkBoxPatch15 = true
    }
  }
  checkBoxPatch6() {
    if (this.fpoData?.businessActivities1920?.businessActivities.indexOf('Common Hiring Centre') >= 0) {
      this.checkBoxPatch16 = true
    }
  }



  checkBoxPatch7() {
    if (this.fpoData?.businessActivities1920?.businessActivities.indexOf('Improving production technology: Consulting services') >= 0) {
      this.checkBoxPatch17 = true
    }
  }

  checkBoxPatch8() {
    if (this.fpoData?.businessActivities1920?.businessActivities.indexOf('Ecological Farming') >= 0) {
      this.checkBoxPatch18 = true
    }
  }
  checkBoxPatch9() {
    if (this.fpoData?.businessActivities1920?.businessActivities.indexOf('Eco/Rural tourism') >= 0) {
      this.checkBoxPatch19 = true
    }
  }

  checkBoxPatch10() {
    if (this.fpoData?.businessActivities1920?.businessActivities.indexOf('Others') >= 0) {
      this.checkBoxPatch20 = true

    }
  }
  checkBoxPatch33() {
    if (this.fpoData?.businessActivities1920?.businessActivities.indexOf('Primary processing') >= 0) {
      this.checkBoxPatch21 = true

    }
  }
  checkBoxPatch34() {
    if (this.fpoData?.businessActivities1920?.businessActivities.indexOf('Secondary processing') >= 0) {
      this.checkBoxPatch22 = true

    }
  }
  // ========================================Below code is to activate checkbox according to DB start===========================================


  onCheckboxChange(e: any) {
    // ////////console.log(11,e.target.value);

    const businessActivities: FormArray = this.form.get('businessActivities') as FormArray;

    if (e.target.checked) {
      //console.log(e.target.value,"e.target.checked");


      businessActivities.push(new FormControl(e.target.value));
      if (e.target.value == "Others") {
        this.showSeparateIp = false
      }
      else if (e.target.value == "Processing and value addition") {
        this.showTypeProcessing = false

      }
    } else {
      this.showSeparateIp = true
      this.showTypeProcessing = true
      let i: number = 0;
      businessActivities.controls.forEach((item) => {
        if (item.value == e.target.value) {
          businessActivities.removeAt(i);
          return;
        }
        i++;
      });
    }
    // ////////console.log(88, this.form.value);

  }




  // ================================Crop Details Actions start===================================
  cropData: any
  cropTypes: any
  varietyData: any

  // AddFields1() {
  //   this.cropData.push({ delete: true })
  //   this.cropDataForModalShow = true
  //   this.cropDataForModal = ''
  // }

  // deleteField1(i: any) {
  //   this.cropData.splice(i, 1)
  // }

  // cropDetailsUpdate(_id: any, year: any, season: any, cropCatagory: any, cropName: any, cropType: any, variety: any, Sowing: any, Harvesting: any, productionArea: any, quantity: any, transctionAmount: any) {
  //   let cropDetails = {
  //     fpoId: this.appServ.fpoId,
  //     id: _id,
  //     cropCatagory: cropCatagory,
  //     cropName: cropName,
  //     year: year,
  //     season: season,
  //     Harvesting: Harvesting,
  //     Sowing: Sowing,
  //     cropType: cropType,
  //     variety: variety,
  //     productionArea: productionArea,
  //     quantity: quantity,

  //     transctionAmount: transctionAmount,

  //   }
  //   this.adminServ.cropDetailsUpdate(cropDetails).subscribe(
  //     data => {
  //       if (data.status == 1) {
  //         //console.log(data.status);

  //         this.toastr.success('Update Success', "Success")
  //       } else {
  //         this.toastr.error('Update unsuccessful5', "Error")
  //       }
  //       this.dataForUpdate()

  //     },
  //     error => {
  //       this.toastr.error('Server Error', "Error")
  //     }
  //   )
  // }

  // cropDataForModal: any
  // cropDataForModalShow = false

  // passCropDataToModal(index: any, cropDetail: any) {
  //   cropDetail.index = index
  //   this.cropDataForModal = cropDetail;
  //   this.cropDataForModalShow = true
  //   this.loadVariety();
  // }

  // ================================Crop Details Actions end===================================

  // ===================================Business Extra Details start================================

  procInfraMentionShow = false;
  qualityControlShow = false;
  collectionCenterShow = false;
  facilityCenterShow = false;
  landShow = false;
  openFacilityCenter = false;
  facilityOwnedAgency = false;

  businessExtraDetail = new FormGroup({
    secondaryBusinessActiv: new FormControl(''),
    // processingInfrastructure: new FormControl(''),
    // StorageFacility: new FormControl(''),
    // processingInfraDetails: new FormControl(''),
    // InfraCapacity: new FormControl('')
  })

  // storageDetails = new FormGroup({
  //   storageType: new FormControl(''),
  //   commodityType: new FormControl(''),
  //   storageFacility: new FormControl(''),
  //   ownership: new FormControl(''),
  //   rentType: new FormControl(''),
  //   storageCapacity: new FormControl(''),
  //   storageUtility: new FormControl(''),


  // })
  // InfrastructureDetail = new FormGroup({
  //   machineName: new FormControl(''),
  //   ownership: new FormControl(''),
  //   Capacity: new FormControl(''),
  //   InfraCapacity: new FormControl(''),
  //   utility: new FormControl(''),
  //   Age: new FormControl(''),
  //   contactSupplier: new FormControl(''),
  //   processingInfrastructure: new FormControl(''),

  // })

  // businessExtraDetailsPatchValue() {
  //   this.secondaryBusinessActiv = this.fpoData.secondaryBusinessActiv;
  //   this.businessExtraDetail.patchValue({
  //     secondaryBusinessActiv: this.fpoData.secondaryBusinessActiv,
  //     processingInfrastructure: this.fpoData.processingInfrastructure,
  //     InfraCapacity: this.fpoData.InfraCapacity,
  //     storageFacility: this.fpoData.StorageFacility
  //   })

  // }

  // InfraDetailsPatchValue() {
  //   this.InfrastructureDetail.patchValue({
  //     machineName: this.fpoData.InfrastructureDetail.machineName,
  //     ownership: this.fpoData.InfrastructureDetail.ownership,
  //     Capacity: this.fpoData.InfrastructureDetail.Capacity,
  //     InfraCapacity: this.fpoData.InfrastructureDetail.InfraCapacity,
  //     utility: this.fpoData.InfrastructureDetail.utility,
  //     Age: this.fpoData.InfrastructureDetail.Age,

  //     contactSupplier: this.fpoData.InfrastructureDetail.contactSupplier

  //   })
  // }


  // storageDetailUpdate(index: any, storageType: any, ownership: any, rentType: any, commodityType: any, storageCapacity: any, storageUtility: any) {

  //   let storageDetails = {
  //     fpoId: this.appServ.fpoId,
  //     index: index,
  //     storageType: storageType,
  //     ownership: ownership,
  //     rentType: rentType,
  //     commodityType: commodityType,
  //     storageCapacity: storageCapacity,
  //     storageUtility: storageUtility
  //   }
  //   // console.log(storageDetails, "storageDetails");

  //   this.adminServ.storageDetailUpdate(storageDetails).subscribe(
  //     data => {
  //       ////////console.log(data);

  //       if (data.status == 1) {
  //         this.toastr.success('Update Success', "Success")
  //         // this.businessExtraDetails()
  //       } else {
  //         this.toastr.error('Update unsuccessfull', "Error")
  //       }
  //       this.dataForUpdate()

  //     },
  //     error => {
  //       ////////console.log(error);

  //       this.toastr.error('Server Error', "Error")
  //     }
  //   )
  // }

  // deleteRow1(i: any) {
  //   // this.fpoData.secondaryBusinessDetails.splice(i, 1)
  //   console.log(i, "storage")
  //   this.adminServ.deleteRow1(i, this.fpoData.fpoId).subscribe(data => {
  //     if (data.status == true) {
  //       this.toastr.success('Deleted', "Success")
  //       this.dataForUpdate()
  //     } else {
  //       this.toastr.error(' unsuccessful', "Error")
  //     }
  //     this.dataForUpdate()

  //   },
  //     error => {
  //       this.toastr.error('Server Error', "Error")

  //     })
  // }





  processingInfra() {
    if (this.InfrastructureDetailForm.value.haveProcessingInfrestructure == "Yes") {
      this.procInfraMentionShow = true;
    } else {
      this.procInfraMentionShow = false;
    }
  }

  qualityControl() {
    if (this.qualityControlDetailForm.value.haveAssayingFacility == "Yes") {
      this.qualityControlShow = true
    } else {
      this.qualityControlShow = false
    }
  }
  collectionCenter() {
    if (this.collectionCenterForm.value.haveCollectionCenter == "Yes") {
      this.collectionCenterShow = true
    } else {
      this.collectionCenterShow = false
    }
  }
  FacilityCenter() {
    if (this.CommonFascilityDetailForm.value.haveAccessToFacilityCenter == "Yes") {
      this.facilityOwnedAgency = true
    } else {
      this.facilityOwnedAgency = false
    }
  }

  landStatus() {
    if (this.CommonFascilityDetailForm.value.landAvailable == "Yes") {
      this.landShow = true
    } else {
      this.landShow = false
    }
  }

  FPOOwnedByAgency(){
    if (this.CommonFascilityDetailForm.value.facilityType == "OwnedByOtherAgency") {
      this.facilityCenterShow = true
    } else {
      this.facilityCenterShow = false
    }
  }

  FPOWantComfacilityCenter(){
    if (this.CommonFascilityDetailForm.value.wantToOpenFacility == "Yes") {
      this.openFacilityCenter = true
    } else {
      this.openFacilityCenter = false
    }
  }

  // ===================================Business Extra Details end================================

  // =====================================Secondary business activity start================================

  secBusinessShow = false

  secondaryBusinessShow() {
    // console.log(this.businessExtraDetail.value.secondaryBusinessActiv,"wertytreertyertyteertytre");
    if (this.secondaryBusinessActiv == "Yes") {
      this.secBusinessShow = true
    } else {
      this.secBusinessShow = false
      // this.businessExtraDetail.value.processingInfraDetails = ''
    }
  }

  InfrastructureShow = false

  // Infrastructure() {
  //   ////////console.log(this.fpoData.secondaryBusinessDetails.length);
  //   if (this.InfrastructureDetail.value.secondaryBusinessActiv == "Yes") {
  //     this.InfrastructureShow = true
  //   } else {
  //     this.InfrastructureShow = false
  //     // this.businessExtraDetail.value.processingInfraDetails = ''
  //   }
  // }

  // secondaryBusinessDetailsUpdate(index: any, businessActivity: any, productName: any, businessDetails: any, quantitySold: any, amount: any) {
  //   let secondaryBusinessDetails = {
  //     fpoId: this.appServ.fpoId,
  //     index: index,
  //     businessActivity: businessActivity,
  //     productName: productName,
  //     businessDetails: businessDetails,
  //     quantitySold: quantitySold,
  //     amount: amount,
  //     // brandingDetails: brandingDetails
  //   }
  //   this.adminServ.secondaryBusinessDetailsUpdate(secondaryBusinessDetails).subscribe(
  //     data => {
  //       ////////console.log(data);

  //       if (data.status == 1) {
  //         this.toastr.success('Update Success', "Success")
  //         // this.businessExtraDetails()
  //         // this.dataForUpdate()
  //       } else {
  //         this.toastr.error('Update unsuccessful2', "Error")
  //       }
  //       this.dataForUpdate()

  //     },
  //     error => {
  //       ////////console.log(error);

  //       this.toastr.error('Server Error', "Error")
  //     }
  //   )
  // }


  primaryBusinessDetailsUpdate(index: any, Year: any, priBusinessActivity: any, cropCategory: any, quantitySold: any, amount: any) {
    //  console.log(priBusinessActivity,"priBusinessActivity");

    let primaryBusinessDetails = {
      fpoId: this.appServ.fpoId,
      Year: Year,
      index: index,
      priBusinessActivity: priBusinessActivity,
      cropCategory: cropCategory,

      quantitySold: quantitySold,
      amount: amount,
      // brandingDetails: brandingDetails
    }
    this.adminServ.primaryBusinessDetailsUpdate(primaryBusinessDetails).subscribe(
      data => {
        console.log(data, "ress");

        if (data.status == 1) {
          this.toastr.success('Update Success', "Success")
        } else {
          this.toastr.error('Update unsuccessful', "Error")
        }
        this.dataForUpdate()

      },
      error => {
        console.log(error);

        this.toastr.error('Server Error', "Error")
      }
    )
  }

  LicenseDetailsUpdate(index: any, licenseType: any, LicenseNum: any, dateOfIssue: any, dateOfRenewal: any) {
    let primaryBusinessDetails = {
      fpoId: this.appServ.fpoId,
      index: index,
      licenseType: licenseType,
      LicenseNum: LicenseNum,

      dateOfIssue: dateOfIssue,
      dateOfRenewal: dateOfRenewal
      // brandingDetails: brandingDetails
    }
    this.adminServ.licenseDetailsUpdate(primaryBusinessDetails).subscribe(
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



  InfrastructureDetailUpdate(index: any, machineName: any, ownership: any, Capacity: any, utility: any, Age: any, contactSupplier: any) {
    let InfrastructureDetail = {
      fpoId: this.appServ.fpoId,
      index: index,
      machineName: machineName,
      ownership: ownership,
      Capacity: Capacity,
      utility: utility,
      Age: Age,
      contactSupplier: contactSupplier
    }
    this.adminServ.InfrastructureDetailUpdate(InfrastructureDetail).subscribe(
      data => {
        ////////console.log(data);

        if (data.status == 1) {
          this.toastr.success('Update Success', "Success")
        } else {
          this.toastr.error('Update unsuccessfull', "Error")
        }
        this.dataForUpdate()
        // this.businessExtraDetails()
      },
      error => {
        ////////console.log(error);

        this.toastr.error('Server Error', "Error")
      }
    )
  }
  // =====================================Secondary business activity end================================


  // =====================================Total business donw start================================

  showMrktngTieupDiv = false

  totalBusinessDone = new FormGroup({
    tbd1920: new FormControl(''),
    tbd1819: new FormControl(''),
    tbd1718: new FormControl(''),
    haveMarketingTieup: new FormControl(''),
    marketingTieupDetails: new FormControl(''),
  })

  totalBusinessDonePatchValue() {
    if (this.fpoData?.totalBusinessDone) {
      this.totalBusinessDone.patchValue(this.fpoData.totalBusinessDone)
    }
  }

  marktngTieUpShow() {
    if (this.totalBusinessDone.value.haveMarketingTieup == "Yes") {
      this.showMrktngTieupDiv = true
    } else {
      this.showMrktngTieupDiv = false
      // this.businessExtraDetail.value.processingInfraDetails = ''
    }
  }

  totalBusinessDoneSubmit() {
    // ////////console.log(this.totalBusinessDone.value);

    this.adminServ.totalBusinessDoneSubmit(this.totalBusinessDone.value, this.appServ.fpoId).subscribe(
      data => {
        if (data.status == 1) {
          this.toastr.success('Update Success', "Success")
        } else {
          this.toastr.error('Update unsuccessful3', "Error")
        }
        this.dataForUpdate()

      },
      error => {
        this.toastr.error('Server Error', "Error")
      }
    )
  }

  // =====================================Total business donw end================================

  businessPlan() {
    if (this.businessForm.value.businessPlanFor2021 == "Yes") {
      this.existBusinessPlan = true;
    } else {
      this.existBusinessPlan = false;
    }
  }

  checkPurchaseSell() {

    if (this.businessData.value.pruchasSellEngage == 0 && this.businessData.value.nonPruchasSellEngage == 0) {
      this.businessData.patchValue({ amount: 0 });
      this.businessData.controls['amount'].disable();
    } else {
      this.businessData.controls['amount'].enable();

      this.purchaseKey = false;
    }
  }

  updateKyc() {
    if (this.kycform.value.kycData == "Yes") {
      this.kycUpload = true;
    } else {
      this.kycUpload = false;
    }
  }

  auditDone() {
    if (this.Auditform.value.annualAuditDone == "Yes") {
      this.auditUpload = true;
    } else {
      this.auditUpload = false;
    }
  }

  itrFilling() {
    console.log(this.Itrform.value, "this.itrform.value.itrFillingDonethis.itrform.value.itrFillingDone");

    if (this.Itrform.value.itrFillingDone == "Yes") {
      this.itrUpload = true;
    } else {
      this.itrUpload = false;
    }
  }
  RoCFilling() {
    if (this.RoCform.value.RoCFillingDone == "Yes") {
      this.fillingRoC = true;
    } else {
      this.fillingRoC = false;
    }
  }
  eNam() {
    if (this.eNamform.value.eNamRegister == "Yes") {
      this.eNamRegisterr = true;
    } else {
      this.eNamRegisterr = false;
    }
  }


  tieUpsMou() {
    if (this.Tieupsform.value.Tieupdone == "Yes") {
      this.TieupAssociation = true;
    } else {
      this.TieupAssociation = false;
    }
  }

  // uploadFile(event: any) {
  //   if (event.target.files[0] != undefined) {
  //     this.selectedFile = event.target.files[0];
  //     var fileReader = new FileReader();
  //     // fileReader.readAsText(this.selectedFile, 'UTF-8');
  //     fileReader.readAsDataURL(this.selectedFile)
  //     fileReader.onload = () => {
  //       this.obj = fileReader.result;
  //       console.log(this.obj, "fbjdhhfjfhfhfhh");
  //     }
  //     // console.log(this.jsonObj,"jsonObj");
  //     fileReader.onerror = (error) => {
  //       console.log(error);
  //     }
  //   }
  // }



}
