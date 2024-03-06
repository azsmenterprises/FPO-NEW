import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IaService } from 'src/app/ia/ia.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-operationaltargets',
  templateUrl: './operationaltargets.component.html',
  styleUrls: ['./operationaltargets.component.css']
})
export class OperationaltargetsComponent implements OnInit {
  selectedItems: any;
  selectedSlot: any;
  selectItems: any;
  selectSlotlist: any;
  selectTimeperiod: any;
  selectPeriodlist: any;

  avgData: any = [];
  yearData: any = [];
  tableData: any;
  turnoverData: any;
  mouData: any;
  businessData: any;
  targetData: any;
  shareData: any;
  sendData: any;
  regdage: any;
  fpoData: any;
  IaName: any;
  refNo: any;
  constructor(private service: IaService, private toastr: ToastrService, private router: Router, private appServ: AppService) { }

  ngOnInit(): void {
    this.fetchIaName();
  }

  fetchIaName() {
    let data = {
      type: 'ia',
    }
    this.appServ.sideBarUserName(data).subscribe(
      data => {
        this.IaName = data.name

      }
    )
  }

  onChange() {
    const fpoAge = this.targetForm.value.typesOffpo
    this.targetForm.patchValue({
      timeSlot: "",
    })

    this.service.getRegdage(fpoAge).subscribe(result => {
      console.log(result, 'this.fpoData');
      //=========================
      this.targetForm.patchValue({
        achievements: result?.length,
      })
      //=========================
      if (result && result.length > 0) {
        this.fpoData = result;

        var shareHoler = [];
        var shareCapital = [];
        var yes1 = 0;
        var no1 = 0;
        var yes2 = 0;
        var no2 = 0;
        var yes3 = 0;
        var no3 = 0;
        var yes4 = 0;
        var no4 = 0;
        var yes5 = 0;
        var no5 = 0;
        var yes6 = 0;
        var no6 = 0;
        var yes7 = 0;
        var no7 = 0;
        var yes8 = 0;
        var no8 = 0;
        var yes9 = 0;
        var no9 = 0;
        var yes10 = 0;
        var no10 = 0;
        var year1 = 0;
        var year2 = 0;
        var year3 = 0;
        var yes11 = 0;
        var no11 = 0;
        var yes12 = 0;
        var no12 = 0;
        var yes13 = 0;
        var no13 = 0;
        var yes14 = 0;
        var no14 = 0;
        for (let i = 0; i < this.fpoData.length; i++) {
          // console.log(this.fpoData[i].NoOfFarmerMobilizedAsShareholders,'pandu');
          // let shareHolders=parseInt(this.fpoData[i].NoOfFarmerMobilizedAsShareholders);
          shareHoler.push(parseInt(this.fpoData[i]?.NoOfFarmerMobilizedAsShareholders))
          shareCapital.push(parseInt(this.fpoData[i]?.ShareCapitalMobilizedInInr))



          if (this.fpoData[i]?.commencementOfBusinessfieldWithMca == 'yes') {
            yes1 = ++yes1;
          } else {
            no1 = ++no1;
          }

          if (this.fpoData[i]?.CeoAppointed == 'yes') {
            yes2 = ++yes2;
          } else {
            no2 = ++no2;
          }

          if (this.fpoData[i]?.AccountedAppointed == 'yes') {
            yes3 = ++yes3;
          } else {
            no3 = ++no3;
          }

          if (this.fpoData[i]?.AuditorAppointed == 'yes') {
            yes4 = ++yes4;
          } else {
            no4 = ++no4;
          }

          if (this.fpoData[i]?.GstLicenceApplied == 'yes') {
            yes5 = ++yes5;
          } else {
            no5 = ++no5;
          }

          if (this.fpoData[i]?.statutoryAudit == 'yes') {
            yes6 = ++yes6;
          } else {
            no6 = ++no6;
          }

          if (this.fpoData[i]?.AgmConducted == 'yes') {
            yes7 = ++yes7;
          } else {
            no7 = ++no7;
          }

          if (this.fpoData[i]?.fpoFilledroc == 'yes') {
            yes8 = ++yes8;
          } else {
            no8 = ++no8;
          }

          if (this.fpoData[i]?.receivedloanFrombank == 'Yes') {
            yes9 = ++yes9;
          } else {
            no9 = ++no9;
          }

          if (this.fpoData[i]?.EquityGrantAvailed == 'yes') {
            yes10 = ++yes10;
          } else {
            no10 = ++no10;
          }

          if (this.fpoData[i]?.BusinessPlanFormulated == '3-5year') {
            year1 = ++year1;
          } else if (this.fpoData[i]?.BusinessPlanFormulated == '1-3year') {
            year2 = ++year2;
          } else {
            year3 = ++year3
          }

          if (this.fpoData[i]?.fpotradingThroughenum == 'Yes') {
            yes11 = ++yes11;
          } else {
            no11 = ++no11;
          }

          if (this.fpoData[i]?.RegistrationOnEnam == 'Yes') {
            yes12 = ++yes12;
          } else {
            no12 = ++no12;
          }

          if (parseInt(this.fpoData[i]?.AnnualBusinessTurnoverinInr) >= 5000000) {
            yes13 = ++yes13;
          } else {
            no13 = ++no13;
          }

          if (this.fpoData[i]?.NoOfMouSignedVendorRegistration == 0) {
            no14 = ++no14
          } else {
            yes14 = ++yes14
          }

        }

        var percentageofcommencementbusiness = (yes1 / (yes1 + no1) * 100).toFixed(2);
        console.log(percentageofcommencementbusiness, "percentageofcommencementbusiness");


        var percentageofceoappointed = (yes2 / (yes2 + no2) * 100).toFixed(2);

        var percentageofaccountantappointed = (yes3 / (yes3 + no3) * 100).toFixed(2);

        var percentageofauditorappointed = (yes4 / (yes4 + no4) * 100).toFixed(2);

        var percentageofgstlicense = (yes5 / (yes5 + no5) * 100).toFixed(2);

        var percentageofstatutoryaudit = (yes6 / (yes6 + no6) * 100).toFixed(2);

        var percentageofagmconducted = (yes7 / (yes7 + no7) * 100).toFixed(2);

        var percentageofrocfilled = (yes8 / (yes8 + no8) * 100).toFixed(2);

        var percentageofreceivedloan = (yes9 / (yes9 + no9) * 100).toFixed(2);

        var percentageofequitygrant = (yes10 / (yes10 + no10) * 100).toFixed(2);

        var percentageofbusinessplan = (year1 / (year1 + year2 + year3) * 100).toFixed(2);

        var percentageoftradingthroughenum = (yes11 / (yes11 + no11) * 100).toFixed(2);

        var percentageofregisteronenum = (yes12 / (yes12 + no12) * 100).toFixed(2);

        var percentageofannualturnover = (yes13 / (yes13 + no13) * 100).toFixed(2);

        var percentageofmouregistration = (yes14 / (yes14 + no14) * 100).toFixed(2);


        const averageShareHoler = shareHoler.reduce((a, b) => a + b, 0) / shareHoler.length;
        const avgholder = averageShareHoler.toFixed(2)

        const averageShareCapital = shareCapital.reduce((a, b) => a + b, 0) / shareCapital.length;
        const avgcapital = averageShareCapital.toFixed(2)

        this.targetForm.patchValue({
          presentstatusofAvgshareholdermobilized: avgholder,
          percentageOffpoappointedceo: percentageofceoappointed,
          percentageOffpoappointedaccountant: percentageofaccountantappointed,
          percentageOffpoappointedauditor: percentageofauditorappointed,
          percentageOffpoobtainedcommencementofbusiness: percentageofcommencementbusiness,
          percentageOffpoobtainedgstlicense: percentageofgstlicense,
          percentageOffpocompletedstatutoryaudit: percentageofstatutoryaudit,
          percentageOffpocompletedagm: percentageofagmconducted,
          percentageOffpofilledroc: percentageofrocfilled,
          loanfrombank: percentageofreceivedloan,
          equitygrantavailed: percentageofequitygrant,
          averagesharecapitalAmount: avgcapital,
          havingBusinessplan: percentageofbusinessplan,
          tradingthroughEnum: percentageoftradingthroughenum,
          registeredOnenum: percentageofregisteronenum,
          avgturnoverOf50: percentageofannualturnover,
          signedmouRegistration: percentageofmouregistration,
        })

        //===============


        if (this.targetForm.controls['typesOffpo'].value === '3month') {
          this.targetForm.controls['janjunpercentageOffpoappointedauditor'].disable();
          this.targetForm.controls['juldecpercentageOffpoappointedauditor'].disable();
          this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].disable();
          this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].disable();
          this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].disable();
          this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].disable();
          this.targetForm.controls['janjunpercentageOffpocompletedstatutoryaudit'].disable();
          this.targetForm.controls['juldecpercentageOffpocompletedstatutoryaudit'].disable();
          this.targetForm.controls['janjunpercentageOffpocompletedagm'].disable();
          this.targetForm.controls['juldecpercentageOffpocompletedagm'].disable();
          this.targetForm.controls['janjunpercentageOffpofilledroc'].disable();
          this.targetForm.controls['juldecpercentageOffpofilledroc'].disable();
          this.targetForm.controls['janjunavgturnoverOf50'].disable();
          this.targetForm.controls['juldecavgturnoverOf50'].disable();
          this.targetForm.controls['janjuntradingthroughEnum'].disable();
          this.targetForm.controls['juldectradingthroughEnum'].disable();

        } else
          if (this.targetForm.controls['typesOffpo'].value === '11month') {
            this.targetForm.controls['janjunpercentageOffpocompletedstatutoryaudit'].disable();
            this.targetForm.controls['juldecpercentageOffpocompletedstatutoryaudit'].disable();
            this.targetForm.controls['janjunpercentageOffpofilledroc'].disable();
            this.targetForm.controls['juldecpercentageOffpofilledroc'].disable();
            this.targetForm.controls['janjunavgturnoverOf50'].disable();
            this.targetForm.controls['juldecavgturnoverOf50'].disable();

            this.targetForm.controls['janjunpercentageOffpoappointedauditor'].enable();
            this.targetForm.controls['juldecpercentageOffpoappointedauditor'].enable();
            this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].enable();
            this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].enable();
            this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].enable();
            this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].enable();
            this.targetForm.controls['janjunpercentageOffpocompletedagm'].enable();
            this.targetForm.controls['juldecpercentageOffpocompletedagm'].enable();
            this.targetForm.controls['janjuntradingthroughEnum'].enable();
            this.targetForm.controls['juldectradingthroughEnum'].enable();

            // this.targetForm.controls['havingBusinessplan'].disable();
            // this.targetForm.controls['janjunhavingBusinessplan'].disable();
            // this.targetForm.controls['juldechavingBusinessplan'].disable();


          } else
            if (this.targetForm.controls['typesOffpo'].value === '1year') {
              this.targetForm.controls['janjunpercentageOffpocompletedstatutoryaudit'].enable();
              this.targetForm.controls['juldecpercentageOffpocompletedstatutoryaudit'].enable();
              this.targetForm.controls['janjunpercentageOffpofilledroc'].enable();
              this.targetForm.controls['juldecpercentageOffpofilledroc'].enable();
              this.targetForm.controls['janjunpercentageOffpoappointedauditor'].enable();
              this.targetForm.controls['juldecpercentageOffpoappointedauditor'].enable();
              this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].enable();
              this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].enable();
              this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].enable();
              this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].enable();
              this.targetForm.controls['janjunpercentageOffpocompletedagm'].enable();
              this.targetForm.controls['juldecpercentageOffpocompletedagm'].enable();
              this.targetForm.controls['janjunavgturnoverOf50'].enable();
              this.targetForm.controls['juldecavgturnoverOf50'].enable();
              this.targetForm.controls['janjunhavingBusinessplan'].enable();
              this.targetForm.controls['juldechavingBusinessplan'].enable();

            }
        //=============
      } else {
        this.targetForm.patchValue({
          presentstatusofAvgshareholdermobilized: 0,
          percentageOffpoappointedceo: 0,
          percentageOffpoappointedaccountant: 0,
          percentageOffpoappointedauditor: 0,
          percentageOffpoobtainedcommencementofbusiness: 0,
          percentageOffpoobtainedgstlicense: 0,
          percentageOffpocompletedstatutoryaudit: 0,
          percentageOffpocompletedagm: 0,
          percentageOffpofilledroc: 0,
          loanfrombank: 0,
          equitygrantavailed: 0,
          averagesharecapitalAmount: 0,
          havingBusinessplan: 0,
          tradingthroughEnum: 0,
          registeredOnenum: 0,
          avgturnoverOf50: 0,
          signedmouRegistration: 0,
        })
      }

      this.check();
      this.forReset()
    })


  }
  selectTimeSlot() {
    if (this.targetForm.controls['timeSlot'].value === "April-Sept") {
      this.targetForm.controls['juldecpresentstatusofAvgshareholdermobilized'].disable();
      this.targetForm.controls['juldecpercentageOffpoappointedceo'].disable();
      this.targetForm.controls['juldecpercentageOffpoappointedauditor'].disable();
      this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].disable();
      this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].disable();
      this.targetForm.controls['juldecpercentageOffpocompletedstatutoryaudit'].disable();
      this.targetForm.controls['juldecpercentageOffpocompletedagm'].disable();
      this.targetForm.controls['juldecpercentageOffpofilledroc'].disable();
      this.targetForm.controls['juldecpercentageOffpoappointedaccountant'].disable();
      this.targetForm.controls['juldecavgturnoverOf50'].disable();
      this.targetForm.controls['juldecsignedmouRegistration'].disable();
      this.targetForm.controls['juldecregisteredOnenum'].disable();
      this.targetForm.controls['juldectradingthroughEnum'].disable();
      this.targetForm.controls['juldechavingBusinessplan'].disable();
      this.targetForm.controls['janjunavgturnoverOf50'].enable();
      this.targetForm.controls['janjunsignedmouRegistration'].enable();
      this.targetForm.controls['janjunregisteredOnenum'].enable();
      this.targetForm.controls['janjuntradingthroughEnum'].enable();
      this.targetForm.controls['janjunhavingBusinessplan'].enable();
      this.targetForm.controls['janjunpresentstatusofAvgshareholdermobilized'].enable();
      this.targetForm.controls['janjunpercentageOffpoappointedceo'].enable();
      this.targetForm.controls['janjunpercentageOffpoappointedauditor'].enable();
      this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].enable();
      this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].enable();
      this.targetForm.controls['janjunpercentageOffpocompletedstatutoryaudit'].enable();
      this.targetForm.controls['janjunpercentageOffpocompletedagm'].enable();
      this.targetForm.controls['janjunpercentageOffpofilledroc'].enable();
      this.targetForm.controls['janjunpercentageOffpoappointedaccountant'].enable();
      this.targetForm.controls['juldecaveragesharecapitalAmount'].disable();
      this.targetForm.controls['juldecequitygrantavailed'].disable();
      this.targetForm.controls['juldecloanfrombank'].disable();
      this.targetForm.controls['janjunaveragesharecapitalAmount'].enable();
      this.targetForm.controls['janjunequitygrantavailed'].enable();
      this.targetForm.controls['janjunloanfrombank'].enable();

    } else
      if (this.targetForm.controls['timeSlot'].value === "Oct-March") {
        this.targetForm.controls['juldecpresentstatusofAvgshareholdermobilized'].enable();
        this.targetForm.controls['juldecpercentageOffpoappointedceo'].enable();
        this.targetForm.controls['juldecpercentageOffpoappointedauditor'].enable();
        this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].enable();
        this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].enable();
        this.targetForm.controls['juldecpercentageOffpocompletedstatutoryaudit'].enable();
        this.targetForm.controls['juldecpercentageOffpocompletedagm'].enable();
        this.targetForm.controls['juldecpercentageOffpofilledroc'].enable();
        this.targetForm.controls['juldecpercentageOffpoappointedaccountant'].enable();
        this.targetForm.controls['juldecavgturnoverOf50'].enable();
        this.targetForm.controls['juldecsignedmouRegistration'].enable();
        this.targetForm.controls['juldecregisteredOnenum'].enable();
        this.targetForm.controls['juldectradingthroughEnum'].enable();
        this.targetForm.controls['juldechavingBusinessplan'].enable();
        this.targetForm.controls['janjunavgturnoverOf50'].disable();
        this.targetForm.controls['janjunsignedmouRegistration'].disable();
        this.targetForm.controls['janjunregisteredOnenum'].disable();
        this.targetForm.controls['janjuntradingthroughEnum'].disable();
        this.targetForm.controls['janjunhavingBusinessplan'].disable();
        this.targetForm.controls['janjunpresentstatusofAvgshareholdermobilized'].disable();
        this.targetForm.controls['janjunpercentageOffpoappointedceo'].disable();
        this.targetForm.controls['janjunpercentageOffpoappointedauditor'].disable();
        this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].disable();
        this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].disable();
        this.targetForm.controls['janjunpercentageOffpocompletedstatutoryaudit'].disable();
        this.targetForm.controls['janjunpercentageOffpocompletedagm'].disable();
        this.targetForm.controls['janjunpercentageOffpofilledroc'].disable();
        this.targetForm.controls['janjunpercentageOffpoappointedaccountant'].disable();
        this.targetForm.controls['juldecaveragesharecapitalAmount'].enable();
        this.targetForm.controls['juldecequitygrantavailed'].enable();
        this.targetForm.controls['juldecloanfrombank'].enable();
        this.targetForm.controls['janjunaveragesharecapitalAmount'].disable();
        this.targetForm.controls['janjunequitygrantavailed'].disable();
        this.targetForm.controls['janjunloanfrombank'].disable();

      }

    this.check();
    this.forReset()
  }

  check() {
    if (this.targetForm.controls['timeSlot'].value === "April-Sept") {
      this.targetForm.controls['juldecpresentstatusofAvgshareholdermobilized'].disable();
      this.targetForm.controls['juldecpercentageOffpoappointedceo'].disable();
      this.targetForm.controls['juldecpercentageOffpoappointedauditor'].disable();
      this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].disable();
      this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].disable();
      this.targetForm.controls['juldecpercentageOffpocompletedstatutoryaudit'].disable();
      this.targetForm.controls['juldecpercentageOffpocompletedagm'].disable();
      this.targetForm.controls['juldecpercentageOffpofilledroc'].disable();
      this.targetForm.controls['juldecpercentageOffpoappointedaccountant'].disable();
      this.targetForm.controls['juldecavgturnoverOf50'].disable();
      this.targetForm.controls['juldecsignedmouRegistration'].disable();
      this.targetForm.controls['juldecregisteredOnenum'].disable();
      this.targetForm.controls['juldectradingthroughEnum'].disable();
      this.targetForm.controls['juldechavingBusinessplan'].disable();
      this.targetForm.controls['juldecaveragesharecapitalAmount'].disable();
      this.targetForm.controls['juldecequitygrantavailed'].disable();
      this.targetForm.controls['juldecloanfrombank'].disable();
      if (this.targetForm.controls['typesOffpo'].value === '3month') {
        this.targetForm.controls['janjunpercentageOffpoappointedauditor'].disable();
        this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].disable();
        this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].disable();
        this.targetForm.controls['janjunpercentageOffpocompletedstatutoryaudit'].disable();
        this.targetForm.controls['janjunpercentageOffpocompletedagm'].disable();
        this.targetForm.controls['janjunpercentageOffpofilledroc'].disable();
        this.targetForm.controls['janjunavgturnoverOf50'].disable();
        this.targetForm.controls['janjuntradingthroughEnum'].disable();
      } if (this.targetForm.controls['typesOffpo'].value === '11month') {
        this.targetForm.controls['janjunpercentageOffpoappointedauditor'].enable();
        this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].enable();
        this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].enable();
        this.targetForm.controls['janjunpercentageOffpocompletedstatutoryaudit'].disable();
        this.targetForm.controls['janjunpercentageOffpocompletedagm'].enable();
        this.targetForm.controls['janjunpercentageOffpofilledroc'].disable();
        this.targetForm.controls['janjunavgturnoverOf50'].disable();
        this.targetForm.controls['janjuntradingthroughEnum'].enable();
      } if (this.targetForm.controls['typesOffpo'].value === '1year') {
        this.targetForm.controls['janjunpercentageOffpoappointedauditor'].enable();
        this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].enable();
        this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].enable();
        this.targetForm.controls['janjunpercentageOffpocompletedstatutoryaudit'].enable();
        this.targetForm.controls['janjunpercentageOffpocompletedagm'].enable();
        this.targetForm.controls['janjunpercentageOffpofilledroc'].enable();
        this.targetForm.controls['janjunavgturnoverOf50'].enable();
        this.targetForm.controls['janjuntradingthroughEnum'].enable();
      }
    } if (this.targetForm.controls['timeSlot'].value === "Oct-March") {
      this.targetForm.controls['janjunavgturnoverOf50'].disable();
      this.targetForm.controls['janjunsignedmouRegistration'].disable();
      this.targetForm.controls['janjunregisteredOnenum'].disable();
      this.targetForm.controls['janjuntradingthroughEnum'].disable();
      this.targetForm.controls['janjunhavingBusinessplan'].disable();
      this.targetForm.controls['janjunpresentstatusofAvgshareholdermobilized'].disable();
      this.targetForm.controls['janjunpercentageOffpoappointedceo'].disable();
      this.targetForm.controls['janjunpercentageOffpoappointedauditor'].disable();
      this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].disable();
      this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].disable();
      this.targetForm.controls['janjunpercentageOffpocompletedstatutoryaudit'].disable();
      this.targetForm.controls['janjunpercentageOffpocompletedagm'].disable();
      this.targetForm.controls['janjunpercentageOffpofilledroc'].disable();
      this.targetForm.controls['janjunpercentageOffpoappointedaccountant'].disable();
      this.targetForm.controls['janjunaveragesharecapitalAmount'].disable();
      this.targetForm.controls['janjunequitygrantavailed'].disable();
      this.targetForm.controls['janjunloanfrombank'].disable();
      if (this.targetForm.controls['typesOffpo'].value === '3month') {
        this.targetForm.controls['juldecpercentageOffpoappointedauditor'].disable();
        this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].disable();
        this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].disable();
        this.targetForm.controls['juldecpercentageOffpocompletedstatutoryaudit'].disable();
        this.targetForm.controls['juldecpercentageOffpocompletedagm'].disable();
        this.targetForm.controls['juldecpercentageOffpofilledroc'].disable();
        this.targetForm.controls['juldecavgturnoverOf50'].disable();
        this.targetForm.controls['juldectradingthroughEnum'].disable();
      } if (this.targetForm.controls['typesOffpo'].value === '11month') {
        this.targetForm.controls['juldecpercentageOffpoappointedauditor'].enable();
        this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].enable();
        this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].enable();
        this.targetForm.controls['juldecpercentageOffpocompletedstatutoryaudit'].disable();
        this.targetForm.controls['juldecpercentageOffpocompletedagm'].enable();
        this.targetForm.controls['juldecpercentageOffpofilledroc'].disable();
        this.targetForm.controls['juldecavgturnoverOf50'].disable();
        this.targetForm.controls['juldectradingthroughEnum'].enable();
      } if (this.targetForm.controls['typesOffpo'].value === '1year') {
        this.targetForm.controls['juldecpercentageOffpoappointedauditor'].enable();
        this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].enable();
        this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].enable();
        this.targetForm.controls['juldecpercentageOffpocompletedstatutoryaudit'].enable();
        this.targetForm.controls['juldecpercentageOffpocompletedagm'].enable();
        this.targetForm.controls['juldecpercentageOffpofilledroc'].enable();
        this.targetForm.controls['juldecavgturnoverOf50'].enable();
        this.targetForm.controls['juldectradingthroughEnum'].enable();
      }
    }
  }

  //=============================================
  forReset() {
    if (this.targetForm.controls['timeSlot'].value === "April-Sept") {
      this.targetForm.controls['juldecpresentstatusofAvgshareholdermobilized'].reset();
      this.targetForm.controls['juldecpercentageOffpoappointedceo'].reset();
      this.targetForm.controls['juldecpercentageOffpoappointedauditor'].reset();
      this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].reset();
      this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].reset();
      this.targetForm.controls['juldecpercentageOffpocompletedstatutoryaudit'].reset();
      this.targetForm.controls['juldecpercentageOffpocompletedagm'].reset();
      this.targetForm.controls['juldecpercentageOffpofilledroc'].reset();
      this.targetForm.controls['juldecpercentageOffpoappointedaccountant'].reset();
      this.targetForm.controls['juldecavgturnoverOf50'].reset();
      this.targetForm.controls['juldecsignedmouRegistration'].reset();
      this.targetForm.controls['juldecregisteredOnenum'].reset();
      this.targetForm.controls['juldectradingthroughEnum'].reset();
      this.targetForm.controls['juldechavingBusinessplan'].reset();
      this.targetForm.controls['juldecaveragesharecapitalAmount'].reset();
      this.targetForm.controls['juldecequitygrantavailed'].reset();
      this.targetForm.controls['juldecloanfrombank'].reset();
      if (this.targetForm.controls['typesOffpo'].value === '3month') {
        this.targetForm.controls['janjunpercentageOffpoappointedauditor'].reset();
        this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].reset();
        this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].reset();
        this.targetForm.controls['janjunpercentageOffpocompletedstatutoryaudit'].reset();
        this.targetForm.controls['janjunpercentageOffpocompletedagm'].reset();
        this.targetForm.controls['janjunpercentageOffpofilledroc'].reset();
        this.targetForm.controls['janjunavgturnoverOf50'].reset();
        this.targetForm.controls['janjuntradingthroughEnum'].reset();
      } if (this.targetForm.controls['typesOffpo'].value === '11month') {
        this.targetForm.controls['janjunpercentageOffpoappointedauditor'].enable();
        this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].enable();
        this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].enable();
        this.targetForm.controls['janjunpercentageOffpocompletedstatutoryaudit'].reset();
        this.targetForm.controls['janjunpercentageOffpocompletedagm'].enable();
        this.targetForm.controls['janjunpercentageOffpofilledroc'].reset();
        this.targetForm.controls['janjunavgturnoverOf50'].reset();
        this.targetForm.controls['janjuntradingthroughEnum'].enable();
      } if (this.targetForm.controls['typesOffpo'].value === '1year') {
        this.targetForm.controls['janjunpercentageOffpoappointedauditor'].enable();
        this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].enable();
        this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].enable();
        this.targetForm.controls['janjunpercentageOffpocompletedstatutoryaudit'].enable();
        this.targetForm.controls['janjunpercentageOffpocompletedagm'].enable();
        this.targetForm.controls['janjunpercentageOffpofilledroc'].enable();
        this.targetForm.controls['janjunavgturnoverOf50'].enable();
        this.targetForm.controls['janjuntradingthroughEnum'].enable();
      }
    } if (this.targetForm.controls['timeSlot'].value === "Oct-March") {
      this.targetForm.controls['janjunavgturnoverOf50'].reset();
      this.targetForm.controls['janjunsignedmouRegistration'].reset();
      this.targetForm.controls['janjunregisteredOnenum'].reset();
      this.targetForm.controls['janjuntradingthroughEnum'].reset();
      this.targetForm.controls['janjunhavingBusinessplan'].reset();
      this.targetForm.controls['janjunpresentstatusofAvgshareholdermobilized'].reset();
      this.targetForm.controls['janjunpercentageOffpoappointedceo'].reset();
      this.targetForm.controls['janjunpercentageOffpoappointedauditor'].reset();
      this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].reset();
      this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].reset();
      this.targetForm.controls['janjunpercentageOffpocompletedstatutoryaudit'].reset();
      this.targetForm.controls['janjunpercentageOffpocompletedagm'].reset();
      this.targetForm.controls['janjunpercentageOffpofilledroc'].reset();
      this.targetForm.controls['janjunpercentageOffpoappointedaccountant'].reset();
      this.targetForm.controls['janjunaveragesharecapitalAmount'].reset();
      this.targetForm.controls['janjunequitygrantavailed'].reset();
      this.targetForm.controls['janjunloanfrombank'].reset();
      if (this.targetForm.controls['typesOffpo'].value === '3month') {
        this.targetForm.controls['juldecpercentageOffpoappointedauditor'].reset();
        this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].reset();
        this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].reset();
        this.targetForm.controls['juldecpercentageOffpocompletedstatutoryaudit'].reset();
        this.targetForm.controls['juldecpercentageOffpocompletedagm'].reset();
        this.targetForm.controls['juldecpercentageOffpofilledroc'].reset();
        this.targetForm.controls['juldecavgturnoverOf50'].reset();
        this.targetForm.controls['juldectradingthroughEnum'].reset();
      } if (this.targetForm.controls['typesOffpo'].value === '11month') {
        this.targetForm.controls['juldecpercentageOffpoappointedauditor'].enable();
        this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].enable();
        this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].enable();
        this.targetForm.controls['juldecpercentageOffpocompletedstatutoryaudit'].reset();
        this.targetForm.controls['juldecpercentageOffpocompletedagm'].enable();
        this.targetForm.controls['juldecpercentageOffpofilledroc'].reset();
        this.targetForm.controls['juldecavgturnoverOf50'].reset();
        this.targetForm.controls['juldectradingthroughEnum'].enable();
      } if (this.targetForm.controls['typesOffpo'].value === '1year') {
        this.targetForm.controls['juldecpercentageOffpoappointedauditor'].enable();
        this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].enable();
        this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].enable();
        this.targetForm.controls['juldecpercentageOffpocompletedstatutoryaudit'].enable();
        this.targetForm.controls['juldecpercentageOffpocompletedagm'].enable();
        this.targetForm.controls['juldecpercentageOffpofilledroc'].enable();
        this.targetForm.controls['juldecavgturnoverOf50'].enable();
        this.targetForm.controls['juldectradingthroughEnum'].enable();
      }
    }
  }
  //=========================================================

  targetForm = new FormGroup({
    finyear: new FormControl('', [Validators.required]),
    targets: new FormControl('', [Validators.required]),
    achievements: new FormControl('', [Validators.required]),
    typesOffpo: new FormControl('', [Validators.required]),
    timeSlot: new FormControl('', [Validators.required]),
    presentstatusofAvgshareholdermobilized: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    janjunpresentstatusofAvgshareholdermobilized: new FormControl('', [Validators.required,Validators.min(0), Validators.max(200)]),
    juldecpresentstatusofAvgshareholdermobilized: new FormControl('', [Validators.required,Validators.min(0), Validators.max(200)]),
    percentageOffpoappointedceo: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    janjunpercentageOffpoappointedceo: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    juldecpercentageOffpoappointedceo: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    percentageOffpoappointedaccountant: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    janjunpercentageOffpoappointedaccountant: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    juldecpercentageOffpoappointedaccountant: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    percentageOffpoobtainedcommencementofbusiness: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    janjunpercentageOffpoobtainedcommencementofbusiness: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    juldecpercentageOffpoobtainedcommencementofbusiness: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    percentageOffpoobtainedgstlicense: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    janjunpercentageOffpoobtainedgstlicense: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    juldecpercentageOffpoobtainedgstlicense: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    percentageOffpocompletedstatutoryaudit: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    janjunpercentageOffpocompletedstatutoryaudit: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    juldecpercentageOffpocompletedstatutoryaudit: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    percentageOffpocompletedagm: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    janjunpercentageOffpocompletedagm: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    juldecpercentageOffpocompletedagm: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    percentageOffpofilledroc: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    janjunpercentageOffpofilledroc: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    juldecpercentageOffpofilledroc: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    percentageOffpoappointedauditor: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    janjunpercentageOffpoappointedauditor: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    juldecpercentageOffpoappointedauditor: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    avgturnoverOf50: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    janjunavgturnoverOf50: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    juldecavgturnoverOf50: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    signedmouRegistration: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    janjunsignedmouRegistration: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    juldecsignedmouRegistration: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    registeredOnenum: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    janjunregisteredOnenum: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    juldecregisteredOnenum: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    tradingthroughEnum: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    janjuntradingthroughEnum: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    juldectradingthroughEnum: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    havingBusinessplan: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    janjunhavingBusinessplan: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    juldechavingBusinessplan: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    averagesharecapitalAmount: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    janjunaveragesharecapitalAmount: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    juldecaveragesharecapitalAmount: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    equitygrantavailed: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    janjunequitygrantavailed: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    juldecequitygrantavailed: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    loanfrombank: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    janjunloanfrombank: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
    juldecloanfrombank: new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
  })
  getAverage() {
    const FinYear = this.targetForm.value.finyear
    this.service.getAverage(FinYear).subscribe(result => {
      this.avgData = result;
      this.targetForm.patchValue({
        presentstatusofAvgshareholdermobilized: this.avgData[0]?.AverageValue
      })
    })
  }
  getYearwiseData() {
    const FinYear = this.targetForm.value.finyear
    this.service.getYearwiseData(FinYear).subscribe(result => {
      this.yearData = result;
      this.targetForm.patchValue({
        percentageOffpoobtainedcommencementofbusiness: this.yearData[0].commencementstatus[0]?.commencementOfBusinessfieldWithMca,
        percentageOffpoappointedceo: this.yearData[0].ceoStatus[0]?.CeoAppointed,
        percentageOffpoappointedauditor: this.yearData[0].auditorstatus[0]?.AuditorAppointed,
        percentageOffpoobtainedgstlicense: this.yearData[0].ststatus[0]?.GstLicenceApplied,
        percentageOffpocompletedstatutoryaudit: this.yearData[0].statutorystatus[0]?.statutoryAudit,
        percentageOffpocompletedagm: this.yearData[0].agmConducted[0]?.AgmConducted,
        percentageOffpofilledroc: this.yearData[0].filledroc[0]?.fpoFilledroc,
        percentageOffpoappointedaccountant: this.yearData[0].accountantstatus[0]?.AccountedAppointed
      })
      this.getAverage();
      this.getturnOver();
      this.getmouRegistration();
      this.getBusinessplan();
      this.getTabledata();
      this.getturnOver();
      this.getmouRegistration();
      this.getBusinessplan();
      this.getTargetdata();
      this.getAverageofshare()

    })
  }

  getTabledata() {
    const FinYear = this.targetForm.value.finyear
    this.service.getTabledata(FinYear).subscribe(result => {
      this.tableData = result;
      this.targetForm.patchValue({
        registeredOnenum: this.tableData[0].enumstatus[0]?.RegistrationOnEnam,
        tradingthroughEnum: this.tableData[0].tradingstatus[0]?.fpotradingThroughenum
      })

    })
  }

  getturnOver() {
    const FinYear = this.targetForm.value.finyear
    this.service.getturnOver(FinYear).subscribe(result => {
      this.turnoverData = result;
      this.targetForm.patchValue({
        avgturnoverOf50: this.turnoverData[0]?.AnnualBusinessTurnoverinInr
      })
    })
  }

  getmouRegistration() {
    const FinYear = this.targetForm.value.finyear
    this.service.getmouRegistration(FinYear).subscribe(result => {
      this.mouData = result;
      this.targetForm.patchValue({
        signedmouRegistration: this.mouData[0]?.NoOfMouSignedVendorRegistration
      })
    })
  }

  getBusinessplan() {
    const FinYear = this.targetForm.value.finyear
    this.service.getBusinessplan(FinYear).subscribe(result => {
      this.businessData = result;
      this.targetForm.patchValue({
        havingBusinessplan: this.businessData[0]?.BusinessPlanFormulated
      })
    })
  }

  getTargetdata() {
    const FinYear = this.targetForm.value.finyear
    this.service.getTargetdata(FinYear).subscribe(result => {
      this.targetData = result;
      this.targetForm.patchValue({
        equitygrantavailed: this.targetData[0].equitystatus[0]?.EquityGrantAvailed,
        loanfrombank: this.targetData[0].loanstatus[0]?.receivedloanFrombank
      })
    })
  }

  getAverageofshare() {
    console.log(this.targetForm.value.finyear, this.targetForm.value.finyear);

    const FinYear = this.targetForm.value.finyear
    this.service.getAverageofshare(FinYear).subscribe(result => {
      this.shareData = result;
      console.log(this.shareData, 'shareData');

      this.targetForm.patchValue({
        averagesharecapitalAmount: this.shareData[0]?.Average
      })
    })
  }
  //=============================================
  submit() {
    if (this.targetForm.controls['typesOffpo'].value === '' || this.targetForm.controls['typesOffpo'].value === null) {
      this.toastr.warning("select all the required fields")
      return;
    }
    if (this.targetForm.controls['timeSlot'].value === '' || this.targetForm.controls['timeSlot'].value === null) {
      this.toastr.warning("select all the required fields")
      return;
    }

    if (this.targetForm.controls['timeSlot'].value === "Oct-March") {
      if (this.targetForm.controls['typesOffpo'].value === '1year') {
        if (this.targetForm.controls['juldecpresentstatusofAvgshareholdermobilized'].valid &&
          this.targetForm.controls['juldecpercentageOffpoappointedceo'].valid &&
          this.targetForm.controls['juldecpercentageOffpoappointedauditor'].valid &&
          this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].valid &&
          this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].valid &&
          this.targetForm.controls['juldecpercentageOffpocompletedstatutoryaudit'].valid &&
          this.targetForm.controls['juldecpercentageOffpocompletedagm'].valid &&
          this.targetForm.controls['juldecpercentageOffpofilledroc'].valid &&
          this.targetForm.controls['juldecpercentageOffpoappointedaccountant'].valid &&
          this.targetForm.controls['juldecavgturnoverOf50'].valid &&
          this.targetForm.controls['juldecsignedmouRegistration'].valid &&
          this.targetForm.controls['juldecregisteredOnenum'].valid &&
          this.targetForm.controls['juldectradingthroughEnum'].valid &&
          this.targetForm.controls['juldechavingBusinessplan'].valid &&
          this.targetForm.controls['juldecaveragesharecapitalAmount'].valid &&
          this.targetForm.controls['juldecequitygrantavailed'].valid &&
          this.targetForm.controls['juldecloanfrombank'].valid) {
          console.log("form valid");
          this.finalSubmit();
          return;
        } else {
          this.toastr.warning("Please fill all the required fields")
          return;
        }
      } if (this.targetForm.controls['typesOffpo'].value === '3month') {
        if (this.targetForm.controls['juldecpresentstatusofAvgshareholdermobilized'].valid &&
          this.targetForm.controls['juldecpercentageOffpoappointedceo'].valid &&
          this.targetForm.controls['juldecpercentageOffpoappointedaccountant'].valid &&
          this.targetForm.controls['juldecsignedmouRegistration'].valid &&
          this.targetForm.controls['juldecregisteredOnenum'].valid &&
          this.targetForm.controls['juldechavingBusinessplan'].valid &&
          this.targetForm.controls['juldecaveragesharecapitalAmount'].valid &&
          this.targetForm.controls['juldecequitygrantavailed'].valid &&
          this.targetForm.controls['juldecloanfrombank'].valid) {
          console.log("form valid");
          this.finalSubmit();
          return;
        } else {
          this.toastr.warning("Please fill all the required fields")
          return;
        }
      } if (this.targetForm.controls['typesOffpo'].value === '11month') {
        if (this.targetForm.controls['juldecpresentstatusofAvgshareholdermobilized'].valid &&
          this.targetForm.controls['juldecpercentageOffpoappointedceo'].valid &&
          this.targetForm.controls['juldecpercentageOffpoappointedauditor'].valid &&
          this.targetForm.controls['juldecpercentageOffpoobtainedcommencementofbusiness'].valid &&
          this.targetForm.controls['juldecpercentageOffpoobtainedgstlicense'].valid &&
          this.targetForm.controls['juldecpercentageOffpocompletedagm'].valid &&
          this.targetForm.controls['juldecpercentageOffpoappointedaccountant'].valid &&
          this.targetForm.controls['juldecsignedmouRegistration'].valid &&
          this.targetForm.controls['juldecregisteredOnenum'].valid &&
          this.targetForm.controls['juldectradingthroughEnum'].valid &&
          this.targetForm.controls['juldechavingBusinessplan'].valid &&
          this.targetForm.controls['juldecaveragesharecapitalAmount'].valid &&
          this.targetForm.controls['juldecequitygrantavailed'].valid &&
          this.targetForm.controls['juldecloanfrombank'].valid) {
          console.log("form valid");
          this.finalSubmit();
          return;
        } else {
          this.toastr.warning("Please fill all the required fields")
          return;
        }
      }
    }
    if (this.targetForm.controls['timeSlot'].value === "April-Sept") {
      if (this.targetForm.controls['typesOffpo'].value === '1year') {
        if (this.targetForm.controls['janjunavgturnoverOf50'].valid &&
          this.targetForm.controls['janjunsignedmouRegistration'].valid &&
          this.targetForm.controls['janjunregisteredOnenum'].valid &&
          this.targetForm.controls['janjuntradingthroughEnum'].valid &&
          this.targetForm.controls['janjunhavingBusinessplan'].valid &&
          this.targetForm.controls['janjunpresentstatusofAvgshareholdermobilized'].valid &&
          this.targetForm.controls['janjunpercentageOffpoappointedceo'].valid &&
          this.targetForm.controls['janjunpercentageOffpoappointedauditor'].valid &&
          this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].valid &&
          this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].valid &&
          this.targetForm.controls['janjunpercentageOffpocompletedstatutoryaudit'].valid &&
          this.targetForm.controls['janjunpercentageOffpocompletedagm'].valid &&
          this.targetForm.controls['janjunpercentageOffpofilledroc'].valid &&
          this.targetForm.controls['janjunpercentageOffpoappointedaccountant'].valid &&
          this.targetForm.controls['janjunaveragesharecapitalAmount'].valid &&
          this.targetForm.controls['janjunequitygrantavailed'].valid &&
          this.targetForm.controls['janjunloanfrombank'].valid) {
          console.log("form valid");
          this.finalSubmit();
          return;
        } else {
          this.toastr.warning("Please fill all the required fields")
          return;
        }
      } if (this.targetForm.controls['typesOffpo'].value === '3month') {
        if (this.targetForm.controls['janjunpresentstatusofAvgshareholdermobilized'].valid &&
          this.targetForm.controls['janjunpercentageOffpoappointedceo'].valid &&
          this.targetForm.controls['janjunpercentageOffpoappointedaccountant'].valid &&
          this.targetForm.controls['janjunsignedmouRegistration'].valid &&
          this.targetForm.controls['janjunregisteredOnenum'].valid &&
          this.targetForm.controls['janjunhavingBusinessplan'].valid &&
          this.targetForm.controls['janjunaveragesharecapitalAmount'].valid &&
          this.targetForm.controls['janjunequitygrantavailed'].valid &&
          this.targetForm.controls['janjunloanfrombank'].valid) {
          console.log("form valid");
          this.finalSubmit();
          return;
        } else {
          this.toastr.warning("Please fill all the required fields")
          return;
        }
      } if (this.targetForm.controls['typesOffpo'].value === '11month') {
        if (this.targetForm.controls['janjunsignedmouRegistration'].valid &&
          this.targetForm.controls['janjunregisteredOnenum'].valid &&
          this.targetForm.controls['janjuntradingthroughEnum'].valid &&
          this.targetForm.controls['janjunhavingBusinessplan'].valid &&
          this.targetForm.controls['janjunpresentstatusofAvgshareholdermobilized'].valid &&
          this.targetForm.controls['janjunpercentageOffpoappointedceo'].valid &&
          this.targetForm.controls['janjunpercentageOffpoappointedauditor'].valid &&
          this.targetForm.controls['janjunpercentageOffpoobtainedcommencementofbusiness'].valid &&
          this.targetForm.controls['janjunpercentageOffpoobtainedgstlicense'].valid &&
          this.targetForm.controls['janjunpercentageOffpocompletedagm'].valid &&
          this.targetForm.controls['janjunpercentageOffpoappointedaccountant'].valid &&
          this.targetForm.controls['janjunaveragesharecapitalAmount'].valid &&
          this.targetForm.controls['janjunequitygrantavailed'].valid &&
          this.targetForm.controls['janjunloanfrombank'].valid) {
          console.log("form valid");
          this.finalSubmit();
          return;
        } else {
          this.toastr.warning("Please fill all the required fields")
          return;
        }
      }
    }
  }
  //=========================================================

  finalSubmit() {

    const data = {
      finyear: this.targetForm.value.finyear,
      presentstatusofAvgshareholdermobilized: this.targetForm.value.presentstatusofAvgshareholdermobilized,
      // targets: this.targetForm.value.targets,
      iaName: this.IaName,
      achievements: this.targetForm.value.achievements,
      typesOffpo: this.targetForm.value.typesOffpo,
      timeSlot: this.targetForm.value.timeSlot,
      janjunpresentstatusofAvgshareholdermobilized: this.targetForm.value.janjunpresentstatusofAvgshareholdermobilized,
      juldecpresentstatusofAvgshareholdermobilized: this.targetForm.value.juldecpresentstatusofAvgshareholdermobilized,
      percentageOffpoappointedceo: this.targetForm.value.percentageOffpoappointedceo,
      janjunpercentageOffpoappointedceo: this.targetForm.value.janjunpercentageOffpoappointedceo,
      juldecpercentageOffpoappointedceo: this.targetForm.value.juldecpercentageOffpoappointedceo,
      percentageOffpoappointedaccountant: this.targetForm.value.percentageOffpoappointedaccountant,
      janjunpercentageOffpoappointedaccountant: this.targetForm.value.janjunpercentageOffpoappointedaccountant,
      juldecpercentageOffpoappointedaccountant: this.targetForm.value.juldecpercentageOffpoappointedaccountant,
      percentageOffpoobtainedcommencementofbusiness: this.targetForm.value.percentageOffpoobtainedcommencementofbusiness,
      janjunpercentageOffpoobtainedcommencementofbusiness: this.targetForm.value.janjunpercentageOffpoobtainedcommencementofbusiness,
      juldecpercentageOffpoobtainedcommencementofbusiness: this.targetForm.value.juldecpercentageOffpoobtainedcommencementofbusiness,
      percentageOffpoobtainedgstlicense: this.targetForm.value.percentageOffpoobtainedgstlicense,
      janjunpercentageOffpoobtainedgstlicense: this.targetForm.value.janjunpercentageOffpoobtainedgstlicense,
      juldecpercentageOffpoobtainedgstlicense: this.targetForm.value.juldecpercentageOffpoobtainedgstlicense,
      percentageOffpocompletedstatutoryaudit: this.targetForm.value.percentageOffpocompletedstatutoryaudit,
      janjunpercentageOffpocompletedstatutoryaudit: this.targetForm.value.janjunpercentageOffpocompletedstatutoryaudit,
      juldecpercentageOffpocompletedstatutoryaudit: this.targetForm.value.juldecpercentageOffpocompletedstatutoryaudit,
      percentageOffpocompletedagm: this.targetForm.value.percentageOffpocompletedagm,
      janjunpercentageOffpocompletedagm: this.targetForm.value.janjunpercentageOffpocompletedagm,
      juldecpercentageOffpocompletedagm: this.targetForm.value.juldecpercentageOffpocompletedagm,
      percentageOffpofilledroc: this.targetForm.value.percentageOffpofilledroc,
      janjunpercentageOffpofilledroc: this.targetForm.value.janjunpercentageOffpofilledroc,
      juldecpercentageOffpofilledroc: this.targetForm.value.juldecpercentageOffpofilledroc,
      percentageOffpoappointedauditor: this.targetForm.value.percentageOffpoappointedauditor,
      janjunpercentageOffpoappointedauditor: this.targetForm.value.janjunpercentageOffpoappointedauditor,
      juldecpercentageOffpoappointedauditor: this.targetForm.value.juldecpercentageOffpoappointedauditor,
      avgturnoverOf50: this.targetForm.value.avgturnoverOf50,
      janjunavgturnoverOf50: this.targetForm.value.janjunavgturnoverOf50,
      juldecavgturnoverOf50: this.targetForm.value.juldecavgturnoverOf50,
      signedmouRegistration: this.targetForm.value.signedmouRegistration,
      janjunsignedmouRegistration: this.targetForm.value.janjunsignedmouRegistration,
      juldecsignedmouRegistration: this.targetForm.value.juldecsignedmouRegistration,
      registeredOnenum: this.targetForm.value.registeredOnenum,
      janjunregisteredOnenum: this.targetForm.value.janjunregisteredOnenum,
      juldecregisteredOnenum: this.targetForm.value.juldecregisteredOnenum,
      tradingthroughEnum: this.targetForm.value.tradingthroughEnum,
      janjuntradingthroughEnum: this.targetForm.value.janjuntradingthroughEnum,
      juldectradingthroughEnum: this.targetForm.value.juldectradingthroughEnum,
      havingBusinessplan: this.targetForm.value.havingBusinessplan,
      janjunhavingBusinessplan: this.targetForm.value.janjunhavingBusinessplan,
      juldechavingBusinessplan: this.targetForm.value.juldechavingBusinessplan,
      averagesharecapitalAmount: this.targetForm.value.averagesharecapitalAmount,
      janjunaveragesharecapitalAmount: this.targetForm.value.janjunaveragesharecapitalAmount,
      juldecaveragesharecapitalAmount: this.targetForm.value.juldecaveragesharecapitalAmount,
      equitygrantavailed: this.targetForm.value.equitygrantavailed,
      janjunequitygrantavailed: this.targetForm.value.janjunequitygrantavailed,
      juldecquitygrantavailed: this.targetForm.value.juldecquitygrantavailed,
      loanfrombank: this.targetForm.value.loanfrombank,
      janjunloanfrombank: this.targetForm.value.janjunloanfrombank,
      juldecloanfrombank: this.targetForm.value.juldecloanfrombank,
    }
    console.log(data, "data12331");

    this.service.submit(data).subscribe((result) => {
      this.sendData = result;
      console.log(this.sendData, 'this.sendData');
      this.toastr.success('Data added successfully')
      this.targetForm.reset();
    })



  }

  loadFpo() {
    // this.targetForm.reset();
    this.targetForm.reset({ finyear: this.targetForm.value.finyear })
    this.targetForm.patchValue({
      typesOffpo: "",
      timeSlot: "",
    })
  }


}



