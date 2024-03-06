
import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AhoserviceService } from '../ahoservice.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-scoringtool',
  templateUrl: './scoringtool.component.html',
  styleUrls: ['./scoringtool.component.css']
})
export class ScoringtoolComponent implements OnInit {
  distCode: any;
  getfpoListData: any;
  financialYear: any;
  getBodMeetingDetailsData: any;
  boardOfDirectorsMeetingCount: number | undefined;
  annualGeneralMeetingCount: number | undefined;
  percentageOfAnnualMeetings: number | undefined | string;
  percentageOfBodMeetings: number | string | undefined;
  avgAgmmeeting: number | undefined;
  avgBodmeeting: number | undefined;
  getFpoDetailsData: any;
  totalShareholderPerentage: any;
  femaleShareholder: number | undefined | string;
  getfpoListDataBusiness: any;
  getBusinessDetailsData: any;
  runningInputShopLisence: number | undefined;
  percentageOfPruchasSellEngage: number | string | undefined;
  finalresultOfPruchasSellEngage: number | string | undefined;
  finalrunningInputShopLisence: any;
  cropAvailableForSale: any;
  avlForSaleMark: any;
  exportedToOtherCountryMark: any;
  getOtherLisenceData: any;
  finalorganicCertificateCountMark: any;
  finalresultOfNonPruchasSellEngage: number | string | undefined;
  FPORecord: any;
  finalRecordMark: any;
  finalqualityControl: any;
  finaltieUpMark: any;
  finalRepeatCompanyMark: any;
  finalpaymentRegisterMark: any;
  insuranceServiceMark: any;
  costumHiringCenterMark: any;
  transactionPercentageMark: any;
  softwareLisenceMark: any;
  turnoverDetails: any;
  finalprocessingUnit: any;
  finalaggregationCenter: any;
  finalturnoverMark: any;
  finalprofitMark: any;
  businessSumMark: any;
  submitData: any;
  noOfFemaleFarmerMember2: any;
  noOfMaleFarmerMember2: any;
  finalrunningInputShopLisenceMark: any;
  inputValue: any;
  ProduceAggregationValue: any;
  finalresultOfnonProduceAggregation: any;
  landAvailable: any;
  engagedPacking: any;
  eNamTrading: any;

  constructor(private service: AhoserviceService, private toastr: ToastrService, private router: Router, private appServ: AppService) {

  }

  ngOnInit(): void {
    this.fetchDistCode();

  }
  scoringTool = new FormGroup({
    financialYear: new FormControl('', [Validators.required]),
    scoreStatus: new FormControl('', [Validators.required]),
    fpo: new FormControl('', [Validators.required]),
  })
  scoringToolBusiness = new FormGroup({
    financialYearBusiness: new FormControl('', [Validators.required]),
    scoreStatusBusiness: new FormControl('', [Validators.required]),
    fpoBusiness: new FormControl('', [Validators.required]),
    varifiedBusinessStatus1: new FormControl('', [Validators.required]),
    varifiedBusinessStatus2: new FormControl('', [Validators.required]),
    varifiedBusinessStatus3: new FormControl('', [Validators.required]),
    varifiedBusinessStatus4: new FormControl('', [Validators.required]),
    varifiedBusinessStatus5: new FormControl('', [Validators.required]),
    varifiedBusinessStatus6: new FormControl('', [Validators.required]),
    varifiedBusinessStatus7: new FormControl('', [Validators.required]),
    varifiedBusinessStatus8: new FormControl('', [Validators.required]),
    varifiedBusinessStatus9: new FormControl('', [Validators.required]),
    varifiedBusinessStatus10: new FormControl('', [Validators.required]),
    varifiedBusinessStatus11: new FormControl('', [Validators.required]),
    varifiedBusinessStatus12: new FormControl('', [Validators.required]),
    varifiedBusinessStatus13: new FormControl('', [Validators.required]),
    varifiedBusinessStatus14: new FormControl('', [Validators.required]),
    varifiedBusinessStatus15: new FormControl('', [Validators.required]),
    varifiedBusinessStatus16: new FormControl('', [Validators.required]),
    varifiedBusinessStatus17: new FormControl('', [Validators.required]),
    varifiedBusinessStatus18: new FormControl('', [Validators.required]),
    varifiedBusinessStatus19: new FormControl('', [Validators.required]),
    varifiedBusinessStatus20: new FormControl('', [Validators.required]),
    varifiedBusinessStatus21: new FormControl('', [Validators.required]),
    varifiedBusinessStatus22: new FormControl('', [Validators.required]),
    varifiedBusinessStatus23: new FormControl('', [Validators.required]),
    varifiedBusinessStatus24: new FormControl('', [Validators.required]),
    businessRejectionOfreason1: new FormControl('', [Validators.required]),
    businessRejectionOfreason2: new FormControl('', [Validators.required]),
    businessRejectionOfreason3: new FormControl('', [Validators.required]),
    businessRejectionOfreason4: new FormControl('', [Validators.required]),
    businessRejectionOfreason5: new FormControl('', [Validators.required]),
    businessRejectionOfreason6: new FormControl('', [Validators.required]),
    businessRejectionOfreason7: new FormControl('', [Validators.required]),
    businessRejectionOfreason8: new FormControl('', [Validators.required]),
    businessRejectionOfreason9: new FormControl('', [Validators.required]),
    businessRejectionOfreason10: new FormControl('', [Validators.required]),
    businessRejectionOfreason11: new FormControl('', [Validators.required]),
    businessRejectionOfreason12: new FormControl('', [Validators.required]),
    businessRejectionOfreason13: new FormControl('', [Validators.required]),
    businessRejectionOfreason14: new FormControl('', [Validators.required]),
    businessRejectionOfreason15: new FormControl('', [Validators.required]),
    businessRejectionOfreason16: new FormControl('', [Validators.required]),
    businessRejectionOfreason17: new FormControl('', [Validators.required]),
    businessRejectionOfreason18: new FormControl('', [Validators.required]),
    businessRejectionOfreason19: new FormControl('', [Validators.required]),
    businessRejectionOfreason20: new FormControl('', [Validators.required]),
    businessRejectionOfreason21: new FormControl('', [Validators.required]),
    businessRejectionOfreason22: new FormControl('', [Validators.required]),
    businessRejectionOfreason23: new FormControl('', [Validators.required]),
    businessRejectionOfreason24: new FormControl('', [Validators.required]),




  })

  getFpoYearWise() {
    this.getBodMeetingDetails();
    // this.getFpoDetails();
    this.getBusinessDetails();
    this.getCropDetails();
    this.getTurnoverDetails();
    this.getProfitDetails()
  }

  fetchDistCode() {
    let data = { type: 'AHO' }
    this.appServ.sideBarUserName(data).subscribe(data => {
      this.distCode = data.name;
      this.getfpoList();
      this.getfpoListforBusiness();
    })
  }

  getfpoList() {
    this.service.getfpoList(this.distCode).subscribe(result => {
      this.getfpoListData = result;
    })
  }


  getBodMeetingDetails() {
    this.service.getBodMeetingDetails(this.scoringTool.value.financialYear, this.scoringTool.value.fpo.fpoId).subscribe(result => {
      this.getBodMeetingDetailsData = result;
      let boardOfDirectorsMeetingCount = 0;
      let annualGeneralMeetingCount = 0;
      let totalAnnualGeneralMeetingAttendees = 0;
      let totalBoardOfDirectorsMeetingAttendees = 0;
      this.getBodMeetingDetailsData.forEach((meeting: any) => {
        if (meeting.meetingType === "Boad of Director's meeting") {
          boardOfDirectorsMeetingCount++;
          totalBoardOfDirectorsMeetingAttendees += meeting.noOfAttendees;
        } else if (meeting.meetingType === "Annual General meeting") {
          annualGeneralMeetingCount++;
          totalAnnualGeneralMeetingAttendees += meeting.noOfAttendees;
        }
      });
      this.boardOfDirectorsMeetingCount = boardOfDirectorsMeetingCount && boardOfDirectorsMeetingCount <= 4 ? boardOfDirectorsMeetingCount : boardOfDirectorsMeetingCount > 4 ? 4 : 0;
      this.annualGeneralMeetingCount = annualGeneralMeetingCount && annualGeneralMeetingCount <= 2 ? annualGeneralMeetingCount : annualGeneralMeetingCount > 2 ? 2 : 0;

      this.avgBodmeeting = (totalBoardOfDirectorsMeetingAttendees / boardOfDirectorsMeetingCount);
      this.avgAgmmeeting = (totalAnnualGeneralMeetingAttendees / annualGeneralMeetingCount);

      this.percentageOfBodMeetings = parseInt(((totalBoardOfDirectorsMeetingAttendees * this.avgBodmeeting) / 100).toFixed(2)) >= 70 ? 4 : 0;
      this.percentageOfAnnualMeetings = parseInt(((totalAnnualGeneralMeetingAttendees * this.avgAgmmeeting) / 100).toFixed(2)) >= 30 ? 4 : 0;
    })
  }

  // addedby arindam


  getfpoListforBusiness() {
    this.service.getfpoListforBusiness(this.distCode).subscribe(result => {
      this.getfpoListDataBusiness = result;
    })
  }


  getBusinessDetails() {
    this.service.getBusinessDetails(this.scoringToolBusiness.value.financialYearBusiness, this.scoringToolBusiness.value.fpoBusiness.fpoId).subscribe(result => {
      this.getBusinessDetailsData = result;
      var primaryBusinessDetailsArray = this.getBusinessDetailsData[0].primaryBusinessDetails;
      var totalPruchasSellEngage = 0;
      var totalnonPruchasSellEngage = 0;
      for (var i = 0; i < primaryBusinessDetailsArray.length; i++) {
        totalPruchasSellEngage += primaryBusinessDetailsArray[i].pruchasSellEngage;
        totalnonPruchasSellEngage += primaryBusinessDetailsArray[i].nonPruchasSellEngage;
      }

      console.log(this.getBusinessDetailsData, "this.getBusinessDetailsDatathis.getBusinessDetailsData");
      this.getOtherLisenceData = result;
      var totalNonPruchasSellEngage = this.getBusinessDetailsData[0].FPOData.noOfFarmerMember - this.getBusinessDetailsData[0].FPOData.noOfFemaleFarmerMember2 - this.getBusinessDetailsData[0].FPOData.noOfMaleFarmerMember2;
      let nonProduceAggregation = 0;
      this.getBusinessDetailsData.forEach((fpo: { primaryBusinessDetails: any[]; }) => {
        fpo.primaryBusinessDetails.forEach(detail1 => {
          if (detail1.priBusinessActivity === "Produce aggregation and Marketing") {
            nonProduceAggregation += detail1.nonPruchasSellEngage;
          }

        });
      });

      let nonProduceAggregationPercentage = (nonProduceAggregation / totalNonPruchasSellEngage) * 100;
      var resultOfnonProduceAggregation;
      if (nonProduceAggregationPercentage >= 30) {
        resultOfnonProduceAggregation = 2;
      } else {
        resultOfnonProduceAggregation = 0;
      }
      this.finalresultOfnonProduceAggregation = resultOfnonProduceAggregation

      let inputSell = 0;
      this.getBusinessDetailsData.forEach((fpo: { primaryBusinessDetails: any[]; }) => {
        fpo.primaryBusinessDetails.forEach(detail => {
          if (detail.priBusinessActivity === "Input sales") {
            inputSell += detail.pruchasSellEngage;
          }
        });
      });
      let inputPercentage = (inputSell / parseInt(this.getBusinessDetailsData[0]?.FPOData.noOfFemaleFarmerMember2 + this.getBusinessDetailsData[0]?.FPOData.noOfMaleFarmerMember2)) * 100;

      if (inputPercentage >= 80) {
        this.inputValue = 4;
      } else if (inputPercentage >= 60 && inputPercentage < 80) {
        this.inputValue = 3;
      } else if (inputPercentage >= 40 && inputPercentage < 60) {
        this.inputValue = 2;
      } else if (inputPercentage >= 20 && inputPercentage < 40) {
        this.inputValue = 1;
      } else {
        this.inputValue = 0;
      }

      let ProduceAggregation = 0;
      this.getBusinessDetailsData.forEach((fpo: { primaryBusinessDetails: any[]; }) => {
        fpo.primaryBusinessDetails.forEach(detail1 => {
          if (detail1.priBusinessActivity === "Produce aggregation and Marketing") {
            ProduceAggregation += detail1.pruchasSellEngage;
          }

        });
      });
      let ProduceAggregationPercentage = (ProduceAggregation / parseInt(this.getBusinessDetailsData[0]?.FPOData.noOfFemaleFarmerMember2 + this.getBusinessDetailsData[0]?.FPOData.noOfMaleFarmerMember2)) * 100;

      if (ProduceAggregationPercentage >= 80) {
        this.ProduceAggregationValue = 4;
      } else if (ProduceAggregationPercentage >= 60 && ProduceAggregationPercentage < 80) {
        this.ProduceAggregationValue = 3;
      } else if (ProduceAggregationPercentage >= 40 && ProduceAggregationPercentage < 60) {
        this.ProduceAggregationValue = 2;
      } else if (ProduceAggregationPercentage >= 20 && ProduceAggregationPercentage < 40) {
        this.ProduceAggregationValue = 1;
      } else {
        this.ProduceAggregationValue = 0;
      }



      this.landAvailable = this.getBusinessDetailsData[0]?.facilityCenterDetails[0]?.haveAccessToFacilityCenter === "Yes" ? 2 : 0;
      this.engagedPacking = this.getBusinessDetailsData[0]?.InfrastructureDetail[0]?.packing === "Yes" ? 4 : 0;
      this.eNamTrading = this.getBusinessDetailsData[0]?.eNamDetails[0]?.eNamTrading === "Yes" ? 2 : 0;









      ///////////
      var primaryBusinessDetailsArray = this.getOtherLisenceData[0].otherLicense;






      var runningInputShopLisenceMark = 0;

      for (let i = 0; i < primaryBusinessDetailsArray.length; i++) {
        const obj = primaryBusinessDetailsArray[i];

        if (obj.licenseType === "Shop Act licence") {
          runningInputShopLisenceMark = 4; // Assign mark 4
          break;
        }
      }

      this.finalrunningInputShopLisenceMark = runningInputShopLisenceMark;









      var organicCertificateCount = primaryBusinessDetailsArray.reduce(function (count: number, obj: { licenseType: string; }) {
        if (obj.licenseType === "Organic Certificate") {
          return count + 1;
        } else {
          return count;
        }
      }, 0);

      var organicCertificateCountMark;

      if (organicCertificateCount >= 2) {
        organicCertificateCountMark = 2;
      } else if (organicCertificateCount === 1) {
        organicCertificateCountMark = 1;
      } else {
        organicCertificateCountMark = 0;
      }
      this.finalorganicCertificateCountMark = organicCertificateCountMark

      let recordMark = 0;

      if (this.getBusinessDetailsData[0]?.FPORecord && this.getBusinessDetailsData[0]?.FPORecord.length > 0) {
        const fpoRecords = this.getBusinessDetailsData[0]?.FPORecord;

        let hasProcurementSOP = false;
        let hasMarketingSOP = false;

        for (const record of fpoRecords) {
          if (record.doc === "Procurement SoP") {
            hasProcurementSOP = true;
          } else if (record.doc === "Marketing SoP") {
            hasMarketingSOP = true;
          }
        }

        if (hasProcurementSOP && hasMarketingSOP) {
          recordMark = 2;
        } else if (hasProcurementSOP || hasMarketingSOP) {
          recordMark = 1;
        }
        this.finalRecordMark = recordMark
      }


      let qualityControl = 0;

      if (this.getBusinessDetailsData[0]?.qualityControlDetails && this.getBusinessDetailsData[0]?.qualityControlDetails.length > 0) {
        const qualityControlDetails = this.getBusinessDetailsData[0]?.qualityControlDetails;

        for (const detail of qualityControlDetails) {
          if (detail.haveAssayingFacility === 'Yes') {
            qualityControl = 4;
            break;
          }
        }
      }
      this.finalqualityControl = qualityControl



      let aggregationCenter = 0;

      if (this.getBusinessDetailsData[0]?.collectionCenterDetails && this.getBusinessDetailsData[0]?.collectionCenterDetails.length > 0) {
        const collectionCenterDetails = this.getBusinessDetailsData[0]?.collectionCenterDetails;

        for (const detail of collectionCenterDetails) {
          if (detail.haveCollectionCenter === 'Yes') {
            aggregationCenter = 4;
            break;
          }
        }
      }
      this.finalaggregationCenter = aggregationCenter


      let processingUnit = 0;

      if (this.getBusinessDetailsData[0]?.InfrastructureDetail && this.getBusinessDetailsData[0]?.InfrastructureDetail.length > 0) {
        const InfrastructureDetail = this.getBusinessDetailsData[0]?.InfrastructureDetail;

        for (const detail of InfrastructureDetail) {
          if (detail.haveProcessingInfrestructure === 'Yes') {
            processingUnit = 4;
            break;
          }
        }
      }
      this.finalprocessingUnit = processingUnit



      let tieUpMark = 0;

      if (this.getBusinessDetailsData[0]?.TieupDetails && this.getBusinessDetailsData[0]?.TieupDetails.length > 0) {
        const tieupDetails = this.getBusinessDetailsData[0]?.TieupDetails;
        const uniqueCompanies = new Set();

        for (const detail of tieupDetails) {
          uniqueCompanies.add(detail.TieupCompany);
        }
        const numberOfUniqueCompanies = uniqueCompanies.size;
        if (numberOfUniqueCompanies >= 4) {
          tieUpMark = 4;
        } else if (numberOfUniqueCompanies === 3) {
          tieUpMark = 3;
        } else if (numberOfUniqueCompanies === 2) {
          tieUpMark = 2;
        } else if (numberOfUniqueCompanies === 1) {
          tieUpMark = 1;
        } else {
          tieUpMark = 0;
        }
        this.finaltieUpMark = tieUpMark

      }

      let repeatCompanyNo = 0;
      if (this.getBusinessDetailsData[0]?.TieupDetails && this.getBusinessDetailsData[0]?.TieupDetails.length > 0) {
        const tieupDetails = this.getBusinessDetailsData[0]?.TieupDetails;
        const tieupCompanies = new Set();
        let repeatCount = 0;

        for (const detail of tieupDetails) {
          const tieupCompany = detail.TieupCompany;
          tieupCompanies.add(tieupCompany);

          if (tieupDetails.filter((item: { TieupCompany: any; }) => item.TieupCompany === tieupCompany).length >= 2) {
            repeatCount++;
          }
        }

        if (repeatCount >= 4) {
          repeatCompanyNo = 4;
        } else if (repeatCount === 3) {
          repeatCompanyNo = 3;
        } else if (repeatCount === 2) {
          repeatCompanyNo = 2;
        } else if (repeatCount === 1) {
          repeatCompanyNo = 1;
        } else {
          repeatCompanyNo = 0;
        }
        this.finalRepeatCompanyMark = repeatCompanyNo
      }

      let paymentRegister = 0;

      if (this.getBusinessDetailsData[0]?.FPORecord && this.getBusinessDetailsData[0]?.FPORecord.length > 0) {
        const fpoRecords = this.getBusinessDetailsData[0]?.FPORecord;

        const hasPaymentVoucher = fpoRecords.some((record: { doc: string; }) => record.doc === "Payment Voucher");

        paymentRegister = hasPaymentVoucher ? 4 : 0;
      }
      this.finalpaymentRegisterMark = paymentRegister


      let insuranceService = 0;

      if (this.getBusinessDetailsData[0]?.primaryBusinessDetails && this.getBusinessDetailsData[0]?.primaryBusinessDetails.length > 0) {
        const primaryBusinessDetails = this.getBusinessDetailsData[0]?.primaryBusinessDetails;

        const hasInsuranceServices = primaryBusinessDetails.some((detail: { priBusinessActivity: string; }) => detail.priBusinessActivity === "Insurance services");

        insuranceService = hasInsuranceServices ? 2 : 0;
      }
      this.insuranceServiceMark = insuranceService

      let costumHiringCenter = 0;

      if (this.getBusinessDetailsData[0]?.primaryBusinessDetails && this.getBusinessDetailsData[0]?.primaryBusinessDetails.length > 0) {
        const primaryBusinessDetails = this.getBusinessDetailsData[0]?.primaryBusinessDetails;

        const hascostumHiringCenter = primaryBusinessDetails.some((detail: { priBusinessActivity: string; }) => detail.priBusinessActivity === "Custom hiring Center");

        costumHiringCenter = hascostumHiringCenter ? 2 : 0;
      }
      this.costumHiringCenterMark = costumHiringCenter

      let transactionPercentage = 0;
      if (this.getBusinessDetailsData[0]?.accountDetails) {
        const transactionPercentages = this.getBusinessDetailsData[0].accountDetails.transactionPercentages;

        if (transactionPercentages > 80) {
          transactionPercentage = 4;
        } else if (transactionPercentages >= 60) {
          transactionPercentage = 3;
        } else if (transactionPercentages >= 40) {
          transactionPercentage = 2;
        } else if (transactionPercentages >= 20) {
          transactionPercentage = 1;
        } else {
          transactionPercentage = 0;
        }
      }
      this.transactionPercentageMark = transactionPercentage

      let softwareLisence = 0;
      if (this.getBusinessDetailsData[0]?.FPORecord && this.getBusinessDetailsData[0]?.FPORecord.length > 0) {
        const fpoRecords = this.getBusinessDetailsData[0]?.FPORecord;
        const hasSoftwareLicense = fpoRecords.some((record: { recordType: string; }) => record.recordType === "SoftwareLicense");
        softwareLisence = hasSoftwareLicense ? 4 : 0;
      }
      this.softwareLisenceMark = softwareLisence

      this.getProfitDetails()


    })
  }




  getCropDetails() {
    this.service.getCropDetails(this.scoringToolBusiness.value.financialYearBusiness, this.scoringToolBusiness.value.fpoBusiness.fpoId).subscribe(result => {
      this.cropAvailableForSale = result;
      const availableForSaleCount = result.filter((crop: { saleStatus: string; }) => crop.saleStatus === 'Ready for sale').length;
      let limitedCount;
      if (availableForSaleCount >= 4) {
        limitedCount = 4;
      } else if (availableForSaleCount === 3) {
        limitedCount = 3;
      } else if (availableForSaleCount === 2) {
        limitedCount = 2;
      } else if (availableForSaleCount === 1) {
        limitedCount = 1;
      } else {
        limitedCount = 0;
      }
      this.avlForSaleMark = limitedCount
      const exportedToOtherCountry = result.filter((crop: { saleStatus: string; }) => crop.saleStatus === 'Exported to other state' || crop.saleStatus === 'International market').length;
      let exportedToOtherCountryMark;
      if (exportedToOtherCountry >= 2) {
        exportedToOtherCountryMark = 2;
      } else if (exportedToOtherCountry === 1) {
        exportedToOtherCountryMark = 1;
      } else {
        exportedToOtherCountryMark = 0;
      }
      this.exportedToOtherCountryMark = exportedToOtherCountryMark
      this.getProfitDetails()
    });

  }



  getTurnoverDetails() {
    this.service.getTurnoverDetails(this.scoringToolBusiness.value.financialYearBusiness, this.scoringToolBusiness.value.fpoBusiness.fpoId).subscribe(result => {
      this.turnoverDetails = result;
      let turnoverMark = 0;

      if (this.turnoverDetails[0]?.turnoverAmount) {
        const turnoverAmount = this.turnoverDetails[0].turnoverAmount;
        if (turnoverAmount > 10000000) {
          turnoverMark = 4;
        } else if (turnoverAmount >= 7500000 && turnoverAmount < 9999999) {
          turnoverMark = 3;
        } else if (turnoverAmount >= 5000000 && turnoverAmount < 7499999) {
          turnoverMark = 2;
        } else if (turnoverAmount >= 2500000 && turnoverAmount < 4999999) {
          turnoverMark = 1;
        } else {
          turnoverMark = 0;
        }
      }
      this.finalturnoverMark = turnoverMark
      this.getProfitDetails()

    });

  }

  getProfitDetails() {
    // this.service.getProfitDetails(
    //   this.scoringToolBusiness.value.financialYearBusiness,
    //   this.scoringToolBusiness.value.fpoBusiness.fpoId
    // ).subscribe(results => {
    //   if (results && results.length > 0 && results[0].profit !== undefined) {
    //     const result = results[0];
    //     const profitPercentage = result.profit.trim();
    //     let profitMark = 0;
    //     if (profitPercentage.includes('>')) {
    //       profitMark = 4;
    //     } else {
    //       const numericProfit = parseFloat(profitPercentage.replace(/[^\d.]/g, ''));
    //       if (numericProfit >= 1.5) {
    //         profitMark = 3;
    //       } else if (numericProfit >= 1) {
    //         profitMark = 2;
    //       } else if (numericProfit >= 0.5) {
    //         profitMark = 1;
    //       }
    //     }
    //     this.finalprofitMark = profitMark;
    //     console.log(this.finalprofitMark,"this.finalprofitMarkthis.finalprofitMarkthis.finalprofitMark");


    //     // Calculate and assign the sum of marks


    //   } else {
    //     console.error("Result or result.profit is undefined.");
    //   }
    // }, error => {
    //   console.error("Error:", error);
    // });


    this.service.getProfitDetails(this.scoringToolBusiness.value.financialYearBusiness, this.scoringToolBusiness.value.fpoBusiness.fpoId).subscribe(result => {


      if (result.profit === ' >2 % ') {
        this.finalprofitMark = 4;
      } else if (result.profit === '1.5-2 % ') { 
        this.finalprofitMark = 3;
      } else if (result.profit === '1-1.49% ') { 
        this.finalprofitMark = 2;
      }  else if (result.profit === '0.5-0.9% ') { 
        this.finalprofitMark = 1;
      } else if (result.profit === '0.5% -0') { 
        this.finalprofitMark = 0;
      } 
      console.log(this.finalprofitMark,"llll22");
      

    });










    this.businessSumMark = this.finalrunningInputShopLisenceMark + this.inputValue + this.avlForSaleMark +
      this.finalorganicCertificateCountMark + this.exportedToOtherCountryMark + this.ProduceAggregationValue +
      this.finalresultOfnonProduceAggregation + this.finalRecordMark + this.finalqualityControl +
      this.finalaggregationCenter + this.finaltieUpMark + this.finalRepeatCompanyMark
      + this.finalpaymentRegisterMark + this.insuranceServiceMark + this.costumHiringCenterMark +
      this.transactionPercentageMark + this.softwareLisenceMark + this.finalturnoverMark + this.finalprofitMark +
      this.finalprocessingUnit + this.landAvailable + this.engagedPacking + this.eNamTrading + this.finaltieUpMark;
    console.log(this.businessSumMark, "p0p0p00");
    console.log(this.finalrunningInputShopLisenceMark, "1");
    console.log(this.inputValue, "2");
    console.log(this.avlForSaleMark, "3");
    console.log(this.finalorganicCertificateCountMark, "4");
    console.log(this.exportedToOtherCountryMark, "5");
    console.log(this.ProduceAggregationValue, "6");
    console.log(this.finalresultOfnonProduceAggregation, "7");
    console.log(this.finalRecordMark, "8");
    console.log(this.finalqualityControl, "9");
    console.log(this.finalaggregationCenter, "10");
    console.log(this.finaltieUpMark, "11");
    console.log(this.finalRepeatCompanyMark, "12");
    console.log(this.finalpaymentRegisterMark, "13");
    console.log(this.insuranceServiceMark, "14");
    console.log(this.costumHiringCenterMark, "15");
    console.log(this.transactionPercentageMark, "16");
    console.log(this.softwareLisenceMark, "17");
    console.log(this.finalturnoverMark, "18");
    console.log(this.finalprofitMark, "19");
    console.log(this.finalprocessingUnit, "20");
    console.log(this.landAvailable, "21");
    console.log(this.engagedPacking, "22");
    console.log(this.eNamTrading, "23");
    console.log(this.finaltieUpMark, "24");






  }

  submitFinalData() {
    const data = {
      businessFinancialYear: this.scoringToolBusiness.value.financialYearBusiness,
      businessScoreStatus: this.scoringToolBusiness.value.financialYearBusiness,
      businessFpo: this.scoringToolBusiness.value.fpoBusiness,
      businessVerifiedStatus1: this.scoringToolBusiness.value.varifiedBusinessStatus1,
      businessVerifiedStatus2: this.scoringToolBusiness.value.varifiedBusinessStatus2,
      businessVerifiedStatus3: this.scoringToolBusiness.value.varifiedBusinessStatus3,
      businessVerifiedStatus4: this.scoringToolBusiness.value.varifiedBusinessStatus4,
      businessVerifiedStatus5: this.scoringToolBusiness.value.varifiedBusinessStatus5,
      businessVerifiedStatus6: this.scoringToolBusiness.value.varifiedBusinessStatus6,
      businessVerifiedStatus7: this.scoringToolBusiness.value.varifiedBusinessStatus7,
      businessVerifiedStatus8: this.scoringToolBusiness.value.varifiedBusinessStatus8,
      businessVerifiedStatus9: this.scoringToolBusiness.value.varifiedBusinessStatus9,
      businessVerifiedStatus10: this.scoringToolBusiness.value.varifiedBusinessStatus10,
      businessVerifiedStatus11: this.scoringToolBusiness.value.varifiedBusinessStatus11,
      businessVerifiedStatus12: this.scoringToolBusiness.value.varifiedBusinessStatus12,
      businessVerifiedStatus13: this.scoringToolBusiness.value.varifiedBusinessStatus13,
      businessVerifiedStatus14: this.scoringToolBusiness.value.varifiedBusinessStatus14,
      businessVerifiedStatus15: this.scoringToolBusiness.value.varifiedBusinessStatus15,
      businessVerifiedStatus16: this.scoringToolBusiness.value.varifiedBusinessStatus16,
      businessVerifiedStatus17: this.scoringToolBusiness.value.varifiedBusinessStatus17,
      businessVerifiedStatus18: this.scoringToolBusiness.value.varifiedBusinessStatus18,
      businessVerifiedStatus19: this.scoringToolBusiness.value.varifiedBusinessStatus19,
      businessVerifiedStatus20: this.scoringToolBusiness.value.businessVerifiedStatus20,
      businessVerifiedStatus21: this.scoringToolBusiness.value.businessVerifiedStatus21,
      businessVerifiedStatus22: this.scoringToolBusiness.value.businessVerifiedStatus22,
      businessVerifiedStatus23: this.scoringToolBusiness.value.businessVerifiedStatus23,
      businessVerifiedStatus24: this.scoringToolBusiness.value.businessVerifiedStatus24,
      businessRejectionOfreason1: this.scoringToolBusiness.value.businessRejectionOfreason1,
      businessRejectionOfreason2: this.scoringToolBusiness.value.businessRejectionOfreason2,
      businessRejectionOfreason3: this.scoringToolBusiness.value.businessRejectionOfreason3,
      businessRejectionOfreason4: this.scoringToolBusiness.value.businessRejectionOfreason4,
      businessRejectionOfreason5: this.scoringToolBusiness.value.businessRejectionOfreason5,
      businessRejectionOfreason6: this.scoringToolBusiness.value.businessRejectionOfreason6,
      businessRejectionOfreason7: this.scoringToolBusiness.value.businessRejectionOfreason7,
      businessRejectionOfreason8: this.scoringToolBusiness.value.businessRejectionOfreason8,
      businessRejectionOfreason9: this.scoringToolBusiness.value.businessRejectionOfreason9,
      businessRejectionOfreason10: this.scoringToolBusiness.value.businessRejectionOfreason10,
      businessRejectionOfreason11: this.scoringToolBusiness.value.businessRejectionOfreason11,
      businessRejectionOfreason12: this.scoringToolBusiness.value.businessRejectionOfreason12,
      businessRejectionOfreason13: this.scoringToolBusiness.value.businessRejectionOfreason13,
      businessRejectionOfreason14: this.scoringToolBusiness.value.businessRejectionOfreason14,
      businessRejectionOfreason15: this.scoringToolBusiness.value.businessRejectionOfreason15,
      businessRejectionOfreason16: this.scoringToolBusiness.value.businessRejectionOfreason16,
      businessRejectionOfreason17: this.scoringToolBusiness.value.businessRejectionOfreason17,
      businessRejectionOfreason18: this.scoringToolBusiness.value.businessRejectionOfreason18,
      businessRejectionOfreason19: this.scoringToolBusiness.value.businessRejectionOfreason19,
      businessRejectionOfreason20: this.scoringToolBusiness.value.businessRejectionOfreason20,
      businessRejectionOfreason21: this.scoringToolBusiness.value.businessRejectionOfreason21,
      businessRejectionOfreason22: this.scoringToolBusiness.value.businessRejectionOfreason22,
      businessRejectionOfreason23: this.scoringToolBusiness.value.businessRejectionOfreason23,
      businessRejectionOfreason24: this.scoringToolBusiness.value.businessRejectionOfreason24,

      finalrunningInputShopLisence: this.finalrunningInputShopLisenceMark,
      farmersAvailInputServiceThroughFPO: this.inputValue,
      cropsAvailableForSales: this.avlForSaleMark,
      cropsOrganicallyCertified: this.finalorganicCertificateCountMark,
      cropsExportedOtherCountry: this.exportedToOtherCountryMark,
      farmersSupplySoldThroughFPO: this.ProduceAggregationValue,
      nonShareholdersAssociatedWithFPO: this.finalresultOfnonProduceAggregation,
      SoPMaintainedByFPO: this.finalRecordMark,
      FPOFollowQualityControlInfrastructures: this.finalqualityControl,
      FPOHasAggregationCentre: this.finalaggregationCenter,
      NoOfBuyersSignedMoU: this.finaltieUpMark,
      NoOfRepeatBuyers: this.finalRepeatCompanyMark,
      FarmerPaymentVouchersMaintained: this.finalpaymentRegisterMark,
      FPOProvideInsuranceService: this.insuranceServiceMark,
      FPOEngagedInCustomHiringCentre: this.costumHiringCenterMark,
      FPOEngagedInDigitalBusinessTransactions: this.transactionPercentageMark,
      FPOMaintainSalesMIS: this.softwareLisenceMark,
      AnnualSalesTurnover: this.finalturnoverMark,
      NetProfitPercentage: this.finalprofitMark,
      FPChaveProcessingUnit: this.finalprocessingUnit,
      FPCHaveLeasedOrOwnLand: this.landAvailable,
      FPOEngagedPackingBranding: this.engagedPacking,
      experienceOfOperatingInTradingPlatforms: this.eNamTrading,
      NoOfCompaniesTiedUpForInputService: this.finaltieUpMark
    }
    console.log(data, 'submit');
    this.service.submitFinaldata(data).subscribe((result) => {
      this.submitData = result;
      this.toastr.success('Data submitted successfully')
      this.scoringTool.reset();
    })


  }

}









